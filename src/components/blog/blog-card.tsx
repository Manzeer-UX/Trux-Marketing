import Link from "next/link";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import type { BlogPostSummary } from "@/constants/blog-content";

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}, ${post.category} — ${post.publishedAt}`}
        className="group flex flex-col gap-4 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <BlogPlaceholderImage
          label={`${post.title} placeholder image`}
          className="aspect-[4/3] w-full transition-opacity group-hover:opacity-90"
        />
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime="2024-03-15">{post.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span className="truncate">{post.category}</span>
          </div>
          <h2 className="text-base leading-6 font-semibold text-[#fafafa]">
            {post.title}
          </h2>
          <p className="line-clamp-3 text-sm leading-5 text-muted">
            {post.preview}
          </p>
        </div>
      </Link>
    </article>
  );
}
