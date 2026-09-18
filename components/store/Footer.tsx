import React from "react";
import Link from "next/link";
import { env } from "@/lib/env";
import { Sparkles, Mail, CheckCircle2, ShieldCheck } from "lucide-react";

export function Footer() {
  const supportEmail = "sowebuild.in@gmail.com";

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] text-[var(--text-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 text-lg font-bold text-[var(--text-primary)]">
              <span className="font-mono text-[var(--accent-primary)] font-bold">&lt;/&gt;</span>
              <span>sowebuild</span>
              <span className="text-[var(--accent-primary)] text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
                store
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
              Curated digital playbooks, guides, tools, and high-impact resources crafted for builders, professionals, and operators.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] pt-2 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Instant Digital Access
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Curated & Practical
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Digital Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/products/the-job-search-book" className="hover:text-[var(--text-primary)] transition-colors">
                  The Job Search Book
                </Link>
              </li>
              <li>
                <Link href="/products/hiring-organizations" className="hover:text-[var(--text-primary)] transition-colors">
                  Hiring Without Whiteboards
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-[var(--text-primary)] transition-colors">
                  All Products
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
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Support & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="flex items-center space-x-2 text-[var(--accent-primary)] hover:underline font-medium"
                >
                  <Mail className="w-4 h-4 shrink-0" />
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
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-3">
          <p>© {new Date().getFullYear()} SoWeBuild Store (store.sowebuild.in). All rights reserved.</p>
          <p className="font-mono text-[11px]">Curated digital products engineered for velocity and clarity.</p>
        </div>
      </div>
    </footer>
  );
}