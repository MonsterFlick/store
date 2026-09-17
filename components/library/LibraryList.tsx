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

    setProgressMap(map);
  }, [entitledProducts]);

  if (entitledProducts.length === 0) {
    return (
      <Card className="text-center py-16 px-6 bg-[var(--surface-elevated)] max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-[var(--background-secondary)] text-[var(--accent-primary)] flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Your library is empty
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Find an interactive digital book or engineering handbook worth exploring.
          </p>
        </div>
        <Link href="/#products">
          <Button variant="primary" size="md">
            Explore Publications
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {entitledProducts.map((product) => {
        const prog = progressMap[product.slug];
        const hasStarted = prog && (prog.scrollPercentage > 0 || prog.completed > 0);

        return (
          <Card
            key={product.slug}
            className="p-6 sm:p-8 bg-[var(--surface-card)] flex flex-col justify-between space-y-6 hover:border-[var(--border-hover)] transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="accent" className="capitalize">
                  {product.type} Experience
                </Badge>
                <span className="text-[11px] font-mono text-[var(--text-muted)]">
                  Lifetime Access
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  {product.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                  {product.tagline}
                </p>
              </div>

              {/* Local Progress Indicator */}
              {hasStarted && (
                <div className="p-3 rounded-[var(--radius-md)] bg-[var(--background-secondary)] border border-[var(--border-subtle)] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[var(--text-muted)]">
                    <span className="font-mono">Local Progress</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {prog.completed > 0
                        ? `${prog.completed} completed`
                        : `${prog.scrollPercentage}% read`}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--border-subtle)] h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{
                        width: `${Math.max(5, prog.scrollPercentage)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-muted)] font-mono">
                2 Devices Allowed
              </span>

              <Link href={`/library/${product.slug}`}>
                <Button variant="primary" size="sm">
                  {hasStarted ? (
                    <>
                      <span>Continue Reading</span>
                      <Play className="w-3.5 h-3.5 ml-1 fill-current" />
                    </>
                  ) : (
                    <>
                      <span>Open Product</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </Button>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
