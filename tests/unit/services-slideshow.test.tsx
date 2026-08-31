import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ServicesSlideshow } from "@/components/marketing/services-slideshow";
import { homepageServices } from "@/config/homepage";

const AUTOPLAY_INTERVAL_MS = 7_000;

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
  it("exposes carousel semantics and supports direct, next, previous, and pause controls", async () => {
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

    await user.click(screen.getByRole("button", { name: "Pause slideshow" }));
    expect(screen.getByRole("button", { name: "Play slideshow" })).toBeVisible();
  });

  it("autoplays once per interval and pauses while the pointer is over the carousel", () => {
    installMatchMedia(false);
    vi.useFakeTimers();
    renderSlideshow();

    const carousel = screen.getByRole("region", {
      name: "One team. Complete infrastructure capability.",
    });

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(
      screen.getByRole("button", { name: /show data cabling, slide 2 of 6/i }),
    ).toHaveAttribute("aria-current", "true");

    fireEvent.pointerEnter(carousel);
    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(
      screen.getByRole("button", { name: /show data cabling, slide 2 of 6/i }),
    ).toHaveAttribute("aria-current", "true");

    fireEvent.pointerLeave(carousel);
    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(
      screen.getByRole("button", { name: /show cctv systems, slide 3 of 6/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("pauses when keyboard focus enters and resumes after an explicit play action", () => {
    installMatchMedia(false);
    vi.useFakeTimers();
    renderSlideshow();

    const pauseButton = screen.getByRole("button", { name: "Pause slideshow" });
    fireEvent.focus(pauseButton);

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(
      screen.getByRole("button", { name: /show fiber optics, slide 1 of 6/i }),
    ).toHaveAttribute("aria-current", "true");

    fireEvent.click(pauseButton);
    fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }));

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS));
    expect(
      screen.getByRole("button", { name: /show data cabling, slide 2 of 6/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("disables autoplay when reduced motion is requested", () => {
    installMatchMedia(true);
    vi.useFakeTimers();
    renderSlideshow();

    expect(
      screen.getByRole("button", {
        name: "Autoplay disabled by reduced-motion preference",
      }),
    ).toBeDisabled();

    act(() => vi.advanceTimersByTime(AUTOPLAY_INTERVAL_MS * 2));
    expect(
      screen.getByRole("button", { name: /show fiber optics, slide 1 of 6/i }),
    ).toHaveAttribute("aria-current", "true");
  });
});
