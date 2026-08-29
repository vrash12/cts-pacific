import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { ServicesNavigationMenu } from "@/components/layout/services-navigation-menu";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

function Brand() {
  return (
    <Link className="brand" href="/" aria-label="CTS Pacific home">
      <Image
        alt="CTS Pacific — Corerin Technical Solutions, LLC"
        className="brand__logo"
        height={777}
        priority
        src="/images/logo.png"
        width={2024}
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__utility">
        <div className="container site-header__utility-inner">
          <span>Telecommunications &amp; Infrastructure</span>
          <span>{siteConfig.coverage}</span>
        </div>
      </div>

      <div className="container site-header__main">
        <Brand />

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {siteConfig.primaryNavigation.map((item) => {
            if ("children" in item) {
              return (
                <ServicesNavigationMenu
                  href={item.href}
                  key={item.href}
                  label={item.label}
                >
                  {item.children}
                </ServicesNavigationMenu>
              );
            }

            return (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          className={`${buttonVariants({ size: "compact" })} site-header__cta`}
          href="/quote"
        >
          Request a quote
        </Link>

        <details className="mobile-navigation">
          <summary aria-label="Open navigation menu">
            <Menu aria-hidden="true" size={24} />
            <span>Menu</span>
          </summary>
          <nav className="mobile-navigation__panel" aria-label="Mobile navigation">
            {siteConfig.primaryNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className={buttonVariants({ size: "compact" })} href="/quote">
              Request a quote
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
