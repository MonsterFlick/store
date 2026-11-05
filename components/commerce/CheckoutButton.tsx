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
  const [loadingText, setLoadingText] = useState<string | null>(null);
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
    setLoadingText("Initiating checkout...");
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
          setLoadingText("Redirecting to sign in...");
          router.push(`/auth/login?next=/products/${productSlug}`);
          return;
        }
        throw new Error(data.error || "Unable to initiate checkout.");
      }

      // 2. Handle 100% discount / ₹0 Free Orders directly
      if (data.freeOrder) {
        setLoadingText("Access granted! Loading library...");
        router.push(data.redirectUrl || `/library/${productSlug}`);
        router.refresh();
        return;
      }

      // 3. Load Razorpay Checkout Script
      setLoadingText("Connecting gateway...");
      const scriptLoaded = await loadRazorpayScript();

      // In local development with mock order credentials
      const isDev = process.env.NODE_ENV !== "production";
      if (isDev && data.razorpayOrderId?.startsWith("order_mock_")) {
        setLoadingText("Simulating test payment...");
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
          setLoadingText("Success! Opening library...");
          router.push(`/library/${productSlug}`);
          router.refresh();
          return;
        } else {
          const verifyErr = await verifyRes.json();
          throw new Error(verifyErr.error || "Development verification failed.");
        }
      }

      if (!scriptLoaded) {
        throw new Error(
          "Unable to load secure checkout gateway. Please disable ad-blockers and try again."
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
          color: "#4f46e5",
        },
        handler: async function (response: any) {
          try {
            setIsLoading(true);
            setLoadingText("Verifying payment...");
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
              setIsLoading(false);
              return;
            }

            setLoadingText("Payment confirmed! Opening library...");
            router.push(`/library/${productSlug}`);
            router.refresh();
          } catch (vErr) {
            setError((vErr as Error).message || "Payment confirmation error.");
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setLoadingText(null);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      // Keep loading indicator until modal renders
      setTimeout(() => {
        setIsLoading(false);
        setLoadingText(null);
      }, 1500);
    } catch (err) {
      console.error("Checkout error:", err);
      setError((err as Error).message || "Checkout failed");
      setIsLoading(false);
      setLoadingText(null);
    }
  };

  return (
    <div className="space-y-2 w-full">
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
        className={className || "w-full text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer"}
      >
        {!isLoading && <Lock className="w-3.5 h-3.5 mr-1.5 opacity-80 shrink-0" />}
        <span className="whitespace-nowrap">
          {isLoading && loadingText
            ? loadingText
            : buttonText || `Get Access • ${formatINR(priceINR)}`}
        </span>
        {!isLoading && <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />}
      </Button>

      {showTrustBadge && (
        <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[var(--text-muted)] font-mono whitespace-nowrap pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Instant Digital Access • Secure Razorpay</span>
        </div>
      )}
    </div>
  );
}
