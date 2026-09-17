"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, MessageSquarePlus, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export interface ReviewItem {
  id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
}

export function ProductReviews({
  productSlug,
  isEntitled = false,
}: {
  productSlug: string;
  isEntitled?: boolean;
}) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/reviews?productSlug=${productSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
      })
      .catch(() => {});
  }, [productSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, rating, title, content }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to post review");
      }

      setReviews((prev) => [data.review, ...prev]);
      setShowForm(false);
      setTitle("");
      setContent("");
      setFeedback("Your verified review has been published.");
    } catch (err) {
      setFeedback((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
            <span>Customer Reviews</span>
            <span className="text-xs font-mono font-normal text-[var(--text-muted)]">
              ({reviews.length})
            </span>
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Verified purchasers only · Authentic reviews without fabricated ratings
          </p>
        </div>

        {isEntitled && !showForm && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowForm(true)}
            className="self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 mr-1.5" />
            <span>Write a Review</span>
          </Button>
        )}
      </div>

      {feedback && (
        <div className="p-3 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-xs text-[var(--status-success)]">
          {feedback}
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <Card className="p-5 bg-[var(--surface-elevated)] border border-[var(--border-hover)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Your Rating</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-[var(--border-subtle)]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Review Headline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Masterclass in modern V8 execution"
              required
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[var(--text-secondary)]">
                Review Details
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you learn? How does the interactive experience compare to static reading?"
                required
                rows={3}
                className="w-full p-3 text-sm rounded-[var(--radius-md)] bg-[var(--surface-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] border border-[var(--border-subtle)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
              >
                Submit Verified Review
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <Card key={rev.id} className="p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-[var(--border-subtle)]"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  {new Date(rev.created_at).toLocaleDateString("en-IN", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                {rev.title}
              </h4>

              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                &ldquo;{rev.content}&rdquo;
              </p>

              <div className="pt-2 flex items-center space-x-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Purchaser</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <p className="text-xs text-[var(--text-muted)]">
            No reviews yet. Be the first verified purchaser to share your experience.
          </p>
        </Card>
      )}
    </div>
  );
}
