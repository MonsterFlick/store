"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, User, Sun, Moon, Compass, Sparkles, ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    queueMicrotask(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    } catch (e) {}
    setIsDark(isDarkNow);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 pt-2.5 sm:pt-4 pointer-events-none">
      <div
        className={cn(
          "max-w-6xl mx-auto h-14 sm:h-15 px-3.5 sm:px-5 flex items-center justify-between rounded-full transition-all duration-300 pointer-events-auto",
          isScrolled
            ? "glass-floating-bar shadow-xl shadow-black/5 dark:shadow-black/30"
            : "bg-white/70 dark:bg-[#0c0c12]/70 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-xs"
        )}
      >
        {/* Brand Logo & Editorial Indicator */}
        <BrandLogo size="md" />

        {/* Center Nav Links - Glass Pill Segment */}
        <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-zinc-100/70 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs font-medium">
          <Link
            href="/#catalog"
            className="px-3.5 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>Publications</span>
          </Link>
          <Link
            href="/library"
            className="px-3.5 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>My Library</span>
          </Link>
          <a
            href="https://sowebuild.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white hover:bg-purple-500/10 dark:hover:bg-purple-500/20 transition-all flex items-center gap-1.5 group font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
            <span>Agency</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </nav>

        {/* Right Actions: Theme Toggle & Account / Library */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Theme Toggle Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-all cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Quick Agency Link (Mobile) */}
          <a
            href="https://sowebuild.in"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 transition-colors"
            title="SoWeBuild Agency (sowebuild.in)"
          >
            <Sparkles className="w-4 h-4" />
          </a>

          {/* Quick Library Link (Mobile) */}
          <Link
            href="/library"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
            title="My Library"
          >
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </Link>

          {/* Account / Sign In CTA */}
          <Link
            href={user ? "/account" : "/auth/login"}
            className={cn(
              "flex items-center space-x-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs",
              user
                ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-200 dark:border-white/10"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            <User className="w-3.5 h-3.5" />
            <span className="truncate max-w-[100px] sm:max-w-none">
              {user ? "Account" : "Sign In"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
