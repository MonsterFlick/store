"use client";

import React from "react";
import { ArrowUpRight, Globe, Layers, Share2, Sparkles, Code2, CheckCircle2 } from "lucide-react";

export function AgencySpotlight() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-purple-500/[0.02] to-transparent">
      {/* Background ambient radial glow */}
      <div
        className="kr-orb w-[420px] sm:w-[680px] h-[340px] sm:h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600/10 dark:bg-purple-600/15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Glassmorphic Feature Container */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 border border-purple-500/20 dark:border-purple-400/20 bg-white/70 dark:bg-[#120f1d]/70 backdrop-blur-2xl shadow-2xl shadow-purple-900/10 dark:shadow-purple-950/40 overflow-hidden">
          {/* Subtle decorative grid overlay */}
          <div className="kr-grid-bg absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none" />

          {/* Top Header Pill & Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-mono font-medium backdrop-blur-md">
              <svg viewBox="0 0 40 60" className="w-2.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
                <polygon points="26,2 38,2 14,58 2,58" fill="#7C3AED" />
              </svg>
              <span className="tracking-wider uppercase font-semibold">SoWeBuild Agency</span>
              <span className="text-purple-300 dark:text-purple-600">·</span>
              <span className="text-[11px]">Engineering &amp; Growth Studio</span>
            </div>

            <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Accepting New Client Projects</span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="max-w-3xl space-y-4 mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white font-display leading-[1.15]">
              We build custom websites &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-500 dark:from-purple-400 dark:via-indigo-300 dark:to-violet-400">
                scale social media engines.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              Beyond our tactical playbooks, the <strong>SoWeBuild Agency</strong> partners with founders, businesses, and creators to architect bespoke web applications, craft modern design systems, and manage high-converting social media channels.
            </p>
          </div>

          {/* Agency Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: Custom Websites & Web Apps */}
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white font-display">
                Custom Web Engineering
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                High-performance Next.js web applications, digital storefronts, SaaS portals, and landing pages with glassmorphism and sub-second load times.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Next.js 15+ / React / Tailwind</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Interactive 3D &amp; Motion UI</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Social Media Management */}
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono group-hover:scale-105 transition-transform">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white font-display">
                Social Media Growth &amp; Content
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Full-service social media management across Instagram, LinkedIn, and X. Editorial scripts, carousel design, short-form video hooks, and audience growth.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>End-to-End Content Production</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Distribution &amp; Engagement Systems</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Brand Identity & Strategy */}
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] hover:border-violet-500/40 dark:hover:border-violet-500/40 transition-all duration-300 space-y-3 group">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-mono group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-950 dark:text-white font-display">
                Brand &amp; Creative Systems
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Distinctive visual identities, vector typography, brand style guides, marketing collateral, and digital asset libraries engineered for prestige.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>Logo &amp; Brand Guidelines</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>High-Converting Digital Assets</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Row / Outbound Links */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Globe className="w-4 h-4 text-purple-500 shrink-0" />
              <span>Official Agency Portal:</span>
              <a
                href="https://sowebuild.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-zinc-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 underline underline-offset-4"
              >
                sowebuild.in
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://sowebuild.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <span>Visit SoWeBuild Agency</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="mailto:sowebuild.in@gmail.com?subject=Agency%20Inquiry%20from%20Store"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-black/[0.06] dark:border-white/10 transition-all duration-200"
              >
                <span>Contact Studio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
