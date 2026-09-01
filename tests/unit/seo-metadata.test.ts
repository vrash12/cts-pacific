import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";
import { services } from "@/modules/services/service-catalog";

describe("SEO metadata routes", () => {
  it("publishes every indexable public page exactly once", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(new URL("/", siteConfig.url).toString());
    expect(urls).toContain(new URL("/services", siteConfig.url).toString());
    expect(urls).toContain(new URL("/quote", siteConfig.url).toString());
    expect(urls).toContain(new URL("/contact", siteConfig.url).toString());

    for (const service of services) {
      expect(urls).toContain(
        new URL(`/services/${service.slug}`, siteConfig.url).toString(),
      );
    }

    expect(urls.some((url) => url.includes("/admin"))).toBe(false);
    expect(urls.some((url) => url.includes("/api/"))).toBe(false);
  });

  it("allows the public site while protecting private and API routes from crawling", () => {
    const metadata = robots();

    expect(metadata.rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    });
    expect(metadata.sitemap).toBe(
      new URL("/sitemap.xml", siteConfig.url).toString(),
    );
    expect(metadata.host).toBe(siteConfig.url);
  });
});
