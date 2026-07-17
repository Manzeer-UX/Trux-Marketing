import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/marketing/hero-section";
import type { MapProps, StaticMapMarker } from "@/components/marketing/Map";

let capturedMapProps: MapProps | undefined;

vi.mock("@/components/marketing/Map", () => ({
  Map: (props: MapProps) => {
    capturedMapProps = props;

    return <div role="region" aria-label={props.ariaLabel} />;
  },
}));

describe("Drivers hero map", () => {
  beforeEach(() => {
    capturedMapProps = undefined;
  });

  it("configures two selectable markers with the static lot tooltip", () => {
    render(<HeroSection />);

    expect(capturedMapProps).toBeDefined();
    expect(capturedMapProps?.showMarker).toBe(false);
    expect(capturedMapProps?.staticMarkers).toHaveLength(2);

    for (const marker of capturedMapProps?.staticMarkers ?? []) {
      expect(marker.iconUrl).toBe("/assets/hero-map-marker-default.svg");
      expect(marker.activeIconUrl).toBe("/assets/hero-map-marker-active.svg");
    }

    const secondMarker = capturedMapProps?.staticMarkers?.[1] as
      StaticMapMarker | undefined;
    const tooltip = capturedMapProps?.renderStaticMarkerPopup?.(
      secondMarker!,
    ) as ReactNode;

    render(<>{tooltip}</>);

    expect(screen.getByText("Lot #47 — Atlanta, GA")).toBeInTheDocument();
    expect(screen.getByText("14 spots available · Gated")).toBeInTheDocument();
    expect(screen.getByText("From $18 / night")).toBeInTheDocument();
  });
});
