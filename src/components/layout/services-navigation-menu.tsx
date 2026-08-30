"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useRef } from "react";

type NavigationLink = {
  label: string;
  href: string;
  group?: string;
};

type ServicesNavigationMenuProps = NavigationLink & {
  children: readonly NavigationLink[];
};

export function ServicesNavigationMenu({
  label,
  href,
  children,
}: ServicesNavigationMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const groups = children.reduce<{ label: string; links: NavigationLink[] }[]>(
    (result, child) => {
      const groupLabel = child.group ?? "Services";
      const existingGroup = result.find((group) => group.label === groupLabel);

      if (existingGroup) {
        existingGroup.links = [...existingGroup.links, child];
        return result;
      }

      return [...result, { label: groupLabel, links: [child] }];
    },
    [],
  );

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape") return;

    closeMenu();
    menuRef.current?.querySelector("summary")?.focus();
  }

  return (
    <details
      className="navigation-menu"
      onKeyDown={handleKeyDown}
      ref={menuRef}
    >
      <summary>
        {label}
        <ChevronDown aria-hidden="true" size={15} />
      </summary>
      <div className="navigation-menu__panel">
        <Link className="navigation-menu__all" href={href} onClick={closeMenu}>
          All services
        </Link>
        <div
          className={`navigation-menu__groups${groups.length === 1 ? " navigation-menu__groups--single" : ""}`}
        >
          {groups.map((group) => (
            <section aria-label={group.label} key={group.label}>
              <p>{group.label}</p>
              {group.links.map((child) => (
                <Link href={child.href} key={child.href} onClick={closeMenu}>
                  {child.label}
                </Link>
              ))}
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}
