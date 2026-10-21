import { NextResponse } from "next/server";
import { validateCouponServerSide } from "@/lib/commerce/coupons";

export async function POST(request: Request) {
  try {
    const { code, subtotalINR, productId } = await request.json();

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Coupon code is required." },
        { status: 400 }
      );
    }

    const result = await validateCouponServerSide(
      code,
      Number(subtotalINR) || 0,
      productId
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, error: "Failed to validate coupon." },
      { status: 500 }
    );
  }
}
