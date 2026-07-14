# TRUX Responsive Navigation Design

## Scope

Update only the site header navigation to match Figma node `1532:14129`. Keep the existing visual-demo architecture and external destinations. No backend work is required.

## Desktop navigation

- Render these six links in this exact order: Lot Owners, Drivers, Locations, Partners, Blog, About Us.
- Every navigation item must use Next.js `Link` and retain its existing meaningful destination.
- Keep Drivers marked as the active page.
- Match the Figma header treatment: 40px horizontal padding, 24px gaps, a 96x24 logo, a 24px vertical divider, 16/24 regular menu text, and the existing 3px amber-to-transparent hover/active underline.
- Keep the right-side actions in this order: Sign In, New Lot Owner Account, New Driver Account. These remain Next.js links using the existing ghost, blue, and amber button variants.

## Mobile navigation

- Below the existing `wide` breakpoint, show the logo and a 44px hamburger button.
- Activating the hamburger opens a full-width panel directly below the header.
- The panel repeats the same six navigation links in the same order and includes the three account actions so no desktop navigation destination is lost on small screens.
- The button exposes `aria-expanded` and `aria-controls`, changes to a close icon while open, and has an updated accessible label.
- Selecting any mobile link closes the panel. Pressing Escape also closes it.
- The panel remains within the header stacking context and uses the existing midnight, off-white, muted, amber, and blue design tokens.

## Component structure

- Add a dedicated `headerNavItems` content export rather than slicing the broader footer navigation array. This prevents the desktop and mobile menu order from depending on footer content.
- Keep `SiteHeader` as a Server Component.
- Add a small client component responsible only for mobile open/close state and keyboard handling.
- Reuse the existing `Button`, `ButtonLink`, `nav-gradient-link`, and `Link` patterns.

## Responsive behavior

- Desktop navigation and account actions appear at the existing `wide` breakpoint.
- Mobile navigation appears below `wide` and stretches to the viewport width.
- Long labels and buttons remain readable without horizontal overflow.

## Verification

Per the user's instruction, do not run build, test, lint, or typecheck commands. Verify the edited source, required labels/order, Next.js `Link` usage, accessibility attributes, and whitespace with targeted source and Git diff checks.
