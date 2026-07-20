import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import HomePageRoute from "@/app/page";

let resolvedHomePage: ReactElement;

beforeAll(async () => {
  resolvedHomePage = await HomePageRoute();
});

function HomePage() {
  return resolvedHomePage;
}

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
      screen.getByRole("region", {
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
      screen.getByRole("link", { name: "Explore Locations" }),
    ).toHaveAttribute("href", "/locations");
  });

  it("uses named split layouts only at the wide desktop breakpoint", () => {
    render(<HomePage />);

    const valuePropsSection = screen.getByRole("region", {
      name: "Why drivers choose TRUX.",
    });
    const valuePropsLayout = valuePropsSection.querySelector(":scope > div");
    const valuePropsGrid = valuePropsLayout?.querySelector(":scope > div");
    const coverageHeading = document.getElementById("coverage-heading");
    const coverageSection = coverageHeading?.closest("section");
    const coverageGrid = coverageSection?.querySelector(":scope > div");
    const testimonialsSection = screen.getByRole("region", {
      name: "WHAT DRIVERS ARE SAY",
    });
    const testimonialsLayout =
      testimonialsSection.querySelector(":scope > div");

    expect(valuePropsLayout).toHaveClass(
      "wide:grid",
      "wide:h-[560px]",
      "wide:grid-cols-2",
    );
    expect(valuePropsLayout).not.toHaveClass("lg:h-[560px]");
    expect(valuePropsGrid).toHaveClass("wide:grid-cols-value-props");
    expect(valuePropsGrid).not.toHaveClass("sm:grid-cols-2");

    expect(coverageSection).not.toBeNull();
    expect(coverageGrid).toHaveClass(
      "wide:grid",
      "wide:h-[512px]",
      "wide:grid-cols-coverage",
    );
    expect(coverageGrid).not.toHaveClass("lg:h-[512px]");

    expect(testimonialsLayout).toHaveClass("wide:h-[510px]");
    expect(testimonialsLayout).not.toHaveClass("lg:h-[510px]");
  });

  it("renders header and footer navigation as links with meaningful destinations", () => {
    render(<HomePage />);

    const primaryNavigation = screen.getByRole("navigation", {
      name: "Primary navigation",
    });
    const footerNavigation = screen.getByRole("navigation", {
      name: "Footer navigation",
    });

    const expectedHeaderDestinations = new Map([
      ["Lot Owners", "/lot-owners"],
      ["Drivers", "/"],
      ["About Us", "/about-us"],
      ["Locations", "/locations"],
      ["Partners", "/partners"],
      ["Blog", "/blog"],
    ]);

    for (const [label, href] of expectedHeaderDestinations) {
      expect(
        within(footerNavigation).getByRole("link", { name: label }),
      ).toHaveAttribute("href", href);
      expect(
        within(primaryNavigation).getByRole("link", { name: label }),
      ).toHaveAttribute("href", href);
    }

    expect(
      within(footerNavigation).getByRole("link", { name: "Drivers" }),
    ).toHaveAttribute("aria-current", "page");

    const primaryLinks = within(primaryNavigation).getByRole("list", {
      name: "Primary links",
    });
    const topLevelItems = Array.from(primaryLinks.children);
    const topLevelLabels = topLevelItems.map((item) => {
      const target =
        item.firstElementChild?.tagName === "DETAILS"
          ? item.firstElementChild.querySelector("summary")
          : item.firstElementChild;

      return target?.textContent?.trim();
    });

    expect(topLevelLabels).toEqual([
      "Lot Owners",
      "Drivers",
      "About Us",
      "Locations",
      "Partners",
      "Blog",
      "More",
    ]);
    expect(topLevelItems).toHaveLength(7);

    const footerLinks = within(footerNavigation).getByRole("list", {
      name: "Footer links",
    });
    const footerTopLevelItems = Array.from(footerLinks.children);
    const footerTopLevelLabels = footerTopLevelItems.map((item) => {
      const target =
        item.firstElementChild?.tagName === "DETAILS"
          ? item.firstElementChild.querySelector("summary")
          : item.firstElementChild;

      return target?.textContent?.trim();
    });

    expect(footerTopLevelLabels).toEqual(topLevelLabels);

    const moreMenu = within(primaryNavigation).getByText("More", {
      selector: "summary",
    });
    const moreDetails = moreMenu.closest("details");

    expect(moreDetails).not.toBeNull();
    expect(
      within(moreDetails!).getByRole("link", { name: "Why Trux" }),
    ).toHaveAttribute("href", "/#why-trux");
    expect(
      within(moreDetails!).queryByRole("link", { name: "Referrals" }),
    ).not.toBeInTheDocument();
    expect(
      within(moreDetails!).queryByRole("link", { name: "Trux Perx" }),
    ).not.toBeInTheDocument();
    expect(
      within(moreDetails!).queryByRole("link", { name: "Blog" }),
    ).not.toBeInTheDocument();

    const footerMoreMenu = within(footerNavigation).getByText("More", {
      selector: "summary",
    });
    const footerMoreDetails = footerMoreMenu.closest("details");

    expect(footerMoreDetails).not.toBeNull();
    expect(
      within(footerMoreDetails!).getByRole("link", { name: "Why Trux" }),
    ).toHaveAttribute("href", "/#why-trux");
    expect(
      within(footerMoreDetails!).queryByRole("link", { name: "Referrals" }),
    ).not.toBeInTheDocument();
    expect(
      within(footerMoreDetails!).queryByRole("link", { name: "Trux Perx" }),
    ).not.toBeInTheDocument();

    for (const navigation of [primaryNavigation, footerNavigation]) {
      for (const link of within(navigation).getAllByRole("link")) {
        expect(link.getAttribute("href")).toMatch(/^\//);
      }
    }

    expect(
      within(primaryNavigation).getByRole("link", { name: "Drivers" }),
    ).toHaveAttribute("aria-current", "page");
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

  it("keeps the compact header until the wide breakpoint and renders the map surface", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" }),
    ).toHaveClass("hidden", "wide:flex");
    expect(
      screen
        .getByRole("button", { name: "Open navigation menu" })
        .closest("div"),
    ).toHaveClass("wide:hidden");
    expect(
      screen.getByRole("region", {
        name: "Available TRUX parking lots around Atlanta",
      }),
    ).toHaveClass("h-full", "w-full");
    expect(
      screen.getByRole("button", { name: "Search Available Lots" }),
    ).toHaveClass("whitespace-nowrap");
  });

  it("matches the Figma hero with separate content and Google map columns", () => {
    render(<HomePage />);

    const hero = document.getElementById("hero-heading")?.closest("section");
    const layout = hero?.firstElementChild;
    const contentPanel = layout?.firstElementChild;
    const mapPanel = layout?.lastElementChild;
    const map = screen.getByRole("region", {
      name: "Available TRUX parking lots around Atlanta",
    });

    expect(layout).toHaveClass(
      "lg:grid",
      "lg:h-full",
      "lg:grid-cols-[620px_minmax(0,1fr)]",
    );
    expect(contentPanel).not.toHaveClass(
      "lg:absolute",
      "lg:inset-y-0",
      "lg:left-0",
      "lg:w-[620px]",
    );
    expect(mapPanel).toHaveClass("relative", "lg:h-full");
    expect(mapPanel).not.toHaveClass("lg:absolute", "lg:inset-0");
    expect(map).toHaveClass("h-full", "w-full");
  });

  it("renders four labeled search controls without submission behavior", () => {
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
    expect(parkingType).toHaveTextContent("Select type");
    expect(parkingType).toHaveAttribute("aria-haspopup", "listbox");

    const numberOfSpots = screen.getByRole("combobox", {
      name: "Number of spots",
    });
    expect(numberOfSpots).toHaveAttribute("name", "numberOfSpots");
    expect(numberOfSpots).toHaveTextContent("Select amount");
    expect(numberOfSpots).toHaveAttribute("aria-haspopup", "listbox");

    const dates = screen.getByRole("combobox", { name: "Dates" });
    expect(dates).toHaveAttribute("name", "parkingDates");
    expect(dates).toHaveTextContent("Select parking dates");
    expect(dates).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("allows every search popup to extend beyond the hero boundary", () => {
    render(<HomePage />);

    const hero = document.getElementById("hero-heading")?.closest("section");

    expect(hero).not.toBeNull();
    expect(hero).toHaveClass("overflow-visible");
    expect(hero).not.toHaveClass("overflow-hidden");

    const parkingType = screen.getByRole("combobox", { name: "Type" });
    fireEvent.click(parkingType);
    expect(
      screen.getByRole("listbox", { name: "Type options" }),
    ).toBeInTheDocument();
    fireEvent.click(parkingType);

    const numberOfSpots = screen.getByRole("combobox", {
      name: "Number of spots",
    });
    fireEvent.click(numberOfSpots);
    expect(
      screen.getByRole("listbox", { name: "Number of spots options" }),
    ).toBeInTheDocument();
    fireEvent.click(numberOfSpots);

    const dates = screen.getByRole("combobox", { name: "Dates" });
    fireEvent.click(dates);
    expect(
      screen.getByRole("dialog", { name: "July date picker" }),
    ).toBeInTheDocument();
  });

  it("raises each open search popup above the following fields", () => {
    render(<HomePage />);

    for (const name of ["Type", "Number of spots", "Dates"]) {
      const control = screen.getByRole("combobox", { name });
      const dropdownRoot = control.parentElement;

      expect(dropdownRoot).toHaveClass("z-30");

      fireEvent.click(control);

      expect(dropdownRoot).toHaveClass("z-40");
      expect(dropdownRoot).not.toHaveClass("z-30");

      fireEvent.click(control);

      expect(dropdownRoot).toHaveClass("z-30");
    }
  });

  it("opens and selects a booking type from the Figma dropdown", () => {
    render(<HomePage />);

    const parkingType = screen.getByRole("combobox", { name: "Type" });
    expect(parkingType).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(parkingType);

    expect(parkingType).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox", { name: "Type options" });
    expect(listbox).toHaveClass(
      "w-full",
      "bg-warm-gray",
      "rounded-sm",
      "shadow-[0_4px_16px_rgba(0,0,0,0.3)]",
    );
    expect(listbox).not.toHaveClass("min-w-[270px]");

    const recurringOption = within(listbox).getByRole("option", {
      name: "Recurring booking",
    });
    const oneTimeOption = within(listbox).getByRole("option", {
      name: "One time booking",
    });

    expect(recurringOption).toHaveClass("bg-dropdown-active", "text-white");
    fireEvent.click(oneTimeOption);

    expect(parkingType).toHaveTextContent("One time booking");
    expect(parkingType).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("listbox", { name: "Type options" }),
    ).not.toBeInTheDocument();
  });

  it("opens a Figma spots dropdown matching the input width", () => {
    render(<HomePage />);

    const numberOfSpots = screen.getByRole("combobox", {
      name: "Number of spots",
    });
    expect(numberOfSpots).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(numberOfSpots);

    const listbox = screen.getByRole("listbox", {
      name: "Number of spots options",
    });
    expect(numberOfSpots).toHaveAttribute("aria-expanded", "true");
    expect(listbox).toHaveClass(
      "w-full",
      "max-h-[276px]",
      "search-dropdown-scrollbar",
    );
    expect(listbox).not.toHaveClass("min-w-[270px]");

    const options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(10);
    expect(within(listbox).getByRole("option", { name: "4" })).toHaveClass(
      "bg-dropdown-active",
      "text-white",
    );

    fireEvent.click(within(listbox).getByRole("option", { name: "8" }));

    expect(numberOfSpots).toHaveTextContent("8");
    expect(numberOfSpots).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a full-field-width Figma calendar and selects a date range", () => {
    render(<HomePage />);

    const dates = screen.getByRole("combobox", { name: "Dates" });
    expect(dates).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(dates);

    const calendar = screen.getByRole("dialog", {
      name: "July date picker",
    });
    expect(dates).toHaveAttribute("aria-expanded", "true");
    expect(calendar).toHaveClass("w-full", "bg-warm-gray");
    expect(calendar).not.toHaveClass("w-[344px]");
    expect(screen.getByText("July 2026")).toBeInTheDocument();
    expect(
      within(calendar).getAllByRole("button", {
        name: /Choose July \d+, 2026/,
      }),
    ).toHaveLength(31);

    const firstDay = within(calendar).getByRole("button", {
      name: "Choose July 1, 2026",
    });
    fireEvent.click(firstDay);
    expect(firstDay).toHaveClass("bg-dropdown-active", "text-white");

    fireEvent.click(
      within(calendar).getByRole("button", {
        name: "Choose July 3, 2026",
      }),
    );

    expect(dates).toHaveTextContent("Jul 1 – Jul 3");
    expect(dates).toHaveAttribute("aria-expanded", "false");
  });

  it("changes the calendar month and displays the year", () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole("combobox", { name: "Dates" }));

    const calendar = screen.getByRole("dialog", {
      name: "July date picker",
    });
    const previousMonth = within(calendar).getByRole("button", {
      name: "Previous month",
    });
    const nextMonth = within(calendar).getByRole("button", {
      name: "Next month",
    });

    expect(within(calendar).getByText("July 2026")).toBeInTheDocument();

    fireEvent.click(nextMonth);
    expect(within(calendar).getByText("August 2026")).toBeInTheDocument();
    expect(
      within(calendar).getByRole("button", {
        name: "Choose August 31, 2026",
      }),
    ).toBeInTheDocument();

    fireEvent.click(previousMonth);
    for (let index = 0; index < 7; index += 1) {
      fireEvent.click(previousMonth);
    }

    expect(within(calendar).getByText("December 2025")).toBeInTheDocument();
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

    const dates = screen.getByRole("combobox", { name: "Dates" });
    const datesField = dates.closest("[data-search-field]");
    const calendarIndicator = datesField?.querySelector(
      "[data-date-indicator]",
    );

    expect(datesField).not.toBeNull();
    expect(calendarIndicator).toHaveAttribute("aria-hidden", "true");
    expect(calendarIndicator).toHaveClass(
      "pointer-events-none",
      "text-warm-gray",
    );
  });

  it("renders the FAQ accordion and app download surfaces", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Frequently Asked Questions",
      }),
    ).toBeInTheDocument();
    const faqToggles = screen.getAllByRole("button", {
      name: /Expand answer for:/,
    });

    expect(faqToggles).toHaveLength(7);
    for (const toggle of faqToggles) {
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    }
    expect(
      screen.getAllByText(
        "More information about this TRUX parking question will be available soon.",
      ),
    ).toHaveLength(7);

    const firstFaqToggle = faqToggles[0]!;
    fireEvent.click(firstFaqToggle);
    expect(firstFaqToggle).toHaveAttribute("aria-expanded", "true");
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

  it("uses exact wide heights and non-submitting lower-page actions", () => {
    const { container } = render(<HomePage />);
    const appSection = screen.getByRole("region", {
      name: "Book, access, and manage your spot all from your phone.",
    });
    const appLayout = appSection.querySelector(":scope > div");
    const footer = screen.getByRole("contentinfo");

    expect(appLayout).toHaveClass("wide:h-[716px]");
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
  });
});
