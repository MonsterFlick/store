import React from "react";
import Link from "next/link";
import { clientEnv } from "@/lib/env";
import { Mail } from "lucide-react";

export function Footer() {
  const supportEmail = clientEnv.NEXT_PUBLIC_SUPPORT_EMAIL || "sowebuild.in@gmail.com";

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] text-[var(--text-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-base font-bold text-[var(--text-primary)] font-display"
            >
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">&lt;/&gt;</span>
              <span>sowebuild</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
                store
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
              Living digital editions, interactive playbooks, and verified directories engineered for career leverage.
            </p>
          </div>

          {/* Catalog Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
              Publications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/the-job-search-book" className="hover:text-[var(--text-primary)] transition-colors">
                  The Job Search Book
                </Link>
              </li>
              <li>
                <Link href="/products/hiring-organizations" className="hover:text-[var(--text-primary)] transition-colors">
                  Hiring Organizations Directory
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-[var(--text-primary)] transition-colors">
                  All Releases
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[var(--text-primary)] transition-colors">
                  My Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-mono">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{supportEmail}</span>
                </a>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-[var(--text-primary)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-[var(--text-primary)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="hover:text-[var(--text-primary)] transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-3">
          <p>© {new Date().getFullYear()} SoWeBuild Store. All rights reserved.</p>
          <p className="font-mono text-[11px]">Engineered with precision for ambitious builders.</p>
        </div>
      </div>
    </footer>
  );
}
