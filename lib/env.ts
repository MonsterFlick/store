import { z } from "zod";

const isServer = typeof window === "undefined";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("http://127.0.0.1:54321"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().default("sb_publishable_anon_mock_key"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default("sb_publishable_anon_mock_key"),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default("rzp_test_mock_key_12345"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().default("sowebuild.in@gmail.com"),
});

const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: key,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: key,
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
});

const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().default(""),
  RAZORPAY_KEY_SECRET: z.string().default(""),
  RAZORPAY_WEBHOOK_SECRET: z.string().default(""),
  CONTENT_ENCRYPTION_KEY: z
    .string()
    .default("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"),
});

function getServerEnv() {
  if (!isServer) {
    return {
      SUPABASE_SERVICE_ROLE_KEY: "",
      RAZORPAY_KEY_SECRET: "",
      RAZORPAY_WEBHOOK_SECRET: "",
      CONTENT_ENCRYPTION_KEY: "",
    };
  }

  return serverEnvSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "mock-service-role-key",
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "mock_razorpay_secret_67890",
    RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || "mock_webhook_secret_abcde",
    CONTENT_ENCRYPTION_KEY:
      process.env.CONTENT_ENCRYPTION_KEY ||
      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  });
}

const parsedServerEnv = getServerEnv();

export const env = {
  ...clientEnv,
  ...parsedServerEnv,
};
