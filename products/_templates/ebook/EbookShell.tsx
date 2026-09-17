"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowLeft,
  Type,
  CheckCircle2,
} from "lucide-react";
import { StructuredBookContent, ProductDefinition } from "@/lib/products/types";
import { useLocalProgress } from "@/lib/products/progress";
import { ContentRenderer } from "./ContentRenderer";
import { ChapterNavigation } from "./ChapterNavigation";
import { ReadingProgress } from "./ReadingProgress";
import { ProtectedWatermark } from "@/components/security/ProtectedWatermark";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";

export interface EbookShellProps {
  product: ProductDefinition;
  content: StructuredBookContent;
  user?: {
    name?: string;
    email?: string;
  };
  orderId?: string;
  isFreePreview?: boolean;
}

export function EbookShell({
  product,
  content,
  user,
  orderId,
  isFreePreview = false,
}: EbookShellProps) {
  const defaultChapterId = content.chapters[0]?.id || "";
  const {
    progress,
    setChapter,
    setScroll,
    markCompleted,
    toggleBookmark,
    setFontSize,
  } = useLocalProgress(product.slug, defaultChapterId);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fontMenuOpen, setFontMenuOpen] = useState(false);

  // Active chapter
  const currentChapterId = progress.lastChapterId || defaultChapterId;
  const currentChapterIndex = content.chapters.findIndex(
    (c) => c.id === currentChapterId
  );
  const currentChapter =
    content.chapters[currentChapterIndex] || content.chapters[0];

  const prevChapter =
    currentChapterIndex > 0 ? content.chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < content.chapters.length - 1
      ? content.chapters[currentChapterIndex + 1]
      : null;

  const isCurrentCompleted = progress.completedChapters.includes(currentChapter.id);
  const isBookmarked = progress.bookmarks.some(
    (b) => b.chapterId === currentChapter.id
  );

  const handleSelectChapter = (chapterId: string) => {
    setChapter(chapterId);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text-primary)] relative">
      {/* Watermark layer if entitled */}
      {!isFreePreview && (
        <ProtectedWatermark
          userName={user?.name}
          userEmail={user?.email}
          orderId={orderId}
          licenseName={product.license.name}
        />
      )}

      {/* Top Floating App Bar */}
      <header className="sticky top-0 z-30 glass-nav border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Left: Back & Title */}
          <div className="flex items-center space-x-3">
            <Link
              href={isFreePreview ? `/products/${product.slug}` : "/library"}
              className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors"
              title={isFreePreview ? "Back to Product" : "Back to Library"}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="hidden sm:block h-4 w-px bg-[var(--border-subtle)]" />

            <div>
              <h1 className="text-sm font-semibold truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </h1>
              {isFreePreview && (
                <span className="text-[10px] uppercase font-bold text-[var(--accent-primary)] tracking-wider">
                  Free Preview Excerpt
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            {/* Font size control */}
            <div className="relative">
              <button
                onClick={() => setFontMenuOpen(!fontMenuOpen)}
                className="p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors"
                title="Adjust text size"
              >
                <Type className="w-4 h-4" />
              </button>

              {fontMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 p-2 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] shadow-lg z-50 space-y-1">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setFontSize(sz);
                        setFontMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-[var(--radius-sm)] transition-colors ${
                        progress.fontSize === sz
                          ? "bg-[var(--accent-light)] text-[var(--accent-primary)] font-medium"
                          : "hover:bg-[var(--background-secondary)] text-[var(--text-secondary)]"
                      }`}
                    >
                      {sz === "sm" ? "Small" : sz === "md" ? "Medium" : "Large"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(currentChapter.id, currentChapter.title)}
              className={`p-2 rounded-[var(--radius-sm)] transition-colors ${
                isBookmarked
                  ? "text-[var(--accent-primary)] bg-[var(--accent-light)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark this chapter"}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Table of contents button (mobile & desktop) */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-medium cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chapters</span>
            </button>

            {/* Preview CTA */}
            {isFreePreview && (
              <Link href={`/products/${product.slug}#pricing`}>
                <Button size="sm" variant="primary">
                  Unlock Full Book
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Reading progress bar */}
        <ReadingProgress
          currentChapterTitle={currentChapter.title}
          onScrollPercentageChange={setScroll}
        />
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex">
        {/* Desktop Sidebar Table of Contents */}
        <aside className="hidden lg:block w-72 shrink-0 pr-8 border-r border-[var(--border-subtle)]">
          <div className="sticky top-28 space-y-6">
            <ChapterNavigation
              chapters={content.chapters}
              currentChapterId={currentChapterId}
              onSelectChapter={handleSelectChapter}
              completedChapters={progress.completedChapters}
              isLocked={isFreePreview}
            />

            {/* Reading stats badge */}
            <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-xs space-y-2">
              <div className="text-[var(--text-muted)] flex justify-between">
                <span>Progress:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {Math.round(
                    (progress.completedChapters.length / content.chapters.length) * 100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-[var(--border-subtle)] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{
                    width: `${
                      (progress.completedChapters.length / content.chapters.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Reading Canvas */}
        <main className="flex-1 lg:pl-10 max-w-3xl mx-auto w-full pb-20">
          {/* Chapter Header */}
          <div className="mb-8 pb-6 border-b border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono mb-2">
              <span>Chapter {currentChapterIndex + 1} of {content.chapters.length}</span>
              {isCurrentCompleted && (
                <span className="text-emerald-500 flex items-center gap-1 font-sans font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {currentChapter.title}
            </h1>
            {currentChapter.description && (
              <p className="mt-2 text-base text-[var(--text-secondary)]">
                {currentChapter.description}
              </p>
            )}
          </div>

          {/* Render Chapter Sections */}
          <ContentRenderer
            blocks={currentChapter.sections}
            fontSize={progress.fontSize}
          />

          {/* Chapter Footer Navigation */}
          <div className="mt-14 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => markCompleted(currentChapter.id)}
                className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-medium border transition-colors ${
                  isCurrentCompleted
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--background-secondary)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentCompleted ? "Completed" : "Mark as Finished"}</span>
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              {prevChapter && (!isFreePreview || prevChapter.isFreePreview) ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSelectChapter(prevChapter.id)}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
              ) : (
                <div />
              )}

              {nextChapter && (!isFreePreview || nextChapter.isFreePreview) ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSelectChapter(nextChapter.id)}
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : isFreePreview ? (
                <Link href={`/products/${product.slug}#pricing`}>
                  <Button variant="primary" size="sm">
                    Unlock All Chapters →
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Drawer Table of Contents */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={product.name}
        side="right"
      >
        <ChapterNavigation
          chapters={content.chapters}
          currentChapterId={currentChapterId}
          onSelectChapter={handleSelectChapter}
          completedChapters={progress.completedChapters}
          isLocked={isFreePreview}
        />
      </Drawer>
    </div>
  );
}
