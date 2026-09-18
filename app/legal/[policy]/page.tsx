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
            Welcome to SoWeBuild Store (store.sowebuild.in). By purchasing, browsing, or accessing any digital products, software code, interactive guides, playbooks, or educational materials through this storefront, you agree to be bound by these Terms.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            1. Digital Product Delivery & Access
          </h3>
          <p>
            Products purchased on SoWeBuild Store are provided as digital products, interactive guides, playbooks, tools, or downloadable resources. Each customer account is granted a personal, single-user license to access purchased items in their account library.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            2. Intellectual Property & Fair Use
          </h3>
          <p>
            All structured text, curated playbooks, interactive applications, code snippets, and design assets remain the exclusive intellectual property of SoWeBuild Store and respective creators. Unauthorized redistribution, resale, scraping, or mass unauthorized sharing is strictly prohibited.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            3. Account Responsibility
          </h3>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials. Access entitlements are linked directly to your authenticated email address.
          </p>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            At SoWeBuild Store, we prioritize minimal, purposeful data collection. We collect only what is necessary to authenticate your identity, securely process your orders, and deliver purchased digital goods.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            1. Information We Collect
          </h3>
          <p>
            - Account identity (Email, Name) via authenticated login.<br />
            - Transaction identifiers and payment confirmation status through Razorpay (we never store your raw credit card numbers or UPI PINs).<br />
            - Basic device and browser telemetry necessary for secure session authentication.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            2. Client-Side Reading State
          </h3>
          <p>
            Personal reading progress, bookmarks, notes, and local UI preferences are saved locally on your browser using secure client-side storage to protect your privacy.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            3. Contact & Inquiries
          </h3>
          <p>
            If you have questions about your personal data or wish to request data deletion, contact us directly at{" "}
            <a href="mailto:sowebuild.in@gmail.com" className="text-[var(--accent-primary)] underline font-mono">
              sowebuild.in@gmail.com
            </a>.
          </p>
        </div>
      ),
    },
    refunds: {
      title: "Refund Policy",
      content: (
        <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="p-4 rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 font-medium mb-6">
            Notice: All purchases on SoWeBuild Store are non-refundable once digital access or entitlement is granted, subject to any statutory consumer rights that cannot legally be excluded.
          </div>
          <p>
            Because digital products provide immediate, irrevocable access to curated knowledge, proprietary playbooks, interactive experiences, and downloadable resources upon payment confirmation, <strong>all purchases are strictly non-refundable</strong>.
          </p>
          <h3 className="text-base font-semibold text-[var(--text-primary)] mt-6">
            Free Preview Before Purchase
          </h3>
          <p>
            To ensure complete confidence before committing to a purchase, we provide free interactive chapter excerpts and sample previews for products across our store. We strongly encourage exploring sample previews prior to checkout.
          </p>
          <p className="mt-4">
            If you encounter any technical difficulty or billing discrepancy after completing a transaction, please contact our support team at{" "}
            <a href="mailto:sowebuild.in@gmail.com" className="text-[var(--accent-primary)] underline font-mono">
              sowebuild.in@gmail.com
            </a>
            , and we will resolve your access promptly.
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
