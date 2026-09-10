import { render, screen, waitFor } from "@testing-library/react";
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
  it("opens on mouse hover, stays open across its links, and closes after leaving", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details")!;
    const summary = details.querySelector("summary")!;

    await user.hover(summary);
    expect(details.open).toBe(true);
    await user.hover(screen.getByRole("link", { name: "Fiber Optics" }));
    expect(details.open).toBe(true);
    await user.unhover(details);
    await waitFor(() => expect(details.open).toBe(false));
  });

  it("keeps the hover-opened menu available when the trigger is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details")!;
    const summary = details.querySelector("summary")!;

    await user.hover(summary);
    await user.click(summary);
    expect(details.open).toBe(true);
    await user.click(document.body);
    expect(details.open).toBe(false);
  });

  it("supports touch taps without opening on touch contact", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ServicesNavigationMenu href="/services" label="Services">
        {services}
      </ServicesNavigationMenu>,
    );
    const details = container.querySelector("details")!;
    const summary = details.querySelector("summary")!;

    await user.pointer({ keys: "[TouchA>]", target: summary });
    expect(details.open).toBe(false);
    await user.pointer({ keys: "[/TouchA]", target: summary });
    expect(details.open).toBe(true);
    await user.pointer({ keys: "[TouchA]", target: summary });
    expect(details.open).toBe(false);
  });

  it("keeps keyboard navigation inside the open menu until focus leaves", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <ServicesNavigationMenu href="/services" label="Services">
          {services}
        </ServicesNavigationMenu>
        <button>Next item</button>
      </>,
    );
    const details = container.querySelector("details")!;
    // jsdom does not implement the summary's native Enter-key activation.
    details.open = true;
    details.querySelector("summary")!.focus();
    await user.tab();
    expect(screen.getByRole("link", { name: "All services" })).toHaveFocus();
    expect(details.open).toBe(true);
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Next item" })).toHaveFocus();
    expect(details.open).toBe(false);
  });

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
