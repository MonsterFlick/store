import { NextResponse } from "next/server";
import { validateCouponServerSide } from "@/lib/commerce/coupons";

// Sliding window rate limiter to prevent dictionary coupon attacks
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Prune expired entries periodically
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); // 1 minute window
    return true;
  }

  if (entry.count >= 15) {
    return false; // Exceeded 15 attempts per minute
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
      return NextResponse.json(
        { valid: false, error: "Too many attempts. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { code, subtotalINR, productId } = body;

    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { valid: false, error: "Coupon code is required." },
        { status: 400 }
      );
    }

    if (code.length > 32) {
      return NextResponse.json(
        { valid: false, error: "Invalid coupon format." },
        { status: 400 }
      );
    }

    const result = await validateCouponServerSide(
      code,
      Math.max(0, Number(subtotalINR) || 0),
      typeof productId === "string" ? productId : undefined
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, error: "Failed to validate coupon." },
      { status: 500 }
    );
  }
}
