import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, Space_Grotesk, Instrument_Serif, Geist_Mono } from "next/font/google";
import { CursorEffect } from "@/components/ui/CursorEffect";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { TopLoader } from "@/components/ui/TopLoader";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — SoWeBuild Store",
    default: "SoWeBuild Store — Premium Digital Playbooks, Guides & Resources",
  },
  description:
    "A curated digital storefront for high-impact playbooks, interactive guides, developer tools, and career resources.",
  keywords: [
    "digital products",
    "playbooks",
    "career guides",
    "developer tools",
    "interactive resources",
    "templates",
    "sowebuild store",
  ],
  authors: [{ name: "SoWeBuild Store" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://store.sowebuild.in"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/logos/sowebuild-symbol.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SoWeBuild Store — Premium Digital Playbooks, Guides & Resources",
    description:
      "A curated digital storefront for high-impact playbooks, interactive guides, developer tools, and career resources.",
    siteName: "SoWeBuild Store",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SoWeBuild Store — Premium Digital Playbooks & Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoWeBuild Store — Premium Digital Playbooks, Guides & Resources",
    description:
      "A curated digital storefront for high-impact playbooks, interactive guides, developer tools, and career resources.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${spaceGrotesk.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        <Suspense fallback={null}>
          <TopLoader />
        </Suspense>
        <SmoothScroll>
          <CursorEffect />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
