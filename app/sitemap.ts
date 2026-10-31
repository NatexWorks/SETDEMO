import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { absoluteSiteUrl, isIndexable } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  const routes = [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    ...projects.map((project) => "/work/" + project.slug)
  ];

  return routes.map((route) => ({
    url: absoluteSiteUrl(route),
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/work" ? 0.8 : 0.7
  }));
}
