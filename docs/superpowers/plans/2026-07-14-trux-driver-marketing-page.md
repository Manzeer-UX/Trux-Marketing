# TRUX Driver Marketing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved TRUX driver marketing page as a pixel-accurate, responsive, static visual demo from Figma node `1309:2475`.

**Architecture:** Use a statically rendered Next.js App Router page composed from focused Server Components, typed content constants, reusable UI primitives, and local Figma exports. Tailwind CSS v4 theme tokens encode the Figma design system; complex maps and the phone mockup are flattened local images while page content remains semantic HTML.

**Tech Stack:** Next.js 16.2.10, React 19, TypeScript strict mode, Tailwind CSS v4, pnpm, CVA, clsx, tailwind-merge, Lucide React, Vitest, Testing Library, and Playwright.

## Global Constraints

- Use the latest stable Next.js 16+ release; 16.2.10 was verified as the stable `latest` release on 2026-07-14.
- Use React 19, TypeScript strict mode, Tailwind CSS v4, App Router, and pnpm.
- Follow `design.md`, `nextjs_standards.md`, and `docs/superpowers/specs/2026-07-14-trux-driver-marketing-page-design.md`.
- Figma file key is `0iOu7EEMEgAOvyr2x4tqU8`; the source frame is `1309:2475` at 1512 × 4224 px.
- The result is a visual demo only: no backend, API routes, Server Actions, authentication, persistence, analytics, map SDK, or working submissions.
- Use local Figma assets with `next/image`; render both map areas as static images.
- Use CSS variables and Tailwind theme tokens; do not use inline styles or hardcoded arbitrary color utilities.
- Default to Server Components; introduce no Client Component unless verification proves it necessary.
- Keep every component under 300 lines, typed, accessible, and focused on one responsibility.
- The page must avoid horizontal overflow down to 320 px and preserve at least 44 px touch targets.

## File Map

- `package.json` — scripts and pinned dependencies.
- `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs` — framework configuration.
- `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts` — automated verification.
- `src/app/layout.tsx` — fonts, metadata, and root shell.
- `src/app/page.tsx` — section composition only.
- `src/app/globals.css` — Tailwind import, Figma tokens, base styles, and shared layout utilities.
- `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/global-error.tsx`, `src/app/not-found.tsx` — required page states.
- `src/lib/cn.ts` — safe class merging.
- `src/components/ui/button.tsx` — reusable CVA button primitive.
- `src/constants/marketing-content.ts` — typed navigation, metrics, benefits, testimonials, and FAQs.
- `src/components/marketing/site-header.tsx` — responsive visual-only header.
- `src/components/marketing/hero-section.tsx` — hero copy, static search card, and map artwork.
- `src/components/marketing/stats-section.tsx` — amber metrics strip.
- `src/components/marketing/value-props-section.tsx` — benefit grid.
- `src/components/marketing/coverage-section.tsx` — coverage artwork and CTA.
- `src/components/marketing/testimonials-section.tsx` — testimonial rows.
- `src/components/marketing/faq-section.tsx` — closed visual FAQ rows.
- `src/components/marketing/app-download-section.tsx` — static phone form, badges, and device artwork.
- `src/components/marketing/site-footer.tsx` — footer navigation and legal content.
- `public/assets/*` — downloaded, descriptive Figma exports.
- `src/components/marketing/marketing-page.test.tsx` — DOM, content, and accessibility contract.
- `tests/e2e/marketing-page.spec.ts` — responsive layout and screenshot checks.

---

### Task 1: Scaffold the Next.js application and test harness

**Files:**

- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**

