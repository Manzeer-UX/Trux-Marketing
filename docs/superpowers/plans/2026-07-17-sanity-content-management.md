# Sanity Content Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone Sanity Studio and replace the website's hard-coded
blog and eligible local image references with editor-managed Sanity content.

**Architecture:** Keep the Next.js 16 application at the repository root and
add a standalone Vite-based Sanity Studio in `studio/`. The frontend uses
`next-sanity`, typed GROQ projections, Live Content, Portable Text, and one
managed-image primitive; each route fetches only its page image group plus
global brand imagery and passes data into synchronous presentation components.

**Tech Stack:** Next.js 16.2.10, React 19, TypeScript 5.9, pnpm 10,
`next-sanity`, `@sanity/image-url`, Sanity Studio, Portable Text, GROQ,
Sanity TypeGen, Vitest, Testing Library, ESLint, and Prettier.

## Global Constraints

- Use Sanity project ID `aibxkdr2`.
- Use dataset `marketing_insights123`.
- Let Sanity generate `_id` values for blog posts, authors, and categories.
- Use fixed document ID `websiteImages` only for the Studio singleton.
- Keep `/assets/app-store.svg` and `/assets/google-play.svg` code-controlled.
- Keep all hero map markers and lot-owner map pins code-controlled.
- Keep existing non-blog marketing copy code-controlled.
- Do not add a page builder, draft preview, or Visual Editing in this phase.
- Keep current local assets as fallbacks until a Studio image field is set.
- Never commit `SANITY_API_READ_TOKEN` or any write token.
- Use `defineType`, `defineField`, and `defineArrayMember` in every schema.
- Enable `hotspot: true` for every Studio-managed image asset.
- Wrap every GROQ query in a uniquely named `defineQuery` constant.
- Use explicit GROQ projections and resolve references only in projections.
- Follow test-first red-green-refactor cycles for behavior changes.
- Treat the existing full-suite location-details timeout as a documented
  baseline timing flake; do not hide any new failures behind it.

---

## File Map

### Standalone Studio

- `studio/package.json` — Studio scripts and dependencies.
- `studio/tsconfig.json` — Studio TypeScript configuration.
- `studio/sanity.config.ts` — project, dataset, plugins, schema, and structure.
- `studio/sanity.cli.ts` — CLI and TypeGen configuration.
- `studio/src/env.ts` — public Sanity project configuration.
- `studio/src/schemaTypes/index.ts` — schema registry.
- `studio/src/schemaTypes/objects/managedImage.ts` — accessible image object.
- `studio/src/schemaTypes/objects/managedDecorativeImage.ts` — decorative image
  object.
- `studio/src/schemaTypes/objects/articleImage.ts` — Portable Text image block.
- `studio/src/schemaTypes/objects/seo.ts` — post SEO fields.
- `studio/src/schemaTypes/documents/author.ts` — blog author document.
- `studio/src/schemaTypes/documents/category.ts` — blog category document.
- `studio/src/schemaTypes/documents/blogPost.ts` — blog post document.
- `studio/src/schemaTypes/documents/websiteImages.ts` — grouped image singleton.
- `studio/src/structure/index.ts` — singleton-first Studio desk.
- `studio/src/schemaTypes/schemaTypes.test.ts` — schema contract tests.
- `studio/src/structure/structure.test.ts` — singleton/navigation tests.

### Next.js Sanity Layer

- `src/sanity/env.ts` — browser-safe project configuration and API version.
- `src/sanity/env.test.ts` — configuration behavior.
- `src/sanity/lib/client.ts` — shared Sanity client.
- `src/sanity/lib/live.ts` — `sanityFetch` and `SanityLive`.
- `src/sanity/lib/image.ts` — image URL builder.
- `src/sanity/lib/queries.ts` — all blog and website-image GROQ.
- `src/sanity/lib/queries.test.ts` — query contract tests.
- `src/sanity/types.ts` — generated schema and query result types.
- `src/components/sanity/managed-image.tsx` — Sanity/local image renderer.
- `src/components/sanity/managed-image.test.tsx` — image behavior tests.
- `src/components/blog/portable-text.tsx` — typed article-body components.
- `src/components/blog/portable-text.test.tsx` — Portable Text rendering tests.

### Existing Frontend Files

- `package.json` — Sanity packages and convenience scripts.
- `pnpm-lock.yaml` — resolved packages.
- `next.config.ts` — Sanity CDN image allowlist.
- `.env.local.example` — public Sanity values and token documentation.
- `src/app/layout.tsx` — mount `SanityLive`.
- `src/app/page.tsx` — global and Home image fetch.
- `src/app/about-us/page.tsx` — global and About image fetch.
- `src/app/partners/page.tsx` — global and Partners image fetch.
- `src/app/lot-owners/page.tsx` — global and Lot Owners image fetch.
- `src/app/locations/page.tsx` — global image fetch.
- `src/app/locations/[locationId]/page.tsx` — global and location gallery fetch.
- `src/app/blog/page.tsx` — Sanity blog listing and global images.
- `src/app/blog/[slug]/page.tsx` — Sanity article, metadata, slugs, global images.
- `src/components/marketing/site-header.tsx` — managed header logo prop.
- `src/components/marketing/site-footer.tsx` — managed logo/social icon props.
- `src/components/marketing/value-props-section.tsx` — managed feature icons.
- `src/components/marketing/coverage-section.tsx` — managed coverage image.
- `src/components/marketing/app-download-section.tsx` — managed phone image while
  retaining local store badges.
- `src/components/about-us/about-hero.tsx` — managed hero image.
- `src/components/about-us/about-team-section.tsx` — managed decorative image.
- `src/components/partners/partners-hero.tsx` — managed hero image.
- `src/components/partners/partner-profiles-section.tsx` — managed partner
  imagery.
- `src/components/lot-owners/lot-owners-benefits-section.tsx` — managed benefit
  icons.
- `src/components/locations/location-photo-gallery.tsx` — managed gallery
  values with local fallback.
