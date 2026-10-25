import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Gift, Check } from "lucide-react";

export function BundleUpsellBanner() {
  return (
    <div className="mb-8 rounded-[var(--radius-xl)] bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-emerald-950/40 border-2 border-indigo-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Decorative ambient flare */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>SMARTER VALUE DEAL</span>
            </span>
            <span className="text-xs font-mono text-zinc-300">
              Save ₹899 (82% Discount)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            Get this entire Directory <span className="text-emerald-400 underline decoration-emerald-500/50">100% FREE</span> with The Job Search Book
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Why buy this directory alone for ₹99? For just <strong className="text-white">₹199 (only ₹100 more)</strong>, get the full 30-chapter playbook (worth ₹599) <strong className="text-emerald-300">plus this verified 144-company directory included free.</strong>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-zinc-300 font-mono">
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>30 Playbook Chapters</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>144 Verified Employers</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Both in Your Library</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto shrink-0">
          <Link
            href="/products/the-job-search-book"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Upgrade to Complete Bundle · ₹199</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-[11px] font-mono text-zinc-400 text-center lg:text-right">
            Includes Book + Free Directory
          </span>
        </div>
      </div>
    </div>
  );
}
