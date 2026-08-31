import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ServicesNavigationMenu } from "@/components/layout/services-navigation-menu";

vi.mock("next/navigation", () => ({
  usePathname: () => "/services/fiber-optics",
}));

const services = [
  { label: "Fiber Optics", href: "/services/fiber-optics", group: "Core infrastructure" },
  { label: "Maintenance", href: "/services/maintenance", group: "Technical support & systems" },
] as const;

describe("ServicesNavigationMenu", () => {
  it("marks Services as current on a service detail page", () => {
    render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );

    expect(screen.getByText("Services").closest("summary")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("closes immediately after a service option is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details");

    expect(details).not.toBeNull();
    if (!details) return;

    details.open = true;
    await user.click(screen.getByRole("link", { name: "Fiber Optics" }));

    expect(details.open).toBe(false);
  });

  it("presents core and additional services as separate groups", () => {
    render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );

    expect(screen.getByText("Core infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Technical support & systems")).toBeInTheDocument();
  });

  it("also closes after All services is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details");

    expect(details).not.toBeNull();
    if (!details) return;

    details.open = true;
    await user.click(screen.getByRole("link", { name: "All services" }));

    expect(details.open).toBe(false);
  });

  it("closes on Escape and returns focus to the summary", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details");
    const summary = screen.getByText("Services").closest("summary");

    expect(details).not.toBeNull();
    expect(summary).not.toBeNull();
    if (!details || !summary) return;

    details.open = true;
    summary.focus();
    await user.keyboard("{Escape}");

    expect(details.open).toBe(false);
    expect(summary).toHaveFocus();
  });
});
