"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProductDefinition } from "@/lib/products/types";
import { getLocalProgress } from "@/lib/products/progress";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ArrowRight, Play, CheckCircle2 } from "lucide-react";

export function LibraryList({
  entitledProducts,
}: {
  entitledProducts: ProductDefinition[];
}) {
  const [progressMap, setProgressMap] = useState<
    Record<string, { lastChapterId: string; scrollPercentage: number; completed: number }>
  >({});

  useEffect(() => {
    const map: Record<
      string,
      { lastChapterId: string; scrollPercentage: number; completed: number }
    > = {};

    entitledProducts.forEach((p) => {
      const prog = getLocalProgress(p.slug);
      if (prog) {
        map[p.slug] = {
          lastChapterId: prog.lastChapterId,
          scrollPercentage: prog.scrollPercentage,
          completed: prog.completedChapters?.length || 0,
        };
      }
    });

    queueMicrotask(() => {
      setProgressMap(map);
    });
  }, [entitledProducts]);

  if (entitledProducts.length === 0) {
    return (
      <div className="text-center py-16 px-6 glass-card-interactive max-w-lg mx-auto space-y-4 rounded-3xl">
        <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/20">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-white font-display">
            Your library is empty
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Explore our curated playbooks and verified engineering directories.
          </p>
        </div>
        <Link href="/#catalog">
          <Button variant="primary" size="md">
            Explore Publications
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {entitledProducts.map((product) => {
        const prog = progressMap[product.slug];
        const hasStarted = prog && (prog.scrollPercentage > 0 || prog.completed > 0);

        return (
          <div
            key={product.slug}
            className="p-6 sm:p-8 glass-card-interactive rounded-2xl flex flex-col justify-between space-y-6 hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="accent" className="capitalize">
                  {product.type} Experience
                </Badge>
                <span className="text-[11px] font-mono text-zinc-500">
                  Lifetime Access
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white font-display">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 line-clamp-2 font-serif italic">
                  {product.tagline}
                </p>
              </div>

              {/* Local Progress Indicator */}
              {hasStarted && (
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span className="font-mono text-[11px]">Reading Progress</span>
                    <span className="font-semibold text-zinc-950 dark:text-white font-mono text-[11px]">
                      {prog.completed > 0
                        ? `${prog.completed} completed`
                        : `${prog.scrollPercentage}% read`}
                    </span>
                  </div>
                  <div className="w-full bg-black/[0.06] dark:bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${Math.max(5, prog.scrollPercentage)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-black/[0.06] dark:border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-mono">
                2 Devices Allowed
              </span>

              <Link href={`/library/${product.slug}`}>
                <Button variant="primary" size="sm" className="cursor-pointer">
                  {hasStarted ? (
                    <>
                      <span>Continue Reading</span>
                      <Play className="w-3.5 h-3.5 ml-1 fill-current" />
                    </>
                  ) : (
                    <>
                      <span>Open Experience</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
