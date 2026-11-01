import React from "react";
import { BookOpen, Building2, Gift, CheckCircle2 } from "lucide-react";

export function BundleIncludedSection() {
  return (
    <div className="pt-8 border-t border-[var(--border-subtle)] space-y-5">
      <div className="space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
          <Gift className="w-3.5 h-3.5" />
          <span>DUAL-EDITION BUNDLE</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
          Everything Included in This Release
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Both publications unlock immediately in your account library with perpetual reading access.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Item 1: The Job Search Book */}
        <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                Core Playbook
              </span>
              <span className="text-[var(--text-muted)]">30 Chapters</span>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  The Job Search Book
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  The end-to-end recruitment playbook: ATS recruiter scans, ACR project proofs, cold sniper outreach, and salary leverage.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>In-Browser Reader</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Included</span>
          </div>
        </div>

        {/* Item 2: Hiring Organizations Directory */}
        <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-emerald-500/30 flex flex-col justify-between space-y-3 relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Free Bonus Directory
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% FREE</span>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  Companies That Hire Without Whiteboards
                </h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  144 verified tech employers hiring on practical codebase assessments, pairing, and take-home systems instead of LeetCode.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>Filterable Directory</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹99 Value • Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
