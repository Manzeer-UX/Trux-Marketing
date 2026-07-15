# TRUX Locations Page Design

## Goal

Create a fresh internal Locations page that opens when a visitor selects Locations in the primary navigation. The page will pair a working regional accordion with a static coverage-map image and will not add a live map integration.

## Route and Navigation

- Add the page at `/locations` using the Next.js App Router.
- Change the primary header Locations destination from the external TRUX URL to `/locations`.
- Change the home page’s `Explore Locations` call to action to link to `/locations`.
- Keep the footer’s existing external location destination unchanged because the requested change applies to the primary menu and the home-page call to action.
- Render the existing shared header and footer on the new page so navigation and account actions remain consistent.
- Mark Locations as the current page only while rendering the Locations route; Drivers remains current on the home page.

## Page Composition

The page will contain one main Locations section beneath the shared header and above the shared footer:

1. A heading introducing the nationwide TRUX parking network.
2. A short supporting sentence explaining that visitors can browse coverage by region.
3. A two-column desktop layout with the regional accordion on the left and the static coverage map on the right.
4. A stacked mobile layout with the accordion first and the map second.

The map will use the existing local `/assets/coverage-map.svg` through `next/image`. It is presentational only: no map SDK, markers, geolocation, filters, API requests, or synchronized accordion/map interactions will be added.

## Regional Accordion

The accordion headings will be:

1. Southeast
2. Southwest
3. Northeast
4. Midwest
5. Northwest
6. West

Each expanded region will show its states and location counts. The static demo data is:

| Region | States and counts |
| --- | --- |
| Southeast | Florida 6, Georgia 34, Mississippi 2, Tennessee 3, North Carolina 10, Alabama 3, South Carolina 7, Arkansas 2 |
| Southwest | Oklahoma 2, Texas 11, Arkansas 2, Mississippi 2, Tennessee 3 |
| Northeast | Pennsylvania 1 |
| Midwest | Ohio 4, Missouri 4, Iowa 1, Minnesota 3 |
| Northwest | Idaho 3, Oregon 1 |
| West | California 9, Arizona 1, Nevada 2, Washington 1 |

The counts are a frozen content snapshot for this page and will not be fetched or synchronized. Content will be stored as typed local constants so the UI stays data-driven and can be updated without changing accordion logic.

Accordion behavior:

- Southeast is open on initial render.
- Exactly one region is open at all times.
- Selecting a closed region opens it and closes the previously open region.
- Selecting the currently open region leaves it open, preventing an all-closed state.
- Each region heading uses a native button.
- Buttons expose `aria-expanded` and `aria-controls`; panels use matching IDs and `aria-labelledby`.
- A chevron or plus indicator visually reflects the expanded state and remains decorative to assistive technology.
- State rows are informational in this phase and do not navigate to individual location pages.

## Components and Data

- `src/app/locations/page.tsx` will compose the shared header, Locations content, and shared footer.
- `src/components/locations/locations-section.tsx` will own the responsive page layout and static map.
- `src/components/locations/locations-accordion.tsx` will be the smallest possible Client Component and will own only the open-region state.
- `src/constants/locations-content.ts` will export typed regional state/count data.
- The existing `SiteHeader` will accept or derive the active page without duplicating the header markup.

The page itself and the static map remain Server Components. Only the accordion crosses the Client Component boundary because it requires click state.

## Visual and Responsive Behavior

- Reuse the established midnight, section, amber, blue, off-white, and muted design tokens.
- Reuse the existing Syne display and Inter body typography.
- At the project’s wide desktop breakpoint, give the accordion and map balanced columns with sufficient spacing and no horizontal overflow.
- Below the desktop breakpoint, stack both surfaces and keep every accordion control at least 44 pixels tall.
- Preserve visible keyboard focus rings and readable contrast.

## Testing

Automated tests will verify:

- The header Locations link points to `/locations`.
- The home-page `Explore Locations` call to action points to `/locations`.
- The `/locations` page exposes a named main landmark, expected heading, regional controls, and static map image.
- Southeast is expanded by default and all other regions are collapsed.
- Opening another region closes Southeast.
- Selecting the currently open region does not close it.
- State names and counts render only for the active panel in the accessible page state.
- The map image uses the expected local asset and meaningful alternative text.

Verification will include focused Vitest tests, TypeScript, scoped ESLint, formatting, and a browser check at desktop and mobile widths. The browser check will confirm the menu route, one-open accordion behavior, static map rendering, absence of horizontal overflow, and absence of framework error overlays.

## Out of Scope

- Live or interactive maps
- Geolocation
- Search and filtering
- Individual state, city, or parking-lot routes
- Booking flows
- APIs, Server Actions, persistence, or analytics
- Reworking unrelated home-page or footer content
