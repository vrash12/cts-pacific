import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { ProjectCta } from "@/components/marketing/project-cta";
import { buttonVariants } from "@/components/ui/button";
import { membershipsAndCredentials } from "@/config/homepage";

export const metadata: Metadata = {
  title: "Telecommunications Certifications & Standards Guam",
  description:
    "Review the GCA, FOA, and ETA materials supplied by CTS Pacific and the company's identified ANSI/TIA/EIA telecommunications standards compliance.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Telecommunications Certifications & Standards Guam | CTS Pacific",
    description:
      "Professional affiliations, technical credentialing materials, and standards-conscious infrastructure execution.",
    url: "/certifications",
  },
};

const verificationPrinciples = [
  {
    title: "Qualified field capability",
    description:
      "Supplied company materials identify FOA-certified professionals and ETA International credentials.",
  },
  {
    title: "Standards-conscious execution",
    description:
      "ANSI/TIA/EIA telecommunications standards compliance is identified in supplied company materials.",
  },
  {
    title: "Project-specific documentation",
    description:
      "Applicable testing, certification, and closeout requirements should be defined for each project scope.",
  },
] as const;

export default function CertificationsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Certifications" path="/certifications" />

      <EditorialHero
        currentPage="Certifications"
        description="CTS Pacific supplied professional membership and credentialing artwork for publication. Exact credential-holder details, validity dates, and standards wording remain subject to final client verification."
        eyebrow="Memberships & credentials"
        imageAlt="Open fiber enclosure showing organized fiber loops during CTS Pacific field work."
        imageLabel="Technical capability / Field verification"
        imageSrc="/images/field-work/fiber-enclosure-open.jpeg"
        objectPosition="50% 50%"
        title="Credentials that support disciplined field work."
      >
        <Link className={buttonVariants({ size: "large" })} href="/contact">
          Contact CTS Pacific
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/services">
          Explore services
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </EditorialHero>

      <section className="certifications-section certification-directory">
        <div className="container">
          <div className="certifications-section__heading">
            <div>
              <p className="eyebrow">Published client materials</p>
              <h2>Professional affiliations. Technical credentials.</h2>
            </div>
            <p>
              The marks below were supplied directly by CTS Pacific. They are presented
              without adding credential numbers, holders, dates, or classifications that
              have not been provided.
            </p>
          </div>

          <article className="membership-certificate">
            <div className="membership-certificate__content">
              <p>Membership documentation</p>
              <h3>Guam Contractors Association</h3>
              <span>
                This client-supplied certificate identifies Corerin Technical
                Solutions, LLC dba CTS Pacific as a contractor member of the Guam
                Contractors Association.
              </span>
              <a
                href="/images/credentials/gca-membership-certificate-2026.jpeg"
                rel="noreferrer"
                target="_blank"
              >
                View full certificate
                <ArrowRight aria-hidden="true" size={17} />
              </a>
            </div>
            <a
              aria-label="Open the full-size Guam Contractors Association membership certificate"
              className="membership-certificate__media"
              href="/images/credentials/gca-membership-certificate-2026.jpeg"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt="Guam Contractors Association certificate of membership for Corerin Technical Solutions, LLC dba CTS Pacific"
                height={900}
                sizes="(max-width: 736px) 100vw, (max-width: 1024px) 92vw, 58vw"
                src="/images/credentials/gca-membership-certificate-2026.jpeg"
                width={1280}
              />
            </a>
          </article>

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

      <section className="credential-context">
        <div className="container">
          <div className="credential-context__heading">
            <p className="eyebrow eyebrow--inverse">Why it matters</p>
            <h2>Technical credibility must carry into execution.</h2>
          </div>
          <div className="credential-context__grid">
            {verificationPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
          <p className="credential-context__notice">
            Final credential wording and third-party mark-use requirements are tracked
            for client approval before production publication.
          </p>
        </div>
      </section>

      <ProjectCta
        description="Share the project requirements and any specified testing, certification, or closeout standards so the technical scope can be reviewed."
        title="Have project-specific standards to meet?"
      />
    </>
  );
}
