import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminLeadNavLink } from "@/components/admin/admin-lead-nav-link";

describe("AdminLeadNavLink", () => {
  it("hides the notification badge when no new leads exist", () => {
    render(<AdminLeadNavLink newLeadCount={0} />);

    expect(screen.getByRole("link", { name: "Leads" })).toBeInTheDocument();
    expect(screen.queryByText(/new leads?/i)).not.toBeInTheDocument();
  });

  it("announces and displays the combined new-lead count", () => {
    render(<AdminLeadNavLink newLeadCount={7} />);

    expect(screen.getByRole("link", { name: "Leads, 7 new leads" })).toBeInTheDocument();
    expect(screen.getByText("7", { selector: "span[aria-hidden='true']" })).toBeInTheDocument();
  });

  it("caps the visible badge while preserving the accessible total", () => {
    render(<AdminLeadNavLink newLeadCount={124} />);

    expect(screen.getByRole("link", { name: "Leads, 124 new leads" })).toBeInTheDocument();
    expect(screen.getByText("99+", { selector: "span[aria-hidden='true']" })).toBeInTheDocument();
  });
});
