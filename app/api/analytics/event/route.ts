import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_EVENTS = new Set([
  "product_view",
  "preview_open",
  "checkout_start",
  "payment_success",
  "payment_failed",
  "product_open",
  "download_start",
  "chapter_opened",
  "quiz_answered",
]);

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 60) {
    return false; // Max 60 events per minute per IP
  }

  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const body = await request.json();
    const { eventType, productId, metadata } = body;

    if (!eventType || typeof eventType !== "string" || !ALLOWED_EVENTS.has(eventType)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    // Limit metadata payload size to prevent database storage exhaustion
    const sanitizedMetadata: Record<string, unknown> = {};
    if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
      const serialized = JSON.stringify(metadata);
      if (serialized.length > 2048) {
        return NextResponse.json({ error: "Metadata payload exceeds size limit" }, { status: 400 });
      }
      Object.assign(sanitizedMetadata, metadata);
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const admin = createAdminClient();
      await admin.from("analytics_events").insert({
        user_id: user?.id || null,
        product_id: typeof productId === "string" && productId.length <= 64 ? productId : null,
        event_type: eventType,
        metadata: sanitizedMetadata,
      });
    } catch (insertErr) {
      console.warn("Analytics insertion warning:", insertErr);
    }

    return NextResponse.json({ recorded: true });
  } catch {
    return NextResponse.json({ recorded: false }, { status: 500 });
  }
}
