# TRUX Responsive Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Match Figma node `1532:14129` with the exact six-link desktop navigation and a functional mobile menu containing the same destinations.

**Architecture:** Keep `SiteHeader` server-rendered and introduce one focused client component for mobile open/close state. Export a dedicated ordered header navigation array so the header no longer depends on slicing the broader footer menu.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Next.js `Link` and `Image`, Lucide icons.

## Global Constraints

- Use the exact menu order: Lot Owners, Drivers, Locations, Partners, Blog, About Us.
- Every navigation destination and account action must render through Next.js `Link`.
- Keep Drivers as the active page and retain the existing hover/active underline behavior.
- Reuse the current external destinations; add no backend behavior or dependencies.
- Do not run build, test, lint, or typecheck commands. Use targeted source inspection and `git diff --check` only.
- Preserve unrelated uncommitted work. Do not commit implementation files that already contain user changes.

---

## File Structure

- Modify `src/constants/marketing-content.ts`: export the six ordered header links independently from the footer links.
- Create `src/components/marketing/mobile-navigation.tsx`: own mobile menu state, keyboard handling, ARIA state, links, and account actions.
- Modify `src/components/marketing/site-header.tsx`: render the exact Figma desktop header and delegate mobile behavior.
- Modify `src/app/globals.css`: make the menu underline fade from amber to transparent as shown in Figma.
- Modify `src/components/marketing/marketing-page.test.tsx`: update the stored header expectations and describe the new mobile behavior; do not execute tests.

### Task 1: Define the Header Navigation Contract

**Files:**
- Modify: `src/constants/marketing-content.ts`
- Modify: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**
- Produces: `headerNavItems: readonly NavItem[]`
- Each item provides `label`, `href`, and optional `active`.

- [ ] **Step 1: Add the expected six-link order to the navigation test**

Replace the current first-seven-items assertion with this explicit contract:

```tsx
const expectedHeaderDestinations = [
  ["Lot Owners", "https://truxparking.com/propertyowners/"],
  ["Drivers", "/"],
  ["Locations", "https://truxparking.com/locations-we-serve/"],
  ["Partners", "https://truxparking.com/truxpartners/"],
  ["Blog", "https://truxparking.com/blog/"],
  ["About Us", "https://truxparking.com/about-us/"],
] as const;

for (const [label, href] of expectedHeaderDestinations) {
  expect(within(primaryNavigation).getByRole("link", { name: label }))
    .toHaveAttribute("href", href);
}

expect(within(primaryNavigation).getAllByRole("listitem")).toHaveLength(6);
```

- [ ] **Step 2: Export the ordered header items**

Add this export after `navItems`:

```ts
export const headerNavItems = [
  { label: "Lot Owners", href: "https://truxparking.com/propertyowners/" },
  { label: "Drivers", href: "/", active: true },
  {
    label: "Locations",
    href: "https://truxparking.com/locations-we-serve/",
  },
  { label: "Partners", href: "https://truxparking.com/truxpartners/" },
  { label: "Blog", href: "https://truxparking.com/blog/" },
  { label: "About Us", href: "https://truxparking.com/about-us/" },
] as const satisfies readonly NavItem[];
```

- [ ] **Step 3: Source-check the contract**

Run only:

```powershell
Select-String -Path src/constants/marketing-content.ts -Pattern 'export const headerNavItems|Lot Owners|Drivers|Locations|Partners|Blog|About Us'
git diff --check -- src/constants/marketing-content.ts src/components/marketing/marketing-page.test.tsx
```

Expected: all six labels are present and `git diff --check` exits 0.

### Task 2: Add the Functional Mobile Menu

**Files:**
- Create: `src/components/marketing/mobile-navigation.tsx`
- Modify: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**
- Consumes: `items: readonly NavItem[]`
- Produces: `MobileNavigation({ items }: MobileNavigationProps)`

- [ ] **Step 1: Describe the mobile toggle behavior in the existing test file**

Add a test that uses the already-imported `fireEvent`:

```tsx
it("opens and closes the responsive navigation menu", () => {
  render(<HomePage />);

  const openButton = screen.getByRole("button", {
    name: "Open navigation menu",
  });
  expect(openButton).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(openButton);
  expect(
    screen.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Close navigation menu" }),
  ).toHaveAttribute("aria-expanded", "true");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(
    screen.queryByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Create the client-only mobile controller**

Create a component with this structure:

```tsx
"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import type { NavItem } from "@/constants/marketing-content";

