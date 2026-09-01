import { publicEnvironment } from "@/config/env/public";

export const serviceLinks = [
  { label: "Fiber Optics", href: "/services/fiber-optics", group: "Core infrastructure" },
  { label: "Data Cabling", href: "/services/data-cabling", group: "Core infrastructure" },
  { label: "CCTV Systems", href: "/services/cctv", group: "Core infrastructure" },
  { label: "Access Control", href: "/services/access-control", group: "Core infrastructure" },
  { label: "Micro Trenching", href: "/services/micro-trenching", group: "Core infrastructure" },
  {
    label: "Civil & Underground Works",
    href: "/services/civil-underground",
    group: "Core infrastructure",
  },
  { label: "Troubleshooting", href: "/services/troubleshooting", group: "Technical support & systems" },
  { label: "Maintenance", href: "/services/maintenance", group: "Technical support & systems" },
  { label: "PBX Systems", href: "/services/pbx-systems", group: "Technical support & systems" },
  { label: "Electrical", href: "/services/electrical", group: "Technical support & systems" },
  {
    label: "Server Infrastructure",
    href: "/services/server-infrastructure",
    group: "Technical support & systems",
  },
  {
    label: "Telecommunication Specialist",
    href: "/services/telecommunication-specialist",
    group: "Technical support & systems",
  },
  { label: "IT Support", href: "/services/it-support", group: "Technical support & systems" },
  {
    label: "Facility Locating",
    href: "/services/facility-locating",
    group: "Technical support & systems",
  },
] as const;

export const navigationServiceLinks = serviceLinks.filter(
  (service) => service.group === "Core infrastructure",
);

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: navigationServiceLinks },
  { label: "Industries", href: "/industries" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
] as const;

export const siteConfig = {
  legalName: "Corerin Technical Solutions, LLC",
  dba: "CTS Pacific",
  title: "Telecommunications Contractor Guam | CTS Pacific",
  description:
    "Turnkey telecommunications, network infrastructure, security, and underground civil solutions across Guam and the Pacific.",
  url: publicEnvironment.NEXT_PUBLIC_SITE_URL,
  coverage: "Guam & Pacific Region",
  email: "info@corerintechnicalsolutions.com",
  phones: ["(671) 480-6979", "(671) 777-6436"],
  primaryNavigation,
  services: serviceLinks,
} as const;
