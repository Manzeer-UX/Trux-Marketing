import {
  faqs,
  headerMoreNavItems,
  headerNavItems,
  navItems,
  stats,
  testimonials,
  valueProps,
} from "./marketing-content";

it("captures every repeated item in the Figma page", () => {
  expect(navItems).toHaveLength(7);
  expect(stats).toHaveLength(4);
  expect(valueProps).toHaveLength(4);
  expect(testimonials).toHaveLength(3);
  expect(faqs).toHaveLength(7);
});

it("provides meaningful destinations for every navigation item", () => {
  expect(navItems).toEqual([...headerNavItems, ...headerMoreNavItems]);
  expect(navItems).not.toContainEqual(expect.objectContaining({ href: "#" }));
});

it("groups the requested header links ahead of the overflow menu", () => {
  expect(headerNavItems).toEqual([
    {
      label: "Lot Owners",
      href: "/lot-owners",
    },
    { label: "Drivers", href: "/", active: true },
    { label: "About Us", href: "/about-us" },
    { label: "Locations", href: "/locations" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
  ]);
  expect(headerMoreNavItems).toEqual([
    { label: "Why Trux", href: "/#why-trux" },
  ]);
});
