# Location Amenities Modal Design

**Date:** 2026-07-17
**Status:** Approved

## Goal

Make the location-detail page’s “Show all 19 amenities” button functional by opening an accessible modal that lists 19 amenities.

## Scope

This change applies only to the amenities section on `/locations/[locationId]`. It does not change the photo modal, reservation form, maps, location data, or any other screen.

## Architecture

Extract the current amenities section into a location-detail-specific client component named `LocationAmenities`. The component owns the preview markup, modal state, focus references, keyboard handling, body scroll locking, and the complete placeholder amenity list.

`LocationDetailsScreen` remains a server component and renders `LocationAmenities` where the existing static amenities markup currently appears.

## Preview

Preserve the current reference layout and styling:

- heading text remains “Amenities”;
- two columns remain visible at the existing breakpoint;
- each preview column shows Electric Gates, Security Cameras, Bathrooms, Lighting, and Stabilized Yard Surface;
- the button text remains “Show all 19 amenities”; and
- no surrounding spacing, borders, or typography changes are included.

## Modal

Clicking the button opens a portal-mounted dialog titled “All amenities.” The modal contains exactly these 19 realistic placeholder amenities:

1. Electric Gates
2. Security Cameras
3. Bathrooms
4. Lighting
5. Stabilized Yard Surface
6. Perimeter Fencing
7. 24/7 Access
8. Mobile QR Code Entry
9. Wide Turning Radius
10. Tractor Parking
11. Trailer Parking
12. Oversized Vehicle Parking
13. Pull-Through Spaces
14. On-Site Attendant
15. Fuel Nearby
16. Food Nearby
17. Repair Services Nearby
18. Wi-Fi Access
19. Vending Machines

The list uses a responsive grid and a consistent decorative check icon for each item. It does not add per-amenity actions or links.

## Interaction and Accessibility

Follow the existing location photo modal pattern:

- expose `aria-haspopup="dialog"` on the trigger;
- use `role="dialog"`, `aria-modal="true"`, and an `aria-labelledby` heading relationship;
- move focus to the close button when opened;
- close on the close button, Escape, or backdrop click;
- keep Tab focus on the close button because it is the dialog’s only interactive control;
- lock body scrolling while open;
- restore body scrolling and trigger focus when closed; and
- render the modal into `document.body` with `createPortal`.

## Testing

Extend the location-detail regression test to verify:

- no amenities dialog is present initially;
- clicking “Show all 19 amenities” opens “All amenities”;
- the dialog contains exactly 19 list items;
- representative first and last amenities are present;
- Escape closes the dialog; and
- focus returns to the trigger after closing.

Run the focused test first and confirm it fails because the current button has no behavior. Then implement the client component and integration. Finish with the focused test, full suite, TypeScript, ESLint, React review, and a scoped diff inspection.

## Non-goals

- No API or CMS integration for amenity data.
- No changes to the visible five-item preview.
- No inline expansion behavior.
- No new reusable global modal abstraction.
- No changes outside the location-detail amenities section.
