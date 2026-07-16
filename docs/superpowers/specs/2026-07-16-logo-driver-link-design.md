# TRUX Logo Driver Link Design

## Objective

Make the TRUX logo in both the site header and site footer navigate to the existing driver marketing page at `/`.

## Implementation

- Wrap the existing header logo image in a Next.js `Link` with `href="/"`.
- Wrap the existing footer logo image in a Next.js `Link` with `href="/"`.
- Preserve the current logo images, dimensions, priority behavior, layout, and visual styling.
- Keep both components as Server Components; no click handlers or client-side router logic are needed.
- Do not change any other navigation destination or active state.

The logo image alt text, `TRUX Parking`, supplies the accessible name for each link. Both links remain keyboard-operable through native anchor behavior.

## Verification

Add a focused component test that renders the page header and footer, finds both links named `TRUX Parking`, and verifies that each link targets `/`. Run the focused test first to confirm it fails before implementation, then rerun it after the minimal component changes and run the relevant test suite and static checks.

## Completion Criteria

- Clicking either logo navigates to the driver page at `/`.
- Both logo links expose the accessible name `TRUX Parking`.
- Logo appearance and layout are unchanged.
- Existing header and footer behavior continues to pass its tests.
