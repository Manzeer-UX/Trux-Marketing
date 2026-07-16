import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/constants/blog-content";

export function BlogListing() {
  return (
    <>
      <section
        aria-label="Blog articles"
        className="mx-auto w-full max-w-[1280px] px-6 py-16 wide:py-24"
      >
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 sm:grid-cols-2 wide:grid-cols-4">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <nav
        aria-label="Blog pagination"
        className="flex h-8 items-center justify-center"
      >
        <ul className="flex list-none items-center gap-1 text-sm leading-5 font-medium text-[#fafafa]">
          <li>
            <span className="flex h-8 items-center gap-1 rounded-lg pr-4 pl-2.5">
              <ChevronLeft aria-hidden="true" className="size-4" />
              Previous
            </span>
          </li>
          <li>
            <span
              aria-current="page"
              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-white/5"
            >
              1
            </span>
          </li>
          <li>
            <span className="flex size-8 items-center justify-center rounded-lg">
              2
            </span>
          </li>
          <li>
            <span className="flex size-8 items-center justify-center rounded-lg">
              3
            </span>
          </li>
          <li>
            <span className="flex h-8 items-center gap-1 rounded-lg pr-2.5 pl-4">
              Next
              <ChevronRight aria-hidden="true" className="size-4" />
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
