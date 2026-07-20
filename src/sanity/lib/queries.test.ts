import { describe, expect, it } from "vitest";
import {
  ABOUT_PAGE_IMAGES_QUERY,
  BLOG_POST_QUERY,
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_SLUGS_QUERY,
  GLOBAL_WEBSITE_IMAGES_QUERY,
  HOME_PAGE_IMAGES_QUERY,
  LOCATIONS_PAGE_IMAGES_QUERY,
} from "./queries";

describe("Sanity query contracts", () => {
  it("filters, orders, and slices published blog summaries", () => {
    expect(BLOG_POSTS_QUERY).toContain('_type == "blogPost"');
    expect(BLOG_POSTS_QUERY).toContain("publishedAt <= now()");
    expect(BLOG_POSTS_QUERY).toContain(
      "order(publishedAt desc, _id asc)[$start...$end]",
    );
    expect(BLOG_POSTS_COUNT_QUERY).toContain("count(");
  });

  it("uses a parameterized post slug and explicit singleton ID", () => {
    expect(BLOG_POST_QUERY).toContain("slug.current == $slug");
    expect(BLOG_SLUGS_QUERY).toContain('"slug": slug.current');
    expect(GLOBAL_WEBSITE_IMAGES_QUERY).toContain('_id == "websiteImages"');
  });

  it("projects only the image groups required by each page", () => {
    expect(HOME_PAGE_IMAGES_QUERY).toContain("home {");
    expect(ABOUT_PAGE_IMAGES_QUERY).toContain("about {");
    expect(LOCATIONS_PAGE_IMAGES_QUERY).toContain("locations {");
    expect(HOME_PAGE_IMAGES_QUERY).not.toContain("lotOwners {");
  });
});
