"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { CheckoutButton } from "@/components/commerce/CheckoutButton";
import { CouponInput } from "@/components/commerce/CouponInput";
import { ProductPreviewModal } from "@/components/store/ProductPreviewModal";
import { ProductArtwork } from "@/components/store/ProductArtwork";
import { formatINR } from "@/lib/utils";
import {
  Sparkles,
  Star,
  ShieldCheck,
  Zap,
  Eye,
  Check,
  Smartphone,
  BookOpen,
  Building2,
  CheckCircle2,
  Lock,
} from "lucide-react";

export interface ProductEcommerceHeroProps {
  product: ProductDefinition;
  previewChapter?: Chapter | null;
  isAlreadyPurchased?: boolean;
}

export function ProductEcommerceHero({
  product,
  previewChapter,
  isAlreadyPurchased = false,
}: ProductEcommerceHeroProps) {
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const finalPrice = Math.max(0, product.price - discountAmount);
  const isBundle = product.type === "bundle" || (product.includedSlugs && product.includedSlugs.length > 0);

  const savings = product.originalPrice ? product.originalPrice - finalPrice : 0;
  const savingsPercent = product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : 0;

  const mainTitle =
    product.slug === "the-job-search-book"
      ? "The Job Search Book"
      : product.slug === "hiring-organizations"
      ? "Hiring Organizations Directory"
      : product.name;

  const subTitle =
    product.slug === "the-job-search-book"
      ? "The Practical Playbook for Getting a Tech Job."
      : product.slug === "hiring-organizations"
      ? "144 Verified Employers Who Hire Without Whiteboard Puzzles."
      : product.tagline;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Authentic SoWeBuild Vector Product Artwork */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <ProductArtwork
            slug={product.slug}
            name={product.name}
            isBundle={isBundle}
            onOpenPreview={previewChapter ? () => setPreviewOpen(true) : undefined}
          />
        </div>

        {/* Right Column: E-commerce Buy Box & Concise Specifications */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold border border-purple-500/20 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>{isBundle ? "VOL. 01 · COMPLETE 2-IN-1 BUNDLE" : "VOL. 02 · VERIFIED DIRECTORY"}</span>
              </span>

              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 font-mono text-xs border border-black/[0.05] dark:border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>PERPETUAL ACCESS</span>
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-display leading-[1.12]">
              {mainTitle}
            </h1>

            {/* Product Subtitle */}
            <p className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 font-display">
              {subTitle}
            </p>

            {/* Rating Stars & Social Proof */}
            <div className="flex items-center space-x-2 pt-1 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-zinc-950 dark:text-white">5.0</span>
              <span className="text-zinc-400">·</span>
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                Verified Tech Readers
              </span>
            </div>
          </div>

          {/* Pricing & Value Box */}
          <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/10 space-y-5 shadow-lg shadow-black/[0.03]">
            {/* Price Tag & Savings */}
            <div className="space-y-1">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-zinc-950 dark:text-white tracking-tight">
                  {formatINR(finalPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-base sm:text-lg text-zinc-400 line-through font-mono">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {savingsPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    SAVE {savingsPercent}%
                  </span>
                )}
              </div>

              {isBundle && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Free Bonus: 144-Company Directory Included (₹499 value)</span>
                </div>
              )}
            </div>

            {/* Buy Action / Already Purchased Status */}
            {isAlreadyPurchased ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" /> Lifetime Access Active
                </span>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  You own perpetual reader access to this edition.
                </p>
                <Link
                  href={`/library/${product.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline pt-1"
                >
                  <span>Launch In-Browser Reader →</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <CheckoutButton
                  productSlug={product.slug}
                  priceINR={finalPrice}
                  couponCode={couponCode}
                  buttonText={
                    isBundle
                      ? `Buy Complete Edition • ${formatINR(finalPrice)}`
                      : `Get Access • ${formatINR(finalPrice)}`
                  }
                />

                {previewChapter && (
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(true)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-black/[0.08] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:bg-black/[0.05] dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white transition-all cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span>Read Free Sample Chapter</span>
                  </button>
                )}
              </div>
            )}

            {/* Coupon Code Drawer */}
            <div className="pt-2 border-t border-black/[0.06] dark:border-white/10">
              <CouponInput
                subtotalINR={product.price}
                onApplyCoupon={(code, discount) => {
                  setCouponCode(code);
                  setDiscountAmount(discount);
                }}
                onRemoveCoupon={() => {
                  setCouponCode(undefined);
                  setDiscountAmount(0);
                }}
              />
            </div>

            {/* Guaranteed Trust Badges */}
            <div className="pt-2 grid grid-cols-3 gap-2 text-center border-t border-black/[0.06] dark:border-white/10 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <div className="space-y-1">
                <Zap className="w-4 h-4 mx-auto text-amber-500" />
                <span className="block leading-tight">Instant Unlock</span>
              </div>
              <div className="space-y-1">
                <Smartphone className="w-4 h-4 mx-auto text-purple-500" />
                <span className="block leading-tight">2 Devices Sync</span>
              </div>
              <div className="space-y-1">
                <Lock className="w-4 h-4 mx-auto text-emerald-500" />
                <span className="block leading-tight">Razorpay Secure</span>
              </div>
            </div>
          </div>

          {/* At-a-Glance Specifications (Classic E-commerce Key Specs Table) */}
          <div className="p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white">
              Publication Specifications
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">Format</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Interactive Web Reader</p>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">Content Length</span>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {isBundle ? "30 Structured Chapters" : "144 Verified Employers"}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">Free Bonus</span>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {isBundle ? "144-Company Hiring Directory" : "Shortlist Bookmark Tool"}
                </p>
              </div>
              <div className="space-y-0.5">
                <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">License &amp; Access</span>
                <p className="font-semibold text-zinc-900 dark:text-white">Lifetime Perpetual Updates</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ProductPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={product}
        previewChapter={previewChapter}
      />
    </>
  );
}
