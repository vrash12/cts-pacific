import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { QuoteRequestForm } from "@/components/forms/quote-request-form";

describe("QuoteRequestForm", () => {
  it("validates the current step before advancing", async () => {
    const user = userEvent.setup();

    render(<QuoteRequestForm />);

    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Select at least one service.")).toBeInTheDocument();
    expect(screen.getByText("What do you need?")).toBeInTheDocument();
  });

  it("advances after a service is selected", async () => {
    const user = userEvent.setup();

    render(<QuoteRequestForm />);

    await user.click(screen.getByRole("checkbox", { name: /fiber optics/i }));
    await user.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByText("Project information")).toBeInTheDocument();
    expect(screen.getByLabelText("Project location")).toBeInTheDocument();
  });
});
