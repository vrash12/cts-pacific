import { expect, test } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("production image caching does not make page HTML immutable", async ({ page }) => {
  test.skip(!process.env.PLAYWRIGHT_BASE_URL, "Cache policy is verified against a production server.");
  const document = await page.goto("/about");
  const heroSrc = await page.locator(".service-hero__visual img").evaluate((image: HTMLImageElement) => image.currentSrc);
  const image = await page.request.get(heroSrc);
  expect(image.headers()["cache-control"]).toContain("max-age=31536000");
  expect(image.headers()["cache-control"]).toContain("immutable");
  expect(document?.headers()["cache-control"]).not.toContain("immutable");
});

for (const route of ["/", "/about", "/services/cctv"]) {
  test(`${route} shows prepared hero images without JavaScript or an entrance delay`, async ({ page }) => {
    const optimizerRequests: string[] = [];
    page.on("request", request => {
      if (request.url().includes("/_next/image?")) optimizerRequests.push(request.url());
    });
    await page.goto(route);
    const hero = page.locator(".hero__visual img, .service-hero__visual img");
    await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await hero.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain("/images/delivery/");
    expect(await hero.locator("..").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
    expect(await hero.locator("..").evaluate(element => getComputedStyle(element).opacity)).toBe("1");

    const logo = page.locator(".brand__logo");
    await expect(logo).toBeVisible();
    const logoSrc = await logo.evaluate((image: HTMLImageElement) => image.currentSrc);
    const logoResponse = await page.request.get(logoSrc);
    expect(logoResponse.ok()).toBe(true);
    expect((await logoResponse.body()).byteLength).toBeLessThan(40_000);
    expect(optimizerRequests).toEqual([]);
  });
}
