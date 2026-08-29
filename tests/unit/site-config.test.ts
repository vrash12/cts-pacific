import { describe, expect, it } from "vitest";

import {
  homepageServices,
  industries,
  membershipsAndCredentials,
  projectIntents,
  proofPillars,
  selectedCustomers,
  technicalCapabilities,
} from "@/config/homepage";
import { primaryNavigation, serviceLinks, siteConfig } from "@/config/site";

describe("site configuration", () => {
  it("contains the six approved primary service routes", () => {
    expect(serviceLinks).toHaveLength(6);
    expect(serviceLinks.map((service) => service.href)).toEqual([
      "/services/fiber-optics",
      "/services/data-cabling",
      "/services/cctv",
      "/services/access-control",
      "/services/micro-trenching",
      "/services/civil-underground",
    ]);
  });

  it("keeps commerce out of primary navigation while it is disabled", () => {
    expect(primaryNavigation.map((item) => item.label)).not.toContain("Products");
  });

  it("links the completed company information routes from primary navigation", () => {
    const routeByLabel = new Map(
      primaryNavigation.map((item) => [item.label, item.href]),
    );

    expect(routeByLabel.get("About")).toBe("/about");
    expect(routeByLabel.get("Industries")).toBe("/industries");
    expect(routeByLabel.get("Certifications")).toBe("/certifications");
    expect(routeByLabel.get("Contact")).toBe("/contact");
  });

  it("uses only supplied company contact details", () => {
    expect(siteConfig.email).toBe("info@corerintechnicalsolutions.com");
    expect(siteConfig.phones).toEqual(["(671) 480-6979", "(671) 777-6436"]);
  });
});

describe("homepage content", () => {
  it("covers every required homepage capability and sector", () => {
    expect(homepageServices).toHaveLength(6);
    expect(technicalCapabilities).toHaveLength(10);
    expect(proofPillars).toHaveLength(4);
    expect(industries.map((industry) => industry.title)).toEqual([
      "Commercial",
      "Government",
      "Industrial",
      "Residential",
    ]);
    expect(membershipsAndCredentials).toHaveLength(4);
    expect(projectIntents).toHaveLength(7);
  });

  it("maps every homepage service to client-supplied media", () => {
    expect(homepageServices.every((service) => service.imageSrc.startsWith("/images/"))).toBe(
      true,
    );
    expect(homepageServices.every((service) => service.imageAlt.length > 20)).toBe(true);
  });

  it("includes the two client-identified customer marks", () => {
    expect(selectedCustomers.map((customer) => customer.name)).toEqual(["GTA", "IT&E"]);
    expect(
      selectedCustomers.every((customer) => customer.logoSrc.startsWith("/images/customer/")),
    ).toBe(true);
  });

  it("uses only client-supplied membership and credential artwork", () => {
    expect(membershipsAndCredentials.map((item) => item.name)).toEqual([
      "Guam Contractors Association",
      "The Fiber Optic Association",
      "ETA Certified FOI",
      "ETA International",
    ]);
    expect(
      membershipsAndCredentials.every((item) =>
        item.logoSrc.startsWith("/images/credentials/"),
      ),
    ).toBe(true);
  });
});
