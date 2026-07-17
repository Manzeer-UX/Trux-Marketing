import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

it("renders the Figma blog grid and links every static article", async () => {
  const blogPageModule = await vi
    .importActual<typeof import("./page")>("./page")
    .catch(() => null);

  expect(blogPageModule).not.toBeNull();
  if (!blogPageModule) return;

  render(<blogPageModule.default />);

  const main = screen.getByRole("main", { name: "TRUX blog" });
  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  const blogNavigationLink = within(primaryNavigation).getByRole("link", {
    name: "Blog",
  });

  expect(blogNavigationLink).toHaveAttribute("href", "/blog");
  expect(blogNavigationLink).toHaveAttribute("aria-current", "page");
  expect(main).toHaveClass("bg-midnight");

  const articles = within(main).getAllByRole("article");
  expect(articles).toHaveLength(12);

  const articleLinks = within(main).getAllByRole("link", {
    name: /Read Blog Title/i,
  });
  expect(articleLinks).toHaveLength(12);
  for (const link of articleLinks) {
    expect(link.getAttribute("href")).toMatch(/^\/blog\/[a-z0-9-]+$/);
  }

  expect(
    screen.getByRole("navigation", { name: "Blog pagination" }),
  ).toBeInTheDocument();
  expect(screen.getByText("Previous")).toBeInTheDocument();
  expect(screen.getByText("Next")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toHaveClass(
    "wide:h-[368px]",
    "bg-midnight",
  );
});
