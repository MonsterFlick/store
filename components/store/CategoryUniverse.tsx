"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getCatalogProducts } from "@/lib/products/catalog";
import { formatINR } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  Search,
  BookOpen,
  Building2,
  ArrowRight,
  Eye,
  Sparkles,
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
    <section id="catalog" className="py-20 sm:py-24 border-b border-zinc-200/60 dark:border-white/5 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header - Clean & Apple-minimal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              Publications &amp; Data Assets
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Interactive digital releases engineered for career leverage. Instant in-browser reading with perpetual lifetime updates.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalogue..."
              className="w-full h-10 pl-9 pr-4 text-xs rounded-[var(--radius-md)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center gap-2 pb-1">
          <button
            type="button"
            onClick={() => setSelectedFormat("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all whitespace-nowrap",
              selectedFormat === "all"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            All Releases ({allProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("books")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all flex items-center space-x-1.5 whitespace-nowrap",
              selectedFormat === "books"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Playbooks (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("directories")}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all flex items-center space-x-1.5 whitespace-nowrap",
              selectedFormat === "directories"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs"
                : "bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100"
            )}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Directories (1)</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isBundle = product.slug === "the-job-search-book";

              return (
                <TiltCard key={product.slug} maxTilt={2.5} className="h-full rounded-[var(--radius-xl)]">
                  <div className="h-full flex flex-col justify-between rounded-[var(--radius-xl)] p-6 sm:p-7 transition-all duration-200 bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 shadow-sm hover:border-indigo-500/40 space-y-6">
                    
                    {/* Top Folio */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-zinc-500 dark:text-zinc-400">
                          {isBundle ? "№ 01 · BUNDLE" : "№ 02 · DIRECTORY"}
                        </span>
                        {isBundle ? (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                            <Sparkles className="w-3 h-3" />
                            <span>DIRECTORY INCLUDED FREE</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-zinc-500">
                            144 EMPLOYERS
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white leading-snug font-display">
                          <Link href={`/products/${product.slug}`} className="hover:text-indigo-600 transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif italic">
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-4 border-t border-zinc-200/80 dark:border-white/10 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold font-mono text-zinc-950 dark:text-white">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs font-mono text-zinc-400 line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-zinc-500">
                          Perpetual Access
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <span>{isBundle ? "Order Edition • ₹199" : "View Directory • ₹99"}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </Link>

                        {isBundle && (
                          <button
                            type="button"
                            onClick={() => onOpenPreview(product.slug)}
                            className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-[var(--radius-md)] border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-800 dark:text-white text-xs font-medium cursor-pointer transition-colors whitespace-nowrap"
                          >
                            <Eye className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                            <span>Sample</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </TiltCard>
              );
            })}
          </div>
        ) : (
          <div className="p-10 text-center rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/10 space-y-2">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              No publications found matching your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("all");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
