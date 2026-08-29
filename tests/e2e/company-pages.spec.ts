import { expect, test } from "@playwright/test";

const pages = [
  { path: "/about", heading: /infrastructure built as one connected system/i },
  { path: "/industries", heading: /infrastructure for critical operating environments/i },
  { path: "/certifications", heading: /credentials that support disciplined field work/i },
  { path: "/contact", heading: /let’s connect the next project/i },
] as const;

for (const entry of pages) {
  test(`${entry.path} presents a complete primary page`, async ({ page }) => {
    await page.goto(entry.path);

    await expect(page.getByRole("heading", { level: 1, name: entry.heading })).toBeVisible();
    await expect(page.getByRole("link", { name: /request a quote/i }).first()).toBeVisible();
  });
}
