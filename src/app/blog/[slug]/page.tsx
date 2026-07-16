import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { blogArticle, blogPosts, getBlogPost } from "@/constants/blog-content";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: `${blogArticle.title} | TRUX Blog`,
    description:
      "Learn the difference between freight brokers and freight dispatchers, how each gets paid, and who represents professional drivers.",
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  if (!getBlogPost(slug)) notFound();

  return (
    <>
      <SiteHeader activeItem={null} />
      <main aria-label="TRUX blog article" className="bg-midnight">
        <BlogArticle />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
