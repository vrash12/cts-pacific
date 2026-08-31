"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isPathActive } from "@/lib/navigation";

type ActiveNavigationLinkProps = {
  href: string;
  label: string;
};

export function ActiveNavigationLink({ href, label }: ActiveNavigationLinkProps) {
  const pathname = usePathname();
  const isActive = isPathActive(pathname, href);

  return (
    <Link aria-current={isActive ? "page" : undefined} href={href}>
      {label}
    </Link>
  );
}
