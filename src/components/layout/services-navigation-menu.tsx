"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useRef } from "react";

type NavigationLink = {
  label: string;
  href: string;
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
        <Link href={href} onClick={closeMenu}>
          All services
        </Link>
        {children.map((child) => (
          <Link href={child.href} key={child.href} onClick={closeMenu}>
            {child.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
