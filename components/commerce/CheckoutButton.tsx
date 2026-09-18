"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Lock, AlertCircle } from "lucide-react";
import { formatINR } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface CheckoutButtonProps {
  productSlug: string;
  priceINR: number;
  couponCode?: string;
  className?: string;
  buttonText?: string;
  showTrustBadge?: boolean;
}

export function CheckoutButton({
  productSlug,
  priceINR,
  couponCode,
  className,
  buttonText,
  showTrustBadge = true,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined") return resolve(false);
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create order on server
      const res = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, couponCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/auth/login?next=/products/${productSlug}`);
          return;
        }
        throw new Error(data.error || "Unable to initiate checkout.");
      }

      // 2. Handle 100% discount / ₹0 Free Orders directly
      if (data.freeOrder) {
        router.push(data.redirectUrl || `/library/${productSlug}`);
        router.refresh();
        return;
      }

      // 3. Load Razorpay Checkout Script
      const scriptLoaded = await loadRazorpayScript();

      // In local development with mock order credentials, allow dev testing simulation
      const isDev = process.env.NODE_ENV !== "production";
      if (isDev && data.razorpayOrderId?.startsWith("order_mock_")) {
        const verifyRes = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpayOrderId: data.razorpayOrderId,
            razorpayPaymentId: `pay_mock_${Date.now()}`,
            razorpaySignature: "mock_dev_signature",
            productSlug,
            internalOrderId: data.internalOrderId,
          }),
        });

        if (verifyRes.ok) {
          router.push(`/library/${productSlug}`);
          router.refresh();
          return;
        } else {
          const verifyErr = await verifyRes.json();
          throw new Error(verifyErr.error || "Development mock verification failed.");
        }
      }

      if (!scriptLoaded) {
        throw new Error(
          "Unable to load secure checkout gateway. Please disable ad-blockers or shields and try again."
        );
      }

      // 4. Open Razorpay Checkout Modal
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "SoWeBuild Store",
        description: data.productName,
        order_id: data.razorpayOrderId,
        prefill: {
          name: data.userName,
          email: data.userEmail,
        },
        theme: {
          color: "#6D5DF5",
        },
        handler: async function (response: any) {
          try {
            setIsLoading(true);
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                productSlug,
                internalOrderId: data.internalOrderId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              setError(verifyData.error || "Payment verification failed. Please contact support.");
              return;
            }

            router.push(`/library/${productSlug}`);
            router.refresh();
          } catch (vErr) {
            setError((vErr as Error).message || "Payment confirmation error.");
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      setError((err as Error).message || "Checkout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <div className="p-2.5 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-xs text-[var(--status-error)] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        onClick={handleCheckout}
        isLoading={isLoading}
        size="lg"
        className={className || "w-full text-base font-semibold"}
      >
        <Lock className="w-4 h-4 mr-1.5 opacity-80" />
        <span>{buttonText || `Get Lifetime Access • ${formatINR(priceINR)}`}</span>
        <ArrowRight className="w-4 h-4 ml-1.5" />
      </Button>

      {showTrustBadge && (
        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[var(--text-muted)] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted Razorpay Checkout • Instant Access</span>
        </div>
      )}
    </div>
  );
}
