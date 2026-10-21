"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductDefinition } from "@/lib/products/types";
import { CheckoutButton } from "@/components/commerce/CheckoutButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { formatINR } from "@/lib/utils";
import {
  Sparkles,
  BookOpen,
  Building2,
  Star,
  ArrowRight,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FlagshipSpotlightProps {
  products: ProductDefinition[];
  onOpenPreview: (slug: string) => void;
}

export function FlagshipSpotlight({ products, onOpenPreview }: FlagshipSpotlightProps) {
  const [activeSlug, setActiveSlug] = useState<string>("the-job-search-book");

  const bookProduct = products.find((p) => p.slug === "the-job-search-book") || products[0];
  const orgProduct = products.find((p) => p.slug === "hiring-organizations") || products[1];

  const activeProduct = activeSlug === "the-job-search-book" ? bookProduct : orgProduct;

  if (!activeProduct) return null;

  return (
    <section id="flagships" className="py-24 sm:py-28 border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header with Switcher Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURRENT RELEASES IN CIRCULATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              Flagship Premieres
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Our two production-grade offerings live today on the platform. Instant access, perpetual updates, and built for real-world execution.
            </p>
          </div>

          {/* Toggle between the 2 products */}
          <div className="flex items-center bg-zinc-100 dark:bg-white/10 p-1 rounded-xl text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveSlug("the-job-search-book")}
              className={cn(
                "px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center space-x-2",
                activeSlug === "the-job-search-book"
                  ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>The Job Search Book</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSlug("hiring-organizations")}
              className={cn(
                "px-4 py-2 rounded-lg cursor-pointer transition-all flex items-center space-x-2",
                activeSlug === "hiring-organizations"
                  ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              )}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Hiring Directory</span>
            </button>
          </div>
        </div>

        {/* Feature Spotlight Card */}
        <TiltCard maxTilt={3} className="rounded-[var(--radius-xl)]">
          <div className="rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 p-8 sm:p-12 shadow-2xl space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Editorial Description & Bullets */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 px-3 py-1 rounded-full">
                    {activeProduct.slug === "the-job-search-book" ? "INTERACTIVE EBOOK · 30 CHAPTERS" : "LIVE DIRECTORY · 140+ COMPANIES"}
                  </span>

                  <span className="text-xs font-mono text-zinc-500 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Instant Digital Access</span>
                  </span>
                </div>


                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-4xl font-bold text-zinc-950 dark:text-white leading-tight font-display">
                    {activeProduct.name}
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                    {activeProduct.tagline}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {activeProduct.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-zinc-700 dark:text-zinc-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Row */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <CheckoutButton
                    productSlug={activeProduct.slug}
                    priceINR={activeProduct.price}
                    className="px-6 py-3.5 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/25"
                  />

                  <button
                    type="button"
                    onClick={() => onOpenPreview(activeProduct.slug)}
                    className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/10 hover:bg-zinc-50 dark:hover:bg-white/20 text-zinc-800 dark:text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                  >
                    <Eye className="w-4 h-4 text-indigo-500" />
                    <span>Read Free Excerpt</span>
                  </button>


                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    <span>Full Product Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Specimen Showcase Plate */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-zinc-50 dark:bg-black/40 border border-zinc-200/80 dark:border-white/10 p-6 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
                    <span className="text-zinc-500 text-[11px]">DELIVERY & ACCESS</span>
                    <span className="text-emerald-500 font-bold text-[11px]">VERIFIED PRODUCT</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Access Format:</span>
                      <span className="text-zinc-900 dark:text-white font-semibold">Instant Digital Reader & Tools</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Device Support:</span>
                      <span className="text-zinc-900 dark:text-white font-semibold">Desktop, Tablet & Mobile</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">License Terms:</span>
                      <span className="text-zinc-900 dark:text-white font-semibold">Lifetime Personal Access</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Future Revisions:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Free Lifetime Updates</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-400">Total Price:</span>
                    <span className="text-xl font-bold text-zinc-950 dark:text-white">
                      {formatINR(activeProduct.price)}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </TiltCard>

      </div>
    </section>
  );
}
