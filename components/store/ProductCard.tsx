"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Eye } from "lucide-react";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProductPreviewModal } from "./ProductPreviewModal";

export interface ProductCardProps {
  product: ProductDefinition;
  previewChapter?: Chapter | null;
  featured?: boolean;
}

export function ProductCard({
  product,
  previewChapter,
  featured = false,
}: ProductCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div
        className={`group relative rounded-[var(--radius-lg)] bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-[border-color,box-shadow] duration-150 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-sm ${
          featured ? "md:col-span-2 md:flex-row" : ""
        }`}
      >
        {/* Card Visual / Cover Canvas */}
        <div
          className={`p-6 sm:p-8 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--surface-elevated)] border-b ${
            featured ? "md:border-b-0 md:border-r md:w-1/2" : ""
          } border-[var(--border-subtle)] flex flex-col justify-between relative`}
        >
          {/* Top badges */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <Badge variant="accent" className="capitalize">
              {product.type}
            </Badge>

            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-[var(--text-muted)] line-through font-mono">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Center visual mark */}
          <div className="my-6">
            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-primary)] mb-4 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-snug">
              {product.name}
            </h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {product.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Body & Actions */}
        <div className={`p-6 sm:p-8 flex flex-col justify-between ${featured ? "md:w-1/2" : "flex-1"}`}>
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
              {product.tagline}
            </p>

            {/* Features preview */}
            <ul className="space-y-1.5 pt-2 text-xs text-[var(--text-muted)]">
              {product.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shrink-0" />
                  <span className="truncate">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Buttons */}
          <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <div>
              <span className="text-xs text-[var(--text-muted)] block font-mono">
                One-time
              </span>
              <span className="text-xl font-bold text-[var(--text-primary)]">
                {formatINR(product.price)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {previewChapter && (
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium border border-[var(--border-subtle)] hover:bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  title="Read Chapter 1 Excerpt"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              )}

              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-md)] text-xs font-semibold bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-colors cursor-pointer shadow-xs"
              >
                <span>View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Preview Drawer */}
      <ProductPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={product}
        previewChapter={previewChapter}
      />
    </>
  );
}
