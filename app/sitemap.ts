import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const siteUrl = (process.env.SITE_URL || "https://natexworks.github.io/SETDEMO").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/services",
    "/work",
    "/about",
    "/contact",
    ...projects.map((project) => "/work/" + project.slug)
  ];

  return routes.map((route) => ({
    url: siteUrl + route,
    changeFrequency: route === "/" ? "monthly" : "yearly",
    priority: route === "/" ? 1 : route === "/work" ? 0.8 : 0.7
  }));
}
