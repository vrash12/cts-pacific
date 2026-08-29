import { describe, expect, it } from "vitest";

import {
  getRelatedServices,
  getServiceBySlug,
  services,
} from "@/modules/services/service-catalog";

describe("service catalog", () => {
  it("defines every required public service route", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "fiber-optics",
      "data-cabling",
      "cctv",
      "access-control",
      "micro-trenching",
      "civil-underground",
    ]);
  });

  it("provides complete technical-page content for every service", () => {
    for (const service of services) {
      expect(service.overview.length).toBeGreaterThanOrEqual(2);
      expect(service.capabilities.length).toBeGreaterThanOrEqual(7);
      expect(service.applications.length).toBeGreaterThanOrEqual(6);
      expect(service.process).toHaveLength(4);
      expect(service.related).toHaveLength(2);
      expect(service.heroImage).toMatch(/^\/images\//);
      expect(service.detailImage).toMatch(/^\/images\//);
    }
  });

  it("resolves only valid services and valid related capabilities", () => {
    expect(getServiceBySlug("fiber-optics")?.title).toBe("Fiber Optic Infrastructure");
    expect(getServiceBySlug("not-a-service")).toBeUndefined();

    for (const service of services) {
      expect(getRelatedServices(service).map((related) => related.slug)).toEqual(
        service.related,
      );
    }
  });
});
