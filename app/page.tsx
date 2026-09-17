"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getAllProducts, getProductContent } from "@/lib/products/registry";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { Tabs } from "@/components/ui/Tabs";
import { Search, Sparkles, BookOpen, Layers, Cpu, ArrowDown } from "lucide-react";

export default function HomePage() {
  const allProducts = getAllProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen flex flex-col bg-[var(--background)] selection:bg-[var(--accent-light)] selection:text-[var(--accent-primary)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--background)] via-[var(--background-secondary)] to-[var(--background)]">
        {/* Subtle geometric background motif */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border border-current" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>Digital Product Studio & Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
            Digital products, <br className="hidden sm:inline" />
            <span className="font-editorial italic font-normal text-[var(--text-secondary)]">
              reimagined.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Books, runtime deep-dives, tools, and developer guides built to be experienced in code — not merely downloaded as static PDFs.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              AES-256 Encrypted Delivery
            </span>
            <span>•</span>
            <span>Two-Device Limit</span>
            <span>•</span>
            <span>Local Progress</span>
            <span>•</span>
            <span>Razorpay INR</span>
          </div>

          <div className="pt-6">
            <a
              href="#products"
              className="inline-flex items-center space-x-2 text-xs font-semibold text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors"
            >
              <span>Explore Catalog</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex-1 w-full space-y-8">
        {/* Discovery Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Featured Publications
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Explore custom digital reading experiences and software architectures
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or tag..."
              className="w-full h-9 pl-9 pr-3.5 text-xs rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          items={categories}
          activeId={selectedCategory}
          onChange={setSelectedCategory}
        />

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
          <div className="p-12 text-center rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] space-y-3">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No products found matching your search.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Try adjusting your search query or reset category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-semibold text-[var(--accent-primary)] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Architecture Philosophy Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--background-secondary)] text-[var(--accent-primary)] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Beyond Static PDFs
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every publication is an interactive React application with syntax highlighting, live knowledge checks, and custom mobile reading layouts.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--background-secondary)] text-[var(--accent-primary)] flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Encrypted Server Delivery
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Proprietary research and structured chapters are encrypted with AES-256-GCM and unlocked only through verified entitlement sessions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--background-secondary)] text-[var(--accent-primary)] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Local Reading Freedom
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Reading positions, chapter completions, and bookmarks remain private on your device using client-side storage, with support for up to 2 active devices.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
