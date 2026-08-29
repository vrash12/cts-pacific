import { expect, test } from "@playwright/test";

test("homepage exposes the primary conversion and service navigation", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /building the infrastructure that keeps the pacific connected/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /request a quote/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Fiber Optics" }).first()).toHaveAttribute(
    "href",
    "/services/fiber-optics",
  );
  await expect(
    page.getByRole("heading", { name: /precision at every stage of the network/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /planning your next infrastructure project/i }),
  ).toBeVisible();
});
