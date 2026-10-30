import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const configuredUrl = process.env.SITE_URL;
  if (!configuredUrl) return [];

  const origin = new URL(configuredUrl).origin;
  return ["/", "/services", "/inventory.html"].map((route) => ({
    url: new URL(route, origin).toString(),
  }));
}
