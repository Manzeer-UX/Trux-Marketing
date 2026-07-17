# Standalone Sanity Blog Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the repository into a standalone Next.js frontend and standalone Sanity Studio, then replace the frontend's hard-coded blog data with typed published content from Sanity.

**Architecture:** Keep the Git repository rooted at `D:\Trux Marketing` with independent `Frontend` and `Sanity Blogs` applications. The Studio owns the blog schema and TypeGen configuration; the Next.js app owns GROQ queries, published-content fetching, and rendering through its existing `/blog` routes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Vitest, pnpm, Sanity Studio, `next-sanity`, `@sanity/image-url`, GROQ, Sanity TypeGen, Portable Text.

## Global Constraints

- Keep `.git`, `.gitignore`, `.agents`, `.superpowers`, `.worktrees`, and `skills-lock.json` at `D:\Trux Marketing`.
- Move the complete existing Next.js application, `design.md`, and `docs` into `D:\Trux Marketing\Frontend`.
- Create the standalone Studio at `D:\Trux Marketing\Sanity Blogs`; never embed it in Next.js.
- Sanity project ID is exactly `859usc6z`.
- Sanity organization ID is exactly `oHjVtamMe`.
- Sanity dataset is exactly `production`.
- Use the clean Sanity template and TypeScript.
- Use API version `2026-07-17`.
- Do not create or import documents into the production dataset.
- Preserve `/blog`, `/blog/[slug]`, and the current TRUX visual treatment.
- Leave Draft Mode, Presentation, Visual Editing, preview tokens, and production CORS outside this implementation.
- Keep each application independently installable and runnable; do not add root workspace tooling.

---

## File Structure

### Root files retained

- `.git/`: existing repository metadata.
- `.gitignore`: shared ignore rules for both applications.
- `.agents/skills/sanity-best-practices/`: required installed Sanity guidance.
- `.superpowers/`: local workflow state.
- `.worktrees/`: existing worktree storage.
- `skills-lock.json`: installed skill lockfile.

### Frontend files moved or modified

- `Frontend/package.json`: add Sanity runtime dependencies.
- `Frontend/pnpm-lock.yaml`: record dependency resolution.
- `Frontend/.env`: preserve existing local app configuration.
- `Frontend/.env.local`: add local public Sanity identifiers; remain ignored.
- `Frontend/.env.local.example`: document Google Maps and Sanity public values.
- `Frontend/next.config.ts`: allow optimized images from `cdn.sanity.io`.
- `Frontend/sanity.types.ts`: generated and committed TypeGen output.
- `Frontend/src/sanity/env.ts`: validate public Sanity configuration.
- `Frontend/src/sanity/env.test.ts`: fail-fast environment validation tests.
- `Frontend/src/sanity/lib/client.ts`: published-content Sanity client.
- `Frontend/src/sanity/lib/image.ts`: Sanity image URL builder.
- `Frontend/src/sanity/lib/queries.ts`: uniquely named GROQ queries.
- `Frontend/src/sanity/lib/posts.ts`: blog data-access functions.
- `Frontend/src/sanity/lib/posts.test.ts`: data-access tests.
- `Frontend/src/components/blog/blog-date.ts`: deterministic date formatting.
- `Frontend/src/components/blog/sanity-image.tsx`: optimized Sanity image renderer.
- `Frontend/src/components/blog/portable-text-components.tsx`: typed article body rendering.
- `Frontend/src/components/blog/sanity-blog-card.tsx`: render a Sanity-backed post card.
- `Frontend/src/components/blog/sanity-blog-listing.tsx`: render queried posts and the empty state.
- `Frontend/src/components/blog/sanity-blog-listing.test.tsx`: listing and empty-state tests.
- `Frontend/src/components/blog/sanity-blog-article.tsx`: render one queried post.
- `Frontend/src/components/blog/sanity-blog-article.test.tsx`: article rendering tests.
- `Frontend/src/app/blog/page.tsx`: fetch the post listing.
- `Frontend/src/app/blog/page.test.tsx`: route-level listing test.
- `Frontend/src/app/blog/[slug]/page.tsx`: fetch post detail and metadata.
- `Frontend/src/app/blog/[slug]/page.test.tsx`: detail, metadata, and 404 tests.
- `Frontend/src/constants/blog-content.ts`: delete after all consumers are migrated.

### Studio files created or modified

- `Sanity Blogs/package.json`: add test, typecheck, and TypeGen scripts.
- `Sanity Blogs/sanity.config.ts`: register the project, plugins, and schemas.
- `Sanity Blogs/sanity.cli.ts`: configure project access and cross-app TypeGen.
- `Sanity Blogs/schemaTypes/index.ts`: register all schema types.
- `Sanity Blogs/schemaTypes/schema-types.test.ts`: schema registration and critical-option tests.
- `Sanity Blogs/schemaTypes/documents/post.ts`: blog post document.
- `Sanity Blogs/schemaTypes/documents/author.ts`: reusable author document.
- `Sanity Blogs/schemaTypes/documents/category.ts`: reusable category document.
- `Sanity Blogs/schemaTypes/objects/article-image.ts`: Portable Text image block.
- `Sanity Blogs/schemaTypes/objects/seo.ts`: nested SEO object.
- `Sanity Blogs/schema.json`: extracted schema used by TypeGen.

---

### Task 1: Move the Existing App into `Frontend`

**Files:**

- Move: current Next.js app files and directories to `Frontend/`.
- Retain: `.git/`, `.gitignore`, `.agents/`, `.superpowers/`, `.worktrees/`, `skills-lock.json`.
- Move: `docs/superpowers/plans/2026-07-17-sanity-blog-integration.md` to `Frontend/docs/superpowers/plans/2026-07-17-sanity-blog-integration.md` as part of the existing `docs/` directory.

**Interfaces:**

- Consumes: the current working Next.js application at the repository root.
- Produces: a runnable Next.js application at `D:\Trux Marketing\Frontend`.

- [ ] **Step 1: Record the clean baseline**

Run:

```powershell
git status --short
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Expected: only `.agents/` and `skills-lock.json` are untracked; every application command exits `0`.

- [ ] **Step 2: Validate the exact move targets**

Run:

```powershell
$repoRoot = (Resolve-Path -LiteralPath '.').Path
$frontendPath = [System.IO.Path]::GetFullPath((Join-Path $repoRoot 'Frontend'))
$expectedRoot = [System.IO.Path]::GetFullPath('D:\Trux Marketing')
$expectedFrontend = [System.IO.Path]::GetFullPath('D:\Trux Marketing\Frontend')

