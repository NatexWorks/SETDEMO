import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manish / NatexWorks — Websites & Custom Solutions",
  description: "NatexWorks builds business websites, custom web applications, and helps local businesses improve SEO and Google Maps visibility.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Manish / NatexWorks — Websites & Custom Solutions",
    description: "NatexWorks builds business websites, custom web applications, and helps local businesses improve SEO and Google Maps visibility.",
    siteName: "NatexWorks",
    images: [{ url: "https://natexworks.github.io/SETDEMO/og-image.svg", alt: "NatexWorks — More than websites. Custom solutions." }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><head>
    <meta name="theme-color" content="#10120f" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    {/* App Router layout shares this established font pair across every page. */}
    {/* eslint-disable-next-line @next/next/no-page-custom-font */}
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head><body>{children}</body></html>;
}
