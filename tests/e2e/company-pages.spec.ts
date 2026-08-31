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

test("certifications presents the client-supplied GCA membership certificate", async ({
  page,
}) => {
  await page.goto("/certifications");

  const certificate = page.getByRole("img", {
    name: /guam contractors association certificate of membership/i,
  });

  await expect(certificate).toBeVisible();
  await expect(
    page.getByRole("link", { name: /view full certificate/i }),
  ).toHaveAttribute(
    "href",
    "/images/credentials/gca-membership-certificate-2026.jpeg",
  );
  expect(
    await certificate.evaluate(
      (image) => image instanceof HTMLImageElement && image.naturalWidth > 0,
    ),
  ).toBe(true);

  const headingFitsPanel = await page
    .locator(".membership-certificate__content h3")
    .evaluate((heading) => {
      const panel = heading.parentElement;
      if (!panel) return false;

      const headingRect = heading.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      return headingRect.left >= panelRect.left && headingRect.right <= panelRect.right;
    });

  expect(headingFitsPanel).toBe(true);
});

test("certifications is identified as the current navigation destination", async ({
  isMobile,
  page,
}) => {
  await page.goto("/certifications");

  if (isMobile) {
    const menu = page.locator("details.mobile-navigation");
    await menu.locator("summary").click();
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Certifications", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    return;
  }

  await expect(
    page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("link", { name: "Certifications", exact: true }),
  ).toHaveAttribute("aria-current", "page");
});

test("contact exposes the validated general inquiry workflow", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page.getByRole("heading", { name: "Send a message to CTS Pacific." }),
  ).toBeVisible();
  await expect(page.getByLabel("Inquiry type")).toBeVisible();

  await page.getByRole("button", { name: "Send inquiry" }).click();

  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Select an inquiry type.")).toBeVisible();
});

test("access control presents the VCE Pacific hotel-lock partnership", async ({
  page,
}) => {
  await page.goto("/services/access-control");

  await expect(
    page.getByRole("heading", {
      name: /hotel locking coordinated with a guam security specialist/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "VCE Pacific logo" })).toBeVisible();
  await expect(page.getByRole("link", { name: /visit vce pacific/i })).toHaveAttribute(
    "href",
    "https://www.vcepacific.com/",
  );
});
