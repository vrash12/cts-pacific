import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  businessLicensePhotography,
  directoryImage,
  companyPhotography,
  fiberWorkGallery,
  fieldPhotography,
} from "@/config/field-photography";
import { services } from "@/modules/services/service-catalog";

describe("client field photography", () => {
  const photos = Object.values(fieldPhotography);

  it("provides 25 optimized assets with descriptive accessible text", () => {
    expect(photos).toHaveLength(25);
    expect(new Set(photos.map((photo) => photo.src)).size).toBe(25);
    for (const photo of photos) {
      expect(photo.src).toMatch(/^\/images\/cts\/cts-pacific-[a-z0-9-]+\.webp$/);
      expect(existsSync(path.join(process.cwd(), "public", photo.src))).toBe(true);
      expect(photo.alt.length).toBeGreaterThan(30);
      expect(photo.caption.length).toBeGreaterThan(10);
    }
  });

  it("uses every supplied image in a service or a dedicated company/document gallery", () => {
    const used = new Set([
      ...services.flatMap((service) => [service.heroImage, service.detailImage, service.referenceImage]),
      ...fiberWorkGallery.map((photo) => photo.src),
      ...companyPhotography.map((photo) => photo.src),
      ...businessLicensePhotography.map((photo) => photo.src),
    ]);
    for (const photo of photos) expect(used.has(photo.src), photo.caption).toBe(true);
  });

  it("publishes only the sanitized router copy, not the credential-labeled source", () => {
    expect(fieldPhotography.router.src).toBe("/images/cts/cts-pacific-broadband-router.webp");
    const publicAssets = readdirSync(path.join(process.cwd(), "public/images/cts"));
    expect(publicAssets.filter((filename) => filename.endsWith(".webp"))).toHaveLength(25);
    expect(publicAssets.some((filename) => filename.includes("credential-label"))).toBe(false);
  });

  it("provides pre-sized direct assets for every new directory image", () => {
    for (const service of services) {
      const thumbnail = directoryImage(service.referenceImage);
      expect(existsSync(path.join(process.cwd(), "public", thumbnail.src))).toBe(true);
      if (service.referenceImage.startsWith("/images/cts/")) {
        expect(thumbnail.unoptimized).toBe(true);
        expect(thumbnail.src).toContain("/thumbnails/");
      }
    }
  });
});
