import { ArrowUpRight } from "lucide-react";

import { SiteImage } from "@/components/ui/site-image";
import { buttonVariants } from "@/components/ui/button";

const certificates = [
  {
    title: "Warehousing Safety & Health",
    holder: "Saren F. Formento",
    date: "2026-05-19",
    displayDate: "May 19, 2026",
    src: "/images/credentials/training/saren-formento-warehousing-safety-health-2026.jpg",
  },
  {
    title: "Temporary Traffic Control",
    holder: "Saren Formento",
    date: "2026-08-17",
    displayDate: "August 17, 2026",
    src: "/images/credentials/training/saren-formento-temporary-traffic-control-2026.jpg",
  },
] as const;

export function SafetyTraining() {
  return (
    <section aria-labelledby="safety-training-heading" className="safety-training" id="safety-training">
      <div className="container">
        <div className="photo-gallery__heading">
          <div>
            <p className="eyebrow">Individual training credentials</p>
            <h2 id="safety-training-heading">Safety &amp; professional training.</h2>
          </div>
          <p>
            Training completed by Saren Formento through the University of California,
            San Diego Extension, Occupational Safety and Health Department.
          </p>
        </div>
        <div className="safety-training__grid">
          {certificates.map((certificate) => (
            <article className="training-certificate" key={certificate.src}>
              <div className="training-certificate__preview">
                <SiteImage
                  alt={`${certificate.title} training completion certificate issued to ${certificate.holder} by UC San Diego Extension on ${certificate.displayDate}.`}
                  height={1275}
                  loading="lazy"
                  sizes="(max-width: 736px) 90vw, 44vw"
                  src={certificate.src}
                  width={1650}
                />
              </div>
              <div className="training-certificate__content">
                <p className="eyebrow">Training completed</p>
                <h3>{certificate.title}</h3>
                <dl>
                  <div><dt>Recipient</dt><dd>{certificate.holder}</dd></div>
                  <div><dt>Completed</dt><dd><time dateTime={certificate.date}>{certificate.displayDate}</time></dd></div>
                </dl>
                <a
                  aria-label={`View ${certificate.title} certificate (opens in a new tab)`}
                  className={buttonVariants({ variant: "secondary" })}
                  href={certificate.src}
                  rel="noreferrer"
                  target="_blank"
                >
                  View certificate
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
