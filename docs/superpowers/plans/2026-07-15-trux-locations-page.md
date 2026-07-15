# TRUX Locations Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local `/locations` page with an image-based coverage map, a one-open regional accordion, and internal header/home-page navigation.

**Architecture:** Keep the App Router page and map layout server-rendered, and isolate click state in one small Client Component. Store the frozen region/state/count data in a typed constant module, reuse the existing shared header/footer and `coverage-map.svg`, and pass the active header label as a prop so the home page and Locations page expose the correct current page.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Vitest, Testing Library, `next/image`, and `lucide-react`.

## Global Constraints

- Preserve all unrelated uncommitted work in the dirty worktree.
- Use the internal route `/locations` for the primary header and the home-page `Explore Locations` call to action.
- Keep the footer Locations destination at `https://truxparking.com/locations-we-serve/`.
- Use `/assets/coverage-map.svg` as a static `next/image`; do not add a map SDK, API, geolocation, filtering, markers, or synchronized map behavior.
- Use region headings in this order: Southeast, Southwest, Northeast, Midwest, Northwest, West.
- Keep Southeast open initially and exactly one region open at all times.
- State rows are informational and must not link to individual pages.
- Use the existing TRUX design tokens, fonts, wide breakpoint, focus-ring treatment, shared `SiteHeader`, and shared `SiteFooter`.
- Run Vitest with `--exclude "**/.worktrees/**"` because the repository contains linked-worktree test copies.
- Run local binaries from `node_modules/.bin` because the pnpm wrapper currently performs an interactive dependency check.

---

## File Map

- `src/constants/locations-content.ts` — typed frozen region, state, and count data.
- `src/constants/locations-content.test.ts` — exact data order and count regression test.
- `src/components/locations/locations-accordion.tsx` — one-open-at-a-time Client Component.
- `src/components/locations/locations-accordion.test.tsx` — default/open-switch/current-open interaction tests.
- `src/components/locations/locations-section.tsx` — server-rendered heading, responsive layout, accordion, and static map.
- `src/app/locations/page.tsx` — route composition and route metadata.
- `src/app/locations/page.test.tsx` — route landmark, heading, map, and active-navigation tests.
- `src/components/marketing/site-header.tsx` — accept the active primary-nav label as a prop.
- `src/components/marketing/coverage-section.tsx` — turn `Explore Locations` into a real internal link.
- `src/constants/marketing-content.ts` — change only the header Locations destination to `/locations`.
- `src/constants/marketing-content.test.ts` — assert the internal header destination while retaining the external footer destination.
- `src/components/marketing/marketing-page.test.tsx` — assert home-page navigation and CTA behavior.

---

### Task 1: Add Typed Regional Location Data

**Files:**
- Create: `src/constants/locations-content.test.ts`
- Create: `src/constants/locations-content.ts`

**Interfaces:**
- Produces: `LocationState`, `LocationRegion`, and `locationRegions` for the accordion and page tests.
- `locationRegions` is a readonly six-item array with stable lowercase region IDs.

- [ ] **Step 1: Write the failing data test**

Create `src/constants/locations-content.test.ts`:

```ts
import { locationRegions } from "./locations-content";

it("stores the frozen regional location snapshot in display order", () => {
  expect(locationRegions).toEqual([
    {
      id: "southeast",
      name: "Southeast",
      states: [
        { name: "Florida", count: 6 },
        { name: "Georgia", count: 34 },
        { name: "Mississippi", count: 2 },
        { name: "Tennessee", count: 3 },
        { name: "North Carolina", count: 10 },
        { name: "Alabama", count: 3 },
        { name: "South Carolina", count: 7 },
        { name: "Arkansas", count: 2 },
      ],
    },
    {
      id: "southwest",
      name: "Southwest",
      states: [
        { name: "Oklahoma", count: 2 },
        { name: "Texas", count: 11 },
        { name: "Arkansas", count: 2 },
        { name: "Mississippi", count: 2 },
        { name: "Tennessee", count: 3 },
      ],
    },
    {
      id: "northeast",
      name: "Northeast",
      states: [{ name: "Pennsylvania", count: 1 }],
    },
    {
      id: "midwest",
      name: "Midwest",
      states: [
        { name: "Ohio", count: 4 },
        { name: "Missouri", count: 4 },
        { name: "Iowa", count: 1 },
        { name: "Minnesota", count: 3 },
      ],
    },
    {
      id: "northwest",
      name: "Northwest",
      states: [
        { name: "Idaho", count: 3 },
        { name: "Oregon", count: 1 },
      ],
    },
    {
      id: "west",
      name: "West",
      states: [
        { name: "California", count: 9 },
        { name: "Arizona", count: 1 },
        { name: "Nevada", count: 2 },
        { name: "Washington", count: 1 },
      ],
    },
  ]);
});
```

