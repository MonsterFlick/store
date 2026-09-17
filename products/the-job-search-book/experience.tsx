"use client";

import React from "react";
import { EbookShell } from "@/products/_templates/ebook/EbookShell";
import { product } from "./product";
import { sampleContent } from "./sample";
import { StructuredBookContent } from "@/lib/products/types";

export interface JobSearchBookExperienceProps {
  content?: StructuredBookContent | any;
  user?: { id?: string; name?: string; email?: string };
  orderId?: string;
  isFreePreview?: boolean;
}

export default function JobSearchBookExperience({
  content,
  user,
  orderId,
  isFreePreview = false,
}: JobSearchBookExperienceProps) {
  const activeContent = React.useMemo(() => {
    if (!content || !content.chapters) {
      return sampleContent;
    }

    const normalizedChapters = content.chapters.map((ch: any) => ({
      ...ch,
      sections: ch.sections && ch.sections.length > 0 ? ch.sections : ch.blocks || [],
    }));

    return {
      ...content,
      chapters: normalizedChapters,
    };
  }, [content]);

  return (
    <EbookShell
      product={product}
      content={activeContent}
      user={user}
      orderId={orderId}
      isFreePreview={isFreePreview}
    />
  );
}
