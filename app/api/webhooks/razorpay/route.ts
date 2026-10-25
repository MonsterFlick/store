import { NextResponse } from "next/server";
import { verifyRazorpayWebhookSignature } from "@/lib/razorpay/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductBySlug } from "@/lib/products/registry";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    // 1. Verify cryptographic signature with timing-safe length check
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error("❌ Invalid Razorpay webhook signature");
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;

    // We process payment.captured or order.paid
    if (eventType !== "payment.captured" && eventType !== "order.paid") {
      return NextResponse.json({ message: `Ignored event ${eventType}` });
    }

    const paymentEntity = event.payload?.payment?.entity || event.payload?.order?.entity;
    const razorpayPaymentId = paymentEntity?.id;
    const razorpayOrderId = paymentEntity?.order_id || event.payload?.order?.entity?.id;
    const amountInPaise = paymentEntity?.amount || 0;
    const amountInINR = amountInPaise / 100;
    const notes = paymentEntity?.notes || {};

    const internalOrderId = notes.internal_order_id;
    const userId = notes.user_id;
    const productSlug = notes.product_slug;
    const noteProductId = notes.product_id;

    if (!razorpayPaymentId || !razorpayOrderId) {
      return NextResponse.json(
        { error: "Incomplete payment entity payload." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 2. IDEMPOTENCY CHECK: Check if this payment is already processed
    const { data: existingPayment } = await supabase
      .from("payments")
      .select("id")
      .eq("razorpay_payment_id", razorpayPaymentId)
      .maybeSingle();

    if (existingPayment) {
      console.log(`ℹ️ Payment [${razorpayPaymentId}] already processed. Idempotent return.`);
      return NextResponse.json({ message: "Payment already processed." });
    }

    // 3. Resolve internal order record from database
    let resolvedUserId: string | null = userId || null;
    let validOrderUuid: string | null = null;
    let resolvedProductId: string | null = null;
    let resolvedProductSlug: string | null = productSlug || null;

    let orderRec: any = null;
    if (internalOrderId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(internalOrderId)) {
      const { data } = await supabase
        .from("orders")
        .select("id, user_id, status, coupon_id, order_items(product_id)")
        .eq("id", internalOrderId)
        .maybeSingle();
      orderRec = data;
    }

    if (!orderRec && razorpayOrderId) {
      const { data } = await supabase
        .from("orders")
        .select("id, user_id, status, coupon_id, order_items(product_id)")
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();
      orderRec = data;
    }

    if (orderRec) {
      validOrderUuid = orderRec.id;
      if (!resolvedUserId && orderRec.user_id) {
        resolvedUserId = orderRec.user_id;
      }
      const orderItems = orderRec.order_items;
      const dbProductId = Array.isArray(orderItems) ? orderItems[0]?.product_id : orderItems?.product_id;
      if (dbProductId) {
        resolvedProductId = dbProductId;
      }
    }

    // Fallback: If product_id was in notes and not yet resolved from order_items
    if (!resolvedProductId && noteProductId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(noteProductId)) {
      resolvedProductId = noteProductId;
    }

    // Fallback: Resolve product UUID from slug if needed
    if (!resolvedProductId && resolvedProductSlug) {
      const { data: prodRec } = await supabase
        .from("products")
        .select("id")
        .eq("slug", resolvedProductSlug)
        .maybeSingle();

      if (prodRec) {
        resolvedProductId = prodRec.id;
      }
    }

    // Resolve product slug from UUID if not already known
    if (resolvedProductId && !resolvedProductSlug) {
      const { data: prodRec } = await supabase
        .from("products")
        .select("slug")
        .eq("id", resolvedProductId)
        .maybeSingle();

      if (prodRec?.slug) {
        resolvedProductSlug = prodRec.slug;
      }
    }

    // Atomic update order status to 'paid' and track coupon usage
    if (validOrderUuid && orderRec?.status !== "paid") {
      await supabase
        .from("orders")
        .update({
          status: "paid",
          razorpay_order_id: razorpayOrderId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", validOrderUuid);

      if (orderRec?.coupon_id) {
        try {
          await supabase.rpc("increment_coupon_usage", { c_id: orderRec.coupon_id });
        } catch {
          const { data: cData } = await supabase
            .from("coupons")
            .select("times_used")
            .eq("id", orderRec.coupon_id)
            .single();
          if (cData) {
            await supabase
              .from("coupons")
              .update({ times_used: (cData.times_used || 0) + 1 })
              .eq("id", orderRec.coupon_id);
          }
        }
      }
    }

    // 4. Record payment log with valid UUID
    if (validOrderUuid) {
      await supabase.from("payments").insert({
        order_id: validOrderUuid,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        razorpay_signature: signature,
        amount: amountInINR,
        currency: "INR",
        status: "captured",
        method: paymentEntity?.method || "razorpay",
        created_at: new Date().toISOString(),
      });
    }

    // 5. Grant Entitlements using Postgres UUIDs
    if (resolvedUserId && resolvedProductId && validOrderUuid) {
      const product = resolvedProductSlug ? getProductBySlug(resolvedProductSlug) : null;

      // Create primary product entitlement
      await supabase.from("entitlements").upsert(
        {
          user_id: resolvedUserId,
          product_id: resolvedProductId,
          order_id: validOrderUuid,
          status: "active",
          starts_at: new Date().toISOString(),
          expires_at: null, // lifetime access
        },
        { onConflict: "user_id,product_id" }
      );

      // 7. Bundle Handling: If the product contains included products, grant them too
      if (product?.includedSlugs && product.includedSlugs.length > 0) {
        for (const includedSlug of product.includedSlugs) {
          const { data: incProd } = await supabase
            .from("products")
            .select("id")
            .eq("slug", includedSlug)
            .maybeSingle();

          if (incProd) {
            await supabase.from("entitlements").upsert(
              {
                user_id: resolvedUserId,
                product_id: incProd.id,
                order_id: validOrderUuid,
                status: "active",
                starts_at: new Date().toISOString(),
                expires_at: null,
              },
              { onConflict: "user_id,product_id" }
            );
          }
        }
      }

      // 8. Log authentic analytics event with product UUID
      await supabase.from("analytics_events").insert({
        user_id: resolvedUserId,
        product_id: resolvedProductId,
        event_type: "payment_success",
        metadata: {
          order_id: validOrderUuid,
          razorpay_order_id: razorpayOrderId,
          amount_inr: amountInINR,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Order fulfilled and entitlement granted.",
    });
  } catch (err) {
    console.error("Razorpay webhook error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
