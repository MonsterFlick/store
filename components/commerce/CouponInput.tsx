"use client";

import React, { useState } from "react";
import { Tag, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CouponInputProps {
  onApplyCoupon: (code: string, discountINR: number) => void;
  onRemoveCoupon: () => void;
  subtotalINR: number;
}

export function CouponInput({
  onApplyCoupon,
  onRemoveCoupon,
  subtotalINR,
}: CouponInputProps) {
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountINR, setDiscountINR] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setIsLoading(true);
    setError(null);

    // Common coupon codes check or server test
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "LAUNCH20") {
      const discount = Math.round((subtotalINR * 20) / 100);
      setDiscountINR(discount);
      setAppliedCode(cleanCode);
      onApplyCoupon(cleanCode, discount);
      setError(null);
    } else if (cleanCode === "FLAT200") {
      const discount = Math.min(subtotalINR, 200);
      setDiscountINR(discount);
      setAppliedCode(cleanCode);
      onApplyCoupon(cleanCode, discount);
      setError(null);
    } else {
      setError("Invalid or expired coupon code.");
    }
    setIsLoading(false);
  };

  const handleRemove = () => {
    setAppliedCode(null);
    setDiscountINR(0);
    setCode("");
    setError(null);
    onRemoveCoupon();
  };

  if (appliedCode) {
    return (
      <div className="p-2.5 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center space-x-1.5">
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-mono font-bold">{appliedCode}</span>
          <span>applied (-₹{discountINR})</span>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="space-y-1.5">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Tag className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Coupon code (e.g. LAUNCH20)"
            className="w-full h-8 pl-8 pr-2.5 text-xs font-mono rounded-[var(--radius-sm)] bg-[var(--surface-elevated)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)] uppercase placeholder:normal-case placeholder:font-sans"
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          isLoading={isLoading}
          disabled={!code.trim()}
          className="h-8 text-xs shrink-0"
        >
          Apply
        </Button>
      </div>
      {error && <p className="text-[11px] text-[var(--status-error)]">{error}</p>}
    </form>
  );
}
