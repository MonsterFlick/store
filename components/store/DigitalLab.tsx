"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  Building2,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DigitalLab() {
  const [activeSpecimen, setActiveSpecimen] = useState<"reader" | "calculator" | "directory">("reader");

  // Specimen 1: Reader Simulator state
  const [readerTheme, setReaderTheme] = useState<"dark" | "paper" | "sepia">("dark");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  // Specimen 2: Calculator state
  const [baseSalary, setBaseSalary] = useState<number>(22);
  const [compOffer, setCompOffer] = useState<number>(32);

  // Specimen 3: Directory state
  const [activeCompanyIdx, setActiveCompanyIdx] = useState(0);
  const sampleCompanies = [
    {
      name: "Basecamp (37signals)",
      type: "Worldwide Remote",
      format: "Pragmatic Architecture Discussion",
      rounds: "No LeetCode. 45m codebase review + system tradeoffs.",
      url: "https://basecamp.com/about/jobs",
    },
    {
      name: "Automattic",
      type: "Worldwide Remote",
      format: "Paid Asynchronous Trial",
      rounds: "Short take-home, then a 2–3 week paid contract trial.",
      url: "https://automattic.com/work-with-us/",
    },
    {
      name: "Acko",
      type: "Bengaluru / Hybrid",
      format: "Real-World Low-Level Design",
      rounds: "Practical concurrency and API design on actual code.",
      url: "https://acko.com/careers",
    },
  ];

  return (
    <section id="lab" className="py-24 sm:py-28 border-b border-zinc-200/80 dark:border-white/5 bg-[var(--background-secondary)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE SPECIMEN SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
            Try The Products Live in Your Browser
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every product is engineered as a functional web experience with zero friction. Test the interactive specimens below:
          </p>

          {/* Specimen Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setActiveSpecimen("reader")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center space-x-2",
                activeSpecimen === "reader"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. In-Browser Reader</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSpecimen("calculator")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center space-x-2",
                activeSpecimen === "calculator"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100"
              )}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>2. Calculation Engine</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSpecimen("directory")}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center space-x-2",
                activeSpecimen === "directory"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-white/10 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100"
              )}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. Company Directory Filter</span>
            </button>
          </div>
        </div>

        {/* Active Specimen Stage */}
        <div className="max-w-4xl mx-auto rounded-[var(--radius-xl)] bg-white dark:bg-[#121218] border border-zinc-200 dark:border-white/15 p-6 sm:p-8 shadow-xl shadow-zinc-900/5 dark:shadow-black/50 overflow-hidden">
          
          <AnimatePresence mode="wait">
            {/* Specimen 1: Reader */}
            {activeSpecimen === "reader" && (
              <motion.div
                key="reader"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Simulator Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      Interactive Reader Experience — The Job Search Book
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono">
                    {/* Theme Buttons */}
                    <div className="flex items-center bg-zinc-100 dark:bg-white/10 p-1 rounded-md">
                      <button
                        type="button"
                        onClick={() => setReaderTheme("dark")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", readerTheme === "dark" && "bg-zinc-900 text-white font-bold")}
                      >
                        Dark
                      </button>
                      <button
                        type="button"
                        onClick={() => setReaderTheme("paper")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", readerTheme === "paper" && "bg-white text-zinc-900 font-bold shadow-xs")}
                      >
                        Paper
                      </button>
                      <button
                        type="button"
                        onClick={() => setReaderTheme("sepia")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", readerTheme === "sepia" && "bg-[#F4ECD8] text-[#5C4033] font-bold shadow-xs")}
                      >
                        Sepia
                      </button>
                    </div>

                    {/* Font Size */}
                    <div className="flex items-center bg-zinc-100 dark:bg-white/10 p-1 rounded-md">
                      <button
                        type="button"
                        onClick={() => setFontSize("sm")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", fontSize === "sm" && "bg-white dark:bg-zinc-800 font-bold")}
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontSize("base")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", fontSize === "base" && "bg-white dark:bg-zinc-800 font-bold")}
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontSize("lg")}
                        className={cn("px-2 py-0.5 rounded cursor-pointer", fontSize === "lg" && "bg-white dark:bg-zinc-800 font-bold")}
                      >
                        A+
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reader Simulated Canvas */}
                <div
                  className={cn(
                    "p-6 sm:p-8 rounded-xl border transition-colors duration-200 space-y-4 font-serif",
                    readerTheme === "dark" && "bg-[#0c0c10] text-[#e0e0e6] border-zinc-800",
                    readerTheme === "paper" && "bg-[#fcfcf9] text-[#1a1a1c] border-zinc-300",
                    readerTheme === "sepia" && "bg-[#f6eee0] text-[#422e1b] border-[#e2d5c3]",
                    fontSize === "sm" && "text-sm leading-relaxed",
                    fontSize === "base" && "text-base leading-relaxed sm:text-lg sm:leading-loose",
                    fontSize === "lg" && "text-lg leading-loose sm:text-xl sm:leading-loose"
                  )}
                >
                  <div className="font-mono text-xs uppercase tracking-widest text-indigo-500 font-bold not-italic">
                    Chapter 00 — The Zero-BS Thesis
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sans not-italic">
                    Proof Outranks Claims Every Single Time
                  </h3>
                  <p>
                    Most job applications are desperate pleas disguised as credentials. When a recruiter opens your resume, they spend 6 seconds asking one brutal question: <em>&ldquo;Can this person deliver the specific outcome we are bleeding for right now?&rdquo;</em>
                  </p>
                  <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-sans not-italic text-xs font-mono space-y-1">
                    <span className="text-indigo-400 font-bold">THE ACR FORMULA:</span>
                    <p className="text-zinc-600 dark:text-zinc-300">Action + Concrete Context + Measurable Result (with verifiable link).</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-zinc-500">
                    Live product: 30 Complete Chapters with rich interactive tools
                  </span>
                  <Link
                    href="/products/the-job-search-book"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Inspect Full Publication</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Specimen 2: Calculator */}
            {activeSpecimen === "calculator" && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      Offer Counter-Math Simulator (From Chapter 14)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">Interactive Formula</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Sliders */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-600 dark:text-zinc-400">Current Fixed Compensation:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">₹{baseSalary} LPA</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="80"
                        value={baseSalary}
                        onChange={(e) => setBaseSalary(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-600 dark:text-zinc-400">Initial Recruiter Offer:</span>
                        <span className="font-bold text-zinc-900 dark:text-white">₹{compOffer} LPA</span>
                      </div>
                      <input
                        type="range"
                        min={baseSalary}
                        max="120"
                        value={compOffer}
                        onChange={(e) => setCompOffer(Number(e.target.value))}
                        className="w-full accent-sky-600 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Right Live Math Result */}
                  <div className="p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 space-y-3 font-mono">
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                      Strategic Counter Calculation
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">Recommended Counter:</span>
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ₹{(compOffer * 1.18).toFixed(1)} LPA
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline text-xs text-zinc-600 dark:text-zinc-400 border-t border-indigo-200/60 dark:border-indigo-500/20 pt-2">
                      <span>Jump Over Base:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        +{(((compOffer * 1.18 - baseSalary) / baseSalary) * 100).toFixed(0)}%
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 font-sans">
                      Uses the 18% anchor-buffer principle from Chapter 14 to neutralize recruiter lowballs.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Specimen 3: Directory Filter */}
            {activeSpecimen === "directory" && (
              <motion.div
                key="directory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-white/10">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
                      Companies That Hire Without Whiteboards — Interactive Directory
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">120+ Curated Orgs</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {sampleCompanies.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setActiveCompanyIdx(idx)}
                      className={cn(
                        "p-4 rounded-xl text-left border transition-all cursor-pointer space-y-2",
                        activeCompanyIdx === idx
                          ? "bg-indigo-50 dark:bg-indigo-500/15 border-indigo-300 dark:border-indigo-500/50 shadow-sm"
                          : "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200/80 dark:border-white/5 hover:border-zinc-300"
                      )}
                    >
                      <h4 className="font-bold text-sm text-zinc-950 dark:text-white">{c.name}</h4>
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                        {c.type}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Company Breakdown */}
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                      {sampleCompanies[activeCompanyIdx].name} Interview Loop:
                    </span>
                    <a
                      href={sampleCompanies[activeCompanyIdx].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-indigo-500 flex items-center space-x-1"
                    >
                      <span>Careers Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
                    <p><strong>Format:</strong> {sampleCompanies[activeCompanyIdx].format}</p>
                    <p><strong>Process:</strong> {sampleCompanies[activeCompanyIdx].rounds}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-zinc-500">
                    Search and filter over 120+ verified companies worldwide
                  </span>
                  <Link
                    href="/products/hiring-organizations"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Open Full Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
