import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FieldImage } from "@/components/marketing/field-image";
import { NetworkMotif } from "@/components/marketing/network-motif";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { services } from "@/modules/services/service-catalog";

export const metadata: Metadata = {
  title: "Telecommunications & Infrastructure Services",
  description:
    "Explore CTS Pacific fiber optics, structured cabling, CCTV, access control, micro trenching, and civil underground capabilities in Guam and the Pacific.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Telecommunications & Infrastructure Services | CTS Pacific",
    description:
      "Turnkey telecommunications, security, and underground infrastructure capabilities across Guam and the Pacific.",
    url: "/services",
  },
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CTS Pacific Services",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: new URL(`/services/${service.slug}`, siteConfig.url).toString(),
    name: service.navigationTitle,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="services-index-hero">
        <div className="container services-index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </nav>
            <p className="eyebrow">Complete infrastructure capability</p>
            <h1>One team from pathway to commissioning.</h1>
          </div>
          <div className="services-index-hero__summary">
            <p>
              CTS Pacific connects telecommunications, network infrastructure,
              security systems, and underground civil execution within one coordinated
              delivery scope.
            </p>
            <Link className={buttonVariants({ size: "large" })} href="/quote">
              Request a quote
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="services-index-list">
        <div className="container">
          <div className="services-index-list__heading">
            <p className="eyebrow">Six core disciplines</p>
            <p>
              Each service page outlines the technical capabilities, applications,
              execution stages, and related infrastructure scope.
            </p>
          </div>
          <div className="services-index-grid">
            {services.map((service) => (
              <article key={service.slug}>
                <FieldImage
                  alt={service.referenceImageAlt}
                  objectPosition={service.referenceObjectPosition}
                  sizes="(max-width: 736px) 100vw, (max-width: 1024px) 50vw, 34vw"
                  src={service.referenceImage}
                />
                <p className="services-index-card__media-label">Technical reference</p>
                <div className="services-index-card__body">
                  <p>{service.number} / Service</p>
                  <h2>{service.navigationTitle}</h2>
                  <span>{service.description}</span>
                  <Link href={`/services/${service.slug}`}>
                    Explore service
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-index-scope">
        <div className="container services-index-scope__grid">
          <div>
            <p className="eyebrow eyebrow--inverse">Turnkey execution</p>
            <h2>A connected path through the complete project.</h2>
          </div>
          <ol>
            {["Civil pathway", "Cable deployment", "Installation", "Testing", "Commissioning"].map(
              (stage, index) => (
                <li key={stage}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{stage}</p>
                </li>
              ),
            )}
          </ol>
          <NetworkMotif inverse />
        </div>
      </section>

      <section className="services-index-cta">
        <div className="container services-index-cta__grid">
          <div>
            <p className="eyebrow">Start with the project need</p>
            <h2>Not sure which service fits?</h2>
          </div>
          <div>
            <p>
              Describe the project environment and intended outcome. CTS Pacific can
              help organize the request across one or multiple service areas.
            </p>
            <Link className={buttonVariants({ size: "large" })} href="/quote">
              Start a project request
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
