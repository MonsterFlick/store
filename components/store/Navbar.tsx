"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  User,
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
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

    // Theme initialization
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled
          ? "bg-white/85 dark:bg-[#0a0a0e]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-zinc-950 dark:text-white font-bold text-base font-display tracking-tight hover:opacity-90 transition-opacity"
        >
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            &lt;/&gt;
          </span>
          <span>sowebuild</span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
            store
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 font-sans text-xs font-medium">
          <Link
            href="/#catalog"
            className="px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            All Products
          </Link>
          <Link
            href="/#lab"
            className="px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            Interactive Preview
          </Link>
          <Link
            href="/#flagships"
            className="px-3 py-1.5 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            Featured Publications
          </Link>
        </nav>

        {/* Right Actions: Theme Toggle, Library, Account */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          {/* Library Link */}
          <Link
            href="/library"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">My Library</span>
          </Link>

          {/* Account / Sign In Button */}
          <Link
            href={user ? "/account" : "/auth/login"}
            className={cn(
              "flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors",
              user
                ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20"
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs shadow-indigo-600/20"
            )}
          >
            <User className="w-3.5 h-3.5" />
            <span>{user ? "Account" : "Sign In"}</span>
          </Link>

        </div>

      </div>
    </header>
  );
}
