import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "accent" | "outline" | "success" | "glass";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight transition-colors";

  const variantStyles = {
    default:
      "bg-[var(--background-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
    secondary:
      "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xs",
    accent:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-semibold",
    outline:
      "bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)]",
    glass:
      "glass-pill text-zinc-700 dark:text-zinc-300 font-medium",
    success:
      "bg-emerald-500/10 text-[var(--status-success)] border border-emerald-500/20 font-medium",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}
