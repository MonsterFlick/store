import React from "react";
import { BookOpen, Building2, Check, Sparkles, Gift } from "lucide-react";

export function BundleIncludedSection() {
  return (
    <div className="pt-8 border-t border-[var(--border-subtle)] space-y-6">
      <div className="space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
          <Gift className="w-3.5 h-3.5" />
          <span>ALL-IN-ONE CAREER LAUNCHPAD BUNDLE</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Everything Included in This Bundle
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          You don&apos;t just get the book. You get the complete hiring playbook <strong className="text-[var(--text-primary)]">plus the verified 144-company directory included 100% free</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item 1: The Job Search Book */}
        <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                Core Publication
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)] line-through">
                Value: ₹599
              </span>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  The Job Search Book: The Practical Playbook
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">
                  30 Chapters · 148 Rich Blocks · Interactive Tools
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>8-second recruiter scan breakdown &amp; ATS algorithm optimization</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>ACR formula for developer project resume bullet points</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Naukri Resdex algorithm dominance &amp; FastForward invoice audit</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sniper cold outreach templates &amp; salary negotiation scripts</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Access: Instant Digital Reader</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Included</span>
          </div>
        </div>

        {/* Item 2: Hiring Organizations Directory */}
        <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border-2 border-emerald-500/30 flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500/10 to-transparent w-32 h-32 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                🎁 Free Bonus Included
              </span>
              <div className="flex items-center space-x-1.5 font-mono text-xs">
                <span className="text-[var(--text-muted)] line-through">₹499</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% FREE</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  Companies That Hire Without Whiteboards
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">
                  144 Verified Employers · Worldwide Remote &amp; India
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Zero LeetCode whiteboard trivia: practical take-homes &amp; pairing</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>113 Worldwide Remote companies &amp; 31 India tech organizations</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Detailed interview rounds, evaluation notes &amp; careers links</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Interactive search, category tags, and local application bookmarks</span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-muted)]">Separately: ₹99</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              FREE WITH THIS BUNDLE
            </span>
          </div>
        </div>
      </div>

      {/* Value Math Banner */}
      <div className="p-4 sm:p-5 rounded-[var(--radius-lg)] bg-gradient-to-r from-emerald-500/10 via-[var(--surface-elevated)] to-indigo-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUNDLE SAVINGS: ₹899 OFF (82% DISCOUNT)</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Total Combined Value: <span className="line-through font-mono">₹1,098</span> · Bundle Price: <span className="font-bold text-[var(--text-primary)] font-mono text-sm">₹199</span>
          </p>
        </div>

        <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-300 text-center sm:text-right">
          ✓ Both items unlocked immediately in your personal library
        </div>
      </div>
    </div>
  );
}
