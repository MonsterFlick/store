/**
 * Product Sync Script
 * Upserts registered products from lib/products/registry into the Supabase database.
 * Run with: npm run product:sync
 */

import { getAllProducts } from "../lib/products/registry";
import { createClient } from "@supabase/supabase-js";

async function syncProducts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to run product:sync.");
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const products = getAllProducts();
  console.log(`📦 Found ${products.length} registered products to synchronize...`);

  for (const prod of products) {
    console.log(`🔄 Syncing product: ${prod.name} (${prod.slug})...`);

    const { data, error } = await supabase
      .from("products")
      .upsert(
        {
          slug: prod.slug,
          name: prod.name,
          tagline: prod.tagline,
          description: prod.description,
          price: prod.price,
          currency: "INR",
          product_type: prod.type,
          status: "active",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      )
      .select("id, slug, name")
      .single();

    if (error) {
      console.error(`❌ Failed to sync ${prod.slug}:`, error.message);
    } else {
      console.log(`✅ Synced ${prod.slug} (UUID: ${data.id})`);
    }
  }

  console.log("✨ Product synchronization completed.");
}

syncProducts().catch((err) => {
  console.error("Unhandled error during sync:", err);
  process.exit(1);
});
