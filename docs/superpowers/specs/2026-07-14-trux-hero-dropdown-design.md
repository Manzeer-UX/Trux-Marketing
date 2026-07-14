# TRUX Hero Dropdown UI Design

## Goal

Replace the browser-native open menus used by the hero parking type and number-of-spots fields with a consistent TRUX-styled dropdown. The controls must remain real form inputs, work without a backend, and preserve the compact Figma search-card layout across screen sizes.

## Chosen Approach

Create a small reusable Client Component named `FormSelect`. It renders a polished custom trigger and listbox for the visible interface while keeping a synchronized native `<select>` in the DOM as the real named form control. The Client Component boundary stays limited to the dropdown instead of moving the entire hero section to the client.

Native option styling was rejected because Windows and browser rendering remains inconsistent. Adding a component-library dependency was rejected because this interaction is small and the project already has all required React and icon primitives.

## Visual Design

- The closed trigger keeps the current transparent search-field appearance and warm-gray placeholder.
- Opening the control reveals a midnight panel with a subtle border, soft shadow, 8px corners, and compact spacing.
- Options use off-white text, an amber-tinted hover/focus state, and an amber selected indicator.
- The chevron rotates when the menu opens.
- The menu overlays surrounding content and uses a constrained height with scrolling for the ten spot options.
- The menu width matches its trigger and remains usable on narrow screens.

## Interaction and Accessibility

- The trigger is a semantic `<button type="button">` with `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`.
- The menu uses `role="listbox"`; each choice uses `role="option"` and exposes `aria-selected`.
- Enter, Space, Arrow Down, and Arrow Up open or navigate the menu. Enter or Space selects the focused option. Escape closes it and returns focus to the trigger.
- Clicking outside closes the menu.
- Selecting a visible option updates the hidden native `<select>` value so standard form serialization still works.
- The field label continues to point to the native control, and the custom trigger receives an explicit accessible label.

## Component Interface

`FormSelect` receives `id`, `name`, `placeholder`, `options`, and an accessible label. Options are stable `{ value, label }` objects. It owns only open state, selected value, and active option index.

The hero passes two configurations:

- Parking type: one-time and monthly.
- Number of spots: values 1 through 10.

## Error Handling and Constraints

- No backend request or form submission behavior is added.
- An empty value represents the placeholder and remains valid for this visual demo.
- The menu closes safely when focus/click moves away or the component unmounts.
- No third-party dropdown dependency is introduced.

## Verification

Per the user's project-wide instruction, implementation verification will be limited to source inspection and `git diff --check`. No build, tests, lint, typecheck, Playwright, or browser verification will be run.
