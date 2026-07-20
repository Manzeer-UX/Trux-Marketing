import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

it("renders the static Figma Partners page and active navigation", async () => {
  const partnersPageModule = await vi
    .importActual<typeof import("./page")>("./page")
    .catch(() => null);

  expect(partnersPageModule).not.toBeNull();
  if (!partnersPageModule) return;

  render(await partnersPageModule.default());

  expect(
    screen.getByRole("main", { name: "TRUX partners" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Beyond the gate. The network behind the load.",
    }),
  ).toBeInTheDocument();

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  const partnersLink = within(primaryNavigation).getByRole("link", {
    name: "Partners",
  });
  expect(partnersLink).toHaveAttribute("href", "/partners");
  expect(partnersLink).toHaveAttribute("aria-current", "page");

  const hero = screen.getByRole("region", {
    name: "Beyond the gate. The network behind the load.",
  });
  expect(hero).toHaveClass("wide:h-[585px]", "wide:px-20");
  expect(hero.querySelector(":scope > div")).toHaveClass(
    "mx-auto",
    "w-full",
    "max-w-[1352px]",
    "wide:py-[129px]",
  );

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Four principles we don’t bend on.",
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("article", { name: /principle/i })).toHaveLength(
    4,
  );
  const principlesSection = screen.getByRole("region", {
    name: "Four principles we don’t bend on.",
  });
  expect(principlesSection).toHaveClass("wide:h-[780px]", "wide:p-20");
  expect(principlesSection.querySelector(":scope > div")).toHaveClass(
    "mx-auto",
    "w-full",
    "max-w-[1352px]",
  );

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Built for the cab. Vetted before the listing.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("article", { name: /partner profile/i }),
  ).toHaveLength(3);
  expect(
    screen.getByRole("region", {
      name: "Built for the cab. Vetted before the listing.",
    }),
  ).toHaveClass("wide:min-h-[1408px]", "wide:p-20");

  for (const partner of [
    "OTR Solutions",
    "Marquee Insurance Group",
    "ES Advantage",
  ]) {
    expect(
      screen.getByRole("heading", { level: 3, name: partner }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: `${partner} logo` }),
    ).toBeInTheDocument();
  }

  expect(
    screen.getByRole("heading", {
      level: 2,
      name: "Got a product that makes a driver’s day easier?",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("region", {
      name: "Got a product that makes a driver’s day easier?",
    }),
  ).toHaveClass("wide:h-[332px]", "wide:px-20", "wide:py-20");

  expect(screen.getByRole("contentinfo")).toHaveClass(
    "wide:h-[368px]",
    "bg-white",
    "text-midnight",
  );
});
