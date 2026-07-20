import { author } from "./documents/author";
import { blogPost } from "./documents/blogPost";
import { category } from "./documents/category";
import { websiteImages } from "./documents/websiteImages";
import { articleImage } from "./objects/articleImage";
import { managedDecorativeImage } from "./objects/managedDecorativeImage";
import { managedImage } from "./objects/managedImage";
import { seo } from "./objects/seo";

export const schemaTypes = [
  managedImage,
  managedDecorativeImage,
  articleImage,
  seo,
  author,
  category,
  blogPost,
  websiteImages,
];