- [ ] **Step 2: Run the test and verify the expected RED state**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/constants/locations-content.test.ts --exclude "**/.worktrees/**"
```

Expected: FAIL because `./locations-content` does not exist.

- [ ] **Step 3: Add the typed location data**

Create `src/constants/locations-content.ts`:

```ts
export interface LocationState {
  name: string;
  count: number;
}

export interface LocationRegion {
  id: string;
  name: string;
  states: readonly LocationState[];
}

export const locationRegions = [
  {
    id: "southeast",
    name: "Southeast",
    states: [
      { name: "Florida", count: 6 },
      { name: "Georgia", count: 34 },
      { name: "Mississippi", count: 2 },
      { name: "Tennessee", count: 3 },
      { name: "North Carolina", count: 10 },
      { name: "Alabama", count: 3 },
      { name: "South Carolina", count: 7 },
      { name: "Arkansas", count: 2 },
    ],
  },
  {
    id: "southwest",
    name: "Southwest",
    states: [
      { name: "Oklahoma", count: 2 },
      { name: "Texas", count: 11 },
      { name: "Arkansas", count: 2 },
      { name: "Mississippi", count: 2 },
      { name: "Tennessee", count: 3 },
    ],
  },
  {
    id: "northeast",
    name: "Northeast",
    states: [{ name: "Pennsylvania", count: 1 }],
  },
  {
    id: "midwest",
    name: "Midwest",
    states: [
      { name: "Ohio", count: 4 },
      { name: "Missouri", count: 4 },
      { name: "Iowa", count: 1 },
      { name: "Minnesota", count: 3 },
    ],
  },
  {
    id: "northwest",
    name: "Northwest",
    states: [
      { name: "Idaho", count: 3 },
      { name: "Oregon", count: 1 },
    ],
  },
  {
    id: "west",
    name: "West",
    states: [
      { name: "California", count: 9 },
      { name: "Arizona", count: 1 },
      { name: "Nevada", count: 2 },
      { name: "Washington", count: 1 },
    ],
  },
] as const satisfies readonly LocationRegion[];
```

- [ ] **Step 4: Run the data test and verify GREEN**

Run the command from Step 2.

Expected: 1 test passes.

- [ ] **Step 5: Commit the data module**

```powershell
git add -- src/constants/locations-content.ts src/constants/locations-content.test.ts
git commit -m "feat: add regional location data"
```

---

### Task 2: Build the One-Open Regional Accordion

**Files:**
- Create: `src/components/locations/locations-accordion.test.tsx`
- Create: `src/components/locations/locations-accordion.tsx`

**Interfaces:**
- Consumes: `locationRegions` from Task 1.
- Produces: named export `LocationsAccordion(): JSX.Element`.
- State type: `(typeof locationRegions)[number]["id"]`.

- [ ] **Step 1: Write failing behavior tests**

Create `src/components/locations/locations-accordion.test.tsx`:

```tsx
import { fireEvent, render, screen, within } from "@testing-library/react";
import { LocationsAccordion } from "./locations-accordion";

