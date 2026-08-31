import { describe, expect, it } from "vitest";

import { isPathActive } from "@/lib/navigation";

describe("isPathActive", () => {
  it("matches a section and its child routes", () => {
    expect(isPathActive("/services", "/services")).toBe(true);
    expect(isPathActive("/services/fiber-optics", "/services")).toBe(true);
    expect(isPathActive("/certifications", "/services")).toBe(false);
  });

  it("only marks Home on the root route", () => {
    expect(isPathActive("/", "/")).toBe(true);
    expect(isPathActive("/about", "/")).toBe(false);
  });
});
