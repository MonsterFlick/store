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

  return (
    <>
      <Card
        id="pricing"
        className="p-6 sm:p-8 bg-[var(--surface-elevated)] border-2 border-[var(--border-subtle)] shadow-md space-y-6"
      >
        {/* Pricing Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-1">
              Lifetime Access
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                {formatINR(finalPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[var(--text-muted)] line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Badge variant="success" className="text-xs">
            One-Time Purchase
          </Badge>
        </div>

        {/* Free Preview Button */}
        {previewChapter && (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setPreviewOpen(true)}
            className="w-full text-xs font-medium"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            <span>Read Free Chapter 1 Excerpt</span>
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
          <div className="p-4 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" /> You own lifetime access
            </span>
            <a
              href={`/library/${product.slug}`}
              className="inline-block text-xs font-bold text-[var(--accent-primary)] hover:underline"
            >
              Open Reader Experience →
            </a>
          </div>
        ) : (
          <CheckoutButton
            productSlug={product.slug}
            priceINR={finalPrice}
            couponCode={couponCode}
            buttonText={`Unlock Digital Access · ${formatINR(finalPrice)}`}
          />
        )}

        {/* Capabilities Guarantee */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Simultaneous access on up to 2 active devices</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Interactive code blocks & knowledge checks</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Non-refundable digital access (Try preview first)</span>
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
