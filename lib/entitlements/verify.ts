import { createClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export interface Entitlement {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string;
  plan_id?: string | null;
  license_id?: string | null;
  status: "active" | "expired" | "revoked";
  starts_at: string;
  expires_at?: string | null;
  created_at: string;
}

/**
 * Checks if a user possesses an active entitlement for a product (directly or via a purchased bundle).
 */
export async function verifyUserEntitlement(
  userId: string,
  productSlug: string
): Promise<{
  entitled: boolean;
  entitlement?: Entitlement | null;
  orderId?: string;
}> {
  const supabase = await createClient();

  // 1. Resolve product ID from slug
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id, slug")
    .eq("slug", productSlug)
    .single();

  if (productError || !productData) {
    // Check if running in development mode with mock credentials
    if (env.NEXT_PUBLIC_SUPABASE_URL.includes("mock-project")) {
      // Allow dev test bypass if authenticated or configured
      return {
        entitled: true,
        entitlement: {
          id: "dev-entitlement",
          user_id: userId,
          product_id: "dev-prod-1",
          order_id: "ORD-DEV-9999",
          status: "active",
          starts_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        },
        orderId: "ORD-DEV-9999",
      };
    }
    return { entitled: false };
  }

  const productId = productData.id;

  // 2. Query direct entitlement
  const { data: directEntitlement } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("status", "active")
    .maybeSingle();

  if (directEntitlement) {
    // Check expiration if time-limited
    if (directEntitlement.expires_at) {
      const expires = new Date(directEntitlement.expires_at).getTime();
      if (Date.now() > expires) {
        return { entitled: false };
      }
    }

    return {
      entitled: true,
      entitlement: directEntitlement as Entitlement,
      orderId: directEntitlement.order_id,
    };
  }

  // 3. Check if user owns a bundle containing this product
  const { data: bundleItems } = await supabase
    .from("bundle_items")
    .select("bundle_product_id")
    .eq("included_product_id", productId);

  if (bundleItems && bundleItems.length > 0) {
    const bundleProductIds = bundleItems.map((b) => b.bundle_product_id);

    const { data: bundleEntitlement } = await supabase
      .from("entitlements")
      .select("*")
      .eq("user_id", userId)
      .in("product_id", bundleProductIds)
      .eq("status", "active")
      .maybeSingle();

    if (bundleEntitlement) {
      return {
        entitled: true,
        entitlement: bundleEntitlement as Entitlement,
        orderId: bundleEntitlement.order_id,
      };
    }
  }

  return { entitled: false };
}
