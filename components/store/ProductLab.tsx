"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Building2,
  Zap,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Eye,
  Search,
  ExternalLink,
  RotateCcw,
  Sliders,
  Flame,
  Check,
  X,
  Code2,
  Send,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

interface CompanyItem {
  id: string;
  name: string;
  category: "remote" | "india";
  location: string;
  format: string;
  rounds: string[];
  takeHome: string;
  url: string;
}

const SAMPLE_COMPANIES: CompanyItem[] = [
  {
    id: "basecamp",
    name: "Basecamp (37signals)",
    category: "remote",
    location: "Worldwide Remote",
    format: "Pragmatic System Discussion",
    rounds: [
      "1. Written application review & portfolio deep-dive",
      "2. 45-minute architectural discussion on past systems",
      "3. Real-world scenario walkthrough (No algorithmic whiteboard)",
    ],
    takeHome: "Paid trial / project discussion on real code",
    url: "https://basecamp.com/about/jobs",
  },
  {
    id: "automattic",
    name: "Automattic (WordPress.com)",
    category: "remote",
    location: "Worldwide Remote",
    format: "Paid Asynchronous Trial",
    rounds: [
      "1. Slack-based async written interview",
      "2. Short practical take-home coding exercise",
      "3. 2–3 week part-time paid contract trial on production codebase",
    ],
    takeHome: "100% paid trial before full-time offer",
    url: "https://automattic.com/work-with-us/",
  },
  {
    id: "acko",
    name: "Acko",
    category: "india",
    location: "Mumbai / Bengaluru (India)",
    format: "Take-Home & Pair Architecture",
    rounds: [
      "1. Recruiter intro & background alignment",
      "2. Practical take-home service design challenge",
      "3. Interactive pair-programming & tradeoff discussion",
    ],
    takeHome: "Realistic microservice assignment with test suite",
    url: "https://www.acko.com/careers",
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "remote",
    location: "San Francisco / Remote",
    format: "Domain Problem Solving",
    rounds: [
      "1. Technical screen on real-world system debugging",
      "2. Take-home domain simulation (Airtable-like UI state)",
      "3. Onsite team collaboration & code architecture review",
    ],
    takeHome: "UI state & database sync modeling project",
    url: "https://airtable.com/careers",
  },
];

const ACR_TEMPLATES = {
  backend: {
    role: "Backend Engineer",
    before: "Worked on optimizing database queries and backend APIs with Node.js and Postgres.",
    critique: "Generic and passive. Zero quantifiable outcome, no scale indicator, and fails ATS search filters.",
    after: "Redesigned Postgres indexing and implemented Redis write-through caching, cutting P99 API response latency from 420ms to 85ms across 1.4M daily requests.",
    breakdown: {
      action: "Redesigned indexing & implemented write-through caching",
      context: "Postgres database with 1.4M daily request traffic",
      result: "79.7% latency reduction (420ms → 85ms P99)",
    },
  },
  frontend: {
    role: "Frontend / React Engineer",
    before: "Built new web app pages and improved performance using Next.js and Tailwind CSS.",
    critique: "Vague and uninspiring. Doesn't demonstrate core web vitals impact or user conversion lift.",
    after: "Architected dynamic route streaming and optimized client bundle splitting, slashing Largest Contentful Paint (LCP) from 3.8s to 1.1s and improving checkout conversion by 14%.",
    breakdown: {
      action: "Architected route streaming & code-splitting pipelines",
      context: "Core e-commerce checkout funnels",
      result: "LCP reduced to 1.1s (-71%), checkout conversion +14%",
    },
  },
  devops: {
    role: "DevOps / Cloud Engineer",
    before: "Managed Kubernetes clusters, CI/CD pipelines, and reduced AWS cloud infrastructure costs.",
    critique: "Reads like a job description rather than proof of high-impact engineering accomplishments.",
    after: "Automated multi-stage Docker caching and migrated 60+ microservices to Karpenter spot instances, shaving CI test cycle times by 48% and reducing monthly AWS compute spend by ₹3.8L ($4,600).",
    breakdown: {
      action: "Automated Docker caching & migrated to Karpenter spot nodes",
      context: "60+ microservice Kubernetes production cluster",
      result: "CI cycle cut by 48%, ₹3.8L monthly cloud cost savings",
    },
  },
};

