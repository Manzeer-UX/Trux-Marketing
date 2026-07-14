# TRUX Driver Marketing Page Design

## Objective

Implement the Figma frame `1309:2475` from the “Marketing Page” file as a pixel-accurate, responsive visual demo in a new Next.js application. The page has no backend, persistence, external APIs, or working form submissions.

## Source of Truth

- Figma file key: `0iOu7EEMEgAOvyr2x4tqU8`
- Figma node: `1309:2475` (`Driver Page`)
- Desktop reference size: 1512 × 4224 px
- Local standards: `design.md` and `nextjs_standards.md`

The Figma layout, copy, assets, component hierarchy, and variables are the visual source of truth. Where Figma only supplies a desktop frame, smaller layouts will preserve the same content hierarchy and visual language while reflowing responsively.

## Technology

- Latest stable Next.js 16+ with App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS v4
- pnpm
- `next/font` for Inter and Syne
- `next/image` for local raster and vector assets
- Lucide React only where no matching Figma icon asset is available
- CVA, `clsx`, and `tailwind-merge` for reusable component variants and class merging

The marketing route will use static rendering and Server Components by default. Client components are unnecessary for the visual-demo scope.

## Page Architecture

The page will be composed from focused components rather than one monolithic file:

1. `Navbar` — TRUX logo, desktop navigation, sign-in link, and owner/driver account buttons. On narrow screens it becomes a compact static header with a menu icon.
2. `HeroSection` — dark search panel beside a static map image with parking markers and a featured-lot card.
3. `StatsSection` — amber metrics band with four statistics and the “By the numbers” label.
4. `ValuePropsSection` — heading and four icon-led benefit blocks.
5. `CoverageSection` — static United States coverage-map image, heading, and locations CTA.
6. `TestimonialsSection` — three testimonial rows with quote, name, and location.
7. `FaqSection` — seven closed FAQ rows with plus icons. Rows remain non-interactive for the visual demo.
8. `AppDownloadSection` — app pitch, static phone-number field, send-link button, store badges, and phone mockup.
9. `Footer` — logo, navigation links, social icons, divider, copyright, and legal links.

Reusable primitives will include `Button`, `Eyebrow`, `SectionHeading`, and compact data components for stats, feature items, testimonials, and FAQ rows. Repeated content will come from typed constant arrays.

## Design System

Figma variables will be represented as named CSS custom properties and Tailwind theme tokens. Core colors include:

- Midnight: `#171729`
- Section background: `#21213a`
- Safety amber: `#f5a623`
- TRUX blue: `#1e4ed8`
- Off-white: `#f5f4f0`
- Warm gray: `#9e9e9e`
- Muted foreground: `#d4d4d4`
- Border: `rgba(255, 255, 255, 0.1)`

Typography will use Syne SemiBold for display headings and Inter for navigation, body copy, labels, and buttons. The extracted Figma type scale will drive heading and body utilities. Spacing, radii, and shadows will use the extracted 4–96 px scale and named tokens, with no inline styling or hardcoded arbitrary color utilities.

## Assets and Maps

All required Figma assets will be downloaded into `public/assets` and referenced locally. This includes the TRUX logos, feature icons, store badges, coverage map, social icons, phone mockup layers, and app screen.

Both map areas are deliberately static images for this phase:

- The hero parking map will use an exported image matching the Figma composition, including roads, labels, parking pins, spot-count bubbles, and the highlighted-lot card.
- The coverage map will use the Figma United States coverage artwork.

Assets will have descriptive names, explicit dimensions, suitable alt text, and responsive image sizing. Decorative imagery will use empty alt text.

## Responsive Behavior

The desktop implementation will match the 1512 px Figma frame, centered within fluid full-width sections and a 1280 px content container where the design uses one.

- Large desktop: preserve the reference proportions, two-column hero, four-column metrics, two-column value grid, side-by-side coverage content, split FAQ, and split app-download layout.
- Tablet: reduce horizontal padding and display typography; retain two columns where content remains legible, otherwise use balanced stacking.
- Mobile: collapse navigation, stack hero content above the map, change metrics and value propositions to compact grids or lists, stack coverage/testimonials/FAQ/app content, place the phone mockup beneath the app copy, and wrap footer navigation and legal links.

The implementation must avoid horizontal overflow at 320 px, preserve readable line lengths, keep at least 44 px touch targets, and maintain sensible image cropping. Desktop-specific fixed dimensions will become proportional `max-width`, aspect-ratio, and clamp-based values at smaller widths.

## Visual-Demo Behavior

- Search, location, parking type, date, SMS, sign-in, registration, store, social, and CTA controls do not navigate or submit.
- Form-like surfaces will use semantic labels where useful but will not contain active form logic.
- FAQ rows remain visually closed.
- Hover and focus-visible states will be present for polish and accessibility without introducing application behavior.
- No API routes, Server Actions, database, authentication, analytics, or third-party map SDK will be added.

## Accessibility and SEO

- Use semantic landmarks and one page-level `h1`.
- Preserve logical heading order and DOM reading order across responsive layouts.
- Provide visible keyboard focus, WCAG AA contrast where the Figma palette permits, and accessible names for icon-only controls.
- Use metadata for title, description, a root-route canonical path, Open Graph, and Twitter cards.
- Include `loading.tsx`, `error.tsx`, `global-error.tsx`, and `not-found.tsx` following the local project standards, even though the main page is statically rendered.

## Verification

The page will be checked with:

- TypeScript compilation
- ESLint
- Prettier
- Production build
- Browser screenshots at 1512 px desktop, representative tablet width, and mobile widths down to 320 px
- Side-by-side comparison with the Figma reference for typography, section heights, spacing, colors, imagery, and alignment
- Overflow, keyboard-focus, semantic-heading, and image-alt checks

The work is complete when the desktop screenshot closely matches the supplied Figma frame, smaller breakpoints preserve the same design language without clipping or overflow, and all local quality checks pass.

## User Override Addendum — July 14, 2026

This addendum supersedes the visual-only navigation and search-field behavior above. The four visible hero search fields are genuine labeled native `input` and `select` controls, and header account actions plus header/footer navigation are rendered with Next.js `Link` using meaningful destinations. These controls preserve the approved Figma geometry, dark theme, focus treatment, and responsive behavior. The page still has no form submission, handler, Client Component boundary, API call, persistence, authentication flow, or backend integration; the search action remains a non-submitting `type="button"` control.

## Final User Override Addendum — July 14, 2026

This final override supersedes the earlier 1280px content-container guidance, static social controls, non-interactive FAQ behavior, and the statement that the page has no Client Component boundary. Every section uses one centered responsive container backed by the named `--container-site: 90rem` Tailwind theme token while section backgrounds remain full bleed. Header and footer navigation share an amber-to-TRUX-blue bottom-gradient interaction; hover and focus reveal it, and the active Drivers link keeps it visible.

Footer social icons are white, 44px Next.js `Link` targets that open the official Facebook, LinkedIn, and Instagram pages in a new tab. `FaqSection` is the only Client Component and implements a keyboard-native, one-open-at-a-time accordion with explicit expanded/control associations, rotating plus icons, animated answers, and temporary explanatory copy. All prior responsive breakpoints, real navigation destinations, labeled form controls, and non-submitting actions remain in place. Per the user's explicit instruction, this override is reviewed from source only; no build, tests, typecheck, lint, Playwright, or browser verification is run.
