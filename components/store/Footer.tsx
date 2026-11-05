import React from "react";
import Link from "next/link";
import { clientEnv } from "@/lib/env";
import { Mail, ShieldCheck, Sparkles, ArrowUpRight, Globe } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  const supportEmail = clientEnv.NEXT_PUBLIC_SUPPORT_EMAIL || "sowebuild.in@gmail.com";

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-white/40 dark:bg-[#0c0c12]/60 backdrop-blur-xl text-zinc-600 dark:text-zinc-400 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-4">
            <BrandLogo size="md" />
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed font-sans">
              Tactical engineering playbooks and verified industry directories. Built for career leverage with instant reader access on any device.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-1">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Catalog &amp; Reader Operational</span>
              </div>
            </div>
          </div>

          {/* Agency & Services Column */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>Agency &amp; Studio</span>
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We design &amp; build bespoke websites, web applications, and scale social media presence.
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://sowebuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit sowebuild.in</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://sowebuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Custom Web Engineering
                </a>
              </li>
              <li>
                <a
                  href="https://sowebuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Social Media Management
                </a>
              </li>
              <li>
                <a
                  href="https://sowebuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Brand &amp; Identity Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white font-mono">
              Publications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/the-job-search-book" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  The Job Search Book
                </Link>
              </li>
              <li>
                <Link href="/products/hiring-organizations" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Hiring Organizations Directory
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  All Publications
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  My Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white font-mono">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 hover:underline font-medium break-all"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{supportEmail}</span>
                </a>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/[0.06] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} SoWeBuild Store • Digital Division of <a href="https://sowebuild.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-950 dark:hover:text-white">SoWeBuild Agency</a></p>
          <div className="flex items-center space-x-2 text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure Digital Delivery • Encrypted Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
