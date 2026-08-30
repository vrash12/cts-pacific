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
import {
  navigationServiceLinks,
  primaryNavigation,
  serviceLinks,
  siteConfig,
} from "@/config/site";

describe("site configuration", () => {
  it("contains the approved core and additional service routes", () => {
    expect(serviceLinks).toHaveLength(14);
    expect(serviceLinks.map((service) => service.href)).toEqual([
      "/services/fiber-optics",
      "/services/data-cabling",
      "/services/cctv",
      "/services/access-control",
      "/services/micro-trenching",
      "/services/civil-underground",
      "/services/troubleshooting",
      "/services/maintenance",
      "/services/pbx-systems",
      "/services/electrical",
      "/services/server-infrastructure",
      "/services/telecommunication-specialist",
      "/services/it-support",
      "/services/facility-locating",
    ]);
    expect(serviceLinks.filter((service) => service.group === "Core infrastructure")).toHaveLength(6);
    expect(
      serviceLinks.filter((service) => service.group === "Technical support & systems"),
    ).toHaveLength(8);
  });

  it("keeps commerce out of primary navigation while it is disabled", () => {
    expect(primaryNavigation.map((item) => item.label)).not.toContain("Products");
  });

  it("keeps the navbar concise while the Services index owns the full catalog", () => {
    expect(navigationServiceLinks).toHaveLength(6);
    expect(
      navigationServiceLinks.every(
        (service) => service.group === "Core infrastructure",
      ),
    ).toBe(true);
    expect(serviceLinks).toHaveLength(14);
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
