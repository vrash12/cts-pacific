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

test("service slideshow controls select and align the requested service", async ({ page }) => {
  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: /one team\. complete infrastructure capability/i,
  });
  await expect(carousel).toBeVisible();
  await carousel.getByRole("button", { name: "Pause slideshow" }).click();
  await carousel.getByRole("button", { name: "Show next service" }).click();

  await expect(
    carousel.getByRole("button", { name: /show data cabling, slide 2 of 6/i }),
  ).toHaveAttribute("aria-current", "true");
  await expect
    .poll(() =>
      carousel.evaluate((element) => {
        const track = element.querySelector<HTMLElement>(".services-slideshow__track");
        const slide = element.querySelector<HTMLElement>('[data-service-slide="1"]');

        if (!track || !slide) return Number.POSITIVE_INFINITY;
        return Math.abs(
          slide.getBoundingClientRect().left - track.getBoundingClientRect().left,
        );
      }),
    )
    .toBeLessThan(2);
});

test("service slideshow remains usable at a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const carousel = page.getByRole("region", {
    name: /one team\. complete infrastructure capability/i,
  });
  await carousel.getByRole("button", { name: "Pause slideshow" }).click();
  await carousel
    .getByRole("button", { name: /show cctv systems, slide 3 of 6/i })
    .click();

  await expect(carousel.getByRole("link", { name: "Explore CCTV Systems" })).toBeVisible();
  await expect(
    carousel.getByRole("button", { name: /show cctv systems, slide 3 of 6/i }),
  ).toHaveAttribute("aria-current", "true");
});
