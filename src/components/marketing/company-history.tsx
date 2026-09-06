import Link from "next/link";
import { ArrowRight } from "lucide-react";

import styles from "./company-history.module.css";

// Adapted from the client-supplied founder history, September 2026.
// Career durations are not calendar ranges or CTS Pacific's operating age.
const fieldDisciplines = [
  {
    title: "Fiber optics & outside plant",
    description:
      "Microtrenching, fiber blowing, fiber optic cabling, precision fusion splicing, testing, and advanced troubleshooting.",
  },
  {
    title: "Low-voltage & auxiliary systems",
    description:
      "Structured data cabling, access control systems, and CCTV deployment.",
  },
  {
    title: "Heavy equipment operation",
    description:
      "Hands-on operation of heavy machinery for civil works and infrastructure installation.",
  },
  {
    title: "Cross-sector project execution",
    description:
      "Direct field execution on federal, commercial, enterprise, and residential projects.",
  },
] as const;

export function CompanyHistory() {
  return (
    <section aria-labelledby="company-history-heading" className={styles.history} id="history">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Our history</p>
            <h2 id="company-history-heading">Built in the field.<br />Driven by experience.</h2>
          </div>
          <p>
            Over 14 years of end-to-end telecommunications &amp; infrastructure
            expertise. The founder’s journey from hands-on technical work to
            building CTS Pacific.
          </p>
        </div>

        <div className={styles.layout}>
          <aside aria-label="Founder experience and company founding" className={styles.summary}>
            <p className={styles.label}>The experience behind CTS Pacific</p>
            <p className={styles.metric}>14<span>+</span></p>
            <p className={styles.metricLabel}>Years of founder experience</p>
            <p className={styles.summaryCopy}>
              Hands-on technical proficiency. Team leadership. A complete view of
              telecommunications infrastructure.
            </p>
            <dl className={styles.dates}>
              <div><dt>Career began</dt><dd>2011</dd></div>
              <div><dt>CTS Pacific established</dt><dd>January 2026</dd></div>
            </dl>
            <Link className={styles.link} href="/services">
              Explore our capabilities <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </aside>

          <ol aria-label="From technical foundations to CTS Pacific" className={styles.chapters}>
            <li className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterNumber}>01 / Foundations</span>
                <time dateTime="2011">2011</time>
              </div>
              <h3>A technical foundation.</h3>
              <p>
                The founder’s journey began in 2011, working with hardware and
                software and building a strong technical foundation through
                industry certifications, including CCNA and CompTIA credentials.
                Starting in the private sector brought hands-on experience in
                both heavy construction and telecommunications infrastructure.
              </p>
            </li>

            <li className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterNumber}>02 / Field experience</span>
                <span>Five years in the field</span>
              </div>
              <h3>Learning the entire project lifecycle.</h3>
              <p>
                The early career years were dedicated to mastering specialized
                operations—from the civil works below ground to the systems
                that connect and protect a facility.
              </p>
              <ul aria-label="Founder’s field experience" className={styles.disciplines}>
                {fieldDisciplines.map((discipline, index) => (
                  <li key={discipline.title}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{discipline.title}</h4>
                      <p>{discipline.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>

            <li className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterNumber}>03 / Leadership</span>
                <span>Seven years with an ISP</span>
              </div>
              <h3>From field execution to leading teams.</h3>
              <p>
                Building on five years of field expertise, the founder joined a
                leading Internet Service Provider (ISP), spending seven years
                managing teams across construction and
                telecommunications divisions, leading complex end-to-end ISP and
                outside-plant (OSP) deployments and infrastructure initiatives.
              </p>
            </li>

            <li className={`${styles.chapter} ${styles.founding}`}>
              <div className={styles.chapterMeta}>
                <span className={styles.chapterNumber}>04 / CTS Pacific</span>
                <time dateTime="2026-01">January 2026</time>
              </div>
              <h3>Experience becomes a company.</h3>
              <p>
                With 14 years of hands-on technical proficiency and management
                experience in ISP/OSP telecommunications, the founder established
                Corerin Technical Solutions, LLC. CTS Pacific began operations
                in January 2026.
              </p>
              <p>
                Today, CTS Pacific delivers complete, end-to-end telecommunications,
                construction, and technical solutions to commercial, business, and
                residential clients across Guam and the Pacific Region.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
