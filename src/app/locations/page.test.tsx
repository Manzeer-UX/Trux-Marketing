import { fireEvent, render, screen, within } from "@testing-library/react";
import type {
  AnchorHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { vi } from "vitest";
import LocationsPageRoute from "./page";

let resolvedLocationsPage: ReactElement;

beforeAll(async () => {
  resolvedLocationsPage = await LocationsPageRoute();
});

function LocationsPage() {
  return resolvedLocationsPage;
}

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    prefetch,
    ...props
  }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    href: string;
    prefetch?: boolean;
  }) => (
    <a
      href={href}
      data-next-link="true"
      data-prefetch={prefetch ? "true" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
}));

vi.mock("@/components/marketing/Map", async () => {
  const React = await import("react");

  type MockMarker = {
    activeIconUrl?: string;
    iconUrl?: string;
    id?: string;
    position: { lat: number; lng: number };
    title?: string;
  };

  return {
    Map: ({
      ariaLabel,
      className,
      onStaticMarkerClick,
      renderStaticMarkerPopup,
      staticMarkers = [],
      theme,
    }: {
      ariaLabel?: string;
      className?: string;
      onStaticMarkerClick?: (marker: MockMarker) => void;
      renderStaticMarkerPopup?: (marker: MockMarker) => ReactNode;
      staticMarkers?: readonly MockMarker[];
      theme?: "dark" | "light";
    }) => {
      const [selectedMarker, setSelectedMarker] =
        React.useState<MockMarker | null>(null);

      return (
        <div
          role="region"
          aria-label={ariaLabel}
          className={className}
          data-theme={theme}
        >
          {staticMarkers.map((marker) => (
            <button
              key={marker.id}
              type="button"
              aria-label={`Show ${marker.title}`}
              data-active-icon={marker.activeIconUrl}
              data-default-icon={marker.iconUrl}
              onClick={() => {
                setSelectedMarker(marker);
                onStaticMarkerClick?.(marker);
              }}
            />
          ))}
          {selectedMarker && renderStaticMarkerPopup ? (
            <div data-mock-marker-popup="above-marker">
              {renderStaticMarkerPopup(selectedMarker)}
            </div>
          ) : null}
        </div>
      );
    },
  };
});

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

  const map = screen.getByRole("region", {
    name: "TRUX parking locations around Atlanta",
  });
  expect(map).toHaveAttribute("data-theme", "dark");
  expect(
    screen.queryByRole("img", {
      name: "Static map of TRUX parking locations around Atlanta",
    }),
  ).not.toBeInTheDocument();
  expect(
    screen.getAllByRole("button", { name: /^Show .* spots$/ }),
  ).toHaveLength(3);
  for (const marker of screen.getAllByRole("button", {
    name: /^Show .* spots$/,
  })) {
    expect(marker).toHaveAttribute(
      "data-default-icon",
      "/assets/hero-map-marker-default.svg",
    );
    expect(marker).toHaveAttribute(
      "data-active-icon",
      "/assets/hero-map-marker-active.svg",
    );
  }

  expect(
    screen.getByRole("region", {
      name: "TRUX parking locations around Atlanta",
    }),
  ).toHaveClass("h-full", "min-h-0", "w-full");

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

  const map = screen.getByRole("region", {
    name: "TRUX parking locations around Atlanta",
  });
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
  expect(popup.parentElement).toHaveAttribute(
    "data-mock-marker-popup",
    "above-marker",
  );
  expect(popup).toHaveClass("w-full");
  expect(screen.queryByText("8 Spots")).not.toBeInTheDocument();
  expect(screen.queryByText("10 Spots")).not.toBeInTheDocument();

  expect(
    screen.getAllByRole("button", { name: /^Show .* spots$/ }),
  ).toHaveLength(3);
});

it("opens the matching static location card when a map pin is selected", () => {
  render(<LocationsPage />);

  expect(
    screen.queryByRole("region", { name: "Selected parking location" }),
  ).not.toBeInTheDocument();

  const westAtlantaPin = screen.getByRole("button", {
    name: "Show West Atlanta Parking Lot, 8 spots",
  });
  fireEvent.click(westAtlantaPin);

  const selectedLocation = screen.getByRole("region", {
    name: "Selected parking location",
  });
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
    within(selectedLocation).getByRole("link", { name: "View Details" }),
  ).toHaveAttribute("href", "/locations/west-atlanta");
  expect(
    within(selectedLocation).getByRole("link", { name: "View Details" }),
  ).toHaveAttribute("data-next-link", "true");
});
