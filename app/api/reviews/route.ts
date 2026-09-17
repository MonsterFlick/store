import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUserEntitlement } from "@/lib/entitlements/verify";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required to leave a review." },
      { status: 401 }
    );
  }

  const { productSlug, rating, title, content } = await request.json();

  if (!productSlug || !rating || !title || !content) {
    return NextResponse.json(
      { error: "Missing required review fields." },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 1 and 5." },
      { status: 400 }
    );
  }

  // 1. Verify that user has an active entitlement for this product
  const entitlementCheck = await verifyUserEntitlement(user.id, productSlug);
  if (!entitlementCheck.entitled) {
    return NextResponse.json(
      {
        error:
          "Reviews are restricted strictly to verified purchasers. No entitlement found.",
      },
      { status: 403 }
    );
  }

  // 2. Resolve product UUID from database
  const admin = createAdminClient();
  let productDbId: string | null = null;
  try {
    const { data: dbProd } = await admin
      .from("products")
      .select("id")
      .eq("slug", productSlug)
      .maybeSingle();

    if (dbProd) {
      productDbId = dbProd.id;
    }
  } catch {
    // Database fallback
  }

  const resolvedProductId = productDbId || "00000000-0000-0000-0000-000000000001";
  const validOrderUuid = entitlementCheck.orderId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(entitlementCheck.orderId)
    ? entitlementCheck.orderId
    : "00000000-0000-0000-0000-000000000002";

  // 3. Insert or update review with UUIDs
  const { data, error } = await admin
    .from("reviews")
    .upsert(
      {
        user_id: user.id,
        product_id: resolvedProductId,
        order_id: validOrderUuid,
        rating,
        title,
        content,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,product_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message || "Failed to submit review." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, review: data });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get("productSlug");

  if (!productSlug) {
    return NextResponse.json(
      { error: "Product slug required." },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  let productDbId: string | null = null;

  try {
    const { data: dbProd } = await admin
      .from("products")
      .select("id")
      .eq("slug", productSlug)
      .maybeSingle();

    if (dbProd) {
      productDbId = dbProd.id;
    }
  } catch {
    // Database fallback
  }

  if (!productDbId) {
    return NextResponse.json({ reviews: [] });
  }

  const { data: reviews } = await admin
    .from("reviews")
    .select("id, rating, title, content, created_at, user_id")
    .eq("product_id", productDbId)
    .order("created_at", { ascending: false });

  return NextResponse.json({ reviews: reviews || [] });
}
