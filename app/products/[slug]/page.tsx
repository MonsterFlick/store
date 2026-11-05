import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProductContent, getAllProducts } from "@/lib/products/registry";
import { createClient } from "@/lib/supabase/server";
import { verifyUserEntitlement } from "@/lib/entitlements/verify";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductEcommerceHero } from "@/components/store/ProductEcommerceHero";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { BundleIncludedSection } from "@/components/store/BundleIncludedSection";
import { BundleUpsellBanner } from "@/components/store/BundleUpsellBanner";
import { EditorialCurriculum } from "@/components/store/EditorialCurriculum";
import { ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://store.sowebuild.in";
  const canonicalUrl = `${appUrl}/products/${product.slug}`;

  return {
    title: product.name,
    description: product.tagline,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} — SoWeBuild Store`,
      description: product.tagline,
      url: canonicalUrl,
      siteName: "SoWeBuild Store",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
      images: ["/og-image.png"],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const content = getProductContent(slug);
  const previewChapter =
    content?.chapters.find((c) => c.isFreePreview) ||
    content?.chapters[0] ||
    null;

  // Check if current user is already entitled
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isEntitled = false;
  if (user) {
    const check = await verifyUserEntitlement(user.id, slug);
    isEntitled = check.entitled;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://store.sowebuild.in";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${appUrl}/brand/products/${product.slug}.svg`,
    category: product.categories.join(", "),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${appUrl}/products/${product.slug}`,
    },
  };

  const isBundle = product.type === "bundle" || (product.includedSlugs && product.includedSlugs.length > 0);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] relative overflow-hidden">
      {/* Background Lighting Aura */}
      <div className="kr-orb w-[500px] sm:w-[750px] h-[380px] sm:h-[500px] -top-24 left-1/3 -translate-x-1/2 bg-purple-600/10 dark:bg-purple-600/15 pointer-events-none" />
      <div className="kr-grid-bg absolute inset-0 z-0 opacity-20 pointer-events-none" />

      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-14">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <Link href="/#catalog" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
              Publications
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-950 dark:text-white font-semibold truncate max-w-[220px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Upsell Banner if viewing individual directory */}
          {slug === "hiring-organizations" && <BundleUpsellBanner />}

          {/* 1. Core E-commerce Hero: Left Editorial Product Card + Right Buy Box */}
          <ProductEcommerceHero
            product={product}
            previewChapter={previewChapter}
            isAlreadyPurchased={isEntitled}
          />

          {/* 2. What's Included (Visual Dual-Release Cards if Bundle) */}
          {isBundle && <BundleIncludedSection />}

          {/* 3. Table of Contents / Curriculum (Collapsible Accordion) */}
          {content && content.chapters && content.chapters.length > 0 && (
            <EditorialCurriculum chapters={content.chapters} />
          )}

          {/* 4. Verified Customer Reviews */}
          <section className="pt-8 border-t border-black/[0.08] dark:border-white/10">
            <ProductReviews productSlug={product.slug} isEntitled={isEntitled} />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
