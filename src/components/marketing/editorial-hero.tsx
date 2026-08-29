import type { ReactNode } from "react";
import Link from "next/link";

import { FieldImage } from "@/components/marketing/field-image";

type EditorialHeroProps = {
  currentPage: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageLabel: string;
  objectPosition?: string;
  children?: ReactNode;
};

export function EditorialHero({
  currentPage,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imageLabel,
  objectPosition,
  children,
}: EditorialHeroProps) {
  return (
    <section className="service-hero editorial-hero">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{currentPage}</span>
        </nav>

        <div className="service-hero__grid">
          <div className="service-hero__content">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="service-hero__lede">{description}</p>
            {children ? <div className="service-hero__actions">{children}</div> : null}
          </div>

          <div className="service-hero__visual">
            <FieldImage
              preload
              alt={imageAlt}
              objectPosition={objectPosition}
              sizes="(max-width: 1024px) 100vw, 48vw"
              src={imageSrc}
            />
            <p>{imageLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
