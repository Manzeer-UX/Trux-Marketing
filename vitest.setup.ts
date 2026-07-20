import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn().mockResolvedValue({
    data: null,
    sourceMap: null,
    tags: [],
  }),
  SanityLive: () => null,
}));
