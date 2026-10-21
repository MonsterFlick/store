"use client";

import React, { useState, useMemo } from "react";
import { getAllProducts, getProductContent } from "@/lib/products/registry";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { HeroEcosystem } from "@/components/store/HeroEcosystem";
import { CategoryUniverse } from "@/components/store/CategoryUniverse";
import { FlagshipSpotlight } from "@/components/store/FlagshipSpotlight";
import { DigitalLab } from "@/components/store/DigitalLab";
import { ProductPreviewModal } from "@/components/store/ProductPreviewModal";

export default function HomePage() {
  const liveProducts = getAllProducts();

  // Excerpt Preview Drawer State (For Chapter 0 reading)
  const [previewProductSlug, setPreviewProductSlug] = useState<string | null>(null);

  const activePreviewProduct = useMemo(() => {
    if (!previewProductSlug) return null;
    return liveProducts.find((p) => p.slug === previewProductSlug) || null;
  }, [liveProducts, previewProductSlug]);

  const activePreviewChapter = useMemo(() => {
    if (!activePreviewProduct) return null;
    const content = getProductContent(activePreviewProduct.slug);
    return content?.chapters.find((c) => c.isFreePreview) || content?.chapters[0] || null;
  }, [activePreviewProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] selection:bg-[var(--accent-primary)]/20 selection:text-[var(--accent-primary)]">
      {/* Universal Fixed Top Navigation */}
      <Navbar />

      {/* 1. Hero: Dynamic Manifesto & Kinetic Mediums */}
      <HeroEcosystem
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* 2. Curated Digital Catalog */}
      <CategoryUniverse
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* 3. Flagship Premieres Spotlight */}
      <FlagshipSpotlight
        products={liveProducts}
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* 4. The Digital Goods Laboratory: Interactive Live Specimen Sandbox */}
      <DigitalLab />

      {/* Excerpt Reader Drawer Modal */}
      {activePreviewProduct && (
        <ProductPreviewModal
          isOpen={!!previewProductSlug}
          onClose={() => setPreviewProductSlug(null)}
          product={activePreviewProduct}
          previewChapter={activePreviewChapter}
        />
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
