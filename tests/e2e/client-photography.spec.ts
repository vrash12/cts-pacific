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
  { route: "/services/fiber-optics", name: "The detail behind the connection.", count: 10 },
  { route: "/services/cctv", name: "From camera to monitoring.", count: 17 },
  { route: "/services/data-cabling", name: "Connections, organized.", count: 5 },
  { route: "/services/troubleshooting", name: "A closer look inside the system.", count: 3 },
  { route: "/services/electrical", name: "The pathways behind the systems.", count: 3 },
  { route: "/services/it-support", name: "Where devices meet infrastructure.", count: 5 },
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
    const triggers = gallery.getByRole("button", { name: /^View full (photo|document):/ });
    await expect(triggers).toHaveCount(count);
    for (const trigger of await triggers.all()) {
      await expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    }
    await triggers.first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("button", { name: "Close image viewer" })).toBeVisible();
    await page.getByRole("button", { name: "Close image viewer" }).press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(triggers.first()).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await gallery.screenshot({ path: testInfo.outputPath("gallery.png"), style: screenshotStyle });
  });
}

test("supplied collages remain uncropped in their service groups", async ({ page }) => {
  for (const route of ["fiber-optics", "cctv"]) {
    await page.goto(`/services/${route}`);
    const collage = page.getByRole("img", { name: /client-supplied collage/i });
    await expect(collage).toHaveCSS("object-fit", "contain");
    await page.getByRole("button").filter({ has: collage }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("img")).toHaveCSS("object-fit", "contain");
    await page.keyboard.press("Escape");
  }
});

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
