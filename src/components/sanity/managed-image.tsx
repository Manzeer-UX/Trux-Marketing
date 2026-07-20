import Image, { type ImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";

export interface ManagedImageValue {
  _key?: string;
  image?: {
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        lqip?: string | null;
        dimensions?: {
          width?: number;
          height?: number;
        } | null;
      } | null;
    } | null;
    crop?: unknown;
    hotspot?: unknown;
  } | null;
  alt?: string | null;
  caption?: string | null;
  description?: string | null;
}

interface ManagedImageProps
  extends Omit<
    ImageProps,
    "src" | "alt" | "placeholder" | "blurDataURL"
  > {
  value?: ManagedImageValue | null;
  fallbackSrc: string;
  fallbackAlt: string;
  decorative?: boolean;
}

export function ManagedImage({
  value,
  fallbackSrc,
  fallbackAlt,
  decorative = false,
  width,
  height,
  fill,
  unoptimized,
  ...props
}: ManagedImageProps) {
  const asset = value?.image?.asset;
  const hasAsset = Boolean(asset?._id);
  const imageWidth =
    typeof width === "number"
      ? width
      : asset?.metadata?.dimensions?.width || 1600;
  const imageHeight =
    typeof height === "number"
      ? height
      : asset?.metadata?.dimensions?.height || Math.round(imageWidth / 1.5);

  let src = fallbackSrc;

  if (hasAsset && value?.image) {
    let builder = urlFor(value.image).width(imageWidth).auto("format").fit("max");
    if (!fill && imageHeight) builder = builder.height(imageHeight);
    src = builder.url();
  }

  const blurDataURL = asset?.metadata?.lqip || undefined;
  const dimensions = fill
    ? { fill: true as const }
    : { width: imageWidth, height: imageHeight };

  return (
    <Image
      {...props}
      {...dimensions}
      src={src}
      alt={decorative ? "" : value?.alt?.trim() || fallbackAlt}
      placeholder={hasAsset && blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      unoptimized={unoptimized || Boolean(asset?.url?.endsWith(".svg"))}
    />
  );
}
