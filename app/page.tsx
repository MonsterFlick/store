"use client";

import React, { useState, useMemo } from "react";
import { getAllProducts, getProductContent } from "@/lib/products/registry";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { HeroEcosystem } from "@/components/store/HeroEcosystem";
import { CategoryUniverse } from "@/components/store/CategoryUniverse";
import { AgencySpotlight } from "@/components/store/AgencySpotlight";
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

      {/* 1. Editorial Hero: Manifesto, Kinetic Engine & Volume 01 Showcase */}
      <HeroEcosystem
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* 2. Curated Publications Catalogue */}
      <CategoryUniverse
        onOpenPreview={(slug) => setPreviewProductSlug(slug)}
      />

      {/* Excerpt Reader Drawer Modal */}
      {activePreviewProduct && (
        <ProductPreviewModal
          isOpen={!!previewProductSlug}
          onClose={() => setPreviewProductSlug(null)}
          product={activePreviewProduct}
          previewChapter={activePreviewChapter}
        />
      )}

      {/* 3. SoWeBuild Agency Spotlight (Custom Websites & Social Media Growth) */}
      <AgencySpotlight />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
