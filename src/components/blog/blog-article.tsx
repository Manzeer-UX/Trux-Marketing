import { BlogPortableText } from "@/components/blog/portable-text";
import { ManagedImage } from "@/components/sanity/managed-image";
import { formatBlogDate } from "@/lib/format-blog-date";
import type { BLOG_POST_QUERY_RESULT } from "@/sanity/types";

export function BlogArticle({
  post,
}: {
  post: NonNullable<BLOG_POST_QUERY_RESULT>;
}) {
  const publishedAt = formatBlogDate(post.publishedAt);

  return (
    <article className="mx-auto flex w-full max-w-[768px] flex-col gap-16 px-6 py-16 wide:py-24">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime={post.publishedAt}>{publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{post.category.title}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[1px] text-[#fafafa] sm:text-5xl wide:text-[60px] wide:leading-[60px]">
            {post.title}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ManagedImage
            value={post.author.image}
            fallbackSrc="/assets/blog-author-avatar.png"
            fallbackAlt={post.author.name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
          <div className="text-sm leading-5">
            <p className="font-medium text-[#fafafa]">{post.author.name}</p>
            {post.author.role ? (
              <p className="text-muted">{post.author.role}</p>
            ) : null}
          </div>
        </div>

        <ManagedImage
          value={post.coverImage}
          fallbackSrc="/assets/blog-placeholder-surface.png"
          fallbackAlt={`${post.title} cover image`}
          width={768}
          height={480}
          priority
          className="h-auto w-full rounded-[14px] object-cover"
        />
      </header>

      <div className="text-base leading-6 text-[#fafafa]">
        <BlogPortableText value={post.body} />
      </div>
    </article>
  );
}
