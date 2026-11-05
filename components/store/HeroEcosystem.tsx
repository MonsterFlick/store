"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ArrowRight,
  Eye,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroEcosystem({ onOpenPreview }: { onOpenPreview?: (slug: string) => void }) {
  const rotatingMediums = [
    { title: "Software & Micro-Apps", color: "text-emerald-600 dark:text-emerald-400" },
    { title: "Interactive Books", color: "text-indigo-600 dark:text-indigo-400" },
    { title: "Video Courses", color: "text-purple-600 dark:text-purple-400" },
    { title: "Tools & Simulators", color: "text-sky-600 dark:text-sky-400" },
    { title: "Knowledge Vaults", color: "text-amber-600 dark:text-amber-400" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingMediums.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingMediums.length]);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 border-b border-zinc-200/60 dark:border-white/5 bg-[var(--background)]">
      {/* Ambient Lighting Orbs */}
      <div className="kr-orb w-[450px] sm:w-[700px] h-[350px] sm:h-[500px] -top-24 left-1/4 -translate-x-1/2 bg-indigo-500/10 dark:bg-indigo-600/15" />
      <div className="kr-orb w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] top-1/3 right-4 sm:right-12 bg-purple-500/10 dark:bg-purple-600/15" />

      {/* Subtle Grain Overlay */}
      <div className="grain-overlay absolute inset-0 z-0 opacity-40 dark:opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Hero Left: Apple-minimal Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Masthead Tag */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/10 text-xs font-mono shadow-xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-zinc-900 dark:text-white tracking-wider">SOWEBUILD</span>
              <span className="text-zinc-300 dark:text-white/20">·</span>
              <span className="text-zinc-500 dark:text-zinc-400">DIGITAL EDITIONS</span>
            </div>

            {/* Confident Headline with Ticker */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.12] sm:leading-[1.1] font-display">
                High-leverage digital assets
                <span className="block text-zinc-500 dark:text-zinc-400 font-medium">
                  for ambitious builders.
                </span>
              </h1>

              {/* Kinetic Rotating Ticker */}
              <div className="flex items-center text-lg sm:text-2xl lg:text-3xl font-semibold tracking-tight font-display">
                <span className="text-zinc-500 dark:text-zinc-400 font-normal shrink-0 mr-2 sm:mr-3">
                  We engineer
                </span>
                <span className="relative inline-flex items-center h-[1.35em] overflow-hidden w-[230px] sm:w-[320px] lg:w-[390px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currentIndex}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "absolute left-0 font-extrabold whitespace-nowrap",
                        rotatingMediums[currentIndex].color
                      )}
                    >
                      {rotatingMediums[currentIndex].title}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </div>

            {/* 1-Sentence Editorial Subtitle */}
            <p className="max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              Living digital editions and verified industry directories. Built for career leverage with instant reader access on any device.
            </p>

            {/* Clean Single-Line CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm whitespace-nowrap"
              >
                <span>Explore Publications</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenPreview && (
                <button
                  type="button"
                  onClick={() => onOpenPreview("the-job-search-book")}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-[var(--radius-md)] border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-800 dark:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 text-indigo-500" />
                  <span>Read Free Sample</span>
                </button>
              )}
            </div>

          </div>

          {/* Hero Right: Clean Volume 01 Editorial Card */}
          <div className="lg:col-span-5 relative">
            <TiltCard maxTilt={3} className="rounded-[var(--radius-xl)]">
              <div className="rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 p-7 sm:p-8 shadow-2xl shadow-indigo-950/5 space-y-5">
                
                {/* Volume Top Folio */}
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3 text-xs font-mono">
                  <div className="flex items-center space-x-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>VOLUME 01 · COMPLETE BUNDLE</span>
                  </div>
                  <span className="text-[11px] text-zinc-500">Edition 2026</span>
                </div>

                {/* Title & Editorial Note */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white leading-tight font-display">
                    The Job Search Book
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-serif italic">
                    The Practical Playbook for Getting a Tech Job.
                  </p>
                </div>

                {/* Excerpt Pull-Quote */}
                <div className="p-3.5 rounded-[var(--radius-md)] bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/5 text-xs font-serif italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  &ldquo;Hiring is a bet made by tired people reading exaggerated claims. Give them proof they cannot explain away.&rdquo;
                </div>

                {/* Bundle Inclusions Tag */}
                <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between font-mono">
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    + 144-Company Directory
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Included Free
                  </span>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    href="/products/the-job-search-book"
                    className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    <span>Order Edition • ₹199</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {onOpenPreview && (
                    <button
                      type="button"
                      onClick={() => onOpenPreview("the-job-search-book")}
                      className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-[var(--radius-md)] border border-zinc-200 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-zinc-50 dark:hover:bg-white/10 text-zinc-800 dark:text-white text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Sample</span>
                    </button>
                  )}
                </div>

              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
