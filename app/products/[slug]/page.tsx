import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProductContent, getAllProducts } from "@/lib/products/registry";
import { createClient } from "@/lib/supabase/server";
import { verifyUserEntitlement } from "@/lib/entitlements/verify";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductPricingSection } from "@/components/store/ProductPricingSection";
import { ProductReviews } from "@/components/reviews/ProductReviews";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileCode,
  Laptop,
} from "lucide-react";

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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://om.store";
  const canonicalUrl = `${appUrl}/products/${product.slug}`;

  return {
    title: product.name,
    description: product.tagline,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} — Digital Experience`,
      description: product.tagline,
      url: canonicalUrl,
      siteName: "Om Store",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.tagline,
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

  // JSON-LD Structured Data
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://om.store";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${appUrl}/og-image.png`,
    category: product.categories.join(", "),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${appUrl}/products/${product.slug}`,
    },
    hasPart: content?.chapters.map((ch, idx) => ({
      "@type": "Chapter",
      position: idx + 1,
      name: ch.title,
      description: ch.description,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: appUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${appUrl}/#products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${appUrl}/products/${product.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="flex-1">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <Link
            href="/#products"
            className="inline-flex items-center space-x-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Publications</span>
          </Link>
        </div>

        {/* Product Hero Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Product Presentation */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" className="capitalize">
                    {product.type} Experience
                  </Badge>
                  {product.categories.map((c) => (
                    <Badge key={c} variant="default">
                      {c}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                  {product.name}
                </h1>

                <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-editorial italic">
                  {product.tagline}
                </p>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>{product.description}</p>
              </div>

              {/* What You Get / Core Features */}
              <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Experience Highlights
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-start space-x-2.5 text-xs text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table of Contents Preview */}
              {content && content.chapters.length > 0 && (
                <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] flex items-center justify-between">
                    <span>Structured Curriculum</span>
                    <span className="font-mono text-xs text-[var(--text-muted)] font-normal">
                      {content.chapters.length} Chapters
                    </span>
                  </h3>

                  <div className="space-y-2">
                    {content.chapters.map((ch, idx) => (
                      <div
                        key={ch.id}
                        className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-card)] border border-[var(--border-subtle)] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-mono text-[var(--text-muted)] w-5">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="font-medium text-[var(--text-primary)]">
                            {ch.title}
                          </span>
                        </div>

                        {ch.isFreePreview && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-light)] text-[var(--accent-primary)] font-semibold">
                            Free Excerpt
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Licensing Information */}
              <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  License & Usage Terms
                </h3>
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] space-y-1.5">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">
                    {product.license.name}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {product.license.terms}
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              {product.faq && product.faq.length > 0 && (
                <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-3">
                    {product.faq.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5"
                      >
                        <h4 className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                          <span>{item.question}</span>
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Purchaser Reviews */}
              <div className="pt-8 border-t border-[var(--border-subtle)]">
                <ProductReviews productSlug={product.slug} isEntitled={isEntitled} />
              </div>
            </div>

            {/* Right Column: Sticky Pricing & Purchase Box */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <ProductPricingSection
                product={product}
                previewChapter={previewChapter}
                isAlreadyPurchased={isEntitled}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
