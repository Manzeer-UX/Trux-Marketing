import { render, screen } from "@testing-library/react";
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

it("renders an individual post returned by Sanity", async () => {
  sanityFetch.mockResolvedValueOnce({
    data: {
      _id: "sanity-detail-post",
      title: "Sanity detail post",
      slug: "sanity-detail-post",
      excerpt: "A Sanity summary.",
      publishedAt: "2026-07-20T12:00:00.000Z",
      mainImage: null,
      categories: [{ title: "Truck Driving Information" }],
      author: {
        name: "Sanity Author",
        role: "Editor",
        image: null,
      },
      body: [
        {
          _key: "paragraph-1",
          _type: "block",
          children: [
            { _key: "span-1", _type: "span", marks: [], text: "Sanity body content." },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    },
  });

  const blogDetailPageModule = await import("./page");
  render(
    await blogDetailPageModule.default({
      params: Promise.resolve({ slug: "sanity-detail-post" }),
    }),
  );

  expect(
    screen.getByRole("heading", { level: 1, name: "Sanity detail post" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Sanity Author")).toBeInTheDocument();
  expect(screen.getByText("Editor")).toBeInTheDocument();
  expect(screen.getByText("Sanity body content.")).toBeInTheDocument();
  expect(sanityFetch).toHaveBeenCalledOnce();
});

it("uses Sanity SEO fields and the post image for metadata", async () => {
  sanityFetch.mockResolvedValueOnce({
    data: {
      _id: "sanity-detail-post",
      title: "Sanity detail post",
      slug: "sanity-detail-post",
      excerpt: "A Sanity summary.",
      seoTitle: "Sanity SEO title",
      seoDescription: "Sanity SEO description.",
      mainImage: {
        asset: { _ref: "image-test" },
        alt: "Sanity Open Graph image",
      },
    },
  });

  const blogDetailPageModule = await import("./page");
  const metadata = await blogDetailPageModule.generateMetadata({
    params: Promise.resolve({ slug: "sanity-detail-post" }),
  });

  expect(metadata.title).toBe("Sanity SEO title | TRUX Blog");
  expect(metadata.description).toBe("Sanity SEO description.");
  expect(metadata.openGraph).toMatchObject({
    images: ["https://cdn.sanity.io/images/test.jpg"],
  });
});
