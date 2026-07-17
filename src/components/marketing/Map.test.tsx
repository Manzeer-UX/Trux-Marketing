import { act, render, screen, waitFor } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  lightMapStyle,
  Map,
  TRUX_DARK_MAP_STYLE,
} from "@/components/marketing/Map";

const loaderMocks = vi.hoisted(() => ({
  importLibrary: vi.fn(),
  setOptions: vi.fn(),
}));

vi.mock("@googlemaps/js-api-loader", () => loaderMocks);

describe("Map", () => {
  const mapInstance = {};
  const infoWindowInstance = {
    addListener: vi.fn(),
    close: vi.fn(),
    open: vi.fn(),
  };
  const infoWindowDomListener = { remove: vi.fn() };
  let infoWindowDomReadyHandler: (() => void) | undefined;
  const markerListener = { remove: vi.fn() };
  let markerClickHandler: (() => void) | undefined;
  const markerInstance = {
    addListener: vi.fn(),
    setIcon: vi.fn(),
    setMap: vi.fn(),
  };
  const MapConstructor = vi.fn(function MockMap() {
    return mapInstance;
  });
  const InfoWindowConstructor = vi.fn(function MockInfoWindow(
    options?: google.maps.InfoWindowOptions,
  ) {
    void options;
    return infoWindowInstance;
  });
  const MarkerConstructor = vi.fn(function MockMarker() {
    return markerInstance;
  });
  const overlayViewSetMap = vi.fn(function MockSetMap(
    this: {
      draw?: () => void;
      onAdd?: () => void;
      onRemove?: () => void;
    },
    map: object | null,
  ) {
    if (map) {
      this.onAdd?.();
      this.draw?.();
      return;
    }

    this.onRemove?.();
  });
  const OverlayViewConstructor = vi.fn(function MockOverlayView() {});

  Object.assign(OverlayViewConstructor.prototype, {
    getPanes: () => ({ floatPane: document.body }),
    getProjection: () => ({
      fromLatLngToDivPixel: () => ({ x: 120, y: 180 }),
    }),
    setMap: overlayViewSetMap,
  });
  Object.assign(OverlayViewConstructor, {
    preventMapHitsAndGesturesFrom: vi.fn(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
    MarkerConstructor.mockReset();
    MarkerConstructor.mockImplementation(function MockMarker() {
      return markerInstance;
    });
    infoWindowDomReadyHandler = undefined;
    infoWindowInstance.addListener.mockImplementation(
      (eventName: string, handler: () => void) => {
        if (eventName === "domready") {
          infoWindowDomReadyHandler = handler;
        }

        return infoWindowDomListener;
      },
    );
    markerClickHandler = undefined;
    markerInstance.addListener.mockImplementation(
      (eventName: string, handler: () => void) => {
        if (eventName === "click") {
          markerClickHandler = handler;
        }

        return markerListener;
      },
    );
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "test-api-key";
    loaderMocks.importLibrary.mockImplementation(async (library: string) => {
      if (library === "maps") {
        return {
          InfoWindow: InfoWindowConstructor,
          Map: MapConstructor,
          OverlayView: OverlayViewConstructor,
        };
      }

      if (library === "marker") {
        return { Marker: MarkerConstructor };
      }

      throw new Error(`Unexpected library: ${library}`);
    });
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  });

  it("renders every shape in the default marker as white", () => {
    const markerSvg = readFileSync(
      resolve(process.cwd(), "public/assets/hero-map-marker-default.svg"),
      "utf8",
    );

    expect(markerSvg).not.toContain("#171729");
    expect(markerSvg.match(/fill="white"/g)).toHaveLength(7);
  });

  it("loads Google Maps and renders one Atlanta marker", async () => {
    render(<Map />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading map");
    expect(
      screen.getByRole("region", {
        name: "Available TRUX parking lots around Atlanta",
      }),
    ).toBeInTheDocument();

    await waitFor(() => expect(MapConstructor).toHaveBeenCalledTimes(1));

    expect(loaderMocks.setOptions).toHaveBeenCalledWith({
      key: "test-api-key",
      v: "weekly",
    });
    expect(loaderMocks.importLibrary).toHaveBeenCalledWith("maps");
    expect(loaderMocks.importLibrary).toHaveBeenCalledWith("marker");
    expect(MapConstructor).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({
        center: { lat: 33.749, lng: -84.388 },
        zoom: 11,
        styles: TRUX_DARK_MAP_STYLE,
      }),
    );
    expect(MarkerConstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        map: mapInstance,
        position: { lat: 33.749, lng: -84.388 },
        title: "TRUX parking location in Atlanta",
      }),
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("uses the Figma default marker and toggles the active marker on click", async () => {
    render(<Map />);

    await waitFor(() => expect(MarkerConstructor).toHaveBeenCalledTimes(1));

    expect(MarkerConstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: expect.objectContaining({
          url: "/assets/hero-map-marker-default.svg",
        }),
      }),
    );
    expect(markerInstance.addListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );

    markerClickHandler?.();
    expect(markerInstance.setIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: "/assets/hero-map-marker-active.svg",
      }),
    );

    markerClickHandler?.();
    expect(markerInstance.setIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: "/assets/hero-map-marker-default.svg",
      }),
    );
  });

  it("opens the static Figma lot tooltip while the marker is active", async () => {
    render(<Map />);

    await waitFor(() => expect(MarkerConstructor).toHaveBeenCalledTimes(1));

    expect(InfoWindowConstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        ariaLabel: "Parking lot details for Lot #47 in Atlanta",
        disableAutoPan: true,
        headerDisabled: true,
      }),
    );

    const infoWindowOptions = InfoWindowConstructor.mock.calls[0]?.[0];
    const tooltipContent = infoWindowOptions?.content;

    expect(tooltipContent).toBeInstanceOf(HTMLElement);
    expect(tooltipContent).toHaveTextContent("Lot #47 — Atlanta, GA");
    expect(tooltipContent).toHaveTextContent("14 spots available · Gated");
    expect(tooltipContent).toHaveTextContent("From $18 / night");
    expect((tooltipContent as HTMLElement).style.width).toBe(
      `${infoWindowOptions?.minWidth}px`,
    );
    expect(infoWindowInstance.addListener).toHaveBeenCalledWith(
      "domready",
      expect.any(Function),
    );

    const scrollContainer = document.createElement("div");
    scrollContainer.className = "gm-style-iw-d";
    scrollContainer.append(tooltipContent as HTMLElement);
    document.body.append(scrollContainer);

    infoWindowDomReadyHandler?.();

    expect(scrollContainer.style.getPropertyValue("max-height")).toBe("none");
    expect(scrollContainer.style.getPropertyValue("overflow")).toBe("hidden");
    expect(scrollContainer.style.getPropertyPriority("overflow")).toBe(
      "important",
    );
    scrollContainer.remove();

    markerClickHandler?.();

    expect(markerInstance.setIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: "/assets/hero-map-marker-active.svg",
      }),
    );
    expect(infoWindowInstance.open).toHaveBeenCalledWith({
      anchor: markerInstance,
      map: mapInstance,
      shouldFocus: false,
    });

    markerClickHandler?.();

    expect(infoWindowInstance.close).toHaveBeenCalled();
    expect(markerInstance.setIcon).toHaveBeenLastCalledWith(
      expect.objectContaining({
        url: "/assets/hero-map-marker-default.svg",
      }),
    );
  });

  it("supports reusable center, marker, zoom, style, and label props", async () => {
    const center = { lat: 34.0522, lng: -118.2437 };
    const markerPosition = { lat: 34.04, lng: -118.25 };
    const styles: google.maps.MapTypeStyle[] = [
      { elementType: "geometry", stylers: [{ color: "#111827" }] },
    ];

    render(
      <Map
        center={center}
        markerPosition={markerPosition}
        zoom={9}
        styles={styles}
        ariaLabel="Test parking map"
      />,
    );

    await waitFor(() => expect(MapConstructor).toHaveBeenCalledTimes(1));

    expect(
      screen.getByRole("region", { name: "Test parking map" }),
    ).toBeInTheDocument();
    expect(MapConstructor).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({ center, zoom: 9, styles }),
    );
    expect(MarkerConstructor).toHaveBeenCalledWith(
      expect.objectContaining({ position: markerPosition }),
    );
  });

  it("supports a light marker-free map for the Lot Owner hero", async () => {
    render(
      <Map
        ariaLabel="Map showing TRUX parking lot earnings"
        showMarker={false}
        theme="light"
      />,
    );

    await waitFor(() => expect(MapConstructor).toHaveBeenCalledTimes(1));

    expect(
      screen.getByRole("region", {
        name: "Map showing TRUX parking lot earnings",
      }),
    ).toHaveClass("bg-[#f5f5f5]");
    expect(MapConstructor).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({
        backgroundColor: "#f5f5f5",
        styles: lightMapStyle,
      }),
    );
    expect(loaderMocks.importLibrary).not.toHaveBeenCalledWith("marker");
    expect(MarkerConstructor).not.toHaveBeenCalled();
    expect(InfoWindowConstructor).not.toHaveBeenCalled();
  });

  it("activates a selected static marker and reports its configuration", async () => {
    function createSelectableMarker() {
      let clickHandler: (() => void) | undefined;
      const listener = { remove: vi.fn() };
      const instance = {
        addListener: vi.fn((eventName: string, handler: () => void) => {
          if (eventName === "click") clickHandler = handler;
          return listener;
        }),
        setIcon: vi.fn(),
        setMap: vi.fn(),
      };

      return {
        click: () => clickHandler?.(),
        instance,
        listener,
      };
    }

    const firstMarker = createSelectableMarker();
    const secondMarker = createSelectableMarker();
    MarkerConstructor.mockImplementationOnce(function FirstMarker() {
      return firstMarker.instance;
    });
    MarkerConstructor.mockImplementationOnce(function SecondMarker() {
      return secondMarker.instance;
    });

    const staticMarkers = [
      {
        activeIconUrl: "/assets/hero-map-marker-active.svg",
        iconUrl: "/assets/hero-map-marker-default.svg",
        id: "georgia-atlanta",
        position: { lat: 33.749, lng: -84.388 },
        title: "Georgia Parking Lot #1, 14 spots",
      },
      {
        activeIconUrl: "/assets/hero-map-marker-active.svg",
        iconUrl: "/assets/hero-map-marker-default.svg",
        id: "west-atlanta",
        position: { lat: 33.78, lng: -84.445 },
        title: "West Atlanta Parking Lot, 8 spots",
      },
    ];
    const onStaticMarkerClick = vi.fn();

    const { unmount } = render(
      <Map
        onStaticMarkerClick={onStaticMarkerClick}
        showMarker={false}
        staticMarkers={staticMarkers}
        theme="dark"
      />,
    );

    await waitFor(() => expect(MarkerConstructor).toHaveBeenCalledTimes(2));

    expect(firstMarker.instance.addListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );
    expect(secondMarker.instance.addListener).toHaveBeenCalledWith(
      "click",
      expect.any(Function),
    );

    act(() => firstMarker.click());

    expect(firstMarker.instance.setIcon).toHaveBeenLastCalledWith({
      url: "/assets/hero-map-marker-active.svg",
    });
    expect(onStaticMarkerClick).toHaveBeenLastCalledWith(staticMarkers[0]);

    act(() => secondMarker.click());

    expect(firstMarker.instance.setIcon).toHaveBeenLastCalledWith({
      url: "/assets/hero-map-marker-default.svg",
    });
    expect(secondMarker.instance.setIcon).toHaveBeenLastCalledWith({
      url: "/assets/hero-map-marker-active.svg",
    });
    expect(onStaticMarkerClick).toHaveBeenLastCalledWith(staticMarkers[1]);

    unmount();

    expect(firstMarker.listener.remove).toHaveBeenCalled();
    expect(secondMarker.listener.remove).toHaveBeenCalled();
  });

  it("anchors a rendered popup above the selected static marker", async () => {
    let clickHandler: (() => void) | undefined;
    const popupMarkerListener = { remove: vi.fn() };
    const popupMarkerInstance = {
      addListener: vi.fn((eventName: string, handler: () => void) => {
        if (eventName === "click") clickHandler = handler;
        return popupMarkerListener;
      }),
      setIcon: vi.fn(),
      setMap: vi.fn(),
    };
    MarkerConstructor.mockImplementationOnce(function PopupMarker() {
      return popupMarkerInstance;
    });
    const staticMarker = {
      activeIconUrl: "/assets/hero-map-marker-active.svg",
      iconUrl: "/assets/hero-map-marker-default.svg",
      id: "south-atlanta",
      position: { lat: 33.7, lng: -84.365 },
      title: "South Atlanta Parking Lot, 10 spots",
    };

    const { unmount } = render(
      <Map
        renderStaticMarkerPopup={(marker) => (
          <article role="region" aria-label="Selected parking location">
            {marker.title}
          </article>
        )}
        showMarker={false}
        staticMarkers={[staticMarker]}
        theme="dark"
      />,
    );

    await waitFor(() => expect(MarkerConstructor).toHaveBeenCalledTimes(1));

    act(() => clickHandler?.());

    const popup = await screen.findByRole("region", {
      name: "Selected parking location",
    });
    const popupOverlay = document.querySelector(
      '[data-trux-static-marker-popup="true"]',
    );
    expect(popup).toHaveTextContent("South Atlanta Parking Lot, 10 spots");
    expect(popupOverlay).toContainElement(popup);
    expect(popupOverlay).toHaveStyle({
      maxWidth: "calc(100vw - 24px)",
      position: "absolute",
      transform: "translate(-50%, calc(-100% - 56px))",
      width: "332px",
    });

    unmount();

    expect(popupMarkerListener.remove).toHaveBeenCalled();
    expect(
      screen.queryByRole("region", {
        name: "Selected parking location",
      }),
    ).not.toBeInTheDocument();
  });

  it("renders exactly two non-interactive static location markers", async () => {
    const staticMarkers = [
      {
        iconUrl: "/assets/lot-owners-map-pin.svg",
        position: { lat: 33.78, lng: -84.42 },
        title: "TRUX lot location one",
      },
      {
        iconUrl: "/assets/lot-owners-map-pin.svg",
        position: { lat: 33.72, lng: -84.34 },
        title: "TRUX lot location two",
      },
    ];

    render(
      <Map
        showMarker={false}
        staticMarkers={staticMarkers}
        styles={lightMapStyle}
        theme="light"
      />,
    );

    await waitFor(() => expect(MapConstructor).toHaveBeenCalledTimes(1));

    expect(loaderMocks.importLibrary).toHaveBeenCalledWith("marker");
    expect(MarkerConstructor).toHaveBeenCalledTimes(2);
    expect(MarkerConstructor).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        icon: { url: "/assets/lot-owners-map-pin.svg" },
        position: { lat: 33.78, lng: -84.42 },
        title: "TRUX lot location one",
      }),
    );
    expect(MarkerConstructor).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        icon: { url: "/assets/lot-owners-map-pin.svg" },
        position: { lat: 33.72, lng: -84.34 },
        title: "TRUX lot location two",
      }),
    );
    expect(InfoWindowConstructor).not.toHaveBeenCalled();
    expect(markerInstance.addListener).not.toHaveBeenCalled();
  });

  it("renders an anchored static tooltip for every configured marker", async () => {
    const staticMarkers = [
      {
        iconUrl: "/assets/lot-owners-map-pin.svg",
        position: { lat: 33.78, lng: -84.42 },
        title: "TRUX lot location one",
        tooltip: "$25 / Night",
      },
      {
        iconUrl: "/assets/lot-owners-map-pin.svg",
        position: { lat: 33.72, lng: -84.34 },
        title: "TRUX lot location two",
        tooltip: "$22 / Night",
      },
    ];

    const { unmount } = render(
      <Map
        showMarker={false}
        staticMarkers={staticMarkers}
        styles={lightMapStyle}
        theme="light"
      />,
    );

    await waitFor(() => expect(MapConstructor).toHaveBeenCalledTimes(1));

    expect(OverlayViewConstructor).toHaveBeenCalledTimes(2);
    const tooltips = screen.getAllByRole("note");
    expect(tooltips).toHaveLength(2);
    expect(tooltips[0]).toHaveTextContent("$25 / Night");
    expect(tooltips[1]).toHaveTextContent("$22 / Night");
    expect(tooltips[0]).toHaveAttribute(
      "data-trux-static-marker-tooltip",
      "true",
    );
    expect(tooltips[0]).toHaveStyle({
      background: "#1e4ed8",
      color: "#ffffff",
      position: "absolute",
    });

    unmount();

    expect(overlayViewSetMap).toHaveBeenCalledWith(null);
    expect(screen.queryAllByRole("note")).toHaveLength(0);
  });

  it("shows an accessible error when the API key is missing", async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    render(<Map />);

    expect(
      await screen.findByRole("alert", {
        name: "Google Maps configuration error",
      }),
    ).toHaveTextContent("Google Maps API key is missing");
    expect(loaderMocks.importLibrary).not.toHaveBeenCalled();
  });

  it("shows an accessible error when the Maps API fails to load", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
    loaderMocks.importLibrary.mockRejectedValueOnce(
      new Error("Maps API unavailable"),
    );

    render(<Map />);

    expect(
      await screen.findByRole("alert", { name: "Google Maps loading error" }),
    ).toHaveTextContent("Google Maps is unavailable right now");
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it("removes the marker when the component unmounts", async () => {
    const { unmount } = render(<Map />);

    await waitFor(() => expect(MarkerConstructor).toHaveBeenCalledTimes(1));
    unmount();

    expect(infoWindowInstance.close).toHaveBeenCalled();
    expect(infoWindowDomListener.remove).toHaveBeenCalled();
    expect(markerListener.remove).toHaveBeenCalled();
    expect(markerInstance.setMap).toHaveBeenCalledWith(null);
  });
});
