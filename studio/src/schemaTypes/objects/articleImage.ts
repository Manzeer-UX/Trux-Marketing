import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const articleImage = defineType({
  name: "articleImage",
  title: "Article image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image file",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) =>
        rule.required().min(1).error("Alternative text is required."),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "alt",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || subtitle || "Article image",
        subtitle: title ? subtitle : undefined,
        media,
      };
    },
  },
});
