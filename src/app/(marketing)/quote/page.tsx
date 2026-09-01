import type { Metadata } from "next";
import Link from "next/link";

import { QuoteRequestForm } from "@/components/forms/quote-request-form";
import { BreadcrumbJsonLd } from "@/components/marketing/breadcrumb-json-ld";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Request a Telecommunications Project Quote Guam",
  description:
    "Submit a telecommunications, security, fiber, data cabling, micro trenching, or underground infrastructure project request to CTS Pacific.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Request a Telecommunications Project Quote Guam | CTS Pacific",
    description:
      "Share your project location, services, timeline, and technical scope with CTS Pacific.",
    url: "/quote",
  },
};

export default function QuotePage() {
  return (
    <>
      <BreadcrumbJsonLd name="Request a Quote" path="/quote" />

      <section className="quote-intro">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Request a Quote</span>
          </nav>
          <div className="quote-intro__grid">
            <div>
              <p className="eyebrow">Start a project conversation</p>
              <h1>Tell us what you’re building.</h1>
            </div>
            <div>
              <p>
                Use this guided intake to identify the services, environment, timeline,
                and scope. CTS Pacific will receive the complete request at
                <strong> {siteConfig.email}</strong>.
              </p>
              <span>Four steps / No pricing commitment / Guam &amp; Pacific Region</span>
            </div>
          </div>
        </div>
      </section>

      <QuoteRequestForm />
    </>
  );
}
