import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ProjectNavigator } from "@/components/marketing/project-navigator";

describe("ProjectNavigator", () => {
  it("updates the recommended capability when a project need is selected", async () => {
    const user = userEvent.setup();

    render(<ProjectNavigator />);

    expect(screen.getByRole("heading", { name: "Fiber Optics" })).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /add cameras or remote viewing/i }),
    );

    expect(screen.getByRole("heading", { name: "CCTV Systems" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore cctv systems/i })).toHaveAttribute(
      "href",
      "/services/cctv",
    );
  });
});
