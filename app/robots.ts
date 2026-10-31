import type { MetadataRoute } from "next";
import { absoluteSiteUrl, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", ...(isIndexable ? { allow: "/" } : { disallow: "/" }) }],
    ...(isIndexable ? { sitemap: absoluteSiteUrl("/sitemap.xml") } : {})
  };
}
