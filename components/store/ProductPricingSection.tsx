"use client";

import React, { useState } from "react";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { CheckoutButton } from "@/components/commerce/CheckoutButton";
import { CouponInput } from "@/components/commerce/CouponInput";
import { ProductPreviewModal } from "@/components/store/ProductPreviewModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { Eye, Check, Sparkles, ShieldCheck, Zap, Smartphone, RefreshCw, BookOpen } from "lucide-react";

export interface ProductPricingSectionProps {
  product: ProductDefinition;
  previewChapter?: Chapter | null;
  isAlreadyPurchased?: boolean;
}

export function ProductPricingSection({
  product,
  previewChapter,
  isAlreadyPurchased = false,
}: ProductPricingSectionProps) {
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);

  const finalPrice = Math.max(0, product.price - discountAmount);
  const isBundle = product.type === "bundle" || (product.includedSlugs && product.includedSlugs.length > 0);

  const savings = product.originalPrice ? product.originalPrice - finalPrice : 0;
  const savingsPercent = product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div
        id="pricing"
        className="p-6 sm:p-8 glass-card-interactive space-y-6 rounded-3xl shadow-2xl shadow-black/5 dark:shadow-black/30 border border-purple-500/20 relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="kr-grid-bg absolute inset-0 opacity-15 pointer-events-none" />

        {/* Pricing Header */}
        <div className="space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-400">
              {isBundle ? "Dual Release Bundle" : "Verified Directory"}
            </span>
            {savingsPercent > 0 && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                SAVE {savingsPercent}%
              </span>
            )}
          </div>

          <div className="flex items-baseline space-x-3">
            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-mono">
              {formatINR(finalPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-base sm:text-lg text-zinc-400 line-through font-mono">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            One-time purchase · Lifetime perpetual updates · Instant reader access
          </p>
        </div>

        {/* Free Sample Button */}
        {previewChapter && (
          <Button
            type="button"
            variant="glass"
            size="lg"
            onClick={() => setPreviewOpen(true)}
            className="w-full text-xs sm:text-sm font-semibold cursor-pointer py-3 border border-purple-500/30 hover:border-purple-500/50"
          >
            <Eye className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
            <span>Read Free Chapter 0 Sample</span>
          </Button>
        )}

        {/* Checkout CTA */}
        {isAlreadyPurchased ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 relative z-10">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> Lifetime Access Active
            </span>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              This publication is unlocked in your private library.
            </p>
            <a
              href={`/library/${product.slug}`}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline pt-1"
            >
              <span>Launch In-Browser Reader →</span>
            </a>
          </div>
        ) : (
          <div className="space-y-3 relative z-10">
            <CheckoutButton
              productSlug={product.slug}
              priceINR={finalPrice}
              couponCode={couponCode}
              buttonText={isBundle ? `Get Complete Bundle • ${formatINR(finalPrice)}` : `Get Directory Access • ${formatINR(finalPrice)}`}
            />

            {/* Upsell Callout on hiring-organizations */}
            {product.slug === "hiring-organizations" && (
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-xs sm:text-sm space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SMART BUNDLE DEAL</span>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Included Free in Bundle
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-snug font-sans">
                  Get this complete 144-company directory free inside <strong>The Job Search Book Bundle</strong> for only ₹199.
                </p>
                <a
                  href="/products/the-job-search-book"
                  className="inline-flex items-center text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline gap-1 pt-1"
                >
                  <span>View Full Bundle Deal (₹199) →</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Coupon Input */}
        <div className="pt-3 border-t border-black/[0.06] dark:border-white/10 relative z-10">
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

        {/* What You Unlock Checklist */}
        <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 space-y-3 relative z-10">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-zinc-950 dark:text-white">
            What You Unlock Immediately
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Instant interactive reader on desktop, tablet, and mobile</span>
            </li>
            {isBundle ? (
              <>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>30 structured chapters covering ATS, outreach, &amp; salary</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Bonus 144-company directory included free (no whiteboards)</span>
                </li>
              </>
            ) : (
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>144 verified employers, evaluation types, and direct links</span>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Perpetual updates &amp; 2-device authorized offline access</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>100% verified authentic information — zero fluff</span>
            </li>
          </ul>
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
