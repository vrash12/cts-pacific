import { ArrowUpRight } from "lucide-react";

import { FieldImage } from "@/components/marketing/field-image";
import type { FieldPhoto } from "@/config/field-photography";

type PhotoGalleryProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  photos: readonly FieldPhoto[];
  variant?: "field" | "company" | "documents";
};

export function PhotoGallery({ id, eyebrow, title, description, photos, variant = "field" }: PhotoGalleryProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className={`photo-gallery photo-gallery--${variant}`}>
      <div className="container">
        <div className="photo-gallery__heading">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-heading`}>{title}</h2>
          </div>
          <p>{description}</p>
        </div>
        <div className="photo-gallery__grid">
          {photos.map((photo, index) => (
            <figure className="photo-gallery__item" key={photo.src}>
              <a
                aria-label={`View full ${variant === "documents" ? "document" : "photo"}: ${photo.caption} (opens in a new tab)`}
                className="photo-gallery__link"
                href={photo.src}
                rel="noreferrer"
                target="_blank"
              >
                <FieldImage
                  alt={photo.alt}
                  objectPosition={photo.objectPosition}
                  sizes={variant === "field" ? "(max-width: 736px) 92vw, (max-width: 1024px) 44vw, 28vw" : "(max-width: 736px) 92vw, 44vw"}
                  src={photo.src}
                />
                <span className="photo-gallery__open"><ArrowUpRight aria-hidden="true" size={20} /></span>
              </a>
              <figcaption>
                <span className="photo-gallery__number">{String(index + 1).padStart(2, "0")}</span>
                <span>{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
