import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__main">
        <div className="site-footer__brand">
          <Image
            alt="CTS Pacific — Corerin Technical Solutions, LLC"
            className="site-footer__logo"
            height={777}
            sizes="16rem"
            src="/images/logo.png"
            width={2024}
          />
          <p className="site-footer__positioning">
            Telecommunications &amp;
            <br />
            Infrastructure Solutions
          </p>
        </div>

        <div>
          <p className="site-footer__heading">Start a project</p>
          <ul>
            <li><Link href="/services">All services</Link></li>
            <li><Link href="/quote">Request a quote</Link></li>
            <li><Link href="/contact">Contact CTS Pacific</Link></li>
          </ul>
        </div>

        <div>
          <p className="site-footer__heading">Company</p>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/certifications">Certifications</Link></li>
          </ul>
        </div>

        <div>
          <p className="site-footer__heading">Contact</p>
          <address>
            {siteConfig.phones.map((phone) => (
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} key={phone}>
                {phone}
              </a>
            ))}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <span>{siteConfig.coverage}</span>
          </address>
        </div>
      </div>

    </footer>
  );
}
