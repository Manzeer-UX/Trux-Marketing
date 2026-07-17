"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export const ATLANTA_COORDINATES: google.maps.LatLngLiteral = {
  lat: 33.749,
  lng: -84.388,
};

export const TRUX_DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative.province",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#9CA3AF" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#4B5563" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#8B7355" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#1F2937" }],
  },
];

export const lightMapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative.province",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#d6d6d6" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#c8c8c8" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#b8b8b8" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#a5a5a5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#ececec" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f7f7f7" }],
  },
];

interface MapError {
  label: string;
  message: string;
}

interface StaticMarkerPopupPortal {
  container: HTMLDivElement;
  marker: StaticMapMarker;
}

export interface StaticMapMarker {
  activeIconUrl?: string;
  iconUrl?: string;
  id?: string;
  position: google.maps.LatLngLiteral;
  title?: string;
  tooltip?: string;
}

export interface MapProps {
  center?: google.maps.LatLngLiteral;
  markerPosition?: google.maps.LatLngLiteral;
  zoom?: number;
  styles?: google.maps.MapTypeStyle[];
  className?: string;
  ariaLabel?: string;
  onStaticMarkerClick?: (marker: StaticMapMarker) => void;
  renderStaticMarkerPopup?: (marker: StaticMapMarker) => ReactNode;
  showMarker?: boolean;
  staticMarkers?: readonly StaticMapMarker[];
  theme?: "dark" | "light";
}

const configurationError: MapError = {
  label: "Google Maps configuration error",
  message: "Google Maps API key is missing.",
};

const loadingError: MapError = {
  label: "Google Maps loading error",
  message: "Google Maps is unavailable right now. Please try again later.",
};

const markerIcons = {
  default: { url: "/assets/hero-map-marker-default.svg" },
  active: { url: "/assets/hero-map-marker-active.svg" },
} satisfies Record<"default" | "active", google.maps.Icon>;

const noStaticMarkers: readonly StaticMapMarker[] = [];

const staticMarkerTooltip = {
  ariaLabel: "Parking lot details for Lot #47 in Atlanta",
  details: "14 spots available · Gated",
  price: "From $18 / night",
  title: "Lot #47 — Atlanta, GA",
};

let configuredApiKey: string | null = null;

function createStaticMarkerTooltip() {
  const content = document.createElement("div");
  content.setAttribute("aria-live", "polite");
  content.dataset.truxMapTooltip = "true";
  Object.assign(content.style, {
    background: "#ffffff",
    border: "1px solid #f5a623",
    borderRadius: "4px",
    boxSizing: "border-box",
    color: "#171729",
    fontFamily: "Inter, Arial, sans-serif",
    margin: "-8px -12px -10px",
    padding: "14px 16px 13px",
    width: "248px",
  });

  const title = document.createElement("p");
  title.textContent = staticMarkerTooltip.title;
  Object.assign(title.style, {
    fontSize: "16px",
    fontWeight: "700",
    lineHeight: "20px",
    margin: "0",
  });

  const details = document.createElement("p");
  details.textContent = staticMarkerTooltip.details;
  Object.assign(details.style, {
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "18px",
    margin: "3px 0 0",
  });

  const price = document.createElement("p");
  price.textContent = staticMarkerTooltip.price;
  Object.assign(price.style, {
    color: "#f5a623",
    fontSize: "15px",
    fontWeight: "700",
    lineHeight: "20px",
    margin: "12px 0 0",
  });

  content.append(title, details, price);

  return content;
}

function createStaticMarkerTooltipOverlay(
  OverlayView: typeof google.maps.OverlayView,
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
  tooltip: string,
) {
  const tooltipElement = document.createElement("div");
  tooltipElement.dataset.truxStaticMarkerTooltip = "true";
  tooltipElement.setAttribute("role", "note");
  tooltipElement.setAttribute("aria-label", `Nightly rate: ${tooltip}`);
  tooltipElement.textContent = tooltip;
  Object.assign(tooltipElement.style, {
    background: "#1e4ed8",
    borderRadius: "2px",
    boxSizing: "border-box",
    color: "#ffffff",
    fontFamily: "Inter, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "20px",
    padding: "6px 8px",
    pointerEvents: "none",
    position: "absolute",
    transform: "translate(-50%, calc(-100% - 46px))",
    whiteSpace: "nowrap",
    zIndex: "1",
  });

  class StaticMarkerTooltipOverlay extends OverlayView {
    draw() {
      const pixelPosition = this.getProjection().fromLatLngToDivPixel(position);

      if (!pixelPosition) return;

      tooltipElement.style.left = `${pixelPosition.x}px`;
      tooltipElement.style.top = `${pixelPosition.y}px`;
    }

    onAdd() {
      this.getPanes()?.floatPane.appendChild(tooltipElement);
    }

    onRemove() {
      tooltipElement.remove();
    }
  }

  const overlay = new StaticMarkerTooltipOverlay();
  overlay.setMap(map);

  return overlay;
}

