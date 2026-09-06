import Image, { type ImageProps } from "next/image";

import { getImageDelivery } from "@/lib/image-delivery";
import staticImageLoader from "@/lib/static-image-loader";

/** Serve prepared local files; future remote uploads retain Next's normal optimizer. */
export function SiteImage({ src, alt, loader, unoptimized = false, ...props }: ImageProps) {
  const image = typeof src === "string" ? getImageDelivery(src) : undefined;

  return (
    <Image
      {...props}
      alt={alt}
      loader={loader ?? (image && !unoptimized ? staticImageLoader : undefined)}
      src={image && unoptimized ? image.original : src}
      unoptimized={unoptimized}
    />
  );
}
