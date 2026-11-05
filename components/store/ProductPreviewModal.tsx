"use client";

import React, { useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ContentRenderer } from "@/products/_templates/ebook/ContentRenderer";
import { ProductDefinition, Chapter } from "@/lib/products/types";
import { Sparkles, ArrowRight, X, BookOpen, ExternalLink } from "lucide-react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      // Focus scroll container so keyboard arrows and spacebar work immediately
      setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const isBundle = product.type === "bundle" || (product.includedSlugs && product.includedSlugs.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Frosted Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/65 dark:bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Crisp Rectangular Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
            className="relative w-full max-w-4xl h-[88vh] max-h-[88vh] flex flex-col bg-white dark:bg-[#111018] rounded-xl border border-black/[0.1] dark:border-white/[0.12] shadow-2xl shadow-black/40 overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Rectangular Header Bar */}
            <div className="px-6 sm:px-8 py-4 border-b border-black/[0.08] dark:border-white/10 flex items-center justify-between gap-4 bg-white/95 dark:bg-[#111018]/95 backdrop-blur-md shrink-0">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      Sample Reader Excerpt
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">·</span>
                    <span className="text-xs font-mono text-zinc-500 truncate">
                      {product.name}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white font-display truncate">
                    {previewChapter?.title || "Sample Excerpt"}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close sample preview"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-black/10 dark:hover:border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Reading Content - Guaranteed Wheel & Touch Scrolling */}
            <div
              ref={scrollContainerRef}
              tabIndex={0}
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-12 py-8 space-y-8 overscroll-contain focus:outline-none"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
              }}
              onWheel={(e) => {
                // Ensure event is handled locally and not swallowed
                e.stopPropagation();
              }}
            >
              {previewChapter ? (
                <div className="max-w-3xl mx-auto space-y-8">
                  {/* Chapter Top Folio */}
                  <div className="pb-6 border-b border-black/[0.08] dark:border-white/10 space-y-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold border border-purple-500/20 uppercase tracking-wider">
                        Public Free Chapter
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        Perpetual Reading Mode
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white font-display leading-tight">
                      {previewChapter.title}
                    </h1>

                    {previewChapter.description && (
                      <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans pt-1">
                        {previewChapter.description}
                      </p>
                    )}
                  </div>

                  {/* Rendered Book Content */}
                  <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">
                    <ContentRenderer blocks={previewChapter.sections} fontSize="md" />
                  </div>

                  {/* Rectangular Upgrade Callout Box */}
                  <div className="mt-14 p-6 sm:p-8 rounded-xl bg-purple-500/[0.04] dark:bg-purple-500/[0.06] border border-purple-500/20 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
                      <Sparkles className="w-6 h-6" />
                    </div>

                    <div className="space-y-1.5 max-w-lg mx-auto">
                      <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white font-display">
                        Ready to read the complete publication?
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                        {isBundle
                          ? "Unlock all 30 structured chapters of The Job Search Book plus the complete 144-company verified hiring directory bonus."
                          : "Unlock the full directory with verified contacts, hiring evaluation models, and lifetime updates."}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/products/${product.slug}#pricing`}
                        onClick={onClose}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <span>Unlock Complete Edition • {formatINR(product.price)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-zinc-500 text-sm">
                  No preview excerpt available for this publication.
                </div>
              )}
            </div>

            {/* Rectangular Sticky Footer Action Bar */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-black/[0.08] dark:border-white/10 flex items-center justify-between gap-4 bg-white/95 dark:bg-[#111018]/95 backdrop-blur-md shrink-0">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-sans hidden sm:block">
                <span>Free sample reading excerpt · Complete access: </span>
                <strong className="text-zinc-950 dark:text-white font-mono font-bold">{formatINR(product.price)}</strong>
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors cursor-pointer border border-black/[0.06] dark:border-white/10"
                >
                  Close Sample
                </button>
                <Link
                  href={`/products/${product.slug}#pricing`}
                  onClick={onClose}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Get Full Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
