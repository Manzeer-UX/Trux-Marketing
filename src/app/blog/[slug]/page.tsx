import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  type BlogPost,
} from "@/sanity/lib/queries";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: POST_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (data as Array<{ slug: string }>).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  const post = data as BlogPost | null;

  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || undefined;
  const image = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: `${title} | TRUX Blog`,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });
  const post = data as BlogPost | null;

  if (!post) notFound();

  return (
    <>
      <SiteHeader activeItem={null} />
      <main aria-label="TRUX blog article" className="bg-midnight">
        <BlogArticle post={post} />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
