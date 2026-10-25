import { ProductDefinition } from "./types";
import { getAllProducts as getLiveProducts } from "./registry";

export interface ExtendedProduct extends ProductDefinition {
  status: "live";
  formatLabel: string;
  domain: string;
  badge: string;
  highlights?: string[];
}

// Return ONLY the real live products in the catalog
export function getCatalogProducts(): ExtendedProduct[] {
  const live = getLiveProducts();

  return live.map((product) => {
    if (product.slug === "the-job-search-book") {
      return {
        ...product,
        status: "live",
        formatLabel: "Playbook + Directory Bundle",
        domain: "Career & Engineering",
        badge: "Bundle · Free Directory Included",
        highlights: [
          "30 Structured Chapters (148 Interactive Blocks)",
          "ACR ATS Formula & Real Naukri Resdex Breakdown",
          "🎁 INCLUDED FREE: 144-Company Hiring Directory (Worth ₹99)",
        ],
      };
    }
    if (product.slug === "hiring-organizations") {
      return {
        ...product,
        status: "live",
        formatLabel: "Searchable Directory",
        domain: "Engineering & Tech",
        badge: "Curated Directory",
        highlights: [
          "120+ Verified Companies",
          "Alternative Interview Formats",
          "Remote & Worldwide Filters",
        ],
      };
    }

    return {
      ...product,
      status: "live",
      formatLabel: product.type.toUpperCase(),
      domain: product.categories[0] || "General",
      badge: "Available Now",
    };
  });
}
