"use client";

import React from "react";
import { BookOpen, Building2, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export function BundleIncludedSection() {
  return (
    <section className="pt-8 border-t border-black/[0.08] dark:border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dual Release Bundle</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
            Everything Included in This Bundle
          </h2>
        </div>
        <span className="self-start sm:self-auto text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <Zap className="w-4 h-4" />
          <span>Save ₹899 · 2 Releases Included</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Item 1: Core Playbook */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card-interactive space-y-4 border border-purple-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-2 text-xs sm:text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Core Playbook · Volume 01</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold text-xs">
              30 Chapters
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white font-display">
              The Job Search Book
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              The complete engineering hiring playbook: ATS parser indexing, GitHub proof audits, cold sniper messaging to hiring managers, and salary negotiation math.
            </p>
          </div>

          <ul className="space-y-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
              <span>30 structured chapters covering the complete hiring lifecycle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
              <span>ACR bullet formulas &amp; recruiter scan algorithms</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Action calendar &amp; 13-column job application tracker</span>
            </li>
          </ul>
        </div>

        {/* Item 2: Free Bonus Directory */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card-interactive border-emerald-500/30 space-y-4 relative overflow-hidden bg-emerald-500/[0.02]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2 text-xs sm:text-sm">
              <Building2 className="w-4 h-4" />
              <span>Verified Directory · Volume 02</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              FREE BONUS (₹499 Value)
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white font-display">
              Companies That Hire Without Whiteboards
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              144 verified engineering teams evaluated on real-world practical code, take-homes, and pairing rather than algorithmic LeetCode puzzles.
            </p>
          </div>

          <ul className="space-y-2 pt-2 border-t border-emerald-500/10 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>144 verified employers across India and remote</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Interview breakdown: take-homes, pairing &amp; code reviews</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Direct careers application links &amp; contact routes</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
