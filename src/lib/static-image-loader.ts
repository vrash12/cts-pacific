"use client";

import type { ImageLoaderProps } from "next/image";

import { imageDeliveryUrl } from "@/lib/image-delivery";

// Next can serialize this client reference while keeping the surrounding page server-rendered.
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  return imageDeliveryUrl(src, width);
}
