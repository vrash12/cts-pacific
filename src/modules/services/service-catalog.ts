export type ServiceSlug =
  | "fiber-optics"
  | "data-cabling"
  | "cctv"
  | "access-control"
  | "micro-trenching"
  | "civil-underground";

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceDefinition = {
  slug: ServiceSlug;
  number: string;
  navigationTitle: string;
  title: string;
  eyebrow: string;
  description: string;
  overview: readonly string[];
  capabilities: readonly string[];
  applications: readonly string[];
  process: readonly ServiceProcessStep[];
  related: readonly ServiceSlug[];
  heroImage: string;
  heroImageAlt: string;
  heroObjectPosition: string;
  detailImage: string;
  detailImageAlt: string;
  detailObjectPosition: string;
  referenceImage: string;
  referenceImageAlt: string;
  referenceObjectPosition: string;
  referenceCredit: string;
  referenceUrl: string;
};

export const services = [
  {
    slug: "fiber-optics",
    number: "01",
    navigationTitle: "Fiber Optics",
    title: "Fiber Optic Infrastructure",
    eyebrow: "High-performance connectivity",
    description:
      "End-to-end single-mode and multi-mode fiber installation, splicing, termination, testing, and backbone integration.",
    overview: [
      "CTS Pacific supports fiber infrastructure from pathway coordination and cable installation through fusion splicing, termination, OTDR testing, and final network integration.",
      "The scope can be coordinated with structured cabling and underground civil work, creating a clear path from outside plant infrastructure to building backbones and network spaces.",
    ],
    capabilities: [
      "Single-mode fiber",
      "Multi-mode fiber",
      "Fusion splicing",
      "OTDR testing",
      "Fiber termination",
      "Patch-panel integration",
      "Fiber backbone installation",
    ],
    applications: [
      "Building and campus backbones",
      "MDF-to-IDF connectivity",
      "Commercial facilities",
      "Government environments",
      "Industrial networks",
      "New construction and upgrades",
    ],
    process: [
      {
        title: "Pathway coordination",
        description: "Review routes, network spaces, endpoints, and related civil requirements.",
      },
      {
        title: "Cable installation",
        description: "Pull, blow, and route fiber through the prepared pathway and backbone system.",
      },
      {
        title: "Splicing and termination",
        description: "Complete fusion splicing, termination, and patch-panel integration.",
      },
      {
        title: "Testing and commissioning",
        description: "Perform OTDR testing and support final network integration and commissioning.",
      },
    ],
    related: ["data-cabling", "civil-underground"],
    heroImage: "/images/field-work/fiber-enclosure-open.jpeg",
    heroImageAlt: "Open fiber enclosure showing organized fiber loops during CTS Pacific field work.",
    heroObjectPosition: "50% 50%",
    detailImage: "/images/field-work/fiber-enclosure-conduit-wide.jpeg",
    detailImageAlt: "Fiber enclosure and protective conduit at an interior installation site.",
    detailObjectPosition: "52% 54%",
    referenceImage: "/images/editorial/fiber-optic-reference.jpeg",
    referenceImageAlt: "Dense rows of aqua fiber-optic patch cords connected to rack-mounted adapter panels.",
    referenceObjectPosition: "50% 50%",
    referenceCredit: "Brett Sayles / Pexels",
    referenceUrl: "https://www.pexels.com/photo/blue-coated-wire-2420212/",
  },
  {
    slug: "data-cabling",
    number: "02",
    navigationTitle: "Data Cabling",
    title: "Structured Data Cabling",
    eyebrow: "Organized network infrastructure",
    description:
      "Cat6 and Cat6A structured cabling, network spaces, rack integration, pathway routing, labeling, and channel certification.",
    overview: [
      "CTS Pacific builds organized copper-cabling infrastructure for commercial, government, industrial, and residential project environments.",
      "Installations can include cable pathways, patch panels, network racks, MDF and IDF spaces, labeling, and channel certification testing as part of one coordinated delivery scope.",
    ],
    capabilities: [
      "Cat6 cabling",
      "Cat6A cabling",
      "Structured cabling",
      "Patch-panel termination",
      "Network-rack integration",
      "Cable-tray routing",
      "MDF and IDF buildout",
      "Labeling and certification testing",
    ],
    applications: [
      "Commercial networks",
      "Government facilities",
      "Industrial environments",
      "Residential projects",
      "New construction",
      "Network upgrades and expansions",
    ],
    process: [
      {
        title: "Layout review",
        description: "Coordinate network rooms, outlets, pathways, racks, and cable-routing requirements.",
      },
      {
        title: "Pathway and cable routing",
        description: "Install and organize cabling through trays, pathways, MDFs, and IDFs.",
      },
      {
        title: "Termination and labeling",
        description: "Terminate at patch panels and outlets, then apply clear infrastructure labeling.",
      },
      {
        title: "Channel certification",
        description: "Complete channel certification testing for the installed cabling system.",
      },
    ],
    related: ["fiber-optics", "cctv"],
    heroImage: "/images/field-work/network-equipment-integration.jpeg",
    heroImageAlt: "Network routing, switching, communications, and connected equipment at an installation site.",
    heroObjectPosition: "48% 50%",
    detailImage: "/images/services 7.jpeg",
    detailImageAlt: "Cabling staged across an active CTS Pacific field site.",
    detailObjectPosition: "48% 58%",
    referenceImage: "/images/editorial/data-cabling-reference.jpeg",
    referenceImageAlt: "Organized network patch cords connected to rack-mounted communications equipment.",
    referenceObjectPosition: "62% 50%",
    referenceCredit: "Brett Sayles / Pexels",
    referenceUrl: "https://www.pexels.com/photo/cables-connected-on-server-2881229/",
  },
  {
    slug: "cctv",
    number: "03",
    navigationTitle: "CCTV Systems",
    title: "CCTV Surveillance Systems",
    eyebrow: "Integrated visual security",
    description:
      "IP camera deployment, NVR and VMS integration, night vision, remote-viewing configuration, and commercial surveillance systems.",
    overview: [
      "CTS Pacific installs integrated CCTV systems built around the facility, coverage requirements, network pathway, and monitoring environment.",
      "The delivery scope can connect camera mounting and cabling with NVR or VMS integration, night-vision capability, remote-viewing configuration, and system commissioning.",
    ],
    capabilities: [
      "IP camera installation",
      "Exterior camera mounting",
      "NVR integration",
      "VMS integration",
      "Night-vision systems",
      "Remote-viewing configuration",
      "Commercial surveillance deployment",
    ],
    applications: [
      "Commercial facilities",
      "Government environments",
      "Industrial sites",
      "Residential properties",
      "Building perimeters",
      "Controlled facility areas",
    ],
    process: [
      {
        title: "Coverage coordination",
        description: "Review facility areas, camera locations, mounting conditions, and network pathways.",
      },
      {
        title: "Infrastructure installation",
        description: "Install the required cabling, mounting hardware, and camera infrastructure.",
      },
      {
        title: "System integration",
        description: "Connect cameras with the planned NVR or VMS monitoring environment.",
      },
      {
        title: "Configuration and testing",
        description: "Configure viewing access and verify the installed surveillance system.",
      },
    ],
    related: ["data-cabling", "access-control"],
    heroImage: "/images/field-work/cctv-exterior-installation.jpeg",
    heroImageAlt: "Exterior pan-tilt-zoom surveillance camera installed on a commercial building.",
    heroObjectPosition: "58% 40%",
    detailImage: "/images/field-work/cctv-installation-with-truck.jpeg",
    detailImageAlt: "Exterior surveillance camera installation area with a CTS Pacific bucket truck.",
    detailObjectPosition: "54% 48%",
    referenceImage: "/images/editorial/cctv-reference.jpeg",
    referenceImageAlt: "Dome surveillance camera mounted at the corner of a modern commercial building.",
    referenceObjectPosition: "50% 46%",
    referenceCredit: "Giant Asparagus / Pexels",
    referenceUrl: "https://www.pexels.com/photo/close-up-of-security-camera-on-modern-building-37591155/",
  },
  {
    slug: "access-control",
    number: "04",
    navigationTitle: "Access Control",
    title: "Access Control Systems",
    eyebrow: "Managed facility entry",
    description:
      "Keycard readers, biometric systems, electric strikes, automated-gate integration, and centralized access control.",
    overview: [
      "CTS Pacific installs physical access-control infrastructure for facilities that need managed entry, controlled zones, and centralized system operation.",
      "Solutions can coordinate readers, biometric devices, electric strikes, door hardware, automated gates, cabling, and centralized access-control components.",
    ],
    capabilities: [
      "Keycard-reader installation",
      "Biometric access systems",
      "Electric strikes",
      "Door-hardware integration",
      "Automated-gate integration",
      "Centralized access control",
      "System cabling and connectivity",
    ],
    applications: [
      "Commercial entrances",
      "Government facilities",
      "Industrial controlled areas",
      "Residential gates and entries",
      "Restricted facility zones",
      "Centralized building access",
    ],
    process: [
      {
        title: "Access-point review",
        description: "Coordinate doors, gates, controlled zones, hardware, and system-connectivity needs.",
      },
      {
        title: "Hardware installation",
        description: "Install readers, biometric devices, strikes, and related access-control hardware.",
      },
      {
        title: "System integration",
        description: "Connect field devices with the centralized access-control environment.",
      },
      {
        title: "Configuration and commissioning",
        description: "Configure the installed system and support final operational commissioning.",
      },
    ],
    related: ["cctv", "data-cabling"],
    heroImage: "/images/product2.jpeg",
    heroImageAlt: "Client-supplied display of access-control door hardware, readers, and integrated security equipment.",
    heroObjectPosition: "35% 68%",
    detailImage: "/images/product5.jpeg",
    detailImageAlt: "Access-control and video-intercom reader equipment.",
    detailObjectPosition: "50% 68%",
    referenceImage: "/images/editorial/access-control-reference.jpeg",
    referenceImageAlt: "Employee presenting an RFID badge to an electronic wall-mounted access reader.",
    referenceObjectPosition: "64% 50%",
    referenceCredit: "Susanne Plank / Pexels",
    referenceUrl: "https://www.pexels.com/photo/close-up-of-man-holding-access-card-over-reader-13657375/",
  },
  {
    slug: "micro-trenching",
    number: "05",
    navigationTitle: "Micro Trenching",
    title: "Micro Trenching Technology",
    eyebrow: "Low-disruption fiber pathways",
    description:
      "Narrow trenching for fiber deployment through asphalt and concrete pathways with reduced disruption and rapid restoration.",
    overview: [
      "CTS Pacific provides narrow trenching designed to create fiber pathways through asphalt and concrete while reducing the footprint of conventional trench work.",
      "The method supports faster pathway deployment, lower traffic disruption, and rapid restoration while connecting with the broader cable-installation and commissioning scope.",
    ],
    capabilities: [
      "Narrow trench cutting",
      "Fiber pathway deployment",
      "Asphalt applications",
      "Concrete applications",
      "Reduced traffic disruption",
      "Rapid pathway restoration",
      "Coordination with fiber installation",
    ],
    applications: [
      "Commercial sites",
      "Government facilities",
      "Industrial pathways",
      "Campus environments",
      "Existing paved areas",
      "Fiber-route extensions",
    ],
    process: [
      {
        title: "Pathway review",
        description: "Review the proposed route, surface conditions, access, and related fiber requirements.",
      },
      {
        title: "Narrow trenching",
        description: "Cut a controlled narrow pathway through the planned asphalt or concrete route.",
      },
      {
        title: "Pathway installation",
        description: "Place the planned fiber pathway and coordinate the cable-deployment scope.",
      },
      {
        title: "Restoration",
        description: "Close and restore the pathway after the planned infrastructure is installed.",
      },
    ],
    related: ["fiber-optics", "civil-underground"],
    heroImage: "/images/services 1.jpeg",
    heroImageAlt: "CTS Pacific crew performing narrow trenching along a paved infrastructure pathway.",
    heroObjectPosition: "50% 50%",
    detailImage: "/images/services 2.jpeg",
    detailImageAlt: "Narrow underground pathway beside an industrial facility.",
    detailObjectPosition: "50% 58%",
    referenceImage: "/images/editorial/micro-trenching-reference.jpeg",
    referenceImageAlt: "Road worker operating a compact pavement saw beside a traffic cone.",
    referenceObjectPosition: "48% 50%",
    referenceCredit: "Thomas Fuhrmann / Pexels",
    referenceUrl: "https://www.pexels.com/photo/road-construction-worker-cutting-asphalt-with-saw-33484882/",
  },
  {
    slug: "civil-underground",
    number: "06",
    navigationTitle: "Civil & Underground Works",
    title: "Civil & Underground Works",
    eyebrow: "Infrastructure below grade",
    description:
      "Underground conduit, trenching, utility vaults, handholes, telecom duct banks, site preparation, and directional-drilling support.",
    overview: [
      "CTS Pacific delivers the civil infrastructure required to create protected underground telecommunications pathways across commercial, government, industrial, and residential project environments.",
      "Civil scopes can connect directly with cable pulling or blowing, fiber installation, splicing, testing, and final network commissioning for coordinated turnkey execution.",
    ],
    capabilities: [
      "Underground conduit",
      "Conventional trenching",
      "Utility vaults",
      "Telecommunications handholes",
      "Telecom duct banks",
      "Site preparation",
      "Directional-drilling support",
      "Cable-pulling pathway coordination",
    ],
    applications: [
      "Commercial developments",
      "Government sites",
      "Industrial facilities",
      "Residential infrastructure",
      "Building-to-building pathways",
      "Telecommunications route extensions",
    ],
    process: [
      {
        title: "Route and site review",
        description: "Coordinate the underground route, access points, conduit, vault, and site requirements.",
      },
      {
        title: "Excavation and preparation",
        description: "Prepare the site and complete the planned trenching or excavation scope.",
      },
      {
        title: "Infrastructure placement",
        description: "Install conduit, duct banks, handholes, vaults, and related pathway components.",
      },
      {
        title: "Restoration and network handoff",
        description: "Restore the work area and coordinate the pathway for cable installation and commissioning.",
      },
    ],
    related: ["micro-trenching", "fiber-optics"],
    heroImage: "/images/services 5.jpeg",
    heroImageAlt: "Excavated underground pathway beside a CTS Pacific service vehicle.",
    heroObjectPosition: "50% 58%",
    detailImage: "/images/services 2.jpeg",
    detailImageAlt: "Underground pathway excavation beside an industrial building.",
    detailObjectPosition: "50% 56%",
    referenceImage: "/images/editorial/civil-underground-reference.jpeg",
    referenceImageAlt: "Construction crew inspecting an open underground utility excavation.",
    referenceObjectPosition: "50% 58%",
    referenceCredit: "Miguel Castillo / Pexels",
    referenceUrl: "https://www.pexels.com/photo/construction-workers-inspecting-underground-utilities-31460017/",
  },
] as const satisfies readonly ServiceDefinition[];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDefinition) {
  return service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((related): related is (typeof services)[number] => Boolean(related));
}
