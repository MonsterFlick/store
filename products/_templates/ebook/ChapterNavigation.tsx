"use client";

import React from "react";
import { CheckCircle, BookOpen, Lock } from "lucide-react";
import { Chapter } from "@/lib/products/types";
import { cn } from "@/lib/utils";

export interface ChapterNavigationProps {
  chapters: Chapter[];
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  completedChapters?: string[];
  isLocked?: boolean; // For preview mode
  className?: string;
}

export function ChapterNavigation({
  chapters,
  currentChapterId,
  onSelectChapter,
  completedChapters = [],
  isLocked = false,
  className,
}: ChapterNavigationProps) {
  return (
    <nav className={cn("space-y-1", className)} aria-label="Table of Contents">
      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
        <span>Chapters</span>
        <span className="font-mono text-[10px]">{chapters.length} Total</span>
      </div>

      <div className="space-y-0.5">
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === currentChapterId;
          const isCompleted = completedChapters.includes(chapter.id);
          const canAccess = !isLocked || chapter.isFreePreview;

          return (
            <button
              key={chapter.id}
              onClick={() => {
                if (canAccess) onSelectChapter(chapter.id);
              }}
              disabled={!canAccess}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-[var(--radius-sm)] text-sm transition-all flex items-center justify-between group cursor-pointer",
                isActive
                  ? "bg-[var(--accent-light)] text-[var(--accent-primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]",
                !canAccess && "opacity-40 cursor-not-allowed hover:bg-transparent"
              )}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className="font-mono text-xs text-[var(--text-muted)] w-5 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{chapter.title}</span>
              </div>

              <div className="shrink-0 ml-2">
                {!canAccess ? (
                  <Lock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                ) : isCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                ) : isActive ? (
                  <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
