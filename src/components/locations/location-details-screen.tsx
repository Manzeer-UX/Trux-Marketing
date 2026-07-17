import {
  Cctv,
  Fence,
  Grid2X2,
  Lightbulb,
  MapPin,
  ScanQrCode,
  type LucideIcon,
} from "lucide-react";
import { LocationDetailsMap } from "@/components/locations/location-details-map";
import { LocationPhotoGallery } from "@/components/locations/location-photo-gallery";
import { LocationReservationForm } from "@/components/locations/location-reservation-form";
import type { MapLocationDetails } from "@/constants/locations-content";

interface LocationDetailsScreenProps {
  location: MapLocationDetails;
}

interface Amenity {
  label: string;
  icon?: LucideIcon;
}

const amenities: readonly Amenity[] = [
  { label: "Electric Gates", icon: Fence },
  { label: "Security Cameras", icon: Cctv },
  { label: "Bathrooms" },
  { label: "Lighting", icon: Lightbulb },
  { label: "Stabilized Yard Surface", icon: Grid2X2 },
];

const operatingHours = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

function AmenityIcon({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon;

  if (Icon) {
    return <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />;
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-[2px] border-2 border-[#0f0f1d] text-[8px] leading-none font-bold"
    >
      WC
    </span>
  );
}

export function LocationDetailsScreen({
  location,
}: LocationDetailsScreenProps) {
  return (
    <main
      aria-label="Atlanta parking location details"
      className="min-h-screen bg-[#fafafa] pb-24 text-[#0f0f1d]"
    >
      <div className="mx-auto w-full max-w-[1120px] px-6 pt-6 sm:px-10 xl:px-0 xl:pt-[43px]">
        <LocationPhotoGallery />

        <div className="grid items-start xl:grid-cols-[646px_400px] xl:gap-[74px]">
          <article className="pt-8 xl:px-4">
            <section className="border-b border-[#e5e5e5] pb-6">
              <h1 className="text-2xl leading-8 font-medium">
                {location.title}
              </h1>
              <p className="mt-2 flex items-center gap-1 text-sm leading-5 text-[#737373]">
                <MapPin
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.8}
                />
                {location.address}
              </p>
            </section>

            <p className="border-b border-[#e5e5e5] py-6 text-sm leading-5 text-[#737373]">
              Managed by <strong>{location.managedBy}</strong>
            </p>

            <section className="border-b border-[#e5e5e5] py-6">
              <h2 className="text-base leading-6 font-medium">Amenities</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[0, 1].map((column) => (
                  <div key={column} className="flex flex-col gap-4">
                    {amenities.map((amenity) => (
                      <div
                        key={`${column}-${amenity.label}`}
                        className="flex min-h-6 items-center gap-4 text-sm leading-5"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center">
                          <AmenityIcon amenity={amenity} />
                        </span>
                        {amenity.label}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-4 min-h-8 rounded-full border border-[#e5e5e5] px-3.5 text-sm leading-5 font-medium transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                Show all 19 amenities
              </button>
            </section>

            <section className="border-b border-[#e5e5e5] py-6">
              <h2 className="text-base leading-6 font-medium">
                Check-in Method
              </h2>
              <p className="mt-4 flex items-center gap-4 text-sm leading-5">
                <ScanQrCode
                  aria-hidden="true"
                  className="size-6"
                  strokeWidth={1.7}
                />
                Mobile QR Code
              </p>
            </section>

            <section className="border-b border-[#e5e5e5] py-6">
              <h2 className="text-base leading-6 font-medium">
                Hours of operation
              </h2>
              <dl className="mt-4 text-sm leading-5">
                {operatingHours.map((day) => (
                  <div key={day} className="grid grid-cols-[148px_1fr]">
                    <dt>{day}</dt>
                    <dd>12:00 AM – 11:59 PM</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border-b border-[#e5e5e5] py-6">
              <h2 className="text-base leading-6 font-medium">
                Where you’ll be
              </h2>
              <div className="mt-4 h-[355px] overflow-hidden bg-[#273344]">
                <LocationDetailsMap
                  coordinates={location.coordinates}
                  title={location.title}
                />
              </div>
            </section>

            <section className="pt-6">
              <h2 className="text-base leading-6 font-medium">
                Cancellation policy
              </h2>
              <p className="mt-4 text-sm leading-5">
                Free cancellations with 24 hours notice. There will be a $20 fee
                for cancellations under 24 hours notice.
              </p>
            </section>
          </article>

          <LocationReservationForm location={location} />
        </div>
      </div>
    </main>
  );
}
