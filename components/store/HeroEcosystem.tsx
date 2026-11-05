"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export function HeroEcosystem({ onOpenPreview }: { onOpenPreview?: (slug: string) => void }) {
  // Short, punchy kinetic phrases that never wrap or cause overflow
  const kineticPhrases = [
    {
      text: "playbooks.",
      gradient: "from-purple-600 via-indigo-600 to-violet-500 dark:from-purple-400 dark:via-indigo-300 dark:to-violet-300",
    },
    {
      text: "hiring intel.",
      gradient: "from-emerald-600 via-teal-600 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-300",
    },
    {
      text: "digital systems.",
      gradient: "from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-300",
    },
    {
      text: "growth.",
      gradient: "from-violet-600 via-purple-600 to-indigo-500 dark:from-violet-400 dark:via-purple-300 dark:to-indigo-300",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % kineticPhrases.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [kineticPhrases.length]);

  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32 border-b border-black/[0.05] dark:border-white/[0.06] bg-[var(--background)]">
      {/* Ambient Lighting Orbs */}
      <div className="kr-orb w-[500px] sm:w-[800px] h-[380px] sm:h-[550px] -top-20 left-1/2 -translate-x-1/2 bg-purple-600/15 dark:bg-purple-600/20 pointer-events-none" />
      <div className="kr-orb w-[400px] sm:w-[650px] h-[380px] sm:h-[550px] top-1/3 right-1/4 bg-indigo-500/10 dark:bg-indigo-600/15 pointer-events-none" />

      {/* Cyber Grid & Subtle Film Grain */}
      <div className="kr-grid-bg absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none" />
      <div className="grain-overlay absolute inset-0 z-0 opacity-25 dark:opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8 sm:space-y-10">
        
        {/* Minimalist Brand Masthead Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/10 text-xs font-mono shadow-xs backdrop-blur-xl"
        >
          <svg viewBox="0 0 40 60" className="w-2.5 h-3.5 shrink-0" fill="none" aria-hidden="true">
            <polygon points="26,2 38,2 14,58 2,58" fill="#7C3AED" />
          </svg>
          <span className="font-bold text-zinc-950 dark:text-white tracking-widest uppercase">SOWEBUILD</span>
          <span className="text-zinc-300 dark:text-white/20">·</span>
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">DIGITAL PRESS &amp; STUDIO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0 ml-0.5" />
        </motion.div>

        {/* Hero Kinetic Headline - Permanently Stable 2-Line Layout (Zero Layout Shifts) */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.12] sm:leading-[1.08] font-display"
          >
            <span className="block">We engineer</span>
            <span className="block h-[1.22em] overflow-hidden relative mt-1 sm:mt-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentIndex}
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-x-0 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r ${kineticPhrases[currentIndex].gradient}`}
                >
                  {kineticPhrases[currentIndex].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Crisp, Concise Value Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans"
          >
            Tactical engineering playbooks and verified industry directories. Built for career leverage with instant in-browser reading. Zero fluff.
          </motion.p>
        </div>

        {/* Clean, Focused Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <a
            href="#catalog"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-xl shadow-purple-600/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Publications</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://sowebuild.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full border border-black/[0.08] dark:border-white/10 bg-white/80 dark:bg-white/[0.05] hover:bg-white dark:hover:bg-white/10 text-zinc-900 dark:text-white text-sm font-semibold transition-all backdrop-blur-md cursor-pointer hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Sparkles className="w-4 h-4 text-purple-500 group-hover:rotate-12 transition-transform" />
            <span>SoWeBuild Agency</span>
            <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
