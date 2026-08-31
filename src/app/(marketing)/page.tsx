import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";

import { FieldImage } from "@/components/marketing/field-image";
import { ProjectNavigator } from "@/components/marketing/project-navigator";
import { ServicesSlideshow } from "@/components/marketing/services-slideshow";
import { buttonVariants } from "@/components/ui/button";
import {
  credibilityItems,
  homepageMedia,
  homepageServices,
  industries,
  membershipsAndCredentials,
  proofPillars,
  selectedCustomers,
  technicalCapabilities,
} from "@/config/homepage";
import { siteConfig } from "@/config/site";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: siteConfig.legalName,
  alternateName: siteConfig.dba,
  foundingDate: "2026-01",
  url: siteConfig.url,
  email: siteConfig.email,
  areaServed: ["Guam", "Pacific Region"],
  contactPoint: siteConfig.phones.map((phone) => ({
    "@type": "ContactPoint",
    telephone: phone,
    contactType: "project inquiries",
    areaServed: "GU",
    availableLanguage: "English",
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <div>
              <p className="eyebrow">Telecommunications &amp; Infrastructure</p>
              <h1>
                Building the infrastructure that keeps the Pacific connected.
              </h1>
            </div>

            <div className="hero__summary">
              <p>{siteConfig.description}</p>
              <div className="hero__actions">
                <Link className={buttonVariants({ size: "large" })} href="/quote">
                  Request a quote
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
                <Link className={buttonVariants({ variant: "ghost" })} href="#capabilities">
                  Explore our capabilities
                  <ArrowDownRight aria-hidden="true" size={18} />
                </Link>
              </div>
              <p className="hero__credibility">
                FOA Certified <span aria-hidden="true">•</span> ETA Certified
                <span aria-hidden="true">•</span> Guam &amp; Pacific Region
              </p>
            </div>
          </div>

          <div className="hero__visual">
            <FieldImage
              preload
              alt={homepageMedia.hero.alt}
              objectPosition={homepageMedia.hero.objectPosition}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={homepageMedia.hero.src}
            />
            <div className="hero__visual-label">
              <span>Turnkey execution</span>
              <span>Field precision</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-bar" aria-label="Credentials and service area">
        <div className="container trust-bar__grid">
          {credibilityItems.map((item, index) => (
            <div className="trust-bar__item" key={item}>
              <span aria-hidden="true">0{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="customer-strip" aria-labelledby="selected-customers-heading">
        <div className="container customer-strip__grid">
          <div className="customer-strip__heading">
            <p className="eyebrow" id="selected-customers-heading">
              Selected customers
            </p>
            <p>Organizations served by CTS Pacific.</p>
          </div>
          <div className="customer-strip__logos">
            {selectedCustomers.map((customer) => (
              <div className="customer-logo" key={customer.name}>
                <Image
                  alt={`${customer.name} logo`}
                  height={customer.height}
                  sizes="(max-width: 768px) 40vw, 12rem"
                  src={customer.logoSrc}
                  width={customer.width}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section" id="capabilities">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our capabilities</p>
              <h2 id="services-heading">One team. Complete infrastructure capability.</h2>
            </div>
            <p>
              From underground pathways to final network commissioning, CTS Pacific
              brings telecommunications and civil execution into one coordinated scope.
            </p>
          </div>

          <ServicesSlideshow headingId="services-heading" services={homepageServices} />
        </div>
      </section>

      <ProjectNavigator />

      <section className="technical-section">
        <div className="container">
          <div className="technical-section__heading">
            <div>
              <p className="eyebrow eyebrow--inverse">Engineered for the field</p>
              <h2>Precision at every stage of the network.</h2>
            </div>
            <p>
              Installation quality is built through disciplined field execution,
              appropriate test methods, and a clear path from infrastructure to
              commissioning.
            </p>
          </div>

          <div className="technical-index">
            {technicalCapabilities.map((capability, index) => (
              <div key={capability}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{capability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="micro-feature">
        <div className="container micro-feature__grid">
          <div className="micro-feature__visual">
            <FieldImage
              alt={homepageMedia.microTrenching.alt}
              objectPosition={homepageMedia.microTrenching.objectPosition}
              sizes="(max-width: 1024px) 100vw, 58vw"
              src={homepageMedia.microTrenching.src}
            />
            <p>Asphalt / Concrete / Fiber Pathways</p>
          </div>

          <div className="micro-feature__content">
            <p className="eyebrow">Deployment technology</p>
            <h2>Faster deployment. Less disruption.</h2>
            <p>
              CTS Pacific provides narrow trenching designed for fiber deployment
              through asphalt and concrete pathways with minimal disruption and rapid
              restoration.
            </p>
            <div className="micro-feature__details" aria-label="Micro-trenching benefits">
              <span>Narrow trench profile</span>
              <span>Reduced traffic disruption</span>
              <span>Fast pathway restoration</span>
            </div>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/services/micro-trenching"
            >
              Explore micro trenching
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="proof-section">
        <div className="container">
          <div className="proof-section__heading">
            <p className="eyebrow">Why CTS Pacific</p>
            <h2>Built for demanding infrastructure environments.</h2>
          </div>

          <div className="proof-grid">
            {proofPillars.map((pillar) => (
              <article key={pillar.number}>
                <p>{pillar.number}</p>
                <h3>{pillar.title}</h3>
                <span>{pillar.description}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="industries-section">
        <div className="container industries-section__grid">
          <div className="industries-section__intro">
            <p className="eyebrow">Project environments</p>
            <h2>Infrastructure for every critical setting.</h2>
            <p>
              CTS Pacific supports telecommunications, physical security, and civil
              scopes across four primary project types.
            </p>
            <Link className={buttonVariants({ variant: "ghost" })} href="/industries">
              Explore industries
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <div className="industry-list">
            {industries.map((industry) => (
              <article key={industry.number}>
                <p>{industry.number}</p>
                <h3>{industry.title}</h3>
                <span>{industry.description}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="certifications-section">
        <div className="container">
          <div className="certifications-section__heading">
            <div>
              <p className="eyebrow">Memberships &amp; credentials</p>
              <h2>Professional affiliations. Technical credentials.</h2>
            </div>
            <p>
              These marks were supplied by CTS Pacific for publication. Exact
              credential-holder details and validity dates remain part of final client
              verification.
            </p>
          </div>

          <div className="certification-grid">
            {membershipsAndCredentials.map((credential) => (
              <article key={credential.name}>
                <div className="credential-mark">
                  <Image
                    alt={credential.logoAlt}
                    height={credential.logoHeight}
                    sizes="(max-width: 736px) 50vw, (max-width: 1024px) 25vw, 12rem"
                    src={credential.logoSrc}
                    width={credential.logoWidth}
                  />
                </div>
                <div className="credential-content">
                  <p>{credential.category}</p>
                  <h3>{credential.name}</h3>
                  <span>{credential.description}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="credential-standards-note">
            <p>Standards compliance</p>
            <h3>ANSI/TIA/EIA telecommunications standards</h3>
            <span>
              Compliance is identified in supplied CTS Pacific company materials;
              exact publication wording remains subject to final verification.
            </span>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta__grid">
          <div>
            <p className="eyebrow eyebrow--inverse">Start a project conversation</p>
            <h2>Planning your next infrastructure project?</h2>
          </div>
          <div className="final-cta__content">
            <p>
              Tell us what you&apos;re building. CTS Pacific can help determine the right
              telecommunications or infrastructure solution.
            </p>
            <div>
              <Link className={buttonVariants({ variant: "inverse", size: "large" })} href="/quote">
                Request a project quote
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="final-cta__contact" href="/contact">
                Contact CTS Pacific
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
          <ol className="final-cta__review" aria-label="Project review sequence">
            <li>
              <span>01</span>
              <p>Project requirements</p>
            </li>
            <li>
              <span>02</span>
              <p>Technical review</p>
            </li>
            <li>
              <span>03</span>
              <p>Coordinated next step</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
