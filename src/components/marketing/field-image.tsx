import Image from "next/image";

import { cn } from "@/lib/utils";

type FieldImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  objectPosition?: string;
  preload?: boolean;
};

export function FieldImage({
  src,
  alt,
  sizes,
  className,
  objectPosition,
  preload = false,
}: FieldImageProps) {
  return (
    <div className={cn("field-image", className)}>
      <Image
        fill
        alt={alt}
        className="field-image__asset"
        preload={preload}
        quality={preload ? 88 : 75}
        sizes={sizes}
        src={src}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
