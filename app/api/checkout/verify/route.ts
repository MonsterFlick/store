import { NextResponse } from "next/server";
import { verifyRazorpayPaymentSignature } from "@/lib/razorpay/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getProductBySlug } from "@/lib/products/registry";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isDev = process.env.NODE_ENV !== "production";
    const isMockEnv =
      env.NEXT_PUBLIC_RAZORPAY_KEY_ID.includes("mock") ||
      env.RAZORPAY_KEY_SECRET.includes("mock") ||
      env.NEXT_PUBLIC_SUPABASE_URL.includes("mock-project");

    const userId = user?.id || (isDev ? "dev-user-id" : null);

    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required to confirm payment." },
        { status: 401 }
      );
    }

    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      productSlug,
      internalOrderId,
    } = await request.json();

    if (!razorpayOrderId || !razorpayPaymentId || !productSlug) {
      return NextResponse.json(
        { error: "Missing required payment verification fields." },
        { status: 400 }
      );
    }

    // 1. Production Security & Mock Disallowance
    const isMockOrder = razorpayOrderId.startsWith("order_mock_");
    if (!isDev && isMockOrder) {
      return NextResponse.json(
        { error: "Mock orders are not allowed in production." },
        { status: 400 }
      );
    }

    // In production or when using real keys, signature is strictly required
    if (!isDev || !isMockOrder) {
      if (!razorpaySignature) {
        return NextResponse.json(
          { error: "Missing cryptographic payment signature." },
          { status: 400 }
        );
      }

      const isValid = verifyRazorpayPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature
      );

      if (!isValid) {
        return NextResponse.json(
          { error: "Cryptographic payment signature verification failed." },
          { status: 400 }
        );
      }
    }

    const admin = createAdminClient();

    // 2. IDEMPOTENCY CHECK: Check if this payment was already recorded
    const { data: existingPayment } = await admin
      .from("payments")
      .select("id, order_id")
      .eq("razorpay_payment_id", razorpayPaymentId)
      .maybeSingle();

    if (existingPayment) {
      return NextResponse.json({
        success: true,
        message: "Payment already confirmed and access active.",
      });
    }

    // 3. Resolve Product UUID from Supabase products table
    let productDbId: string | null = null;
    try {
      const { data: dbProduct } = await admin
        .from("products")
        .select("id, slug, name")
        .eq("slug", productSlug)
        .maybeSingle();

      if (dbProduct) {
        productDbId = dbProduct.id;
      }
    } catch {
      // Database fallback
    }

    // If database lookup failed or in dev mock mode, check registry
    const registryProduct = getProductBySlug(productSlug);
    if (!productDbId && !isMockEnv) {
      return NextResponse.json(
        { error: "Product record not found in database." },
        { status: 404 }
      );
    }

    // Fallback ID only for dev mock testing without a connected database
    const resolvedProductId = productDbId || "00000000-0000-0000-0000-000000000001";

    // 4. Resolve or update internal order
    let resolvedOrderId = internalOrderId;
    let orderAmount = registryProduct?.price || 0;

    if (internalOrderId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(internalOrderId)) {
      try {
        const { data: orderRecord } = await admin
          .from("orders")
          .select("id, total, status")
          .eq("id", internalOrderId)
          .maybeSingle();

        if (orderRecord) {
          orderAmount = Number(orderRecord.total) || orderAmount;
          if (orderRecord.status !== "paid") {
            await admin
              .from("orders")
              .update({
                status: "paid",
                razorpay_order_id: razorpayOrderId,
                updated_at: new Date().toISOString(),
              })
              .eq("id", internalOrderId);
          }
        }
      } catch (err) {
        console.warn("Order lookup/update warning:", err);
      }
    } else {
      // If internalOrderId is not a valid UUID, create a valid order record or query by razorpay_order_id
      try {
        const { data: orderByRzp } = await admin
          .from("orders")
          .select("id, total")
          .eq("razorpay_order_id", razorpayOrderId)
          .maybeSingle();

        if (orderByRzp) {
          resolvedOrderId = orderByRzp.id;
          orderAmount = Number(orderByRzp.total) || orderAmount;
          await admin
            .from("orders")
            .update({ status: "paid", updated_at: new Date().toISOString() })
            .eq("id", resolvedOrderId);
        } else {
          // Create new paid order record with proper UUID
          const { data: newOrder } = await admin
            .from("orders")
            .insert({
              user_id: userId,
              status: "paid",
              currency: "INR",
              subtotal: orderAmount,
              discount: 0,
              total: orderAmount,
              razorpay_order_id: razorpayOrderId,
            })
            .select("id")
            .single();

          if (newOrder) {
            resolvedOrderId = newOrder.id;
          }
        }
      } catch (err) {
        console.warn("Fallback order creation warning:", err);
      }
    }

    // Ensure resolvedOrderId is a valid UUID for DB foreign key
    const isUuidOrder = resolvedOrderId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedOrderId);
    const validOrderUuid = isUuidOrder ? resolvedOrderId : (isMockEnv ? "00000000-0000-0000-0000-000000000002" : null);

    if (!validOrderUuid && !isMockEnv) {
      return NextResponse.json(
        { error: "Could not link payment to a valid database order UUID." },
        { status: 500 }
      );
    }

    // 5. Record payment in payments table
    try {
      if (validOrderUuid) {
        await admin.from("payments").insert({
          order_id: validOrderUuid,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_order_id: razorpayOrderId,
          razorpay_signature: razorpaySignature || null,
          amount: orderAmount,
          currency: "INR",
          status: "captured",
          method: "razorpay",
          created_at: new Date().toISOString(),
        });
      }
    } catch (paymentErr) {
      console.warn("Payment log insert warning:", paymentErr);
    }

    // 6. Grant Entitlement using Postgres UUID
    try {
      if (validOrderUuid) {
        await admin.from("entitlements").upsert(
          {
            user_id: userId,
            product_id: resolvedProductId,
            order_id: validOrderUuid,
            status: "active",
            starts_at: new Date().toISOString(),
            expires_at: null,
          },
          { onConflict: "user_id,product_id" }
        );

        // If product has bundle items, grant them too
        if (registryProduct?.includedSlugs && registryProduct.includedSlugs.length > 0) {
          for (const incSlug of registryProduct.includedSlugs) {
            const { data: incProd } = await admin
              .from("products")
              .select("id")
              .eq("slug", incSlug)
              .maybeSingle();

            if (incProd) {
              await admin.from("entitlements").upsert(
                {
                  user_id: userId,
                  product_id: incProd.id,
                  order_id: validOrderUuid,
                  status: "active",
                  starts_at: new Date().toISOString(),
                },
                { onConflict: "user_id,product_id" }
              );
            }
          }
        }

        // 7. Log authentic analytics event
        await admin.from("analytics_events").insert({
          user_id: userId,
          product_id: resolvedProductId,
          event_type: "payment_success",
          metadata: {
            order_id: validOrderUuid,
            razorpay_order_id: razorpayOrderId,
            amount_inr: orderAmount,
          },
        });
      }
    } catch (entitlementErr) {
      console.error("Entitlement fulfillment error:", entitlementErr);
      if (!isMockEnv) {
        return NextResponse.json(
          { error: "Failed to fulfill product entitlement." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment confirmed and access granted.",
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: (err as Error).message || "Verification failed" },
      { status: 500 }
    );
  }
}
