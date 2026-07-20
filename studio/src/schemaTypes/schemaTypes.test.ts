import { describe, expect, it } from "vitest";
import { schemaTypes } from ".";

const findType = (name: string) =>
  schemaTypes.find((schemaType) => schemaType.name === name);

describe("Sanity schema registry", () => {
  it("registers the complete blog and website image model", () => {
    expect(schemaTypes.map(({ name }) => name)).toEqual([
      "managedImage",
      "managedDecorativeImage",
      "articleImage",
      "seo",
      "author",
      "category",
      "blogPost",
      "websiteImages",
    ]);
  });

  it("models author and category as references on blog posts", () => {
    const post = findType("blogPost");
    const fields = post && "fields" in post ? post.fields : [];
    const author = fields?.find((field) => field.name === "author");
    const category = fields?.find((field) => field.name === "category");

    expect(author?.type).toBe("reference");
    expect(author && "to" in author ? author.to : undefined).toEqual([
      { type: "author" },
    ]);
    expect(category?.type).toBe("reference");
    expect(category && "to" in category ? category.to : undefined).toEqual([
      { type: "category" },
    ]);
  });

  it("groups every approved website image area in the singleton", () => {
    const websiteImages = findType("websiteImages");
    const fields =
      websiteImages && "fields" in websiteImages ? websiteImages.fields : [];

    expect(fields?.map(({ name }) => name)).toEqual([
      "brand",
      "home",
      "about",
      "partners",
      "lotOwners",
      "locations",
      "blogDefaults",
    ]);
  });
});