- `src/components/blog/blog-listing.tsx` — data-driven cards and pagination.
- `src/components/blog/blog-card.tsx` — Sanity cover image.
- `src/components/blog/blog-article.tsx` — article content and author image.
- `src/constants/blog-content.ts` — delete after migration.
- `README.md` — local Studio and editorial workflow.

---

### Task 1: Scaffold the Standalone Studio and Public Configuration

**Files:**

- Create: `studio/package.json`
- Create: `studio/tsconfig.json`
- Create: `studio/sanity.config.ts`
- Create: `studio/sanity.cli.ts`
- Create: `studio/src/env.ts`
- Create: `src/sanity/env.test.ts`
- Create: `src/sanity/env.ts`
- Modify: `package.json`
- Modify: `.env.local.example`
- Modify: `next.config.ts`
- Modify: `pnpm-lock.yaml`

**Interfaces:**

- Produces: `projectId: string`, `dataset: string`, and `apiVersion: string`
  from `src/sanity/env.ts`.
- Produces: standalone Studio scripts callable through root `pnpm studio:*`
  scripts.
- Consumes: no earlier task interfaces.

- [ ] **Step 1: Install the frontend and Studio dependencies**

Run:

```powershell
pnpm add next-sanity @sanity/image-url
New-Item -ItemType Directory -Force studio | Out-Null
pnpm --dir studio init
pnpm --dir studio add sanity @sanity/vision @sanity/icons react react-dom
pnpm --dir studio add -D typescript @types/react
```

Expected: dependency installation succeeds and no source files exist yet.

- [ ] **Step 2: Write the failing public-configuration test**

Create `src/sanity/env.test.ts`:

```typescript
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Sanity public configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the configured TRUX Sanity project by default", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");

    const config = await import("./env");

    expect(config.projectId).toBe("aibxkdr2");
    expect(config.dataset).toBe("marketing_insights123");
    expect(config.apiVersion).toBe("2026-07-17");
  });

  it("allows deployment-specific public overrides", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "override-project");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "preview");

    const config = await import("./env");

    expect(config.projectId).toBe("override-project");
    expect(config.dataset).toBe("preview");
  });
});
```

- [ ] **Step 3: Run the test and confirm the intended failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\sanity\env.test.ts
```

Expected: FAIL because `src/sanity/env.ts` does not exist.

- [ ] **Step 4: Add frontend and Studio configuration**

Create `src/sanity/env.ts`:

```typescript
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "aibxkdr2";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "marketing_insights123";
export const apiVersion = "2026-07-17";
```

Create `studio/src/env.ts`:

```typescript
export const projectId = "aibxkdr2";
export const dataset = "marketing_insights123";
```

Create `studio/sanity.config.ts`:

```typescript
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/env";
import { schemaTypes } from "./src/schemaTypes";
import { structure } from "./src/structure";

