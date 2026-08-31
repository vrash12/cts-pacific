import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { ContactRequestForm } from "@/components/forms/contact-request-form";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { ProjectCta } from "@/components/marketing/project-cta";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact CTS Pacific",
  description:
    "Contact CTS Pacific about telecommunications, network infrastructure, security systems, and underground civil projects across Guam and the Pacific.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CTS Pacific",
    description:
      "Start a conversation about telecommunications and infrastructure work in Guam and the Pacific Region.",
    url: "/contact",
  },
};

const projectBriefItems = [
  "Project location and environment",
  "Services or systems under consideration",
  "Target timeline",
  "Known site, pathway, or access requirements",
] as const;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Contact" path="/contact" />

      <EditorialHero
        currentPage="Contact"
        description="Start a conversation about telecommunications, security, or underground infrastructure. For a detailed scope, use the project quote pathway so the right technical information can be collected."
        eyebrow="Contact CTS Pacific"
        imageAlt="CTS Pacific company branding displayed on field service vehicles."
        imageLabel="Guam & Pacific Region"
        imageSrc="/images/field-work/cts-fleet-branding.jpeg"
        objectPosition="50% 42%"
        title="Let’s connect the next project."
      >
        <Link className={buttonVariants({ size: "large" })} href="/quote">
          Request a quote
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
        <a className={buttonVariants({ variant: "ghost" })} href="#contact-form">
          Send an inquiry
          <ArrowRight aria-hidden="true" size={17} />
        </a>
      </EditorialHero>

      <section className="contact-directory">
        <div className="container">
          <div className="contact-directory__heading">
            <div>
              <p className="eyebrow">Direct contact</p>
              <h2>Reach the CTS Pacific team.</h2>
            </div>
            <p>
              Use the contact channel that fits your inquiry. No physical or mailing
              address is published because one has not yet been supplied for the site.
            </p>
          </div>

          <div className="contact-method-grid">
            <article>
              <Phone aria-hidden="true" size={24} strokeWidth={1.7} />
              <p>Phone</p>
              <div>
                {siteConfig.phones.map((phone) => (
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} key={phone}>
                    {phone}
                  </a>
                ))}
              </div>
            </article>
            <article>
              <Mail aria-hidden="true" size={24} strokeWidth={1.7} />
              <p>Email</p>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </article>
            <article>
              <MapPin aria-hidden="true" size={24} strokeWidth={1.7} />
              <p>Coverage</p>
              <span>{siteConfig.coverage}</span>
            </article>
          </div>
        </div>
      </section>

      <ContactRequestForm />

      <section className="contact-brief">
        <div className="container contact-brief__grid">
          <div>
            <p className="eyebrow eyebrow--inverse">Before you contact us</p>
            <h2>A useful project brief starts with four details.</h2>
          </div>
          <ol>
            {projectBriefItems.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-overview contact-routing">
        <div className="container service-overview__grid">
          <div>
            <p className="eyebrow">Choose the right path</p>
            <h2>General inquiry or active project?</h2>
          </div>
          <div className="contact-routing__options">
            <article>
              <p>General questions</p>
              <span>
                Email or call CTS Pacific for company, service, and coordination
                questions.
              </span>
              <a href={`mailto:${siteConfig.email}`}>
                Send an email
                <ArrowRight aria-hidden="true" size={17} />
              </a>
            </article>
            <article>
              <p>Project planning</p>
              <span>
                Use the quote pathway when you have a location, timeline, or technical
                scope to share.
              </span>
              <Link href="/quote">
                Start project request
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <ProjectCta
        description="Provide the project location, type, target timeline, required services, and a concise description so the inquiry can be routed appropriately."
        eyebrow="Project inquiries"
        title="Ready to define the scope?"
      />
    </>
  );
}
