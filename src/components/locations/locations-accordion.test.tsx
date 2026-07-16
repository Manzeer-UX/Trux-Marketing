import { fireEvent, render, screen, within } from "@testing-library/react";
import { LocationsAccordion } from "./locations-accordion";

describe("LocationsAccordion", () => {
  it("renders the Figma search control with submit disabled until text is entered", () => {
    render(<LocationsAccordion />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Find parking near",
    });
    const searchButton = screen.getByRole("button", { name: "Search" });

    expect(searchInput).toHaveAttribute(
      "placeholder",
      "City, state, or zip code",
    );
    expect(searchButton).toHaveClass("bg-amber", "text-midnight");
    expect(searchButton).toBeDisabled();

    fireEvent.change(searchInput, { target: { value: "California" } });

    expect(searchButton).toBeEnabled();
  });

  it("filters on submit and opens the first matching state", () => {
    render(<LocationsAccordion />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Find parking near" }),
      { target: { value: "California" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(
      screen.getByRole("button", { name: "California, 9 Locations" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.queryByRole("button", { name: "Georgia, 34 Locations" }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "California" })).getAllByText(
        "California Parking Lot #1",
      ),
    ).toHaveLength(9);
  });

  it("matches a city, address, or zip code from the static location data", () => {
    render(<LocationsAccordion />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Find parking near" }),
      { target: { value: "33169" } },
    );
    fireEvent.submit(screen.getByRole("search"));

    expect(
      screen.getByRole("button", { name: "Georgia, 34 Locations" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      within(screen.getByRole("region", { name: "Georgia" })).getAllByText(
        "17707 NW Miami Ct, Atlanta, GA 33169",
      ),
    ).toHaveLength(13);
  });

  it("submits the current location query when Enter is pressed", () => {
    render(<LocationsAccordion />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Find parking near",
    });
    fireEvent.change(searchInput, { target: { value: "Arkansas" } });
    fireEvent.keyDown(searchInput, { key: "Enter", code: "Enter" });

    expect(
      screen.getByRole("button", { name: "Arkansas, 2 Locations" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.queryByRole("button", { name: "Georgia, 34 Locations" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when no static location matches", () => {
    render(<LocationsAccordion />);

    fireEvent.change(
      screen.getByRole("searchbox", { name: "Find parking near" }),
      { target: { value: "New York" } },
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "No locations found. Try another city, state, or ZIP code.",
    );
    expect(
      screen.queryByRole("button", { name: /Locations$/ }),
    ).not.toBeInTheDocument();
  });

  it("restores every state collapsed when the search is cleared", () => {
    render(<LocationsAccordion />);

    const searchInput = screen.getByRole("searchbox", {
      name: "Find parking near",
    });
    fireEvent.change(searchInput, { target: { value: "California" } });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    fireEvent.change(searchInput, { target: { value: "" } });

    for (const stateButton of screen.getAllByRole("button", {
      name: /Locations$/,
    })) {
      expect(stateButton).toHaveAttribute("aria-expanded", "false");
    }
    expect(
      screen.queryByRole("region", { name: "Georgia" }),
    ).not.toBeInTheDocument();
  });

  it("starts with every state accordion collapsed", () => {
    render(<LocationsAccordion />);

    for (const stateButton of screen.getAllByRole("button", {
      name: /Locations$/,
    })) {
      expect(stateButton).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("opens the selected state and closes the previous state", () => {
    render(<LocationsAccordion />);

    fireEvent.click(
      screen.getByRole("button", { name: "Georgia, 34 Locations" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Alabama, 3 Locations" }),
    );

    expect(
      screen.getByRole("button", { name: "Georgia, 34 Locations" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "Alabama, 3 Locations" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.queryByRole("region", { name: "Georgia" }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Alabama" })).getAllByText(
        "Alabama Parking Lot #1",
      ),
    ).toHaveLength(3);
    expect(
      within(screen.getByRole("region", { name: "Alabama" })).getAllByText(
        "2800 Industrial Pkwy, Birmingham, AL 35217",
      ),
    ).toHaveLength(3);
  });

  it("closes the currently open state and leaves every accordion collapsed", () => {
    render(<LocationsAccordion />);

    const georgia = screen.getByRole("button", {
      name: "Georgia, 34 Locations",
    });
    fireEvent.click(georgia);
    fireEvent.click(georgia);

    expect(georgia).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("region", { name: "Georgia" }),
    ).not.toBeInTheDocument();

    for (const state of [
      "Arkansas, 2 Locations",
      "Alabama, 3 Locations",
      "California, 9 Locations",
    ]) {
      expect(screen.getByRole("button", { name: state })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });
});
