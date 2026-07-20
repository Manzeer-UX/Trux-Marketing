import { render, screen } from "@testing-library/react";
import { BlogListing, parseBlogPage } from "./blog-listing";

const posts = [
  {
    _id: "post-1",
    title: "Safe Parking Guide",
    slug: "safe-parking-guide",
    excerpt: "How to choose a secure truck parking location.",
    publishedAt: "2026-07-17T12:00:00.000Z",
    category: { title: "Driver Resources", slug: "driver-resources" },
    coverImage: {
      image: { asset: null, crop: null, hotspot: null },
      alt: "Safe truck parking at night",
      caption: null,
    },
  },
];

it("normalizes invalid page values to page one", () => {
  expect(parseBlogPage(undefined)).toBe(1);
  expect(parseBlogPage("-4")).toBe(1);
  expect(parseBlogPage("abc")).toBe(1);
  expect(parseBlogPage("3")).toBe(3);
});

it("renders fetched posts and functional pagination", () => {
  render(<BlogListing posts={posts} currentPage={2} totalPages={3} />);

  expect(
    screen.getByRole("link", { name: /Read Safe Parking Guide/i }),
  ).toHaveAttribute("href", "/blog/safe-parking-guide");
  expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
    "href",
    "/blog?page=1",
  );
  expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
    "href",
    "/blog?page=3",
  );
});

it("renders a clear empty state", () => {
  render(<BlogListing posts={[]} currentPage={1} totalPages={0} />);

  expect(
    screen.getByText("No blog posts have been published yet."),
  ).toBeVisible();
});
