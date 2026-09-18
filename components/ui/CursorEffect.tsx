"use client";

import React, { useEffect, useRef } from "react";

export function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let isRafRunning = false;
    let rafId = 0;

    const animate = () => {
      // Direct position for the precision dot (zero lag)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Smooth lag / lerp for the outer ring (fluid physics)
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      ringX += dx * 0.28;
      ringY += dy * 0.28;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // If lerp has settled and mouse is still, pause RAF to save 100% CPU/GPU frames
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        isRafRunning = false;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const startRaf = () => {
      if (!isRafRunning) {
        isRafRunning = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      startRaf();
    };

    // Optimization: check hover state ONLY when cursor enters a new element (not every single pixel)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = !!target.closest(
        "button, a, input, select, textarea, [role='button'], input[type='range'], .cursor-pointer, .interactive-card, [tabindex='0']"
      );

      if (interactive !== isHovered) {
        isHovered = interactive;
        if (interactive) {
          ring.classList.add("kr-hovered");
          dot.classList.add("kr-hovered");
        } else {
          ring.classList.remove("kr-hovered");
          dot.classList.remove("kr-hovered");
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      isRafRunning = false;
      cancelAnimationFrame(rafId);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Outer fluid lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--accent-primary)]/40 pointer-events-none opacity-0 will-change-transform kr-cursor-ring"
      />

      {/* Center precision pinpoint dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] pointer-events-none opacity-0 will-change-transform kr-cursor-center"
      />
    </div>
  );
}
