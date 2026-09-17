import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { loadProtectedProduct } from "@/lib/products/loader";
import { loadProductExperience } from "@/lib/products/registry";
import { DeviceManager } from "@/components/account/DeviceManager";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Smartphone, Lock, ArrowLeft, ShieldAlert } from "lucide-react";
import { formatINR } from "@/lib/utils";

export default async function ProtectedProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ dev_preview?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  // Development preview bypass for inspecting verified experiences
  if (process.env.NODE_ENV === "development" && resolvedSearchParams?.dev_preview === "1") {
    const ExperienceComponent = await loadProductExperience(slug);
    if (!ExperienceComponent) notFound();
    return (
      <ExperienceComponent
        content={undefined}
        user={{ id: "dev-purchaser", name: "Om Thakur", email: "reader@om.store" }}
        orderId="ORD-DEV-9999"
        isFreePreview={false}
      />
    );
  }

  const result = await loadProtectedProduct(slug);

  if (result.status === "not_found") {
    notFound();
  }

  if (result.status === "unauthenticated") {
    redirect(`/auth/login?next=/library/${slug}`);
  }

  // 1. Two-Device Limit Exceeded Screen
  if (result.status === "device_limit_exceeded") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <Card className="max-w-lg w-full p-6 sm:p-8 bg-[var(--surface-elevated)] space-y-6">
          <div className="flex items-center space-x-3 text-[var(--status-error)]">
            <div className="p-2.5 rounded-full bg-red-500/10 border border-red-500/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Active Device Limit Reached
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Maximum 2 devices allowed simultaneously
              </p>
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Your account is currently active on two other devices. To read{" "}
            <strong>{result.product.name}</strong> on this device, please revoke access to one of your active devices below:
          </p>

          <DeviceManager
            initialDevices={result.activeDevices}
            userId="current-user"
          />

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            <Link href="/library">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                <span>Return to Library</span>
              </Button>
            </Link>

            <a href={`/library/${slug}`}>
              <Button variant="primary" size="sm">
                <span>Refresh & Enter</span>
              </Button>
            </a>
          </div>
        </Card>
      </div>
    );
  }

  // 2. Unauthorized (User has no active entitlement for this product)
  if (result.status === "unauthorized") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
        <Card className="max-w-md w-full p-6 sm:p-8 bg-[var(--surface-elevated)] text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-[var(--background-secondary)] text-[var(--accent-primary)] flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Digital Access Required
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              You do not currently possess an active entitlement for{" "}
              <strong>{result.product.name}</strong>.
            </p>
          </div>

          <div className="pt-2">
            <Link href={`/products/${slug}`}>
              <Button variant="primary" size="md" className="w-full">
                <span>Purchase Lifetime Access · {formatINR(result.product.price)}</span>
              </Button>
            </Link>
          </div>

          <p className="text-[11px] text-[var(--text-muted)] pt-2">
            If you already purchased this product under a different email, please check your account settings.
          </p>
        </Card>
      </div>
    );
  }

  // 3. Authorized — Load custom product React experience
  const ExperienceComponent = await loadProductExperience(slug);

  if (!ExperienceComponent) {
    notFound();
  }

  return (
    <ExperienceComponent
      content={result.content}
      user={result.user}
      orderId={result.orderId}
      isFreePreview={false}
    />
  );
}
