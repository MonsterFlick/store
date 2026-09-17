"use client";

import { useEffect, useState, useCallback } from "react";

export interface ReadingProgress {
  lastChapterId: string;
  scrollPercentage: number;
  completedChapters: string[];
  bookmarks: Array<{
    id: string;
    chapterId: string;
    title: string;
    createdAt: string;
  }>;
  fontSize: "sm" | "md" | "lg";
  updatedAt: string;
}

const STORAGE_PREFIX = "om_store_progress_";

export function getLocalProgress(slug: string): ReadingProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${slug}`);
    if (!raw) return null;
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return null;
  }
}

export function saveLocalProgress(slug: string, progress: Partial<ReadingProgress>): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalProgress(slug) || {
      lastChapterId: "",
      scrollPercentage: 0,
      completedChapters: [],
      bookmarks: [],
      fontSize: "md",
      updatedAt: new Date().toISOString(),
    };

    const updated: ReadingProgress = {
      ...existing,
      ...progress,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(`${STORAGE_PREFIX}${slug}`, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save local progress:", err);
  }
}

/**
 * React hook to synchronize local reading progress.
 */
export function useLocalProgress(slug: string, defaultChapterId: string = "") {
  const [progress, setProgressState] = useState<ReadingProgress>(() => {
    return (
      getLocalProgress(slug) || {
        lastChapterId: defaultChapterId,
        scrollPercentage: 0,
        completedChapters: [],
        bookmarks: [],
        fontSize: "md",
        updatedAt: new Date().toISOString(),
      }
    );
  });

  useEffect(() => {
    const loaded = getLocalProgress(slug);
    if (loaded) {
      setProgressState(loaded);
    } else if (defaultChapterId) {
      saveLocalProgress(slug, { lastChapterId: defaultChapterId });
    }
  }, [slug, defaultChapterId]);

  const setChapter = useCallback(
    (chapterId: string) => {
      setProgressState((prev) => {
        const next = { ...prev, lastChapterId: chapterId, scrollPercentage: 0 };
        saveLocalProgress(slug, next);
        return next;
      });
    },
    [slug]
  );

  const setScroll = useCallback(
    (scrollPercentage: number) => {
      setProgressState((prev) => {
        const next = { ...prev, scrollPercentage: Math.round(scrollPercentage) };
        saveLocalProgress(slug, next);
        return next;
      });
    },
    [slug]
  );

  const markCompleted = useCallback(
    (chapterId: string) => {
      setProgressState((prev) => {
        if (prev.completedChapters.includes(chapterId)) return prev;
        const next = {
          ...prev,
          completedChapters: [...prev.completedChapters, chapterId],
        };
        saveLocalProgress(slug, next);
        return next;
      });
    },
    [slug]
  );

  const toggleBookmark = useCallback(
    (chapterId: string, title: string) => {
      setProgressState((prev) => {
        const exists = prev.bookmarks.some((b) => b.chapterId === chapterId);
        const nextBookmarks = exists
          ? prev.bookmarks.filter((b) => b.chapterId !== chapterId)
          : [
              ...prev.bookmarks,
              {
                id: `${chapterId}_${Date.now()}`,
                chapterId,
                title,
                createdAt: new Date().toISOString(),
              },
            ];
        const next = { ...prev, bookmarks: nextBookmarks };
        saveLocalProgress(slug, next);
        return next;
      });
    },
    [slug]
  );

  const setFontSize = useCallback(
    (size: "sm" | "md" | "lg") => {
      setProgressState((prev) => {
        const next = { ...prev, fontSize: size };
        saveLocalProgress(slug, next);
        return next;
      });
    },
    [slug]
  );

  return {
    progress,
    setChapter,
    setScroll,
    markCompleted,
    toggleBookmark,
    setFontSize,
  };
}