export default defineConfig({
  name: "default",
  title: "TRUX Marketing",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
```

Create `studio/sanity.cli.ts`:

```typescript
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/env";

export default defineCliConfig({
  api: { projectId, dataset },
  typegen: {
    enabled: true,
    path: "../src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../src/sanity/types.ts",
    overloadClientMethods: true,
  },
});
```

Create `studio/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
```

Set `studio/package.json` scripts to:

```json
{
  "scripts": {
    "dev": "sanity dev",
    "start": "sanity start",
    "build": "sanity build",
    "deploy": "sanity deploy",
    "schema:extract": "sanity schema extract --enforce-required-fields",
    "schema:deploy": "sanity schema deploy",
    "typegen": "sanity schema extract --enforce-required-fields && sanity typegen generate"
  }
}
```

Add these root scripts to `package.json`:

```json
{
  "scripts": {
    "studio:dev": "pnpm --dir studio dev",
    "studio:build": "pnpm --dir studio build",
    "studio:typegen": "pnpm --dir studio typegen",
    "studio:schema:deploy": "pnpm --dir studio schema:deploy"
  }
}
```

Update `.env.local.example`:

```dotenv
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_SANITY_PROJECT_ID=aibxkdr2
NEXT_PUBLIC_SANITY_DATASET=marketing_insights123
SANITY_API_READ_TOKEN=
```

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/aibxkdr2/marketing_insights123/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 5: Run the configuration test**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\sanity\env.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 6: Commit the scaffold**

```powershell
git add package.json pnpm-lock.yaml next.config.ts .env.local.example studio src/sanity/env.ts src/sanity/env.test.ts
git commit -m "feat: scaffold standalone Sanity Studio"
```

---

### Task 2: Define the Blog and Website Image Schemas

**Files:**

- Create: `studio/src/schemaTypes/objects/managedImage.ts`
- Create: `studio/src/schemaTypes/objects/managedDecorativeImage.ts`
- Create: `studio/src/schemaTypes/objects/articleImage.ts`
- Create: `studio/src/schemaTypes/objects/seo.ts`
- Create: `studio/src/schemaTypes/documents/author.ts`
- Create: `studio/src/schemaTypes/documents/category.ts`
- Create: `studio/src/schemaTypes/documents/blogPost.ts`
- Create: `studio/src/schemaTypes/documents/websiteImages.ts`
- Create: `studio/src/schemaTypes/index.ts`
- Create: `studio/src/schemaTypes/schemaTypes.test.ts`
- Create: `studio/src/structure/index.ts`
- Create: `studio/src/structure/structure.test.ts`

**Interfaces:**

- Produces schema type names: `managedImage`, `managedDecorativeImage`,
  `articleImage`, `seo`, `author`, `category`, `blogPost`, `websiteImages`.
- Produces `SINGLETON_TYPES = ["websiteImages"]`.
- Consumes the Studio config from Task 1.

- [ ] **Step 1: Write failing schema registry and singleton tests**

Create `studio/src/schemaTypes/schemaTypes.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { schemaTypes } from ".";

const findType = (name: string) =>
  schemaTypes.find((schemaType) => schemaType.name === name);

describe("Sanity schema registry", () => {
  it("registers the complete blog and website image model", () => {
    expect(schemaTypes.map(({ name }) => name)).toEqual([
      "managedImage",
      "managedDecorativeImage",
      "articleImage",
      "seo",
      "author",
      "category",
      "blogPost",
      "websiteImages",
    ]);
  });

  it("models author and category as references on blog posts", () => {
    const post = findType("blogPost");
    const fields = post && "fields" in post ? post.fields : [];
    const author = fields?.find((field) => field.name === "author");
    const category = fields?.find((field) => field.name === "category");

    expect(author?.type).toBe("reference");
    expect(author && "to" in author ? author.to : undefined).toEqual([
      { type: "author" },
    ]);
    expect(category?.type).toBe("reference");
    expect(category && "to" in category ? category.to : undefined).toEqual([
      { type: "category" },
    ]);
  });

  it("groups every approved website image area in the singleton", () => {
    const websiteImages = findType("websiteImages");
    const fields =
      websiteImages && "fields" in websiteImages ? websiteImages.fields : [];

    expect(fields?.map(({ name }) => name)).toEqual([
      "brand",
      "home",
      "about",
      "partners",
      "lotOwners",
      "locations",
      "blogDefaults",
    ]);
  });
});
```

Create `studio/src/structure/structure.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { SINGLETON_TYPES } from ".";

describe("Studio singleton structure", () => {
  it("uses a fixed websiteImages singleton only", () => {
    expect(SINGLETON_TYPES).toEqual(["websiteImages"]);
  });
});
```

- [ ] **Step 2: Run the schema tests and confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run studio\src\schemaTypes\schemaTypes.test.ts studio\src\structure\structure.test.ts
```

Expected: FAIL because the schema registry and structure do not exist.

- [ ] **Step 3: Implement shared image, article, and SEO objects**

Create `managedImage.ts` with a required hotspot image, required non-empty
`alt`, and optional `caption`:

```typescript
import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const managedImage = defineType({
  name: "managedImage",
  title: "Image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image file",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) =>
        rule.required().min(1).error("Describe the image for accessibility."),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: {
    select: { title: "alt", subtitle: "caption", media: "image" },
  },
});
```

Create `managedDecorativeImage.ts`:

```typescript
import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const managedDecorativeImage = defineType({
  name: "managedDecorativeImage",
  title: "Decorative image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image file",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Studio description",
      type: "string",
      description:
        "Used by editors only. The website renders this decorative image with empty alternative text.",
    }),
  ],
  preview: {
    select: { title: "description", media: "image" },
  },
});
```

Create `articleImage.ts` with `image`, `alt`, and `caption` fields matching the
managed image contract, and create `seo.ts` with `title` (60-character warning),
`description` (160-character warning), and optional `image: managedImage`.

- [ ] **Step 4: Implement ordinary blog documents**

Create `author.ts`, `category.ts`, and `blogPost.ts` with `defineType` and
`defineField`. Use this exact `body` field in `blogPost.ts`:

```typescript
defineField({
  name: "body",
  title: "Article body",
  type: "array",
  validation: (rule) => rule.required().min(1),
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "articleImage" }),
  ],
});
```

Use generated IDs for documents, references for `author` and `category`, slug
regex `/^[a-z0-9-]+$/`, required cover image, required date, required excerpt,
and Studio previews with media.

- [ ] **Step 5: Implement the website image singleton**

Create `websiteImages.ts`. Each top-level field is an object with these exact
subfields and types:

```typescript
const websiteImageGroups = {
  brand: [
    ["headerLogo", "Header logo", "managedImage"],
    ["footerLogo", "Footer logo", "managedImage"],
    ["facebookIcon", "Facebook icon", "managedDecorativeImage"],
    ["linkedInIcon", "LinkedIn icon", "managedDecorativeImage"],
    ["instagramIcon", "Instagram icon", "managedDecorativeImage"],
  ],
  home: [
    ["coverageMap", "Coverage map", "managedImage"],
    ["phoneApp", "Phone application image", "managedImage"],
    ["secureFeatureIcon", "Secure feature icon", "managedDecorativeImage"],
    ["easyFeatureIcon", "Easy feature icon", "managedDecorativeImage"],
    [
      "availabilityFeatureIcon",
      "Availability feature icon",
      "managedDecorativeImage",
    ],
    ["serviceFeatureIcon", "Service feature icon", "managedDecorativeImage"],
  ],
  about: [
    ["heroImage", "Hero image", "managedImage"],
    ["teamDecoration", "Team decorative image", "managedDecorativeImage"],
  ],
  partners: [
    ["heroImage", "Hero image", "managedImage"],
    ["otrImage", "OTR Solutions image", "managedImage"],
    ["marqueeImage", "Marquee Insurance image", "managedImage"],
    ["esImage", "ES Advantage image", "managedImage"],
  ],
  lotOwners: [
    ["revenueIcon", "Revenue benefit icon", "managedDecorativeImage"],
    ["staffingIcon", "Staffing benefit icon", "managedDecorativeImage"],
    ["paymentsIcon", "Payments benefit icon", "managedDecorativeImage"],
    ["tenantsIcon", "Tenants benefit icon", "managedDecorativeImage"],
  ],
  blogDefaults: [["emptyStateImage", "Empty-state image", "managedImage"]],
} as const;
```

Define `locations.primaryPhoto` as `managedImage` and
`locations.gallery` as an array of `managedImage` members with
`validation: rule => rule.max(12)`. All singleton fields remain optional so the
frontend fallbacks work before initial population.

- [ ] **Step 6: Register schemas and implement Studio Structure**

Export `schemaTypes` in the exact test order. Implement
`studio/src/structure/index.ts`:

```typescript
import {
  DocumentsIcon,
  ImageIcon,
  TagIcon,
  UserIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const SINGLETON_TYPES = ["websiteImages"] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("TRUX Content")
    .items([
      S.listItem()
        .title("Website Images")
        .icon(ImageIcon)
        .child(
          S.document()
            .schemaType("websiteImages")
            .documentId("websiteImages")
            .title("Website Images"),
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("blogPost")
                .title("Posts")
                .icon(DocumentsIcon),
              S.documentTypeListItem("author")
                .title("Authors")
                .icon(UserIcon),
              S.documentTypeListItem("category")
                .title("Categories")
                .icon(TagIcon),
            ]),
        ),
    ]);
```

- [ ] **Step 7: Run schema tests and Studio typecheck**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run studio\src\schemaTypes\schemaTypes.test.ts studio\src\structure\structure.test.ts
pnpm --dir studio exec tsc --noEmit
```

Expected: 4 tests PASS and Studio TypeScript exits 0.

- [ ] **Step 8: Commit schemas and structure**

```powershell
git add studio/src
git commit -m "feat: model blog content and website images"
```

---

### Task 3: Add the Typed Sanity Client, Queries, and Live Content

**Files:**

- Create: `src/sanity/lib/client.ts`
- Create: `src/sanity/lib/live.ts`
- Create: `src/sanity/lib/image.ts`
- Create: `src/sanity/lib/queries.ts`
- Create: `src/sanity/lib/queries.test.ts`
- Create: `src/sanity/types.ts` through TypeGen
- Modify: `src/app/layout.tsx`

**Interfaces:**

- Produces: `client`, `sanityFetch`, `SanityLive`, and `urlFor`.
- Produces uniquely named blog and website-image query constants.
- Produces generated query result types in `src/sanity/types.ts`.
- Consumes `projectId`, `dataset`, and `apiVersion` from Task 1 and schemas from
  Task 2.

- [ ] **Step 1: Write failing query contract tests**

Create `src/sanity/lib/queries.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import {
  ABOUT_PAGE_IMAGES_QUERY,
  BLOG_POST_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POSTS_COUNT_QUERY,
  BLOG_SLUGS_QUERY,
  GLOBAL_WEBSITE_IMAGES_QUERY,
  HOME_PAGE_IMAGES_QUERY,
  LOCATIONS_PAGE_IMAGES_QUERY,
} from "./queries";

describe("Sanity query contracts", () => {
  it("filters, orders, and slices published blog summaries", () => {
    expect(BLOG_POSTS_QUERY).toContain('_type == "blogPost"');
    expect(BLOG_POSTS_QUERY).toContain("publishedAt <= now()");
    expect(BLOG_POSTS_QUERY).toContain(
      "order(publishedAt desc, _id asc)[$start...$end]",
    );
    expect(BLOG_POSTS_COUNT_QUERY).toContain("count(");
  });

  it("uses a parameterized post slug and explicit singleton ID", () => {
    expect(BLOG_POST_QUERY).toContain("slug.current == $slug");
    expect(BLOG_SLUGS_QUERY).toContain('"slug": slug.current');
    expect(GLOBAL_WEBSITE_IMAGES_QUERY).toContain(
      '_id == "websiteImages"',
    );
  });

  it("projects only the image groups required by each page", () => {
    expect(HOME_PAGE_IMAGES_QUERY).toContain("home {");
    expect(ABOUT_PAGE_IMAGES_QUERY).toContain("about {");
    expect(LOCATIONS_PAGE_IMAGES_QUERY).toContain("locations {");
    expect(HOME_PAGE_IMAGES_QUERY).not.toContain("lotOwners {");
  });
});
```

- [ ] **Step 2: Run the query tests and confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\sanity\lib\queries.test.ts
```

Expected: FAIL because `queries.ts` does not exist.

- [ ] **Step 3: Implement the client, Live Content, and image builder**

Create `client.ts`:

```typescript
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
```

Create `live.ts`:

```typescript
import { defineLive } from "next-sanity";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  ...(token ? { serverToken: token, browserToken: token } : {}),
});
```

Create `image.ts`:

```typescript
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 4: Implement explicit GROQ projections**

Create `queries.ts` with:

```typescript
import { defineQuery } from "next-sanity";

const MANAGED_IMAGE_PROJECTION = /* groq */ `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    },
    crop,
    hotspot
  },
  alt,
  caption
`;

const DECORATIVE_IMAGE_PROJECTION = /* groq */ `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions { width, height }
      }
    },
    crop,
    hotspot
  },
  description
`;
```

Define:

- `BLOG_POSTS_QUERY` with `$start...$end`, title, slug, excerpt, published date,
  category title/slug, and cover image.
- `BLOG_POSTS_COUNT_QUERY`.
- `BLOG_POST_QUERY` with author, category, cover image, SEO, and `body[]{...}`
  expansion for `_type == "articleImage"`.
- `BLOG_METADATA_QUERY` without body.
- `BLOG_SLUGS_QUERY`.
- `GLOBAL_WEBSITE_IMAGES_QUERY`.
- `HOME_PAGE_IMAGES_QUERY`.
- `ABOUT_PAGE_IMAGES_QUERY`.
- `PARTNERS_PAGE_IMAGES_QUERY`.
- `LOT_OWNERS_PAGE_IMAGES_QUERY`.
- `LOCATIONS_PAGE_IMAGES_QUERY`.

Every page query selects `brand` plus its named page group from
`*[_id == "websiteImages"][0]`. Do not project app-store badges or any marker
field.

- [ ] **Step 5: Run query tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\sanity\lib\queries.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 6: Generate and consume Sanity types**

Run:

```powershell
pnpm studio:typegen
```

Expected: `studio/schema.json` and `src/sanity/types.ts` are generated. Keep
`src/sanity/types.ts`; ignore `studio/schema.json` because it is a generated
intermediate.

Add `<SanityLive />` to `src/app/layout.tsx` after `{children}`:

```tsx
import { SanityLive } from "@/sanity/lib/live";

// inside <body>
{children}
<SanityLive />
```

- [ ] **Step 7: Run focused tests and frontend typecheck**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\sanity
pnpm typecheck
```

Expected: Sanity tests PASS and TypeScript exits 0.

- [ ] **Step 8: Commit the data layer**

```powershell
git add src/sanity src/app/layout.tsx studio/.gitignore
git commit -m "feat: add typed Sanity data layer"
```

---

### Task 4: Build the Managed Image Primitive and Integrate Global/Home Images

**Files:**

- Create: `src/components/sanity/managed-image.test.tsx`
- Create: `src/components/sanity/managed-image.tsx`
- Modify: `src/components/marketing/site-header.tsx`
- Modify: `src/components/marketing/site-header.test.tsx`
- Modify: `src/components/marketing/site-footer.tsx`
- Modify: `src/components/marketing/site-footer.test.tsx`
- Modify: `src/components/marketing/value-props-section.tsx`
- Modify: `src/components/marketing/coverage-section.tsx`
- Modify: `src/components/marketing/app-download-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**

- Produces `ManagedImageValue` and `ManagedImage` with local fallback support.
- Existing presentation components consume optional `ManagedImageValue` props.
- Consumes page image query types and `sanityFetch` from Task 3.

- [ ] **Step 1: Write failing managed-image tests**

Create `managed-image.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { ManagedImage } from "./managed-image";

const cmsImage = {
  image: {
    asset: {
      _id: "image-example-800x600-png",
      url: "https://cdn.sanity.io/images/aibxkdr2/marketing_insights123/example-800x600.png",
      metadata: {
        lqip: "data:image/jpeg;base64,preview",
        dimensions: { width: 800, height: 600 },
      },
    },
  },
  alt: "Editor supplied description",
  caption: null,
};

it("renders the existing local fallback when Sanity is empty", () => {
  render(
    <ManagedImage
      value={null}
      fallbackSrc="/assets/trux-logo.svg"
      fallbackAlt="TRUX Parking"
      width={80}
      height={20}
    />,
  );

  expect(screen.getByRole("img", { name: "TRUX Parking" })).toHaveAttribute(
    "src",
    expect.stringContaining("trux-logo.svg"),
  );
});

it("renders the Sanity asset, alt text, and blur placeholder", () => {
  render(
    <ManagedImage
      value={cmsImage}
      fallbackSrc="/assets/fallback.png"
      fallbackAlt="Fallback"
      width={400}
      height={300}
    />,
  );

  const image = screen.getByRole("img", {
    name: "Editor supplied description",
  });
  expect(image).toHaveAttribute("src", expect.stringContaining("cdn.sanity.io"));
});

it("forces empty alt text for known decorative slots", () => {
  render(
    <ManagedImage
      value={cmsImage}
      fallbackSrc="/assets/social-facebook.svg"
      fallbackAlt=""
      decorative
      width={24}
      height={24}
    />,
  );

  expect(screen.getByRole("presentation")).toHaveAttribute("alt", "");
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\sanity\managed-image.test.tsx
```

Expected: FAIL because `ManagedImage` does not exist.

- [ ] **Step 3: Implement the image primitive**

Create `managed-image.tsx`:

```typescript
import Image from "next/image";
import type { ComponentProps } from "react";
import { urlFor } from "@/sanity/lib/image";

export interface ManagedImageValue {
  image?: {
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        lqip?: string | null;
        dimensions?: { width?: number; height?: number } | null;
      } | null;
    } | null;
    crop?: unknown;
    hotspot?: unknown;
  } | null;
  alt?: string | null;
  caption?: string | null;
  description?: string | null;
}

type BaseImageProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "alt" | "placeholder" | "blurDataURL"
>;

interface ManagedImageProps extends BaseImageProps {
  value?: ManagedImageValue | null;
  fallbackSrc: string;
  fallbackAlt: string;
  decorative?: boolean;
}

export function ManagedImage({
  value,
  fallbackSrc,
  fallbackAlt,
  decorative = false,
  width,
  height,
  ...props
}: ManagedImageProps) {
  const hasAsset = Boolean(value?.image?.asset?._id);
  const requestedWidth = typeof width === "number" ? width : 1600;
  const requestedHeight = typeof height === "number" ? height : undefined;
  const src = hasAsset
    ? urlFor(value!.image!)
        .width(requestedWidth)
        .auto("format")
        .fit("max")
        .height(requestedHeight)
        .url()
    : fallbackSrc;
  const blurDataURL = value?.image?.asset?.metadata?.lqip || undefined;

  return (
    <Image
      {...props}
      src={src}
      alt={decorative ? "" : value?.alt?.trim() || fallbackAlt}
      width={width}
      height={height}
      placeholder={hasAsset && blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      unoptimized={hasAsset && value?.image?.asset?.url?.endsWith(".svg")}
    />
  );
}
```

During implementation, use a small conditional builder variable instead of
calling `.height(undefined)` if the installed image URL builder rejects it.

- [ ] **Step 4: Run managed-image tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\sanity\managed-image.test.tsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Add image props to global and Home presentation components**

Use these interfaces:

```typescript
// SiteHeader
interface SiteHeaderProps {
  activeItem?: HeaderNavLabel | null;
  logo?: ManagedImageValue | null;
}

// SiteFooter
interface SiteFooterProps {
  activeItem?: FooterNavLabel | null;
  variant?: "dark" | "light";
  logo?: ManagedImageValue | null;
  socialIcons?: {
    facebook?: ManagedImageValue | null;
    linkedIn?: ManagedImageValue | null;
    instagram?: ManagedImageValue | null;
  };
}

// Home sections
interface CoverageSectionProps {
  image?: ManagedImageValue | null;
}

interface AppDownloadSectionProps {
  phoneImage?: ManagedImageValue | null;
}

interface ValuePropsSectionProps {
  icons?: Partial<
    Record<
      "secure" | "easy" | "availability" | "service",
      ManagedImageValue | null
    >
  >;
}
```

Replace only eligible `next/image` instances with `ManagedImage`. Keep the
store-badge loop unchanged with the two local paths. Keep marker constants
unchanged.

- [ ] **Step 6: Write the failing Home integration test**

Mock `sanityFetch` in `src/app/page.test.tsx` to return `brand` and `home`
values, render `await pageModule.default()`, and assert:

```typescript
expect(
  screen.getByRole("img", { name: "CMS coverage map" }),
).toHaveAttribute("src", expect.stringContaining("cdn.sanity.io"));
expect(
  screen.getByRole("img", { name: "Download on the App Store" }),
).toHaveAttribute("src", expect.stringContaining("app-store.svg"));
```

Expected before the page change: FAIL because the page does not fetch or pass
Sanity images.

- [ ] **Step 7: Fetch and pass Home/global images**

Make `src/app/page.tsx` async:

```typescript
const { data: images } = await sanityFetch({
  query: HOME_PAGE_IMAGES_QUERY,
});

const brand = images?.brand;
const home = images?.home;
```

Pass `brand?.headerLogo`, `brand?.footerLogo`, the three social icons, and all
six Home image fields to the existing components. Preserve all local fallback
paths inside the presentation components.

- [ ] **Step 8: Run focused global/Home tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\sanity src\components\marketing\site-header.test.tsx src\components\marketing\site-footer.test.tsx src\components\marketing\marketing-page.test.tsx src\app\page.test.tsx
```

Expected: focused tests PASS, including assertions that app-store badges and
map-marker paths remain local.

- [ ] **Step 9: Commit the image primitive and Home integration**

```powershell
git add src/components/sanity src/components/marketing src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: manage global and home images with Sanity"
```

---

### Task 5: Integrate About, Partners, Lot Owners, and Location Images

**Files:**

- Modify: `src/app/about-us/page.tsx`
- Modify: `src/app/about-us/page.test.tsx`
- Modify: `src/components/about-us/about-hero.tsx`
- Modify: `src/components/about-us/about-team-section.tsx`
- Modify: `src/app/partners/page.tsx`
- Modify: `src/app/partners/page.test.tsx`
- Modify: `src/components/partners/partners-hero.tsx`
- Modify: `src/components/partners/partner-profiles-section.tsx`
- Modify: `src/app/lot-owners/page.tsx`
- Modify: `src/app/lot-owners/page.test.tsx`
- Modify: `src/components/lot-owners/lot-owners-benefits-section.tsx`
- Modify: `src/app/locations/page.tsx`
- Modify: `src/app/locations/page.test.tsx`
- Modify: `src/app/locations/[locationId]/page.tsx`
- Modify: `src/app/location-details.test.tsx`
- Modify: `src/components/locations/location-photo-gallery.tsx`

**Interfaces:**

- Each route consumes its typed page-image query from Task 3.
- Components consume optional `ManagedImageValue` props from Task 4.
- No component fetches its own data; route-level Server Components own fetching.

- [ ] **Step 1: Write failing page image integration assertions**

For each existing page test, mock `sanityFetch` with one distinctive Sanity
image and assert its accessible name and CDN source:

```typescript
expect(
  screen.getByRole("img", { name: "CMS partners hero" }),
).toHaveAttribute("src", expect.stringContaining("cdn.sanity.io"));
```

Add these coverage cases:

- About hero image and decorative team image.
- Partners hero and all three partner profile images.
- Four Lot Owners benefit icons as decorative images.
- Location primary photo and gallery array.
- Global header/footer images on every migrated route.

Retain assertions that marker elements use
`/assets/hero-map-marker-default.svg`,
`/assets/hero-map-marker-active.svg`, or
`/assets/lot-owners-map-pin.svg`.

- [ ] **Step 2: Run the page tests and confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\app\about-us\page.test.tsx src\app\partners\page.test.tsx src\app\lot-owners\page.test.tsx src\app\locations\page.test.tsx src\app\location-details.test.tsx
```

Expected: new CMS image assertions FAIL while existing local-image behavior
still passes.

- [ ] **Step 3: Add exact presentation props**

Use:

```typescript
// AboutHero
{ image?: ManagedImageValue | null }

// AboutTeamSection
{ decoration?: ManagedImageValue | null }

// PartnersHero
{ image?: ManagedImageValue | null }

// PartnerProfilesSection
{
  images?: Partial<
    Record<"otr-solutions" | "marquee-insurance" | "es-advantage", ManagedImageValue | null>
  >;
}

// LotOwnersBenefitsSection
{
  icons?: readonly (ManagedImageValue | null | undefined)[];
}

// LocationPhotoGallery
{
  primaryPhoto?: ManagedImageValue | null;
  gallery?: readonly ManagedImageValue[] | null;
}
```

In `LocationPhotoGallery`, use `gallery?.length ? gallery :` the existing eight
local fallback positions. Use each Sanity array item's `_key` as the React key
after adding `_key` to the locations query projection.

- [ ] **Step 4: Fetch at each route and pass page/global images**

Make the affected page components async, call their exact page query once, and
pass:

- `brand` to `SiteHeader` and `SiteFooter`.
- `about` to About components.
- `partners` to Partners components using the stable partner IDs.
- `lotOwners` to the benefit section in existing visual order.
- `locations` to `LocationPhotoGallery`.

Do not change any marketing text, profile data, benefits, map configuration, or
marker arrays.

- [ ] **Step 5: Run focused page tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\app\about-us\page.test.tsx src\app\partners\page.test.tsx src\app\lot-owners\page.test.tsx src\app\locations\page.test.tsx src\app\location-details.test.tsx
```

Expected: all focused page tests PASS. If the known location-details test times
out in the combined run, rerun it alone and report both results.

- [ ] **Step 6: Commit remaining website image integration**

```powershell
git add src/app src/components/about-us src/components/partners src/components/lot-owners src/components/locations
git commit -m "feat: manage page imagery through Sanity"
```

---

### Task 6: Replace the Hard-Coded Blog Listing with Sanity

**Files:**

- Modify: `src/app/blog/page.test.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/components/blog/blog-listing.tsx`
- Modify: `src/components/blog/blog-card.tsx`
- Create: `src/components/blog/blog-listing.test.tsx`

**Interfaces:**

- Consumes `BLOG_POSTS_QUERY`, `BLOG_POSTS_COUNT_QUERY`, and
  `GLOBAL_WEBSITE_IMAGES_QUERY`.
- Consumes generated `BLOG_POSTS_QUERYResult` types.
- Produces `parseBlogPage(value): number` and data-driven `BlogListing`.

- [ ] **Step 1: Write failing listing, pagination, and empty-state tests**

Create `blog-listing.test.tsx`:

```typescript
import { render, screen } from "@testing-library/react";
import { BlogListing, parseBlogPage } from "./blog-listing";

const posts = [
  {
    _id: "post-1",
    title: "Safe Parking Guide",
    slug: "safe-parking-guide",
    excerpt: "How to choose a secure truck parking location.",
    publishedAt: "2026-07-17T12:00:00.000Z",
    category: { title: "Driver Resources", slug: "driver-resources" },
    coverImage: null,
  },
];

it("normalizes invalid page values to page one", () => {
  expect(parseBlogPage(undefined)).toBe(1);
  expect(parseBlogPage("-4")).toBe(1);
  expect(parseBlogPage("abc")).toBe(1);
  expect(parseBlogPage("3")).toBe(3);
});

it("renders fetched posts and functional pagination", () => {
  render(
    <BlogListing posts={posts} currentPage={2} totalPages={3} />,
  );

  expect(
    screen.getByRole("link", { name: /Read Safe Parking Guide/i }),
  ).toHaveAttribute("href", "/blog/safe-parking-guide");
  expect(screen.getByRole("link", { name: "Previous" })).toHaveAttribute(
    "href",
    "/blog?page=1",
  );
  expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute(
    "href",
    "/blog?page=3",
  );
});

it("renders a clear empty state", () => {
  render(<BlogListing posts={[]} currentPage={1} totalPages={0} />);
  expect(screen.getByText("No blog posts have been published yet.")).toBeVisible();
});
```

- [ ] **Step 2: Run listing tests and confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\blog\blog-listing.test.tsx src\app\blog\page.test.tsx
```

Expected: FAIL because `BlogListing` still reads hard-coded constants and has no
pagination props.

- [ ] **Step 3: Implement data-driven cards and listing**

Export `parseBlogPage`:

```typescript
export function parseBlogPage(value?: string) {
  const parsed = Number.parseInt(value || "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
```

Use `POSTS_PER_PAGE = 12`, compute `start` and exclusive `end`, render
`ManagedImage` in `BlogCard`, format the ISO date with
`Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year:
"numeric", timeZone: "UTC" })`, and render only valid Previous/Next links.

- [ ] **Step 4: Fetch the listing and global imagery**

In `src/app/blog/page.tsx`:

```typescript
const page = parseBlogPage((await searchParams).page);
const start = (page - 1) * POSTS_PER_PAGE;
const end = start + POSTS_PER_PAGE;

const [{ data: posts }, { data: total }, { data: images }] =
  await Promise.all([
    sanityFetch({ query: BLOG_POSTS_QUERY, params: { start, end } }),
    sanityFetch({ query: BLOG_POSTS_COUNT_QUERY }),
    sanityFetch({ query: GLOBAL_WEBSITE_IMAGES_QUERY }),
  ]);
```

Set `totalPages = Math.ceil(total / POSTS_PER_PAGE)`. Pass global brand images
to the header/footer and fetched posts to `BlogListing`.

- [ ] **Step 5: Run blog listing tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\blog\blog-listing.test.tsx src\app\blog\page.test.tsx
```

Expected: listing tests PASS.

- [ ] **Step 6: Commit the listing migration**

```powershell
git add src/app/blog/page.tsx src/app/blog/page.test.tsx src/components/blog
git commit -m "feat: render blog index from Sanity"
```

---

### Task 7: Replace the Hard-Coded Article with Portable Text

**Files:**

- Create: `src/components/blog/portable-text.test.tsx`
- Create: `src/components/blog/portable-text.tsx`
- Modify: `src/components/blog/blog-article.tsx`
- Modify: `src/app/blog/[slug]/page.test.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Delete: `src/constants/blog-content.ts`
- Delete: `src/components/blog/blog-placeholder-image.tsx` if no references
  remain.

**Interfaces:**

- Consumes `BLOG_POST_QUERY`, `BLOG_METADATA_QUERY`, `BLOG_SLUGS_QUERY`, and
  `GLOBAL_WEBSITE_IMAGES_QUERY`.
- Consumes generated `BLOG_POST_QUERYResult`.
- Produces typed Portable Text rendering for `articleImage` and safe links.

- [ ] **Step 1: Write failing Portable Text tests**

Create `portable-text.test.tsx` with a body containing h2, bullet list, external
link, and article image:

```typescript
it("renders headings, lists, safe external links, and article images", () => {
  render(<BlogPortableText value={bodyFixture} />);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "Choose the right location",
  );
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "FMCSA" })).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  expect(screen.getByRole("img", { name: "Secure parking entrance" })).toBeVisible();
});
```

- [ ] **Step 2: Run Portable Text and detail tests to confirm failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\blog\portable-text.test.tsx src\app\blog\[slug]\page.test.tsx
```

