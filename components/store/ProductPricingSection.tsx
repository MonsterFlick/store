"use client";

import React, { useState } from "react";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { CheckoutButton } from "@/components/commerce/CheckoutButton";
import { CouponInput } from "@/components/commerce/CouponInput";
import { ProductPreviewModal } from "@/components/store/ProductPreviewModal";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";
import { Eye, ShieldCheck, Check, Sparkles } from "lucide-react";

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

  return (
    <>
      <Card
        id="pricing"
        className="p-6 sm:p-7 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-lg shadow-zinc-950/5 space-y-5 rounded-[var(--radius-xl)]"
      >
        {/* Pricing Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              {isBundle ? "Complete Edition" : "Single Edition"}
            </span>
            <div className="flex items-baseline space-x-2.5">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] font-mono">
                {formatINR(finalPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[var(--text-muted)] line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Badge variant={isBundle ? "accent" : "default"} className="text-xs font-mono font-medium">
            {isBundle ? "Bundle Deal" : "Lifetime Access"}
          </Badge>
        </div>

        {/* Free Sample Button */}
        {previewChapter && (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setPreviewOpen(true)}
            className="w-full text-xs font-medium border-[var(--border-subtle)]"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
            <span>Read Free Sample</span>
          </Button>
        )}

        {/* Coupon Input */}
        <div className="pt-2 border-t border-[var(--border-subtle)]">
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

        {/* Checkout CTA */}
        {isAlreadyPurchased ? (
          <div className="p-4 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1.5">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> Lifetime Access Active
            </span>
            <a
              href={`/library/${product.slug}`}
              className="inline-block text-xs font-bold text-[var(--accent-primary)] hover:underline"
            >
              Open in Library →
            </a>
          </div>
        ) : (
          <div className="space-y-2.5">
            <CheckoutButton
              productSlug={product.slug}
              priceINR={finalPrice}
              couponCode={couponCode}
              buttonText={isBundle ? `Buy Bundle • ${formatINR(finalPrice)}` : `Get Access • ${formatINR(finalPrice)}`}
            />

            {/* Micro Inclusions Note */}
            {isBundle && (
              <p className="text-[11px] text-center text-zinc-500 dark:text-zinc-400 font-mono">
                Includes 30-Chapter Book + 144-Company Directory Free
              </p>
            )}

            {/* Upsell Callout on hiring-organizations */}
            {product.slug === "hiring-organizations" && (
              <div className="p-3 rounded-[var(--radius-md)] bg-indigo-500/5 border border-indigo-500/20 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Smarter Value
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Free in Bundle</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                  Get this directory free with The Job Search Book bundle for ₹199.
                </p>
                <a
                  href="/products/the-job-search-book"
                  className="inline-flex items-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline gap-1"
                >
                  <span>View Bundle Deal (₹199) →</span>
                </a>
              </div>
            )}
          </div>
        )}

        {/* Capabilities Checklist */}
        <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[11px] leading-tight">Instant in-browser reader on phone, tablet & desktop</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[11px] leading-tight">All future revisions and updates included perpetual</span>
          </div>
        </div>
      </Card>

      <ProductPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={product}
        previewChapter={previewChapter}
      />
    </>
  );
}
