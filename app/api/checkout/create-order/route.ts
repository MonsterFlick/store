import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductBySlug } from "@/lib/products/registry";
import { validateCouponServerSide } from "@/lib/commerce/coupons";
import { createRazorpayOrder } from "@/lib/razorpay/client";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDev = process.env.NODE_ENV !== "production";
  const isMockEnv =
    env.NEXT_PUBLIC_RAZORPAY_KEY_ID.includes("mock") ||
    env.NEXT_PUBLIC_SUPABASE_URL.includes("mock-project");

  const userId = user?.id || (isDev ? "dev-user-id" : null);

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required to initiate purchase." },
      { status: 401 }
    );
  }

  try {
    const { productSlug, couponCode } = await request.json();

    if (!productSlug) {
      return NextResponse.json(
        { error: "Product slug is required." },
        { status: 400 }
      );
    }

    // 1. Resolve product definition from registry and Supabase database
    const product = getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found in store registry." },
        { status: 404 }
      );
    }

    const admin = createAdminClient();
    let productDbId: string | null = null;

    try {
      const { data: dbProd } = await admin
        .from("products")
        .select("id, slug, name, status")
        .eq("slug", productSlug)
        .maybeSingle();

      if (dbProd) {
        productDbId = dbProd.id;
      }
    } catch {
      // Database fallback
    }

    if (!productDbId && !isMockEnv) {
      return NextResponse.json(
        { error: "Product record not found in database." },
        { status: 404 }
      );
    }

    const resolvedProductId = productDbId || "00000000-0000-0000-0000-000000000001";

    // 2. Check existing entitlement using Postgres UUID
    try {
      const { data: existingEntitlement } = await admin
        .from("entitlements")
        .select("id")
        .eq("user_id", userId)
        .eq("product_id", resolvedProductId)
        .eq("status", "active")
        .maybeSingle();

      if (existingEntitlement) {
        return NextResponse.json(
          { error: "You already own an active entitlement for this product." },
          { status: 400 }
        );
      }
    } catch {
      // Non-blocking in mock dev
    }

    // 3. Server-side Price & Coupon calculation
    const subtotalINR = product.price;
    let discountINR = 0;
    let couponId: string | null = null;

    if (couponCode) {
      const couponValidation = await validateCouponServerSide(
        couponCode,
        subtotalINR,
        resolvedProductId
      );

      if (!couponValidation.valid) {
        return NextResponse.json(
          { error: couponValidation.error || "Invalid coupon code." },
          { status: 400 }
        );
      }

      discountINR = couponValidation.discountAmount;
      couponId = couponValidation.coupon?.id || null;
    }

    const finalTotalINR = Math.max(0, subtotalINR - discountINR);
    const amountInPaise = Math.round(finalTotalINR * 100);

    // 4. Create internal order record in Supabase with proper UUIDs
    let internalOrderId = "";
    try {
      const { data: orderData, error: orderErr } = await admin
        .from("orders")
        .insert({
          user_id: userId,
          status: finalTotalINR === 0 ? "paid" : "pending",
          currency: "INR",
          subtotal: subtotalINR,
          discount: discountINR,
          total: finalTotalINR,
          coupon_id: couponId,
        })
        .select("id")
        .single();

      if (orderErr) throw orderErr;
      internalOrderId = orderData.id;

      // Insert order item with Postgres UUID foreign keys
      await admin.from("order_items").insert({
        order_id: internalOrderId,
        product_id: resolvedProductId,
        unit_price: subtotalINR,
        discount: discountINR,
        final_price: finalTotalINR,
      });
    } catch (dbErr) {
      console.error("Order creation database error:", dbErr);
      if (!isMockEnv) {
        return NextResponse.json(
          { error: "Failed to create order record in database." },
          { status: 500 }
        );
      }
      internalOrderId = "00000000-0000-0000-0000-000000000002";
    }

    // 5. Handle 100% Discount / Free (₹0) Orders
    // Razorpay requires minimum amount >= ₹1.00 (100 paise). Free orders fulfill immediately.
    if (finalTotalINR === 0 || amountInPaise === 0) {
      try {
        await admin.from("entitlements").upsert(
          {
            user_id: userId,
            product_id: resolvedProductId,
            order_id: internalOrderId,
            status: "active",
            starts_at: new Date().toISOString(),
            expires_at: null,
          },
          { onConflict: "user_id,product_id" }
        );

        // Increment coupon usage
        if (couponId) {
          try {
            await admin.rpc("increment_coupon_usage", { c_id: couponId });
          } catch {
            // Fallback manual increment if RPC not installed
            const { data: cData } = await admin.from("coupons").select("times_used").eq("id", couponId).single();
            if (cData) {
              await admin.from("coupons").update({ times_used: (cData.times_used || 0) + 1 }).eq("id", couponId);
            }
          }
        }
      } catch (fErr) {
        console.warn("Free order fulfillment warning:", fErr);
      }

      return NextResponse.json({
        freeOrder: true,
        redirectUrl: `/library/${product.slug}`,
        message: "Free order completed and entitlement granted.",
      });
    }

    // 6. Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amountInPaise,
      currency: "INR",
      receipt: internalOrderId,
      notes: {
        internal_order_id: internalOrderId,
        user_id: userId,
        product_slug: product.slug,
        product_id: resolvedProductId,
      },
    });

    // 7. Update internal order with razorpay_order_id
    try {
      await admin
        .from("orders")
        .update({ razorpay_order_id: razorpayOrder.id })
        .eq("id", internalOrderId);
    } catch (updErr) {
      console.warn("Order razorpay_order_id link warning:", updErr);
    }

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      keyId: env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      internalOrderId,
      productName: product.name,
      userEmail: user?.email || "customer@om.store",
      userName: user?.user_metadata?.full_name || "Customer",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
