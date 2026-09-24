import { ArrowUpRight } from "lucide-react";

import { SiteImage } from "@/components/ui/site-image";
import { buttonVariants } from "@/components/ui/button";

const licenses = [
  {
    title: "Company contractor’s license",
    holder: "Corerin Technical Solutions, LLC dba: CTS Pacific",
    numberLabel: "License number",
    number: "CLB26-2114",
    certificate: "C-0626-0923",
    src: "/images/credentials/licenses/cts-pacific-contractor-license-2027.jpg",
  },
  {
    title: "Responsible Managing Employee (RME)",
    holder: "Saren F. Formento",
    numberLabel: "RME number",
    number: "CLB26-2115",
    certificate: "R-0626-0924",
    src: "/images/credentials/licenses/saren-formento-rme-license-2027.jpg",
  },
] as const;

export function ContractorLicenses() {
  return (
    <section className="safety-training contractor-licenses" id="contractor-licenses" aria-labelledby="contractor-licenses-heading">
      <div className="container">
        <div className="photo-gallery__heading">
          <div>
            <p className="eyebrow">Guam Contractors License Board</p>
            <h2 id="contractor-licenses-heading">Contractor licensing.</h2>
          </div>
          <p>
            Company and RME license documents for CTS Pacific. Both list classifications
            C13, C17 &amp; C61, with an issue date of June 26, 2026 and an expiration date
            of June 30, 2027.
          </p>
        </div>
        <div className="safety-training__grid">
          {licenses.map((license) => (
            <article className="training-certificate" key={license.number}>
              <a className="training-certificate__preview" href={license.src} target="_blank" rel="noreferrer" aria-label={`Open ${license.title} full-size scan (opens in a new tab)`}>
                <SiteImage
                  alt={`Guam contractor’s license for ${license.holder}, ${license.number}, certificate ${license.certificate}; classifications C13, C17 and C61; issued June 26, 2026, expires June 30, 2027.`}
                  src={license.src}
                  width={1650}
                  height={1275}
                  sizes="(max-width: 736px) 90vw, 44vw"
                />
              </a>
              <div className="training-certificate__content">
                <h3>{license.title}</h3>
                <p>{license.holder}</p>
                <dl>
                  <div><dt>{license.numberLabel}</dt><dd>{license.number}</dd></div>
                  <div><dt>Certificate number</dt><dd>{license.certificate}</dd></div>
                  <div><dt>Classifications</dt><dd>C13, C17 &amp; C61</dd></div>
                  <div><dt>Issued</dt><dd><time dateTime="2026-06-26">June 26, 2026</time></dd></div>
                  <div><dt>Expires</dt><dd><time dateTime="2027-06-30">June 30, 2027</time></dd></div>
                </dl>
                <a className={buttonVariants({ variant: "secondary" })} href={license.src} target="_blank" rel="noreferrer" aria-label={`View ${license.title} (opens in a new tab)`}>
                  View full license
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
