import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "accent" | "outline" | "success";
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
      "bg-[var(--accent-light)] text-[var(--accent-primary)] border border-transparent font-semibold",
    outline:
      "bg-transparent text-[var(--text-muted)] border border-[var(--border-subtle)]",
    success:
      "bg-emerald-500/10 text-[var(--status-success)] border border-emerald-500/20 font-medium",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </span>
  );
}
