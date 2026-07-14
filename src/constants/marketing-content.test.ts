import {
  faqs,
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
