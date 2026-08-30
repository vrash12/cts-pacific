import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCta } from "@/components/marketing/project-cta";

describe("ProjectCta", () => {
  it("replaces the decorative route line with useful intake guidance", () => {
    const { container } = render(
      <ProjectCta
        description="Share the project requirements."
        title="Planning connected infrastructure?"
      />,
    );

    expect(
      screen.getByRole("list", { name: "Project request information" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Scope")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(container.querySelector(".network-motif")).not.toBeInTheDocument();
  });
});