Expected: FAIL because `BlogPortableText` and Sanity-backed detail behavior do
not exist.

- [ ] **Step 3: Implement typed Portable Text components**

Create `portable-text.tsx` with:

```typescript
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "next-sanity";
import { ManagedImage } from "@/components/sanity/managed-image";

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
    bullet: ({ children }) => <ul className="mt-6 list-disc pl-6">{children}</ul>,
    number: ({ children }) => (
      <ol className="mt-6 list-decimal pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const external = /^https?:\/\//.test(value?.href || "");
      return (
        <a
          href={value?.href}
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
          className="h-auto w-full object-cover"
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

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
```

- [ ] **Step 4: Make `BlogArticle` entirely prop-driven**

Accept one non-null `post: BLOG_POST_QUERYResult` prop. Render:

- `post.publishedAt` with the same UTC date formatter as cards.
- `post.category.title`.
- `post.title`.
- author image/name/role.
- cover image.
- `<BlogPortableText value={post.body} />`.

Remove all imports from `blog-content.ts`.

- [ ] **Step 5: Fetch detail data, metadata, and published slugs**

In `[slug]/page.tsx`:

```typescript
export const dynamicParams = true;

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: BLOG_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: BLOG_METADATA_QUERY,
    params: { slug },
    stega: false,
  });
  if (!post) return {};
  return {
    title: `${post.seo?.title || post.title} | TRUX Blog`,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}
```

