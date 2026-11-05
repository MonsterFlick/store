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
  const [isGooglePending, setIsGooglePending] = useState(false);

  const supabase = createClient();

  const handleGoogleOAuth = async () => {
    setError(null);
    setIsGooglePending(true);
    const origin = window.location.origin;
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
    } catch (err) {
      setError((err as Error).message || "Google registration error");
      setIsGooglePending(false);
    }
  };

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
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-[var(--radius-xl)] shadow-sm space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-zinc-950 dark:text-white font-bold text-lg font-display tracking-tight"
        >
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            &lt;/&gt;
          </span>
          <span>sowebuild</span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
            store
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Create an account
        </h2>
        <p className="text-xs text-[var(--text-secondary)]">
          Your personal library and access key for custom digital experiences
        </p>
      </div>

      {/* Google OAuth Button with Instant Loading Feedback */}
      <button
        type="button"
        disabled={isGooglePending}
        onClick={handleGoogleOAuth}
        className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--surface-card)] hover:bg-[var(--background-secondary)] text-sm font-medium text-[var(--text-primary)] transition-all cursor-pointer shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isGooglePending ? (
          <svg
            className="animate-spin h-4 w-4 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
        )}
        <span>{isGooglePending ? "Redirecting to Google..." : "Sign up with Google"}</span>
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border-subtle)]" />
        </div>
        <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
          <span className="bg-[var(--surface-elevated)] px-3 text-[var(--text-muted)]">
            Or with email
          </span>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-xs text-[var(--status-error)]">
          {error}
        </div>
      )}

      {message && (
        <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-[var(--status-success)] flex items-center gap-2">
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
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant="primary"
          isLoading={isPending}
        >
          <span>{isPending ? "Creating account..." : "Create Account"}</span>
          {!isPending && <ArrowRight className="w-4 h-4 ml-1" />}
        </Button>
      </form>

      {/* Footer link */}
      <p className="pt-2 text-center text-xs text-[var(--text-secondary)]">
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
