import crypto from "node:crypto";
import { env } from "@/lib/env";

export interface CreateRazorpayOrderParams {
  amountInPaise: number; // e.g. 79900 for ₹799
  currency?: string; // "INR"
  receipt: string; // internal order id
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

/**
 * Creates an authorized Razorpay order via the Razorpay REST API.
 */
export async function createRazorpayOrder({
  amountInPaise,
  currency = "INR",
  receipt,
  notes = {},
}: CreateRazorpayOrderParams): Promise<RazorpayOrderResponse> {
  const keyId = env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  // If running with mock credentials in development, generate a synthetic order
  if (keyId.includes("mock") || keySecret.includes("mock")) {
    return {
      id: `order_mock_${crypto.randomBytes(8).toString("hex")}`,
      amount: amountInPaise,
      currency,
      receipt,
      status: "created",
    };
  }

  const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency,
      receipt,
      notes,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Razorpay order creation failed: ${response.status} ${errorBody}`);
  }

  return response.json() as Promise<RazorpayOrderResponse>;
}

/**
 * Verifies Razorpay webhook signature using HMAC-SHA256 with timing-safe length validation.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string,
  signature: string,
  webhookSecret: string = env.RAZORPAY_WEBHOOK_SECRET
): boolean {
  if (!rawBody || !signature || !webhookSecret) return false;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "hex");
    const actualBuf = Buffer.from(signature, "hex");

    if (expectedBuf.length !== actualBuf.length || expectedBuf.length === 0) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

/**
 * Verifies checkout client-side payment signature (order_id|payment_id) with timing-safe validation.
 */
export function verifyRazorpayPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  keySecret: string = env.RAZORPAY_KEY_SECRET
): boolean {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !keySecret) {
    return false;
  }

  try {
    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expected = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(razorpaySignature, "hex");

    if (expectedBuf.length !== actualBuf.length || expectedBuf.length === 0) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}
