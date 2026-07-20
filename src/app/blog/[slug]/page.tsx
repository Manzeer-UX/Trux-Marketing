import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { sanityFetch } from "@/sanity/lib/live";
import {
  BLOG_METADATA_QUERY,
  BLOG_POST_QUERY,
  BLOG_SLUGS_QUERY,
  GLOBAL_WEBSITE_IMAGES_QUERY,
} from "@/sanity/lib/queries";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: BLOG_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: BLOG_METADATA_QUERY,
    params: { slug },
    stega: false,
  });

  if (!post) return {};

  const socialImage = post.seo?.image?.image?.asset?.url;

  return {
    title: `${post.seo?.title || post.title} | TRUX Blog`,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: socialImage ? { images: [{ url: socialImage }] } : undefined,
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const [{ data: post }, { data: websiteImages }] = await Promise.all([
    sanityFetch({
      query: BLOG_POST_QUERY,
      params: { slug },
    }),
    sanityFetch({ query: GLOBAL_WEBSITE_IMAGES_QUERY }),
  ]);

  if (!post) notFound();

  const brand = websiteImages?.brand;

  return (
    <>
      <SiteHeader activeItem={null} logo={brand?.headerLogo} />
      <main aria-label="TRUX blog article" className="bg-midnight">
        <BlogArticle post={post} />
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
