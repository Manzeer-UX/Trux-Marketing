import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export const metadata: Metadata = {
  title: "TRUX Blog | Truck Parking and Driver Resources",
  description:
    "Read the latest TRUX news, truck driving information, parking guides, and industry resources.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader activeItem="Blog" />
      <main aria-label="TRUX blog" className="bg-midnight">
        <BlogListing />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
