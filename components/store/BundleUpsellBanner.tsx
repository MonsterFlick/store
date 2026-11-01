import React from "react";
import Link from "next/link";
import { ArrowRight, Gift, Check } from "lucide-react";

export function BundleUpsellBanner() {
  return (
    <div className="mb-8 rounded-[var(--radius-xl)] bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-emerald-950/30 border border-indigo-500/30 p-5 sm:p-6 shadow-md relative overflow-hidden backdrop-blur-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium">
              <Gift className="w-3 h-3 text-emerald-400" />
              <span>RECOMMENDED BUNDLE</span>
            </span>
            <span className="text-xs font-mono text-zinc-400">
              Directory Included Free
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
            Get this entire directory free with The Job Search Book bundle
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Instead of buying this standalone directory for ₹99, get the full 30-chapter playbook (worth ₹599) <strong className="text-emerald-300">plus this verified directory included free</strong> for ₹199.
          </p>
        </div>

        <div className="w-full lg:w-auto shrink-0">
          <Link
            href="/products/the-job-search-book"
            className="w-full lg:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span>Get Bundle • ₹199</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
