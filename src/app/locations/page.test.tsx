import { render, screen, within } from "@testing-library/react";
import LocationsPage from "./page";

it("renders the Locations page with a static map and active Locations link", () => {
  render(<LocationsPage />);

  expect(
    screen.getByRole("main", { name: "TRUX parking locations" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "TRUX Parking National Locations",
    }),
  ).toBeInTheDocument();

  const map = screen.getByRole("img", {
    name: "TRUX parking locations across the United States",
  });
  expect(map).toHaveAttribute("src", "/assets/coverage-map.svg");

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  expect(
    within(primaryNavigation).getByRole("link", { name: "Locations" }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(primaryNavigation).getByRole("link", { name: "Drivers" }),
  ).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
