import { ImagesIcon } from "@sanity/icons/Images";
import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
} from "sanity";

type ImageFieldType = "managedImage" | "managedDecorativeImage";

function imageField(
  name: string,
  title: string,
  type: ImageFieldType,
): FieldDefinition {
  return defineField({ name, title, type });
}

export const websiteImages = defineType({
  name: "websiteImages",
  title: "Website images",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "brand",
      title: "Brand and global",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        imageField("headerLogo", "Header logo", "managedImage"),
        imageField("footerLogo", "Footer logo", "managedImage"),
        imageField(
          "facebookIcon",
          "Facebook icon",
          "managedDecorativeImage",
        ),
        imageField(
          "linkedInIcon",
          "LinkedIn icon",
          "managedDecorativeImage",
        ),
        imageField(
          "instagramIcon",
          "Instagram icon",
          "managedDecorativeImage",
        ),
      ],
    }),
    defineField({
      name: "home",
      title: "Home",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField("coverageMap", "Coverage map", "managedImage"),
        imageField("phoneApp", "Phone application image", "managedImage"),
        imageField(
          "secureFeatureIcon",
          "Secure feature icon",
          "managedDecorativeImage",
        ),
        imageField(
          "easyFeatureIcon",
          "Easy feature icon",
          "managedDecorativeImage",
        ),
        imageField(
          "availabilityFeatureIcon",
          "Availability feature icon",
          "managedDecorativeImage",
        ),
        imageField(
          "serviceFeatureIcon",
          "Service feature icon",
          "managedDecorativeImage",
        ),
      ],
    }),
    defineField({
      name: "about",
      title: "About",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField("heroImage", "Hero image", "managedImage"),
        imageField(
          "teamDecoration",
          "Team decorative image",
          "managedDecorativeImage",
        ),
      ],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField("heroImage", "Hero image", "managedImage"),
        imageField("otrImage", "OTR Solutions image", "managedImage"),
        imageField(
          "marqueeImage",
          "Marquee Insurance image",
          "managedImage",
        ),
        imageField("esImage", "ES Advantage image", "managedImage"),
      ],
    }),
    defineField({
      name: "lotOwners",
      title: "Lot Owners",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField(
          "revenueIcon",
          "Revenue benefit icon",
          "managedDecorativeImage",
        ),
        imageField(
          "staffingIcon",
          "Staffing benefit icon",
          "managedDecorativeImage",
        ),
        imageField(
          "paymentsIcon",
          "Payments benefit icon",
          "managedDecorativeImage",
        ),
        imageField(
          "tenantsIcon",
          "Tenants benefit icon",
          "managedDecorativeImage",
        ),
      ],
    }),
    defineField({
      name: "locations",
      title: "Locations",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField("primaryPhoto", "Default primary photo", "managedImage"),
        defineField({
          name: "gallery",
          title: "Default gallery",
          type: "array",
          of: [defineArrayMember({ type: "managedImage" })],
          validation: (rule) => rule.max(12),
        }),
      ],
    }),
    defineField({
      name: "blogDefaults",
      title: "Blog defaults",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        imageField("emptyStateImage", "Empty-state image", "managedImage"),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Website images" };
    },
  },
});
