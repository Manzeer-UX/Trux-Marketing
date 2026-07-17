# TRUX Hero Two-Column Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the overlapping desktop hero layers with distinct search-panel and map columns while preserving the stacked mobile layout.

**Architecture:** Keep `HeroSection` as one component and change only its responsive layout classes. At `lg`, the wrapper becomes a `620px / minmax(0, 1fr)` grid; below `lg`, the two children remain in normal vertical flow.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Vitest, Testing Library

## Global Constraints

- Mobile and smaller tablet widths keep the current vertical flow: search content first and the map below it.
- At the `lg` breakpoint, the hero wrapper becomes a two-column grid.
- The left column remains 620px wide.
- The right column uses `minmax(0, 1fr)`.
- The desktop hero remains 640px tall.
- The map fills only the right column.
- Search fields, dropdown behavior, copy, colors, spacing, and the search button remain unchanged.
- The hero retains visible overflow for dropdowns and the calendar.
- Do not modify other page sections.

## File Structure

- Modify `src/components/marketing/hero-section.tsx` only for the hero's responsive layout classes.
- Modify `src/components/marketing/marketing-page.test.tsx` only to add the layout regression test.
- Do not create new runtime components or change component interfaces.

---

### Task 1: Convert the hero to a responsive two-column grid

**Files:**
- Modify: `src/components/marketing/marketing-page.test.tsx:228-248`
- Modify: `src/components/marketing/hero-section.tsx:45-153`
- Test: `src/components/marketing/marketing-page.test.tsx`

**Interfaces:**
- Consumes: `HeroSection()` as rendered by `HomePage`, the existing `hero-heading` ID, and the two direct hero-layout children.
- Produces: no new exports or props; the hero wrapper exposes responsive grid classes for regression coverage.

- [ ] **Step 1: Write the failing hero layout regression test**

Add this test immediately after the existing compact-header/map-alignment test:

```tsx
it("uses distinct hero columns at the large breakpoint while stacking below it", () => {
  render(<HomePage />);

  const hero = document.getElementById("hero-heading")?.closest("section");
  const layout = hero?.firstElementChild;
  const searchPanel = layout?.firstElementChild;
  const mapPanel = layout?.lastElementChild;

  expect(hero).not.toBeNull();
  expect(layout).toHaveClass(
    "relative",
    "w-full",
    "lg:grid",
    "lg:h-full",
    "lg:grid-cols-[620px_minmax(0,1fr)]",
  );
  expect(layout).not.toHaveClass("grid");

  expect(searchPanel).toHaveClass("relative", "z-10", "flex");
  expect(searchPanel).not.toHaveClass(
    "lg:absolute",
    "lg:inset-y-0",
    "lg:left-0",
    "lg:w-[620px]",
  );

  expect(mapPanel).toHaveClass(
    "relative",
    "h-[320px]",
    "w-full",
    "lg:h-full",
  );
  expect(mapPanel).not.toHaveClass("lg:absolute", "lg:inset-0");
});
```

- [ ] **Step 2: Run the new test and verify the expected failure**

Run:

```bash
pnpm exec vitest run src/components/marketing/marketing-page.test.tsx -t "uses distinct hero columns"
```

Expected: FAIL because the wrapper does not contain
`lg:grid-cols-[620px_minmax(0,1fr)]` and both desktop children still contain
absolute-positioning classes.

- [ ] **Step 3: Implement the minimal responsive grid class change**

In `HeroSection`, replace the wrapper and the two direct child class strings
with the following:

```tsx
<section
  aria-labelledby="hero-heading"
  className="relative overflow-visible bg-midnight lg:h-[640px]"
>
  <div className="relative w-full lg:grid lg:h-full lg:grid-cols-[620px_minmax(0,1fr)]">
    <div className="relative z-10 flex bg-midnight px-6 py-12 md:px-10 lg:items-center lg:py-0">
      {/* Keep all existing search-panel content unchanged. */}
    </div>

    <div className="relative h-[320px] w-full lg:h-full">
      <Image
        src="/assets/hero-map.png"
        alt="Available TRUX parking lots around Atlanta"
        fill
        priority
        sizes="100vw"
        className="object-cover lg:object-right"
      />
    </div>
  </div>
</section>
```

The only production changes are:

```diff
- <div className="relative w-full lg:h-full">
+ <div className="relative w-full lg:grid lg:h-full lg:grid-cols-[620px_minmax(0,1fr)]">

- <div className="relative z-10 flex bg-midnight px-6 py-12 md:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[620px] lg:items-center lg:py-0">
+ <div className="relative z-10 flex bg-midnight px-6 py-12 md:px-10 lg:items-center lg:py-0">

- <div className="relative h-[320px] w-full lg:absolute lg:inset-0 lg:h-full">
+ <div className="relative h-[320px] w-full lg:h-full">
```

- [ ] **Step 4: Run the focused regression test and verify it passes**

Run:

```bash
pnpm exec vitest run src/components/marketing/marketing-page.test.tsx -t "uses distinct hero columns"
```

Expected: PASS with one matching test and no warnings or errors.

- [ ] **Step 5: Run the complete marketing-page test file**

Run:

```bash
pnpm exec vitest run src/components/marketing/marketing-page.test.tsx
```

Expected: all tests in `marketing-page.test.tsx` PASS.

- [ ] **Step 6: Check formatting for the changed source and test files**

Run:

```bash
pnpm exec prettier --check src/components/marketing/hero-section.tsx src/components/marketing/marketing-page.test.tsx
```

Expected: both files report that formatting is valid.

- [ ] **Step 7: Run TypeScript validation**

Run:

```bash
pnpm typecheck
```

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 8: Run lint validation**

Run:

```bash
pnpm lint
```

Expected: exit code 0 with no ESLint errors or warnings.

- [ ] **Step 9: Commit the tested layout fix**

Stage only the two implementation files and commit them:

```bash
git add src/components/marketing/hero-section.tsx src/components/marketing/marketing-page.test.tsx
git commit -m "fix: separate hero content and map columns"
```
