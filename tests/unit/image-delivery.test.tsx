import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { FieldImage } from "@/components/marketing/field-image";
import { SiteImage } from "@/components/ui/site-image";
import manifest from "@/config/image-delivery.json";
import { getImageDelivery, imageDeliveryUrl } from "@/lib/image-delivery";

const publicFile = (src: string) => path.join(process.cwd(), "public", src);

describe("prepared image delivery", () => {
  it("ships every declared size with a versioned URL and never upscales a source", () => {
    for (const [src, image] of Object.entries(manifest)) {
      expect(existsSync(publicFile(src)), src).toBe(true);
      expect(image.base).toMatch(/^\/images\/delivery\/[a-z0-9-]+-[a-f0-9]{16}$/);
      expect(existsSync(publicFile(image.original)), image.original).toBe(true);
      expect(image.widths).toEqual([...image.widths].sort((a, b) => a - b));
      for (const width of image.widths) {
        expect(width).toBeLessThan(image.width);
        const url = imageDeliveryUrl(src, width);
        expect(existsSync(publicFile(url)), url).toBe(true);
      }
      expect(imageDeliveryUrl(src, image.width * 2)).toBe(image.original);
    }
  });

  it("selects a sufficient prepared size and keeps the About originals byte-identical", () => {
    expect(imageDeliveryUrl("/images/logo.png", 168)).toMatch(/-256.webp$/);
    expect(imageDeliveryUrl("/images/logo.png", 336)).toMatch(/-384.webp$/);
    for (const src of ["/images/services 12.jpeg", "/images/cts/september-2026/cts-pacific-guam-coastline-and-beach.jpeg"]) {
      const image = getImageDelivery(src)!;
      expect(readFileSync(publicFile(image.original))).toEqual(readFileSync(publicFile(src)));
    }
  });

  it("puts responsive hero preloads into the initial HTML and keeps gallery images lazy", () => {
    const html = new DOMParser().parseFromString(renderToString(
      <>
        <FieldImage alt="Hero" preload sizes="512px" src="/images/services 13.jpeg" />
        <FieldImage alt="Gallery" sizes="300px" src="/images/services 12.jpeg" />
      </>,
    ), "text/html");
    const hero = html.querySelector('img[alt="Hero"]')!;
    const preload = html.querySelector('link[rel="preload"][as="image"]')!;
    expect(preload.getAttribute("imagesrcset")).toBe(hero.getAttribute("srcset"));
    expect(hero.getAttribute("srcset")).not.toContain("/_next/image");
    expect(hero.getAttribute("loading")).not.toBe("lazy");
    expect(html.querySelector('img[alt="Gallery"]')?.getAttribute("loading")).toBe("lazy");
  });

  it("retains Next's optimizer for future images outside the prepared local catalog", () => {
    const html = renderToString(<SiteImage alt="Future upload" src="/future-upload.jpg" width={200} height={100} />);
    expect(html).toContain("/_next/image?");
  });
});
