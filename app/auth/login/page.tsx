"use client";

import React, { useState, useTransition, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sparkles, ArrowRight, Mail } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic_link">("password");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        router.push(next);
        router.refresh();
      }
    });
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      const origin = window.location.origin;
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (otpError) {
        setError(otpError.message);
      } else {
        setMessage("A secure magic sign-in link has been sent to your email.");
      }
    });
  };

  const handleGoogleOAuth = async () => {
    setError(null);
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-sm">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block text-xl font-bold tracking-tight mb-2">
          Om<span className="text-[var(--accent-primary)]">.</span>Store
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Welcome back
        </h2>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Access your purchased digital products and personal library
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex border border-[var(--border-subtle)] rounded-[var(--radius-md)] p-1 bg-[var(--background-secondary)] mb-6">
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-all cursor-pointer ${
            mode === "password"
              ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xs font-semibold"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMode("magic_link")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-all cursor-pointer ${
            mode === "magic_link"
              ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xs font-semibold"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Magic Link
        </button>
      </div>

      {/* Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleOAuth}
        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-card)] hover:bg-[var(--background-secondary)] text-sm font-medium text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-[var(--surface-elevated)] px-3 text-[var(--text-muted)]">
            Or with email
          </span>
        </div>
      </div>

      {/* Form Error / Success feedback */}
      {error && (
        <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-xs text-[var(--status-error)]">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-[var(--status-success)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Email Form */}
      {mode === "password" ? (
        <form onSubmit={handlePasswordLogin} className="space-y-4">
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
            placeholder="••••••••"
          />
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            isLoading={isPending}
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            hint="We'll send a one-click login link directly to your inbox."
          />
          <Button
            type="submit"
            className="w-full"
            variant="primary"
            isLoading={isPending}
          >
            <Mail className="w-4 h-4 mr-1" />
            <span>Send Magic Link</span>
          </Button>
        </form>
      )}

      {/* Footer link */}
      <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
        Don&apos;t have an account yet?{" "}
        <Link
          href={`/auth/register?next=${encodeURIComponent(next)}`}
          className="text-[var(--accent-primary)] hover:underline font-semibold"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[var(--background)]">
      <Suspense fallback={<div className="text-xs text-[var(--text-muted)]">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
