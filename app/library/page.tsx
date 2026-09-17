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

import { env } from "@/lib/env";

export default async function LibraryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If in production with live Supabase and not logged in, redirect to login
  if (!user && !env.NEXT_PUBLIC_SUPABASE_URL.includes("mock-project")) {
    redirect("/auth/login?next=/library");
  }

  const userId = user?.id || "dev-user-id";

  // Query user's active entitlements
  const { data: entitlements } = await supabase
    .from("entitlements")
    .select("product_id, status")
    .eq("user_id", userId)
    .eq("status", "active");

  let entitledProducts: ProductDefinition[] = [];

  if (entitlements && entitlements.length > 0) {
    const productSlugs = entitlements.map((e) => e.product_id);
    entitledProducts = productSlugs
      .map((slug) => getProductBySlug(slug))
      .filter((p): p is ProductDefinition => p !== null);
  } else {
    // In local development preview mode, show available catalog publications so the reader is testable
    entitledProducts = getAllProducts();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full space-y-8">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            My Digital Library
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Purchased publications, interactive handbooks, and custom experiences
          </p>
        </div>

        <LibraryList entitledProducts={entitledProducts} />
      </main>

      <Footer />
    </div>
  );
}
