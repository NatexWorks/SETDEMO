export const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
export const isIndexable = process.env.SITE_INDEXABLE === "true";

export function absoluteSiteUrl(path: string): string {
  return siteUrl + (path.startsWith("/") ? path : "/" + path);
}
