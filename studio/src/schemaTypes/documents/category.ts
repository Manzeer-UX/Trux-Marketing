import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
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
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
});
