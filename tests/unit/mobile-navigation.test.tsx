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
