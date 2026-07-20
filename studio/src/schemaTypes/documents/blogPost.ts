import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return "Slug is required.";
          return /^[a-z0-9-]+$/.test(value.current)
            ? true
            : "Use lowercase letters, numbers, and hyphens only.";
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) =>
        rule
          .required()
          .max(220)
          .warning("Keep excerpts at 220 characters or fewer."),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "managedImage",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "articleImage" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [
        { field: "publishedAt", direction: "desc" },
        { field: "_id", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      publishedAt: "publishedAt",
      media: "coverImage.image",
    },
    prepare({ title, category, publishedAt, media }) {
      const date = publishedAt
        ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
            new Date(publishedAt),
          )
        : "No publication date";
      return {
        title,
        subtitle: [category, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
