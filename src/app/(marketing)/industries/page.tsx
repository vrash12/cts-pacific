import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { FieldImage } from "@/components/marketing/field-image";
import { ProjectCta } from "@/components/marketing/project-cta";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Industries & Project Environments",
  description:
    "Explore CTS Pacific telecommunications, security, and underground infrastructure capability for commercial, government, industrial, and residential projects.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries & Project Environments | CTS Pacific",
    description:
      "Infrastructure capability for commercial, government, industrial, and residential project environments.",
    url: "/industries",
  },
};

const industryProfiles = [
  {
    number: "01",
    title: "Commercial",
    description:
      "Connectivity, security, and underground infrastructure planned around business and property environments.",
    needs: ["Structured connectivity", "CCTV and access control", "Backbone infrastructure"],
    imageSrc: "/images/field-work/cctv-exterior-installation.jpeg",
    imageAlt: "Exterior surveillance camera installed on a commercial building.",
    objectPosition: "58% 40%",
  },
  {
    number: "02",
    title: "Government",
    description:
      "Standards-conscious telecommunications and infrastructure scopes for public-sector facilities and sites.",
    needs: ["Documented cabling", "Physical security systems", "Underground pathways"],
    imageSrc: "/images/services 20.jpeg",
    imageAlt: "Technician working from an elevated bucket near telecommunications cabling.",
    objectPosition: "48% 42%",
  },
  {
    number: "03",
    title: "Industrial",
    description:
      "Durable network pathways and facility systems configured for demanding operational settings.",
    needs: ["Civil infrastructure", "Network backbones", "Facility surveillance"],
    imageSrc: "/images/services 5.jpeg",
    imageAlt: "Excavated underground pathway beside a CTS Pacific service vehicle.",
    objectPosition: "50% 58%",
  },
  {
    number: "04",
    title: "Residential",
    description:
      "Structured connectivity, surveillance, and controlled access for residential project scopes.",
    needs: ["Data cabling", "CCTV systems", "Access control"],
    imageSrc: "/images/product2.jpeg",
    imageAlt: "Client-supplied display of access-control hardware and integrated security equipment.",
    objectPosition: "35% 70%",
  },
] as const;

const sharedRequirements = [
  "Site and pathway coordination",
  "System-specific installation",
  "Applicable testing and certification",
  "Commissioning and project closeout",
] as const;

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Industries" path="/industries" />

      <EditorialHero
        currentPage="Industries"
        description="CTS Pacific supports telecommunications, physical security, and underground infrastructure across four primary project types, with scope configured around each facility and operating environment."
        eyebrow="Project environments"
        imageAlt="CTS Pacific technician performing elevated infrastructure work from a bucket truck."
        imageLabel="Commercial / Government / Industrial / Residential"
        imageSrc="/images/services 13.jpeg"
        objectPosition="50% 46%"
        title="Infrastructure for critical operating environments."
      >
        <Link className={buttonVariants({ size: "large" })} href="/quote">
          Discuss your project
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/services">
          View capabilities
          <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </EditorialHero>

      <section className="industry-profiles">
        <div className="container">
          <div className="industry-profiles__heading">
            <div>
              <p className="eyebrow">Four primary sectors</p>
              <h2>Technical scope shaped by the project.</h2>
            </div>
            <p>
              These examples identify common capability areas. Final systems,
              standards, pathways, and documentation are established for the specific
              project.
            </p>
          </div>

          <div className="industry-profile-grid">
            {industryProfiles.map((industry) => (
              <article key={industry.number}>
                <FieldImage
                  alt={industry.imageAlt}
                  objectPosition={industry.objectPosition}
                  sizes="(max-width: 736px) 100vw, 50vw"
                  src={industry.imageSrc}
                />
                <div className="industry-profile-card__body">
                  <p>{industry.number} / Project type</p>
                  <h3>{industry.title}</h3>
                  <span>{industry.description}</span>
                  <ul aria-label={`${industry.title} capability considerations`}>
                    {industry.needs.map((need) => (
                      <li key={need}>{need}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-capabilities">
        <div className="container">
          <div className="service-capabilities__heading">
            <p className="eyebrow eyebrow--inverse">Across every sector</p>
            <h2>Coordination from pathway to system.</h2>
          </div>
          <div className="service-capabilities__grid">
            {sharedRequirements.map((requirement, index) => (
              <div key={requirement}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{requirement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-overview industry-planning">
        <div className="container service-overview__grid">
          <div>
            <p className="eyebrow">Project planning</p>
            <h2>Start with the environment, then define the system.</h2>
          </div>
          <div className="service-overview__copy">
            <p>
              Facility conditions, occupancy, access, existing infrastructure, and
              operating constraints can all shape the right delivery approach.
            </p>
            <p>
              CTS Pacific can coordinate multiple capabilities where a project combines
              civil work, fiber, data cabling, CCTV, or access control.
            </p>
          </div>
        </div>
      </section>

      <ProjectCta
        description="Tell us the project type, location, target timeline, and systems under consideration. The scope can then be organized around the operating environment."
        title="Which environment are you building for?"
      />
    </>
  );
}
