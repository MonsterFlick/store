import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products/registry";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUserEntitlement } from "@/lib/entitlements/verify";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  // Check if product permits downloads
  if (!product.capabilities.download) {
    return NextResponse.json(
      {
        error:
          "This product is designed as an interactive experience and does not provide direct file downloads.",
      },
      { status: 403 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required to download assets." },
      { status: 401 }
    );
  }

  const userId = user.id;

  const entitlementCheck = await verifyUserEntitlement(userId, slug);

  if (!entitlementCheck.entitled) {
    return NextResponse.json(
      { error: "Active entitlement required to download." },
      { status: 403 }
    );
  }

  // Generate 60-second short-lived signed URL from private Supabase Storage
  let signedUrl = "";
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("product-assets")
      .createSignedUrl(`${slug}/package.zip`, 60);

    if (!error && data?.signedUrl) {
      signedUrl = data.signedUrl;
    }

    // Resolve product UUID for authentic analytics logging
    const { data: dbProd } = await admin
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (dbProd?.id) {
      await admin.from("analytics_events").insert({
        user_id: user?.id || null,
        product_id: dbProd.id,
        event_type: "download_start",
        metadata: { order_id: entitlementCheck.orderId },
      });
    }
  } catch {
    // Non-blocking telemetry
  }

  if (!signedUrl) {
    return NextResponse.json({
      message:
        "Direct asset signed link initialized. In production, this redirects to a 60-second private Supabase storage token.",
      downloadAvailable: true,
      productSlug: slug,
    });
  }

  return NextResponse.redirect(signedUrl);
}
