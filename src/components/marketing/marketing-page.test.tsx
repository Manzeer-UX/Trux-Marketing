import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";

describe("TRUX marketing page", () => {
  it("renders the primary navigation and hero", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /The Safest Truck Parking Network/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Available TRUX parking lots around Atlanta",
      }),
    ).toBeInTheDocument();
  });

  it("renders all four metrics", () => {
    render(<HomePage />);

    for (const value of ["200+", "25", "10K +", "24/7"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("renders the benefits, coverage, and testimonials", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Why drivers choose TRUX.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("article", { name: /testimonial by/i }),
    ).toHaveLength(3);
    expect(
      screen.getByRole("img", {
        name: "TRUX parking coverage across 25 states",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Explore Locations" }),
    ).toBeInTheDocument();
  });

  it("renders visual-only navigation labels without fake fragment links", () => {
    render(<HomePage />);

    const navigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });

    expect(navigation.querySelector('a[href="#"]')).not.toBeInTheDocument();
    expect(within(navigation).getByText("Drivers")).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(within(navigation).getByText("Trux Perx")).toBeInTheDocument();
    expect(within(navigation).getAllByRole("listitem")).toHaveLength(7);
  });

  it("keeps the compact header until the wide breakpoint and right-aligns the desktop map", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toHaveClass("hidden", "wide:flex");
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveClass("wide:hidden");
    expect(
      screen.getByRole("img", {
        name: "Available TRUX parking lots around Atlanta",
      }),
    ).toHaveClass("lg:object-right");
    expect(
      screen.getByRole("button", { name: "Search Available Lots" }),
    ).toHaveClass("whitespace-nowrap");
  });

  it("keeps the visual search controls non-submitting", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search Available Lots" }),
    ).toHaveAttribute("type", "button");
    expect(screen.getByText("City, state, or zip code")).toBeInTheDocument();
    expect(screen.getByText("Select parking dates")).toBeInTheDocument();
  });
});
