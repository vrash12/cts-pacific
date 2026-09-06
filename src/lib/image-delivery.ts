import manifest from "@/config/image-delivery.json";

export type ImageDelivery = {
  base: string;
  original: string;
  width: number;
  height: number;
  widths: number[];
};

const images: Readonly<Record<string, ImageDelivery>> = manifest;

export function getImageDelivery(src: string): ImageDelivery | undefined {
  return images[src];
}

export function imageDeliveryUrl(src: string, width: number): string {
  const image = getImageDelivery(src);
  if (!image) throw new Error(`Image has no prepared delivery sizes: ${src}`);
  const variant = image.widths.find(candidate => candidate >= width);
  return variant ? `${image.base}-${variant}.webp` : image.original;
}
