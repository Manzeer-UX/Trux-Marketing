import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/marketing/site-footer";

describe("SiteFooter", () => {
  it("uses the centered Figma layout on mobile and preserves the wide layout", () => {
    render(<SiteFooter />);

    const footer = screen.getByRole("contentinfo");
    const container = footer.firstElementChild;
    const navigation = screen.getByRole("navigation", {
      name: "Footer navigation",
    });
    const navigationLinks = within(navigation).getByRole("list", {
      name: "Footer links",
    });
    const socialLinks = screen.getByRole("group", {
      name: "TRUX social media",
    });
    const legalLinks = screen.getByRole("list", {
      name: "Footer legal links",
    });

    expect(footer).toHaveClass("py-16", "wide:h-[368px]", "wide:py-24");
    expect(container).toHaveClass(
      "items-center",
      "gap-12",
      "px-4",
      "wide:items-stretch",
      "wide:gap-16",
      "wide:px-6",
    );
    expect(navigationLinks).toHaveClass(
      "flex-col",
      "items-center",
      "gap-4",
      "text-center",
      "wide:flex-row",
    );
    expect(socialLinks).toHaveClass("justify-center");
    expect(legalLinks).toHaveClass(
      "order-first",
      "flex-col",
      "items-center",
      "gap-4",
      "text-center",
      "wide:order-none",
      "wide:flex-row",
    );
  });

  it("keeps every current footer destination", () => {
    render(<SiteFooter />);

    const navigation = screen.getByRole("navigation", {
      name: "Footer navigation",
    });

    expect(
      within(navigation).getByRole("link", { name: "Lot Owners" }),
    ).toHaveAttribute("href", "/lot-owners");
    expect(
      within(navigation).getByRole("link", { name: "Drivers" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(navigation).getByRole("link", { name: "About Us" }),
    ).toHaveAttribute("href", "/about-us");
    expect(
      within(navigation).getByRole("link", { name: "Locations" }),
    ).toHaveAttribute("href", "/locations");
    expect(
      within(navigation).getByRole("link", { name: "Partners" }),
    ).toHaveAttribute("href", "/partners");
    expect(
      within(navigation).getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("href", "/blog");
    expect(
      within(navigation).getByRole("link", { name: "Why Trux" }),
    ).toHaveAttribute("href", "/#why-trux");

    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute(
      "href",
      "https://www.facebook.com/truxparking/",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/trux-parking",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/truxparking/",
    );

    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "https://truxparking.com/privacy-policy/");
    expect(
      screen.getByRole("link", { name: "Terms of Service" }),
    ).toHaveAttribute(
      "href",
      "https://truxparking.com/wp-content/uploads/2026/04/Terms-Conditions.pdf",
    );
    expect(
      screen.getByRole("link", { name: "Cookies Settings" }),
    ).toHaveAttribute(
      "href",
      "https://truxparking.com/privacy-policy/#cookies",
    );
  });
});
