import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const managedDecorativeImage = defineType({
  name: "managedDecorativeImage",
  title: "Decorative image",
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
      name: "description",
      title: "Studio description",
      type: "string",
      description:
        "This description helps editors identify the asset. The website renders decorative images with empty alternative text.",
    }),
  ],
  preview: {
    select: {
      title: "description",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Decorative image",
        media,
      };
    },
  },
});
