import { expect, test } from "@playwright/test";

test("responsive navigation closes after a destination is selected", async ({
  isMobile,
  page,
}) => {
  await page.goto("/");

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
