"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { getAllProducts, getProductContent } from "@/lib/products/registry";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductShowcaseSlider } from "@/components/store/ProductShowcaseSlider";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductPreviewModal } from "@/components/store/ProductPreviewModal";
import { Tabs } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Layers,
  Star,
  Search,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const allProducts = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Global Preview Drawer State for peek actions
  const [previewProductSlug, setPreviewProductSlug] = useState<string | null>(null);

  // Dynamic Rotating Headline Text - slow staggered letter wave (Left to Right up-fade)
  const rotatingWords = ["Builders.", "Founders.", "Creators.", "Leaders."];
  const [wordIndex, setWordIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      // 1. Slower wave exit starting from left letters going up to right (1050ms)
      setIsExiting(true);
      setTimeout(() => {
        // 2. Next word wave-enters slowly starting from left to right
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsExiting(false);
      }, 1050);
    }, 4800);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  const activePreviewProduct = useMemo(() => {
    if (!previewProductSlug) return null;
    return allProducts.find((p) => p.slug === previewProductSlug) || null;
  }, [allProducts, previewProductSlug]);

  const activePreviewChapter = useMemo(() => {
    if (!activePreviewProduct) return null;
    const content = getProductContent(activePreviewProduct.slug);
    return content?.chapters.find((c) => c.isFreePreview) || content?.chapters[0] || null;
  }, [activePreviewProduct]);

  // Categories list
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    allProducts.forEach((p) => {
      p.categories.forEach((c) => {
        counts[c] = (counts[c] || 0) + 1;
      });
    });

    return [
      { id: "all", label: "All Products", count: allProducts.length },
      ...Object.entries(counts).map(([cat, count]) => ({
        id: cat,
        label: cat,
        count,
      })),
    ];
  }, [allProducts]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.categories.some(
          (c) => c.toLowerCase() === selectedCategory.toLowerCase()
        );

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] selection:bg-[var(--accent-primary)]/20 selection:text-[var(--accent-primary)]">
      <Navbar />

      {/* ============================================================ */}
      {/* 1. HOME SCREEN (HERO): Default White + Dark Adaptive         */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-24 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 border-b border-zinc-200/80 dark:border-white/5 kr-grid-bg">
        {/* Ambient background lighting orbs */}
        <div className="kr-orb w-[380px] sm:w-[650px] h-[300px] sm:h-[450px] -top-20 left-1/4 -translate-x-1/2 bg-indigo-500/10 dark:bg-[var(--accent-primary)]/20" />
        <div className="kr-orb w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] top-1/3 right-4 sm:right-10 bg-purple-500/10 dark:bg-indigo-500/15" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left: Headline, Subtitle, Direct CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              {/* Brand Pill */}
              <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.08] border border-zinc-200 dark:border-white/15 text-xs font-mono text-indigo-700 dark:text-indigo-300 shadow-sm max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] shrink-0" />
                <span className="font-bold shrink-0">SOWEBUILD</span>
                <span className="text-zinc-300 dark:text-white/20">·</span>
                <span className="text-zinc-600 dark:text-zinc-300 hidden sm:inline">DIGITAL PRODUCTS & RESOURCES</span>
                <span className="text-zinc-600 dark:text-zinc-300 sm:hidden truncate">STORE</span>
              </div>

              {/* Bold Authoritative Headline - Staggered Letter Wave from Left to Right */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.25] sm:leading-[1.2] font-display">
                Curated Digital Products &amp; Guides for{" "}
                <span
                  key={wordIndex}
                  className="inline-block align-baseline font-extrabold text-indigo-600 dark:text-indigo-400 whitespace-nowrap"
                >
                  {rotatingWords[wordIndex].split("").map((char, i) => (
                    <span
                      key={i}
                      className={cn(
                        "inline-block align-baseline transform-gpu",
                        isExiting ? "letter-wave-exit" : "letter-wave-enter"
                      )}
                      style={
                        isExiting
                          ? { transitionDelay: `${i * 65}ms` }
                          : { animationDelay: `${i * 65}ms` }
                      }
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-xl text-sm sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                Actionable playbooks, in-depth video guides, production templates, and practical tools designed to give you real leverage and save you hundreds of hours.
              </p>

              {/* Dual Calls to Action */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 dark:shadow-indigo-600/30 transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                >
                  <span>Explore All Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                </a>

                <a
                  href="#featured"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-[var(--radius-md)] border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-800 dark:text-white text-sm font-medium transition-colors duration-150 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>View Featured Release</span>
                </a>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Instant Digital Access
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Lifetime Updates Included
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  Secure UPI & Card Checkout
                </span>
              </div>
            </div>

            {/* Hero Right: Clean Digital Product Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[var(--radius-xl)] bg-white dark:bg-[#101016] border border-zinc-200 dark:border-white/15 p-6 shadow-xl shadow-zinc-900/5 dark:shadow-black/50 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-medium">
                      Featured Publication
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-amber-500 dark:text-amber-400 font-mono font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                </div>

                {/* Excerpt Details */}
                <div className="space-y-3">
                  <div className="inline-block text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30">
                    FLAGSHIP RELEASE
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white leading-snug">
                    The Job Search Book
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                    A comprehensive 30-chapter digital playbook engineered to help you master resumes, build undeniable proof, and negotiate top compensation.
                  </p>

                  <div className="pt-2 flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-mono text-zinc-950 dark:text-white">
                      ₹199
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                      Lifetime Access • 30 Chapters
                    </span>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-2 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    Free Excerpt Available
                  </span>

                  <a
                    href="#featured"
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold transition-colors duration-150 cursor-pointer border border-indigo-200 dark:border-indigo-500/30"
                  >
                    <span>View In Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FEATURED PRODUCT SECTION (Slider with Left & Right Arrows)*/}
      {/* ============================================================ */}
      <ProductShowcaseSlider
        products={allProducts}
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* ============================================================ */}
      {/* 3. ALL PRODUCTS CATALOG GRID SECTION                         */}
      {/* ============================================================ */}
      <section id="products" className="py-24 border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>STORE CATALOG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
                All Digital Products
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Browse our complete collection of practical playbooks, guides, templates, and tools.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-10 pl-9 pr-3.5 text-xs rounded-[var(--radius-md)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-[border-color,box-shadow] duration-150 shadow-xs"
              />
            </div>
          </div>

          {/* Category Tabs */}
          {categories.length > 2 && (
            <Tabs
              items={categories}
              activeId={selectedCategory}
              onChange={setSelectedCategory}
            />
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {filteredProducts.map((product, idx) => {
                const content = getProductContent(product.slug);
                const previewChapter =
                  content?.chapters.find((c) => c.isFreePreview) ||
                  content?.chapters[0] ||
                  null;

                return (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    previewChapter={previewChapter}
                    featured={idx === 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/10 space-y-3">
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                No products found matching your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Global Preview Modal */}
      {activePreviewProduct && (
        <ProductPreviewModal
          isOpen={!!previewProductSlug}
          onClose={() => setPreviewProductSlug(null)}
          product={activePreviewProduct}
          previewChapter={activePreviewChapter}
        />
      )}

      <Footer />
    </div>
  );
}