if ($repoRoot -ne $expectedRoot) {
  throw "Unexpected repository root: $repoRoot"
}

if ($frontendPath -ne $expectedFrontend) {
  throw "Unexpected frontend target: $frontendPath"
}

if (Test-Path -LiteralPath $frontendPath) {
  throw "Frontend target already exists: $frontendPath"
}

Write-Output "Repository root: $repoRoot"
Write-Output "Frontend target: $frontendPath"
```

Expected: the resolved paths are exactly `D:\Trux Marketing` and `D:\Trux Marketing\Frontend`, and the target does not exist.

- [ ] **Step 3: Create `Frontend` and move tracked app sources**

Run:

```powershell
New-Item -ItemType Directory -Path 'D:\Trux Marketing\Frontend'

$trackedAppItems = @(
  '.env.local.example',
  '.pnpm-store',
  '.prettierignore',
  'design.md',
  'docs',
  'eslint.config.mjs',
  'next-env.d.ts',
  'next.config.ts',
  'nextjs_standards.md',
  'package.json',
  'playwright.config.ts',
  'pnpm-lock.yaml',
  'postcss.config.mjs',
  'public',
  'src',
  'tsconfig.json',
  'vitest.config.ts',
  'vitest.setup.ts'
)

foreach ($item in $trackedAppItems) {
  if (-not (Test-Path -LiteralPath $item)) {
    throw "Required app item is missing: $item"
  }
  git mv -- $item 'Frontend'
  if ($LASTEXITCODE -ne 0) {
    throw "git mv failed for $item"
  }
}
```

Expected: every listed tracked item is under `Frontend`, with renames visible in `git status --short`.

- [ ] **Step 4: Move ignored local app state without deleting it**

Run:

```powershell
$localAppItems = @(
  '.env',
  '.next',
  'node_modules',
  'test-results',
  'tsconfig.tsbuildinfo'
)

foreach ($item in $localAppItems) {
  if (Test-Path -LiteralPath $item) {
    Move-Item -LiteralPath $item -Destination 'Frontend'
  }
}
```

Expected: local environment and generated app state are preserved inside `Frontend`; nothing is recursively deleted.

- [ ] **Step 5: Verify the moved app from its new folder**

Run:

```powershell
pnpm --dir 'Frontend' test
pnpm --dir 'Frontend' typecheck
pnpm --dir 'Frontend' lint
pnpm --dir 'Frontend' build
Get-ChildItem -Force | Select-Object Name
```

Expected: all four commands exit `0`; the repository root contains the retained shared items plus `Frontend`.

- [ ] **Step 6: Commit the repository organization and installed skill**

Run:

```powershell
git add -A
git diff --cached --check
git commit -m "chore: organize frontend for standalone Sanity Studio"
```

Expected: the commit records the app move, `.agents/skills/sanity-best-practices`, and `skills-lock.json`, with no whitespace errors.

---

### Task 2: Scaffold the Standalone Studio

**Files:**

- Create: `Sanity Blogs/` using Sanity CLI.
- Modify: `Sanity Blogs/package.json`.
- Modify: `Sanity Blogs/sanity.config.ts`.
- Modify: `Sanity Blogs/sanity.cli.ts`.

**Interfaces:**

- Consumes: Sanity project `859usc6z` and dataset `production`.
- Produces: an independently runnable Studio at `http://localhost:3333` and TypeGen output at `Frontend/sanity.types.ts`.

- [ ] **Step 1: Scaffold from the repository root**

Run:

```powershell
npm create sanity@latest -- --project 859usc6z --dataset production --template clean --typescript --output-path "Sanity Blogs"
```

Expected: the command exits `0` and creates `Sanity Blogs/sanity.config.ts`, `Sanity Blogs/sanity.cli.ts`, and `Sanity Blogs/package.json`. It must not create Studio files under `Frontend`.

- [ ] **Step 2: Verify the generated project identity**

Run:

```powershell
rg -n "859usc6z|production" "Sanity Blogs/sanity.config.ts" "Sanity Blogs/sanity.cli.ts"
```

Expected: both the project ID and dataset appear in the generated Studio configuration.

- [ ] **Step 3: Add the Studio test dependency**

Run:

```powershell
npm --prefix "Sanity Blogs" install --save-dev vitest
```

Expected: `Sanity Blogs/package.json` and the npm lockfile record Vitest.

- [ ] **Step 4: Add deterministic Studio scripts**

Merge these entries into the generated `scripts` object in
`Sanity Blogs/package.json`. Preserve all other CLI-generated scripts and every
generated dependency version:

```json
{
  "test": "vitest run",
  "typecheck": "tsc --noEmit",
  "typegen": "sanity schema extract --enforce-required-fields && sanity typegen generate"
}
```

Run:

```powershell
npm --prefix "Sanity Blogs" run typecheck
```

Expected: TypeScript exits `0` before schema customization.

- [ ] **Step 5: Configure the Studio and cross-app TypeGen**

Replace `Sanity Blogs/sanity.config.ts` with:

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Testing",
  projectId: "859usc6z",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
```

Replace `Sanity Blogs/sanity.cli.ts` with:

```typescript
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "859usc6z",
    dataset: "production",
  },
  typegen: {
    enabled: true,
    path: "../Frontend/src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../Frontend/sanity.types.ts",
    overloadClientMethods: true,
  },
});
```

Run:

```powershell
npm --prefix "Sanity Blogs" run typecheck
```

Expected: TypeScript exits `0`.

- [ ] **Step 6: Commit the standalone scaffold**

Run:

```powershell
git add -- "Sanity Blogs"
git diff --cached --check
git commit -m "chore: scaffold standalone Sanity Studio"
```

Expected: only standalone Studio files are included in this commit.

---

### Task 3: Define and Test the Blog Schema

**Files:**

- Create: `Sanity Blogs/schemaTypes/schema-types.test.ts`.
- Create: `Sanity Blogs/schemaTypes/documents/post.ts`.
- Create: `Sanity Blogs/schemaTypes/documents/author.ts`.
- Create: `Sanity Blogs/schemaTypes/documents/category.ts`.
- Create: `Sanity Blogs/schemaTypes/objects/article-image.ts`.
- Create: `Sanity Blogs/schemaTypes/objects/seo.ts`.
- Modify: `Sanity Blogs/schemaTypes/index.ts`.

**Interfaces:**

- Consumes: Sanity schema helpers and icons.
- Produces: registered `post`, `author`, `category`, `articleImage`, and `seo` schema types.

- [ ] **Step 1: Write the failing schema registration test**

Create `Sanity Blogs/schemaTypes/schema-types.test.ts`:

```typescript
import { describe, expect, it } from "vitest";
import { schemaTypes } from "./index";

