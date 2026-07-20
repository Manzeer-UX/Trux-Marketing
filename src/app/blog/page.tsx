import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, type BlogPostListing } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "TRUX Blog | Truck Parking and Driver Resources",
  description:
    "Read the latest TRUX news, truck driving information, parking guides, and industry resources.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const { data } = await sanityFetch({ query: POSTS_QUERY });
  const posts = data as BlogPostListing[];

  return (
    <>
      <SiteHeader activeItem="Blog" />
      <main aria-label="TRUX blog" className="bg-midnight">
        <BlogListing posts={posts} />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
