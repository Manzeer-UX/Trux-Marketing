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

  it("uses named split layouts only at the wide desktop breakpoint", () => {
    render(<HomePage />);

    const valuePropsSection = screen.getByRole("region", {
      name: "Why drivers choose TRUX.",
    });
    const valuePropsGrid = valuePropsSection.querySelector(":scope > div");
    const coverageSection = screen.getByRole("region", {
      name: /Secure parking.*25 states and growing\./,
    });
    const testimonialsSection = screen.getByRole("region", {
      name: "WHAT DRIVERS ARE SAY",
    });

    expect(valuePropsSection).toHaveClass(
      "wide:grid",
      "wide:h-[560px]",
      "wide:grid-cols-2",
    );
    expect(valuePropsSection).not.toHaveClass("lg:h-[560px]");
    expect(valuePropsGrid).toHaveClass("wide:grid-cols-value-props");
    expect(valuePropsGrid).not.toHaveClass("sm:grid-cols-2");

    expect(coverageSection).toHaveClass(
      "wide:grid",
      "wide:h-[512px]",
      "wide:grid-cols-coverage",
    );
    expect(coverageSection).not.toHaveClass("lg:h-[512px]");

    expect(testimonialsSection).toHaveClass("wide:h-[510px]");
    expect(testimonialsSection).not.toHaveClass("lg:h-[510px]");
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

  it("renders the static FAQ and app download surfaces", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frequently Asked Questions",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem", { name: /FAQ:/ })).toHaveLength(7);
    expect(
      screen.getByText(
        "Book, access, and manage your spot all from your phone.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "TRUX mobile app showing a parking location",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("contains no submitting form", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("form")).toBeNull();
  });

  it("exposes accessible telephone entry without a form", () => {
    render(<HomePage />);
    const phoneInput = screen.getByRole("textbox", {
      name: "Mobile phone number",
    });

    expect(phoneInput).toHaveAttribute("type", "tel");
    expect(phoneInput).toHaveAttribute("placeholder", "(555) 123-4567");
    expect(phoneInput.closest("form")).toBeNull();
  });

  it("keeps the lower page static and uses exact wide section heights", () => {
    const { container } = render(<HomePage />);
    const faqSection = screen.getByRole("region", {
      name: "Frequently Asked Questions",
    });
    const appSection = screen.getByRole("region", {
      name: "Book, access, and manage your spot all from your phone.",
    });
    const footer = screen.getByRole("contentinfo");

    expect(faqSection).toHaveClass("wide:h-[602px]");
    expect(appSection).toHaveClass("wide:h-[716px]");
    expect(footer).toHaveClass("wide:h-[368px]");
    expect(screen.getByRole("button", { name: "Send Link" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(
      screen.getByRole("button", { name: "Download on the App Store" }),
    ).toHaveAttribute("type", "button");
    expect(
      screen.getByRole("button", { name: "Get it on Google Play" }),
    ).toHaveAttribute("type", "button");
    expect(container.querySelector('a[href="#"]')).toBeNull();

    for (const item of screen.getAllByRole("listitem", { name: /FAQ:/ })) {
      expect(item.querySelector("button, a, input")).toBeNull();
    }
  });
});
