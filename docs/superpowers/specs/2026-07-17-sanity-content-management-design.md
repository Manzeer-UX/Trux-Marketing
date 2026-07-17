# Sanity Content and Website Image Management Design

**Date:** 2026-07-17

**Project:** TRUX Marketing

**Sanity project ID:** `aibxkdr2`

**Sanity dataset:** `marketing_insights123`

## Goal

Replace the hard-coded blog content workflow with Sanity Studio and allow
content editors to replace website imagery through Studio without editing the
Next.js codebase. App-store badges and map-marker assets remain code-controlled.

## Current State

- The website is a Next.js 16 App Router application at the repository root.
- Blog summaries and one article are hard-coded in
  `src/constants/blog-content.ts`.
- Blog cards and article imagery currently use placeholder assets.
- Marketing, About, Partners, Lot Owners, Locations, header, and footer imagery
  is referenced directly from `public/assets`.
- There are no Sanity packages, schemas, queries, environment variables, or
  Studio application in the current branch.

## Scope

### Included

- A standalone Sanity Studio in `studio/` in the same repository.
- Blog post, author, category, rich-text, SEO, and image schemas.
- A singleton Studio document for all non-blog website imagery.
- Sanity-backed blog listing and article routes.
- Sanity-backed images throughout the existing website.
- Image crop, hotspot, alt text, and optional caption support.
- Published-content live updates through `next-sanity`.
- Generated Sanity query types.
- Local image fallbacks while Studio image fields are empty.
- Studio structure organized for non-technical content editors.
- Automated tests and build verification for both applications.

### Excluded

- App-store badges:
  - `/assets/app-store.svg`
  - `/assets/google-play.svg`
- Map-marker and map-pin assets, including:
  - `/assets/hero-map-marker-default.svg`
  - `/assets/hero-map-marker-active.svg`
  - `/assets/lot-owners-map-pin.svg`
- Rewriting the non-blog marketing copy as CMS content.
- Visual page building or arbitrary page layouts.
- Draft preview and click-to-edit overlays in this phase.
- Migrating placeholder blog entries into Sanity as published content.

## Architecture

The repository will contain two applications:

```text
trux-marketing/
├── studio/          # Standalone Sanity Studio
├── src/             # Existing Next.js application
└── package.json     # Website scripts plus Studio convenience scripts
```

The Studio will use Sanity's Vite-based standalone application rather than an
embedded `/studio` Next.js route. This preserves Studio auto-updates, fast
development builds, and TypeGen watch support while keeping both applications
in one repository.

The Studio and website will connect to project `aibxkdr2` and dataset
`marketing_insights123`. These identifiers are public configuration values.
`SANITY_API_READ_TOKEN`, when required by dataset visibility or Live Content,
will remain an uncommitted server environment variable.

## Content Model

### `blogPost`

An ordinary Sanity document with generated `_id` values.

Fields:

- `title` — required string.
- `slug` — required slug generated from the title and unique within posts.
- `excerpt` — required short text used by cards and metadata.
- `publishedAt` — required datetime.
- `category` — required reference to `category`.
- `author` — required reference to `author`.
- `coverImage` — required `managedImage`.
- `body` — required Portable Text array with headings, paragraphs, lists,
  links, and inline `articleImage` blocks.
- `seo` — optional object containing SEO title, description, and social image.

Studio previews show the post title, category, publication date, and cover
image.

### `author`

An ordinary Sanity document with:

- `name` — required string.
- `slug` — required unique slug.
- `role` — optional string.
- `bio` — optional Portable Text.
- `image` — required `managedImage`.

### `category`

An ordinary Sanity document with:

- `title` — required string.
- `slug` — required unique slug.
- `description` — optional text.

### `managedImage`

A reusable object containing:

- `image` — required Sanity image with hotspot enabled.
- `alt` — required accessible alternative text.
- `caption` — optional text.

The object keeps accessibility metadata next to each asset and supports
editor-controlled cropping.

### `managedDecorativeImage`

A reusable object for image slots that are decorative in the existing
interface. It contains the required hotspot-enabled image and an optional
Studio description. The frontend always renders these known decorative slots
with `alt=""`; editors do not enter misleading alternative text for them.

### `articleImage`

A Portable Text object containing a `managedImage`. The frontend renders it as
semantic `figure`, image, and optional `figcaption` elements.

### `seo`

A reusable object containing:

- `title` — optional SEO title with a practical length limit.
- `description` — optional meta description with a practical length limit.
- `image` — optional `managedImage` for social sharing.

### `websiteImages` Singleton

The singleton uses the fixed document ID `websiteImages`. Studio Structure
exposes only that document and removes the type from generic document creation,
preventing duplicate settings documents.

Fields are grouped for editor clarity:

- **Brand and global**
  - Header logo
  - Footer logo
  - Facebook icon
  - LinkedIn icon
  - Instagram icon
- **Home**
  - Coverage map
  - Phone application image
  - Secure feature icon
  - Easy feature icon
  - Availability feature icon
  - Service feature icon
- **About**
  - Hero image
  - Team decorative image
- **Partners**
  - Hero image
  - OTR partner image
  - Marquee partner image
  - ES partner image
- **Lot Owners**
  - Revenue benefit icon
  - Staffing benefit icon
  - Payments benefit icon
  - Tenants benefit icon
- **Locations**
  - Default primary location photo
  - Default location gallery images
- **Blog defaults**
  - Optional empty-state image

The initial fields are optional so existing local assets remain visible until
an editor uploads replacements. Every rendered image slot can then be replaced
from this singleton without a code change.

## Studio Experience

