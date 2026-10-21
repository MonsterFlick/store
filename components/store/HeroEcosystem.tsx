"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Building2,
  Sliders,
  Terminal,
  Code2,
  GraduationCap,
  Layers,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroEcosystem({ onOpenPreview }: { onOpenPreview?: (slug: string) => void }) {
  // Kinetic Rotating Pillars covering the agnostic digital universe
  const rotatingMediums = [
    { title: "Software & Micro-Apps.", color: "text-emerald-600 dark:text-emerald-400" },
    { title: "Interactive Books.", color: "text-indigo-600 dark:text-indigo-400" },
    { title: "Video Courses.", color: "text-purple-600 dark:text-purple-400" },
    { title: "Tools & Simulators.", color: "text-sky-600 dark:text-sky-400" },
    { title: "Docs & Knowledge Vaults.", color: "text-amber-600 dark:text-amber-400" },
    { title: "Trackers & Systems.", color: "text-rose-600 dark:text-rose-400" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingMediums.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingMediums.length]);

  // Mini Specimen active tab in the 3D Hero card
  const [specimenTab, setSpecimenTab] = useState<"book" | "tool" | "directory">("book");
  const [simulatorValue, setSimulatorValue] = useState(24);


  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background)]">
      {/* Ambient Lighting Orbs */}
      <div className="kr-orb w-[450px] sm:w-[700px] h-[350px] sm:h-[500px] -top-24 left-1/4 -translate-x-1/2 bg-indigo-500/10 dark:bg-indigo-600/15" />
      <div className="kr-orb w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] top-1/3 right-4 sm:right-12 bg-purple-500/10 dark:bg-purple-600/15" />
      <div className="kr-orb w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bottom-0 left-10 bg-emerald-500/5 dark:bg-emerald-600/10" />

      {/* Subtle Grain Overlay */}
      <div className="grain-overlay absolute inset-0 z-0 opacity-40 dark:opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Hero Left: Manifesto, Kinetic Headline, CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Agnostic Platform Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.08] border border-zinc-200 dark:border-white/15 text-xs font-mono shadow-xs backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] shrink-0 animate-pulse" />
              <span className="font-bold text-zinc-900 dark:text-white tracking-wider">SOWEBUILD</span>
              <span className="text-zinc-300 dark:text-white/20">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide">
                UNIVERSAL DIGITAL GOODS ENGINE
              </span>
            </div>

            {/* Kinetic Dynamic Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.18] sm:leading-[1.15] font-display">
                High-leverage digital assets for{" "}
                <span className="block font-serif font-normal italic text-zinc-800 dark:text-zinc-200 tracking-tight">
                  ambitious builders.
                </span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl mt-2 font-display">
                  We engineer{" "}
                  <span className="relative inline-block h-[1.3em] align-top overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentIndex}
                        initial={{ y: 35, opacity: 0, filter: "blur(4px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        exit={{ y: -35, opacity: 0, filter: "blur(4px)" }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("inline-block font-extrabold whitespace-nowrap", rotatingMediums[currentIndex].color)}
                      >
                        {rotatingMediums[currentIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </h1>
            </div>

            {/* Subtitle stating the product and category agnostic vision */}
            <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
              Not a generic marketplace or static PDF dump. SoWeBuild is an interactive digital products engine—delivering living playbooks, software tools, masterclasses, runbooks, and operational systems built to give you real leverage across craft, career, and enterprise.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a href="#catalog" className="inline-block">
                <MagneticButton className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:shadow-indigo-600/40">
                  <span>Explore Product Universe</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </a>

              <a href="#lab" className="inline-block">
                <MagneticButton className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-[var(--radius-md)] border border-zinc-200 dark:border-white/20 bg-white dark:bg-white/10 hover:bg-zinc-50 dark:hover:bg-white/15 text-zinc-800 dark:text-white text-sm font-medium transition-all duration-150 shadow-xs">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Try Interactive Specimen Lab</span>
                </MagneticButton>
              </a>
            </div>

            {/* Platform Guarantees / Metrics Bar */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400 border-t border-zinc-200/80 dark:border-white/10">
              <div className="flex flex-col space-y-0.5">
                <span className="text-zinc-950 dark:text-white font-bold text-sm">30 Chapters</span>
                <span className="text-[11px] text-zinc-500">In-Depth Playbook</span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-zinc-950 dark:text-white font-bold text-sm">140+ Companies</span>
                <span className="text-[11px] text-zinc-500">Verified Directory</span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-zinc-950 dark:text-white font-bold text-sm">Lifetime Access</span>
                <span className="text-[11px] text-zinc-500">Free Future Updates</span>
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="text-zinc-950 dark:text-white font-bold text-sm">Instant</span>
                <span className="text-[11px] text-zinc-500">Digital Unlocking</span>
              </div>
            </div>


          </div>

          {/* Hero Right: Interactive Specimen 3D Glass Card */}
          <div className="lg:col-span-5 relative">
            <TiltCard maxTilt={6} className="rounded-[var(--radius-xl)]">
              <div className="rounded-[var(--radius-xl)] bg-white/90 dark:bg-[#121218]/90 border border-zinc-200/90 dark:border-white/15 p-6 shadow-2xl shadow-indigo-900/10 dark:shadow-black/70 backdrop-blur-xl space-y-5">
                
                {/* Specimen Header & Mode Switcher */}
                <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                      LIVE SPECIMEN VIEWER
                    </span>
                  </div>

                  {/* Switcher Pills */}
                  <div className="flex items-center bg-zinc-100 dark:bg-white/10 p-0.5 rounded-lg text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setSpecimenTab("book")}
                      className={cn(
                        "px-2 py-1 rounded cursor-pointer transition-colors",
                        specimenTab === "book"
                          ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      Book
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecimenTab("tool")}
                      className={cn(
                        "px-2 py-1 rounded cursor-pointer transition-colors",
                        specimenTab === "tool"
                          ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      Tool
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpecimenTab("directory")}
                      className={cn(
                        "px-2 py-1 rounded cursor-pointer transition-colors",
                        specimenTab === "directory"
                          ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-bold shadow-xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      Directory
                    </button>
                  </div>
                </div>

                {/* Dynamic Specimen Content */}
                <div className="min-h-[220px]">
                  {specimenTab === "book" && (
                    <motion.div
                      key="book"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/15 px-2 py-0.5 rounded">
                          EBook & Reader Engine
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">Chapter 0 Preview</span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                        The Job Search Book (30 Chapters)
                      </h3>

                      <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/5 space-y-2 text-xs font-sans">
                        <p className="italic text-zinc-600 dark:text-zinc-300 leading-relaxed font-serif">
                          &ldquo;Hiring is a high-stakes bet made by tired people reading exaggerated claims. Give them proof they cannot explain away.&rdquo;
                        </p>
                        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-500">
                          <span>Framework: ACR Proof Model</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">148 Rich Blocks</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className="text-xl font-bold font-mono text-zinc-950 dark:text-white">₹199</span>
                          <span className="text-[10px] font-mono text-zinc-400 ml-1.5">Lifetime Reader Access</span>
                        </div>

                        {onOpenPreview && (
                          <button
                            type="button"
                            onClick={() => onOpenPreview("the-job-search-book")}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md bg-indigo-50 dark:bg-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold cursor-pointer border border-indigo-200 dark:border-indigo-500/30 transition-colors"
                          >
                            <span>Read Excerpt</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {specimenTab === "tool" && (
                    <motion.div
                      key="tool"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/15 px-2 py-0.5 rounded">
                          Interactive Simulator Engine
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">Live Simulation</span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                        Market Salary Counter-Math Simulator
                      </h3>

                      <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/5 space-y-2.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-600 dark:text-zinc-300 font-mono">Current Base Compensation:</span>
                          <span className="font-mono font-bold text-zinc-900 dark:text-white">₹{simulatorValue} LPA</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="60"
                          value={simulatorValue}
                          onChange={(e) => setSimulatorValue(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <div className="flex justify-between items-center text-[11px] font-mono pt-1 text-emerald-600 dark:text-emerald-400 font-semibold border-t border-zinc-200/50 dark:border-white/5">
                          <span>Target Counter Offer (35% Leverage):</span>
                          <span>₹{(simulatorValue * 1.35).toFixed(1)} LPA</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono text-zinc-500">From Chapter 14 of Book</span>
                        <a
                          href="#lab"
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>Open Full Lab</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {specimenTab === "directory" && (
                    <motion.div
                      key="directory"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded">
                          Curated Directory
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">120+ Companies</span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                        Hiring Without Whiteboards
                      </h3>

                      <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/5 space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-zinc-900 dark:text-white">Basecamp (37signals)</span>
                          <span className="text-[10px] text-zinc-400">Worldwide Remote</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-300">
                          Format: Pragmatic Architecture Discussion. No LeetCode algorithm grilling.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono text-zinc-500">Free Curated Resource</span>
                        <Link
                          href="/products/hiring-organizations"
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>View Directory</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>


                {/* Card Footer Guarantee */}
                <div className="pt-3 border-t border-zinc-200/80 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Instant Digital Access</span>
                  </span>
                  <span>Perpetual Access</span>
                </div>

              </div>
            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
