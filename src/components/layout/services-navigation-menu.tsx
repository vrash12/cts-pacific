"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type KeyboardEvent, useCallback, useEffect, useRef } from "react";

import { isPathActive } from "@/lib/navigation";

type NavigationLink = {
  label: string;
  href: string;
  group?: string;
};

type ServicesNavigationMenuProps = NavigationLink & {
  children: readonly NavigationLink[];
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export function ServicesNavigationMenu({
  label,
  href,
  children,
  variant = "desktop",
  onNavigate,
}: ServicesNavigationMenuProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHover = useRef(false);
  const pathname = usePathname();
  const isActive = isPathActive(pathname, href);
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

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    openedByHover.current = false;
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }, [clearCloseTimer]);

  function navigate() {
    closeMenu();
    onNavigate?.();
  }

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    function closeOutside(event: globalThis.PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        closeMenu();
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      clearCloseTimer();
    };
  }, [clearCloseTimer, closeMenu]);

  function handleKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key !== "Escape" || !menuRef.current?.open) return;

    event.stopPropagation();
    closeMenu();
    menuRef.current?.querySelector("summary")?.focus();
  }

  return (
    <details
      className={`navigation-menu navigation-menu--${variant}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        clearCloseTimer();
        if (!event.currentTarget.open) {
          openedByHover.current = true;
          event.currentTarget.open = true;
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        clearCloseTimer();
        closeTimer.current = setTimeout(() => {
          if (!menuRef.current?.contains(document.activeElement)) closeMenu();
        }, 150);
      }}
      ref={menuRef}
    >
      <summary
        aria-current={isActive ? "page" : undefined}
        onClick={(event) => {
          // A mouse click after hovering should leave the newly opened list available.
          if (openedByHover.current && event.detail > 0) event.preventDefault();
          openedByHover.current = false;
        }}
      >
        {label}
        <ChevronDown aria-hidden="true" size={15} />
      </summary>
      <div className="navigation-menu__panel">
        <Link className="navigation-menu__all" href={href} onClick={navigate}>
          All services
        </Link>
        <div
          className={`navigation-menu__groups${groups.length === 1 ? " navigation-menu__groups--single" : ""}`}
        >
          {groups.map((group) => (
            <section aria-label={group.label} key={group.label}>
              <p>{group.label}</p>
              {group.links.map((child) => (
                <Link href={child.href} key={child.href} onClick={navigate}>
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
