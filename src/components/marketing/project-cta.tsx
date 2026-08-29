import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { NetworkMotif } from "@/components/marketing/network-motif";
import { buttonVariants } from "@/components/ui/button";

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
        <NetworkMotif inverse />
      </div>
    </section>
  );
}
