import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactRequestForm } from "@/components/forms/contact-request-form";

describe("ContactRequestForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows accessible validation errors for an empty submission", async () => {
    const user = userEvent.setup();

    render(<ContactRequestForm />);
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));

    expect(await screen.findByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Select an inquiry type.")).toBeInTheDocument();
  });

  it("submits valid inquiry data and presents the returned reference", async () => {
    const user = userEvent.setup();
    const request = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          referenceNumber: "CTC-20260830-CB53EA7B",
        }),
        { status: 201 },
      ),
    );

    render(<ContactRequestForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jordan Santos" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "jordan@example.com" },
    });
    await user.selectOptions(screen.getByLabelText("Inquiry type"), "general");
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "General company inquiry" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: {
        value:
          "Please let me know who can discuss an upcoming coordination requirement.",
      },
    });
    await user.click(screen.getByRole("button", { name: "Send inquiry" }));

    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(
      await screen.findByText("CTC-20260830-CB53EA7B"),
    ).toBeInTheDocument();
    expect(screen.getByText("Your message is in the system.")).toBeInTheDocument();
  });
});
