import Image from "next/image";
import Link from "next/link";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import { urlFor } from "@/sanity/lib/image";
import type { BlogPostListing } from "@/sanity/lib/queries";

interface BlogCardProps {
  post: BlogPostListing;
}

export function BlogCard({ post }: BlogCardProps) {
  const categories = post.categories
    ?.map((category) => category.title)
    .filter((title): title is string => Boolean(title))
    .join(", ");
  const publishedAt = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : null;

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}${categories ? `, ${categories}` : ""}${publishedAt ? ` — ${publishedAt}` : ""}`}
        className="group flex flex-col gap-4 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(800).height(600).fit("crop").url()}
            alt={post.mainImage.alt || post.title}
            width={800}
            height={600}
            className="aspect-[4/3] w-full rounded-[14px] object-cover transition-opacity group-hover:opacity-90"
          />
        ) : (
          <BlogPlaceholderImage
            label={`${post.title} placeholder image`}
            className="aspect-[4/3] w-full transition-opacity group-hover:opacity-90"
          />
        )}
        <div className="flex flex-col gap-3 text-left">
          {(publishedAt || categories) && (
            <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
              {publishedAt && (
                <time dateTime={post.publishedAt ?? undefined}>{publishedAt}</time>
              )}
              {publishedAt && categories && <span aria-hidden="true">·</span>}
              {categories && <span className="truncate">{categories}</span>}
            </div>
          )}
          <h2 className="text-base leading-6 font-semibold text-[#fafafa]">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="line-clamp-3 text-sm leading-5 text-muted">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
