"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type KeyboardEvent, useEffect, useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { ServicesNavigationMenu } from "@/components/layout/services-navigation-menu";
import { isPathActive } from "@/lib/navigation";

type MobileNavigationItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string; group?: string }[];
};

type MobileNavigationProps = {
  items: readonly MobileNavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
      menuRef.current.querySelectorAll("details[open]").forEach((menu) => {
        menu.removeAttribute("open");
      });
    }
  }

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }, [pathname]);

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape") return;

    closeMenu();
    menuRef.current?.querySelector("summary")?.focus();
  }

  return (
    <details
      className="mobile-navigation"
      onKeyDown={handleKeyDown}
      onToggle={(event) => {
        if (event.target === event.currentTarget && !event.currentTarget.open) closeMenu();
      }}
      ref={menuRef}
    >
      <summary aria-label="Toggle navigation menu">
        <Menu aria-hidden="true" size={24} />
        <span>Menu</span>
      </summary>
      <nav className="mobile-navigation__panel" aria-label="Mobile navigation">
        {items.map((item) => {
          if (item.children?.length) {
            return (
              <ServicesNavigationMenu
                href={item.href}
                key={item.href}
                label={item.label}
                onNavigate={closeMenu}
                variant="mobile"
              >
                {item.children}
              </ServicesNavigationMenu>
            );
          }

          const isActive = isPathActive(pathname, item.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          className={buttonVariants({ size: "compact" })}
          href="/quote"
          onClick={closeMenu}
        >
          Request a quote
        </Link>
      </nav>
    </details>
  );
}
