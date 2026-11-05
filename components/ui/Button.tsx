"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98] whitespace-nowrap shrink-0";

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-9.5 px-4 text-xs sm:text-sm rounded-xl gap-2",
      lg: "h-11 px-5 text-sm sm:text-base rounded-xl gap-2",
    };

    const variantStyles = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:scale-[1.01] active:scale-[0.99]",
      secondary:
        "bg-[var(--background-secondary)] text-[var(--text-primary)] hover:bg-[var(--border-subtle)] border border-[var(--border-subtle)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--background-secondary)]",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]",
      glass:
        "bg-white/70 dark:bg-white/[0.08] backdrop-blur-md text-[var(--text-primary)] border border-black/[0.08] dark:border-white/15 hover:bg-white dark:hover:bg-white/[0.14] shadow-xs",
      danger:
        "bg-[var(--status-error)] text-white hover:opacity-90 shadow-sm",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
