import { expect, test } from "@playwright/test";

test("All services stays aligned on hover and keyboard focus", async ({ isMobile, page }, testInfo) => {
  test.skip(isMobile, "The mobile menu does not use the desktop Services dropdown.");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/certifications");
  const menu = page.locator("details.navigation-menu");
  const summary = menu.locator("summary");
  await summary.click();
  const panel = menu.locator(".navigation-menu__panel");
  await panel.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  const link = panel.getByRole("link", { name: "All services", exact: true });
  const measure = () => link.evaluate((element) => {
    const text = document.createRange();
    text.selectNodeContents(element);
    return {
      left: text.getBoundingClientRect().left,
      padding: getComputedStyle(element).paddingLeft,
      background: getComputedStyle(element).backgroundColor,
    };
  });
  const initial = await measure();
  await link.hover();
  await link.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  const hovered = await measure();
  expect(hovered.padding).toBe(initial.padding);
  expect(Math.abs(hovered.left - initial.left)).toBeLessThan(0.5);
  expect(hovered.background).not.toBe(initial.background);

  await page.mouse.move(0, 850);
  await summary.focus();
  await page.keyboard.press("Tab");
  await expect(link).toBeFocused();
  await link.evaluate((element) => Promise.all(element.getAnimations().map((animation) => animation.finished)));
  const focused = await measure();
  expect(focused.padding).toBe(initial.padding);
  expect(Math.abs(focused.left - initial.left)).toBeLessThan(0.5);
  await panel.screenshot({ path: testInfo.outputPath("services-menu-focus.png") });
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/services$/);
  await expect(panel).toBeHidden();
});

test("responsive navigation closes after a destination is selected", async ({
  isMobile,
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Products", exact: true }),
  ).toHaveCount(0);

  if (isMobile) {
    const menu = page.locator("details.mobile-navigation");
    const panel = page.getByRole("navigation", { name: "Mobile navigation" });

    await menu.locator("summary").click();
    await expect(panel).toBeVisible();
    await panel.getByRole("link", { name: "About", exact: true }).click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(panel).toBeHidden();
    return;
  }

  const primaryNavigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  const panel = page.locator(".navigation-menu__panel");

  await primaryNavigation.getByText("Services", { exact: true }).click();
  await expect(panel).toBeVisible();
  await panel.getByRole("link", { name: "Fiber Optics", exact: true }).click();

  await expect(page).toHaveURL(/\/services\/fiber-optics$/);
  await expect(panel).toBeHidden();
});
