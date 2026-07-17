# Location Details Dark Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the location-detail page’s static map image with the existing dark Google Map and one non-interactive orange TRUX marker.

**Architecture:** Add a focused client wrapper that converts a location’s coordinates and title into stable props for the existing reusable `Map`. The location-detail screen keeps its current section and dimensions while delegating map rendering to the wrapper; the Google Map boundary is mocked in the page regression test.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Google Maps JavaScript API, Vitest, Testing Library, Tailwind CSS

## Global Constraints

- Apply the change only to `/locations/[locationId]`.
- Reuse the existing `Map` component with `theme="dark"`.
- Keep the map area 355px tall and full width.
- Render exactly one marker using `/assets/hero-map-marker-active.svg`.
- The marker must have no click handler, active-state transition, tooltip, or popup.
- Reuse `location.coordinates`; do not add or change location data.
- Do not change any other map consumer or create a new map style or asset.

---

### Task 1: Render the location-detail dark map

**Files:**
- Create: `src/components/locations/location-details-map.tsx`
- Modify: `src/components/locations/location-details-screen.tsx:1-7`
- Modify: `src/components/locations/location-details-screen.tsx:145-165`
- Test: `src/app/location-details.test.tsx:1-4`
- Test: `src/app/location-details.test.tsx:128-135`

**Interfaces:**
- Consumes: `Map` and `StaticMapMarker` from `@/components/marketing/Map`; `location.coordinates` and `location.title` from `MapLocationDetails`.
- Produces: `LocationDetailsMap({ coordinates, title }: LocationDetailsMapProps): ReactElement`, where `coordinates` has numeric `lat` and `lng` properties and `title` is a string.

- [ ] **Step 1: Add the failing screen-level regression test with the Google Map boundary mocked**

Add the following mock after the imports in `src/app/location-details.test.tsx`:

```tsx
type MockStaticMarker = {
  iconUrl?: string;
  position: { lat: number; lng: number };
  title?: string;
  tooltip?: string;
};

vi.mock("@/components/marketing/Map", () => ({
  Map: ({
    ariaLabel,
    center,
    className,
    onStaticMarkerClick,
    renderStaticMarkerPopup,
    showMarker,
    staticMarkers = [],
    theme,
  }: {
    ariaLabel?: string;
    center?: { lat: number; lng: number };
    className?: string;
    onStaticMarkerClick?: () => void;
    renderStaticMarkerPopup?: () => React.ReactNode;
    showMarker?: boolean;
    staticMarkers?: readonly MockStaticMarker[];
    theme?: "dark" | "light";
  }) => (
    <div
      role="region"
      aria-label={ariaLabel}
      className={className}
      data-center={`${center?.lat},${center?.lng}`}
      data-has-click-handler={String(Boolean(onStaticMarkerClick))}
      data-has-popup-renderer={String(Boolean(renderStaticMarkerPopup))}
      data-show-marker={String(showMarker)}
      data-theme={theme}
    >
      {staticMarkers.map((marker) => (
        <span
          key={`${marker.position.lat},${marker.position.lng}`}
          role="img"
          aria-label={marker.title}
          data-icon={marker.iconUrl}
          data-tooltip={marker.tooltip}
        />
      ))}
    </div>
  ),
}));
```

Add these assertions immediately after the existing “Where you’ll be” heading assertion:

```tsx
const locationTitle =
  "Atlanta, GA Truck and Trailer Parking on 1345 M-52";
const detailsMap = screen.getByRole("region", {
  name: `Map showing ${locationTitle}`,
});

expect(detailsMap).toHaveClass("h-full", "min-h-0", "w-full");
expect(detailsMap).toHaveAttribute("data-center", "33.749,-84.388");
expect(detailsMap).toHaveAttribute("data-theme", "dark");
expect(detailsMap).toHaveAttribute("data-show-marker", "false");
expect(detailsMap).toHaveAttribute("data-has-click-handler", "false");
expect(detailsMap).toHaveAttribute("data-has-popup-renderer", "false");

const markers = within(detailsMap).getAllByRole("img");
expect(markers).toHaveLength(1);
expect(markers[0]).toHaveAccessibleName(`${locationTitle} parking location`);
expect(markers[0]).toHaveAttribute(
  "data-icon",
  "/assets/hero-map-marker-active.svg",
);
expect(markers[0]).not.toHaveAttribute("data-tooltip");
expect(
  screen.queryByRole("img", { name: `Static map for ${locationTitle}` }),
).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/app/location-details.test.tsx --exclude ".worktrees/**" --exclude ".pnpm-store/**"
```

Expected: FAIL because no region named `Map showing Atlanta, GA Truck and Trailer Parking on 1345 M-52` exists; the screen still renders the static map image.

- [ ] **Step 3: Add the wrapper and replace the static image**

Create `src/components/locations/location-details-map.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import { Map, type StaticMapMarker } from "@/components/marketing/Map";

interface LocationDetailsMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  title: string;
}

export function LocationDetailsMap({
  coordinates,
  title,
}: LocationDetailsMapProps) {
  const center = useMemo(
    () => ({ lat: coordinates.lat, lng: coordinates.lng }),
    [coordinates.lat, coordinates.lng],
  );
  const markers = useMemo(
    () =>
      [
        {
          iconUrl: "/assets/hero-map-marker-active.svg",
          position: center,
          title: `${title} parking location`,
        },
      ] satisfies readonly StaticMapMarker[],
    [center, title],
  );

  return (
    <Map
      ariaLabel={`Map showing ${title}`}
      center={center}
      className="h-full min-h-0 w-full"
      showMarker={false}
      staticMarkers={markers}
      theme="dark"
    />
  );
}
```

In `src/components/locations/location-details-screen.tsx`, remove:

```tsx
import Image from "next/image";
```

Add:

```tsx
import { LocationDetailsMap } from "@/components/locations/location-details-map";
```

Replace the current map image and legacy pin container with:

```tsx
<div className="mt-4 h-[355px] overflow-hidden bg-[#273344]">
  <LocationDetailsMap
    coordinates={location.coordinates}
    title={location.title}
  />
</div>
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run src/app/location-details.test.tsx --exclude ".worktrees/**" --exclude ".pnpm-store/**"
```

Expected: PASS with the detail screen rendering one dark, non-interactive orange marker and no static map image.

- [ ] **Step 5: Run project verification and inspect the scoped diff**

Run:

```powershell
.\node_modules\.bin\vitest.cmd run --exclude ".worktrees/**" --exclude ".pnpm-store/**"
```

Expected: all test files pass with zero failed tests.

Run:

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```

Expected: exit code 0 with no TypeScript errors.

Run:

```powershell
.\node_modules\.bin\eslint.cmd src/components/locations/location-details-map.tsx src/components/locations/location-details-screen.tsx src/app/location-details.test.tsx --max-warnings=0
```

Expected: exit code 0 with no lint errors or warnings.

Run:

```powershell
git diff --check -- src/components/locations/location-details-map.tsx src/components/locations/location-details-screen.tsx src/app/location-details.test.tsx
git diff -- src/components/locations/location-details-map.tsx src/components/locations/location-details-screen.tsx src/app/location-details.test.tsx
```

Expected: no whitespace errors; the production diff is limited to the new wrapper and the location-detail screen, with corresponding test changes.

- [ ] **Step 6: Commit only the implementation files**

```powershell
git add -- src/components/locations/location-details-map.tsx src/components/locations/location-details-screen.tsx src/app/location-details.test.tsx
git commit -m "feat: add dark map to location details"
```
