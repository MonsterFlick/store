"use client";

import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

interface ProductArtworkProps {
  slug: string;
  name: string;
  isBundle?: boolean;
  onOpenPreview?: () => void;
}

export function ProductArtwork({
  slug,
  name,
  isBundle,
  onOpenPreview,
}: ProductArtworkProps) {
  const artworkSrc =
    slug === "hiring-organizations"
      ? "/brand/products/hiring-organizations.svg"
      : "/brand/products/the-job-search-book.svg";

  return (
    <div className="relative w-full flex flex-col items-center select-none group">
      {/* Soft, Truly Circular Ambient Radial Glow (Zero sharp or boxy borders) */}
      <div
        className={`absolute w-[320px] sm:w-[440px] lg:w-[500px] h-[320px] sm:h-[440px] lg:h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] sm:blur-[110px] pointer-events-none transition-all duration-700 ${
          slug === "hiring-organizations"
            ? "bg-emerald-500/20 dark:bg-emerald-500/25 group-hover:bg-emerald-500/30"
            : "bg-purple-600/20 dark:bg-purple-600/30 group-hover:bg-purple-600/40"
        }`}
        aria-hidden="true"
      />

      {/* Large, High-Resolution Artwork Presentation (Maximized Legibility & Scale) */}
      <div className="relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] aspect-[4/5] transform transition-transform duration-500 group-hover:scale-[1.015] drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        <Image
          src={artworkSrc}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
          className="object-contain"
        />
      </div>

      {/* Free Sample Pill Button Directly Underneath */}
      {onOpenPreview && (
        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenPreview}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/[0.06] hover:bg-white dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white border border-black/[0.08] dark:border-white/10 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Read Free Chapter 0 Sample</span>
          </button>
        </div>
      )}
    </div>
  );
}