In the page body, fetch post and global images in parallel, call `notFound()` if
post is null, and pass data to `BlogArticle`, header, and footer.

- [ ] **Step 6: Run blog detail tests**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src\components\blog src\app\blog
```

Expected: blog tests PASS, including unknown slug, post-specific metadata,
author, cover image, Portable Text, and published slug generation.

- [ ] **Step 7: Remove hard-coded content only after confirming no consumers**

Run:

```powershell
rg -n "blog-content|BlogPlaceholderImage" src
```

Expected: only the files being deleted remain. Delete them, rerun the same
search, and expect no matches.

- [ ] **Step 8: Commit the article migration**

```powershell
git add src/app/blog src/components/blog src/constants/blog-content.ts
git commit -m "feat: render Sanity blog articles"
```

---

### Task 8: Document, Deploy the Schema When Authenticated, and Verify

**Files:**

- Modify: `README.md`
- Modify: `.gitignore`
- Modify: any files required by formatting, TypeGen, or verified build errors.

**Interfaces:**

- Consumes the complete Studio and frontend implementation.
- Produces an editor-facing local workflow and deploy/configuration commands.

- [ ] **Step 1: Write the operating documentation**

Replace the placeholder `README.md` with:

```markdown
# TRUX Marketing

## Website

```powershell
pnpm install
pnpm dev
```

