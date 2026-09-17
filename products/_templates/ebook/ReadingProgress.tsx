"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ReadingProgressProps {
  currentChapterTitle: string;
  className?: string;
  onScrollPercentageChange?: (pct: number) => void;
}

export function ReadingProgress({
  currentChapterTitle,
  className,
  onScrollPercentageChange,
}: ReadingProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / scrollHeight) * 100));
        setScrollProgress(pct);
        onScrollPercentageChange?.(pct);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollPercentageChange]);

  return (
    <div className={cn("w-full bg-[var(--background-secondary)]", className)}>
      {/* Progress line */}
      <div className="w-full h-1 bg-[var(--border-subtle)]">
        <div
          className="h-full bg-[var(--accent-primary)] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating meta label */}
      <div className="max-w-4xl mx-auto px-4 py-1.5 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
        <span className="truncate max-w-[280px] sm:max-w-md">{currentChapterTitle}</span>
        <span>{Math.round(scrollProgress)}% read</span>
      </div>
    </div>
  );
}
