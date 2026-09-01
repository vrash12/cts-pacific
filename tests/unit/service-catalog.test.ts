import { describe, expect, it } from "vitest";

import {
  getRelatedServices,
  getServiceBySlug,
  services,
} from "@/modules/services/service-catalog";

describe("service catalog", () => {
  it("defines every approved public service route", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "fiber-optics",
      "data-cabling",
      "cctv",
      "access-control",
      "micro-trenching",
      "civil-underground",
      "troubleshooting",
      "maintenance",
      "pbx-systems",
      "electrical",
      "server-infrastructure",
      "telecommunication-specialist",
      "it-support",
      "facility-locating",
      "construction-equipment-rental",
    ]);
  });

  it("keeps the original disciplines primary and groups added services separately", () => {
    expect(services.filter((service) => service.group === "core-infrastructure")).toHaveLength(6);
    expect(services.filter((service) => service.group === "technical-support")).toHaveLength(8);
    expect(services.filter((service) => service.group === "equipment-rental")).toHaveLength(1);
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
      expect(service.referenceImage).toMatch(/^\/images\//);
      expect(Object.hasOwn(service, "referenceLabel")).toBe(false);
      expect(Object.hasOwn(service, "referenceCredit")).toBe(false);
      expect(Object.hasOwn(service, "referenceUrl")).toBe(false);
    }
  });

  it("marks every added service with a project-specific scope note", () => {
    const addedServices = services.filter(
      (service) => service.group !== "core-infrastructure",
    );

    expect(
      addedServices.every(
        (service) => service.scopeNote && service.scopeNote.length > 40,
      ),
    ).toBe(true);
  });

  it("defines the approved hotel-lock partner only for access control", () => {
    const accessControl = getServiceBySlug("access-control");

    expect(accessControl?.partner).toMatchObject({
      name: "VCE Pacific",
      website: "https://www.vcepacific.com/",
      logo: "/images/partners/vce-pacific-logo.png",
    });
    expect(
      services.filter((service) => service.partner).map((service) => service.slug),
    ).toEqual(["access-control"]);
  });

  it("uses service-specific representative imagery for facility locating", () => {
    expect(getServiceBySlug("facility-locating")?.referenceImage).toBe(
      "/images/editorial/facility-locating-reference.jpeg",
    );
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