The Next.js app runs at `http://localhost:3000`.

## Sanity Studio

The standalone Studio is connected to project `aibxkdr2` and dataset
`marketing_insights123`.

```powershell
pnpm --dir studio install
pnpm studio:dev
```

Studio runs at `http://localhost:3333`.

## Content workflow

1. Sign in to Studio.
2. Create authors and categories.
3. Create and publish blog posts under Blog.
4. Replace eligible site images under Website Images.
5. Publish changes; the website receives published updates through Sanity Live
   Content.

App-store badges and map markers remain code-controlled.

## Environment

Copy `.env.local.example` to `.env.local`. Public project and dataset values
are already configured. Set `SANITY_API_READ_TOKEN` only when the dataset is
private or authenticated Live Content is required. Never commit tokens.

## Studio and schema commands

```powershell
pnpm studio:typegen
pnpm studio:schema:deploy
pnpm studio:build
pnpm --dir studio deploy
```

Add `http://localhost:3000` and the production website origin as credentialed
CORS origins in Sanity Manage before using browser Live Content.
```

Add `studio/schema.json` and `studio/dist/` to `.gitignore`. Keep
`src/sanity/types.ts` committed.

- [ ] **Step 2: Format all changed files**

Run:

```powershell
pnpm exec prettier --write package.json next.config.ts .env.local.example README.md studio src
```

Expected: Prettier exits 0.

- [ ] **Step 3: Regenerate types and run focused tests**

Run:

```powershell
pnpm studio:typegen
.\node_modules\.bin\vitest.cmd run src\sanity src\components\sanity src\components\blog src\app\blog
```

Expected: TypeGen succeeds and all Sanity/blog tests PASS.

- [ ] **Step 4: Run the complete frontend verification**

Run separately and read every exit code:

```powershell
pnpm test
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