The Studio desk contains:

1. **Website Images** — the singleton image-management screen.
2. A divider.
3. **Blog**
   - Posts
   - Authors
   - Categories

The Vision query tool remains available for development. Fieldsets and groups
keep the large website-image document navigable. Validation prevents publishing
incomplete blog documents, missing accessibility text, invalid slugs, and
missing post relationships.

## Frontend Integration

### Sanity Client and Live Content

The Next.js application will use:

- `next-sanity` for the client, `defineQuery`, Portable Text, and Live Content.
- `@sanity/image-url` for hotspot-aware responsive image URLs.
- A dated Sanity API version.
- `useCdn: true` for normal published-content reads.
- `useCdn: false` for static slug discovery where freshness matters.

The root layout renders `SanityLive`, allowing published changes to invalidate
cached content without a website deployment. The optional read token is loaded
only from server environment configuration.

### Queries

All GROQ queries use `defineQuery`, parameters, and explicit projections.

Queries include:

- Paginated published blog summaries ordered by `publishedAt desc` and `_id`.
- Blog post count for pagination.
- One published blog post by slug.
- Published blog slugs for static generation.
- Metadata-only post query with Stega disabled.
- Page-specific projections from the `websiteImages` singleton so a route
  downloads only the image fields it renders.

References are resolved in projections, not filters. Image projections include
asset data and accessibility metadata required by the frontend.

### Blog Routes

`/blog` becomes an async Server Component that loads Sanity posts and count
data. Existing visual styling remains, while pagination links become functional
through the `page` search parameter. When no posts exist, the page shows a
friendly empty state instead of placeholder cards.

`/blog/[slug]` loads the matching post, returns `notFound()` for an unknown
slug, renders post-specific metadata, and renders Portable Text with typed
components. New published slugs work without code changes. Dynamic parameters
remain enabled so newly published posts are not limited to build-time slugs.

The hard-coded `blog-content.ts` data is removed after its consumers are
migrated.

### Website Images

The integration separates data fetching from presentation:

- Sanity server functions fetch global or page-specific image data.
- Presentational components receive resolved image values and fallback paths.
- A focused image component handles Sanity URL generation, dimensions, crop,
  hotspot, alt text, captions, and local fallback rendering.

Existing local assets remain fallback values. Uploading a replacement to the
corresponding Studio field takes precedence on the next Live Content update.
App-store badges and map markers continue to use their current local paths and
are not represented in Sanity schemas or queries.

## Error Handling and Resilience

- Unknown or unpublished blog slugs return the existing 404 page.
- An empty published post collection renders a clear empty state.
- Missing optional website-image fields use their current local asset.
- Required blog images and relationships are enforced before publishing.
- Image rendering checks for valid asset references before building a URL.
- Frontend error boundaries continue to handle unexpected Sanity request
  failures.
- Sanity's CDN and Next.js caching retain the most recent published response
  during brief upstream interruptions.
- No API read or write token is committed or exposed through public environment
  variables.

## Type Safety

Studio TypeGen extracts the schema and the website queries and generates types
inside the frontend source tree. Frontend query functions and components use
those generated result types rather than manually duplicating the Sanity
document model.

Type generation is available as an explicit script and runs as part of Studio
development/build workflows where supported.

## Testing Strategy

Implementation follows test-first development.

Tests will cover:

- Blog list mapping, sorting, pagination, and empty state.
- Blog detail rendering for title, metadata, author, cover image, and Portable
  Text content.
- Unknown blog slug behavior.
- Sanity image rendering and local fallback behavior.
- Website-image field mapping to the correct existing component slots.
- Continued local rendering of app-store badges and map markers.
- Schema registration and singleton structure behavior where practical.
- Environment configuration validation without exposing secrets.

Verification commands:

- Focused Vitest tests during each red-green cycle.
- Full `pnpm test`.
- `pnpm typecheck`.
- `pnpm lint`.
- `pnpm build`.
- Studio schema extraction and TypeGen.
- Standalone Studio production build.

The starting branch has one known baseline timing issue: the full test suite
timed out once in `src/app/location-details.test.tsx`, while the same test
passed when run alone. This pre-existing parallel-suite flake is outside the
Sanity scope and will be reported separately from regressions introduced by
this work.

## Configuration and Editorial Workflow

Repository configuration will document:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=aibxkdr2`
- `NEXT_PUBLIC_SANITY_DATASET=marketing_insights123`
- Optional `SANITY_API_READ_TOKEN` for private data or authenticated live reads.
- Local Studio URL on port `3333`.
- Required CORS origins for local and deployed website URLs.
- Commands for Studio development, schema deployment, TypeGen, Studio build,
  and Studio deployment.

Editorial workflow:

1. Sign into the standalone Sanity Studio.
2. Create authors and categories as needed.
3. Create a blog post, upload its cover image, write the Portable Text body,
   add inline images, and publish.
4. Open Website Images to upload a replacement for any managed site image.
5. Publish the singleton change.
6. The website receives the published update without a code edit.

## Acceptance Criteria

- The standalone Studio runs against project `aibxkdr2` and dataset
  `marketing_insights123`.
- Editors can create, update, publish, and remove blog posts through Studio.
- Blog listing, detail content, authors, categories, cover images, and inline
  images come from Sanity.
- All existing website image slots other than app-store badges and map markers
  have a corresponding Studio-managed field.
- Replacing a populated Studio image changes the website without editing source
  code.
- Empty website-image fields retain the current local presentation.
- App-store badges and map markers remain local and unaffected.
- Secrets are documented but never committed.
- Frontend and Studio verification complete without new failures.
