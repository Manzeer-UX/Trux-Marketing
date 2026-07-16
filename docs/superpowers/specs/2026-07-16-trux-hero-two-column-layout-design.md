# TRUX Hero Two-Column Layout Design

## Objective

Remove the desktop overlap between the hero search panel and map by placing
them in two distinct layout columns. Preserve the existing content, styling,
interactions, and mobile stacking behavior.

## Root Cause

At the large breakpoint, both hero regions use absolute positioning. The
search panel occupies a fixed-width layer above a map that stretches across
the full hero, so the map continues underneath the panel instead of occupying
its own column.

## Approved Layout

- Mobile and smaller tablet widths keep the current vertical flow: search
  content first and the map below it.
- At the `lg` breakpoint, the hero wrapper becomes a two-column grid.
- The left column remains 620px wide to preserve the approved text and form
  geometry.
- The right column uses `minmax(0, 1fr)` and contains the map exclusively.
- The desktop hero remains 640px tall.
- The map image fills and crops within the right column rather than spanning
  underneath the search panel.
- Search fields, dropdown behavior, copy, colors, spacing, and the search
  button remain unchanged.
- The hero retains visible overflow so open dropdowns and the calendar can
  extend beyond their field or section boundaries.

## Implementation Approach

Replace the large-breakpoint absolute positioning with normal-flow CSS Grid
classes in `HeroSection`. Keep the mobile layout as a block flow and retain
the existing relative image container and `next/image` fill behavior inside
the map column.

CSS Grid is preferred over a percentage grid or fixed-basis flex layout
because it explicitly models the two independent regions while preserving the
existing 620px search-panel width.

## Testing

Add a focused component regression assertion that verifies:

- the desktop hero wrapper uses the approved two-column grid;
- the search panel is no longer absolutely positioned at the large
  breakpoint;
- the map container is no longer stretched across the full desktop hero;
- the existing mobile stacking and map image alignment classes remain
  present.

Run the focused marketing-page tests, followed by type checking and linting.

## Scope

This change only corrects the hero layout. It does not redesign the search
form, alter dropdown behavior, change map artwork, or modify other page
sections.
