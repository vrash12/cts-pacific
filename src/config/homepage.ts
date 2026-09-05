import { fieldPhotography } from "@/config/field-photography";

export const credibilityItems = [
  "FOA Certified",
  "ETA International",
  "ANSI/TIA/EIA Standards",
  "Guam + Pacific Region",
] as const;

export const selectedCustomers = [
  {
    name: "GTA",
    logoSrc: "/images/customer/WhatsApp Image 2026-08-29 at 17.05.38.jpeg",
    width: 200,
    height: 200,
  },
  {
    name: "IT&E",
    logoSrc: "/images/customer/WhatsApp Image 2026-08-29 at 17.05.39.jpeg",
    width: 588,
    height: 282,
  },
] as const;

export const homepageMedia = {
  hero: {
    src: "/images/services 13.jpeg",
    alt: "CTS Pacific technician performing elevated infrastructure field work from a bucket truck.",
    objectPosition: "50% 46%",
  },
  microTrenching: {
    src: "/images/services 1.jpeg",
    alt: "CTS Pacific crew performing narrow trenching along a paved infrastructure pathway.",
    objectPosition: "50% 48%",
  },
} as const;

export const homepageServices = [
  {
    number: "01",
    title: "Fiber Optics",
    href: "/services/fiber-optics",
    description:
      "Single-mode and multi-mode deployment, fusion splicing, OTDR testing, termination, and backbone integration.",
    imageSrc: fieldPhotography.angledClosure.src,
    imageAlt: fieldPhotography.angledClosure.alt,
    objectPosition: "50% 50%",
  },
  {
    number: "02",
    title: "Data Cabling",
    href: "/services/data-cabling",
    description:
      "Cat6 and Cat6A structured cabling, patch panels, network racks, cable routing, labeling, and channel certification.",
    imageSrc: fieldPhotography.rackPathways.src,
    imageAlt: fieldPhotography.rackPathways.alt,
    objectPosition: "50% 38%",
  },
  {
    number: "03",
    title: "CCTV Systems",
    href: "/services/cctv",
    description:
      "IP camera deployment, NVR and VMS integration, night vision, remote viewing, and commercial surveillance systems.",
    imageSrc: "/images/field-work/cctv-exterior-installation.jpeg",
    imageAlt:
      "Exterior pan-tilt-zoom surveillance camera installed on a commercial building.",
    objectPosition: "58% 40%",
  },
  {
    number: "04",
    title: "Access Control",
    href: "/services/access-control",
    description:
      "Keycard and biometric access, electric strikes, automated gates, and centralized facility control.",
    imageSrc: "/images/product2.jpeg",
    imageAlt:
      "Client-supplied display of access-control door hardware, readers, and integrated security equipment.",
    objectPosition: "35% 70%",
  },
  {
    number: "05",
    title: "Micro Trenching",
    href: "/services/micro-trenching",
    description:
      "Low-impact narrow trenching for rapid fiber deployment through asphalt and concrete pathways.",
    imageSrc: "/images/services 1.jpeg",
    imageAlt:
      "CTS Pacific crew performing narrow trenching along a paved infrastructure pathway.",
    objectPosition: "50% 54%",
  },
  {
    number: "06",
    title: "Civil & Underground Works",
    href: "/services/civil-underground",
    description:
      "Underground conduit, trenching, utility vaults, handholes, telecom duct banks, and site preparation.",
    imageSrc: fieldPhotography.conduitTrench.src,
    imageAlt: fieldPhotography.conduitTrench.alt,
    objectPosition: "50% 58%",
  },
] as const;

export const technicalCapabilities = [
  "Fusion Splicing",
  "OTDR Testing",
  "Cat6 / Cat6A",
  "MDF / IDF",
  "Network Racks",
  "NVR / VMS",
  "Biometric Access",
  "Underground Conduit",
  "Utility Vaults",
  "Network Commissioning",
] as const;

