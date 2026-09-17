import { z } from "zod";

export interface ProductCapabilities {
  view: boolean;
  download: boolean;
  stream: boolean;
  watermark: boolean;
  access: "lifetime" | "limited";
  device_limit: number;
}

export type ContentBlockType =
  | "heading"
  | "text"
  | "code"
  | "callout"
  | "image"
  | "quote"
  | "quiz"
  | "interactive";

export interface ContentBlock {
  id?: string;
  type: ContentBlockType;
  level?: 1 | 2 | 3 | 4;
  text?: string;
  content?: string;
  code?: string;
  language?: string;
  filename?: string;
  variant?: "info" | "warning" | "tip" | "important";
  title?: string;
  src?: string;
  alt?: string;
  caption?: string;
  asset_id?: string;
  quote?: string;
  author?: string;
  role?: string;
  question?: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  componentName?: string;
  props?: Record<string, unknown>;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  isFreePreview?: boolean;
  sections: ContentBlock[];
}

export interface StructuredBookContent {
  title: string;
  author?: string;
  version: string;
  chapters: Chapter[];
}

export interface ProductDefinition {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: "ebook" | "guide" | "video" | "template" | "app" | "bundle";
  template?: "ebook" | "guide" | "video" | "custom";
  capabilities: ProductCapabilities;
  price: number; // in INR ₹
  originalPrice?: number; // in INR ₹
  currency?: string; // "INR"
  categories: string[];
  tags: string[];
  thumbnailUrl?: string;
  previewChapterId?: string;
  features: string[];
  license: {
    name: string;
    terms: string;
  };
  faq?: Array<{ question: string; answer: string }>;
  includedSlugs?: string[]; // If bundle
}

// Zod validation schemas for product sync validation
export const contentBlockSchema: z.ZodType<ContentBlock> = z.object({
  id: z.string().optional(),
  type: z.enum([
    "heading",
    "text",
    "code",
    "callout",
    "image",
    "quote",
    "quiz",
    "interactive",
  ]),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(),
  text: z.string().optional(),
  content: z.string().optional(),
  code: z.string().optional(),
  language: z.string().optional(),
  filename: z.string().optional(),
  variant: z.enum(["info", "warning", "tip", "important"]).optional(),
  title: z.string().optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  asset_id: z.string().optional(),
  quote: z.string().optional(),
  author: z.string().optional(),
  role: z.string().optional(),
  question: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctIndex: z.number().optional(),
  explanation: z.string().optional(),
  componentName: z.string().optional(),
  props: z.record(z.string(), z.unknown()).optional(),
});

export const chapterSchema: z.ZodType<Chapter> = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  isFreePreview: z.boolean().optional(),
  sections: z.array(contentBlockSchema),
});

export const structuredBookContentSchema: z.ZodType<StructuredBookContent> = z.object({
  title: z.string().min(1),
  author: z.string().optional(),
  version: z.string().default("1.0.0"),
  chapters: z.array(chapterSchema).min(1),
});

export const productCapabilitiesSchema = z.object({
  view: z.boolean().default(true),
  download: z.boolean().default(false),
  stream: z.boolean().default(false),
  watermark: z.boolean().default(true),
  access: z.enum(["lifetime", "limited"]).default("lifetime"),
  device_limit: z.number().int().positive().default(2),
});

export const productDefinitionSchema: z.ZodType<ProductDefinition> = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2),
  tagline: z.string().min(5),
  description: z.string().min(10),
  type: z.enum(["ebook", "guide", "video", "template", "app", "bundle"]),
  template: z.enum(["ebook", "guide", "video", "custom"]).optional(),
  capabilities: productCapabilitiesSchema,
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  currency: z.literal("INR").default("INR"),
  categories: z.array(z.string()).min(1),
  tags: z.array(z.string()),
  thumbnailUrl: z.string().optional(),
  previewChapterId: z.string().optional(),
  features: z.array(z.string()),
  license: z.object({
    name: z.string(),
    terms: z.string(),
  }),
  faq: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional(),
  includedSlugs: z.array(z.string()).optional(),
});
