import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import { AboutOriginStory } from "@/components/about-us/about-origin-story";
import { AboutTeamSection } from "@/components/about-us/about-team-section";
import { getTeamMemberInitials, teamMembers } from "@/constants/about-content";

it("does not store manually defined initials in team member data", () => {
  for (const member of teamMembers) {
    expect(member).not.toHaveProperty("initials");
  }
});

it("updates rendered initials whenever a team member name changes", () => {
  const member = teamMembers[0] as unknown as { name: string };
  const originalName = member.name;

  try {
    member.name = "  Taylor   Morgan  ";
    const { rerender } = render(<AboutTeamSection />);
    let firstTeamCard = screen.getAllByRole("article", {
      name: /team member/i,
    })[0]!;

    expect(within(firstTeamCard).getByText("TM")).toBeInTheDocument();

    member.name = "Prince";
    rerender(<AboutTeamSection />);
    firstTeamCard = screen.getAllByRole("article", {
      name: /team member/i,
    })[0]!;

    expect(within(firstTeamCard).getByText("P")).toBeInTheDocument();
  } finally {
    member.name = originalName;
  }
});

it("renders every generated team initial with an explicit bold weight", () => {
  render(<AboutTeamSection />);

  for (const member of teamMembers) {
    expect(
      screen.getByText(getTeamMemberInitials(member.name), {
        selector: "span",
      }),
    ).toHaveClass("font-[800]");
  }
});

it("keeps the origin growth statistic at the Figma semibold weight", () => {
  render(<AboutOriginStory />);

  const growthStatistic = screen.getByText("1 → 25");

  expect(growthStatistic).toHaveClass("font-semibold");
  expect(growthStatistic).not.toHaveClass("font-bold", "font-[800]");
});

it("renders the static Figma About Us page and active navigation", async () => {
  const aboutPageModule = await vi
    .importActual<typeof import("./page")>("./page")
    .catch(() => null);

  expect(aboutPageModule).not.toBeNull();
  if (!aboutPageModule) return;

  render(await aboutPageModule.default());

  expect(
    screen.getByRole("main", { name: "TRUX about us" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "We built TRUX because truck parking was broken.",
    }),
  ).toBeInTheDocument();

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  const aboutLink = within(primaryNavigation).getByRole("link", {
    name: "About Us",
  });
  expect(aboutLink).toHaveAttribute("href", "/about-us");
  expect(aboutLink).toHaveAttribute("aria-current", "page");

  expect(
    screen.getByRole("region", {
      name: "We built TRUX because truck parking was broken.",
    }),
  ).toHaveClass("wide:h-[640px]", "wide:px-20", "wide:py-[129px]");

  expect(
    screen.getByRole("region", {
      name: "Truck parking was broken. So we fixed it.",
    }),
  ).toHaveClass("wide:h-[500px]", "wide:p-20");

  expect(
    screen.getByRole("region", {
      name: "Four principles we don’t bend on.",
    }),
  ).toHaveClass("wide:h-[780px]", "wide:p-20");
  expect(screen.getAllByRole("article", { name: /principle/i })).toHaveLength(
    4,
  );

  expect(
    screen.getByRole("region", { name: "The team behind TRUX." }),
  ).toHaveClass("wide:h-[1875px]", "wide:p-20");
  expect(screen.getAllByRole("article", { name: /team member/i })).toHaveLength(
    12,
  );
  expect(screen.getByText("BOARD")).toBeInTheDocument();

  expect(
    screen.getByRole("region", {
      name: "Got a lot, a truck, or a question?",
    }),
  ).toHaveClass("wide:h-[332px]", "wide:px-20", "wide:py-20");

  expect(screen.getByRole("contentinfo")).toHaveClass(
    "wide:h-[368px]",
    "bg-white",
    "text-midnight",
  );
});
