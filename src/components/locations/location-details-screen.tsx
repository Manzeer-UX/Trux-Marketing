import { MapPin, ScanQrCode } from "lucide-react";
import { LocationAmenities } from "@/components/locations/location-amenities";
import { LocationDetailsMap } from "@/components/locations/location-details-map";
import { LocationPhotoGallery } from "@/components/locations/location-photo-gallery";
import { LocationReservationForm } from "@/components/locations/location-reservation-form";
import type { MapLocationDetails } from "@/constants/locations-content";

interface LocationDetailsScreenProps {
  location: MapLocationDetails;
}

const operatingHours = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

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

            <LocationAmenities />

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
