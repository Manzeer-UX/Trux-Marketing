import { SearchDropdown } from "@/components/marketing/search-dropdown";

const bookingTypeOptions = [
  { value: "recurring", label: "Recurring booking" },
  { value: "one-time", label: "One time booking" },
] as const;

interface ParkingTypeDropdownProps {
  id: string;
  name: string;
  className?: string;
}

export function ParkingTypeDropdown({
  id,
  name,
  className,
}: ParkingTypeDropdownProps) {
  return (
    <SearchDropdown
      id={id}
      name={name}
      placeholder="Select type"
      listboxLabel="Type options"
      options={bookingTypeOptions}
      className={className}
      optionClassName="py-2.5 first:border-b first:border-white/10"
    />
  );
}
