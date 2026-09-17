import React from "react";
import Link from "next/link";
import { env } from "@/lib/env";
import { ShieldCheck, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] text-[var(--text-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-2 text-base font-bold text-[var(--text-primary)]">
              <span className="font-mono text-[var(--accent-primary)] font-bold">&lt;/&gt;</span>
              <span>Om Store</span>
            </Link>
            <p className="text-xs text-[var(--text-muted)] max-w-sm leading-relaxed">
              A modern digital product platform where the storefront is a reusable commerce and delivery layer, and every product is an interactive, custom-coded experience.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Two-Device Limit · Encrypted Content · Verified Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#products" className="hover:text-[var(--text-primary)] transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[var(--text-primary)] transition-colors">
                  My Library
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[var(--text-primary)] transition-colors">
                  Account & Devices
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-[var(--text-primary)] transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Legal & Support
            </h4>
            <ul className="space-y-2 text-xs">
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
                  Refund Policy (Non-Refundable)
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                  className="flex items-center space-x-1.5 hover:text-[var(--text-primary)] transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>{env.NEXT_PUBLIC_SUPPORT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-3">
          <p>© {new Date().getFullYear()} Om Store. All rights reserved. Prices strictly in INR (₹).</p>
          <p className="font-mono">Precision + Curiosity + Digital Craft</p>
        </div>
      </div>
    </footer>
  );
}
