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
  | "subheading"
  | "text"
  | "paragraph"
  | "lead-paragraph"
  | "code"
  | "callout"
  | "pro-tip"
  | "warning"
  | "image"
  | "quote"
  | "quote-card"
  | "diagram"
  | "do-dont"
  | "checklist"
  | "table"
  | "script"
  | "invoice-case-study"
  | "daily-routine"
  | "resource-link"
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
  subtitle?: string;
  dropCap?: string;
  leadText?: string;
  doTitle?: string;
  doText?: string;
  dontTitle?: string;
  dontText?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  scriptSubject?: string;
  scriptBody?: string;
  url?: string;
  urlLabel?: string;
  urlDescription?: string;
  buttonText?: string;
  invoiceData?: {
    vendor: string;
    invoiceDate: string;
    services: string[];
    listedAmount: string;
    discount: string;
    taxableValue: string;
    gst: string;
    finalPaid: string;
    note: string;
  };
  routinePhases?: {
    time: string;
    title: string;
    tasks: string[];
  }[];
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
  chapterNumber?: number;
  slug?: string;
  volume?: string;
  title: string;
  subtitle?: string;
  description?: string;
  readingTime?: string;
  epigraph?: { quote: string; author?: string };
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
  price: number; // in INR
  originalPrice?: number; // in INR
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
    "subheading",
    "text",
    "paragraph",
    "lead-paragraph",
    "code",
    "callout",
    "pro-tip",
    "warning",
    "image",
    "quote",
    "quote-card",
    "diagram",
    "do-dont",
    "checklist",
    "table",
    "script",
    "invoice-case-study",
    "daily-routine",
    "resource-link",
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
  subtitle: z.string().optional(),
  dropCap: z.string().optional(),
  leadText: z.string().optional(),
  doTitle: z.string().optional(),
  doText: z.string().optional(),
  dontTitle: z.string().optional(),
  dontText: z.string().optional(),
  items: z.array(z.string()).optional(),
  headers: z.array(z.string()).optional(),
  rows: z.array(z.array(z.string())).optional(),
  scriptSubject: z.string().optional(),
  scriptBody: z.string().optional(),
  url: z.string().optional(),
  urlLabel: z.string().optional(),
  urlDescription: z.string().optional(),
  buttonText: z.string().optional(),
  invoiceData: z.object({
    vendor: z.string(),
    invoiceDate: z.string(),
    services: z.array(z.string()),
    listedAmount: z.string(),
    discount: z.string(),
    taxableValue: z.string(),
    gst: z.string(),
    finalPaid: z.string(),
    note: z.string(),
  }).optional(),
  routinePhases: z.array(z.object({
    time: z.string(),
    title: z.string(),
    tasks: z.array(z.string()),
  })).optional(),
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
  chapterNumber: z.number().optional(),
  slug: z.string().optional(),
  volume: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  readingTime: z.string().optional(),
  epigraph: z.object({
    quote: z.string(),
    author: z.string().optional(),
  }).optional(),
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