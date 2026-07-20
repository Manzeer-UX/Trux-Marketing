import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

const sanityFetch = vi.hoisted(() => vi.fn());

vi.mock("@/sanity/lib/live", () => ({ sanityFetch }));
vi.mock("@/sanity/lib/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({
        fit: () => ({ url: () => "https://cdn.sanity.io/images/test.jpg" }),
      }),
    }),
  }),
}));

it("renders posts returned by Sanity on the blog listing", async () => {
  sanityFetch.mockResolvedValueOnce({
    data: [
      {
        _id: "sanity-listing-post",
        title: "Sanity listing post",
        slug: "sanity-listing-post",
        excerpt: "This excerpt comes from Sanity.",
        publishedAt: "2026-07-20T12:00:00.000Z",
        categories: [{ title: "TRUX News" }],
        author: { name: "Sanity Author" },
        mainImage: null,
      },
    ],
  });

  const blogPageModule = await import("./page");
  render(await blogPageModule.default());

  const main = screen.getByRole("main", { name: "TRUX blog" });
  expect(within(main).getByText("Sanity listing post")).toBeInTheDocument();
  expect(
    within(main).getByText("This excerpt comes from Sanity."),
  ).toBeInTheDocument();
  expect(
    within(main).getByRole("link", { name: /read sanity listing post/i }),
  ).toHaveAttribute("href", "/blog/sanity-listing-post");
  expect(sanityFetch).toHaveBeenCalledOnce();
});
