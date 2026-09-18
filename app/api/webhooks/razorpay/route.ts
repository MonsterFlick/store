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

    // 3. Resolve internal order UUID
    let validOrderUuid: string | null = null;

    if (internalOrderId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(internalOrderId)) {
      validOrderUuid = internalOrderId;
    } else {
      // Find order by razorpay_order_id
      const { data: orderRec } = await supabase
        .from("orders")
        .select("id")
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();

      if (orderRec) {
        validOrderUuid = orderRec.id;
      }
    }

    // Update order status to 'paid'
    if (validOrderUuid) {
      await supabase
        .from("orders")
        .update({
          status: "paid",
          razorpay_order_id: razorpayOrderId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", validOrderUuid);
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

    // 5. Resolve Product UUID from Supabase
    let resolvedProductId: string | null = null;
    if (noteProductId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(noteProductId)) {
      resolvedProductId = noteProductId;
    } else if (productSlug) {
      const { data: prodRec } = await supabase
        .from("products")
        .select("id")
        .eq("slug", productSlug)
        .maybeSingle();

      if (prodRec) {
        resolvedProductId = prodRec.id;
      }
    }

    // 6. Grant Entitlements using Postgres UUIDs
    if (userId && resolvedProductId && validOrderUuid) {
      const product = productSlug ? getProductBySlug(productSlug) : null;

      // Create primary product entitlement
      await supabase.from("entitlements").upsert(
        {
          user_id: userId,
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
                user_id: userId,
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
        user_id: userId,
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
