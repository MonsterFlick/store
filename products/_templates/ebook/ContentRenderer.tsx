"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, AlertTriangle, Lightbulb, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { ContentBlock } from "@/lib/products/types";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

export interface ContentRendererProps {
  blocks: ContentBlock[];
  fontSize?: "sm" | "md" | "lg";
  className?: string;
}

export function ContentRenderer({
  blocks,
  fontSize = "md",
  className,
}: ContentRendererProps) {
  const fontStyles = {
    sm: "text-base leading-relaxed",
    md: "text-[17px] leading-relaxed",
    lg: "text-lg leading-loose",
  };

  return (
    <div className={cn("reader-prose max-w-[720px] mx-auto", fontStyles[fontSize], className)}>
      {blocks.map((block, index) => (
        <React.Fragment key={block.id || `block-${index}`}>
          {renderBlock(block)}
        </React.Fragment>
      ))}
    </div>
  );
}

function renderBlock(block: ContentBlock) {
  switch (block.type) {
    case "heading": {
      const text = block.text || block.content || "";
      if (block.level === 1) {
        return (
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mt-10 mb-4">
            {text}
          </h1>
        );
      }
      if (block.level === 3) {
        return (
          <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] mt-8 mb-3">
            {text}
          </h3>
        );
      }
      if (block.level === 4) {
        return (
          <h4 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mt-6 mb-2">
            {text}
          </h4>
        );
      }
      return (
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text-primary)] mt-10 mb-4 border-b border-[var(--border-subtle)] pb-2">
          {text}
        </h2>
      );
    }

    case "text":
      return (
        <p className="text-[var(--text-primary)] mb-5 text-[17px] leading-[1.8]">
          {block.content || block.text}
        </p>
      );

    case "code":
      return (
        <CodeBlock
          code={block.code || block.content || ""}
          language={block.language || "typescript"}
          filename={block.filename}
        />
      );

    case "callout": {
      const variant = block.variant || "info";
      const icons = {
        info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
        tip: <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
        important: <ShieldCheck className="w-5 h-5 text-[var(--accent-primary)] shrink-0" />,
      };

      const borderColors = {
        info: "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-100",
        tip: "border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100",
        warning: "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-100",
        important: "border-[var(--accent-primary)]/30 bg-[var(--accent-light)] text-[var(--text-primary)]",
      };

      return (
        <div
          className={cn(
            "my-6 p-4 rounded-[var(--radius-md)] border flex items-start space-x-3.5",
            borderColors[variant]
          )}
        >
          {icons[variant]}
          <div className="space-y-1">
            {block.title && (
              <h5 className="font-semibold text-sm">{block.title}</h5>
            )}
            <p className="text-sm opacity-90 leading-relaxed">
              {block.content || block.text}
            </p>
          </div>
        </div>
      );
    }

    case "quote":
      return (
        <figure className="my-8 pl-5 border-l-2 border-[var(--accent-primary)] space-y-2">
          <blockquote className="italic text-lg text-[var(--text-secondary)] font-editorial leading-relaxed">
            &ldquo;{block.quote || block.content}&rdquo;
          </blockquote>
          {block.author && (
            <figcaption className="text-xs text-[var(--text-muted)] font-mono">
              — {block.author}
              {block.role ? `, ${block.role}` : ""}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure className="my-8 space-y-2">
          <div className="relative rounded-[var(--radius-md)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--background-secondary)] aspect-video">
            <Image
              src={block.src || "/placeholder-image.png"}
              alt={block.alt || "Product illustration"}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-xs text-center text-[var(--text-muted)]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quiz":
      return <InteractiveQuiz block={block} />;

    default:
      return null;
  }
}

function InteractiveQuiz({ block }: { block: ContentBlock }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const options = block.options || [];
  const correct = block.correctIndex ?? 0;

  return (
    <div className="my-8 p-5 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
          Knowledge Check
        </span>
        <span className="text-[11px] text-[var(--text-muted)]">Interactive</span>
      </div>

      <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
        {block.question}
      </h4>

      <div className="space-y-2.5 mb-4">
        {options.map((opt, idx) => {
          const isChosen = selected === idx;
          const isCorrect = idx === correct;
          let stateStyle =
            "border-[var(--border-subtle)] hover:border-[var(--border-hover)] bg-[var(--background)]";

          if (revealed) {
            if (isCorrect) {
              stateStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-medium";
            } else if (isChosen && !isCorrect) {
              stateStyle = "border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-200";
            }
          } else if (isChosen) {
            stateStyle = "border-[var(--accent-primary)] bg-[var(--accent-light)] font-medium";
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={revealed}
              onClick={() => setSelected(idx)}
              className={cn(
                "w-full text-left p-3 rounded-[var(--radius-md)] border text-sm transition-all flex items-center justify-between cursor-pointer",
                stateStyle
              )}
            >
              <span>{opt}</span>
              {revealed && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
              )}
              {revealed && isChosen && !isCorrect && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {!revealed ? (
        <button
          type="button"
          disabled={selected === null}
          onClick={() => setRevealed(true)}
          className="px-4 py-2 text-xs font-medium bg-[var(--accent-primary)] text-white rounded-[var(--radius-sm)] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Check Answer
        </button>
      ) : (
        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
          <p className="font-semibold mb-1">
            {selected === correct ? "Correct! ✨" : "Not quite right."}
          </p>
          <p>{block.explanation}</p>
        </div>
      )}
    </div>
  );
}
