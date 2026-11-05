import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
  badgeText?: string;
  href?: string;
}

export function BrandLogo({
  className,
  size = "md",
  showBadge = true,
  badgeText = "Store",
  href = "/",
}: BrandLogoProps) {
  const iconSizes = {
    sm: "w-5 h-7",
    md: "w-6 h-8",
    lg: "w-8 h-10",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const badgeSizes = {
    sm: "text-[9px] px-1.5 py-0.5",
    md: "text-[10px] px-2 py-0.5",
    lg: "text-xs px-2.5 py-1",
  };

  const content = (
    <div className={cn("inline-flex items-center space-x-2.5 font-display tracking-tight group", className)}>
      {/* Official 56° Slash Glyph */}
      <div className={cn("relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105")}>
        <svg
          viewBox="0 0 40 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(iconSizes[size], "filter drop-shadow-[0_0_8px_rgba(124,58,237,0.35)]")}
        >
          <polygon points="26,2 38,2 14,58 2,58" fill="url(#swbVioletGlow)" />
          <defs>
            <linearGradient id="swbVioletGlow" x1="2" y1="2" x2="38" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark & Pill */}
      <div className="flex items-center space-x-1.5">
        <span className={cn("font-bold text-zinc-950 dark:text-white tracking-tight", textSizes[size])}>
          sowebuild
        </span>
        {showBadge && (
          <span
            className={cn(
              "font-mono font-semibold rounded-full bg-zinc-100 dark:bg-white/[0.08] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 uppercase tracking-widest",
              badgeSizes[size]
            )}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-95 transition-opacity cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
}
