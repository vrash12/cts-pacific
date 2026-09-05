import { expect, test } from "@playwright/test";

// Cold image optimization can exceed the default assertion window on local builds.
test.use({ actionTimeout: 15_000 });
const screenshotStyle = ".site-header, .skip-link, nextjs-portal { visibility: hidden !important; }";

test("service directory loads every thumbnail including the final row", async ({ page }, testInfo) => {
  await page.goto("/services", { waitUntil: "domcontentloaded" });
  const images = page.locator(".services-index-grid article img");
  await expect(images).toHaveCount(15);
  await expect.poll(() => images.evaluateAll((elements) => elements.every((element) =>
    element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
  )), { timeout: 15_000 }).toBe(true);
  for (const name of ["IT Support", "Construction Equipment Rental"]) {
    const card = page.locator(".services-index-grid article").filter({
      has: page.getByRole("heading", { name, exact: true }),
    });
    await expect(card.getByRole("img")).toHaveAttribute("loading", "eager");
    await card.screenshot({ path: testInfo.outputPath(`${name.replaceAll(" ", "-")}.png`), style: screenshotStyle });
  }
});

const galleries = [
  { route: "/services/fiber-optics", name: "The detail behind the connection.", count: 6 },
  { route: "/about", name: "Beyond the field. Part of the industry.", count: 2 },
  { route: "/certifications", name: "Documented business scope.", count: 2 },
] as const;

for (const { route, name, count } of galleries) {
  test(`${route} displays its client photography gallery`, async ({ page }, testInfo) => {
    await page.goto(route);
    const gallery = page.getByRole("region", { name });
    await expect(gallery.getByRole("img")).toHaveCount(count);
    for (const image of await gallery.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((element) =>
        element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
      ), { timeout: 15_000 }).toBe(true);
    }
    for (const link of await gallery.getByRole("link").all()) {
      await expect(link).toHaveAttribute("href", /^\/images\/cts\/.*\.webp$/);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAccessibleName(/opens in a new tab/i);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await gallery.screenshot({ path: testInfo.outputPath("gallery.png"), style: screenshotStyle });
  });
}

for (const slug of ["fiber-optics", "data-cabling", "civil-underground", "electrical", "server-infrastructure", "telecommunication-specialist", "it-support", "construction-equipment-rental"]) {
  test(`${slug} loads its new service photography`, async ({ page }, testInfo) => {
    await page.goto(`/services/${slug}`);
    const hero = page.locator(".service-hero__visual img");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveAttribute("src", /cts-pacific-/);
    await expect.poll(() => hero.evaluate((image) =>
      image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
    )).toBe(true);
    const media = page.locator(".service-applications__media");
    for (const image of await media.getByRole("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) =>
        element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
      )).toBe(true);
    }
    await media.screenshot({ path: testInfo.outputPath("service-media.png"), style: screenshotStyle });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath("service-hero.png") });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
