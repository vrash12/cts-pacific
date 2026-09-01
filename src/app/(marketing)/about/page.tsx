import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { FieldImage } from "@/components/marketing/field-image";
import { ProjectCta } from "@/components/marketing/project-cta";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Our Guam Telecommunications Company",
  description:
    "Learn how Corerin Technical Solutions, LLC dba CTS Pacific coordinates telecommunications, security, and underground infrastructure work across Guam and the Pacific.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CTS Pacific | Guam Telecommunications Company",
    description:
      "Turnkey telecommunications and infrastructure capability for Guam and the Pacific Region.",
    url: "/about",
  },
};

const executionScope = [
  "Underground pathways and conduit",
  "Cable pulling and installation",
  "Splicing, termination, and integration",
  "Testing, certification, and commissioning",
] as const;

const deliveryStages = [
  {
    title: "Scope coordination",
    description:
      "Define the project environment, required systems, pathway needs, and execution boundaries.",
  },
  {
    title: "Field preparation",
    description:
      "Coordinate access, infrastructure routes, equipment, and site-readiness requirements.",
  },
  {
    title: "System execution",
    description:
      "Install the planned civil, cabling, connectivity, surveillance, or access-control scope.",
  },
  {
    title: "Verification",
    description:
      "Complete applicable testing, certification, system checks, and network commissioning.",
  },
] as const;

const organizationRoles = [
  {
    role: "Technician",
    name: "Profile pending",
    status: "Name and profile to be supplied",
  },
  {
    role: "Fiber Technician",
    name: "Profile pending",
    status: "Name and profile to be supplied",
  },
  {
    role: "Construction Technician",
    name: "Profile pending",
    status: "Name and profile to be supplied",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd name="About" path="/about" />

      <EditorialHero
        currentPage="About"
        description="Corerin Technical Solutions, LLC—doing business as CTS Pacific—provides coordinated telecommunications, network infrastructure, physical security, and underground civil capability across Guam and the Pacific Region."
        eyebrow="Corerin Technical Solutions, LLC"
        imageAlt="CTS Pacific service vehicles and field equipment staged at an infrastructure work area."
        imageLabel="Field execution / Guam"
        imageSrc="/images/services 12.jpeg"
        objectPosition="52% 50%"
        title="Infrastructure built as one connected system."
      >
        <Link className={buttonVariants({ size: "large" })} href="/quote">
          Request a quote
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/services">
          Explore capabilities
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </EditorialHero>

      <section className="service-overview">
        <div className="container service-overview__grid">
          <div>
            <p className="eyebrow">Company overview</p>
            <h2>Turnkey capability from the ground up.</h2>
          </div>
          <div className="service-overview__copy">
            <p>
              CTS Pacific brings together underground infrastructure, fiber optics,
              structured cabling, surveillance, and access control within one coordinated
              project scope.
            </p>
            <p>
              That end-to-end model connects physical pathways with the systems they
              support—from trenching and conduit through installation, splicing, testing,
              certification, and commissioning.
            </p>
          </div>
        </div>
      </section>

      <section className="organization-section" aria-labelledby="organization-heading">
        <div className="container">
          <div className="organization-section__heading">
            <div>
              <p className="eyebrow">Organization</p>
              <h2 id="organization-heading">Leadership connected to field execution.</h2>
            </div>
            <p>
              CTS Pacific&apos;s organization is structured around leadership,
              telecommunications installation, fiber capability, and construction field
              execution.
            </p>
          </div>

          <div className="organization-history">
            <div className="organization-history__date">
              <span>January</span>
              <strong>2026</strong>
            </div>
            <div>
              <p className="eyebrow">Company history</p>
              <h3>CTS Pacific begins operations.</h3>
              <p>
                Corerin Technical Solutions, LLC began operating as CTS Pacific in
                January 2026, with a focus on coordinated telecommunications, network
                infrastructure, physical security, and underground civil capability for
                Guam and the Pacific Region.
              </p>
              <p>
                Its service model brings together infrastructure pathways, fiber optics,
                structured cabling, CCTV, access control, testing, and commissioning so
                each discipline can be planned as part of one connected project scope.
              </p>
            </div>
          </div>

          <div className="organization-chart" aria-label="CTS Pacific organization">
            <article className="organization-card organization-card--president">
              <p>Organization President</p>
              <h3>Saren F. Formento</h3>
              <span>Executive leadership</span>
            </article>
            <div className="organization-chart__roles">
              {organizationRoles.map((member, index) => (
                <article className="organization-card" key={member.role}>
                  <span className="organization-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{member.role}</p>
                  <h3>{member.name}</h3>
                  <span>{member.status}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-capabilities">
        <div className="container">
          <div className="service-capabilities__heading">
            <p className="eyebrow eyebrow--inverse">Connected execution</p>
            <h2>One coordinated infrastructure scope.</h2>
          </div>
          <div className="service-capabilities__grid">
            {executionScope.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-process">
        <div className="container">
          <div className="service-process__heading">
            <div>
              <p className="eyebrow">How the work connects</p>
              <h2>A disciplined path to commissioning.</h2>
            </div>
            <p>
              The exact sequence is configured around each project. This framework
              describes the major delivery stages without assuming requirements that have
              not yet been established.
            </p>
          </div>
          <ol className="service-process__steps">
            {deliveryStages.map((stage, index) => (
              <li key={stage.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-applications about-field-section">
        <div className="container service-applications__grid">
          <figure className="about-region-visual">
            <FieldImage
              alt="Technician working from an elevated bucket near telecommunications cabling."
              objectPosition="48% 42%"
              sizes="(max-width: 1024px) 100vw, 52vw"
              src="/images/services 20.jpeg"
            />
            <figcaption>
              <span>Client-supplied field photography</span>
              Elevated infrastructure work
            </figcaption>
          </figure>
          <div className="service-applications__content">
            <p className="eyebrow">Regional focus</p>
            <h2>Built around Guam and Pacific project environments.</h2>
            <p>
              CTS Pacific serves commercial, government, industrial, and residential
              project types across Guam and the Pacific Region. Exact location and scope
              requirements are confirmed during project planning.
            </p>
            <Link className={buttonVariants({ variant: "secondary" })} href="/industries">
              Explore project environments
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <ProjectCta
        description="Share the project location, operating environment, target timeline, and required systems. CTS Pacific can help identify the appropriate next step."
        title="Planning connected infrastructure?"
      />
    </>
  );
}
