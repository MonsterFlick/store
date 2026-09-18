"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ProductDefinition } from "@/lib/products/types";
import { CheckoutButton } from "@/components/commerce/CheckoutButton";
import { formatINR } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Eye,
  Building2,
  Star,
  Layers,
  ShieldCheck,
} from "lucide-react";

interface ProductShowcaseSliderProps {
  products: ProductDefinition[];
  onOpenPreview: (slug: string) => void;
}

export function ProductShowcaseSlider({
  products,
  onOpenPreview,
}: ProductShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animDirection, setAnimDirection] = useState<"next" | "prev">("next");
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = React.useRef(0);

  const total = products.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setAnimDirection("next");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [total, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setAnimDirection("prev");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 500);
  }, [total, isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!products || products.length === 0) return null;

  return (
    <section id="featured" className="relative py-24 overflow-hidden border-t border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background)] dark:bg-[#09090c]">
      {/* Background ambient lighting */}
      <div className="kr-orb w-[600px] h-[400px] -top-32 right-10 bg-indigo-500/10 dark:bg-indigo-600/20" />
      <div className="kr-orb w-[500px] h-[500px] -bottom-32 -left-20 bg-blue-500/10 dark:bg-blue-600/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header with Left / Right Slider Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>FEATURED RELEASES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight font-display">
              Curated Digital Releases
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Explore our active featured publications. Switch between cards in the deck below, inspect free excerpts, or get instant access.
            </p>
          </div>

          {/* Slider Navigation & Direct Card Tabs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Direct Card Switcher Buttons */}
            <div className="flex items-center p-1 rounded-full bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15">
              {products.map((p, idx) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    if (idx !== currentIndex) {
                      setAnimDirection(idx > currentIndex ? "next" : "prev");
                      setIsAnimating(true);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors duration-150 cursor-pointer ${
                    currentIndex === idx
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <span>0{idx + 1} · </span>
                  <span className="hidden sm:inline">{p.slug === "the-job-search-book" ? "Job Search Book" : "Hiring Directory"}</span>
                  <span className="sm:hidden">{p.slug === "the-job-search-book" ? "Book" : "Directory"}</span>
                </button>
              ))}
            </div>

            {/* Left & Right Arrow Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Product"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition-[transform,background-color] duration-150 hover:scale-105 active:scale-95 shadow-sm dark:shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-zinc-800 dark:text-white" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Product"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-800 dark:text-white flex items-center justify-center transition-[transform,background-color] duration-150 hover:scale-105 active:scale-95 shadow-sm dark:shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-zinc-800 dark:text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D STACKED CARD CONTAINER with Touch Swipe */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative pt-4 sm:pt-6 pb-6 min-h-[760px] sm:min-h-[640px] md:min-h-[480px] lg:min-h-[420px]"
          style={{ perspective: "1400px" }}
        >
          {products.map((product, idx) => {
            // Calculate relative offset in circular array
            const offset = (idx - currentIndex + total) % total;
            const isFront = offset === 0;
            const isBehind = offset === 1;

            // Distinct themes per product
            const isJobBook = product.slug === "the-job-search-book";
            const themeBorder = isJobBook
              ? "border-indigo-200 dark:border-indigo-500/50"
              : "border-emerald-200 dark:border-emerald-500/50";
            const themeGlow = isJobBook
              ? "from-indigo-500/10 via-purple-500/5 dark:from-indigo-600/25 dark:via-purple-600/15"
              : "from-emerald-500/10 via-teal-500/5 dark:from-emerald-600/25 dark:via-teal-600/15";
            const badgeColor = isJobBook
              ? "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/30"
              : "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30";
            const ProductIcon = isJobBook ? BookOpen : Building2;

            // Stack transform styles: mobile uses vertical stack to prevent horizontal page overflow
            let transformStyle = "";
            let zIndex = 10;
            let opacity = 1;

            if (isFront) {
              transformStyle = "translate3d(0, 0, 0) scale(1) rotate(0deg)";
              zIndex = 30;
              opacity = 1;
            } else if (isBehind) {
              transformStyle = isMobile
                ? "translate3d(0, -12px, -30px) scale(0.97)"
                : "translate3d(24px, -20px, -50px) scale(0.96) rotate(1.5deg)";
              zIndex = 20;
              opacity = 0.75;
            } else {
              transformStyle = isMobile
                ? "translate3d(0, -22px, -60px) scale(0.94)"
                : "translate3d(44px, -36px, -90px) scale(0.92) rotate(2.5deg)";
              zIndex = 10;
              opacity = 0.4;
            }

            return (
              <div
                key={product.slug}
                onClick={() => {
                  if (!isFront) {
                    setAnimDirection("next");
                    setIsAnimating(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  willChange: "transform, opacity",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute inset-x-0 top-4 sm:top-6 rounded-[var(--radius-xl)] sm:rounded-[var(--radius-2xl)] bg-white dark:bg-[#101016] border ${
                  isFront
                    ? `${themeBorder} shadow-xl shadow-zinc-900/5 dark:shadow-2xl dark:shadow-black/80 ring-1 ring-black/5 dark:ring-white/10`
                    : "border-zinc-200 dark:border-white/20 shadow-md cursor-pointer hover:border-zinc-300 dark:hover:border-white/40 hover:opacity-90"
                } p-5 sm:p-8 lg:p-10 select-none`}
              >
                {/* Background gradient per product card */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[var(--radius-2xl)] bg-gradient-to-br ${themeGlow} to-transparent opacity-80`}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Product Info & Buy Action */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Category & Status */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border uppercase ${badgeColor}`}>
                        {product.categories[0] || "Featured Release"}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                        INSTANT UNLOCK
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 ml-auto font-medium">
                        CARD 0{idx + 1} OF 0{total}
                      </span>
                    </div>

                    {/* Title & Tagline with Adaptive High Contrast Typography */}
                    <div className="space-y-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="group inline-block"
                      >
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-150">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price & Primary Purchase Flow */}
                    <div className="pt-2 border-t border-zinc-200 dark:border-white/10 space-y-4">
                      <div className="flex items-baseline space-x-3">
                        <span className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-zinc-950 dark:text-white">
                          {formatINR(product.price)}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                          One-time payment • Lifetime access
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <div className="flex-1">
                            <CheckoutButton
                              productSlug={product.slug}
                              priceINR={product.price}
                              buttonText={`Instant Unlock • ${formatINR(product.price)}`}
                              showTrustBadge={false}
                              className="w-full h-12 text-sm font-semibold rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenPreview(product.slug);
                            }}
                            className="inline-flex items-center justify-center space-x-2 px-5 h-12 rounded-[var(--radius-md)] border border-zinc-300 dark:border-white/20 bg-zinc-50 dark:bg-white/10 hover:bg-zinc-100 dark:hover:bg-white/20 text-zinc-800 dark:text-white text-xs font-semibold transition-colors duration-150 cursor-pointer shrink-0"
                          >
                            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            <span>Peek Free Excerpt</span>
                          </button>
                        </div>

                        <div className="flex items-center space-x-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Encrypted Razorpay Checkout • Instant Access</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Excerpt & Feature Breakdown */}
                  <div className="lg:col-span-5 relative">
                    <div className="rounded-[var(--radius-xl)] bg-zinc-50 dark:bg-[#15151c] border border-zinc-200/80 dark:border-white/10 p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
                      {/* Visual Header */}
                      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/10 pb-3">
                        <div className="flex items-center space-x-2">
                          <ProductIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-[11px] font-mono text-zinc-700 dark:text-zinc-300 font-medium">
                            Edition Details
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-xs text-amber-500 dark:text-amber-400 font-mono font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
                          <span>4.9 / 5.0</span>
                        </div>
                      </div>

                      {/* Excerpt Details */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-indigo-700 dark:text-indigo-300 font-bold">
                            OVERVIEW
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400">Verified Edition</span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200 leading-relaxed font-normal line-clamp-4">
                          {product.description}
                        </p>

                        <div className="p-3.5 rounded-[var(--radius-md)] bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 space-y-1">
                          <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 block">
                            Key Inclusions:
                          </span>
                          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                            &ldquo;Includes actionable playbooks, templates, checklists, and lifetime access across all devices.&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {product.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
