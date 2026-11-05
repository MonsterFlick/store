import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAllProducts, getProductBySlug } from "@/lib/products/registry";
import { ProductDefinition } from "@/lib/products/types";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { LibraryList } from "@/components/library/LibraryList";
import { BookOpen, Sparkles } from "lucide-react";

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/library");
  }

  const userId = user.id;

  // Query user's active entitlements with product slug lookup
  const { data: entitlements } = await supabase
    .from("entitlements")
    .select("product_id, products(slug), status")
    .eq("user_id", userId)
    .eq("status", "active");

  let entitledProducts: ProductDefinition[] = [];

  if (entitlements && entitlements.length > 0) {
    const productSlugs = entitlements
      .map((e: any) => (e.products && e.products.slug) || e.product_id)
      .filter(Boolean);

    entitledProducts = productSlugs
      .map((slug: string) => getProductBySlug(slug))
      .filter((p): p is ProductDefinition => p !== null);

    // Fallback: If joined product slug was not available and product_id is UUID, resolve via database
    if (entitledProducts.length === 0 && entitlements.length > 0) {
      try {
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const admin = createAdminClient();
        const productUuids = entitlements.map((e) => e.product_id);
        const { data: dbProducts } = await admin
          .from("products")
          .select("id, slug")
          .in("id", productUuids);

        if (dbProducts && dbProducts.length > 0) {
          entitledProducts = dbProducts
            .map((p) => getProductBySlug(p.slug))
            .filter((p): p is ProductDefinition => p !== null);
        }
      } catch {
        // Fallback gracefully
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] relative overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="kr-orb w-[450px] sm:w-[650px] h-[350px] sm:h-[450px] -top-24 left-1/4 -translate-x-1/2 bg-indigo-500/10 dark:bg-indigo-600/15" />
      <div className="kr-grid-bg absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 flex-1 w-full space-y-8 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
            My Digital Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Purchased publications, interactive handbooks, and custom experiences
          </p>
        </div>

        <LibraryList entitledProducts={entitledProducts} />
      </main>

      <Footer />
    </div>
  );
}
