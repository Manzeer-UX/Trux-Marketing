import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

type MockStaticMarker = {
  iconUrl?: string;
  position: { lat: number; lng: number };
  title?: string;
  tooltip?: string;
};

vi.mock("@/components/marketing/Map", () => ({
  Map: ({
    ariaLabel,
    center,
    className,
    onStaticMarkerClick,
    renderStaticMarkerPopup,
    showMarker,
    staticMarkers = [],
    theme,
  }: {
    ariaLabel?: string;
    center?: { lat: number; lng: number };
    className?: string;
    onStaticMarkerClick?: () => void;
    renderStaticMarkerPopup?: () => React.ReactNode;
    showMarker?: boolean;
    staticMarkers?: readonly MockStaticMarker[];
    theme?: "dark" | "light";
  }) => (
    <div
      role="region"
      aria-label={ariaLabel}
      className={className}
      data-center={`${center?.lat},${center?.lng}`}
      data-has-click-handler={String(Boolean(onStaticMarkerClick))}
      data-has-popup-renderer={String(Boolean(renderStaticMarkerPopup))}
      data-show-marker={String(showMarker)}
      data-theme={theme}
    >
      {staticMarkers.map((marker) => (
        <span
          key={`${marker.position.lat},${marker.position.lng}`}
          role="img"
          aria-label={marker.title}
          data-icon={marker.iconUrl}
          data-tooltip={marker.tooltip}
        />
      ))}
    </div>
  ),
}));

