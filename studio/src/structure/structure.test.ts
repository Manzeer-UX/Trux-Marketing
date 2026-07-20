import { describe, expect, it } from "vitest";
import { SINGLETON_TYPES } from ".";

describe("Studio singleton structure", () => {
  it("uses a fixed websiteImages singleton only", () => {
    expect(SINGLETON_TYPES).toEqual(["websiteImages"]);
  });
});