interface MobileNavigationProps {
  items: readonly NavItem[];
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="wide:hidden">
      <Button
        type="button"
        variant="ghost"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        className="size-11 p-0"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
      </Button>

      {isOpen ? (
        <div id="mobile-navigation-panel" className="absolute top-full right-0 left-0 border-t border-border bg-midnight px-6 py-6 shadow-xl">
          <nav aria-label="Mobile navigation">
            <ul className="flex list-none flex-col">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={item.active ? "page" : undefined}
                    className="nav-gradient-link flex min-h-11 items-center text-base text-off-white/70 hover:text-off-white aria-[current=page]:font-bold aria-[current=page]:text-off-white"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <ButtonLink href="https://trucklots.com/" variant="ghost" onClick={closeMenu}>Sign In</ButtonLink>
            <ButtonLink href="https://truxparking.com/propertyowners/" variant="blue" onClick={closeMenu}>New Lot Owner Account</ButtonLink>
            <ButtonLink href="https://trucklots.com/" onClick={closeMenu}>New Driver Account</ButtonLink>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Source-check accessibility and link usage**

Run only:

```powershell
Select-String -Path src/components/marketing/mobile-navigation.tsx -Pattern 'aria-expanded|aria-controls|Mobile navigation|Escape|<Link|<ButtonLink'
git diff --check -- src/components/marketing/mobile-navigation.tsx src/components/marketing/marketing-page.test.tsx
```

Expected: all interaction hooks and link components are present; diff check exits 0.

### Task 3: Match the Figma Desktop Header

**Files:**
- Modify: `src/components/marketing/site-header.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `headerNavItems` and `MobileNavigation`.
- Produces: the responsive `SiteHeader` used by the marketing page.

- [ ] **Step 1: Replace the sliced menu with the explicit menu export**

Use these imports and remove the Lucide `Menu`, `Button`, and `navItems.slice` code from `site-header.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "@/components/marketing/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { headerNavItems } from "@/constants/marketing-content";
```

- [ ] **Step 2: Apply the Figma dimensions and render the mobile controller**

Keep the 65px header, use a 96x24 logo, 40px desktop horizontal padding, 24px gaps, and a 37px menu-tab box:

```tsx
<div className="flex h-[65px] w-full items-center justify-between px-6 lg:px-10">
  <div className="flex items-center gap-6">
    <Image
      src="/assets/trux-logo.svg"
      alt="TRUX Parking"
      width={96}
      height={24}
      className="h-6 w-24"
      priority
    />
    <div aria-hidden="true" className="hidden h-6 w-px bg-off-white/30 wide:block" />
    <nav aria-label="Primary navigation" className="hidden items-center wide:flex">
      <ul className="flex list-none items-center gap-6">
        {headerNavItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className="nav-gradient-link flex h-[37px] items-start px-2 pt-1.5 text-base leading-6 whitespace-nowrap text-off-white/70 transition-colors hover:text-off-white aria-[current=page]:font-bold aria-[current=page]:text-off-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
```

Keep the three desktop account links, add `min-h-9` to each, add `px-3` to Sign In, and replace the old inert button with:

```tsx
<MobileNavigation items={headerNavItems} />
```

- [ ] **Step 3: Match the Figma underline fade**

Change only the second gradient stop in `globals.css`:

```css
background-image: linear-gradient(
  to right,
  var(--color-amber),
  transparent
);
```

- [ ] **Step 4: Final source-only verification**

Run only:

```powershell
$files = @(
  'src/constants/marketing-content.ts',
  'src/components/marketing/mobile-navigation.tsx',
  'src/components/marketing/site-header.tsx',
  'src/app/globals.css',
  'src/components/marketing/marketing-page.test.tsx'
)
Select-String -Path $files -Pattern 'Lot Owners|Drivers|Locations|Partners|Blog|About Us|Mobile navigation|aria-expanded|transparent'
git diff --check -- $files
git status --short -- $files
```

Expected: the required menu labels and mobile accessibility markers appear, the underline ends in transparent, and `git diff --check` exits 0. Do not claim build or test success because those commands are intentionally not run.
