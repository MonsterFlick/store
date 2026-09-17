import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number; // percentage (e.g. 20) or INR amount (e.g. 200)
  starts_at?: string | null;
  expires_at?: string | null;
  usage_limit?: number | null;
  times_used?: number;
  minimum_order_value?: number | null;
  active: boolean;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  discountAmount: number; // in INR
  finalPrice: number; // in INR
  error?: string;
}

// Built-in fallback coupons for local development/testing without database
const DEFAULT_COUPONS: Record<string, Coupon> = {
  LAUNCH20: {
    id: "00000000-0000-0000-0000-000000000101",
    code: "LAUNCH20",
    discount_type: "percentage",
    discount_value: 20, // 20% off
    active: true,
    times_used: 0,
  },
  FLAT200: {
    id: "00000000-0000-0000-0000-000000000102",
    code: "FLAT200",
    discount_type: "fixed",
    discount_value: 200, // ₹200 off
    minimum_order_value: 500,
    active: true,
    times_used: 0,
  },
};

/**
 * Validates a coupon code server-side and computes the exact discount in INR.
 */
export async function validateCouponServerSide(
  rawCode: string,
  subtotalINR: number,
  productId?: string
): Promise<CouponValidationResult> {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: "Coupon code cannot be empty.",
    };
  }

  let coupon: Coupon | null = null;
  let adminClient: ReturnType<typeof createAdminClient> | null = null;

  try {
    adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from("coupons")
      .select("*")
      .ilike("code", code)
      .eq("active", true)
      .maybeSingle();

    if (!error && data) {
      coupon = data as Coupon;
    }
  } catch {
    // Database fallback
  }

  // Fallback to in-memory launch coupons
  if (!coupon && DEFAULT_COUPONS[code]) {
    coupon = DEFAULT_COUPONS[code];
  }

  if (!coupon) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: "Invalid or inactive coupon code.",
    };
  }

  // 1. Check validity dates
  const now = Date.now();
  if (coupon.starts_at && new Date(coupon.starts_at).getTime() > now) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: "This coupon is not active yet.",
    };
  }

  if (coupon.expires_at && new Date(coupon.expires_at).getTime() < now) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: "This coupon has expired.",
    };
  }

  // 2. Check usage limit
  if (
    typeof coupon.usage_limit === "number" &&
    coupon.usage_limit > 0 &&
    typeof coupon.times_used === "number" &&
    coupon.times_used >= coupon.usage_limit
  ) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: "This coupon has reached its maximum usage limit.",
    };
  }

  // 3. Check minimum order value
  if (coupon.minimum_order_value && subtotalINR < coupon.minimum_order_value) {
    return {
      valid: false,
      discountAmount: 0,
      finalPrice: subtotalINR,
      error: `Minimum order value for this coupon is ₹${coupon.minimum_order_value}.`,
    };
  }

  // 4. Check product-specific restrictions in coupon_products table
  if (adminClient && productId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(productId)) {
    try {
      const { data: allowedProducts } = await adminClient
        .from("coupon_products")
        .select("product_id")
        .eq("coupon_id", coupon.id);

      if (allowedProducts && allowedProducts.length > 0) {
        const isAllowed = allowedProducts.some((p) => p.product_id === productId);
        if (!isAllowed) {
          return {
            valid: false,
            discountAmount: 0,
            finalPrice: subtotalINR,
            error: "This coupon is not applicable to the selected product.",
          };
        }
      }
    } catch {
      // Non-blocking
    }
  }

  // 5. Calculate discount in INR
  let discountAmount = 0;
  if (coupon.discount_type === "percentage") {
    discountAmount = Math.round((subtotalINR * coupon.discount_value) / 100);
  } else {
    discountAmount = Math.round(coupon.discount_value);
  }

  // Discount cannot exceed subtotal
  discountAmount = Math.min(discountAmount, subtotalINR);
  const finalPrice = Math.max(0, subtotalINR - discountAmount);

  return {
    valid: true,
    coupon,
    discountAmount,
    finalPrice,
  };
}
