"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProtectedWatermarkProps {
  userName?: string;
  userEmail?: string;
  orderId?: string;
  licenseName?: string;
  className?: string;
}

export function ProtectedWatermark({
  userName,
  userEmail,
  orderId,
  licenseName,
  className,
}: ProtectedWatermarkProps) {
  if (!userEmail && !orderId) return null;

  const identityText = [
    userName ? `Licensed to: ${userName}` : null,
    userEmail ? `(${userEmail})` : null,
    orderId ? `Order #${orderId.substring(0, 10)}` : null,
    licenseName ? `[${licenseName}]` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none fixed inset-0 z-40 overflow-hidden flex flex-col justify-between p-8 text-[11px] font-mono opacity-[0.035] dark:opacity-[0.055] text-current",
        className
      )}
    >
      <div className="flex justify-between">
        <span>{identityText}</span>
        <span className="hidden sm:inline">{identityText}</span>
      </div>
      <div className="flex justify-center transform -rotate-12">
        <span className="text-sm font-semibold tracking-wider">{identityText}</span>
      </div>
      <div className="flex justify-between">
        <span className="hidden sm:inline">{identityText}</span>
        <span>{identityText}</span>
      </div>
    </div>
  );
}
