import { fireEvent, render, screen, within } from "@testing-library/react";
import { LocationsAccordion } from "./locations-accordion";

describe("LocationsAccordion", () => {
  it("opens Southeast by default and keeps every other region closed", () => {
    render(<LocationsAccordion />);

    expect(screen.getByRole("button", { name: "Southeast" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    for (const region of [
      "Southwest",
      "Northeast",
      "Midwest",
      "Northwest",
      "West",
    ]) {
      expect(screen.getByRole("button", { name: region })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }

    const southeastPanel = screen.getByRole("region", { name: "Southeast" });
    expect(within(southeastPanel).getByText("Georgia")).toBeInTheDocument();
    expect(within(southeastPanel).getByText("34 locations")).toBeInTheDocument();
    expect(
      screen.queryByRole("region", { name: "Southwest" }),
    ).not.toBeInTheDocument();
  });

  it("opens the selected region and closes the previous region", () => {
    render(<LocationsAccordion />);

    fireEvent.click(screen.getByRole("button", { name: "Southwest" }));

    expect(screen.getByRole("button", { name: "Southeast" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Southwest" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(
      screen.queryByRole("region", { name: "Southeast" }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Southwest" })).getByText(
        "Texas",
      ),
    ).toBeInTheDocument();
  });

  it("does not close the currently open region", () => {
    render(<LocationsAccordion />);

    const southeast = screen.getByRole("button", { name: "Southeast" });
    fireEvent.click(southeast);

    expect(southeast).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Southeast" })).toBeVisible();
  });
});