function createStaticMarkerPopupOverlay(
  OverlayView: typeof google.maps.OverlayView,
  map: google.maps.Map,
  position: google.maps.LatLngLiteral,
) {
  const container = document.createElement("div");
  container.dataset.truxStaticMarkerPopup = "true";
  Object.assign(container.style, {
    pointerEvents: "auto",
    position: "absolute",
    transform: "translate(-50%, calc(-100% - 56px))",
    maxWidth: "calc(100vw - 24px)",
    width: "332px",
    zIndex: "2",
  });
  OverlayView.preventMapHitsAndGesturesFrom(container);

  class StaticMarkerPopupOverlay extends OverlayView {
    draw() {
      const pixelPosition = this.getProjection().fromLatLngToDivPixel(position);

      if (!pixelPosition) return;

      container.style.left = `${pixelPosition.x}px`;
      container.style.top = `${pixelPosition.y}px`;
    }

    onAdd() {
      this.getPanes()?.floatPane.appendChild(container);
    }

    onRemove() {
      container.remove();
    }
  }

  const overlay = new StaticMarkerPopupOverlay();
  overlay.setMap(map);

  return { container, overlay };
}

function configureLoader(apiKey: string) {
  if (configuredApiKey === null) {
    setOptions({ key: apiKey, v: "weekly" });
    configuredApiKey = apiKey;
    return;
  }

  if (configuredApiKey !== apiKey) {
    throw new Error("Google Maps was already configured with another API key.");
  }
}

