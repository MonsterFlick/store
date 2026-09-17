import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Om Store",
    default: "Om Store — Digital Products, Reimagined",
  },
  description:
    "A curated platform for modern digital products built as interactive, custom code experiences.",
  keywords: ["digital products", "interactive ebooks", "developer guides", "templates", "software"],
  authors: [{ name: "Om Store" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://om.store"),
  openGraph: {
    title: "Om Store — Digital Products, Reimagined",
    description:
      "A curated platform for modern digital products built as interactive, custom code experiences.",
    siteName: "Om Store",
    type: "website",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
