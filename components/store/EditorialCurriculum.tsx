"use client";

import React, { useState } from "react";
import { Chapter } from "@/lib/products/types";
import { Eye, ChevronDown, ChevronUp, BookOpen } from "lucide-react";

interface EditorialCurriculumProps {
  chapters: Chapter[];
  onOpenPreview?: () => void;
}

export function EditorialCurriculum({ chapters, onOpenPreview }: EditorialCurriculumProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group chapters into 3 editorial parts
  const parts = [
    {
      title: "Part I: Foundations & Proof",
      description: "Recruitment machinery, ATS parsing, and portfolio proof",
      chapters: chapters.slice(0, 9),
    },
    {
      title: "Part II: Channels & Outreach",
      description: "Job boards, sniper cold DMs, and inbound visibility",
      chapters: chapters.slice(9, 18),
    },
    {
      title: "Part III: Interview Execution & Negotiation",
      description: "Technical pairing, behavioral ownership, and compensation math",
      chapters: chapters.slice(18),
    },
  ];

  // If collapsed, show Part I, else show all
  const visibleParts = isExpanded ? parts : [parts[0]];

  return (
    <section className="pt-8 border-t border-black/[0.08] dark:border-white/10 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Curriculum</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
            Curriculum &amp; Table of Contents
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300">
            {chapters.length} tactical chapters engineered for real-world execution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-auto text-xs sm:text-sm font-mono font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/15 transition-all"
        >
          <span>{isExpanded ? "Collapse Index" : `Explore All ${chapters.length} Chapters`}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-5">
        {visibleParts.map((part, pIdx) => (
          <div
            key={pIdx}
            className="rounded-3xl glass-card-interactive p-6 sm:p-7 space-y-4 border border-black/[0.06] dark:border-white/[0.08]"
          >
            <div className="border-b border-black/[0.06] dark:border-white/10 pb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
              <h3 className="text-sm sm:text-base font-bold font-mono tracking-wider text-zinc-950 dark:text-white uppercase">
                {part.title}
              </h3>
              <span className="text-xs sm:text-sm text-zinc-500 font-mono">
                {part.description}
              </span>
            </div>

            <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
              {part.chapters.map((ch, idx) => {
                const globalIdx = chapters.findIndex((c) => c.id === ch.id);
                return (
                  <div
                    key={ch.id}
                    className="py-3 sm:py-3.5 flex items-center justify-between gap-3 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-start sm:items-center space-x-3.5 min-w-0">
                      <span className="font-mono text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 w-7 shrink-0 pt-0.5 sm:pt-0">
                        {String(globalIdx).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 space-y-0.5">
                        <span className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 block truncate sm:whitespace-normal">
                          {ch.title}
                        </span>
                        {ch.description && (
                          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 sm:line-clamp-2 font-sans">
                            {ch.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0 ml-2">
                      {ch.isFreePreview && (
                        <button
                          type="button"
                          onClick={onOpenPreview}
                          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold transition-colors cursor-pointer border border-purple-500/20"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Free Sample</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && chapters.length > 9 && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer"
          >
            <span>Show remaining {chapters.length - 9} chapters...</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
