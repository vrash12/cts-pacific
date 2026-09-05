"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type UIEvent, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { FieldImage } from "@/components/marketing/field-image";

const SCROLL_SETTLE_DELAY_MS = 120;
const subscribeToHydration = () => () => {};

function getSlideScrollLeft(track: HTMLElement, slide: HTMLElement) {
  return (
    track.scrollLeft +
    slide.getBoundingClientRect().left -
    track.getBoundingClientRect().left
  );
}

export type ServiceSlide = {
  readonly number: string;
  readonly title: string;
  readonly href: string;
  readonly description: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly objectPosition: string;
};

type ServicesSlideshowProps = {
  headingId: string;
  services: readonly ServiceSlide[];
};

export function ServicesSlideshow({ headingId, services }: ServicesSlideshowProps) {
  // Prevent clicks on server-rendered controls before React can handle them.
  const hydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollSettleTimeoutRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const scrollToSlide = useCallback(
    (index: number, announce = true) => {
      if (services.length === 0) return;

      const normalizedIndex = (index + services.length) % services.length;
      const targetService = services[normalizedIndex];
      if (!targetService) return;

      const track = trackRef.current;
      const target = track?.querySelector<HTMLElement>(
        `[data-service-slide="${normalizedIndex}"]`,
      );

      setActiveIndex(normalizedIndex);

      if (track && target && typeof track.scrollTo === "function") {
        track.scrollTo({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          left: getSlideScrollLeft(track, target),
        });
      }

      if (announce) {
        setAnnouncement(
          `Slide ${normalizedIndex + 1} of ${services.length}: ${targetService.title}`,
        );
      }
    },
    [prefersReducedMotion, services],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return;

    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener?.("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener?.("change", updateMotionPreference);
  }, []);

  useEffect(
    () => () => {
      if (scrollSettleTimeoutRef.current !== null) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
    },
    [],
  );

  const handleTrackScroll = (event: UIEvent<HTMLDivElement>) => {
    if (scrollSettleTimeoutRef.current !== null) {
      window.clearTimeout(scrollSettleTimeoutRef.current);
    }

    const track = event.currentTarget;
    scrollSettleTimeoutRef.current = window.setTimeout(() => {
      const slides = Array.from(
        track.querySelectorAll<HTMLElement>("[data-service-slide]"),
      );
      if (slides.length === 0) return;

      const closestSlide = slides.reduce((closest, slide) =>
        Math.abs(getSlideScrollLeft(track, slide) - track.scrollLeft) <
        Math.abs(getSlideScrollLeft(track, closest) - track.scrollLeft)
          ? slide
          : closest,
      );
      const nextIndex = Number(closestSlide.dataset.serviceSlide);

      if (Number.isInteger(nextIndex)) {
        setActiveIndex(nextIndex);
      }
    }, SCROLL_SETTLE_DELAY_MS);
  };

  if (services.length === 0) return null;

  const activeService = services[activeIndex] ?? services[0];
  if (!activeService) return null;

  return (
    <div
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      className="services-slideshow"
      role="region"
    >
      <div className="services-slideshow__controls">
        <p className="services-slideshow__status" aria-hidden="true">
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </span>
          <strong>{activeService.title}</strong>
        </p>

        <div className="services-slideshow__actions">
          <button
            aria-label="Show previous service"
            className="services-slideshow__control"
            disabled={!hydrated}
            type="button"
            onClick={() => scrollToSlide(activeIndex - 1)}
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <button
            aria-label="Show next service"
            className="services-slideshow__control"
            disabled={!hydrated}
            type="button"
            onClick={() => scrollToSlide(activeIndex + 1)}
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>

      <div className="services-slideshow__viewport">
        <div
          aria-live="off"
          className="services-slideshow__track"
          ref={trackRef}
          onScroll={handleTrackScroll}
        >
          {services.map((service, index) => (
            <article
              aria-label={`${index + 1} of ${services.length}: ${service.title}`}
              aria-roledescription="slide"
              className="services-slideshow__slide"
              data-service-slide={index}
              key={service.href}
              role="group"
            >
              <FieldImage
                alt={service.imageAlt}
                objectPosition={service.objectPosition}
                sizes="(max-width: 736px) 100vw, (max-width: 1280px) 48vw, 38rem"
                src={service.imageSrc}
              />
              <div className="service-card__body">
                <p className="service-card__number">{service.number}</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href}>
                  Explore {service.title}
                  <ChevronRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        aria-label="Choose a service slide"
        className="services-slideshow__pagination"
        role="group"
      >
        {services.map((service, index) => (
          <button
            aria-current={index === activeIndex ? "true" : undefined}
            className="services-slideshow__pagination-button"
            data-active={index === activeIndex ? "true" : "false"}
            disabled={!hydrated}
            key={service.href}
            type="button"
            onClick={() => scrollToSlide(index)}
          >
            <span aria-hidden="true">{service.number}</span>
            <span className="visually-hidden">
              Show {service.title}, slide {index + 1} of {services.length}
            </span>
          </button>
        ))}
      </div>

      <p aria-atomic="true" aria-live="polite" className="visually-hidden">
        {announcement}
      </p>
    </div>
  );
}
