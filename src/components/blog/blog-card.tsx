import Link from "next/link";
import { ManagedImage } from "@/components/sanity/managed-image";
import { formatBlogDate } from "@/lib/format-blog-date";
import type { BLOG_POSTS_QUERY_RESULT } from "@/sanity/types";

interface BlogCardProps {
  post: BLOG_POSTS_QUERY_RESULT[number];
}

export function BlogCard({ post }: BlogCardProps) {
  const publishedAt = formatBlogDate(post.publishedAt);

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}, ${post.category.title} — ${publishedAt}`}
        className="group flex flex-col gap-4 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#e8e8e8]">
          <ManagedImage
            value={post.coverImage}
            fallbackSrc="/assets/blog-placeholder-surface.png"
            fallbackAlt={`${post.title} cover image`}
            fill
            sizes="(min-width: 1440px) 308px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-opacity group-hover:opacity-90"
          />
        </div>
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime={post.publishedAt}>{publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span className="truncate">{post.category.title}</span>
          </div>
          <h2 className="text-base leading-6 font-semibold text-[#fafafa]">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-5 text-muted">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
