import { DollarSign, SquareParking, Star } from "lucide-react";
import type { ParkingLocation } from "@/constants/locations-content";

interface LocationCardProps {
  location: ParkingLocation;
  isHighlighted: boolean;
}

export function LocationCard({ location, isHighlighted }: LocationCardProps) {
  return (
    <article
      id={location.id}
      className={`flex min-h-44 flex-col gap-6 rounded-md border bg-section p-4 transition-colors ${
        isHighlighted ? "border-amber" : "border-white/10"
      }`}
    >
      <div className="flex min-h-12 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base leading-6 font-medium text-white">
            {location.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm leading-5 text-white">
            <Star
              aria-hidden="true"
              className="size-3 fill-current"
              strokeWidth={0}
            />
            {location.rating}
          </span>
        </div>
        <p className="text-sm leading-5 text-muted">{location.address}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm leading-5 text-muted">
        <span className="flex items-center gap-1">
          <SquareParking aria-hidden="true" className="size-4" />
          {location.spots} spots
        </span>
        <span aria-hidden="true" className="h-5 w-px bg-white/10" />
        <span className="flex items-center gap-1">
          <DollarSign aria-hidden="true" className="size-4" />
          From {location.nightlyRate}/night
        </span>
      </div>

      <a
        href="#locations-map"
        className="mt-auto w-fit text-xs leading-4 font-medium text-amber transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        View Location
      </a>
    </article>
  );
}