export function Map({
  center = ATLANTA_COORDINATES,
  markerPosition,
  zoom = 11,
  styles,
  className,
  ariaLabel = "Available TRUX parking lots around Atlanta",
  onStaticMarkerClick,
  renderStaticMarkerPopup,
  showMarker = true,
  staticMarkers = noStaticMarkers,
  theme = "dark",
}: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<HTMLDivElement>(null);
  const onStaticMarkerClickRef = useRef(onStaticMarkerClick);
  const renderStaticMarkerPopupRef = useRef(renderStaticMarkerPopup);
  const [isLoading, setIsLoading] = useState(Boolean(apiKey));
  const [error, setError] = useState<MapError | null>(
    apiKey ? null : configurationError,
  );
  const [staticMarkerPopupPortal, setStaticMarkerPopupPortal] =
    useState<StaticMarkerPopupPortal | null>(null);
  const resolvedMarkerPosition = markerPosition ?? center;
  const resolvedStyles =
    styles ?? (theme === "light" ? lightMapStyle : TRUX_DARK_MAP_STYLE);

  useEffect(() => {
    onStaticMarkerClickRef.current = onStaticMarkerClick;
    renderStaticMarkerPopupRef.current = renderStaticMarkerPopup;
  }, [onStaticMarkerClick, renderStaticMarkerPopup]);

  useEffect(() => {
    if (!apiKey || !mapRef.current) return;

    const googleMapsApiKey = apiKey;
    let isCancelled = false;
    let infoWindow: google.maps.InfoWindow | null = null;
    let infoWindowDomListener: google.maps.MapsEventListener | null = null;
    let marker: google.maps.Marker | null = null;
    let markerListener: google.maps.MapsEventListener | null = null;
    let staticMarkerInstances: google.maps.Marker[] = [];
    const staticMarkerListeners: google.maps.MapsEventListener[] = [];
    let staticMarkerPopupOverlay: google.maps.OverlayView | null = null;
    let staticMarkerTooltipOverlays: google.maps.OverlayView[] = [];

    async function initializeMap() {
      try {
        configureLoader(googleMapsApiKey);

        const mapsLibrary = await importLibrary("maps");
        const markerLibrary =
          showMarker || staticMarkers.length > 0
            ? await importLibrary("marker")
            : null;

        if (isCancelled || !mapRef.current) return;

        const backgroundColor = theme === "light" ? "#f5f5f5" : "#253044";
        const map = new mapsLibrary.Map(mapRef.current, {
          center,
          zoom,
          styles: resolvedStyles,
          backgroundColor,
          clickableIcons: false,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          keyboardShortcuts: true,
          zoomControl: true,
        });

        if (markerLibrary) {
          let activeStaticMarker: {
            defaultIcon: google.maps.Icon | null;
            marker: google.maps.Marker;
          } | null = null;

          staticMarkerInstances = staticMarkers.map((markerConfiguration) => {
            const { activeIconUrl, iconUrl, position, title } =
              markerConfiguration;
            const defaultIcon = iconUrl ? { url: iconUrl } : null;
            const staticMarker = new markerLibrary.Marker({
              icon: defaultIcon ?? undefined,
              map,
              optimized: false,
              position,
              title,
            });

            if (
              onStaticMarkerClickRef.current ||
              renderStaticMarkerPopupRef.current
            ) {
              staticMarkerListeners.push(
                staticMarker.addListener("click", () => {
                  if (
                    activeStaticMarker &&
                    activeStaticMarker.marker !== staticMarker
                  ) {
                    activeStaticMarker.marker.setIcon(
                      activeStaticMarker.defaultIcon,
                    );
                  }

                  if (activeIconUrl) {
                    staticMarker.setIcon({ url: activeIconUrl });
                  }

                  activeStaticMarker = {
                    defaultIcon,
                    marker: staticMarker,
                  };
                  onStaticMarkerClickRef.current?.(markerConfiguration);

                  if (renderStaticMarkerPopupRef.current) {
                    staticMarkerPopupOverlay?.setMap(null);
                    const popupOverlay = createStaticMarkerPopupOverlay(
                      mapsLibrary.OverlayView,
                      map,
                      position,
                    );
                    staticMarkerPopupOverlay = popupOverlay.overlay;
                    setStaticMarkerPopupPortal({
                      container: popupOverlay.container,
                      marker: markerConfiguration,
                    });
                  }
                }),
              );
            }

            return staticMarker;
          });
          staticMarkerTooltipOverlays = staticMarkers.flatMap(
            ({ position, tooltip }) =>
              tooltip
                ? [
                    createStaticMarkerTooltipOverlay(
                      mapsLibrary.OverlayView,
                      map,
                      position,
                      tooltip,
                    ),
                  ]
                : [],
          );
        }

        if (!showMarker || !markerLibrary) {
          setIsLoading(false);
          return;
        }

        const parkingMarker = new markerLibrary.Marker({
          icon: markerIcons.default,
          map,
          position: resolvedMarkerPosition,
          title: "TRUX parking location in Atlanta",
        });
        marker = parkingMarker;

        const tooltipContent = createStaticMarkerTooltip();
        infoWindow = new mapsLibrary.InfoWindow({
          ariaLabel: staticMarkerTooltip.ariaLabel,
          content: tooltipContent,
          disableAutoPan: true,
          headerDisabled: true,
          maxWidth: 248,
          minWidth: 248,
        });
        infoWindowDomListener = infoWindow.addListener("domready", () => {
          const scrollContainer = tooltipContent.closest(
            ".gm-style-iw-d",
          ) as HTMLElement | null;

          scrollContainer?.style.setProperty("max-height", "none", "important");
          scrollContainer?.style.setProperty("overflow", "hidden", "important");
        });

        let isMarkerActive = false;
        markerListener = parkingMarker.addListener("click", () => {
          isMarkerActive = !isMarkerActive;
          parkingMarker.setIcon(
            isMarkerActive ? markerIcons.active : markerIcons.default,
          );

          if (isMarkerActive) {
            infoWindow?.open({
              anchor: parkingMarker,
              map,
              shouldFocus: false,
            });
          } else {
            infoWindow?.close();
          }
        });

        setIsLoading(false);
      } catch (mapError) {
        console.error("Failed to initialize Google Maps.", mapError);

        if (!isCancelled) {
          setError(loadingError);
          setIsLoading(false);
        }
      }
    }

    void initializeMap();

    return () => {
      isCancelled = true;
      infoWindow?.close();
      infoWindowDomListener?.remove();
      markerListener?.remove();
      marker?.setMap(null);
      staticMarkerInstances.forEach((staticMarker) =>
        staticMarker.setMap(null),
      );
      staticMarkerListeners.forEach((staticMarkerListener) =>
        staticMarkerListener.remove(),
      );
      staticMarkerPopupOverlay?.setMap(null);
      staticMarkerTooltipOverlays.forEach((tooltipOverlay) =>
        tooltipOverlay.setMap(null),
      );
    };
  }, [
    apiKey,
    center,
    resolvedMarkerPosition,
    resolvedStyles,
    showMarker,
    staticMarkers,
    theme,
    zoom,
  ]);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={cn(
        "relative h-full min-h-[320px] w-full overflow-hidden",
        theme === "light" ? "bg-[#f5f5f5]" : "bg-section",
        className,
      )}
    >
      <div ref={mapRef} className="h-full w-full" />

      {staticMarkerPopupPortal && renderStaticMarkerPopup
        ? createPortal(
            renderStaticMarkerPopup(staticMarkerPopupPortal.marker),
            staticMarkerPopupPortal.container,
          )
        : null}

      {isLoading ? (
        <div
          role="status"
          aria-live="polite"
          className={cn(
            "absolute inset-0 flex items-center justify-center text-sm",
            theme === "light"
              ? "bg-[#f5f5f5] text-midnight"
              : "bg-section text-off-white",
          )}
        >
          Loading map…
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          aria-label={error.label}
          className={cn(
            "absolute inset-0 flex items-center justify-center px-6 text-center text-sm",
            theme === "light"
              ? "bg-[#f5f5f5] text-midnight"
              : "bg-section text-off-white",
          )}
        >
          {error.message}
        </div>
      ) : null}
    </div>
  );
}
