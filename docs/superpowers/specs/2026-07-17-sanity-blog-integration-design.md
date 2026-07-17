# Sanity Blog Integration Design

## Goal

Reorganize the existing repository into two sibling applications under
`D:\Trux Marketing`:

- `Frontend`: the existing Next.js marketing application and its design
  documentation.
- `Sanity Blogs`: a standalone Sanity Studio connected to project `859usc6z`
  and the `production` dataset.

The existing `/blog` and `/blog/[slug]` routes will retain their current visual
design while replacing hard-coded placeholder content with published content
from Sanity.

## Repository Layout

The existing Git repository remains rooted at `D:\Trux Marketing` so both
applications are versioned together.

```text
D:\Trux Marketing
├── .git
├── .gitignore
├── .agents
├── .superpowers
├── .worktrees
├── Frontend
│   ├── docs
│   ├── public
│   ├── src
│   ├── design.md
│   ├── package.json
│   └── pnpm-lock.yaml
└── Sanity Blogs
    ├── schemaTypes
    ├── sanity.cli.ts
    ├── sanity.config.ts
    └── package.json
```

The root `.gitignore` remains shared. Existing Next.js source, assets,
configuration, local environment files, package metadata, lockfile, design
documents, and app-specific documentation move into `Frontend`. Generated
build output and installed dependencies are not treated as source; they may be
regenerated in their new application folders.

No root workspace package is required. Each application manages its own
dependencies and development commands.

## Sanity Studio

Create the standalone Studio from the repository root with the Sanity CLI,
using:

- Project ID: `859usc6z`
- Organization ID: `oHjVtamMe`
- Dataset: `production`
- Template: `clean`
- Language: TypeScript
- Output folder: `Sanity Blogs`

The Studio will not be embedded in Next.js. It runs independently on
`http://localhost:3333`, while the Next.js app runs on
`http://localhost:3000`.

The schema will be deployed to the existing `production` dataset. The dataset
will remain empty after setup; the current demo article and 12 placeholder
cards will not be imported.

## Content Model

### Post

The `post` document represents a published blog article:

- `title`: required string.
- `slug`: required, unique slug generated from the title and limited to
  lowercase letters, digits, and hyphens.
- `excerpt`: required text with an editorial length warning.
- `publishedAt`: required datetime.
- `mainImage`: required Sanity image with hotspot support and required
  alternative text.
- `author`: required reference to an `author`.
- `category`: required reference to a `category`.
- `body`: required Portable Text array supporting paragraphs, headings, lists,
  links, and reusable article image blocks.
- `seo`: document-specific object containing optional SEO title and
  description.

### Author

The reusable `author` document contains:

- `name`: required string.
- `role`: optional string.
- `image`: Sanity image with hotspot support and required alternative text
  when an image is provided.

### Category

The reusable `category` document contains:

- `title`: required string.
- `slug`: required, unique slug generated from the title.

All schemas use Sanity's `defineType`, `defineField`, and `defineArrayMember`
helpers. Documents receive Sanity-generated IDs. Relationships use references
rather than deterministic IDs or embedded copies.

## Frontend Integration

Install `next-sanity` and `@sanity/image-url` in `Frontend`. Do not install
duplicate direct dependencies already provided by `next-sanity`.

Public environment variables in `Frontend` provide the project ID and dataset:

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=859usc6z
NEXT_PUBLIC_SANITY_DATASET=production
```

The Sanity client uses a fixed API version of `2026-07-17`, published-content
access, and the CDN for runtime reads. Blog queries use `defineQuery` and
request only fields needed by the corresponding page or component.

The Studio TypeGen configuration scans queries in `../Frontend` and writes the
generated query result types to `../Frontend/sanity.types.ts`.

### Blog Listing

`/blog` fetches published posts ordered by `publishedAt` descending. Each
result supplies:

- document ID;
- title and slug;
- excerpt;
- formatted publication source value;
- expanded category title;
- main image data, including alt text, crop, and hotspot.

The existing grid and card styling remain. An empty dataset renders a clear,
non-error empty state instead of placeholder cards. The existing decorative
pagination is removed or disabled until real pagination is implemented; no
nonfunctional navigation controls are introduced.

### Blog Detail

`/blog/[slug]` fetches one published post by `slug.current`, including expanded
author and category data, main image metadata, SEO fields, and Portable Text
body content. Missing posts call Next.js `notFound()`.

The existing article layout remains. A typed Portable Text component maps
headings, paragraphs, lists, links, and article image blocks onto the current
TRUX typography and spacing. Sanity images use the URL builder at appropriate
display dimensions and preserve editor-defined crop and hotspot information.

`generateMetadata` fetches clean, published data without Visual Editing
annotations. It uses the post's nested SEO values when present and falls back
to the post title and excerpt.

## Data Flow

```text
Editor
  -> standalone Sanity Studio
  -> production Content Lake
  -> GROQ query from a Next.js Server Component
  -> typed view data
  -> existing BlogCard or BlogArticle UI
```

Published content uses time-based revalidation so normal requests are served
efficiently and recent edits appear without rebuilding the application. Draft
Mode, Presentation, Visual Editing, webhook revalidation, and authenticated
preview tokens are deliberately outside this initial scope.

## Error Handling

- Missing public Sanity configuration fails fast with a clear configuration
  error during development or build.
- A failed listing fetch renders through the existing Next.js route error
  boundary rather than silently showing stale hard-coded data.
- An empty successful listing renders the explicit empty state.
- An unknown or unpublished post slug returns the existing 404 flow.
- Missing optional author details or SEO fields use typed fallbacks.
- Required schema validation prevents publishing posts without the fields
  needed by the frontend.

## External Configuration

Add `http://localhost:3000` as a credentialed CORS origin for the Sanity
project. Production CORS configuration is not added until a production
frontend URL is supplied.

Deploy the completed schema with the Sanity CLI so the Studio and Content Lake
recognize the new document types. No sample documents are created in the
production dataset.

## Testing and Verification

The implementation will preserve or replace existing tests with deterministic
tests around the new data boundary:

- Schema tests verify the registered document types and critical validation
  configuration.
- Frontend query/data tests cover listing data, detail data, empty listings,
  and missing slugs.
- Component tests verify that Sanity-backed props preserve the existing blog
  card and article presentation.
- Route tests mock the Sanity query boundary rather than the network.

Before completion:

1. Run Studio tests or schema checks, TypeScript checks, lint, and production
   build.
2. Deploy the schema if Sanity authentication permits it.
3. Run Frontend unit tests, typecheck, lint, and production build.
4. Start both development servers.
5. Verify `/blog` loads without console errors when the dataset is empty.
6. Verify a missing `/blog/[slug]` route returns 404.
7. Confirm the Studio opens independently and lists Post, Author, and Category.

## Non-Goals

- Embedding Sanity Studio in the Next.js application.
- Importing the existing demo article or placeholder cards.
- Creating production content.
- Adding Draft Mode, Presentation, Visual Editing, or preview tokens.
- Adding production CORS origins without a confirmed production URL.
- Reworking unrelated marketing pages or visual design.
