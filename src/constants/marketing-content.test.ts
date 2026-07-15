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
  expect(navItems).toHaveLength(9);
  expect(stats).toHaveLength(4);
  expect(valueProps).toHaveLength(4);
  expect(testimonials).toHaveLength(3);
  expect(faqs).toHaveLength(7);
});

it("provides meaningful destinations for every navigation item", () => {
  expect(navItems).toEqual([
    {
      label: "Lot Owners",
      href: "https://truxparking.com/propertyowners/",
    },
    { label: "Drivers", href: "/", active: true },
    { label: "Why Trux", href: "/#why-trux" },
    { label: "About Us", href: "https://truxparking.com/about-us/" },
    { label: "Partners", href: "https://truxparking.com/truxpartners/" },
    {
      label: "Referrals",
      href: "https://truxparking.com/affiliateprogram/",
    },
    { label: "Trux Perx", href: "https://truxparking.com/truxpartners/" },
    {
      label: "Locations",
      href: "https://truxparking.com/locations-we-serve/",
    },
    { label: "Blog", href: "https://truxparking.com/blog/" },
  ]);
  expect(navItems).not.toContainEqual(expect.objectContaining({ href: "#" }));
});

it("groups the requested header links ahead of the overflow menu", () => {
  expect(headerNavItems).toEqual([
    {
      label: "Lot Owners",
      href: "https://truxparking.com/propertyowners/",
    },
    { label: "Drivers", href: "/", active: true },
    { label: "About Us", href: "https://truxparking.com/about-us/" },
    {
      label: "Locations",
      href: "https://truxparking.com/locations-we-serve/",
    },
    { label: "Partners", href: "https://truxparking.com/truxpartners/" },
  ]);
  expect(headerMoreNavItems).toEqual([
    { label: "Why Trux", href: "/#why-trux" },
    {
      label: "Referrals",
      href: "https://truxparking.com/affiliateprogram/",
    },
    { label: "Trux Perx", href: "https://truxparking.com/truxpartners/" },
    { label: "Blog", href: "https://truxparking.com/blog/" },
  ]);
});
