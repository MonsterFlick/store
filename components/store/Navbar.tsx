"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, User, Search, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Engineering", href: "/?category=engineering#products" },
    { label: "Web Dev", href: "/?category=web-development#products" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-lg font-bold tracking-tight text-[var(--text-primary)] group"
          >
            <span className="font-mono text-[var(--accent-primary)] font-bold">&lt;/&gt;</span>
            <span>Om Store</span>
            <span className="text-[var(--accent-primary)] text-xs font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--accent-light)] border border-[var(--accent-primary)]/20">
              Studio
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-[var(--radius-sm)] transition-colors",
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--background-secondary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, Library, Account/Login */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/library"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--background-secondary)] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline">My Library</span>
          </Link>

          {user ? (
            <Link
              href="/account"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--background-secondary)] text-xs font-medium text-[var(--text-primary)] transition-all shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span className="hidden sm:inline">Account</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] text-xs font-semibold transition-all shadow-xs"
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
