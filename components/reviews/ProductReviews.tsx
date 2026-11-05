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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.08] dark:border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-purple-600 dark:fill-purple-400" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-display flex items-center gap-2">
            <span>Verified Reader Reviews</span>
            <span className="text-sm font-mono font-normal text-zinc-400">
              ({reviews.length})
            </span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Authenticated purchasers only · Authentic reviews without fabricated ratings.
          </p>
        </div>

        {isEntitled && !showForm && (
          <Button
            size="md"
            variant="outline"
            onClick={() => setShowForm(true)}
            className="self-start sm:self-auto text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            <span>Write a Verified Review</span>
          </Button>
        )}
      </div>

      {feedback && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div className="p-6 sm:p-7 rounded-3xl glass-card-interactive border border-purple-500/30">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white font-display">
                Your Rating
              </span>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-zinc-300 dark:text-zinc-700"
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
              placeholder="e.g. Invaluable recruitment systems — skipped generic job boards completely"
              required
              className="text-sm sm:text-base"
            />

            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-display">
                Review Details
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What tactical frameworks did you apply? How does the interactive reader experience compare?"
                required
                rows={3}
                className="w-full p-3.5 text-sm sm:text-base rounded-2xl bg-white/70 dark:bg-white/[0.04] text-zinc-900 dark:text-white placeholder:text-zinc-400 border border-black/[0.08] dark:border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setShowForm(false)}
                className="text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="text-xs sm:text-sm"
              >
                Submit Verified Review
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl glass-card-interactive space-y-3 border border-black/[0.06] dark:border-white/[0.08]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-zinc-200 dark:text-zinc-800"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-zinc-400 font-mono">
                  {new Date(rev.created_at).toLocaleDateString("en-IN", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white font-display">
                {rev.title}
              </h4>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                &ldquo;{rev.content}&rdquo;
              </p>

              <div className="pt-2 flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Purchaser</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 rounded-3xl glass-card border border-black/[0.06] dark:border-white/[0.08] p-6 space-y-1">
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            No customer reviews yet.
          </p>
          <p className="text-xs sm:text-sm text-zinc-400">
            Be the first verified purchaser to share your feedback and experience.
          </p>
        </div>
      )}
    </div>
  );
}