type SchemaType = {
  name: string;
  fields?: Array<{
    name: string;
    type: string;
    options?: { hotspot?: boolean };
    of?: Array<{ type: string }>;
  }>;
};

function getSchema(name: string) {
  return (schemaTypes as SchemaType[]).find((schema) => schema.name === name);
}

function getField(schemaName: string, fieldName: string) {
  return getSchema(schemaName)?.fields?.find((field) => field.name === fieldName);
}

describe("blog schema", () => {
  it("registers the complete blog content model", () => {
    expect(schemaTypes.map((schema) => schema.name)).toEqual([
      "post",
      "author",
      "category",
      "articleImage",
      "seo",
    ]);
  });

  it("models reusable relationships and Portable Text", () => {
    expect(getField("post", "author")?.type).toBe("reference");
    expect(getField("post", "category")?.type).toBe("reference");
    expect(getField("post", "body")?.of?.map((member) => member.type)).toEqual([
      "block",
      "articleImage",
    ]);
  });

  it("enables image hotspots", () => {
    expect(getField("post", "mainImage")?.options?.hotspot).toBe(true);
    expect(getField("author", "image")?.options?.hotspot).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify the intended failure**

Run:

```powershell
npm --prefix "Sanity Blogs" test -- schemaTypes/schema-types.test.ts
```

Expected: the registration test fails because the clean template's `schemaTypes` array does not contain the five required types.

- [ ] **Step 3: Create the author and category documents**

Create `Sanity Blogs/schemaTypes/documents/author.ts`:

```typescript
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) =>
            rule.required().warning("Alternative text supports accessibility."),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
```

Create `Sanity Blogs/schemaTypes/documents/category.ts`:

```typescript
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
```

- [ ] **Step 4: Create the reusable object types**

Create `Sanity Blogs/schemaTypes/objects/seo.ts`:

```typescript
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Search results may truncate titles over 60 characters."),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule
          .max(160)
          .warning("Search results may truncate descriptions over 160 characters."),
    }),
  ],
});
```

Create `Sanity Blogs/schemaTypes/objects/article-image.ts`:

```typescript
import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleImage = defineType({
  name: "articleImage",
  title: "Article image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Article image",
        media,
      };
    },
  },
});
```

- [ ] **Step 5: Create the post document**

Create `Sanity Blogs/schemaTypes/documents/post.ts`:

```typescript
import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value?.current) return true;
          return (
            /^[a-z0-9-]+$/.test(value.current) ||
            "Use lowercase letters, numbers, and hyphens only."
          );
        }),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      validation: (rule) =>
        rule
          .required()
          .max(220)
          .warning("Keep the excerpt within 220 characters."),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
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
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in a new tab",
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
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, author, media, publishedAt }) {
      const details = [author, publishedAt?.slice(0, 10)].filter(Boolean).join(" · ");
      return {
        title,
        subtitle: details,
        media,
      };
    },
  },
});
```

- [ ] **Step 6: Register all types in dependency order**

Replace `Sanity Blogs/schemaTypes/index.ts` with:

```typescript
import { post } from "./documents/post";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { articleImage } from "./objects/article-image";
import { seo } from "./objects/seo";

export const schemaTypes = [post, author, category, articleImage, seo];
```

- [ ] **Step 7: Run the schema test and Studio checks**

Run:

```powershell
npm --prefix "Sanity Blogs" test -- schemaTypes/schema-types.test.ts
npm --prefix "Sanity Blogs" run typecheck
npm --prefix "Sanity Blogs" run build
```

Expected: the schema tests pass, TypeScript exits `0`, and the Studio production build exits `0`.

- [ ] **Step 8: Commit the content model**

Run:

```powershell
git add -- "Sanity Blogs/schemaTypes" "Sanity Blogs/sanity.config.ts" "Sanity Blogs/sanity.cli.ts" "Sanity Blogs/package.json" "Sanity Blogs/package-lock.json"
git diff --cached --check
git commit -m "feat: define Sanity blog content model"
```

Expected: the commit contains the tested schema and Studio configuration.

---

### Task 4: Build the Typed Frontend Sanity Data Layer

**Files:**

- Modify: `Frontend/package.json`.
- Modify: `Frontend/pnpm-lock.yaml`.
- Modify: `Frontend/.env.local.example`.
- Create: `Frontend/.env.local` (ignored).
- Modify: `Frontend/next.config.ts`.
- Create: `Frontend/src/sanity/env.ts`.
- Create: `Frontend/src/sanity/env.test.ts`.
- Create: `Frontend/src/sanity/lib/client.ts`.
- Create: `Frontend/src/sanity/lib/image.ts`.
- Create: `Frontend/src/sanity/lib/queries.ts`.
- Create: `Frontend/src/sanity/lib/posts.ts`.
- Create: `Frontend/src/sanity/lib/posts.test.ts`.
- Generate: `Frontend/sanity.types.ts`.

**Interfaces:**

- Consumes: published documents from Sanity project `859usc6z`, dataset `production`.
- Produces: `listPublishedPosts()`, `getPublishedPost(slug)`, `getPostMetadata(slug)`, and typed query results.

- [ ] **Step 1: Install only the required frontend packages**

Run:

```powershell
pnpm --dir "Frontend" add next-sanity @sanity/image-url
```

Expected: the frontend records both dependencies without adding direct `@sanity/client`, `@portabletext/react`, or `groq` packages.

- [ ] **Step 2: Write the failing data-access tests**

Create `Frontend/src/sanity/env.test.ts`:

```typescript
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const envPath = fileURLToPath(new URL("./env.ts", import.meta.url));

it("requires configured public Sanity values", async () => {
  expect(existsSync(envPath)).toBe(true);
  const { requirePublicEnv } = await import("./env");

  expect(requirePublicEnv("859usc6z", "PROJECT_ID")).toBe("859usc6z");
  expect(() => requirePublicEnv("", "PROJECT_ID")).toThrow(
    "Missing required environment variable: PROJECT_ID",
  );
});
```

Create `Frontend/src/sanity/lib/posts.test.ts`:

```typescript
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Sanity blog repository", () => {
  const fetchMock = vi.fn();
  const postsPath = fileURLToPath(new URL("./posts.ts", import.meta.url));

  beforeEach(() => {
    vi.resetModules();
    fetchMock.mockReset();
  });

  it("lists posts with timed revalidation", async () => {
    expect(existsSync(postsPath)).toBe(true);
    vi.doMock("./client", () => ({
      client: {
        fetch: fetchMock,
      },
    }));
    const { listPublishedPosts } = await import("./posts");
    const { BLOG_POSTS_QUERY } = await import("./queries");
    fetchMock.mockResolvedValueOnce([]);

    await expect(listPublishedPosts()).resolves.toEqual([]);

    expect(fetchMock).toHaveBeenCalledWith(
      BLOG_POSTS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
  });

  it("fetches one published post by a parameterized slug", async () => {
    expect(existsSync(postsPath)).toBe(true);
    vi.doMock("./client", () => ({
      client: {
        fetch: fetchMock,
      },
    }));
    const { getPublishedPost } = await import("./posts");
    const { BLOG_POST_QUERY } = await import("./queries");
    fetchMock.mockResolvedValueOnce(null);

    await expect(getPublishedPost("missing-post")).resolves.toBeNull();

    expect(fetchMock).toHaveBeenCalledWith(
      BLOG_POST_QUERY,
      { slug: "missing-post" },
      { next: { revalidate: 60 } },
    );
  });

  it("uses a focused metadata query", async () => {
    expect(existsSync(postsPath)).toBe(true);
    vi.doMock("./client", () => ({
      client: {
        fetch: fetchMock,
      },
    }));
    const { getPostMetadata } = await import("./posts");
    const { BLOG_POST_METADATA_QUERY } = await import("./queries");
    fetchMock.mockResolvedValueOnce(null);

    await getPostMetadata("missing-post");

    expect(fetchMock).toHaveBeenCalledWith(
      BLOG_POST_METADATA_QUERY,
      { slug: "missing-post" },
      { next: { revalidate: 60 } },
    );
  });
});
```

- [ ] **Step 3: Run the test and verify the intended failure**

Run:

```powershell
pnpm --dir "Frontend" test src/sanity/env.test.ts src/sanity/lib/posts.test.ts
```

Expected: `env.test.ts` and the repository tests fail at their explicit
`existsSync` assertions because the modules do not exist. The suite does not
fail during module resolution.

- [ ] **Step 4: Add validated public configuration**

Create `Frontend/src/sanity/env.ts`:

```typescript
export function requirePublicEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const apiVersion = "2026-07-17";
export const projectId = requirePublicEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);
export const dataset = requirePublicEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);
```

Replace `Frontend/.env.local.example` with:

```dotenv
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
NEXT_PUBLIC_SANITY_PROJECT_ID=859usc6z
NEXT_PUBLIC_SANITY_DATASET=production
```

Create ignored `Frontend/.env.local` with:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=859usc6z
NEXT_PUBLIC_SANITY_DATASET=production
```

- [ ] **Step 5: Create the client, image builder, and optimized queries**

Create `Frontend/src/sanity/lib/client.ts`:

```typescript
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: "published",
  useCdn: true,
});
```

Create `Frontend/src/sanity/lib/image.ts`:

```typescript
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

Create `Frontend/src/sanity/lib/queries.ts`:

```typescript
import { defineQuery } from "next-sanity";

const IMAGE_PROJECTION = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      }
    }
  },
  alt,
  crop,
  hotspot
`;

export const BLOG_POSTS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt)
  ]
  | order(publishedAt desc, _id asc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    },
    mainImage {
      ${IMAGE_PROJECTION}
    }
  }
