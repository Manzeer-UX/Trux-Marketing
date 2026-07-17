# Location Details Dark Map Design

**Date:** 2026-07-17
**Status:** Approved

## Goal

Replace the static image in the location-detail page’s “Where you’ll be” section with the existing reusable dark-theme Google Map and display one orange TRUX marker without a tooltip or any interaction.

## Scope

This change applies only to the location-detail screen rendered at `/locations/[locationId]`. The locations index map, driver map, lot-owner map, and all other map consumers remain unchanged.

## Architecture

Add a small location-detail-specific client component that wraps the existing `Map` component. It receives the location’s coordinates and title, centers the map on those coordinates, and supplies one static marker.

The detail screen continues to own the section heading and its 355px-tall layout container. It replaces the current static map image and legacy pin with the new wrapper.

## Map Configuration

- Use the reusable `Map` component with `theme="dark"`.
- Center the map and marker on `location.coordinates`.
- Keep the existing map section height of 355px and fill its available width.
- Disable the built-in marker with `showMarker={false}`.
- Supply exactly one static marker.
- Use `/assets/hero-map-marker-active.svg` as the marker icon so it matches the orange marker in the reference screenshot.
- Do not provide `activeIconUrl`, `tooltip`, `onStaticMarkerClick`, or `renderStaticMarkerPopup`.

Because no interaction callbacks or popup renderer are supplied, the reusable map does not attach a click listener to this marker and does not create a tooltip or popup.

## Accessibility

Give the map region an accessible label derived from the location title. The marker keeps a descriptive title for assistive technology and native map semantics. Loading and map configuration errors continue to use the reusable `Map` component’s existing accessible status and alert behavior.

## Testing

Add a focused regression test for the location-detail map wrapper, with the external Google Map boundary mocked, that verifies:

- the reusable map receives the dark theme;
- its center matches the location coordinates;
- exactly one orange static marker is configured;
- the built-in marker is disabled; and
- no tooltip, click callback, or popup renderer is supplied.

Run the focused test first to observe the expected failure, then implement the wrapper and screen change. Finish with the full test suite, TypeScript, ESLint, and a scoped diff review.

## Non-goals

- No tooltip or marker interaction.
- No new map style or marker asset.
- No changes to location data.
- No changes to other map screens.
- No changes to the surrounding location-detail layout.