Expected:

- All tests pass. If only the documented location-details timeout recurs, rerun
  it alone and report both the full and focused results without calling the
  full suite green.
- TypeScript exits 0.
- ESLint exits 0 with zero warnings.
- Prettier check exits 0.
- Next.js production build exits 0.

- [ ] **Step 5: Run complete Studio verification**

Run:

```powershell
pnpm --dir studio exec tsc --noEmit
pnpm studio:typegen
pnpm studio:build
```

Expected: Studio typecheck, schema extraction/TypeGen, and production build all
exit 0.

- [ ] **Step 6: Deploy schema and configure CORS if the local Sanity session is authenticated**

Run:

```powershell
pnpm studio:schema:deploy
pnpm --dir studio exec sanity cors add http://localhost:3000 --credentials
pnpm --dir studio exec sanity cors add https://truxparking.com --credentials
```

Expected when authenticated: schema and both CORS origins are accepted. If the
CLI requires login, stop without inventing credentials and report the exact
remaining authenticated commands.

- [ ] **Step 7: Review the final diff against the acceptance criteria**

Run:

```powershell
git status --short
git diff --check
rg -n "/assets/(app-store|google-play|hero-map-marker|lot-owners-map-pin)" src
rg -n "blog-content|BlogPlaceholderImage" src
```

Expected:

- `git diff --check` has no whitespace errors.
- Badge and marker paths still exist only in their intended components/tests.
- No hard-coded blog content consumer remains.
- Every other image slot listed in the design has a managed Sanity prop and
  local fallback.

- [ ] **Step 8: Commit documentation and verified adjustments**

```powershell
git add README.md .gitignore src/sanity/types.ts
git add -u
git commit -m "docs: document Sanity editorial workflow"
```

- [ ] **Step 9: Capture final evidence**

Run:

```powershell
git status --short --branch
git log --oneline --decorate -8
```

Expected: clean `codex/sanity-content-management` worktree with the design,
scaffold, schemas, data layer, image integration, blog migration, and
documentation commits visible.
