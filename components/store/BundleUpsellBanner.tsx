import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function BundleUpsellBanner() {
  return (
    <div className="mb-6 rounded-[var(--radius-lg)] bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-500/25 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>RECOMMENDED BUNDLE</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-200">
          This directory is <strong className="text-emerald-600 dark:text-emerald-400">included free</strong> with <em>The Job Search Book</em> 30-chapter bundle for ₹199.
        </p>
      </div>

      <Link
        href="/products/the-job-search-book"
        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold whitespace-nowrap shadow-xs transition-colors cursor-pointer shrink-0"
      >
        <span>Get Bundle • ₹199</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
