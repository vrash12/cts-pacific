import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/modules/services/service-catalog";

const staticRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/quote", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.7 },
  { path: "/certifications", changeFrequency: "monthly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: new URL(`/services/${service.slug}`, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: service.group === "core-infrastructure" ? 0.85 : 0.75,
  }));

  return [...publicPages, ...servicePages];
}