`);

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    category->{
      title,
      "slug": slug.current
    },
    author->{
      name,
      role,
      image {
        ${IMAGE_PROJECTION}
      }
    },
    mainImage {
      ${IMAGE_PROJECTION}
    },
    body[]{
      ...,
      _type == "articleImage" => {
        _key,
        _type,
        caption,
        image {
          ${IMAGE_PROJECTION}
        }
      }
    },
    seo {
      title,
      description
    }
  }
`);

export const BLOG_POST_METADATA_QUERY = defineQuery(/* groq */ `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    title,
    excerpt,
    seo {
      title,
      description
    }
  }
`);
```

- [ ] **Step 6: Implement the data-access functions**

Create `Frontend/src/sanity/lib/posts.ts`:

```typescript
import { client } from "./client";
import {
  BLOG_POST_METADATA_QUERY,
  BLOG_POST_QUERY,
  BLOG_POSTS_QUERY,
} from "./queries";

const revalidationOptions = {
  next: { revalidate: 60 },
} as const;

export function listPublishedPosts() {
  return client.fetch(BLOG_POSTS_QUERY, {}, revalidationOptions);
}

export function getPublishedPost(slug: string) {
  return client.fetch(BLOG_POST_QUERY, { slug }, revalidationOptions);
}

export function getPostMetadata(slug: string) {
  return client.fetch(BLOG_POST_METADATA_QUERY, { slug }, revalidationOptions);
}
```

- [ ] **Step 7: Allow optimized Sanity images**

Replace `Frontend/next.config.ts` with:

```typescript
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/859usc6z/production/**",
      },
    ],
  },
} satisfies import("next").NextConfig;

export default nextConfig;
```

- [ ] **Step 8: Run the data tests**

Run:

```powershell
pnpm --dir "Frontend" test src/sanity/env.test.ts src/sanity/lib/posts.test.ts
```

Expected: the environment test and all three repository tests pass.

- [ ] **Step 9: Extract the schema and generate frontend types**

Run from the Studio folder:

```powershell
npm --prefix "Sanity Blogs" run typegen
```

Expected: `Sanity Blogs/schema.json` and `Frontend/sanity.types.ts` are generated; the generated file contains `BLOG_POSTS_QUERYResult`, `BLOG_POST_QUERYResult`, and `BLOG_POST_METADATA_QUERYResult`.

- [ ] **Step 10: Verify and commit the data layer**

Run:

```powershell
pnpm --dir "Frontend" typecheck
pnpm --dir "Frontend" test src/sanity/env.test.ts src/sanity/lib/posts.test.ts
git add -- "Frontend/package.json" "Frontend/pnpm-lock.yaml" "Frontend/.env.local.example" "Frontend/next.config.ts" "Frontend/src/sanity" "Frontend/sanity.types.ts" "Sanity Blogs/schema.json"
git diff --cached --check
git commit -m "feat: add typed Sanity blog data layer"
```

Expected: TypeScript and the focused tests exit `0`; the ignored `.env.local` is not staged.

---

### Task 5: Build Sanity-Backed Blog UI Components

**Files:**

- Create: `Frontend/src/components/blog/blog-date.ts`.
- Create: `Frontend/src/components/blog/sanity-image.tsx`.
- Create: `Frontend/src/components/blog/portable-text-components.tsx`.
- Create: `Frontend/src/components/blog/sanity-blog-card.tsx`.
- Create: `Frontend/src/components/blog/sanity-blog-listing.tsx`.
- Create: `Frontend/src/components/blog/sanity-blog-listing.test.tsx`.
- Create: `Frontend/src/components/blog/sanity-blog-article.tsx`.
- Create: `Frontend/src/components/blog/sanity-blog-article.test.tsx`.

**Interfaces:**

- Consumes: `BLOG_POSTS_QUERYResult` items and non-null `BLOG_POST_QUERYResult`.
- Produces: independently tested Sanity-backed components while the legacy
  static components continue serving the routes until Task 6.

- [ ] **Step 1: Write the failing listing and date-format behavior tests**

Create `Frontend/src/components/blog/sanity-blog-listing.test.tsx`:

```typescript
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import type { BLOG_POSTS_QUERYResult } from "../../../sanity.types";

const listingPath = fileURLToPath(
  new URL("./sanity-blog-listing.tsx", import.meta.url),
);

const posts = [
  {
    _id: "post-1",
    title: "Safe parking guide",
    slug: "safe-parking-guide",
    excerpt: "A practical guide for professional drivers.",
    publishedAt: "2024-11-11T12:00:00.000Z",
    category: { title: "Truck Driving Information", slug: "driver-information" },
    mainImage: null,
  },
] as BLOG_POSTS_QUERYResult;

it("renders queried posts through the existing card design", async () => {
  expect(existsSync(listingPath)).toBe(true);
  const { SanityBlogListing } = await import("./sanity-blog-listing");
  render(<SanityBlogListing posts={posts} />);

  const article = screen.getByRole("article");
  expect(within(article).getByRole("link")).toHaveAttribute(
    "href",
    "/blog/safe-parking-guide",
  );
  expect(within(article).getByText("Safe parking guide")).toBeInTheDocument();
  expect(within(article).getByText("Nov 11, 2024")).toBeInTheDocument();
});

it("renders an explicit empty state without fake pagination", async () => {
  expect(existsSync(listingPath)).toBe(true);
  const { SanityBlogListing } = await import("./sanity-blog-listing");
  render(<SanityBlogListing posts={[]} />);

  expect(
    screen.getByText("No blog posts have been published yet."),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("navigation", { name: "Blog pagination" }),
  ).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify the intended failures**

Run:

```powershell
pnpm --dir "Frontend" test src/components/blog/sanity-blog-listing.test.tsx
```

Expected: both tests fail at the explicit `existsSync` assertion because the
new component does not exist. The suite does not fail during module resolution.

- [ ] **Step 3: Implement date formatting and the shared image renderer**

Create `Frontend/src/components/blog/blog-date.ts`:

```typescript
const blogDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBlogDate(value: string) {
  return blogDateFormatter.format(new Date(value));
}
```

Create `Frontend/src/components/blog/sanity-image.tsx`:

```typescript
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

interface SanityImageValue {
  asset?: {
    _id?: string | null;
    url?: string | null;
    metadata?: {
      lqip?: string | null;
    } | null;
  } | null;
  alt?: string | null;
}

interface SanityImageProps {
  value: SanityImageValue;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function SanityImage({
  value,
  width,
  height,
  className,
  sizes,
  priority,
}: SanityImageProps) {
  const lqip = value.asset?.metadata?.lqip;

  return (
    <Image
      src={urlFor(value as SanityImageSource)
        .width(width)
        .height(height)
        .fit("crop")
        .auto("format")
        .url()}
      alt={value.alt || ""}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip || undefined}
    />
  );
}
```

- [ ] **Step 4: Create the Sanity-backed card and listing**

Create `Frontend/src/components/blog/sanity-blog-card.tsx`:

```typescript
import Link from "next/link";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import { SanityImage } from "@/components/blog/sanity-image";
import { formatBlogDate } from "@/components/blog/blog-date";
import type { BLOG_POSTS_QUERYResult } from "../../../sanity.types";

type BlogPostSummary = BLOG_POSTS_QUERYResult[number];

interface BlogCardProps {
  post: BlogPostSummary;
}

export function SanityBlogCard({ post }: BlogCardProps) {
  const publishedAt = formatBlogDate(post.publishedAt);
  const category = post.category?.title || "TRUX";

  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}, ${category} — ${publishedAt}`}
        className="group flex flex-col gap-4 rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        {post.mainImage ? (
          <SanityImage
            value={post.mainImage}
            width={640}
            height={480}
            sizes="(min-width: 1440px) 304px, (min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-[14px] object-cover transition-opacity group-hover:opacity-90"
          />
        ) : (
          <BlogPlaceholderImage
            label={`${post.title} placeholder image`}
            className="aspect-[4/3] w-full transition-opacity group-hover:opacity-90"
          />
        )}
        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime={post.publishedAt}>{publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span className="truncate">{category}</span>
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
```

Create `Frontend/src/components/blog/sanity-blog-listing.tsx`:

```typescript
import { SanityBlogCard } from "@/components/blog/sanity-blog-card";
import type { BLOG_POSTS_QUERYResult } from "../../../sanity.types";

interface BlogListingProps {
  posts: BLOG_POSTS_QUERYResult;
}

export function SanityBlogListing({ posts }: BlogListingProps) {
  return (
    <section
      aria-label="Blog articles"
      className="mx-auto w-full max-w-[1280px] px-6 py-16 wide:py-24"
    >
      {posts.length ? (
        <div className="grid grid-cols-1 gap-x-4 gap-y-20 sm:grid-cols-2 wide:grid-cols-4">
          {posts.map((post) => (
            <SanityBlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-base text-muted">
          No blog posts have been published yet.
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 5: Run the listing and date-format behavior tests**

Run:

```powershell
pnpm --dir "Frontend" test src/components/blog/sanity-blog-listing.test.tsx
```

Expected: all listing, card, date-format, and empty-state assertions pass.

- [ ] **Step 6: Write the failing article test**

Create `Frontend/src/components/blog/sanity-blog-article.test.tsx`:

```typescript
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import type { BLOG_POST_QUERYResult } from "../../../sanity.types";

const articlePath = fileURLToPath(
  new URL("./sanity-blog-article.tsx", import.meta.url),
);

const post = {
  _id: "post-1",
  title: "Freight Broker vs. Dispatcher",
  slug: "freight-broker-vs-dispatcher",
  excerpt: "Understand who represents professional drivers.",
  publishedAt: "2024-11-11T12:00:00.000Z",
  category: { title: "Truck Driving Information", slug: "driver-information" },
  author: {
    name: "Lando Norris",
    role: "Product Designer",
    image: null,
  },
  mainImage: null,
  body: [
    {
      _key: "heading",
      _type: "block",
      style: "h2",
      markDefs: [],
      children: [
        {
          _key: "heading-span",
          _type: "span",
          marks: [],
          text: "Why the difference matters",
        },
      ],
    },
    {
      _key: "paragraph",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "paragraph-span",
          _type: "span",
          marks: [],
          text: "A broker represents freight while a dispatcher represents the carrier.",
        },
      ],
    },
  ],
  seo: null,
} as NonNullable<BLOG_POST_QUERYResult>;

it("renders queried article fields and Portable Text", async () => {
  expect(existsSync(articlePath)).toBe(true);
  const { SanityBlogArticle } = await import("./sanity-blog-article");
  render(<SanityBlogArticle post={post} />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Freight Broker vs. Dispatcher",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("Nov 11, 2024")).toBeInTheDocument();
  expect(screen.getByText("Lando Norris")).toBeInTheDocument();
  expect(screen.getByText("Product Designer")).toBeInTheDocument();

  const article = screen.getByRole("article");
  expect(
    within(article).getByRole("heading", {
      level: 2,
      name: "Why the difference matters",
    }),
  ).toBeInTheDocument();
  expect(
    within(article).getByText(
      "A broker represents freight while a dispatcher represents the carrier.",
    ),
  ).toBeInTheDocument();
});
```

- [ ] **Step 7: Run the article test and verify the intended failure**

Run:

```powershell
pnpm --dir "Frontend" test src/components/blog/sanity-blog-article.test.tsx
```

Expected: the test fails at the explicit `existsSync` assertion because the
new component does not exist. The suite does not fail during module resolution.

- [ ] **Step 8: Create typed Portable Text components**

Create `Frontend/src/components/blog/portable-text-components.tsx`:

```typescript
import type { PortableTextComponents } from "next-sanity";
import { SanityImage } from "@/components/blog/sanity-image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 first:mt-0">{children}</p>,
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
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-4 border-amber pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const openInNewTab = value?.openInNewTab === true;
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="text-amber underline underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    articleImage: ({ value }) => {
      if (!value?.image) return null;
      return (
        <figure className="mt-8">
          <SanityImage
            value={value.image}
            width={1440}
            height={900}
            sizes="(min-width: 768px) 768px, 100vw"
            className="aspect-[8/5] w-full rounded-[14px] object-cover"
          />
          {value.caption ? (
            <figcaption className="mt-2 text-sm text-muted">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};
```

- [ ] **Step 9: Create the Sanity-backed article component**

Create `Frontend/src/components/blog/sanity-blog-article.tsx`:

```typescript
import { PortableText } from "next-sanity";
import { BlogPlaceholderImage } from "@/components/blog/blog-placeholder-image";
import { formatBlogDate } from "@/components/blog/blog-date";
import { portableTextComponents } from "@/components/blog/portable-text-components";
import { SanityImage } from "@/components/blog/sanity-image";
import type { BLOG_POST_QUERYResult } from "../../../sanity.types";

type BlogPost = NonNullable<BLOG_POST_QUERYResult>;

interface BlogArticleProps {
  post: BlogPost;
}

export function SanityBlogArticle({ post }: BlogArticleProps) {
  const publishedAt = formatBlogDate(post.publishedAt);
  const category = post.category?.title || "TRUX";

  return (
    <article className="mx-auto flex w-full max-w-[768px] flex-col gap-16 px-6 py-16 wide:py-24">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-sm leading-5 whitespace-nowrap text-muted">
            <time dateTime={post.publishedAt}>{publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{category}</span>
          </div>
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-[1px] text-[#fafafa] sm:text-5xl wide:text-[60px] wide:leading-[60px]">
            {post.title}
          </h1>
        </div>

        {post.author ? (
          <div className="flex items-center gap-4">
            {post.author.image ? (
              <SanityImage
                value={post.author.image}
                width={80}
                height={80}
                className="size-10 rounded-full object-cover"
              />
            ) : null}
            <div className="text-sm leading-5">
              <p className="font-medium text-[#fafafa]">{post.author.name}</p>
              {post.author.role ? (
                <p className="text-muted">{post.author.role}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {post.mainImage ? (
          <SanityImage
            value={post.mainImage}
            width={1440}
            height={900}
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="aspect-[8/5] w-full rounded-[14px] object-cover"
          />
        ) : (
          <BlogPlaceholderImage
            label="Article placeholder hero image"
            className="aspect-[8/5] w-full"
          />
        )}
      </header>

      <div className="text-base leading-6 text-[#fafafa]">
        {Array.isArray(post.body) ? (
          <PortableText value={post.body} components={portableTextComponents} />
        ) : null}
      </div>
    </article>
  );
}
```

- [ ] **Step 10: Run all component tests**

Run:

```powershell
pnpm --dir "Frontend" test src/components/blog/sanity-blog-listing.test.tsx src/components/blog/sanity-blog-article.test.tsx
pnpm --dir "Frontend" typecheck
```

Expected: component tests and TypeScript exit `0`.

- [ ] **Step 11: Commit the Sanity-backed UI**

Run:

```powershell
git add -- "Frontend/src/components/blog"
git diff --cached --check
git commit -m "feat: render Sanity content in blog components"
```

Expected: the commit contains the new Sanity-backed listing, empty state,
article, images, Portable Text, and focused tests without changing the active
routes.

---

### Task 6: Wire Sanity Data into the Blog Routes

**Files:**

- Modify: `Frontend/src/app/blog/page.tsx`.
- Modify: `Frontend/src/app/blog/page.test.tsx`.
- Modify: `Frontend/src/app/blog/[slug]/page.tsx`.
- Modify: `Frontend/src/app/blog/[slug]/page.test.tsx`.
- Delete: `Frontend/src/components/blog/blog-card.tsx`.
- Delete: `Frontend/src/components/blog/blog-listing.tsx`.
- Delete: `Frontend/src/components/blog/blog-article.tsx`.
- Delete: `Frontend/src/constants/blog-content.ts`.

**Interfaces:**

- Consumes: `listPublishedPosts()`, `getPublishedPost()`, and `getPostMetadata()`.
- Produces: Sanity-backed `/blog`, Sanity-backed `/blog/[slug]`, metadata fallbacks, and 404 behavior.

- [ ] **Step 1: Replace the listing route test with a failing repository-boundary test**

Replace `Frontend/src/app/blog/page.test.tsx` with:

```typescript
import { render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { listPublishedPosts } from "@/sanity/lib/posts";

vi.mock("@/sanity/lib/posts", () => ({
  listPublishedPosts: vi.fn(),
}));

const listPublishedPostsMock = vi.mocked(listPublishedPosts);

beforeEach(() => {
  listPublishedPostsMock.mockReset();
});

it("renders the empty Sanity state when no posts are published", async () => {
  listPublishedPostsMock.mockResolvedValueOnce([]);
  const blogPageModule = await import("./page");

  render(await blogPageModule.default());

  expect(listPublishedPostsMock).toHaveBeenCalledOnce();
  expect(
    screen.getByText("No blog posts have been published yet."),
  ).toBeInTheDocument();
  expect(screen.getByRole("main", { name: "TRUX blog" })).toHaveClass(
    "bg-midnight",
  );
});
```

- [ ] **Step 2: Run the listing route test and verify the intended failure**

Run:

```powershell
pnpm --dir "Frontend" test src/app/blog/page.test.tsx
```

Expected: the test fails because the route does not call `listPublishedPosts`
or pass posts into `SanityBlogListing`.

- [ ] **Step 3: Wire the listing route**

Replace `Frontend/src/app/blog/page.tsx` with:

```typescript
import type { Metadata } from "next";
import { SanityBlogListing } from "@/components/blog/sanity-blog-listing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { listPublishedPosts } from "@/sanity/lib/posts";

export const metadata: Metadata = {
  title: "TRUX Blog | Truck Parking and Driver Resources",
  description:
    "Read the latest TRUX news, truck driving information, parking guides, and industry resources.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <>
      <SiteHeader activeItem="Blog" />
      <main aria-label="TRUX blog" className="bg-midnight">
        <SanityBlogListing posts={posts} />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
```

Run:

```powershell
pnpm --dir "Frontend" test src/app/blog/page.test.tsx
```

Expected: the listing route test passes.

- [ ] **Step 4: Replace the detail test with failing query, metadata, and 404 tests**

Replace `Frontend/src/app/blog/[slug]/page.test.tsx` with:

```typescript
import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getPostMetadata,
  getPublishedPost,
} from "@/sanity/lib/posts";
import type { BLOG_POST_QUERYResult } from "../../../../sanity.types";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/sanity/lib/posts", () => ({
  getPostMetadata: vi.fn(),
  getPublishedPost: vi.fn(),
}));

const getPostMetadataMock = vi.mocked(getPostMetadata);
const getPublishedPostMock = vi.mocked(getPublishedPost);
const notFoundMock = vi.mocked(notFound);

const post = {
  _id: "post-1",
  title: "Freight Broker vs. Dispatcher",
  slug: "freight-broker-vs-dispatcher",
  excerpt: "Understand who represents professional drivers.",
  publishedAt: "2024-11-11T12:00:00.000Z",
  category: { title: "Truck Driving Information", slug: "driver-information" },
  author: { name: "Lando Norris", role: "Product Designer", image: null },
  mainImage: null,
  body: [],
  seo: null,
} as NonNullable<BLOG_POST_QUERYResult>;

describe("blog detail route", () => {
  beforeEach(() => {
    getPostMetadataMock.mockReset();
    getPublishedPostMock.mockReset();
    notFoundMock.mockClear();
  });

  it("renders a post returned by Sanity", async () => {
    getPublishedPostMock.mockResolvedValueOnce(post);
    const pageModule = await import("./page");

    render(
      await pageModule.default({
        params: Promise.resolve({ slug: post.slug }),
      }),
    );

    expect(getPublishedPostMock).toHaveBeenCalledWith(post.slug);
    expect(
      screen.getByRole("heading", { level: 1, name: post.title }),
    ).toBeInTheDocument();
  });

  it("returns not found for an unknown slug", async () => {
    getPublishedPostMock.mockResolvedValueOnce(null);
    const pageModule = await import("./page");

    await expect(
      pageModule.default({
        params: Promise.resolve({ slug: "missing-post" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFoundMock).toHaveBeenCalledOnce();
  });

  it("uses SEO fields and falls back to the post excerpt", async () => {
    getPostMetadataMock
      .mockResolvedValueOnce({
        title: post.title,
        excerpt: post.excerpt,
        seo: {
          title: "Custom search title",
          description: null,
        },
      })
      .mockResolvedValueOnce(null);
    const pageModule = await import("./page");

    await expect(
      pageModule.generateMetadata({
        params: Promise.resolve({ slug: post.slug }),
      }),
    ).resolves.toMatchObject({
      title: "Custom search title",
      description: post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
    });

    await expect(
      pageModule.generateMetadata({
        params: Promise.resolve({ slug: "missing-post" }),
      }),
    ).resolves.toEqual({});
  });
});
```

- [ ] **Step 5: Run the detail tests and verify the intended failures**

Run:

```powershell
pnpm --dir "Frontend" test "src/app/blog/[slug]/page.test.tsx"
```

Expected: tests fail because the detail route still reads static constants, has `dynamicParams = false`, and ignores the Sanity repository.

- [ ] **Step 6: Wire the detail route and metadata**

Replace `Frontend/src/app/blog/[slug]/page.tsx` with:

```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SanityBlogArticle } from "@/components/blog/sanity-blog-article";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import {
  getPostMetadata,
  getPublishedPost,
} from "@/sanity/lib/posts";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostMetadata(slug);

  if (!post) return {};

  return {
    title: post.seo?.title || `${post.title} | TRUX Blog`,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) notFound();

  return (
    <>
      <SiteHeader activeItem={null} />
      <main aria-label="TRUX blog article" className="bg-midnight">
        <SanityBlogArticle post={post} />
      </main>
      <SiteFooter activeItem={null} />
    </>
  );
}
```

- [ ] **Step 7: Remove the legacy static blog components and content**

Run:

```powershell
rg -n "blog-content" "Frontend/src"
```

Expected before deletion: the only matches are inside the legacy static
components.

Delete:

- `Frontend/src/components/blog/blog-card.tsx`
- `Frontend/src/components/blog/blog-listing.tsx`
- `Frontend/src/components/blog/blog-article.tsx`
- `Frontend/src/constants/blog-content.ts`

Run:

```powershell
rg -n "blog-content|blogPosts|blogArticle|getBlogPost" "Frontend/src"
```

Expected: no matches.

- [ ] **Step 8: Run route and full frontend tests**

Run:

```powershell
pnpm --dir "Frontend" test src/app/blog/page.test.tsx "src/app/blog/[slug]/page.test.tsx"
pnpm --dir "Frontend" test
pnpm --dir "Frontend" typecheck
pnpm --dir "Frontend" lint
```

Expected: all tests pass, TypeScript exits `0`, and ESLint reports no warnings or errors.

- [ ] **Step 9: Regenerate types after final query usage**

Run:

```powershell
npm --prefix "Sanity Blogs" run typegen
pnpm --dir "Frontend" typecheck
```

Expected: TypeGen and the frontend typecheck both exit `0`, with no unexpected generated diff beyond `Frontend/sanity.types.ts` and `Sanity Blogs/schema.json`.

- [ ] **Step 10: Commit the route integration**

Run:

```powershell
git add -- "Frontend/src/app/blog" "Frontend/src/components/blog/blog-card.tsx" "Frontend/src/components/blog/blog-listing.tsx" "Frontend/src/components/blog/blog-article.tsx" "Frontend/src/constants/blog-content.ts" "Frontend/sanity.types.ts" "Sanity Blogs/schema.json"
git diff --cached --check
git commit -m "feat: connect blog routes to Sanity"
```

Expected: the commit replaces static route data with the tested Sanity repository and removes the hard-coded content module.

---

### Task 7: Deploy Configuration and Verify the Complete System

**Files:**

- No additional source files expected.
- External changes: deploy schema and add local CORS origin to Sanity project `859usc6z`.

**Interfaces:**

- Consumes: the completed Studio and frontend.
- Produces: deployed schema, credentialed `http://localhost:3000` CORS origin, passing builds, and local smoke-test evidence.

- [ ] **Step 1: Run the complete Studio verification**

Run:

```powershell
npm --prefix "Sanity Blogs" test
npm --prefix "Sanity Blogs" run typecheck
npm --prefix "Sanity Blogs" run typegen
npm --prefix "Sanity Blogs" run build
```

Expected: all commands exit `0`; schema tests report zero failures; TypeGen refreshes committed output; Studio build completes.

- [ ] **Step 2: Run the complete frontend verification**

Run:

```powershell
pnpm --dir "Frontend" test
pnpm --dir "Frontend" typecheck
pnpm --dir "Frontend" lint
pnpm --dir "Frontend" format:check
pnpm --dir "Frontend" build
```

Expected: all commands exit `0`; tests report zero failures; formatting, typecheck, lint, and production build are clean.

- [ ] **Step 3: Deploy the schema**

Run:

```powershell
npm --prefix "Sanity Blogs" exec -- sanity schema deploy
```

Expected: the CLI confirms that the current schema was deployed to project `859usc6z`, dataset `production`. If authentication is required, complete the Sanity login flow and rerun this exact command.

- [ ] **Step 4: Add the local frontend CORS origin**

Run:

```powershell
npm --prefix "Sanity Blogs" exec -- sanity cors add http://localhost:3000 --credentials
```

Expected: Sanity confirms `http://localhost:3000` as a credentialed CORS origin. Do not add a production origin without a confirmed deployment URL.

- [ ] **Step 5: Confirm no content was created**

Run:

```powershell
npm --prefix "Sanity Blogs" exec -- sanity documents query 'count(*[_type in ["post", "author", "category"]])'
```

Expected: the query returns the pre-existing count. For a new empty dataset it returns `0`; this implementation does not create or import documents.

- [ ] **Step 6: Start both applications in hidden background processes**

Run:

```powershell
$frontendProcess = Start-Process -FilePath "pnpm.cmd" -ArgumentList "--dir", "Frontend", "dev" -WorkingDirectory "D:\Trux Marketing" -WindowStyle Hidden -PassThru
$studioProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "--prefix", "Sanity Blogs", "run", "dev" -WorkingDirectory "D:\Trux Marketing" -WindowStyle Hidden -PassThru
$pidStatePath = Join-Path ([System.IO.Path]::GetTempPath()) "trux-marketing-sanity-dev-pids.json"

@{
  frontend = $frontendProcess.Id
  studio = $studioProcess.Id
} | ConvertTo-Json | Set-Content -LiteralPath $pidStatePath

Write-Output "Frontend PID: $($frontendProcess.Id)"
Write-Output "Studio PID: $($studioProcess.Id)"
Write-Output "PID state: $pidStatePath"
```

Expected: both processes remain running; frontend listens on port `3000`, Studio listens on port `3333`.

- [ ] **Step 7: Smoke-test the frontend in a browser**

Verify:

1. Open `http://localhost:3000/blog`.
2. Confirm the page preserves the TRUX header, midnight background, footer, and shows `No blog posts have been published yet.`.
3. Confirm the browser console has no errors.
4. Navigate to `http://localhost:3000/blog/not-a-real-post`.
5. Confirm the route returns the application's 404 response.

Expected: both server and client navigation paths behave without console errors.

- [ ] **Step 8: Smoke-test the standalone Studio**

Verify:

1. Open `http://localhost:3333`.
2. Confirm the Studio title is `Testing`.
3. Confirm Post, Author, and Category appear as independent document types.
4. Confirm creating a new Post exposes title, slug, excerpt, publication date, main image, author, category, body, and SEO fields.
5. Exit without publishing or creating a document.

Expected: the Studio works independently from Next.js and no production content is added.

- [ ] **Step 9: Stop only the recorded development processes**

Read the exact PIDs recorded by Step 6, verify that both processes still exist,
and stop only those processes:

```powershell
$pidStatePath = Join-Path ([System.IO.Path]::GetTempPath()) "trux-marketing-sanity-dev-pids.json"
$pidState = Get-Content -Raw -LiteralPath $pidStatePath | ConvertFrom-Json
$recordedPids = @([int]$pidState.frontend, [int]$pidState.studio)
$runningPids = Get-Process -Id $recordedPids -ErrorAction Stop | Select-Object -ExpandProperty Id

if (@($runningPids).Count -ne 2) {
  throw "One or more recorded development processes are no longer running."
}

Stop-Process -Id $recordedPids
```

Expected: only the two processes started by this task are stopped.

- [ ] **Step 10: Review the final diff and commit generated updates**

Run:

```powershell
git status --short
git diff --check
git diff --stat
git add -- "Frontend/sanity.types.ts" "Sanity Blogs/schema.json"
git diff --cached --check
git commit -m "chore: verify Sanity blog integration"
```

Expected: only expected generated changes are committed. If TypeGen produced no diff, skip the empty commit.

- [ ] **Step 11: Run one final fresh verification after the last commit**

Run:

```powershell
npm --prefix "Sanity Blogs" test
npm --prefix "Sanity Blogs" run typecheck
npm --prefix "Sanity Blogs" run build
pnpm --dir "Frontend" test
pnpm --dir "Frontend" typecheck
pnpm --dir "Frontend" lint
pnpm --dir "Frontend" build
git status --short
```

Expected: all verification commands exit `0`, tests report zero failures, both production builds succeed, and `git status --short` is empty.
