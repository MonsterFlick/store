"use client";

import React, { useState } from "react";
import { Chapter } from "@/lib/products/types";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

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

  // If collapsed, only show Part I
  const visibleParts = isExpanded ? parts : [parts[0]];

  return (
    <div className="pt-8 border-t border-[var(--border-subtle)] space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] font-display">
            Curriculum &amp; Table of Contents
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {chapters.length} practical chapters engineered for real-world execution.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer inline-flex items-center gap-1"
        >
          <span>{isExpanded ? "Collapse Index" : `View All ${chapters.length} Chapters`}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="space-y-4">
        {visibleParts.map((part, pIdx) => (
          <div
            key={pIdx}
            className="rounded-[var(--radius-lg)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] p-4 sm:p-5 space-y-3"
          >
            <div className="border-b border-[var(--border-subtle)] pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h4 className="text-xs font-bold font-mono tracking-wider text-[var(--text-primary)] uppercase">
                {part.title}
              </h4>
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                {part.description}
              </span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)] text-xs">
              {part.chapters.map((ch, idx) => {
                const globalIdx = chapters.findIndex((c) => c.id === ch.id);
                return (
                  <div
                    key={ch.id}
                    className="py-2.5 flex items-center justify-between gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <span className="font-mono text-[11px] text-[var(--text-muted)] w-6 shrink-0">
                        {String(globalIdx).padStart(2, "0")}
                      </span>
                      <span className="font-medium truncate text-[var(--text-primary)]">
                        {ch.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {ch.isFreePreview && (
                        <button
                          type="button"
                          onClick={onOpenPreview}
                          className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 mr-0.5" />
                          <span>Free Sample</span>
                        </button>
                      )}
                      {ch.readingTime && (
                        <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                          {ch.readingTime}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full py-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] hover:border-indigo-500/40 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-center"
        >
          + Show remaining 21 chapters ({parts[1].title} &amp; {parts[2].title})
        </button>
      )}
    </div>
  );
}

