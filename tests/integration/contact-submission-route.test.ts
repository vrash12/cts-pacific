import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/config/env/server", () => ({
  readServerEnvironment: vi.fn(() => ({})),
}));

vi.mock("@/server/db/client", () => ({
  getDatabase: vi.fn(),
}));

vi.mock("@/server/email/resend", () => ({
  sendEmail: vi.fn(),
}));

import { POST } from "@/app/api/contact-submissions/route";

describe("POST /api/contact-submissions", () => {
  it("rejects malformed submissions before database or email access", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact-submissions", {
        method: "POST",
        body: JSON.stringify({ email: "invalid" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ ok: false });
  });

  it("accepts populated honeypot submissions without processing them", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact-submissions", {
        method: "POST",
        body: JSON.stringify({ website: "https://spam.example" }),
        headers: { "Content-Type": "application/json" },
      }),
    );

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({
      ok: true,
      referenceNumber: "RECEIVED",
    });
  });
});
