"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Maximize2, X } from "lucide-react";

import { FieldImage } from "@/components/marketing/field-image";
import type { FieldPhoto } from "@/config/field-photography";
import type { PhotoGroup } from "@/config/service-photography";

const subscribeToHydration = () => () => {};

type PhotoGalleryProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  variant?: "field" | "company" | "documents";
} & (
  | { photos: readonly FieldPhoto[]; groups?: never }
  | { groups: readonly PhotoGroup[]; photos?: never }
);

export function PhotoGallery({ id, eyebrow, title, description, photos, groups, variant = "field" }: PhotoGalleryProps) {
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const photoGroups = groups ?? [{ id: "photos", title: "", description: "", photos }];
  const [activePhoto, setActivePhoto] = useState<FieldPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogTitleId = `${useId().replaceAll(":", "")}-title`;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (activePhoto && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [activePhoto]);

  useEffect(() => {
    if (!activePhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activePhoto]);

  function openViewer(photo: FieldPhoto, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setActivePhoto(photo);
  }

  function closeViewer() {
    const dialog = dialogRef.current;

    if (dialog?.open) dialog.close();
    setActivePhoto(null);
    triggerRef.current?.focus();
  }

  return (
    <>
      <section aria-labelledby={`${id}-heading`} className={`photo-gallery photo-gallery--${variant}`}>
        <div className="container">
          <div className="photo-gallery__heading">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 id={`${id}-heading`}>{title}</h2>
            </div>
            <p>{description}</p>
          </div>
          {photoGroups.map((group) => (
            <div className="photo-gallery__group" key={group.id}>
              {group.title ? (
                <div className="photo-gallery__group-heading">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              ) : null}
              <div className="photo-gallery__grid">
                {group.photos.map((photo, index) => (
                  <figure className="photo-gallery__item" key={photo.src}>
                    <button
                      aria-haspopup="dialog"
                      aria-label={`View full ${variant === "documents" ? "document" : "photo"}: ${photo.caption}`}
                      className="photo-gallery__link"
                      disabled={!hydrated}
                      onClick={(event) => openViewer(photo, event.currentTarget)}
                      type="button"
                    >
                      <FieldImage
                        alt={photo.alt}
                        objectPosition={photo.objectPosition}
                        preserveFrame={photo.preserveFrame}
                        sizes={variant === "field" ? "(max-width: 736px) 92vw, (max-width: 1024px) 44vw, 28vw" : "(max-width: 736px) 92vw, 44vw"}
                        src={photo.src}
                      />
                      <span className="photo-gallery__open"><Maximize2 aria-hidden="true" size={19} /></span>
                    </button>
                    <figcaption>
                      <span className="photo-gallery__number">{String(index + 1).padStart(2, "0")}</span>
                      <span>{photo.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <dialog
        aria-labelledby={dialogTitleId}
        className="photo-viewer"
        onCancel={(event) => {
          event.preventDefault();
          closeViewer();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeViewer();
        }}
        ref={dialogRef}
      >
        {activePhoto ? (
          <div className="photo-viewer__panel">
            <div className="photo-viewer__header">
              <h2 id={dialogTitleId}>{activePhoto.caption}</h2>
              <button aria-label="Close image viewer" className="photo-viewer__close" onClick={closeViewer} type="button">
                <X aria-hidden="true" size={22} />
                <span>Close</span>
              </button>
            </div>
            <FieldImage
              alt={activePhoto.alt}
              className="photo-viewer__image"
              objectPosition={activePhoto.objectPosition}
              sizes="(max-width: 736px) 96vw, 92vw"
              src={activePhoto.src}
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