export const projectIntents = [
  {
    id: "fiber-backbone",
    number: "01",
    prompt: "Connect buildings or a network backbone",
    title: "Fiber Optics",
    description:
      "Plan single-mode or multi-mode fiber installation, fusion splicing, termination, OTDR testing, and backbone integration.",
    capabilities: ["Fiber installation", "Fusion splicing", "OTDR testing"],
    href: "/services/fiber-optics",
    linkLabel: "Explore fiber optics",
  },
  {
    id: "data-network",
    number: "02",
    prompt: "Build or upgrade a data network",
    title: "Data Cabling",
    description:
      "Coordinate Cat6 or Cat6A structured cabling, network racks, patch panels, pathways, labeling, and channel certification.",
    capabilities: ["Cat6 / Cat6A", "MDF / IDF", "Channel certification"],
    href: "/services/data-cabling",
    linkLabel: "Explore data cabling",
  },
  {
    id: "surveillance",
    number: "03",
    prompt: "Add cameras or remote viewing",
    title: "CCTV Systems",
    description:
      "Connect IP cameras with the planned network, NVR or VMS environment, night vision, and remote-viewing configuration.",
    capabilities: ["IP cameras", "NVR / VMS", "Remote viewing"],
    href: "/services/cctv",
    linkLabel: "Explore CCTV systems",
  },
  {
    id: "controlled-entry",
    number: "04",
    prompt: "Control doors, gates, or facility entry",
    title: "Access Control",
    description:
      "Coordinate keycard readers, biometric systems, electric strikes, automated gates, and centralized access control.",
    capabilities: ["Keycard readers", "Biometric access", "Gate integration"],
    href: "/services/access-control",
    linkLabel: "Explore access control",
  },
  {
    id: "paved-fiber-route",
    number: "05",
    prompt: "Install fiber through paved surfaces",
    title: "Micro Trenching",
    description:
      "Create a narrow pathway for fiber through asphalt or concrete with reduced disruption and rapid restoration.",
    capabilities: ["Narrow trenching", "Fiber pathways", "Rapid restoration"],
    href: "/services/micro-trenching",
    linkLabel: "Explore micro trenching",
  },
  {
    id: "underground-pathway",
    number: "06",
    prompt: "Build an underground telecom pathway",
    title: "Civil & Underground Works",
    description:
      "Plan trenching, conduit, duct banks, utility vaults, handholes, site preparation, and pathway coordination.",
    capabilities: ["Underground conduit", "Utility vaults", "Telecom duct banks"],
    href: "/services/civil-underground",
    linkLabel: "Explore civil works",
  },
  {
    id: "combined-scope",
    number: "07",
    prompt: "Combine multiple infrastructure disciplines",
    title: "Turnkey Telecommunications Execution",
    description:
      "Bring civil work, cable installation, splicing, testing, security systems, and commissioning into one coordinated scope.",
    capabilities: ["Multiple services", "Coordinated execution", "Network commissioning"],
    href: "/quote",
    linkLabel: "Build a project request",
  },
] as const;

export const proofPillars = [
  {
    number: "01",
    title: "Certified Expertise",
    description:
      "Supplied company materials identify FOA-certified professionals and ETA International credentials.",
  },
  {
    number: "02",
    title: "Turnkey Execution",
    description:
      "Coordinated delivery from civil trenching and conduit through pulling, splicing, testing, and commissioning.",
  },
  {
    number: "03",
    title: "Pacific Region Experience",
    description:
      "Telecommunications and infrastructure deployment focused on Guam and Pacific operating environments.",
  },
  {
    number: "04",
    title: "Precision Technology",
    description:
      "Fusion splicing, OTDR testing, channel certification, and micro-trenching capability support controlled field execution.",
  },
] as const;

export const industries = [
  {
    number: "01",
    title: "Commercial",
    description:
      "Connectivity, security, and underground infrastructure for business and property environments.",
  },
  {
    number: "02",
    title: "Government",
    description:
      "Standards-conscious telecommunications and infrastructure execution for public-sector facilities.",
  },
  {
    number: "03",
    title: "Industrial",
    description:
      "Durable network pathways and facility systems for demanding operational settings.",
  },
  {
    number: "04",
    title: "Residential",
    description:
      "Structured connectivity, surveillance, and access solutions for residential project scopes.",
  },
] as const;

export const membershipsAndCredentials = [
  {
    category: "Industry membership",
    name: "Guam Contractors Association",
    logoSrc: "/images/credentials/gca-member.png",
    logoAlt: "Guam Contractors Association logo",
    logoWidth: 308,
    logoHeight: 486,
    description:
      "Client-supplied documentation identifies CTS Pacific as a Guam Contractors Association contractor member.",
  },
  {
    category: "Professional credentialing",
    name: "The Fiber Optic Association",
    logoSrc: "/images/credentials/foa-logo.png",
    logoAlt: "The Fiber Optic Association logo",
    logoWidth: 200,
    logoHeight: 199,
    description:
      "Supplied company materials identify FOA-certified professionals.",
  },
  {
    category: "Technical certification",
    name: "ETA Certified FOI",
    logoSrc: "/images/credentials/eta-certified-foi.png",
    logoAlt: "ETA Certified FOI badge",
    logoWidth: 447,
    logoHeight: 447,
    description:
      "The ETA Certified FOI credential mark was supplied by CTS Pacific.",
  },
  {
    category: "Credentialing organization",
    name: "ETA International",
    logoSrc: "/images/credentials/eta-international.png",
    logoAlt: "ETA International accredited certification logo",
    logoWidth: 190,
    logoHeight: 190,
    description:
      "Technical and vendor-neutral credentials are identified in supplied CTS Pacific company materials.",
  },
] as const;
