import { afterEach, describe, expect, it, vi } from "vitest";

describe("Sanity public configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the configured TRUX Sanity project by default", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");

    const config = await import("./env");

    expect(config.projectId).toBe("aibxkdr2");
    expect(config.dataset).toBe("marketing_insights123");
    expect(config.apiVersion).toBe("2026-07-17");
  });

  it("allows deployment-specific public overrides", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "override-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "preview");

    const config = await import("./env");

    expect(config.projectId).toBe("override-project");
    expect(config.dataset).toBe("preview");
  });
});