describe("LocationsAccordion", () => {
  it("opens Southeast by default and keeps every other region closed", () => {
    render(<LocationsAccordion />);

    expect(screen.getByRole("button", { name: "Southeast" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    for (const region of [
      "Southwest",
      "Northeast",
      "Midwest",
      "Northwest",
      "West",
    ]) {
      expect(screen.getByRole("button", { name: region })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }

    const southeastPanel = screen.getByRole("region", { name: "Southeast" });
    expect(within(southeastPanel).getByText("Georgia")).toBeInTheDocument();
    expect(within(southeastPanel).getByText("34 locations")).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Southwest" }),
    ).not.toBeInTheDocument();
  });

  it("opens the selected region and closes the previous region", () => {
    render(<LocationsAccordion />);

    fireEvent.click(screen.getByRole("button", { name: "Southwest" }));

    expect(screen.getByRole("button", { name: "Southeast" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Southwest" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(
      screen.queryByRole("region", { name: "Southeast" }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Southwest" })).getByText(
        "Texas",
      ),
    ).toBeInTheDocument();
  });

  it("does not close the currently open region", () => {
    render(<LocationsAccordion />);

    const southeast = screen.getByRole("button", { name: "Southeast" });
    fireEvent.click(southeast);

    expect(southeast).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Southeast" })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the accordion tests and verify RED**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/components/locations/locations-accordion.test.tsx --exclude "**/.worktrees/**"
```

Expected: FAIL because `LocationsAccordion` does not exist.

- [ ] **Step 3: Implement the minimal accessible accordion**

Create `src/components/locations/locations-accordion.tsx`:

```tsx
"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { locationRegions } from "@/constants/locations-content";

type RegionId = (typeof locationRegions)[number]["id"];

export function LocationsAccordion() {
  const [openRegionId, setOpenRegionId] = useState<RegionId>(
    locationRegions[0].id,
  );

  return (
    <div className="divide-y divide-white/15 border-y border-white/15">
      {locationRegions.map((region) => {
        const isOpen = region.id === openRegionId;
        const buttonId = `location-region-${region.id}-button`;
        const panelId = `location-region-${region.id}-panel`;

        return (
          <section key={region.id}>
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenRegionId(region.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left font-display text-xl font-semibold text-white transition-colors hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                {region.name}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.75}
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <ul className="grid gap-2">
                {region.states.map((state) => (
                  <li
                    key={`${region.id}-${state.name}`}
                    className="flex min-h-10 items-center justify-between gap-4 rounded-md bg-white/5 px-4 py-2 text-sm"
                  >
                    <span className="font-medium text-off-white">
                      {state.name}
                    </span>
                    <span className="whitespace-nowrap text-muted">
                      {state.count} {state.count === 1 ? "location" : "locations"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Run the accordion tests and verify GREEN**

Run the command from Step 2.

Expected: 3 tests pass with no warnings.

- [ ] **Step 5: Commit the accordion**

```powershell
git add -- src/components/locations/locations-accordion.tsx src/components/locations/locations-accordion.test.tsx
git commit -m "feat: add locations accordion"
```

---

### Task 3: Create the Locations Route and Static Map Layout

**Files:**
- Create: `src/app/locations/page.test.tsx`
- Create: `src/app/locations/page.tsx`
- Create: `src/components/locations/locations-section.tsx`
- Modify: `src/components/marketing/site-header.tsx:10-42`

**Interfaces:**
- Consumes: `LocationsAccordion`, `SiteHeader`, `SiteFooter`, and `/assets/coverage-map.svg`.
- Produces: `/locations` App Router page and `LocationsSection()`.
- Changes: `SiteHeader({ activeItem?: HeaderNavLabel })`; default `activeItem` is `"Drivers"`.

- [ ] **Step 1: Write the failing route test**

Create `src/app/locations/page.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import LocationsPage from "./page";

it("renders the Locations page with a static map and active Locations link", () => {
  render(<LocationsPage />);

  expect(
    screen.getByRole("main", { name: "TRUX parking locations" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "TRUX Parking National Locations",
    }),
  ).toBeInTheDocument();

  const map = screen.getByRole("img", {
    name: "TRUX parking locations across the United States",
  });
  expect(map).toHaveAttribute("src", "/assets/coverage-map.svg");

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  expect(
    within(primaryNavigation).getByRole("link", { name: "Locations" }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(primaryNavigation).getByRole("link", { name: "Drivers" }),
  ).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the route test and verify RED**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/app/locations/page.test.tsx --exclude "**/.worktrees/**"
```

Expected: FAIL because `src/app/locations/page.tsx` does not exist.

- [ ] **Step 3: Make the shared header’s active item route-specific**

In `src/components/marketing/site-header.tsx`, add the prop types above `SiteHeader` and replace the current static active check:

```tsx
type HeaderNavLabel = (typeof headerNavItems)[number]["label"];

interface SiteHeaderProps {
  activeItem?: HeaderNavLabel;
}

export function SiteHeader({ activeItem = "Drivers" }: SiteHeaderProps) {
```

Use this `aria-current` expression on each top-level link:

```tsx
aria-current={item.label === activeItem ? "page" : undefined}
```

Do not change the existing menu order, More overflow, account actions, or responsive button.

- [ ] **Step 4: Create the responsive Locations section**

Create `src/components/locations/locations-section.tsx`:

```tsx
import Image from "next/image";
import { LocationsAccordion } from "@/components/locations/locations-accordion";

export function LocationsSection() {
  return (
    <section aria-labelledby="locations-heading" className="bg-section">
      <div className="w-full px-6 py-14 md:px-10 md:py-16 wide:px-20 wide:py-20">
        <div className="max-w-[760px]">
          <p className="text-xs font-extrabold tracking-[1.8px] text-amber">
            LOCATIONS
          </p>
          <h1
            id="locations-heading"
            className="mt-4 font-display text-[44px] leading-[48px] font-semibold tracking-[-1.2px] text-white wide:text-6xl wide:leading-[64px]"
          >
            TRUX Parking National Locations
          </h1>
          <p className="mt-5 max-w-[680px] text-lg leading-7 text-muted">
            Browse our growing network of secure truck parking by region.
          </p>
        </div>

        <div className="mt-12 grid gap-12 wide:grid-cols-[minmax(0,520px)_minmax(0,1fr)] wide:items-start wide:gap-20">
          <LocationsAccordion />

          <div className="flex min-h-[320px] items-center justify-center rounded-md bg-midnight/45 p-6 md:p-10 wide:min-h-[560px]">
            <Image
              src="/assets/coverage-map.svg"
              alt="TRUX parking locations across the United States"
              width={631}
              height={402}
              sizes="(min-width: 1440px) 720px, calc(100vw - 48px)"
              className="h-auto w-full max-w-[760px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create the App Router page and metadata**

Create `src/app/locations/page.tsx`:

```tsx
import type { Metadata } from "next";
import { LocationsSection } from "@/components/locations/locations-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export const metadata: Metadata = {
  title: "TRUX Parking Locations | Secure Truck Parking",
  description:
    "Browse TRUX secure truck parking coverage by region across the United States.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <SiteHeader activeItem="Locations" />
      <main aria-label="TRUX parking locations">
        <LocationsSection />
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 6: Run the route and accordion tests and verify GREEN**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/app/locations/page.test.tsx src/components/locations/locations-accordion.test.tsx --exclude "**/.worktrees/**"
```

Expected: 4 tests pass.

- [ ] **Step 7: Commit the new route and active-header support**

```powershell
git add -- src/app/locations/page.tsx src/app/locations/page.test.tsx src/components/locations/locations-section.tsx src/components/marketing/site-header.tsx
git commit -m "feat: add locations page"
```

---

### Task 4: Route Header and Home-Page Location Links Internally

**Files:**
- Modify: `src/constants/marketing-content.test.ts:43-56`
- Modify: `src/components/marketing/marketing-page.test.tsx:32-52,88-179`
- Modify: `src/constants/marketing-content.ts:46-55`
- Modify: `src/components/marketing/coverage-section.tsx:1-33`

**Interfaces:**
- Changes: `headerNavItems` Locations `href` becomes `/locations`.
- Changes: `CoverageSection` consumes `ButtonLink` instead of `Button`.
- Preserves: `navItems` footer Locations URL remains external.

- [ ] **Step 1: Update tests first for the internal destinations**

In `src/constants/marketing-content.test.ts`, change only the expected Locations entry in `headerNavItems`:

```ts
{ label: "Locations", href: "/locations" },
```

Keep the `navItems` expectation at `https://truxparking.com/locations-we-serve/`.

In `src/components/marketing/marketing-page.test.tsx`, update the home-page expectations:

```tsx
expect(
  screen.getByRole("link", { name: "Explore Locations" }),
).toHaveAttribute("href", "/locations");
```

And change only the header destination map entry:

```ts
["Locations", "/locations"],
```

Keep the footer destination map entry external.

- [ ] **Step 2: Run the affected tests and verify RED**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx --exclude "**/.worktrees/**" -t "groups the requested header links|renders the benefits|renders header and footer navigation"
```

Expected: FAIL because the header and CTA still use the old destination/button behavior.

- [ ] **Step 3: Change the header destination without touching the footer data**

In `src/constants/marketing-content.ts`, set the Locations item inside `headerNavItems` to:

```ts
{ label: "Locations", href: "/locations" },
```

Do not change the separate Locations item inside `navItems`.

- [ ] **Step 4: Convert the coverage action to an internal ButtonLink**

In `src/components/marketing/coverage-section.tsx`, import `ButtonLink`:

```tsx
import { ButtonLink } from "@/components/ui/button";
```

Replace the button with:

```tsx
<ButtonLink href="/locations" className="whitespace-nowrap">
  Explore Locations
</ButtonLink>
```

- [ ] **Step 5: Run the affected tests and verify GREEN**

Run the command from Step 2.

Expected: the selected tests pass, the header uses `/locations`, the CTA is a link, and the footer remains external.

- [ ] **Step 6: Commit the internal navigation behavior**

```powershell
git add -- src/constants/marketing-content.ts src/constants/marketing-content.test.ts src/components/marketing/coverage-section.tsx src/components/marketing/marketing-page.test.tsx
git commit -m "feat: link navigation to locations page"
```

---

### Task 5: Format, Verify, and Browser-Test the Complete Flow

**Files:**
- Verify all files changed by Tasks 1–4.
- Generate only ignored screenshots under `test-results/` if needed.

**Interfaces:**
- Verifies `/` to `/locations` navigation, active header state, accordion state, static image rendering, and responsive containment.

- [ ] **Step 1: Format only the touched files**

```powershell
.\node_modules\.bin\prettier.cmd --write src/constants/locations-content.ts src/constants/locations-content.test.ts src/components/locations/locations-accordion.tsx src/components/locations/locations-accordion.test.tsx src/components/locations/locations-section.tsx src/app/locations/page.tsx src/app/locations/page.test.tsx src/components/marketing/site-header.tsx src/components/marketing/coverage-section.tsx src/constants/marketing-content.ts src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx
```

- [ ] **Step 2: Run all focused feature tests**

```powershell
.\node_modules\.bin\vitest.cmd run src/constants/locations-content.test.ts src/components/locations/locations-accordion.test.tsx src/app/locations/page.test.tsx src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx --exclude "**/.worktrees/**" -t "regional location snapshot|LocationsAccordion|Locations page|groups the requested header links|renders the benefits|renders header and footer navigation"
```

Expected: all selected feature tests pass with zero failures.

- [ ] **Step 3: Run static verification**

```powershell
.\node_modules\.bin\eslint.cmd src/constants/locations-content.ts src/constants/locations-content.test.ts src/components/locations/locations-accordion.tsx src/components/locations/locations-accordion.test.tsx src/components/locations/locations-section.tsx src/app/locations/page.tsx src/app/locations/page.test.tsx src/components/marketing/site-header.tsx src/components/marketing/coverage-section.tsx src/constants/marketing-content.ts src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx --max-warnings=0
.\node_modules\.bin\tsc.cmd --noEmit
.\node_modules\.bin\prettier.cmd --check src/constants/locations-content.ts src/constants/locations-content.test.ts src/components/locations/locations-accordion.tsx src/components/locations/locations-accordion.test.tsx src/components/locations/locations-section.tsx src/app/locations/page.tsx src/app/locations/page.test.tsx src/components/marketing/site-header.tsx src/components/marketing/coverage-section.tsx src/constants/marketing-content.ts src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx
git diff --check
```

Expected: every command exits 0. If the full existing marketing test file still reports unrelated dirty-worktree layout failures outside the selected feature tests, report them separately and do not alter unrelated sections.

- [ ] **Step 4: Verify the user flow in Edge/Chromium at desktop width**

Use the already-running workspace dev server or start `next dev` on an available port. At a 1512 × 900 viewport:

1. Open `/` and select the primary `Locations` link.
2. Confirm the URL ends in `/locations`.
3. Confirm `Locations` is current and `Drivers` is not current.
4. Confirm the map is a rendered image and no map SDK network requests occur.
5. Confirm Southeast is open initially.
6. Select Southwest; confirm Southwest opens and Southeast closes.
7. Select Southwest again; confirm it remains open.
8. Confirm `document.documentElement.scrollWidth === window.innerWidth`.
9. Confirm no Next.js error overlay, page error, or failed local asset request.

- [ ] **Step 5: Verify responsive stacking at mobile width**

At a 390 × 844 viewport:

1. Open `/locations` directly.
2. Confirm the heading, accordion, and map render in that order.
3. Confirm every region control is keyboard/click operable and at least 44 pixels high.
4. Switch from Southeast to West and confirm only West is expanded.
5. Confirm there is no horizontal overflow or framework error overlay.

- [ ] **Step 6: Review the final diff and status**

```powershell
git status --short
git diff --stat
git diff -- src/constants/locations-content.ts src/constants/locations-content.test.ts src/components/locations/locations-accordion.tsx src/components/locations/locations-accordion.test.tsx src/components/locations/locations-section.tsx src/app/locations/page.tsx src/app/locations/page.test.tsx src/components/marketing/site-header.tsx src/components/marketing/coverage-section.tsx src/constants/marketing-content.ts src/constants/marketing-content.test.ts src/components/marketing/marketing-page.test.tsx
```

Expected: only the intended Locations feature changes are attributable to this implementation; unrelated pre-existing modifications remain preserved.
