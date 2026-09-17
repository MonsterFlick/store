"use client";

import React from "react";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { ContentRenderer } from "@/products/_templates/ebook/ContentRenderer";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { Sparkles, ArrowRight, Lock } from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDefinition;
  previewChapter?: Chapter | null;
}

export function ProductPreviewModal({
  isOpen,
  onClose,
  product,
  previewChapter,
}: ProductPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Preview: ${product.name}`}
      side="right"
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--accent-light)] border border-[var(--accent-primary)]/20 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-primary)] shrink-0" />
            <span className="text-[var(--text-primary)] font-medium">
              Free Chapter Excerpt
            </span>
          </div>
          <Link href={`/products/${product.slug}#pricing`} onClick={onClose}>
            <span className="text-[var(--accent-primary)] hover:underline font-semibold font-mono text-[11px]">
              Unlock All ({formatINR(product.price)}) →
            </span>
          </Link>
        </div>

        {/* Chapter Title */}
        {previewChapter ? (
          <div>
            <div className="mb-6 pb-4 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Sample Reading
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
                {previewChapter.title}
              </h3>
              {previewChapter.description && (
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {previewChapter.description}
                </p>
              )}
            </div>

            {/* Rendered content */}
            <ContentRenderer blocks={previewChapter.sections} fontSize="sm" />

            {/* Bottom Upgrade CTA */}
            <div className="mt-12 p-6 rounded-[var(--radius-lg)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)]">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-[var(--text-primary)]">
                Enjoyed the excerpt?
              </h4>
              <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
                Get full access to all chapters, interactive quizzes, local reading progress, and lifetime updates.
              </p>
              <Link href={`/products/${product.slug}#pricing`} onClick={onClose}>
                <Button variant="primary" size="md" className="mt-2">
                  <span>Get Full Book · {formatINR(product.price)}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[var(--text-muted)]">No preview excerpt configured.</p>
        )}
      </div>
    </Drawer>
  );
}
