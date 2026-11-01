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
import { BundleIncludedSection } from "@/components/store/BundleIncludedSection";
import { BundleUpsellBanner } from "@/components/store/BundleUpsellBanner";
import { EditorialCurriculum } from "@/components/store/EditorialCurriculum";
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Lock,
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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://store.sowebuild.in";
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
        name: "Publications",
        item: `${appUrl}/#catalog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${appUrl}/products/${product.slug}`,
      },
    ],
  };

  // Curated highlights (4 high-signal editorial points)
  const isBundle = product.type === "bundle" || (product.includedSlugs && product.includedSlugs.length > 0);
  const curatedHighlights = isBundle
    ? [
        {
          title: "The 8-Second Recruiter Scan",
          desc: "ATS algorithm indexing rules, keyword placement, and the ACR (Action-Context-Result) bullet formula.",
        },
        {
          title: "Proof of Competence Audits",
          desc: "Restructuring GitHub repos and engineering case studies so tech leads cannot dismiss your code.",
        },
        {
          title: "Sniper Outreach & Sourcing",
          desc: "Direct cold DM scripts that get recruiter and founder replies, plus Naukri Resdex visibility dominance.",
        },
        {
          title: "Compensation & Timing Math",
          desc: "Timing counter-offers, leverage arithmetic, and realistic negotiation frameworks for the tech market.",
        },
      ]
    : [
        {
          title: "144 Verified Employers",
          desc: "Curated tech companies hiring across India and worldwide remote without whiteboard trivia.",
        },
        {
          title: "Evaluation Formats",
          desc: "Exact breakdown of practical interview rounds, pairing sessions, and take-home assignments.",
        },
        {
          title: "Direct Careers Links",
          desc: "Verified application URLs and contact pathways for every cataloged organization.",
        },
        {
          title: "Continuous Updates",
          desc: "Regularly revised hiring criteria, remote eligibility tags, and bookmarkable shortlist tools.",
        },
      ];

  // Curated 3-question FAQ
  const curatedFaq = product.faq?.slice(0, 3) || [];

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

      <main className="flex-1 pt-20">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#catalog"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Catalogue</span>
          </Link>
        </div>

        {/* Suggestion Upsell Banner if user is viewing hiring-organizations */}
        {slug === "hiring-organizations" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <BundleUpsellBanner />
          </div>
        )}

        {/* Editorial Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Editorial Presentation */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header Folio */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="uppercase font-semibold tracking-wider text-indigo-600 dark:text-indigo-400">
                    {isBundle ? "EDITION № 01 · CAREER BUNDLE" : "EDITION № 02 · DIRECTORY"}
                  </span>
                  <span>·</span>
                  <span>PERPETUAL ACCESS</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] font-display">
                  {product.name}
                </h1>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-serif italic">
                  {product.tagline}
                </p>
              </div>

              {/* Concise Editorial Summary */}
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-l-2 border-indigo-500/40 pl-4 py-0.5">
                <p>{product.description}</p>
              </div>

              {/* Dedicated Bundle Breakdown (if bundle) */}
              {isBundle && <BundleIncludedSection />}

              {/* Curated Highlights (4 Pillars) */}
              <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Core Architecture
                  </h3>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] font-display">
                    What You&apos;ll Master
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {curatedHighlights.map((feat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <h5 className="text-xs font-bold text-[var(--text-primary)]">
                          {feat.title}
                        </h5>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-6">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table of Contents / Curriculum */}
              {content && content.chapters && content.chapters.length > 0 && (
                <EditorialCurriculum chapters={content.chapters} />
              )}

              {/* Curated FAQ */}
              {curatedFaq.length > 0 && (
                <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-3">
                    {curatedFaq.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5"
                      >
                        <h4 className="text-xs font-semibold text-[var(--text-primary)] flex items-start gap-2">
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{item.question}</span>
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5.5">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* License Colophon */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center space-x-2 text-[11px] font-mono text-[var(--text-muted)]">
                <Lock className="w-3.5 h-3.5 shrink-0 opacity-70" />
                <span>
                  Single-user personal license with perpetual digital reader access across two authorized devices.
                </span>
              </div>

              {/* Verified Purchaser Reviews */}
              <div className="pt-6 border-t border-[var(--border-subtle)]">
                <ProductReviews productSlug={product.slug} isEntitled={isEntitled} />
              </div>
            </div>

            {/* Right Column: Sticky Pricing & Action Card */}
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
