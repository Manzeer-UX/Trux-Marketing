import {
  PortableText,
  type PortableTextComponents,
} from "next-sanity";
import { ManagedImage } from "@/components/sanity/managed-image";
import type { BLOG_POST_QUERY_RESULT } from "@/sanity/types";

type BlogBody = NonNullable<BLOG_POST_QUERY_RESULT>["body"];

const supportedHref = /^(https?:\/\/|mailto:|tel:)/i;

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 first:mt-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-8 border-b border-white/10 pb-2 font-display text-[30px] leading-9 font-semibold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-8 font-display text-2xl leading-8 font-semibold">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-amber pl-5">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" && supportedHref.test(value.href)
          ? value.href
          : undefined;

      if (!href) return <>{children}</>;

      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          target={value?.openInNewTab ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-amber underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    articleImage: ({ value }) => (
      <figure className="mt-8">
        <ManagedImage
          value={value}
          fallbackSrc="/assets/blog-placeholder-surface.png"
          fallbackAlt={value?.alt || "Blog illustration"}
          width={768}
          height={480}
          className="h-auto w-full rounded-[14px] object-cover"
        />
        {value?.caption ? (
          <figcaption className="mt-2 text-sm text-muted">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
};

export function BlogPortableText({ value }: { value: BlogBody }) {
  if (!Array.isArray(value) || value.length === 0) return null;

  return <PortableText value={value} components={components} />;
}
