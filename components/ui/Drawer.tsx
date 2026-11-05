"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "left" | "bottom";
  children: React.ReactNode;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  side = "right",
  children,
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideStyles = {
    right: "inset-y-0 right-0 w-full max-w-md border-l animate-in slide-in-from-right",
    left: "inset-y-0 left-0 w-full max-w-md border-r animate-in slide-in-from-left",
    bottom: "inset-x-0 bottom-0 max-h-[85vh] border-t rounded-t-[var(--radius-xl)] animate-in slide-in-from-bottom",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed bg-white/95 dark:bg-[#0e0e14]/95 backdrop-blur-2xl border-black/[0.08] dark:border-white/10 shadow-2xl flex flex-col z-10",
          sideStyles[side]
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] dark:border-white/10">
          {title ? (
            <h3 className="font-semibold text-zinc-950 dark:text-white text-base font-display">{title}</h3>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
