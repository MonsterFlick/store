import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://store.sowebuild.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products/", "/legal/"],
        disallow: ["/library/", "/account/", "/api/"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
