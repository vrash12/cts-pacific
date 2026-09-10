import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MobileNavigation } from "@/components/layout/mobile-navigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/services",
}));

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
] as const;

describe("MobileNavigation", () => {
  const nestedItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", children: [
      { label: "Fiber Optics", href: "/services/fiber-optics" },
    ] },
  ] as const;

  it("expands Services and closes both menus after choosing a service", async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNavigation items={nestedItems} />);
    const outer = container.querySelector("details.mobile-navigation")!;
    const services = container.querySelector("details.navigation-menu")!;
    await user.click(outer.querySelector("summary")!);
    await user.pointer({ keys: "[TouchA]", target: services.querySelector("summary")! });
    expect(outer).toHaveAttribute("open");
    expect(services).toHaveAttribute("open");
    expect(screen.getByRole("link", { name: "All services" })).toHaveAttribute("href", "/services");
    await user.click(screen.getByRole("link", { name: "Fiber Optics" }));
    expect(outer).not.toHaveAttribute("open");
    expect(services).not.toHaveAttribute("open");
  });

  it("opens Services on mouse hover inside the compact menu", async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNavigation items={nestedItems} />);
    const outer = container.querySelector("details.mobile-navigation")!;
    const services = container.querySelector("details.navigation-menu")!;
    await user.click(outer.querySelector("summary")!);
    await user.hover(services.querySelector("summary")!);
    expect(services).toHaveAttribute("open");
  });

  it("uses Escape to close the submenu before closing the entire menu", async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNavigation items={nestedItems} />);
    const outer = container.querySelector("details.mobile-navigation")!;
    const services = container.querySelector("details.navigation-menu")!;
    await user.click(outer.querySelector("summary")!);
    // The browser handles opening details with Enter; jsdom needs an open fixture.
    services.setAttribute("open", "");
    services.querySelector("summary")!.focus();
    await user.keyboard("{Escape}");
    expect(outer).toHaveAttribute("open");
    expect(services).not.toHaveAttribute("open");
    expect(services.querySelector("summary")).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(outer).not.toHaveAttribute("open");
    expect(outer.querySelector("summary")).toHaveFocus();
  });

  it("marks the current page for assistive technology", () => {
    render(<MobileNavigation items={navigationItems} />);

    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("closes immediately when a navigation link is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNavigation items={navigationItems} />);
    const details = container.querySelector("details");

    expect(details).not.toBeNull();
    if (!details) return;

    details.open = true;
    await user.click(screen.getByRole("link", { name: "Home" }));

    expect(details.open).toBe(false);
  });

  it("closes on Escape and restores focus to its summary", async () => {
    const user = userEvent.setup();
    const { container } = render(<MobileNavigation items={navigationItems} />);
    const details = container.querySelector("details");
    const summary = screen.getByText("Menu").closest("summary");

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