export function ProductLab() {
  const [activeTab, setActiveTab] = useState<"reader" | "directory" | "transformer">("reader");

  // --- 1. Reader Interactive State ---
  const [readerTheme, setReaderTheme] = useState<"dark" | "paper" | "sepia">("dark");
  const [readerFontSize, setReaderFontSize] = useState<number>(15);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  // --- 2. Directory Interactive State ---
  const [dirCategory, setDirCategory] = useState<"all" | "remote" | "india">("all");
  const [dirSearch, setDirSearch] = useState<string>("");
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem>(SAMPLE_COMPANIES[0]);

  const filteredCompanies = useMemo(() => {
    return SAMPLE_COMPANIES.filter((c) => {
      const matchCat = dirCategory === "all" || c.category === dirCategory;
      const matchSearch =
        !dirSearch ||
        c.name.toLowerCase().includes(dirSearch.toLowerCase()) ||
        c.format.toLowerCase().includes(dirSearch.toLowerCase()) ||
        c.location.toLowerCase().includes(dirSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dirCategory, dirSearch]);

  // --- 3. ACR Transformer State ---
  const [acrRole, setAcrRole] = useState<"backend" | "frontend" | "devops">("backend");
  const [customDraft, setCustomDraft] = useState("");
  const [customAnalyzed, setCustomAnalyzed] = useState(false);

  return (
    <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6">
      {/* Glow aura backdrop */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-[var(--accent-primary)]/25 via-[var(--accent-secondary)]/15 to-[var(--accent-primary)]/20 rounded-[var(--radius-2xl)] blur-xl opacity-75 pointer-events-none transition-all duration-500" />

      {/* Main Console Frame */}
      <div className="relative rounded-[var(--radius-xl)] bg-[var(--surface-card)]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Lab Navigation Bar */}
        <div className="border-b border-white/10 bg-[var(--surface-elevated)]/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Window dots and breadcrumb */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-[1px] bg-[var(--border-subtle)]" />
            <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
              <span className="text-[var(--accent-primary)] font-semibold">SoWeBuild Lab</span>
              <span>/</span>
              <span className="hidden sm:inline">live-experience</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Interactive Sandbox
              </span>
            </div>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex items-center space-x-1 p-1 rounded-[var(--radius-md)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setActiveTab("reader")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all cursor-pointer ${
                activeTab === "reader"
                  ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] shadow-xs font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Reader</span>
            </button>

            <button
              onClick={() => setActiveTab("directory")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all cursor-pointer ${
                activeTab === "directory"
                  ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] shadow-xs font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Live Company Directory</span>
            </button>

            <button
              onClick={() => setActiveTab("transformer")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all cursor-pointer ${
                activeTab === "transformer"
                  ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] shadow-xs font-semibold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>ACR Resume Engine</span>
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-4 sm:p-8 min-h-[480px]">
          {/* ============================================================ */}
          {/* TAB 1: INTERACTIVE READER SIMULATOR                          */}
          {/* ============================================================ */}
          {activeTab === "reader" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Reader Toolbar Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                    The Job Search Book
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">•</span>
                  <span className="text-xs text-[var(--text-muted)]">Chapter 01 (Interactive Teaser)</span>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  {/* Theme Switcher */}
                  <div className="flex items-center space-x-1 p-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                    <button
                      onClick={() => setReaderTheme("dark")}
                      className={`px-2 py-1 rounded-[var(--radius-sm)] font-mono text-[11px] transition-colors cursor-pointer ${
                        readerTheme === "dark"
                          ? "bg-[var(--accent-primary)] text-white font-semibold"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setReaderTheme("paper")}
                      className={`px-2 py-1 rounded-[var(--radius-sm)] font-mono text-[11px] transition-colors cursor-pointer ${
                        readerTheme === "paper"
                          ? "bg-[var(--accent-primary)] text-white font-semibold"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      Paper
                    </button>
                    <button
                      onClick={() => setReaderTheme("sepia")}
                      className={`px-2 py-1 rounded-[var(--radius-sm)] font-mono text-[11px] transition-colors cursor-pointer ${
                        readerTheme === "sepia"
                          ? "bg-[var(--accent-primary)] text-white font-semibold"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      Sepia
                    </button>
                  </div>

                  {/* Font Size Adjusters */}
                  <div className="flex items-center space-x-1 p-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] border border-[var(--border-subtle)]">
                    <button
                      onClick={() => setReaderFontSize((prev) => Math.max(13, prev - 1))}
                      className="px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      title="Decrease font size"
                    >
                      A-
                    </button>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] px-1">
                      {readerFontSize}px
                    </span>
                    <button
                      onClick={() => setReaderFontSize((prev) => Math.min(18, prev + 1))}
                      className="px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                      title="Increase font size"
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>

              {/* Simulated Reading Canvas */}
              <div
                className={`p-6 sm:p-8 rounded-[var(--radius-lg)] border transition-all duration-300 shadow-inner ${
                  readerTheme === "dark"
                    ? "bg-[#0E0E12] text-[#E4E4E7] border-[#27272A]"
                    : readerTheme === "paper"
                    ? "bg-[#FAFAF9] text-[#18181B] border-[#E4E4E7]"
                    : "bg-[#F5EFEB] text-[#2F2417] border-[#E3D9CD]"
                }`}
                style={{ fontSize: `${readerFontSize}px`, lineHeight: "1.75" }}
              >
                <div className="max-w-3xl mx-auto space-y-5">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] text-[11px] font-mono font-medium">
                    <span>SECTION 1.2 · THE 8-SECOND RECRUITER GAZE</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                    Recruiters do not read your resume. They execute an algorithmic search, then scan in an F-pattern.
                  </h3>

                  <p className="opacity-90">
                    When senior engineering recruiters review a stack of 400 applications on LinkedIn Recruiter or Naukri Resdex, they spend an average of{" "}
                    <strong className="underline decoration-[var(--accent-primary)] underline-offset-4 font-semibold">
                      7.4 seconds
                    </strong>{" "}
                    before deciding whether to advance to phone screening. The top 35% of your page determines 100% of your interview calls.
                  </p>

                  <div className="p-4 rounded-[var(--radius-md)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-xs sm:text-sm my-4">
                    <span className="font-semibold text-[var(--accent-primary)] block mb-1">
                      💡 Practical Rule from Chapter 01:
                    </span>
                    Never lead with generic summary statements or unproven skill pills. Frontload quantifiable ACR bullets (Action, Context, Result) directly beneath your title.
                  </div>

                  {/* Interactive Knowledge Check Widget */}
                  <div className="mt-6 pt-5 border-t border-current/15 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4" />
                      <span>Live Reader Knowledge Check</span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium">
                      Where should your strongest engineering accomplishments and metrics sit on your resume?
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {[
                        { id: 0, text: "At the very bottom in a Skills matrix", correct: false },
                        { id: 1, text: "In the top 35% of page 1 under recent roles", correct: true },
                        { id: 2, text: "In a dedicated 2-page appendix", correct: false },
                      ].map((opt) => {
                        const isSelected = quizAnswer === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setQuizAnswer(opt.id)}
                            className={`p-3 rounded-[var(--radius-md)] border text-left text-xs transition-all cursor-pointer ${
                              isSelected
                                ? opt.correct
                                  ? "bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold"
                                  : "bg-red-500/15 border-red-500 text-red-600 dark:text-red-400"
                                : "bg-current/5 border-current/10 hover:border-current/30"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {isSelected ? (
                                opt.correct ? (
                                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                                ) : (
                                  <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-500" />
                                )
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border border-current/40 mt-0.5 shrink-0 text-[10px] flex items-center justify-center">
                                  {opt.id + 1}
                                </span>
                              )}
                              <span>{opt.text}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswer !== null && (
                      <div
                        className={`p-3 rounded-[var(--radius-sm)] text-xs animate-in fade-in duration-200 ${
                          quizAnswer === 1
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-700 dark:text-red-300 border border-red-500/20"
                        }`}
                      >
                        {quizAnswer === 1 ? (
                          <span>
                            <strong>Correct!</strong> Recruiters view in an F-pattern. Frontloading ACR metrics ensures immediate qualification within the critical 8-second window.
                          </span>
                        ) : (
                          <span>
                            <strong>Incorrect.</strong> Recruiters rarely scroll to the bottom. If your metrics are not visible in the initial scan, you get filtered out.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)]">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Interactive Chapter 0 is unlocked free in preview drawer.</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href="/products/the-job-search-book"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>View Full 30-Chapter Edition · ₹199</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: LIVE COMPANY DIRECTORY SANDBOX                        */}
          {/* ============================================================ */}
          {activeTab === "directory" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Directory Filter Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                    No-Whiteboard Directory
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">•</span>
                  <span className="text-xs text-[var(--text-muted)]">144 Organizations Verified</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Pills */}
                  <div className="flex items-center space-x-1 p-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-xs">
                    <button
                      onClick={() => setDirCategory("all")}
                      className={`px-2.5 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                        dirCategory === "all"
                          ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-semibold shadow-xs"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      All (4 Preview)
                    </button>
                    <button
                      onClick={() => setDirCategory("remote")}
                      className={`px-2.5 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                        dirCategory === "remote"
                          ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-semibold shadow-xs"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      Remote (3)
                    </button>
                    <button
                      onClick={() => setDirCategory("india")}
                      className={`px-2.5 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                        dirCategory === "india"
                          ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] font-semibold shadow-xs"
                          : "text-[var(--text-muted)]"
                      }`}
                    >
                      India (1)
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-40 sm:w-52">
                    <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={dirSearch}
                      onChange={(e) => setDirSearch(e.target.value)}
                      placeholder="Filter company..."
                      className="w-full h-7 pl-7 pr-2.5 text-xs rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                  </div>
                </div>
              </div>

              {/* Directory Content Grid: List on Left, Detail on Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Company Cards List */}
                <div className="md:col-span-5 space-y-2.5">
                  {filteredCompanies.map((c) => {
                    const isSelected = selectedCompany.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCompany(c)}
                        className={`w-full text-left p-3.5 rounded-[var(--radius-md)] border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[var(--surface-elevated)] border-[var(--accent-primary)] shadow-sm"
                            : "bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--border-hover)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[var(--text-primary)]">
                            {c.name}
                          </h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] text-[var(--text-muted)]">
                            {c.category === "remote" ? "Worldwide Remote" : "India Tech"}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--accent-primary)] font-medium mt-1">
                          {c.format}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                          {c.location}
                        </p>
                      </button>
                    );
                  })}

                  <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-elevated)]/60 border border-dashed border-[var(--border-subtle)] text-center">
                    <p className="text-xs text-[var(--text-muted)]">
                      + 140 more verified companies in the full directory
                    </p>
                  </div>
                </div>

                {/* Company Detailed Inspector */}
                <div className="md:col-span-7 p-6 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium mb-1">
                        <span>VERIFIED HIRING PROCESS · 2026</span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        {selectedCompany.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)]">
                        {selectedCompany.location}
                      </p>
                    </div>

                    <a
                      href={selectedCompany.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-[var(--accent-primary)] hover:underline font-medium"
                    >
                      <span>Careers Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Assessment Style
                      </h5>
                      <p className="text-xs font-medium text-[var(--text-primary)] mt-0.5">
                        {selectedCompany.format}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Exact Interview Stages
                      </h5>
                      <ul className="space-y-1.5 mt-1.5 text-xs text-[var(--text-secondary)]">
                        {selectedCompany.rounds.map((round, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-1.5 shrink-0" />
                            <span>{round}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        Take-Home & Compensation Policy
                      </h5>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {selectedCompany.takeHome}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">
                      Instant lifetime access with bookmarks & notes.
                    </span>

                    <Link
                      href="/products/hiring-organizations"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Unlock All 144 · ₹99</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: ACR RESUME ENGINE (INTERACTIVE TOOL)                  */}
          {/* ============================================================ */}
          {activeTab === "transformer" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
                    The ACR Formula (Action · Context · Result)
                  </span>
                  <p className="text-xs text-[var(--text-muted)]">
                    See how generic resume bullet points are transformed into interview-winning engineering proof.
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="flex items-center space-x-1 p-0.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-xs">
                  <button
                    onClick={() => setAcrRole("backend")}
                    className={`px-3 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                      acrRole === "backend"
                        ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] font-semibold shadow-xs"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    Backend
                  </button>
                  <button
                    onClick={() => setAcrRole("frontend")}
                    className={`px-3 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                      acrRole === "frontend"
                        ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] font-semibold shadow-xs"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    Frontend
                  </button>
                  <button
                    onClick={() => setAcrRole("devops")}
                    className={`px-3 py-1 rounded-[var(--radius-sm)] font-medium transition-colors cursor-pointer ${
                      acrRole === "devops"
                        ? "bg-[var(--surface-elevated)] text-[var(--accent-primary)] font-semibold shadow-xs"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    DevOps / Cloud
                  </button>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before: Weak Bullet */}
                <div className="p-5 rounded-[var(--radius-lg)] bg-red-500/5 border border-red-500/20 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    <X className="w-4 h-4" />
                    <span>Before: 90% of Tech Resumes (Filtered Out)</span>
                  </div>

                  <p className="text-sm font-medium text-[var(--text-primary)] italic">
                    &ldquo;{ACR_TEMPLATES[acrRole].before}&rdquo;
                  </p>

                  <div className="p-3 rounded-[var(--radius-sm)] bg-red-500/10 text-xs text-red-700 dark:text-red-300">
                    <span className="font-semibold block mb-0.5">Recruiter Verdict:</span>
                    {ACR_TEMPLATES[acrRole].critique}
                  </div>
                </div>

                {/* After: High Impact ACR */}
                <div className="p-5 rounded-[var(--radius-lg)] bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>After: ACR Playbook Formula (Wins Interviews)</span>
                  </div>

                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    &ldquo;{ACR_TEMPLATES[acrRole].after}&rdquo;
                  </p>

                  <div className="space-y-1 pt-1 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300">
                      <span className="font-bold w-14">Action:</span>
                      <span>{ACR_TEMPLATES[acrRole].breakdown.action}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300">
                      <span className="font-bold w-14">Context:</span>
                      <span>{ACR_TEMPLATES[acrRole].breakdown.context}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-300">
                      <span className="font-bold w-14">Result:</span>
                      <span className="font-semibold underline">
                        {ACR_TEMPLATES[acrRole].breakdown.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Sandbox Input */}
              <div className="p-5 rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Test Your Own Project Bullet:</span>
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Instant ACR diagnostic
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customDraft}
                    onChange={(e) => {
                      setCustomDraft(e.target.value);
                      setCustomAnalyzed(false);
                    }}
                    placeholder="e.g. Created a fullstack app with React, authentication, and payment gateway..."
                    className="flex-1 h-9 px-3 text-xs rounded-[var(--radius-md)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomAnalyzed(true)}
                    className="px-4 h-9 rounded-[var(--radius-md)] bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    Evaluate
                  </button>
                </div>

                {customAnalyzed && (
                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-xs space-y-1.5 animate-in fade-in duration-150">
                    <p className="font-semibold text-[var(--accent-primary)]">
                      🎯 ACR Diagnostic for your bullet:
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      {customDraft.match(/\d+|%|\$|₹|ms|sec/i)
                        ? "Great! You have numerical metrics. In Chapter 02, verify that your metric maps directly to business latency, revenue, or user throughput."
                        : "Missing quantifiable result! Notice how there are zero numbers, scale indicators, or percentages. In Chapter 02 of The Job Search Book, you get the exact 5 formulas to calculate engineering metrics even on solo projects."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
