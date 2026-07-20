import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import { urlFor } from "@/sanity/lib/image";
import type { BlogImage, BlogPost } from "@/sanity/lib/queries";

const portableTextComponents: PortableTextComponents = {
  block: {
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-amber pl-4 text-muted">
        {children}
      </blockquote>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 border-b border-white/10 pb-2 font-display text-[30px] leading-9 font-semibold text-[#fafafa]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-8 font-display text-2xl leading-8 font-semibold text-[#fafafa]">
        {children}
      </h3>
    ),
    normal: ({ children }) => <p className="mt-6 first:mt-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc pl-6">{children}</ul>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : undefined;

      if (!href) return <>{children}</>;

      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-amber underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as BlogImage;
      if (!image?.asset) return null;

      return (
        <Image
          src={urlFor(image).width(1200).height(750).fit("crop").url()}
          alt={image.alt || ""}
          width={1200}
          height={750}
          className="my-8 aspect-[8/5] w-full rounded-[14px] object-cover"
        />
      );
    },
  },
};

interface BlogArticleProps {
  post: BlogPost;
}

export function BlogArticle({ post }: BlogArticleProps) {
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
  const authorName = post.author?.name || "TRUX";

  return (
    <article className="mx-auto flex w-full max-w-[768px] flex-col gap-16 px-6 py-16 wide:py-24">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          {(publishedAt || categories) && (
            <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
              {publishedAt && (
                <time dateTime={post.publishedAt ?? undefined}>{publishedAt}</time>
              )}
              {publishedAt && categories && <span aria-hidden="true">·</span>}
              {categories && <span>{categories}</span>}
            </div>
          )}
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[1px] text-[#fafafa] sm:text-5xl wide:text-[60px] wide:leading-[60px]">
            {post.title}
          </h1>
        </div>

        {post.author && (
          <div className="flex items-center gap-4">
            {post.author.image?.asset ? (
              <Image
                src={urlFor(post.author.image).width(80).height(80).fit("crop").url()}
                alt={post.author.image.alt || authorName}
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[#fafafa]"
              >
                {authorName.slice(0, 1)}
              </div>
            )}
            <div className="text-sm leading-5">
              <p className="font-medium text-[#fafafa]">{authorName}</p>
              {post.author.role && <p className="text-muted">{post.author.role}</p>}
            </div>
          </div>
        )}

        {post.mainImage?.asset ? (
          <Image
            src={urlFor(post.mainImage).width(1200).height(750).fit("crop").url()}
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={750}
            className="aspect-[8/5] w-full rounded-[14px] object-cover"
            priority
          />
        ) : (
          <BlogPlaceholderImage
            label="Article placeholder hero image"
            className="aspect-[8/5] w-full"
          />
        )}
      </header>

      {post.body && post.body.length > 0 && (
        <div className="text-base leading-6 text-[#fafafa]">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      )}
    </article>
  );
}
