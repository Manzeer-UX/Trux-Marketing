import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const managedImage = defineType({
  name: "managedImage",
  title: "Image",
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
      description: "Describe the image for visitors who cannot see it.",
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
      title: "alt",
      subtitle: "caption",
      media: "image",
    },
  },
});
