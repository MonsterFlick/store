import React from "react";
import { BookOpen, Building2, Sparkles } from "lucide-react";

export function BundleIncludedSection() {
  return (
    <div className="pt-6 border-t border-[var(--border-subtle)] space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] font-display">
          Everything Included in This Edition
        </h3>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          2 Releases · 1 Bundle
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Item 1: Core Playbook */}
        <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Core Playbook
            </span>
            <span className="text-[var(--text-muted)]">30 Chapters</span>
          </div>

          <h4 className="text-sm font-bold text-[var(--text-primary)]">
            The Job Search Book
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            The complete recruitment lifecycle: ATS parsing, GitHub proof audits, cold sniper outreach, and salary negotiation.
          </p>
        </div>

        {/* Item 2: Free Bonus Directory */}
        <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-emerald-500/25 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              Bonus Directory
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% FREE</span>
          </div>

          <h4 className="text-sm font-bold text-[var(--text-primary)]">
            Companies That Hire Without Whiteboards
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            144 verified employers hiring on practical coding, system design, and take-home projects instead of LeetCode.
          </p>
        </div>
      </div>
    </div>
  );
}
