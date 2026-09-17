import { NextResponse } from "next/server";
import { loadProtectedProduct } from "@/lib/products/loader";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const result = await loadProtectedProduct(slug);

  if (result.status === "not_found") {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (result.status === "unauthenticated") {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  if (result.status === "device_limit_exceeded") {
    return NextResponse.json(
      {
        error: "Active device limit reached (Maximum 2 devices).",
        activeDevices: result.activeDevices,
      },
      { status: 403 }
    );
  }

  if (result.status === "unauthorized") {
    return NextResponse.json(
      { error: "Active entitlement required to view this product." },
      { status: 403 }
    );
  }

  // Log product_open event using proper product UUID
  try {
    const admin = createAdminClient();
    const { data: dbProd } = await admin
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (dbProd?.id) {
      await admin.from("analytics_events").insert({
        user_id: result.user.id,
        product_id: dbProd.id,
        event_type: "product_open",
        metadata: { order_id: result.orderId },
      });
    }
  } catch {
    // Non-blocking telemetry
  }

  return NextResponse.json({
    product: result.product,
    content: result.content,
    user: result.user,
    orderId: result.orderId,
  });
}
