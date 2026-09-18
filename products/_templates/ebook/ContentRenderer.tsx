"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Info,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Receipt,
  Clock,
  Quote,
} from "lucide-react";
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
    <div className={cn("reader-prose max-w-[740px] mx-auto space-y-6", fontStyles[fontSize], className)}>
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
    case "lead-paragraph":
      return (
        <div className="my-6 text-[var(--text-primary)] leading-[1.85]">
          {block.dropCap && (
            <span className="float-left text-5xl sm:text-6xl font-serif font-bold text-[var(--accent-primary)] leading-none mr-3 mt-1 select-none">
              {block.dropCap}
            </span>
          )}
          {block.leadText && (
            <span className="font-semibold text-lg sm:text-xl text-[var(--text-primary)]">
              {block.leadText}{" "}
            </span>
          )}
          {block.text && (
            <span className="text-[17px] text-[var(--text-secondary)]">
              {block.text}
            </span>
          )}
        </div>
      );

    case "paragraph":
    case "text":
      return (
        <p className="text-[var(--text-primary)] my-4 text-[17px] leading-[1.85]">
          {block.text || block.content}
        </p>
      );

    case "heading": {
      const text = block.title || block.text || block.content || "";
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mt-10 mb-4 border-b border-[var(--border-subtle)] pb-2">
          {text}
        </h2>
      );
    }

    case "subheading":
      return (
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text-primary)] mt-8 mb-3">
          {block.title || block.text || block.content}
        </h3>
      );

    case "diagram":
      return (
        <div className="my-8 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-neutral-950 overflow-hidden shadow-md">
          {block.title && (
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-medium text-neutral-400 pl-2">
                  {block.title}
                </span>
              </div>
              <Terminal className="w-3.5 h-3.5 text-neutral-500" />
            </div>
          )}
          <pre className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-emerald-400 dark:text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
            {block.text || block.content}
          </pre>
        </div>
      );

    case "do-dont":
      return (
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Don't Card */}
          <div className="p-5 rounded-[var(--radius-md)] border border-rose-500/25 bg-rose-500/5 space-y-2.5">
            <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
              <XCircle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {block.dontTitle || "Avoid This"}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {block.dontText}
            </p>
          </div>

          {/* Do Card */}
          <div className="p-5 rounded-[var(--radius-md)] border border-emerald-500/25 bg-emerald-500/5 space-y-2.5">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {block.doTitle || "Recommended Approach"}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {block.doText}
            </p>
          </div>
        </div>
      );

    case "quote-card":
    case "quote":
      return (
        <figure className="my-8 p-6 rounded-[var(--radius-md)] border-l-4 border-[var(--accent-primary)] bg-[var(--background-secondary)] space-y-3 relative overflow-hidden">
          <Quote className="absolute right-4 top-4 w-12 h-12 text-[var(--accent-primary)]/10 select-none pointer-events-none" />
          <blockquote className="italic text-lg sm:text-xl text-[var(--text-primary)] font-serif leading-relaxed">
            &ldquo;{block.quote || block.content || block.text}&rdquo;
          </blockquote>
          {block.author && (
            <figcaption className="text-xs font-medium text-[var(--accent-primary)] flex items-center space-x-1">
              <span>—</span>
              <span>{block.author}</span>
              {block.role && <span className="text-[var(--text-muted)]">, {block.role}</span>}
            </figcaption>
          )}
        </figure>
      );

    case "checklist":
      return (
        <div className="my-8 p-5 sm:p-6 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] space-y-4">
          {block.title && (
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{block.title}</span>
            </h4>
          )}
          <ul className="space-y-2.5">
            {block.items?.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm text-[var(--text-secondary)]">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "table":
      return (
        <div className="my-8 rounded-[var(--radius-md)] border border-[var(--border-subtle)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              {block.headers && block.headers.length > 0 && (
                <thead className="bg-[var(--background-secondary)] border-b border-[var(--border-subtle)]">
                  <tr>
                    {block.headers.map((h, idx) => (
                      <th
                        key={idx}
                        className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-[var(--text-primary)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {block.rows?.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[var(--background-secondary)]/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-[var(--text-secondary)] leading-relaxed">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "script":
      return <InteractiveScriptBlock block={block} />;

    case "invoice-case-study":
      return <InvoiceCaseStudyBlock block={block} />;

    case "daily-routine":
      return (
        <div className="my-8 p-6 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] space-y-6">
          <div className="flex items-center space-x-2 border-b border-[var(--border-subtle)] pb-3">
            <Clock className="w-5 h-5 text-[var(--accent-primary)]" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Daily Action Schedule
            </h4>
          </div>
          <div className="space-y-4">
            {block.routinePhases?.map((phase, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[var(--accent-light)] text-[var(--accent-primary)] shrink-0 mt-0.5">
                  {phase.time}
                </span>
                <div className="space-y-1.5 flex-1">
                  <h5 className="text-sm font-semibold text-[var(--text-primary)]">
                    {phase.title}
                  </h5>
                  <ul className="space-y-1">
                    {phase.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="text-xs text-[var(--text-secondary)] flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "pro-tip":
    case "callout": {
      const variant = block.type === "pro-tip" ? "tip" : block.variant || "info";
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
        <div className={cn("my-6 p-4 rounded-[var(--radius-md)] border flex items-start space-x-3.5", borderColors[variant])}>
          {icons[variant]}
          <div className="space-y-1">
            {block.title && <h5 className="font-semibold text-sm">{block.title}</h5>}
            <p className="text-sm opacity-90 leading-relaxed">
              {block.text || block.content}
            </p>
          </div>
        </div>
      );
    }

    case "warning":
      return (
        <div className="my-6 p-4 rounded-[var(--radius-md)] border border-amber-500/30 bg-amber-500/5 flex items-start space-x-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="space-y-1">
            {block.title && <h5 className="font-semibold text-sm text-amber-600 dark:text-amber-400">{block.title}</h5>}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {block.text || block.content}
            </p>
          </div>
        </div>
      );

    case "resource-link":
      return (
        <div className="my-6 p-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] flex items-center justify-between">
          <div className="space-y-0.5">
            <h5 className="text-sm font-semibold text-[var(--text-primary)]">
              {block.urlLabel || block.title || "External Resource"}
            </h5>
            {block.urlDescription && (
              <p className="text-xs text-[var(--text-secondary)]">{block.urlDescription}</p>
            )}
          </div>
          {block.url && (
            <a
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>{block.buttonText || "Visit"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      );

    case "code":
      return (
        <CodeBlock
          code={block.code || block.content || ""}
          language={block.language || "typescript"}
          filename={block.filename}
        />
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

function InteractiveScriptBlock({ block }: { block: ContentBlock }) {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    const fullText = block.scriptSubject
      ? `Subject: ${block.scriptSubject}\n\n${block.scriptBody || ""}`
      : block.scriptBody || "";
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-[var(--radius-md)] border border-[var(--accent-primary)]/30 bg-[var(--surface-elevated)] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--accent-light)] border-b border-[var(--accent-primary)]/20">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
          Copy-Paste Outreach Template
        </span>
        <button
          onClick={copyText}
          className="flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Template"}</span>
        </button>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        {block.scriptSubject && (
          <div className="text-xs font-medium pb-2 border-b border-[var(--border-subtle)] text-[var(--text-primary)]">
            <span className="text-[var(--text-muted)] uppercase tracking-wider mr-2">Subject:</span>
            <span>{block.scriptSubject}</span>
          </div>
        )}
        <div className="font-mono text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line bg-[var(--background-secondary)] p-3 rounded-[var(--radius-sm)]">
          {block.scriptBody}
        </div>
      </div>
    </div>
  );
}

function InvoiceCaseStudyBlock({ block }: { block: ContentBlock }) {
  const inv = block.invoiceData;
  if (!inv) return null;

  return (
    <div className="my-8 p-5 sm:p-6 rounded-[var(--radius-md)] border border-emerald-500/30 bg-[var(--surface-elevated)] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-emerald-500" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Verified Purchase Invoice Breakdown
          </h4>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)]">{inv.invoiceDate}</span>
      </div>

      <div className="text-xs text-[var(--text-secondary)]">
        <span className="font-semibold text-[var(--text-primary)]">Vendor:</span> {inv.vendor}
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-[var(--text-primary)]">Purchased Services:</span>
        <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-0.5">
          {inv.services.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[var(--border-subtle)] text-center">
        <div className="p-2 rounded bg-[var(--background-secondary)]">
          <span className="block text-[10px] text-[var(--text-muted)] uppercase">Listed</span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">{inv.listedAmount}</span>
        </div>
        <div className="p-2 rounded bg-[var(--background-secondary)]">
          <span className="block text-[10px] text-[var(--text-muted)] uppercase">Discount</span>
          <span className="text-xs font-semibold text-rose-500">{inv.discount}</span>
        </div>
        <div className="p-2 rounded bg-[var(--background-secondary)]">
          <span className="block text-[10px] text-[var(--text-muted)] uppercase">GST (18%)</span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">{inv.gst}</span>
        </div>
        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
          <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">Total Paid</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{inv.finalPaid}</span>
        </div>
      </div>

      {inv.note && (
        <p className="text-xs italic text-[var(--text-muted)] pt-1">{inv.note}</p>
      )}
    </div>
  );
}

function InteractiveQuiz({ block }: { block: ContentBlock }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const options = block.options || [];
  const correct = block.correctIndex ?? 0;

  return (
    <div className="my-8 p-6 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] shadow-sm space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
          Knowledge Check
        </span>
      </div>

      <h4 className="text-base font-semibold text-[var(--text-primary)]">
        {block.question}
      </h4>

      <div className="space-y-2 pt-2">
        {options.map((option, index) => {
          let btnStyle = "border-[var(--border-subtle)] hover:bg-[var(--background-secondary)] text-[var(--text-secondary)]";

          if (selected === index) {
            btnStyle = "border-[var(--accent-primary)] bg-[var(--accent-light)] text-[var(--text-primary)] font-medium";
          }

          if (revealed) {
            if (index === correct) {
              btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100 font-medium";
            } else if (selected === index) {
              btnStyle = "border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-100";
            } else {
              btnStyle = "opacity-50 border-[var(--border-subtle)] text-[var(--text-muted)]";
            }
          }

          return (
            <button
              key={index}
              onClick={() => {
                if (!revealed) setSelected(index);
              }}
              disabled={revealed}
              className={cn("w-full text-left p-3.5 rounded-[var(--radius-sm)] border text-sm transition-all flex items-center justify-between cursor-pointer", btnStyle)}
            >
              <span>{option}</span>
              {revealed && index === correct && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
              )}
              {revealed && selected === index && index !== correct && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Check Answer
        </button>
      )}

      {revealed && block.explanation && (
        <div className="mt-4 p-3.5 rounded-[var(--radius-sm)] bg-[var(--background-secondary)] text-xs text-[var(--text-secondary)] leading-relaxed border border-[var(--border-subtle)]">
          <span className="font-semibold text-[var(--text-primary)]">Explanation: </span>
          {block.explanation}
        </div>
      )}
    </div>
  );
}