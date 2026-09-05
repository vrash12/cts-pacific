import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FieldImage } from "@/components/marketing/field-image";
import { ProjectCta } from "@/components/marketing/project-cta";
import { PhotoGallery } from "@/components/marketing/photo-gallery";
import { fiberWorkGallery } from "@/config/field-photography";
import { buttonVariants } from "@/components/ui/button";
import {
  getRelatedServices,
  type ServiceDefinition,
} from "@/modules/services/service-catalog";

type ServiceDetailProps = {
  service: ServiceDefinition;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const relatedServices = getRelatedServices(service);

  return (
    <>
      <section className="service-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.navigationTitle}</span>
          </nav>

          <div className="service-hero__grid">
            <div className="service-hero__content">
              <p className="eyebrow">{service.eyebrow}</p>
              <p className="service-hero__number">Service {service.number}</p>
              <h1
                className={
                  service.title.length >= 28 ? "service-hero__title--compact" : undefined
                }
              >
                {service.title}
              </h1>
              <p className="service-hero__lede">{service.description}</p>
              <div className="service-hero__actions">
                <Link className={buttonVariants({ size: "large" })} href="/quote">
                  Request a quote
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link className={buttonVariants({ variant: "ghost" })} href="#capabilities">
                  View capabilities
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </div>

            <div className={`service-hero__visual${service.heroImageLayout === "landscape" ? " service-hero__visual--landscape" : ""}`}>
              <FieldImage
                preload
                alt={service.heroImageAlt}
                objectPosition={service.heroObjectPosition}
                sizes="(max-width: 1024px) 100vw, 48vw"
                src={service.heroImage}
              />
              <p>Guam &amp; Pacific Region</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-overview">
        <div className="container service-overview__grid">
          <div>
            <p className="eyebrow">Technical overview</p>
            <h2>Built around the complete infrastructure scope.</h2>
          </div>
          <div className="service-overview__copy">
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {service.scopeNote ? (
              <aside className="service-scope-note" aria-label="Scope confirmation note">
                <strong>Project-specific scope</strong>
                <p>{service.scopeNote}</p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {service.partner ? (
        <section
          className="service-partner"
          aria-labelledby={`service-partner-${service.slug}`}
        >
          <div className="container service-partner__grid">
            <div className="service-partner__identity">
              <p className="eyebrow">{service.partner.eyebrow}</p>
              <div className="service-partner__logo">
                <Image
                  alt={service.partner.logoAlt}
                  height={97}
                  sizes="(max-width: 736px) 78vw, 30rem"
                  src={service.partner.logo}
                  width={600}
                />
              </div>
              <p>{service.partner.name}</p>
            </div>
            <div className="service-partner__content">
              <h2 id={`service-partner-${service.slug}`}>
                {service.partner.title}
              </h2>
              <p>{service.partner.description}</p>
              <aside className="service-partner__scope">
                <strong>Project-specific responsibility</strong>
                <p>{service.partner.scopeNote}</p>
              </aside>
              <a
                href={service.partner.website}
                rel="noreferrer"
                target="_blank"
              >
                Visit VCE Pacific
                <ArrowRight aria-hidden="true" size={17} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      ) : null}

      <section className="service-capabilities" id="capabilities">
        <div className="container">
          <div className="service-capabilities__heading">
            <p className="eyebrow eyebrow--inverse">Core capabilities</p>
            <h2>Technical execution in the field.</h2>
          </div>
          <div className="service-capabilities__grid">
            {service.capabilities.map((capability, index) => (
              <div key={capability}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-applications">
        <div className="container service-applications__grid">
          <div className="service-applications__media">
            <figure className="service-applications__visual">
              <FieldImage
                alt={service.detailImageAlt}
                objectPosition={service.detailObjectPosition}
                sizes="(max-width: 736px) 100vw, (max-width: 1024px) 72vw, 44vw"
                src={service.detailImage}
              />
              <figcaption>Client-supplied imagery</figcaption>
            </figure>
            <figure className="service-reference-media">
              <FieldImage
                alt={service.referenceImageAlt}
                objectPosition={service.referenceObjectPosition}
                sizes="(max-width: 736px) 100vw, (max-width: 1024px) 42vw, 23vw"
                src={service.referenceImage}
              />
            </figure>
          </div>
          <div className="service-applications__content">
            <p className="eyebrow">Applications</p>
            <h2>Configured for the project environment.</h2>
            <p>
              Scope and execution are coordinated around the facility, pathway,
              operating environment, and related telecommunications systems.
            </p>
            <div className="service-applications__list">
              {service.applications.map((application) => (
                <span key={application}>{application}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {service.slug === "fiber-optics" && (
        <PhotoGallery
          description="A closer look at the equipment, fiber management, and pathway connections in CTS Pacific’s supplied field photography. Select a photo to view it in full."
          eyebrow="Field details"
          id="fiber-work"
          photos={fiberWorkGallery}
          title="The detail behind the connection."
        />
      )}

      <section className="service-process">
        <div className="container">
          <div className="service-process__heading">
            <div>
              <p className="eyebrow">Execution process</p>
              <h2>From coordination to commissioning.</h2>
            </div>
            <p>
              Each project is scoped around its technical requirements. This framework
              shows the major execution stages without assuming details that have not
              yet been established.
            </p>
          </div>
          <ol className="service-process__steps">
            {service.process.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="related-services">
        <div className="container">
          <div className="related-services__heading">
            <p className="eyebrow">Related capabilities</p>
            <h2>Build the complete project scope.</h2>
          </div>
          <div className="related-services__grid">
            {relatedServices.map((related) => (
              <article key={related.slug}>
                <FieldImage
                  alt={related.heroImageAlt}
                  objectPosition={related.heroObjectPosition}
                  sizes="(max-width: 736px) 100vw, 50vw"
                  src={related.heroImage}
                />
                <div>
                  <p>{related.number} / Service</p>
                  <h3>{related.navigationTitle}</h3>
                  <Link href={`/services/${related.slug}`}>
                    Explore capability
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectCta
        description="Share the location, project environment, target timeline, and technical scope. CTS Pacific can help identify the appropriate next step."
        title={`Need ${service.navigationTitle.toLowerCase()} capability?`}
      />
    </>
  );
}
