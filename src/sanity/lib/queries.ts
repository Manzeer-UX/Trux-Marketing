import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageObject } from "@sanity/image-url";
import { defineQuery } from "next-sanity";

export type BlogImage = SanityImageObject & {
  alt?: string | null;
};

export interface BlogPostListing {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  mainImage?: BlogImage | null;
  author?: {
    name?: string | null;
  } | null;
  categories?: Array<{
    title?: string | null;
  }> | null;
}

export interface BlogPost extends Omit<
  BlogPostListing,
  "author" | "categories"
> {
  body?: PortableTextBlock[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  author?: {
    _id?: string;
    name?: string | null;
    role?: string | null;
    image?: BlogImage | null;
  } | null;
  categories?: Array<{
    _id?: string;
    title?: string | null;
    slug?: string | null;
  }> | null;
}

export type FAQPageType = "lot-owners" | "drivers";

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order?: number | null;
  pageType: FAQPageType;
}

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage {alt, asset, crop, hotspot},
    excerpt,
    publishedAt,
    "author": author->{name},
    "categories": categories[]->{title}
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage {alt, asset, crop, hotspot},
    excerpt,
    publishedAt,
    body,
    "author": author->{
      _id,
      name,
      role,
      image {alt, asset, crop, hotspot}
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    seoTitle,
    seoDescription
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`);

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq" && pageType == $pageType]
  | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    question,
    answer,
    order,
    pageType
  }
`);
