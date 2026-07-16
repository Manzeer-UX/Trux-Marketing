import Image from "next/image";
import { cn } from "@/lib/cn";

interface BlogPlaceholderImageProps {
  className?: string;
  label: string;
}

export function BlogPlaceholderImage({
  className,
  label,
}: BlogPlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden rounded-[14px] bg-[#e8e8e8]",
        className,
      )}
    >
      <Image
        src="/assets/blog-placeholder-surface.png"
        alt=""
        fill
        sizes="(min-width: 1440px) 720px, 100vw"
        className="object-cover"
      />
      <Image
        src="/assets/blog-placeholder-icon.png"
        alt=""
        fill
        sizes="(min-width: 1440px) 720px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
