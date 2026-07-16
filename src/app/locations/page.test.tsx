import { fireEvent, render, screen, within } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { vi } from "vitest";
import LocationsPage from "./page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    href: string;
  }) => (
    <a href={href} data-next-link="true" {...props}>
      {children}
    </a>
  ),
}));

it("renders the Locations page without a footer and with an active Locations link", () => {
  render(<LocationsPage />);

  expect(
    screen.getByRole("main", { name: "TRUX parking locations" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText("TRUX Parking National Locations"),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(
      "Browse our growing network of secure truck parking by region.",
    ),
  ).not.toBeInTheDocument();

  const map = screen.getByRole("img", {
    name: "Static map of TRUX parking locations around Atlanta",
  });
  expect(decodeURIComponent(map.getAttribute("src") ?? "")).toContain(
    "/assets/location-map-static.png",
  );

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  expect(
    within(primaryNavigation).getByRole("link", { name: "Locations" }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    within(primaryNavigation).getByRole("link", { name: "Drivers" }),
  ).not.toHaveAttribute("aria-current");

  expect(
    screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-current") === "page"),
  ).toEqual([
    within(primaryNavigation).getByRole("link", { name: "Locations" }),
  ]);
  expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("navigation", { name: "Footer navigation" }),
  ).not.toBeInTheDocument();
});

it("uses the measured Figma split, panel, popup, and pin spacing", () => {
  render(<LocationsPage />);

  const locationsRegion = screen.getByRole("region", {
    name: "Parking locations",
  });
  const splitLayout = locationsRegion.firstElementChild;
  const locationsColumn = splitLayout?.firstElementChild;
  expect(splitLayout).toHaveClass(
    "wide:grid",
    "wide:grid-cols-2",
    "wide:w-screen",
  );
  expect(locationsColumn).toHaveClass("wide:px-4", "wide:pt-4", "wide:pb-0");

  expect(screen.getByRole("search")).toHaveClass(
    "min-h-[72px]",
    "rounded-[6px]",
  );
  expect(
    screen
      .getByRole("button", { name: "Georgia, 34 Locations" })
      .closest("section"),
  ).toHaveClass("wide:ml-1.5", "wide:mr-2");

  const map = screen.getByRole("img", {
    name: "Static map of TRUX parking locations around Atlanta",
  });
  expect(map).toHaveClass("z-0");
  expect(map.parentElement).toHaveClass(
    "wide:h-[1162px]",
    "wide:min-h-[1162px]",
    "wide:rounded-none",
  );

  expect(
    screen.queryByRole("region", { name: "Selected parking location" }),
  ).not.toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", {
      name: "Show Georgia Parking Lot #1, 14 spots",
    }),
  );
  const popup = screen.getByRole("region", {
    name: "Selected parking location",
  });
  expect(popup).toHaveClass(
    "max-w-[332px]",
    "wide:left-[calc(50%+30px)]",
    "wide:top-[171px]",
  );
  expect(screen.queryByText("8 Spots")).not.toBeInTheDocument();
  expect(screen.queryByText("10 Spots")).not.toBeInTheDocument();

  for (const pin of screen.getAllByRole("button", { name: /^Show / })) {
    const pinMark = within(pin).getByRole("presentation");
    expect(decodeURIComponent(pinMark.getAttribute("src") ?? "")).toContain(
      "/assets/location-pin.svg",
    );
  }
});

it("opens the matching static location card when a map pin is selected", () => {
  render(<LocationsPage />);

  expect(
    screen.queryByRole("region", { name: "Selected parking location" }),
  ).not.toBeInTheDocument();
  for (const pin of screen.getAllByRole("button", { name: /^Show / })) {
    expect(pin).toHaveAttribute("aria-pressed", "false");
  }

  const westAtlantaPin = screen.getByRole("button", {
    name: "Show West Atlanta Parking Lot, 8 spots",
  });
  fireEvent.click(westAtlantaPin);

  const selectedLocation = screen.getByRole("region", {
    name: "Selected parking location",
  });
  expect(westAtlantaPin).toHaveAttribute("aria-pressed", "true");
  expect(
    within(selectedLocation).getByRole("heading", {
      name: "West Atlanta Parking Lot",
    }),
  ).toBeInTheDocument();
  expect(
    within(selectedLocation).getByText(
      "1800 Marietta Blvd NW, Atlanta, GA 30318",
    ),
  ).toBeInTheDocument();
  expect(
    within(selectedLocation).getByRole("link", { name: "View Location" }),
  ).toHaveAttribute("href", "/locations/west-atlanta");
  expect(
    within(selectedLocation).getByRole("link", { name: "View Location" }),
  ).toHaveAttribute("data-next-link", "true");
});
