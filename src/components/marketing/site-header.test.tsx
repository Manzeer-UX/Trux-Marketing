import { fireEvent, render, screen, within } from "@testing-library/react";
import { SiteHeader } from "@/components/marketing/site-header";

it("opens and closes the mobile navigation from the hamburger button", () => {
  render(<SiteHeader activeItem="Blog" />);

  const openButton = screen.getByRole("button", {
    name: "Open navigation menu",
  });

  expect(openButton).toHaveAttribute("aria-expanded", "false");
  expect(openButton).toHaveAttribute("aria-controls", "mobile-navigation");
  expect(
    screen.queryByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeInTheDocument();

  fireEvent.click(openButton);

  const closeButton = screen.getByRole("button", {
    name: "Close navigation menu",
  });
  const mobileNavigation = screen.getByRole("navigation", {
    name: "Mobile navigation",
  });

  expect(closeButton).toHaveAttribute("aria-expanded", "true");
  expect(mobileNavigation).toHaveAttribute("id", "mobile-navigation");
  expect(
    within(mobileNavigation).getByRole("link", { name: "Blog" }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(mobileNavigation).getByRole("link", { name: "New Driver Account" }),
  ).toBeInTheDocument();

  fireEvent.click(closeButton);
  expect(
    screen.queryByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeInTheDocument();
});

it("closes the mobile navigation after a destination is selected", () => {
  render(<SiteHeader />);

  fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

  const mobileNavigation = screen.getByRole("navigation", {
    name: "Mobile navigation",
  });
  const blogLink = within(mobileNavigation).getByRole("link", { name: "Blog" });
  blogLink.addEventListener("click", (event) => event.preventDefault(), {
    once: true,
  });
  fireEvent.click(blogLink);

  expect(
    screen.queryByRole("navigation", { name: "Mobile navigation" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Open navigation menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});
