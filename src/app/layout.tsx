import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { publicEnvironment } from "@/config/env/public";
import { siteConfig } from "@/config/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const siteVerification: Metadata["verification"] = {
  ...(publicEnvironment.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: publicEnvironment.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : {}),
  ...(publicEnvironment.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? {
        other: {
          "msvalidate.01": [publicEnvironment.NEXT_PUBLIC_BING_SITE_VERIFICATION],
        },
      }
    : {}),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.dba}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.dba,
  publisher: siteConfig.legalName,
  creator: siteConfig.legalName,
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: ["/images/logo.png"],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: siteVerification,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.dba,
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CTS Pacific — Telecommunications & Infrastructure Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B2942",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
