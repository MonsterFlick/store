"use client";

import React, { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, navigation has completed
  useEffect(() => {
    if (isLoading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept clicks on internal links to immediately start progress bar
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, hash-only anchors, target="_blank", or mailto/tel
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.getAttribute("target") === "_blank" ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Check if it's the exact same page and hash
      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(href, window.location.origin);
      if (
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search &&
        targetUrl.hash
      ) {
        return; // In-page anchor scroll
      }

      // Start the loading bar immediately
      setIsLoading(true);
      setProgress(25);

      const t1 = setTimeout(() => setProgress(65), 180);
      const t2 = setTimeout(() => setProgress(85), 450);

      // Fallback timeout to clear loader if navigation aborted or completed silently
      const fallback = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 8000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(fallback);
      };
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  if (!isLoading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-[2.5px] overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: "width, opacity",
        }}
      />
    </div>
  );
}

