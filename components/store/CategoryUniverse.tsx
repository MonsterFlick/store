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
  CheckCircle2,
  X,
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
    <section id="catalog" className="py-20 sm:py-28 border-b border-black/[0.05] dark:border-white/[0.06] bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Current Releases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
              Curated Publications
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Interactive digital editions engineered for career leverage. Instant in-browser reader with perpetual lifetime updates.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or title..."
              className="w-full h-11 pl-9 pr-9 text-xs rounded-xl bg-white/80 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-xs backdrop-blur-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex items-center gap-2 pb-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedFormat("all")}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 whitespace-nowrap",
              selectedFormat === "all"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm font-semibold"
                : "glass-pill text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            All Publications ({allProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("books")}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 flex items-center space-x-1.5 whitespace-nowrap",
              selectedFormat === "books"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm font-semibold"
                : "glass-pill text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Playbooks (1)</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFormat("directories")}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 flex items-center space-x-1.5 whitespace-nowrap",
              selectedFormat === "directories"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm font-semibold"
                : "glass-pill text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
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
                <TiltCard key={product.slug} maxTilt={2.5} className="h-full rounded-2xl">
                  <div className="h-full flex flex-col justify-between rounded-2xl p-6 sm:p-8 glass-card-interactive space-y-6">
                    
                    {/* Top Folio */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider">
                          {isBundle ? "№ 01 · COMPLETE BUNDLE" : "№ 02 · VERIFIED DIRECTORY"}
                        </span>
                        {isBundle ? (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-medium">
                            <Sparkles className="w-3 h-3" />
                            <span>DIRECTORY INCLUDED FREE</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-zinc-500 px-2.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/10">
                            144 EMPLOYERS
                          </span>
                        )}
                      </div>

                      {/* Title & Tagline */}
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white leading-snug font-display">
                          <Link href={`/products/${product.slug}`} className="hover:text-purple-600 transition-colors">
                            {isBundle ? "The Job Search Book" : product.name}
                          </Link>
                        </h3>
                        {isBundle && (
                          <p className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-300 font-display">
                            The Practical Playbook for Getting a Tech Job.
                          </p>
                        )}
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Visual Bullets */}
                      <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                        {isBundle ? (
                          <>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>30 tactical chapters: ATS algorithms, GitHub audits, sniper cold DMs, and salary math.</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                                Free Bonus: Full 144-company hiring directory included in bundle.
                              </span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>Instant in-browser reader with reading progress, bookmarks, and dual lifetime access.</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>144 verified engineering teams hiring without algorithmic LeetCode puzzles.</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>Exact evaluation formats: take-home projects, pairing sessions, and codebase reviews.</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>Direct careers links, remote filter tags, and local application shortlist manager.</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-5 border-t border-black/[0.06] dark:border-white/10 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline space-x-2.5">
                          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-950 dark:text-white">
                            {formatINR(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm font-mono text-zinc-400 line-through">
                              {formatINR(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-zinc-500">
                          Perpetual Lifetime Access
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all duration-150 cursor-pointer whitespace-nowrap hover:scale-[1.01] active:scale-[0.99]"
                        >
                          <span>{isBundle ? "Order Edition • ₹199" : "View Directory • ₹99"}</span>
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </Link>

                        {isBundle && (
                          <button
                            type="button"
                            onClick={() => onOpenPreview(product.slug)}
                            className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/15 bg-white/70 dark:bg-white/[0.05] hover:bg-white dark:hover:bg-white/10 text-zinc-800 dark:text-white text-xs font-medium cursor-pointer transition-colors whitespace-nowrap"
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
          <div className="p-12 text-center rounded-2xl glass-panel border border-black/[0.06] dark:border-white/10 space-y-3">
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
              Reset Search Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
