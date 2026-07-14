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

  it("renders header and footer navigation as links with meaningful destinations", () => {
    render(<HomePage />);

    const primaryNavigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const footerNavigation = screen.getByRole("navigation", {
      name: "Footer navigation",
    });

    const expectedDestinations = new Map([
      ["Lot Owners", "https://truxparking.com/propertyowners/"],
      ["Drivers", "/"],
      ["Why Trux", "/#why-trux"],
      ["About Us", "https://truxparking.com/about-us/"],
      ["Partners", "https://truxparking.com/truxpartners/"],
      ["Referrals", "https://truxparking.com/affiliateprogram/"],
      ["Trux Perx", "https://truxparking.com/truxpartners/"],
      ["Locations", "https://truxparking.com/locations-we-serve/"],
      ["Blog", "https://truxparking.com/blog/"],
    ]);

    for (const [label, href] of expectedDestinations) {
      expect(
        within(footerNavigation).getByRole("link", { name: label }),
      ).toHaveAttribute("href", href);
    }

    for (const [label, href] of [...expectedDestinations].slice(0, 7)) {
      expect(
        within(primaryNavigation).getByRole("link", { name: label }),
      ).toHaveAttribute("href", href);
    }

    expect(
      within(primaryNavigation).getByRole("link", { name: "Drivers" }),
    ).toHaveAttribute("aria-current", "page");
    expect(within(primaryNavigation).getAllByRole("listitem")).toHaveLength(7);
    expect(document.querySelector('a[href="#"]')).not.toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Why drivers choose TRUX." }),
    ).toHaveAttribute("id", "why-trux");
  });

  it("renders account actions as links with exact destinations", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "https://trucklots.com/",
    );
    expect(
      screen.getByRole("link", { name: "New Lot Owner Account" }),
    ).toHaveAttribute("href", "https://truxparking.com/propertyowners/");
    expect(
      screen.getByRole("link", { name: "New Driver Account" }),
    ).toHaveAttribute("href", "https://trucklots.com/");
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

  it("renders four labeled native search controls without submission behavior", () => {
    const { container } = render(<HomePage />);

    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Search Available Lots" }),
    ).toHaveAttribute("type", "button");

    const location = screen.getByRole("textbox", { name: "Location" });
    expect(location).toHaveAttribute("type", "text");
    expect(location).toHaveAttribute("name", "location");
    expect(location).toHaveAttribute("placeholder", "City, state, or zip code");

    const parkingType = screen.getByRole("combobox", { name: "Type" });
    expect(parkingType).toHaveAttribute("name", "parkingType");
    expect(parkingType).toHaveDisplayValue("Select type");
    expect(
      within(parkingType).getByRole("option", { name: "One time" }),
    ).toBeInTheDocument();
    expect(
      within(parkingType).getByRole("option", { name: "Monthly" }),
    ).toBeInTheDocument();

    const numberOfSpots = screen.getByRole("combobox", {
      name: "Number of spots",
    });
    expect(numberOfSpots).toHaveAttribute("name", "numberOfSpots");
    expect(numberOfSpots).toHaveDisplayValue("Select amount");
    expect(within(numberOfSpots).getAllByRole("option")).toHaveLength(11);
    expect(
      within(numberOfSpots).getByRole("option", { name: "1" }),
    ).toBeInTheDocument();
    expect(
      within(numberOfSpots).getByRole("option", { name: "10" }),
    ).toBeInTheDocument();

    const dates = screen.getByRole("textbox", { name: "Dates" });
    expect(dates).toHaveAttribute("type", "text");
    expect(dates).toHaveAttribute("name", "parkingDates");
    expect(dates).toHaveAttribute("placeholder", "Select parking dates");
  });

  it("shows a decorative dropdown indicator for each parking select", () => {
    render(<HomePage />);

    for (const name of ["Type", "Number of spots"]) {
      const combobox = screen.getByRole("combobox", { name });
      const field = combobox.closest("[data-search-field]");
      const indicator = field?.querySelector("[data-select-indicator]");

      expect(field).not.toBeNull();
      expect(indicator).toHaveAttribute("aria-hidden", "true");
      expect(indicator).toHaveClass("pointer-events-none", "text-warm-gray");
    }
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