it("renders the Figma location details screen for a static location route", async () => {
  const detailsPageModule = await vi
    .importActual<typeof import("./locations/[locationId]/page")>(
      "./locations/[locationId]/page",
    )
    .catch(() => null);

  expect(detailsPageModule).not.toBeNull();
  if (!detailsPageModule) return;

  const page = await detailsPageModule.default({
    params: Promise.resolve({ locationId: "georgia-atlanta" }),
  });
  render(page);

  expect(
    screen.getByRole("main", { name: "Atlanta parking location details" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Atlanta, GA Truck and Trailer Parking on 1345 M-52",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("1345 M-52, Atlanta, GA 33169")).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: "Atlanta parking lot side view" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: "Atlanta parking lot entrance view" }),
  ).toBeInTheDocument();

  const reservation = screen.getByRole("region", {
    name: "Parking reservation",
  });
  expect(reservation).toHaveClass(
    "w-full",
    "rounded-[8px]",
    "bg-white",
    "p-6",
    "xl:w-[400px]",
  );
  expect(within(reservation).getByText("$18")).toBeInTheDocument();
  const reservationType = within(reservation).getByRole("combobox", {
    name: "Type",
  });
  const spotCount = within(reservation).getByRole("combobox", {
    name: "Number of spots",
  });
  expect(reservationType).toHaveValue("one-time");
  expect(spotCount).toHaveValue("2");

  const editDates = within(reservation).getByRole("button", {
    name: "Edit dates: July 7–8",
  });
  expect(editDates).toBeInTheDocument();
  expect(
    within(reservation).queryByLabelText("Check-in date"),
  ).not.toBeInTheDocument();

  fireEvent.click(editDates);
  const checkInDate = within(reservation).getByLabelText("Check-in date");
  const checkOutDate = within(reservation).getByLabelText("Check-out date");
  expect(checkInDate).toHaveValue("2027-07-07");
  expect(checkOutDate).toHaveValue("2027-07-08");

  fireEvent.change(checkOutDate, { target: { value: "2027-07-10" } });
  expect(within(reservation).getByText("$54")).toBeInTheDocument();
  expect(within(reservation).getByText("for 3 nights")).toBeInTheDocument();
  expect(
    within(reservation).getByRole("button", {
      name: "Done editing dates",
    }),
  ).toBeInTheDocument();
  fireEvent.click(
    within(reservation).getByRole("button", {
      name: "Done editing dates",
    }),
  );
  expect(
    within(reservation).getByRole("button", {
      name: "Edit dates: July 7–10",
    }),
  ).toBeInTheDocument();
  expect(
    within(reservation).queryByLabelText("Check-in date"),
  ).not.toBeInTheDocument();

  fireEvent.change(reservationType, { target: { value: "monthly" } });
  expect(within(reservation).getByText("$540")).toBeInTheDocument();
  expect(within(reservation).getByText("for 1 month")).toBeInTheDocument();
  fireEvent.change(reservationType, { target: { value: "one-time" } });
  fireEvent.change(spotCount, { target: { value: "3" } });

  fireEvent.click(
    within(reservation).getByRole("button", { name: "Reserve Parking" }),
  );
  expect(
    within(reservation).getByRole("status", {
      name: "Reservation confirmation",
    }),
  ).toHaveTextContent("Reservation details saved for 3 half spots");

  fireEvent.click(
    within(reservation).getByRole("button", {
      name: "Edit dates: July 7–10",
    }),
  );
  fireEvent.change(within(reservation).getByLabelText("Check-out date"), {
    target: { value: "2027-07-06" },
  });
  fireEvent.click(
    within(reservation).getByRole("button", { name: "Reserve Parking" }),
  );
  expect(within(reservation).getByRole("alert")).toHaveTextContent(
    "Check-out date must be after the check-in date",
  );
  expect(within(reservation).queryByRole("status")).not.toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: "Amenities" }),
  ).toBeInTheDocument();

  const amenitiesTrigger = screen.getByRole("button", {
    name: "Show all 19 amenities",
  });
  expect(
    screen.queryByRole("dialog", { name: "All amenities" }),
  ).not.toBeInTheDocument();

  fireEvent.click(amenitiesTrigger);

  const amenitiesDialog = screen.getByRole("dialog", {
    name: "All amenities",
  });
  const amenityItems = within(amenitiesDialog).getAllByRole("listitem");
  expect(amenityItems).toHaveLength(19);
  expect(amenitiesDialog.querySelector(".lucide-check")).not.toBeInTheDocument();
  for (const amenityItem of amenityItems) {
    const amenityIcon = amenityItem.querySelector('[aria-hidden="true"]');
    expect(amenityIcon).toBeInTheDocument();
    expect(amenityIcon?.parentElement).toHaveClass("text-[#0f0f1d]");
  }
  expect(
    within(amenitiesDialog).getByText("Electric Gates"),
  ).toBeInTheDocument();
  expect(
    within(amenitiesDialog).getByText("Vending Machines"),
  ).toBeInTheDocument();

  fireEvent.keyDown(window, { key: "Escape" });

  expect(
    screen.queryByRole("dialog", { name: "All amenities" }),
  ).not.toBeInTheDocument();
  expect(amenitiesTrigger).toHaveFocus();
  expect(screen.getByText("Mobile QR Code")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Hours of operation" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Where you’ll be" }),
  ).toBeInTheDocument();
  const locationTitle =
    "Atlanta, GA Truck and Trailer Parking on 1345 M-52";
  const detailsMap = screen.getByRole("region", {
    name: `Map showing ${locationTitle}`,
  });

  expect(detailsMap).toHaveClass("h-full", "min-h-0", "w-full");
  expect(detailsMap).toHaveAttribute("data-center", "33.749,-84.388");
  expect(detailsMap).toHaveAttribute("data-theme", "dark");
  expect(detailsMap).toHaveAttribute("data-show-marker", "false");
  expect(detailsMap).toHaveAttribute("data-has-click-handler", "false");
  expect(detailsMap).toHaveAttribute("data-has-popup-renderer", "false");

  const markers = within(detailsMap).getAllByRole("img");
  expect(markers).toHaveLength(1);
  expect(markers[0]).toHaveAccessibleName(
    `${locationTitle} parking location`,
  );
  expect(markers[0]).toHaveAttribute(
    "data-icon",
    "/assets/hero-map-marker-active.svg",
  );
  expect(markers[0]).not.toHaveAttribute("data-tooltip");
  expect(
    screen.queryByRole("img", { name: `Static map for ${locationTitle}` }),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Show all photos" }));

  const photoDialog = screen.getByRole("dialog", { name: "All photos" });
  expect(photoDialog).toBeInTheDocument();
  expect(
    within(photoDialog).getAllByRole("img", { name: /Parking gallery view/ }),
  ).toHaveLength(8);

  fireEvent.click(
    within(photoDialog).getByRole("button", { name: "Close all photos" }),
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
