"use client";

export type AnalyticsEventType =
  | "product_view"
  | "preview_open"
  | "checkout_start"
  | "payment_success"
  | "payment_failed"
  | "product_open"
  | "download_start"
  | "chapter_opened"
  | "quiz_answered";

export interface TrackEventParams {
  eventType: AnalyticsEventType;
  productId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Client-side authentic analytics event logger.
 * Never fabricates numbers or social proof.
 */
export async function trackEvent({
  eventType,
  productId,
  metadata = {},
}: TrackEventParams): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        productId,
        metadata: {
          ...metadata,
          url: window.location.href,
          referrer: document.referrer || undefined,
          screen: `${window.innerWidth}x${window.innerHeight}`,
        },
      }),
      keepalive: true, // Send even if user navigates away
    });
  } catch {
    // Non-blocking telemetry
  }
}
