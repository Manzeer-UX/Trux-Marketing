import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

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
  expect(screen.getByText("Mobile QR Code")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Hours of operation" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Where you’ll be" }),
  ).toBeInTheDocument();
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
