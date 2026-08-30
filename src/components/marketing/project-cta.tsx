import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const intakeSteps = [
  {
    number: "01",
    title: "Services",
    detail: "Select one or multiple capabilities",
  },
  {
    number: "02",
    title: "Project",
    detail: "Location, environment, and timeline",
  },
  {
    number: "03",
    title: "Scope",
    detail: "Existing conditions and intended outcome",
  },
  {
    number: "04",
    title: "Contact",
    detail: "Project contact information",
  },
] as const;

type ProjectCtaProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function ProjectCta({
  eyebrow = "Discuss your project",
  title,
  description,
}: ProjectCtaProps) {
  return (
    <section className="service-cta">
      <div className="container service-cta__grid">
        <div>
          <p className="eyebrow eyebrow--inverse">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{description}</p>
          <Link
            className={buttonVariants({ variant: "inverse", size: "large" })}
            href="/quote"
          >
            Request a project quote
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <ol className="service-cta__intake" aria-label="Project request information">
          {intakeSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
