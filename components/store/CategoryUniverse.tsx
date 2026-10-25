"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ExtendedProduct, getCatalogProducts } from "@/lib/products/catalog";
import { formatINR } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Search,
  BookOpen,
  Building2,
  CheckCircle2,
  ArrowRight,
  Eye,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryUniverseProps {
  onOpenPreview: (slug: string) => void;
}

export function CategoryUniverse({ onOpenPreview }: CategoryUniverseProps) {
  const allProducts = useMemo(() => getCatalogProducts(), []);

  const [selectedFormat, setSelectedFormat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesFormat =
        selectedFormat === "all" ||
        (selectedFormat === "books" && (product.type === "ebook" || product.type === "bundle")) ||
        (selectedFormat === "directories" && (product.type === "tool" || product.type === "guide" || product.type === "app"));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.formatLabel.toLowerCase().includes(query) ||
        product.domain.toLowerCase().includes(query) ||
        product.tags.some((t) => t.toLowerCase().includes(query));

      return matchesFormat && matchesSearch;
    });
  }, [allProducts, selectedFormat, searchQuery]);

  return (
    <section id="catalog" className="py-24 sm:py-28 border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>DIGITAL CATALOG</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              Curated Digital Products
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
              Browse our verified publications and tools. Every product includes perpetual browser access, continuous revisions, and zero file-management hassle.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, frameworks..."
              className="w-full h-11 pl-9 pr-4 text-xs rounded-[var(--radius-md)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center gap-2 pb-2">
          <button
            type="button"
            onClick={() => setSelectedFormat("all")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all",
              selectedFormat === "all"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            All Products ({allProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("books")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center space-x-1.5",
              selectedFormat === "books"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Books &amp; Guides (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("directories")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all flex items-center space-x-1.5",
              selectedFormat === "directories"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Directories &amp; Tools (1)</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {filteredProducts.map((product) => (
              <TiltCard key={product.slug} maxTilt={4} className="h-full rounded-[var(--radius-xl)]">
                <div className="h-full flex flex-col justify-between rounded-[var(--radius-xl)] p-7 transition-all duration-200 bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 shadow-md hover:border-indigo-500/50">
                  
                  {/* Top Metadata */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-medium">
                        {product.type === "ebook" || product.type === "bundle" ? (
                          <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        <span>{product.formatLabel}</span>
                      </div>

                      <span className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>AVAILABLE NOW</span>
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-zinc-950 dark:text-white leading-snug">
                        <Link href={`/products/${product.slug}`} className="hover:text-indigo-600 transition-colors">
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Highlights */}
                    {product.highlights && (
                      <div className="space-y-2 pt-2 border-t border-zinc-200/60 dark:border-white/5">
                        {product.highlights.map((h, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Pricing & Actions */}
                  <div className="pt-6 border-t border-zinc-200/80 dark:border-white/10 space-y-4 mt-6">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-bold font-mono text-zinc-950 dark:text-white">
                          {product.price === 0 ? "Free Access" : formatINR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono text-zinc-400 line-through ml-2">
                            {formatINR(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-500">
                        Lifetime Digital Access
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>View Product</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onOpenPreview(product.slug)}
                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/10 hover:bg-zinc-50 dark:hover:bg-white/20 text-zinc-800 dark:text-white text-xs font-medium cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                        <span>Excerpt</span>
                      </button>
                    </div>
                  </div>

                </div>
              </TiltCard>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/10 space-y-3">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              No products found matching your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
