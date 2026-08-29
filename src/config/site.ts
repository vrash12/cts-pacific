import { publicEnvironment } from "@/config/env/public";

export const serviceLinks = [
  { label: "Fiber Optics", href: "/services/fiber-optics" },
  { label: "Data Cabling", href: "/services/data-cabling" },
  { label: "CCTV Systems", href: "/services/cctv" },
  { label: "Access Control", href: "/services/access-control" },
  { label: "Micro Trenching", href: "/services/micro-trenching" },
  {
    label: "Civil & Underground Works",
    href: "/services/civil-underground",
  },
] as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Industries", href: "/industries" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  legalName: "Corerin Technical Solutions, LLC",
  dba: "CTS Pacific",
  title: "CTS Pacific | Telecommunications & Infrastructure Solutions",
  description:
    "Turnkey telecommunications, network infrastructure, security, and underground civil solutions across Guam and the Pacific.",
  url: publicEnvironment.NEXT_PUBLIC_SITE_URL,
  coverage: "Guam & Pacific Region",
  email: "info@corerintechnicalsolutions.com",
  phones: ["(671) 480-6979", "(671) 777-6436"],
  primaryNavigation,
  services: serviceLinks,
} as const;
