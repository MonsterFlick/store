import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";

export async function generateStaticParams() {
  return [
    { policy: "terms" },
    { policy: "privacy" },
    { policy: "refunds" },
  ];
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ policy: string }>;
}) {
  const { policy } = await params;

  const policies: Record<string, { title: string; content: React.ReactNode }> = {
    terms: {
      title: "Terms & Conditions of Service",
      content: (
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            Welcome to Om Store. By purchasing, browsing, or accessing any digital products, software code, interactive guides, or educational materials through this platform, you agree to be bound by these Terms.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            1. Digital Product Delivery & Access
          </h3>
          <p>
            Products purchased on Om Store are provided as hosted, interactive digital experiences, not simple file downloads unless expressly marked. Each user account is granted access to their purchased items subject to our two-device concurrent access limit.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            2. Intellectual Property & Watermarking
          </h3>
          <p>
            All structured text, code architectures, interactive exercises, and assets remain the exclusive intellectual property of the respective authors. Paid content is dynamically watermarked with your purchaser identity. Unauthorized distribution, resale, or scraping is strictly prohibited.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            At Om Store, we believe in minimal, purposeful data collection. We collect only what is necessary to authenticate your identity, process secure transactions, and enforce access limits.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            1. What Data We Collect
          </h3>
          <p>
            - Account identity (Email, Name) via Supabase Auth.<br />
            - Transaction IDs and payment verification tokens through Razorpay.<br />
            - Session device identifiers (OS and browser name) to maintain the 2-device limit.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            2. Local Reading Progress
          </h3>
          <p>
            Your reading positions, bookmarks, notes, and completion states are stored locally on your device (using localStorage) and are never uploaded or tracked on our backend servers.
          </p>
        </div>
      ),
    },
    refunds: {
      title: "Refund Policy",
      content: (
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="p-4 rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 font-medium mb-6">
            Notice: All purchases on Om Store are non-refundable once digital entitlement is granted, subject to any statutory consumer rights that cannot legally be excluded.
          </div>
          <p>
            Because our digital products provide immediate, irrevocable access to custom-coded experiences, proprietary runtime research, and structured content upon payment confirmation, <strong>all purchases are strictly non-refundable</strong>.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            Free Preview Before Purchase
          </h3>
          <p>
            To ensure complete satisfaction before committing to a purchase, we provide free interactive chapter excerpts and previews for every product on the platform. We strongly encourage exploring the sample preview before completing your purchase.
          </p>
          <p className="mt-4">
            If you encounter any technical error or access restriction after payment, please contact our support team at{" "}
            <a href="mailto:support@om.store" className="text-[var(--accent-primary)] underline font-mono">
              support@om.store
            </a>
            , and our engineering team will resolve your access immediately.
          </p>
        </div>
      ),
    },
  };

  const currentPolicy = policies[policy];
  if (!currentPolicy) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex-1">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-8">
          {currentPolicy.title}
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          {currentPolicy.content}
        </div>
      </main>

      <Footer />
    </div>
  );
}
