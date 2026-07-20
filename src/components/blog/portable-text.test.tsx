import { render, screen } from "@testing-library/react";
import type { BLOG_POST_QUERY_RESULT } from "@/sanity/types";
import { BlogPortableText } from "./portable-text";

const bodyFixture = [
  {
    _key: "heading",
    _type: "block",
    style: "h2",
    markDefs: [],
    children: [
      {
        _key: "heading-span",
        _type: "span",
        marks: [],
        text: "Choose the right location",
      },
    ],
  },
  {
    _key: "list",
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [
      {
        _key: "fmcsa-link",
        _type: "link",
        href: "https://www.fmcsa.dot.gov/",
        openInNewTab: true,
      },
    ],
    children: [
      {
        _key: "list-span",
        _type: "span",
        marks: ["fmcsa-link"],
        text: "FMCSA",
      },
    ],
  },
  {
    _key: "article-image",
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
    alt: "Secure parking entrance",
    caption: "A well-lit TRUX parking entrance.",
  },
] satisfies NonNullable<BLOG_POST_QUERY_RESULT>["body"];

it("renders headings, lists, safe external links, and article images", () => {
  render(<BlogPortableText value={bodyFixture} />);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Choose the right location",
  );
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "FMCSA" })).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  expect(
    screen.getByRole("img", { name: "Secure parking entrance" }),
  ).toBeVisible();
});
