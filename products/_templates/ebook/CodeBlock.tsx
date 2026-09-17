"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={cn(
        "my-6 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[#0D0D11] text-[#E4E4E7] overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141418] border-b border-[#222228] text-xs">
        <div className="flex items-center space-x-2 text-[#A1A1AA]">
          <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
          <span className="font-mono">{filename || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-[#A1A1AA] hover:text-[#FAFAF8] px-2 py-1 rounded hover:bg-[#1E1E24] transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto font-mono text-[13.5px] leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
