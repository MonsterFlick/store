"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  ArrowRight,
  ArrowUpRight,
  Building2,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  Check,
  Eye,
  Calculator,
  Sliders,
  ExternalLink,
  Code2,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export interface BentoGridProps {
  onOpenPreview?: (slug: string) => void;
}

export function BentoGrid({ onOpenPreview }: BentoGridProps) {
  // Card 1: ACR Formula Role Switcher
  const [acrRole, setAcrRole] = useState<"backend" | "frontend" | "devops">("backend");

  // Card 2: Company Directory Inspector
  const [activeCompanyIdx, setActiveCompanyIdx] = useState(0);

  // Card 3: Salary Counter-Math Simulator
  const [currentLPA, setCurrentLPA] = useState<number>(18);
  const [offerLPA, setOfferLPA] = useState<number>(26);

  // Card 4: Reader Simulator State
  const [readerTheme, setReaderTheme] = useState<"dark" | "paper">("dark");
  const [readerQuiz, setReaderQuiz] = useState<number | null>(null);

  const companies = [
    {
      name: "Basecamp (37signals)",
      location: "Worldwide Remote",
      format: "Pragmatic Architecture Discussion",
      rounds: "No LeetCode. 45m codebase review + system tradeoffs.",
      url: "https://basecamp.com/about/jobs",
    },
    {
      name: "Automattic",
      location: "Worldwide Remote",
      format: "Paid Asynchronous Contract Trial",
      rounds: "Short take-home, then a 2–3 week paid contract trial.",
      url: "https://automattic.com/work-with-us/",
    },
    {
      name: "Acko",
      location: "Mumbai / Bengaluru",
      format: "Real-World Microservice Design",
      rounds: "Take-home service challenge + collaborative pairing.",
      url: "https://www.acko.com/careers",
    },
  ];

  const acrData = {
    backend: {
      before: "Optimized backend database queries and Node.js APIs.",
      critique: "Zero numbers, no business context, fails ATS search filters.",
      after: "Redesigned Postgres indexing & Redis write-through caching, cutting P99 latency from 420ms to 85ms across 1.4M daily requests.",
    },
    frontend: {
      before: "Built web app features and improved performance with React.",
      critique: "Vague. Doesn't demonstrate core web vitals impact or conversion lift.",
      after: "Architected dynamic route streaming, slashing LCP from 3.8s to 1.1s (-71%) and boosting checkout conversion by 14%.",
    },
    devops: {
      before: "Managed AWS Kubernetes clusters and reduced cloud spend.",
      critique: "Passive description that lacks measurable engineering scale.",
      after: "Migrated 60+ microservices to Karpenter spot nodes, shaving CI cycles by 48% and cutting monthly AWS spend by ₹3.8L ($4,600).",
    },
  };

  // Salary calculation from Chapter 22
  const counterTarget = Math.round(offerLPA * 1.15);
  const gainLPA = offerLPA - currentLPA;
  const hikePercent = Math.round(((offerLPA - currentLPA) / currentLPA) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-8">
      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ============================================================ */}
        {/* BENTO CARD 1 (Large - 8 Cols): The Job Search Book Spotlight */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs hover:border-[var(--border-hover)] transition-all group">
          {/* Subtle ambient corner gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[var(--accent-primary)]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {/* Top Badge & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--accent-light)] border border-[var(--accent-primary)]/20 text-xs font-mono font-bold text-[var(--accent-primary)]">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>FLAGSHIP RELEASE · 30 CHAPTERS</span>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-[var(--text-muted)] font-mono">
                <span className="text-amber-500 font-bold">★ 4.9</span>
                <span>/ 5.0</span>
                <span>(Verified Tech Engineers)</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                The Job Search Book
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                The definitive zero-fluff playbook for modern tech hiring: beating ATS screeners, building undeniable GitHub proof, cold-email sniper outreach, and offer negotiation scripts.
              </p>
            </div>

            {/* Interactive ACR Formula Showcase Inside Bento */}
            <div className="p-4 sm:p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                    ACR Formula Transformer (Chapter 02 Preview)
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs">
                  {(["backend", "frontend", "devops"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setAcrRole(role)}
                      className={`px-2.5 py-1 rounded-[var(--radius-sm)] capitalize font-mono text-[11px] transition-colors cursor-pointer ${
                        acrRole === role
                          ? "bg-[var(--accent-primary)] text-white font-semibold"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 p-3 rounded-[var(--radius-md)] bg-red-500/5 border border-red-500/15">
                  <span className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Weak (Filtered by ATS)
                  </span>
                  <p className="italic text-[var(--text-secondary)]">
                    &ldquo;{acrData[acrRole].before}&rdquo;
                  </p>
                </div>

                <div className="space-y-1.5 p-3 rounded-[var(--radius-md)] bg-emerald-500/5 border border-emerald-500/15">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> ACR Playbook Formula (Wins Interviews)
                  </span>
                  <p className="font-medium text-[var(--text-primary)]">
                    &ldquo;{acrData[acrRole].after}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Direct CTAs */}
          <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                ₹199
              </span>
              <span className="text-xs text-[var(--text-muted)] line-through font-mono">
                ₹599
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                67% Off Launch Price
              </span>
            </div>

            <div className="flex items-center space-x-2.5">
              {onOpenPreview && (
                <button
                  type="button"
                  onClick={() => onOpenPreview("the-job-search-book")}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] hover:bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Peek Inside (Ch 0)</span>
                </button>
              )}

              <Link
                href="/products/the-job-search-book"
                className="inline-flex items-center space-x-1.5 px-5 py-2 rounded-[var(--radius-md)] bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Get Lifetime Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BENTO CARD 2 (Medium - 4 Cols): No-Whiteboard Directory     */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-[var(--border-hover)] transition-all">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[var(--background-secondary)] text-[var(--text-muted)] text-[11px] font-mono font-medium">
                <Building2 className="w-3 h-3 text-[var(--accent-primary)]" />
                <span>144 VERIFIED EMPLOYERS</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ₹99 Only
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Companies That Hire Without Whiteboards
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Skip generic LeetCode puzzles. 144 companies assessing engineers on practical take-homes and pair programming.
              </p>
            </div>

            {/* Interactive Mini Company Switcher */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-semibold text-[var(--text-muted)] tracking-wider block">
                Sample Verified Intelligence:
              </span>
              <div className="space-y-1.5">
                {companies.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveCompanyIdx(i)}
                    className={`w-full text-left p-2.5 rounded-[var(--radius-md)] border text-xs transition-all cursor-pointer ${
                      activeCompanyIdx === i
                        ? "bg-[var(--surface-elevated)] border-[var(--accent-primary)] shadow-xs"
                        : "bg-[var(--background-secondary)]/50 border-transparent hover:border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">
                        {c.name}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {c.location}
                      </span>
                    </div>
                    {activeCompanyIdx === i && (
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 pt-1.5 border-t border-[var(--border-subtle)] leading-relaxed">
                        {c.rounds}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)] font-mono">
              113 Remote · 31 India
            </span>

            <Link
              href="/products/hiring-organizations"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-[var(--accent-primary)] hover:underline"
            >
              <span>Unlock Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BENTO CARD 3 (4 Cols): Salary Counter-Math Simulator         */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--border-hover)] transition-all">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-[var(--radius-md)] bg-[var(--accent-light)] text-[var(--accent-primary)]">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  Tech Offer & Counter-Math Simulator
                </h4>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Tactics from Chapter 22: Salary Negotiation Frameworks
                </p>
              </div>
            </div>

            {/* Interactive Slider Inputs */}
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <div className="flex justify-between font-mono text-[11px] text-[var(--text-muted)] mb-1">
                  <span>Current CTC: ₹{currentLPA} LPA</span>
                  <span>Initial Offer: ₹{offerLPA} LPA (+{hikePercent}%)</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={60}
                  value={offerLPA}
                  onChange={(e) => setOfferLPA(Number(e.target.value))}
                  className="w-full accent-[var(--accent-primary)] cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Recommended Counter-Target:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    ₹{counterTarget} LPA (+15% counter)
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] pt-1.5">
                  <strong>Playbook Leverage Tip:</strong> Never counter on percentage alone. Counter with a specific 3-component bracket (Base + Joining Bonus + Year 1 RSUs) with the sniper script from Chapter 22.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)] font-mono">
              Gain: +₹{gainLPA} LPA
            </span>
            <Link
              href="/products/the-job-search-book"
              className="text-[var(--accent-primary)] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Read Chapter 22 Script</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BENTO CARD 4 (7 Cols): The In-Browser Digital Reading Engine */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 rounded-[var(--radius-xl)] bg-[var(--surface-card)] border border-[var(--border-subtle)] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--border-hover)] transition-all">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-[var(--radius-md)] bg-[var(--accent-light)] text-[var(--accent-primary)]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)]">
                    Interactive In-Browser Reader Engine
                  </h4>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    No clunky PDF readers. Experience reading in code.
                  </p>
                </div>
              </div>

              {/* Quick Reader Mode Switcher */}
              <div className="flex items-center space-x-1 p-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono">
                <button
                  onClick={() => setReaderTheme("dark")}
                  className={`px-2 py-0.5 rounded-[var(--radius-sm)] cursor-pointer ${
                    readerTheme === "dark"
                      ? "bg-[var(--accent-primary)] text-white font-semibold"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  OLED Dark
                </button>
                <button
                  onClick={() => setReaderTheme("paper")}
                  className={`px-2 py-0.5 rounded-[var(--radius-sm)] cursor-pointer ${
                    readerTheme === "paper"
                      ? "bg-[var(--accent-primary)] text-white font-semibold"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  Paper
                </button>
              </div>
            </div>

            {/* Reader Simulation Canvas */}
            <div
              className={`p-4 sm:p-5 rounded-[var(--radius-md)] border text-xs leading-relaxed transition-all ${
                readerTheme === "dark"
                  ? "bg-[#0E0E12] text-[#E4E4E7] border-[#27272A]"
                  : "bg-[#FAFAF9] text-[#18181B] border-[#E4E4E7]"
              }`}
            >
              <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold block mb-1">
                CHAPTER 01 · REAL-WORLD AUDIT
              </span>
              <p className="opacity-90 mb-3">
                &ldquo;Engineering recruiters spend 7.4 seconds scanning your profile before deciding on screening calls. We reverse-engineered the exact keywords and parsing algorithms used across India and global remote pipelines.&rdquo;
              </p>

              {/* Interactive Checkpoint */}
              <div className="pt-2 border-t border-current/15 space-y-1.5">
                <span className="text-[11px] font-semibold text-[var(--accent-primary)] block">
                  Interactive Checkpoint: What wins phone screens?
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setReaderQuiz(0)}
                    className={`px-2.5 py-1 rounded-[var(--radius-sm)] border text-[11px] cursor-pointer ${
                      readerQuiz === 0
                        ? "bg-red-500/20 border-red-500 text-red-500"
                        : "border-current/15 hover:border-current/30"
                    }`}
                  >
                    Skills matrix lists
                  </button>
                  <button
                    onClick={() => setReaderQuiz(1)}
                    className={`px-2.5 py-1 rounded-[var(--radius-sm)] border text-[11px] cursor-pointer ${
                      readerQuiz === 1
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-500 font-bold"
                        : "border-current/15 hover:border-current/30"
                    }`}
                  >
                    ✓ Quantifiable ACR proof (Top 35%)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)] font-mono">
              Auto-saves progress on all your devices
            </span>

            {onOpenPreview && (
              <button
                type="button"
                onClick={() => onOpenPreview("the-job-search-book")}
                className="text-[var(--accent-primary)] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Preview Reader Experience</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
