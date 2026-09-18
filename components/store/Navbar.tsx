"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  User,
  Sun,
  Moon,
  Sparkles,
  Layers,
  ArrowUp,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isDockedRef = useRef(false);
  const maxTravelRef = useRef(750);

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

    // Initialize theme state from html class
    setIsDark(document.documentElement.classList.contains("dark"));

    // Calculate maximum travel distance from top to bottom dock position
    const updateDimensions = () => {
      maxTravelRef.current = Math.max(100, window.innerHeight - 56 - 32);
      if (isDockedRef.current && headerRef.current) {
        headerRef.current.style.transform = `translate3d(0, ${maxTravelRef.current}px, 0)`;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // 60fps/120fps hardware-accelerated dock trigger: zero per-pixel main-thread thrashing
    const handleScroll = () => {
      const shouldDock = window.scrollY > 60;
      if (shouldDock !== isDockedRef.current) {
        isDockedRef.current = shouldDock;
        setIsDocked(shouldDock);
        if (headerRef.current) {
          headerRef.current.style.transform = shouldDock
            ? `translate3d(0, ${maxTravelRef.current}px, 0)`
            : "translate3d(0, 0px, 0)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    } catch (e) {}
    setIsDark(isDarkNow);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        top: 16,
        transform: "translate3d(0, 0px, 0)",
        willChange: "transform",
      }}
      aria-label="Navigation & Dock"
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center rounded-full backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-200 ease-out",
          "gap-0.5 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 max-w-[calc(100vw-16px)] sm:max-w-fit",
          isDocked
            ? "bg-white/95 dark:bg-[#111116]/95 border border-zinc-300/90 dark:border-white/20 shadow-2xl shadow-indigo-600/10 dark:shadow-black/80 ring-1 ring-zinc-900/5 dark:ring-white/10"
            : "bg-white/90 dark:bg-[#121216]/90 border border-zinc-200/90 dark:border-white/15 shadow-xl shadow-zinc-900/5 dark:shadow-black/50"
        )}
      >
        {/* ============================================================ */}
        {/* 1. BRAND LOGO / HOME / SCROLL TO TOP                         */}
        {/* ============================================================ */}
        <div className="relative group">
          <Link
            href="/"
            onClick={isDocked ? (e) => { e.preventDefault(); scrollToTop(); } : undefined}
            className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-transform duration-150 hover:scale-105 active:scale-95 text-zinc-900 dark:text-white font-bold text-xs sm:text-sm font-display tracking-tight shrink-0 cursor-pointer"
          >
            <span className="font-mono text-[var(--accent-primary)] font-bold text-xs sm:text-sm">
              &lt;/&gt;
            </span>
            <span>sowebuild</span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-[var(--accent-light)] dark:bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 hidden sm:inline-block">
              store
            </span>
          </Link>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            {isDocked ? "Scroll to Top" : "SoWeBuild Store Home"}
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-zinc-200 dark:bg-white/15 my-auto" />

        {/* ============================================================ */}
        {/* 2. FEATURED RELEASES                                         */}
        {/* ============================================================ */}
        <div className="relative group">
          <Link
            href="/#featured"
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-transform duration-150 hover:scale-105 active:scale-95 text-xs font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="hidden sm:inline">Featured</span>
          </Link>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            Featured Releases
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. STORE CATALOG                                             */}
        {/* ============================================================ */}
        <div className="relative group">
          <Link
            href="/#products"
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-transform duration-150 hover:scale-105 active:scale-95 text-xs font-medium"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="hidden sm:inline">Catalog</span>
          </Link>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            All Products Catalog
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-zinc-200 dark:bg-white/15 my-auto" />

        {/* ============================================================ */}
        {/* 4. THEME TOGGLE BUTTON (LIGHT / DARK)                        */}
        {/* ============================================================ */}
        <div className="relative group">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </div>
        </div>

        {/* Separator */}
        <div className="w-px h-4 bg-zinc-200 dark:bg-white/15 my-auto" />

        {/* ============================================================ */}
        {/* 5. MY LIBRARY                                                */}
        {/* ============================================================ */}
        <div className="relative group">
          <Link
            href="/library"
            className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-transform duration-150 hover:scale-105 active:scale-95 text-xs font-medium"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden md:inline">Library</span>
          </Link>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            My Purchased Library
          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. ACCOUNT / SIGN IN                                         */}
        {/* ============================================================ */}
        <div className="relative group">
          <Link
            href={user ? "/account" : "/auth/login"}
            className={cn(
              "flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full transition-transform duration-150 hover:scale-105 active:scale-95 text-xs font-medium",
              user
                ? "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
                : "bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] font-semibold shadow-xs"
            )}
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">
              {user ? "Account" : "Sign In"}
            </span>
          </Link>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
            {user ? "Account Profile" : "Sign In to Store"}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 7. SCROLL TO TOP BUTTON (smoothly expands when docked)       */}
        {/* ============================================================ */}
        <div
          className={cn(
            "flex items-center overflow-hidden transition-all duration-300 ease-out",
            isDocked
              ? "max-w-[70px] opacity-100 translate-x-0 ml-0.5"
              : "max-w-0 opacity-0 -translate-x-2 pointer-events-none m-0 p-0"
          )}
        >
          <div className="w-px h-4 bg-zinc-200 dark:bg-white/15 my-auto mr-1 shrink-0" />
          <div className="relative group">
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shrink-0"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-lg">
              Back to Top
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
