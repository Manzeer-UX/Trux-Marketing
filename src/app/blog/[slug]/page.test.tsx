import { render, screen, within } from "@testing-library/react";
import { vi } from "vitest";

it("opens a static blog detail screen using the Figma article layout", async () => {
  const blogDetailPageModule = await vi
    .importActual<typeof import("./page")>("./page")
    .catch(() => null);

  expect(blogDetailPageModule).not.toBeNull();
  if (!blogDetailPageModule) return;

  const page = await blogDetailPageModule.default({
    params: Promise.resolve({ slug: "freight-broker-vs-dispatcher" }),
  });
  render(page);

  const main = screen.getByRole("main", { name: "TRUX blog article" });
  expect(main).toHaveClass("bg-midnight");
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Freight Broker vs. Dispatcher: What’s the Difference?",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("Nov 11, 2024")).toBeInTheDocument();
  expect(screen.getByText("Lando Norris")).toBeInTheDocument();
  expect(screen.getByText("Product Designer")).toBeInTheDocument();

  const article = screen.getByRole("article");
  expect(article).toHaveClass("max-w-[768px]", "wide:py-24");
  expect(
    within(article).getByRole("heading", {
      level: 2,
      name: "Why the Difference Matters to Professional Drivers",
    }),
  ).toBeInTheDocument();
  expect(
    within(article).getByRole("heading", {
      level: 3,
      name: "What Is a Freight Broker?",
    }),
  ).toBeInTheDocument();
  expect(
    within(article).getAllByRole("img", { name: /article placeholder/i }),
  ).toHaveLength(2);

  const primaryNavigation = screen.getByRole("navigation", {
    name: "Primary navigation",
  });
  expect(
    within(primaryNavigation).getByRole("link", { name: "Blog" }),
  ).toHaveAttribute("href", "/blog");
  expect(screen.getByRole("contentinfo")).toHaveClass("wide:h-[368px]");
});
