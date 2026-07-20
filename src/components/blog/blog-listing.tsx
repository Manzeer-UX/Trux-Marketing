import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BlogCard } from "@/components/blog/blog-card";
import {
  ManagedImage,
  type ManagedImageValue,
} from "@/components/sanity/managed-image";
import type { BLOG_POSTS_QUERY_RESULT } from "@/sanity/types";

export const POSTS_PER_PAGE = 12;

export function parseBlogPage(value?: string) {
  const parsed = Number.parseInt(value || "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

interface BlogListingProps {
  posts: BLOG_POSTS_QUERY_RESULT;
  currentPage: number;
  totalPages: number;
  emptyStateImage?: ManagedImageValue | null;
}

export function BlogListing({
  posts,
  currentPage,
  totalPages,
  emptyStateImage,
}: BlogListingProps) {
  if (posts.length === 0) {
    return (
      <section
        aria-label="Blog articles"
        className="mx-auto flex min-h-[520px] w-full max-w-[768px] flex-col items-center justify-center gap-6 px-6 py-16 text-center wide:py-24"
      >
        <ManagedImage
          value={emptyStateImage}
          fallbackSrc="/assets/blog-placeholder-surface.png"
          fallbackAlt="TRUX blog"
          width={320}
          height={200}
          className="h-auto w-full max-w-80 rounded-[14px] object-cover"
        />
        <p className="text-lg text-muted">
          No blog posts have been published yet.
        </p>
      </section>
    );
  }

  return (
    <>
      <section
        aria-label="Blog articles"
        className="mx-auto w-full max-w-[1280px] px-6 py-16 wide:py-24"
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 sm:grid-cols-2 wide:grid-cols-4">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <nav
        aria-label="Blog pagination"
        className="flex h-8 items-center justify-center"
      >
        <ul className="flex list-none items-center gap-1 text-sm leading-5 font-medium text-[#fafafa]">
          {currentPage > 1 ? (
            <li>
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="flex h-8 items-center gap-1 rounded-lg pr-4 pl-2.5 hover:bg-white/5"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
                Previous
              </Link>
            </li>
          ) : null}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <li key={page}>
                <Link
                  href={page === 1 ? "/blog" : `/blog?page=${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={
                    page === currentPage
                      ? "flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/5"
                      : "flex size-8 items-center justify-center rounded-lg hover:bg-white/5"
                  }
                >
                  {page}
                </Link>
              </li>
            ),
          )}
          {currentPage < totalPages ? (
            <li>
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="flex h-8 items-center gap-1 rounded-lg pr-2.5 pl-4 hover:bg-white/5"
              >
                Next
                <ChevronRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
}
