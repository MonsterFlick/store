import { z } from "zod";

const isProduction = process.env.NODE_ENV === "production";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://mock-project.supabase.co"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().default("mock-anon-key"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default("mock-anon-key"),
  SUPABASE_SERVICE_ROLE_KEY: isProduction
    ? z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required in production")
    : z.string().default("mock-service-role-key"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default("rzp_test_mock_key_12345"),
  RAZORPAY_KEY_SECRET: isProduction
    ? z.string().min(1, "RAZORPAY_KEY_SECRET is required in production")
    : z.string().default("mock_razorpay_secret_67890"),
  RAZORPAY_WEBHOOK_SECRET: isProduction
    ? z.string().min(1, "RAZORPAY_WEBHOOK_SECRET is required in production")
    : z.string().default("mock_webhook_secret_abcde"),
  CONTENT_ENCRYPTION_KEY: isProduction
    ? z
        .string()
        .min(64, "CONTENT_ENCRYPTION_KEY must be at least 64 hex characters (32 bytes) in production")
    : z
        .string()
        .min(32)
        .default("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().default("support@om.store"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://mock-project.supabase.co"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().default("mock-anon-key"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default("mock-anon-key"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default("rzp_test_mock_key_12345"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().default("support@om.store"),
});

const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: key,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
  CONTENT_ENCRYPTION_KEY: process.env.CONTENT_ENCRYPTION_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
});

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: key,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
});
