import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ServicesSlideshow } from "@/components/marketing/services-slideshow";
import { homepageServices } from "@/config/homepage";

function installMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  );
}

function renderSlideshow() {
  return render(
    <StrictMode>
      <h2 id="services-heading">One team. Complete infrastructure capability.</h2>
      <ServicesSlideshow headingId="services-heading" services={homepageServices} />
    </StrictMode>,
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("ServicesSlideshow", () => {
  it("exposes carousel semantics and supports direct, next, and previous controls", async () => {
    installMatchMedia(false);
    const user = userEvent.setup();
    renderSlideshow();

    expect(
      screen.getByRole("region", {
        name: "One team. Complete infrastructure capability.",
      }),
    ).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getAllByRole("group", { name: /of 6:/i })).toHaveLength(6);
    expect(
      screen.getByRole("button", { name: /show fiber optics, slide 1 of 6/i }),
    ).toHaveAttribute("aria-current", "true");

    await user.click(screen.getByRole("button", { name: "Show next service" }));
    expect(
      screen.getByRole("button", { name: /show data cabling, slide 2 of 6/i }),
    ).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Explore Data Cabling" })).toHaveAttribute(
      "href",
      "/services/data-cabling",
    );

    await user.click(screen.getByRole("button", { name: "Show previous service" }));
    await user.click(screen.getByRole("button", { name: "Show previous service" }));
    expect(
      screen.getByRole("button", {
        name: /show civil & underground works, slide 6 of 6/i,
      }),
    ).toHaveAttribute("aria-current", "true");

    expect(screen.queryByRole("button", { name: /pause slideshow/i })).not.toBeInTheDocument();
  });
});
