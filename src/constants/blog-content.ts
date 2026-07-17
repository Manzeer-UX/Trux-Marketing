export interface BlogPostSummary {
  slug: string;
  publishedAt: string;
  category: string;
  title: string;
  preview: string;
}

const defaultPreview = "Blog content preview...";

export const blogPosts = [
  {
    slug: "freight-broker-vs-dispatcher",
    publishedAt: "Mar 15, 2024",
    category: "Truck Driving Information",
    title: "Blog Title",
    preview:
      "At a Glance: A freight broker is an FMCSA-licensed middleman who connects a shipper’s freight with a motor carrier acce...",
  },
  {
    slug: "smart-truck-parking-guide",
    publishedAt: "Mar 12, 2024",
    category: "Truck Driving Information",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "hours-of-service-rules",
    publishedAt: "Mar 8, 2024",
    category: "Truck Driving Rules",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "road-safety-tips",
    publishedAt: "Mar 5, 2024",
    category: "Truck Driving Rules",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "trux-network-news",
    publishedAt: "Mar 15, 2024",
    category: "TRUX News",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "parking-expansion-news",
    publishedAt: "Mar 12, 2024",
    category: "TRUX News",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "outdoor-storage-guide",
    publishedAt: "Mar 8, 2024",
    category: "Outdoor Storage",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "truck-parking-checklist",
    publishedAt: "Mar 5, 2024",
    category: "Truck Driving Information",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "trux-driver-update",
    publishedAt: "Mar 15, 2024",
    category: "TRUX News",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "secure-parking-network",
    publishedAt: "Mar 12, 2024",
    category: "TRUX News",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "outdoor-storage-tips",
    publishedAt: "Mar 8, 2024",
    category: "Outdoor Storage",
    title: "Blog Title",
    preview: defaultPreview,
  },
  {
    slug: "professional-driver-guide",
    publishedAt: "Mar 5, 2024",
    category: "Truck Driving Information",
    title: "Blog Title",
    preview: defaultPreview,
  },
] as const satisfies readonly BlogPostSummary[];

export const blogArticle = {
  publishedAt: "Nov 11, 2024",
  category: "Truck Driving Information",
  title: "Freight Broker vs. Dispatcher: What’s the Difference?",
  author: {
    name: "Lando Norris",
    role: "Product Designer",
    image: "/assets/blog-author-avatar.png",
  },
} as const;

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
