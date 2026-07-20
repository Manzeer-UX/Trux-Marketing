import { SearchIcon } from "@sanity/icons/Search";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search and social sharing",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Keep SEO titles at 60 characters or fewer."),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .max(160)
          .warning("Keep SEO descriptions at 160 characters or fewer."),
    }),
    defineField({
      name: "image",
      title: "Social sharing image",
      type: "managedImage",
    }),
  ],
});
