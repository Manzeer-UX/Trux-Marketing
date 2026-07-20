import { render, screen, within } from "@testing-library/react";
import type { Mock } from "vitest";
import { sanityFetch } from "@/sanity/lib/live";
import BlogPage from "./page";

const fetchMock = sanityFetch as unknown as Mock;
const response = (data: unknown) => ({ data, sourceMap: null, tags: [] });

const posts = [
  {
    _id: "post-1",
    title: "Safe Parking Guide",
    slug: "safe-parking-guide",
    excerpt: "How to choose secure truck parking.",
    publishedAt: "2026-07-17T12:00:00.000Z",
    category: { title: "Driver Resources", slug: "driver-resources" },
    coverImage: {
      image: { asset: null, crop: null, hotspot: null },
      alt: "Safe truck parking at night",
      caption: null,
    },
  },
];

it("renders the Sanity blog grid and links fetched articles", async () => {
  fetchMock
    .mockReset()
    .mockResolvedValueOnce(response(posts))
    .mockResolvedValueOnce(response(1))
    .mockResolvedValueOnce(response(null));

  render(await BlogPage({ searchParams: Promise.resolve({}) }));

  const main = screen.getByRole("main", { name: "TRUX blog" });
  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  const blogNavigationLink = within(primaryNavigation).getByRole("link", {
    name: "Blog",
  });

  expect(blogNavigationLink).toHaveAttribute("href", "/blog");
  expect(blogNavigationLink).toHaveAttribute("aria-current", "page");
  expect(main).toHaveClass("bg-midnight");
  expect(within(main).getAllByRole("article")).toHaveLength(1);
  expect(
    within(main).getByRole("link", { name: /Read Safe Parking Guide/i }),
  ).toHaveAttribute("href", "/blog/safe-parking-guide");
  expect(
    screen.getByRole("navigation", { name: "Blog pagination" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toHaveClass(
    "wide:h-[368px]",
    "bg-midnight",
  );
});

it("renders the editor-managed empty state when no posts are published", async () => {
  fetchMock
    .mockReset()
    .mockResolvedValueOnce(response([]))
    .mockResolvedValueOnce(response(0))
    .mockResolvedValueOnce(response(null));

  render(await BlogPage({ searchParams: Promise.resolve({ page: "invalid" }) }));

  expect(
    screen.getByText("No blog posts have been published yet."),
  ).toBeVisible();
});
