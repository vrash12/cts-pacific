import { expect, test } from "@playwright/test";

const expandedServices = [
  { path: "/services/troubleshooting", heading: "Infrastructure Troubleshooting" },
  { path: "/services/maintenance", heading: "Infrastructure Maintenance" },
  { path: "/services/pbx-systems", heading: "PBX Communication Systems" },
  { path: "/services/electrical", heading: "Electrical Infrastructure Support" },
  { path: "/services/server-infrastructure", heading: "Server Infrastructure" },
  {
    path: "/services/telecommunication-specialist",
    heading: "Telecommunications Project Support",
  },
  { path: "/services/it-support", heading: "IT Infrastructure Support" },
  { path: "/services/facility-locating", heading: "Facility Locating Support" },
] as const;

for (const service of expandedServices) {
  test(`${service.path} exposes a complete scoped service page`, async ({ page }) => {
    await page.goto(service.path);

    await expect(
      page.getByRole("heading", { level: 1, name: service.heading }),
    ).toBeVisible();
    await expect(page.getByText("Project-specific scope")).toBeVisible();
    await expect(page.getByRole("link", { name: /request a quote/i }).first()).toBeVisible();
  });
}

test("IT Support technical overview heading stays within its grid column", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1850, height: 900 });
  await page.goto("/services/it-support");

  const heading = page.getByRole("heading", {
    level: 2,
    name: "Built around the complete infrastructure scope.",
  });

  await expect(heading).toBeVisible();
  expect(
    await heading.evaluate((element) => element.scrollWidth <= element.clientWidth),
  ).toBe(true);
});

test("service imagery has no public stock credits or source links", async ({
  page,
}) => {
  await page.goto("/services");

  await expect(
    page.getByText(/representative reference|technical reference/i),
  ).toHaveCount(0);
  await expect(page.locator('a[href*="pexels.com"]')).toHaveCount(0);

  await page.goto("/services/it-support");

  await expect(
    page.getByText(/representative reference|technical reference/i),
  ).toHaveCount(0);
  await expect(page.locator('a[href*="pexels.com"]')).toHaveCount(0);
});
