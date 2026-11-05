"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Building2, BookOpen } from "lucide-react";

export function BundleUpsellBanner() {
  return (
    <div className="mb-8 rounded-3xl glass-card-interactive border-2 border-purple-500/30 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-purple-500/[0.06] via-indigo-500/[0.04] to-transparent shadow-xl shadow-purple-900/5">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="uppercase tracking-wider">Smart Bundle Upgrade</span>
          <span>·</span>
          <span className="text-emerald-600 dark:text-emerald-400">Save ₹899</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white font-display">
          Get this directory FREE inside The Job Search Book bundle.
        </h3>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
          Instead of buying the directory separately, unlock both the full <strong>30-chapter playbook</strong> and this <strong>144-company hiring database</strong> together for only ₹199.
        </p>
      </div>

      <Link
        href="/products/the-job-search-book"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold whitespace-nowrap shadow-lg shadow-purple-600/25 transition-all cursor-pointer shrink-0 hover:scale-[1.02] active:scale-[0.98] group"
      >
        <span>View Complete Bundle • ₹199</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}
