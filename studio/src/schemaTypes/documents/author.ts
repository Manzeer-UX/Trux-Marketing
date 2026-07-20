import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return "Slug is required.";
          return /^[a-z0-9-]+$/.test(value.current)
            ? true
            : "Use lowercase letters, numbers, and hyphens only.";
        }),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "image",
      title: "Profile image",
      type: "managedImage",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image.image",
    },
  },
});
