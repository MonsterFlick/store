import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { eventType, productId, metadata } = await request.json();

    if (!eventType) {
      return NextResponse.json({ error: "Event type required" }, { status: 400 });
    }

    try {
      const admin = createAdminClient();
      await admin.from("analytics_events").insert({
        user_id: user?.id || null,
        product_id: productId || null,
        event_type: eventType,
        metadata: metadata || {},
      });
    } catch {
      // Non-blocking telemetry
    }

    return NextResponse.json({ recorded: true });
  } catch {
    return NextResponse.json({ recorded: false }, { status: 500 });
  }
}
