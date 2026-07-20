import type { Metadata } from "next";
import {
  BlogListing,
  parseBlogPage,
  POSTS_PER_PAGE,
} from "@/components/blog/blog-listing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import {
  BLOG_PAGE_IMAGES_QUERY,
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_QUERY,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "TRUX Blog | Truck Parking and Driver Resources",
  description:
    "Read the latest TRUX news, truck driving information, parking guides, and industry resources.",
  alternates: { canonical: "/blog" },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const pageParam = (await searchParams).page;
  const page = parseBlogPage(
    Array.isArray(pageParam) ? pageParam[0] : pageParam,
  );
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [
    { data: posts },
    { data: total },
    { data: websiteImages },
  ] = await Promise.all([
    sanityFetch({
      query: BLOG_POSTS_QUERY,
      params: { start, end },
    }),
    sanityFetch({ query: BLOG_POSTS_COUNT_QUERY }),
    sanityFetch({ query: BLOG_PAGE_IMAGES_QUERY }),
  ]);

  const brand = websiteImages?.brand;
  const totalPages = Math.ceil((total || 0) / POSTS_PER_PAGE);

  return (
    <>
      <SiteHeader activeItem="Blog" logo={brand?.headerLogo} />
      <main aria-label="TRUX blog" className="bg-midnight">
        <BlogListing
          posts={posts}
          currentPage={page}
          totalPages={totalPages}
          emptyStateImage={websiteImages?.blogDefaults?.emptyStateImage}
        />
      </main>
      <SiteFooter
        activeItem={null}
        logo={brand?.footerLogo}
        socialIcons={{
          facebook: brand?.facebookIcon,
          linkedIn: brand?.linkedInIcon,
          instagram: brand?.instagramIcon,
        }}
      />
    </>
  );
}
