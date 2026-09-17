"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ShieldCheck } from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/library";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    startTransition(async () => {
      const origin = window.location.origin;
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data.session) {
        router.push(next);
        router.refresh();
      } else {
        setMessage(
          "Registration successful! Please check your email inbox to verify your account."
        );
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-sm">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block text-xl font-bold tracking-tight mb-2">
          Om<span className="text-[var(--accent-primary)]">.</span>Store
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Create an account
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Your personal library and access key for custom digital experiences
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-xs text-[var(--status-error)]">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-[var(--status-success)] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Om Thakur"
        />
        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          hint="Minimum 8 characters"
        />

        <Button
          type="submit"
          className="w-full mt-2"
          variant="primary"
          isLoading={isPending}
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
        Already have an account?{" "}
        <Link
          href={`/auth/login?next=${encodeURIComponent(next)}`}
          className="text-[var(--accent-primary)] hover:underline font-semibold"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[var(--background)]">
      <Suspense fallback={<div className="text-xs text-[var(--text-muted)]">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
