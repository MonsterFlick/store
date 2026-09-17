import React from "react";
import { ProductDefinition, StructuredBookContent } from "./types";
import { product as hiringOrgProduct } from "@/products/hiring-organizations/product";
import { sampleContent as hiringOrgSampleContent } from "@/products/hiring-organizations/sample";

export interface RegisteredProduct {
  definition: ProductDefinition;
  content?: StructuredBookContent;
  loadExperience: () => Promise<{
    default: React.ComponentType<{
      content?: any;
      user?: { id?: string; name?: string; email?: string };
      orderId?: string;
      isFreePreview?: boolean;
    }>;
  }>;
}

// Registry map: slug -> product implementation
// Notice: NO proprietary full datasets or books exist in this public repository.
// Raw proprietary content is stored encrypted in Supabase (product_content) via preq.store sync.
export const productRegistry: Record<string, RegisteredProduct> = {
  "hiring-organizations": {
    definition: hiringOrgProduct,
    content: hiringOrgSampleContent,
    loadExperience: () => import("@/products/hiring-organizations/experience"),
  },
};

export function getAllProducts(): ProductDefinition[] {
  return Object.values(productRegistry).map((p) => p.definition);
}

export function getProductBySlug(slug: string): ProductDefinition | null {
  const registered = productRegistry[slug];
  return registered ? registered.definition : null;
}

export function getProductContent(slug: string): StructuredBookContent | null {
  const registered = productRegistry[slug];
  return registered?.content || null;
}

export function getProductDirectoryContent(slug: string): any | null {
  return null;
}

export async function loadProductExperience(slug: string) {
  const registered = productRegistry[slug];
  if (!registered) return null;
  const mod = await registered.loadExperience();
  return mod.default;
}
