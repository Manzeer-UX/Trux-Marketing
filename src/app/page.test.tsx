import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "./page";
import { FAQS_QUERY } from "@/sanity/lib/queries";

const sanityFetch = vi.hoisted(() => vi.fn());

vi.mock("@/sanity/lib/live", () => ({ sanityFetch }));

it("renders the TRUX driver page landmark", async () => {
  sanityFetch.mockResolvedValueOnce({
    data: [
      {
        _id: "driver-faq-1",
        question: "Where can drivers park?",
        answer: "Drivers can reserve TRUX spots from the app.",
        order: 1,
        pageType: "drivers",
      },
    ],
  });

  render(await HomePage());

  expect(
    screen.getByRole("main", { name: "TRUX driver parking" }),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/We use essential cookies to operate this site/i),
  ).toBeInTheDocument();
  expect(screen.getByText("Where can drivers park?")).toBeInTheDocument();
  expect(sanityFetch).toHaveBeenCalledWith({
    query: FAQS_QUERY,
    params: { pageType: "drivers" },
  });
});
