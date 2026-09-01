import { expect, test } from "@playwright/test";

test("homepage publishes production-ready social and canonical metadata", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Telecommunications Contractor Guam \| CTS Pacific/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\.png$/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index, follow/i,
  );
});

test("service pages publish Guam-focused titles and canonical URLs", async ({ page }) => {
  await page.goto("/services/fiber-optics");

  await expect(page).toHaveTitle(/Fiber Optic Infrastructure Guam \| CTS Pacific/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/services\/fiber-optics$/,
  );
});

test("robots and sitemap expose only indexable public routes", async ({ request }) => {
  const robotsResponse = await request.get("/robots.txt");
  const sitemapResponse = await request.get("/sitemap.xml");

  expect(robotsResponse.ok()).toBe(true);
  expect(sitemapResponse.ok()).toBe(true);

  const robotsText = await robotsResponse.text();
  const sitemapText = await sitemapResponse.text();

  expect(robotsText).toContain("Disallow: /admin");
  expect(robotsText).toContain("Disallow: /api");
  expect(robotsText).toContain("Sitemap:");
  expect(sitemapText).toContain("/services/fiber-optics");
  expect(sitemapText).toContain("/quote");
  expect(sitemapText).not.toContain("/admin");
});
