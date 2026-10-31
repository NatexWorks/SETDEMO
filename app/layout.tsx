import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import MotionLayer from "@/components/motion-layer";
import "./globals.css";

const siteUrl = (process.env.SITE_URL || "https://natexworks.github.io/SETDEMO").replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NatexWorks — Websites & custom digital systems",
    template: "%s — NatexWorks"
  },
  description: "NatexWorks designs and builds business websites, custom web applications, and practical digital systems for clearer everyday work.",
  applicationName: "NatexWorks",
  alternates: { canonical: siteUrl + "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "NatexWorks",
    title: "NatexWorks — Websites & custom digital systems",
    description: "Business websites, custom web applications, and practical digital systems built around real needs.",
    url: siteUrl + "/",
    images: [{ url: siteUrl + "/og-premium.svg", width: 1200, height: 630, alt: "NatexWorks — digital work, made useful" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "NatexWorks — Websites & custom digital systems",
    description: "Business websites, custom web applications, and practical digital systems built around real needs.",
    images: [siteUrl + "/og-premium.svg"]
  },
  icons: { icon: siteUrl + "/icon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#f2f0e9" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MotionLayer />
      </body>
    </html>
  );
}
