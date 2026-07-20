import { render, screen, within } from "@testing-library/react";
import type { Mock } from "vitest";
import { sanityFetch } from "@/sanity/lib/live";
import BlogDetailPage, {
  generateMetadata,
  generateStaticParams,
} from "./page";

const fetchMock = sanityFetch as unknown as Mock;
const response = (data: unknown) => ({ data, sourceMap: null, tags: [] });

const post = {
  _id: "post-1",
  title: "Freight Broker vs. Dispatcher: What’s the Difference?",
  slug: "freight-broker-vs-dispatcher",
  excerpt: "Understand who represents drivers and how each role gets paid.",
  publishedAt: "2024-11-11T12:00:00.000Z",
  category: {
    title: "Truck Driving Information",
    slug: "truck-driving-information",
  },
  author: {
    name: "Lando Norris",
    slug: "lando-norris",
    role: "Product Designer",
    image: {
      image: { asset: null, crop: null, hotspot: null },
      alt: "Lando Norris",
      caption: null,
    },
  },
  coverImage: {
    image: { asset: null, crop: null, hotspot: null },
    alt: "Truck driver reviewing a freight contract",
    caption: null,
  },
  body: [
    {
      _key: "heading-2",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "heading-2-span",
          _type: "span",
          marks: [],
          text: "Why the Difference Matters to Professional Drivers",
        },
      ],
    },
    {
      _key: "heading-3",
      _type: "block",
      style: "h3",
      markDefs: [],
      children: [
        {
          _key: "heading-3-span",
          _type: "span",
          marks: [],
          text: "What Is a Freight Broker?",
        },
      ],
    },
    {
      _key: "body-image",
      _type: "articleImage",
      image: {
        asset: {
          _id: "image-abc123-768x480-png",
          url: "https://cdn.sanity.io/images/aibxkdr2/marketing_insights123/abc123-768x480.png",
          metadata: {
            lqip: null,
            dimensions: { width: 768, height: 480 },
          },
        },
        crop: null,
        hotspot: null,
      },
      alt: "Freight truck at a loading dock",
      caption: null,
    },
  ],
  seo: null,
};

it("opens a Sanity blog detail screen using the article layout", async () => {
  fetchMock
    .mockReset()
    .mockResolvedValueOnce(response(post))
    .mockResolvedValueOnce(response(null));

  const page = await BlogDetailPage({
    params: Promise.resolve({ slug: post.slug }),
  });
  render(page);

  const main = screen.getByRole("main", { name: "TRUX blog article" });
  expect(main).toHaveClass("bg-midnight");
  expect(
    screen.getByRole("heading", { level: 1, name: post.title }),
  ).toBeInTheDocument();
  expect(screen.getByText("Nov 11, 2024")).toBeInTheDocument();
  expect(screen.getByText("Lando Norris")).toBeInTheDocument();
  expect(screen.getByText("Product Designer")).toBeInTheDocument();

  const article = screen.getByRole("article");
  expect(article).toHaveClass("max-w-[768px]", "wide:py-24");
  expect(
    within(article).getByRole("heading", {
      level: 2,
      name: "Why the Difference Matters to Professional Drivers",
    }),
  ).toBeInTheDocument();
  expect(
    within(article).getByRole("heading", {
      level: 3,
      name: "What Is a Freight Broker?",
    }),
  ).toBeInTheDocument();
  expect(
    within(article).getByRole("img", {
      name: "Freight truck at a loading dock",
    }),
  ).toBeVisible();
});

it("builds post-specific metadata from Sanity SEO fields", async () => {
  fetchMock.mockReset().mockResolvedValueOnce(
    response({
      title: post.title,
      excerpt: post.excerpt,
      seo: {
        title: "Freight Roles Explained",
        description: "A guide to freight brokers and dispatchers.",
        image: null,
      },
    }),
  );

  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: post.slug }),
  });

  expect(metadata.title).toBe("Freight Roles Explained | TRUX Blog");
  expect(metadata.description).toBe(
    "A guide to freight brokers and dispatchers.",
  );
  expect(metadata.alternates).toEqual({ canonical: `/blog/${post.slug}` });
});

it("generates published routes from Sanity slugs", async () => {
  const slugs = [{ slug: post.slug }];
  fetchMock.mockReset().mockResolvedValueOnce(response(slugs));

  await expect(generateStaticParams()).resolves.toEqual(slugs);
});