- Consumes: approved design spec and repository root.
- Produces: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm test:e2e` commands; `HomePage(): JSX.Element` at `/`.

- [ ] **Step 1: Create the package manifest and framework configuration**

```json
{
  "name": "trux-marketing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@tailwindcss/postcss": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "lucide-react": "latest",
    "next": "16.2.10",
    "react": "19",
    "react-dom": "19",
    "tailwind-merge": "latest",
    "tailwindcss": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@playwright/test": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "16.2.10",
    "jsdom": "latest",
    "prettier": "latest",
    "prettier-plugin-tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  },
  "packageManager": "pnpm@10.13.1"
}
```

Create `next.config.ts` with `const nextConfig = { typedRoutes: true } satisfies import("next").NextConfig; export default nextConfig;`, use `@tailwindcss/postcss` in `postcss.config.mjs`, extend `eslint-config-next/core-web-vitals` plus TypeScript rules in `eslint.config.mjs`, and enable `strict`, `noUncheckedIndexedAccess`, `moduleResolution: "bundler"`, and the `@/* -> ./src/*` alias in `tsconfig.json`.

- [ ] **Step 2: Install dependencies**

Run: `pnpm install`

Expected: exit code 0 and a new `pnpm-lock.yaml`.

- [ ] **Step 3: Write the failing route smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "./page";

it("renders the TRUX driver page landmark", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("main", { name: "TRUX driver parking" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the smoke test and verify failure**

Run: `pnpm test src/app/page.test.tsx`

Expected: FAIL because the placeholder page does not expose the named `main` landmark.

- [ ] **Step 5: Add the minimal route implementation**

```tsx
export default function HomePage() {
  return <main aria-label="TRUX driver parking" />;
}
```

- [ ] **Step 6: Run the smoke test and commit**

Run: `pnpm test src/app/page.test.tsx`

Expected: one passing test.

```bash
git add package.json pnpm-lock.yaml next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts src/app/page.tsx src/app/page.test.tsx
git commit -m "chore: scaffold Next.js marketing app"
```

### Task 2: Establish fonts, design tokens, and reusable button styles

**Files:**

- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/lib/cn.ts`
- Create: `src/components/ui/button.tsx`
- Test: `src/components/ui/button.test.tsx`

**Interfaces:**

- Consumes: Tailwind v4 build and React.
- Produces: `cn(...inputs: ClassValue[]): string`; `Button` with `variant: "amber" | "blue" | "ghost"`, `size: "sm" | "md" | "lg"`, and native button props; CSS tokens `--color-midnight`, `--color-section`, `--color-amber`, `--color-trux-blue`, `--color-off-white`, `--color-warm-gray`, `--color-muted`, and `--color-border`.

- [ ] **Step 1: Write the failing button contract test**

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

it("renders an accessible amber button with merged classes", () => {
  render(<Button className="test-hook">Search Available Lots</Button>);
  const button = screen.getByRole("button", { name: "Search Available Lots" });
  expect(button).toHaveClass("bg-amber", "test-hook");
});
```

- [ ] **Step 2: Verify the test fails**

Run: `pnpm test src/components/ui/button.test.tsx`

Expected: FAIL because `Button` does not exist.

- [ ] **Step 3: Implement class merging and the CVA button**

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        amber: "bg-amber text-midnight hover:bg-amber/90",
        blue: "bg-trux-blue text-white hover:bg-trux-blue/90",
        ghost: "bg-transparent text-off-white hover:bg-white/10",
      },
      size: { sm: "px-4 text-sm", md: "px-5 text-sm", lg: "px-6 text-base" },
    },
    defaultVariants: { variant: "amber", size: "md" },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

Implement `cn` with `twMerge(clsx(inputs))`. In `globals.css`, import Tailwind, declare the exact Figma colors under `@theme inline`, define the 4–96 px spacing scale, display/body font variables, radii, borders, and body defaults. In `layout.tsx`, load Inter and Syne with `next/font/google`, attach their variables to `<body>`, and define title, description, root canonical, Open Graph, and Twitter metadata.

- [ ] **Step 4: Run tests, typecheck, and commit**

Run: `pnpm test src/components/ui/button.test.tsx && pnpm typecheck`

Expected: tests pass and TypeScript exits 0.

```bash
git add src/app/layout.tsx src/app/globals.css src/lib/cn.ts src/components/ui/button.tsx src/components/ui/button.test.tsx
git commit -m "feat: add TRUX design tokens and UI primitives"
```

### Task 3: Export Figma artwork and define typed marketing content

**Files:**

- Create: `public/assets/trux-logo.svg`
- Create: `public/assets/hero-map.png`
- Create: `public/assets/coverage-map.png`
- Create: `public/assets/phone-app.png`
- Create: `public/assets/app-store.svg`
- Create: `public/assets/google-play.svg`
- Create: `public/assets/feature-secure.svg`
- Create: `public/assets/feature-availability.svg`
- Create: `public/assets/feature-easy.svg`
- Create: `public/assets/feature-service.svg`
- Create: `public/assets/social-facebook.svg`
- Create: `public/assets/social-linkedin.svg`
- Create: `public/assets/social-instagram.svg`
- Create: `src/constants/marketing-content.ts`
- Test: `src/constants/marketing-content.test.ts`

**Interfaces:**

- Consumes: Figma file `0iOu7EEMEgAOvyr2x4tqU8`, nodes `1309:2475` and `1532:12262`.
- Produces: `navItems`, `stats`, `valueProps`, `testimonials`, and `faqs` as readonly typed arrays; the exact local asset paths listed above.

- [ ] **Step 1: Write failing content-shape tests**

```ts
import {
  faqs,
  navItems,
  stats,
  testimonials,
  valueProps,
} from "./marketing-content";

it("captures every repeated item in the Figma page", () => {
  expect(navItems).toHaveLength(9);
  expect(stats).toHaveLength(4);
  expect(valueProps).toHaveLength(4);
  expect(testimonials).toHaveLength(3);
  expect(faqs).toHaveLength(7);
});
```

- [ ] **Step 2: Verify the content test fails**

Run: `pnpm test src/constants/marketing-content.test.ts`

Expected: FAIL because the content module does not exist.

- [ ] **Step 3: Export and normalize the artwork**

Use Figma `get_screenshot` at original resolution for `1532:12262` to create `hero-map.png`. Inspect `1309:2510` and `1309:2513` with `get_design_context`, then export the nested coverage artwork and completed phone mockup as `coverage-map.png` and `phone-app.png`. Download the logo, store badges, feature icons, and social icons from the asset URLs returned by `get_design_context`. Verify each file with `file` or PowerShell `Get-Item`, and visually inspect all three PNG composites before continuing.

- [ ] **Step 4: Implement the exact typed page copy**

```ts
export interface NavItem {
  label: string;
  href: "#";
  active?: boolean;
}
export interface Stat {
  value: string;
  label: string;
}
export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
}

export const navItems = [
  { label: "Lot Owners", href: "#" },
  { label: "Drivers", href: "#", active: true },
  { label: "Why Trux", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Referrals", href: "#" },
  { label: "Trux Perx", href: "#" },
  { label: "Locations", href: "#" },
  { label: "Blog", href: "#" },
] as const satisfies readonly NavItem[];

export const stats = [
  { value: "200+", label: "Verified truck lots" },
  { value: "25", label: "States and growing" },
  { value: "10K +", label: "Drivers trust Trux" },
  { value: "24/7", label: "Remote gate access" },
] as const satisfies readonly Stat[];
```

Continue the same module with the exact four benefit descriptions, three testimonial quotes/names/locations, and seven FAQ questions from the Figma reference. Use the explicit icon paths from the file list.

- [ ] **Step 5: Run the content test and commit**

Run: `pnpm test src/constants/marketing-content.test.ts`

Expected: one passing test.

```bash
git add public/assets src/constants/marketing-content.ts src/constants/marketing-content.test.ts
git commit -m "feat: add Figma artwork and marketing content"
```

### Task 4: Build the header, hero, and metrics strip

**Files:**

- Create: `src/components/marketing/site-header.tsx`
- Create: `src/components/marketing/hero-section.tsx`
- Create: `src/components/marketing/stats-section.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**

- Consumes: `Button`, `navItems`, `stats`, `/assets/trux-logo.svg`, and `/assets/hero-map.png`.
- Produces: `SiteHeader()`, `HeroSection()`, and `StatsSection()` Server Components.

- [ ] **Step 1: Write failing page contract tests for the top fold**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("TRUX marketing page", () => {
  it("renders the primary navigation and hero", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /The Safest Truck Parking Network/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Available TRUX parking lots around Atlanta",
      }),
    ).toBeInTheDocument();
  });

  it("renders all four metrics", () => {
    render(<HomePage />);
    for (const value of ["200+", "25", "10K +", "24/7"])
      expect(screen.getByText(value)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Verify the tests fail**

Run: `pnpm test src/components/marketing/marketing-page.test.tsx`

Expected: FAIL because the sections do not exist.

- [ ] **Step 3: Implement the header and static hero form**

Build `SiteHeader` as a 65 px desktop header with the 80 px logo, active Drivers underline, nine-item navigation split according to the Figma, Sign In, and two pill buttons. Hide the desktop navigation below 1024 px and show a labeled 44 px menu-icon button without click behavior.

Build `HeroSection` as a 640 px two-column desktop section: 620 px midnight search panel and a flexible map image. Use semantic heading/copy and a non-submitting field group made from `div`, `span`, and labels rather than a live form. Match the 540 × 198 px field card and the 191 × 44 px CTA; place the map with `fill`, `object-cover`, and the original right-side crop.

- [ ] **Step 4: Implement the metric strip and compose the top fold**

Build `StatsSection` at 251 px desktop height with amber background, the blue “BY THE NUMBERS” label, four data blocks, and the Figma separators. Compose these sections in `page.tsx` inside the named main landmark.

- [ ] **Step 5: Run tests and commit**

Run: `pnpm test src/components/marketing/marketing-page.test.tsx && pnpm typecheck`

Expected: all current tests pass and TypeScript exits 0.

```bash
git add src/components/marketing/site-header.tsx src/components/marketing/hero-section.tsx src/components/marketing/stats-section.tsx src/components/marketing/marketing-page.test.tsx src/app/page.tsx
git commit -m "feat: build TRUX header hero and stats"
```

### Task 5: Build value propositions, coverage, and testimonials

**Files:**

- Create: `src/components/marketing/value-props-section.tsx`
- Create: `src/components/marketing/coverage-section.tsx`
- Create: `src/components/marketing/testimonials-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**

- Consumes: `valueProps`, `testimonials`, `Button`, feature icons, and `/assets/coverage-map.png`.
- Produces: `ValuePropsSection()`, `CoverageSection()`, and `TestimonialsSection()` Server Components.

- [ ] **Step 1: Add failing middle-page tests**

```tsx
it("renders the benefits, coverage, and testimonials", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", { level: 2, name: "Why drivers choose TRUX." }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("article", { name: /testimonial by/i }),
  ).toHaveLength(3);
  expect(
    screen.getByRole("img", { name: "TRUX parking coverage across 25 states" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Explore Locations" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Verify the test fails**

Run: `pnpm test src/components/marketing/marketing-page.test.tsx`

Expected: FAIL because the middle sections are absent.

- [ ] **Step 3: Implement the three sections**

Match the Figma section heights at desktop: 560 px value props, 512 px coverage, and 510 px testimonials. Use a 50/50 value-prop layout with the heading on the left and a two-column feature grid on the right; use named borders and exact icon assets. Use a 55/45 coverage layout with the static map on the left, display heading and amber CTA on the right. Render testimonial rows as articles with amber quote marks, flexible quote text, and a fixed author column.

- [ ] **Step 4: Compose, test, and commit**

Run: `pnpm test src/components/marketing/marketing-page.test.tsx && pnpm typecheck`

Expected: all tests pass and TypeScript exits 0.

```bash
git add src/components/marketing/value-props-section.tsx src/components/marketing/coverage-section.tsx src/components/marketing/testimonials-section.tsx src/components/marketing/marketing-page.test.tsx src/app/page.tsx
git commit -m "feat: add benefits coverage and testimonials"
```

### Task 6: Build FAQs, app download, and footer

**Files:**

- Create: `src/components/marketing/faq-section.tsx`
- Create: `src/components/marketing/app-download-section.tsx`
- Create: `src/components/marketing/site-footer.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**

- Consumes: `faqs`, `navItems`, `Button`, store/social/logo assets, and `/assets/phone-app.png`.
- Produces: `FaqSection()`, `AppDownloadSection()`, and `SiteFooter()` Server Components.

- [ ] **Step 1: Add failing lower-page tests**

```tsx
it("renders the static FAQ and app download surfaces", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Frequently Asked Questions",
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("listitem", { name: /FAQ:/ })).toHaveLength(7);
  expect(
    screen.getByText("Book, access, and manage your spot all from your phone."),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", {
      name: "TRUX mobile app showing a parking location",
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

it("contains no submitting form", () => {
  const { container } = render(<HomePage />);
  expect(container.querySelector("form")).toBeNull();
});
```

- [ ] **Step 2: Verify the tests fail**

Run: `pnpm test src/components/marketing/marketing-page.test.tsx`

Expected: FAIL because the lower sections are absent.

- [ ] **Step 3: Implement the lower page**

Build the 602 px FAQ section as a left heading and right seven-row static list separated by hairlines. Each row uses `role="listitem"` with an accessible name `FAQ: <question>` and a decorative plus icon.

Build the 716 px app section with the Figma eyebrow, two-line 36 px Syne heading, body copy, static 52 px phone-number surface, amber Send Link button, legal line, divider, store badges, and right-side device artwork.

Build the 368 px footer with logo/navigation/social row, divider, and copyright/legal row. Use buttons for non-navigating controls and plain text for non-functional legal/navigation labels so no fake destination is announced.

- [ ] **Step 4: Compose, test, and commit**

Run: `pnpm test && pnpm typecheck`

Expected: all unit tests pass and TypeScript exits 0.

```bash
git add src/components/marketing/faq-section.tsx src/components/marketing/app-download-section.tsx src/components/marketing/site-footer.tsx src/components/marketing/marketing-page.test.tsx src/app/page.tsx
git commit -m "feat: complete TRUX marketing page sections"
```

### Task 7: Add required route states and metadata coverage

**Files:**

- Create: `src/app/loading.tsx`
- Create: `src/app/error.tsx`
- Create: `src/app/global-error.tsx`
- Create: `src/app/not-found.tsx`
- Test: `src/app/route-states.test.tsx`

**Interfaces:**

- Consumes: global design tokens and `Button`.
- Produces: accessible route loading, error, global error, and not-found UI that matches the midnight/amber visual system.

- [ ] **Step 1: Write failing route-state tests**

```tsx
import { render, screen } from "@testing-library/react";
import Loading from "./loading";
import NotFound from "./not-found";

it("announces loading status", () => {
  render(<Loading />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading TRUX parking");
});

it("renders an accessible not-found heading", () => {
  render(<NotFound />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Page not found" }),
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Verify the tests fail**

Run: `pnpm test src/app/route-states.test.tsx`

Expected: FAIL because the route-state files do not exist.

- [ ] **Step 3: Implement the route states**

Use a shared full-viewport midnight layout with amber eyebrow, off-white heading, muted copy, and safe reset buttons for the client-only error boundaries. `error.tsx` and `global-error.tsx` must begin with `"use client"`, accept `error: Error & { digest?: string }` and `reset: () => void`, never print the stack, and expose the reset action through `Button`.

- [ ] **Step 4: Test and commit**

Run: `pnpm test src/app/route-states.test.tsx && pnpm typecheck`

Expected: tests pass and TypeScript exits 0.

```bash
git add src/app/loading.tsx src/app/error.tsx src/app/global-error.tsx src/app/not-found.tsx src/app/route-states.test.tsx
git commit -m "feat: add accessible route states"
```

### Task 8: Implement responsive behavior and browser visual verification

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/components/marketing/site-header.tsx`
- Modify: `src/components/marketing/hero-section.tsx`
- Modify: `src/components/marketing/stats-section.tsx`
- Modify: `src/components/marketing/value-props-section.tsx`
- Modify: `src/components/marketing/coverage-section.tsx`
- Modify: `src/components/marketing/testimonials-section.tsx`
- Modify: `src/components/marketing/faq-section.tsx`
- Modify: `src/components/marketing/app-download-section.tsx`
- Modify: `src/components/marketing/site-footer.tsx`
- Create: `tests/e2e/marketing-page.spec.ts`

**Interfaces:**

- Consumes: completed static page and Playwright web server.
- Produces: stable layouts at 1512 × 4224 reference width, 768 px tablet, 390 px mobile, and 320 px narrow mobile; screenshot baselines under `tests/e2e/marketing-page.spec.ts-snapshots`.

- [ ] **Step 1: Write failing responsive browser tests**

```ts
import { expect, test } from "@playwright/test";

for (const viewport of [
  { name: "desktop", width: 1512, height: 900 },
  { name: "tablet", width: 768, height: 900 },
  { name: "mobile", width: 390, height: 844 },
  { name: "narrow-mobile", width: 320, height: 800 },
]) {
  test(`${viewport.name} layout has no horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}

test("desktop page matches its visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1512, height: 900 });
  await page.goto("/");
  await expect(page).toHaveScreenshot("trux-driver-desktop.png", {
    fullPage: true,
    animations: "disabled",
  });
});
```

- [ ] **Step 2: Run the responsive tests and record failures**

Run: `pnpm exec playwright install chromium && pnpm test:e2e`

Expected: overflow or screenshot-baseline failure before responsive refinements.

- [ ] **Step 3: Implement breakpoint-specific reflow**

At `max-width: 1023px`, collapse header navigation, stack hero copy above the map, remove fixed desktop section heights, and reduce display headings with `clamp()`. At `max-width: 767px`, use 24 px page gutters, a two-column metric grid, one-column value props, stacked coverage and FAQ layouts, full-width testimonial author blocks, stacked app content, and wrapped footer rows. At `max-width: 374px`, reduce gutters to 16 px, use a one-column metric list where needed, and keep all control widths within the viewport.

- [ ] **Step 4: Generate screenshot baselines and compare against Figma**

Run: `pnpm test:e2e --update-snapshots`

Expected: four overflow tests pass and the desktop screenshot baseline is written. Compare the 1512 px full-page capture side by side with `figma-driver-page.png`; adjust section padding, typography, image crops, and grid proportions until major landmarks align within visual-review tolerance.

- [ ] **Step 5: Re-run browser tests and commit**

Run: `pnpm test:e2e`

Expected: all browser tests pass with no screenshot diff.

```bash
git add src/app/globals.css src/components/marketing tests/e2e
git commit -m "feat: refine responsive TRUX layouts"
```

### Task 9: Final quality gate and cleanup

**Files:**

- Modify: only files identified by failing checks.
- Remove: temporary root screenshot `figma-driver-page.png` after visual comparison.
- Create: `.gitignore`
- Create: `.prettierignore`

**Interfaces:**

- Consumes: completed application and all verification commands.
- Produces: clean, buildable, fully verified repository with no temporary artifacts.

- [ ] **Step 1: Add repository ignores**

Ignore `.next`, `node_modules`, Playwright reports, test results, coverage, local environment files, and OS/editor artifacts. Keep committed visual baselines and `public/assets` tracked.

- [ ] **Step 2: Run the complete verification suite**

Run: `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build`

Expected: every command exits 0; Next.js reports a statically generated `/` route.

- [ ] **Step 3: Inspect the final app manually**

Run: `pnpm dev`

Verify in Chromium at 1512, 1024, 768, 390, and 320 px widths: no overflow; correct Syne/Inter typography; exact amber, midnight, blue, and muted colors; aligned hero crop; readable maps; full testimonial and FAQ copy; phone mockup contained; visible focus rings; no console errors; and no network calls other than local static assets.

- [ ] **Step 4: Remove the temporary Figma reference and commit final fixes**

Delete only `D:\Trux Marketing\figma-driver-page.png`, which was created during design inspection. Preserve the user-provided `design.md` and `nextjs_standards.md` unchanged and add them to version control.

```bash
git add .gitignore .prettierignore design.md nextjs_standards.md src public tests package.json pnpm-lock.yaml
git commit -m "chore: complete TRUX marketing page verification"
```

Run: `git status --short`

Expected: no output.

## User Override Addendum — July 14, 2026

The user explicitly replaced the earlier visual-only behavior for the hero search fields and navigation. Implement the four visible hero fields as labeled native `input` and `select` controls, render header account actions and all header/footer navigation through Next.js `Link` with meaningful destinations, and retain the reviewed Figma geometry, responsive breakpoints, theme tokens, 44 px targets, and visible keyboard focus. Do not add a form, submit handler, Client Component, API call, persistence, or other backend behavior; the search button remains `type="button"`.

## Final User Override Addendum — July 14, 2026

This final override replaces the Task 8 browser-test workflow and the earlier static FAQ/social behavior:

- Add a named 90rem container token and one reusable centered container class. Apply it to header, hero, stats, value props, coverage, testimonials, FAQ, app download, and footer inner content without changing the full-bleed section backgrounds or responsive gutters.
- Share one amber-to-TRUX-blue pseudo-element underline between header and footer navigation. Reveal it on hover/focus and retain it for the active Drivers link.
- Replace footer social buttons with white, 44px Next.js links to the official Facebook, LinkedIn, and Instagram accounts, including accessible labels and safe new-tab attributes.
- Convert only `FaqSection` to a Client Component and add a one-open-at-a-time accessible accordion with native buttons, ARIA associations, a rotating plus icon, animation that does not measure DOM height, and temporary answer copy.
- Remove only the abandoned `tests/e2e/marketing-page.spec.ts`, empty `tests` directories, `test-results`, and generated `pnpm-workspace.yaml`; keep standard `next-env.d.ts` metadata.
- Review the code diff and optionally run `git diff --check`. Do not add or run tests, build, typecheck, lint, Playwright, or browser verification, per the user's explicit instruction.
