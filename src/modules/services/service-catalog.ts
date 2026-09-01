export type ServiceSlug =
  | "fiber-optics"
  | "data-cabling"
  | "cctv"
  | "access-control"
  | "micro-trenching"
  | "civil-underground"
  | "troubleshooting"
  | "maintenance"
  | "pbx-systems"
  | "electrical"
  | "server-infrastructure"
  | "telecommunication-specialist"
  | "it-support"
  | "facility-locating"
  | "construction-equipment-rental";

export type ServiceGroup =
  | "core-infrastructure"
  | "technical-support"
  | "equipment-rental";

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServicePartner = {
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  scopeNote: string;
  logo: string;
  logoAlt: string;
  website: string;
};

export type ServiceDefinition = {
  slug: ServiceSlug;
  group: ServiceGroup;
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
  scopeNote?: string;
  partner?: ServicePartner;
};

export const services: readonly ServiceDefinition[] = [
  {
    slug: "fiber-optics",
    group: "core-infrastructure",
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
  },
  {
    slug: "data-cabling",
    group: "core-infrastructure",
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
  },
  {
    slug: "cctv",
    group: "core-infrastructure",
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
  },
  {
    slug: "access-control",
    group: "core-infrastructure",
    number: "04",
    navigationTitle: "Access Control",
    title: "Access Control Systems",
    eyebrow: "Managed facility entry",
    description:
      "Keycard readers, biometric systems, electric strikes, automated-gate integration, and centralized access control.",
    overview: [
      "CTS Pacific installs physical access-control infrastructure for facilities that need managed entry, controlled zones, and centralized system operation.",
      "Solutions can coordinate readers, biometric devices, electric strikes, door hardware, automated gates, hotel locking requirements, cabling, and centralized access-control components.",
    ],
    capabilities: [
      "Keycard-reader installation",
      "Biometric access systems",
      "Electric strikes",
      "Door-hardware integration",
      "Automated-gate integration",
      "Centralized access control",
      "System cabling and connectivity",
      "Hotel-lock project coordination",
    ],
    applications: [
      "Commercial entrances",
      "Government facilities",
      "Industrial controlled areas",
      "Residential gates and entries",
      "Restricted facility zones",
      "Centralized building access",
      "Hotels and hospitality facilities",
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
    partner: {
      name: "VCE Pacific",
      eyebrow: "Hotel lock partner",
      title: "Hotel locking coordinated with a Guam security specialist.",
      description:
        "CTS Pacific works with VCE Pacific for hotel-lock requirements. VCE Pacific provides hotel locking and access-control solutions in Guam, including Vingcard systems, allowing hospitality projects to connect specialized door hardware with the broader access-control and infrastructure scope.",
      scopeNote:
        "Product selection, availability, installation responsibility, configuration, warranty, and continuing support are confirmed for each project before work begins.",
      logo: "/images/partners/vce-pacific-logo.png",
      logoAlt: "VCE Pacific logo",
      website: "https://www.vcepacific.com/",
    },
  },
  {
    slug: "micro-trenching",
    group: "core-infrastructure",
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
  },
  {
    slug: "civil-underground",
    group: "core-infrastructure",
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
  },
  {
    slug: "troubleshooting",
    group: "technical-support",
    number: "07",
    navigationTitle: "Troubleshooting",
    title: "Infrastructure Troubleshooting",
    eyebrow: "Structured issue isolation",
    description:
      "Project-specific review and fault isolation for supported telecommunications, network, security, and connected infrastructure systems.",
    overview: [
      "Troubleshooting begins with the reported symptom, the affected environment, and the available system information. Supported systems, access requirements, and response arrangements are confirmed before work begins.",
      "The review can cover visible connections, pathways, endpoints, and relevant system conditions so findings and an appropriate corrective scope can be organized without assuming the cause in advance.",
    ],
    capabilities: [
      "Reported-issue intake",
      "Existing-system review",
      "Physical-connection inspection",
      "Pathway and endpoint checks",
      "Fault isolation",
      "Corrective-scope coordination",
      "Post-work verification",
    ],
    applications: [
      "Connectivity interruptions",
      "Degraded system behavior",
      "Existing infrastructure concerns",
      "Moves, additions, and changes",
      "Post-installation issue review",
      "Multi-system environments",
    ],
    process: [
      {
        title: "Issue intake",
        description: "Document the reported condition, affected area, system context, and available history.",
      },
      {
        title: "Baseline review",
        description: "Review accessible pathways, connections, endpoints, and relevant system conditions.",
      },
      {
        title: "Fault isolation",
        description: "Narrow the issue to an identified area or next diagnostic action where possible.",
      },
      {
        title: "Findings and next step",
        description: "Document findings and coordinate an approved corrective or follow-up scope.",
      },
    ],
    related: ["maintenance", "server-infrastructure"],
    heroImage: "/images/field-work/network-equipment-integration.jpeg",
    heroImageAlt: "Network and communications equipment at a CTS Pacific installation site.",
    heroObjectPosition: "48% 48%",
    detailImage: "/images/services 9.jpeg",
    detailImageAlt: "Client-supplied field image of an exterior connected communications device.",
    detailObjectPosition: "50% 48%",
    referenceImage: "/images/editorial/network-troubleshooting-reference.jpeg",
    referenceImageAlt: "Field engineer reviewing network equipment with a laptop.",
    referenceObjectPosition: "50% 50%",
    scopeNote:
      "Supported platforms, response availability, diagnostic limits, and corrective-work coverage are confirmed for each request.",
  },
  {
    slug: "maintenance",
    group: "technical-support",
    number: "08",
    navigationTitle: "Maintenance",
    title: "Infrastructure Maintenance",
    eyebrow: "Support for installed systems",
    description:
      "Scheduled and project-specific maintenance coordination for supported telecommunications, security, and infrastructure systems.",
    overview: [
      "Maintenance scopes are organized around the installed system, current condition, facility access, documentation, and the work approved for the project.",
      "A maintenance engagement can include condition review, connection and pathway checks, approved corrective work, documentation updates, and operational verification where those activities are included in the agreed scope.",
    ],
    capabilities: [
      "Maintenance-scope review",
      "Installed-condition checks",
      "Connection and termination inspection",
      "Pathway and endpoint review",
      "Labeling and documentation updates",
      "Approved maintenance work",
      "Post-maintenance verification",
    ],
    applications: [
      "Existing network infrastructure",
      "Structured cabling systems",
      "Fiber infrastructure",
      "CCTV systems",
      "Access-control systems",
      "Communications spaces",
    ],
    process: [
      {
        title: "System and scope review",
        description: "Confirm the installed environment, maintenance need, access, and approved work area.",
      },
      {
        title: "Condition assessment",
        description: "Review accessible components, connections, pathways, labels, and available records.",
      },
      {
        title: "Approved maintenance",
        description: "Complete the maintenance activities included in the confirmed project scope.",
      },
      {
        title: "Verification and record",
        description: "Verify the addressed area and document completed work and follow-up needs.",
      },
    ],
    related: ["troubleshooting", "data-cabling"],
    heroImage: "/images/services 18.jpeg",
    heroImageAlt: "CTS Pacific field crew accessing elevated communications infrastructure.",
    heroObjectPosition: "50% 46%",
    detailImage: "/images/field-work/cctv-ptz-closeup.jpeg",
    detailImageAlt: "Close view of an installed exterior surveillance camera.",
    detailObjectPosition: "50% 48%",
    referenceImage: "/images/editorial/maintenance-reference.jpeg",
    referenceImageAlt: "Technician maintaining installed network hardware.",
    referenceObjectPosition: "52% 50%",
    scopeNote:
      "Maintenance intervals, covered systems, service windows, exclusions, and any ongoing support agreement require project-specific confirmation.",
  },
  {
    slug: "pbx-systems",
    group: "technical-support",
    number: "09",
    navigationTitle: "PBX Systems",
    title: "PBX Communication Systems",
    eyebrow: "Coordinated business voice infrastructure",
    description:
      "Project-specific PBX planning, endpoint coordination, cabling integration, configuration support, and system verification.",
    overview: [
      "PBX work is planned around the organization’s communication requirements, existing telephone environment, network readiness, endpoints, and intended call flow.",
      "The project scope can coordinate voice and data pathways, endpoints, system components, configuration requirements, testing, and handover after the supported platform and deliverables are confirmed.",
    ],
    capabilities: [
      "PBX requirements review",
      "Extension and endpoint planning",
      "Voice and data pathway coordination",
      "Network-readiness review",
      "Endpoint setup and integration",
      "Call-flow configuration support",
      "System testing and handover",
    ],
    applications: [
      "Commercial offices",
      "Government environments",
      "Industrial administration spaces",
      "Multi-department communications",
      "System replacements",
      "Endpoint additions and expansions",
    ],
    process: [
      {
        title: "Communication review",
        description: "Confirm users, endpoints, existing services, call-flow needs, and the intended platform.",
      },
      {
        title: "Infrastructure coordination",
        description: "Review cabling, network, rack, power, and endpoint-readiness requirements.",
      },
      {
        title: "System integration",
        description: "Coordinate supported components, endpoints, and approved configuration activities.",
      },
      {
        title: "Testing and handover",
        description: "Verify the agreed communication functions and document the completed scope.",
      },
    ],
    related: ["data-cabling", "server-infrastructure"],
    heroImage: "/images/field-work/network-equipment-integration.jpeg",
    heroImageAlt: "Client-supplied image of network, communications, and telephone equipment.",
    heroObjectPosition: "52% 50%",
    detailImage: "/images/field-work/network-equipment-integration.jpeg",
    detailImageAlt: "Client-supplied image of connected network and telephone equipment.",
    detailObjectPosition: "52% 50%",
    referenceImage: "/images/editorial/pbx-conference-phone-reference.jpeg",
    referenceImageAlt: "Conference telephone installed in a professional meeting space.",
    referenceObjectPosition: "50% 78%",
    scopeNote:
      "Supported PBX platforms, carrier responsibilities, licensing, handset models, and ongoing support coverage require client approval before final publication.",
  },
  {
    slug: "electrical",
    group: "technical-support",
    number: "10",
    navigationTitle: "Electrical",
    title: "Electrical Infrastructure Support",
    eyebrow: "Power coordination for connected systems",
    description:
      "Project-specific electrical coordination related to telecommunications and infrastructure installations, subject to confirmed scope and applicable requirements.",
    overview: [
      "Electrical requirements can affect telecommunications rooms, network racks, security devices, exterior equipment, and other connected infrastructure. CTS Pacific can review those project interfaces and organize the supported scope.",
      "Voltage class, permits, licensed-trade responsibilities, equipment power, grounding, and the boundary between telecommunications and electrical work must be confirmed before execution.",
    ],
    capabilities: [
      "Project electrical-requirement review",
      "Equipment-power coordination",
      "Pathway and interface planning",
      "Telecommunications-room coordination",
      "Existing-condition documentation",
      "Applicable-trade coordination",
      "Testing and handover planning",
    ],
    applications: [
      "Telecommunications rooms",
      "Network-rack environments",
      "Security-system power interfaces",
      "Exterior connected devices",
      "New construction coordination",
      "Infrastructure upgrades",
    ],
    process: [
      {
        title: "Requirement review",
        description: "Confirm equipment, location, available documentation, voltage, and project constraints.",
      },
      {
        title: "Scope boundary",
        description: "Define supported work, permit needs, and responsibilities for every applicable trade.",
      },
      {
        title: "Project coordination",
        description: "Coordinate the approved electrical interfaces with the broader infrastructure installation.",
      },
      {
        title: "Verification and handover",
        description: "Complete the agreed checks and document the supported project scope.",
      },
    ],
    related: ["data-cabling", "civil-underground"],
    heroImage: "/images/services 4.jpeg",
    heroImageAlt: "Client-supplied field image showing utility, conduit, and connected infrastructure interfaces.",
    heroObjectPosition: "50% 48%",
    detailImage: "/images/services 8.jpeg",
    detailImageAlt: "Client-supplied field image of exterior conduit routed along a utility pole.",
    detailObjectPosition: "50% 48%",
    referenceImage: "/images/editorial/electrical-support-reference.jpeg",
    referenceImageAlt: "Technician working inside an electrical control panel.",
    referenceObjectPosition: "50% 50%",
    scopeNote:
      "The client must confirm electrical licenses, voltage classes, permitting responsibility, and whether regulated work is self-performed or delivered through an approved electrical trade partner.",
  },
  {
    slug: "server-infrastructure",
    group: "technical-support",
    number: "11",
    navigationTitle: "Server Infrastructure",
    title: "Server Infrastructure",
    eyebrow: "Physical systems and network readiness",
    description:
      "Physical server and communications-space planning, installation coordination, connectivity integration, and project-specific support.",
    overview: [
      "Server infrastructure work is organized around the physical environment, rack and pathway readiness, network connectivity, equipment requirements, and the system owner’s approved configuration scope.",
      "CTS Pacific can coordinate the physical infrastructure and connected network elements while platform administration, operating systems, cloud services, backup, cybersecurity, and managed support remain subject to explicit project confirmation.",
    ],
    capabilities: [
      "Server-requirement review",
      "Rack and space readiness",
      "Structured-cabling integration",
      "Network-connectivity coordination",
      "Hardware placement and organization",
      "Expansion and upgrade planning",
      "System testing and handover",
    ],
    applications: [
      "Server rooms",
      "MDF and IDF environments",
      "Commercial networks",
      "Government systems",
      "Industrial operations",
      "Infrastructure upgrades",
    ],
    process: [
      {
        title: "Environment review",
        description: "Confirm equipment, rack, network, pathway, power, access, and ownership requirements.",
      },
      {
        title: "Readiness coordination",
        description: "Organize the physical space, cabling, connectivity, and related infrastructure dependencies.",
      },
      {
        title: "Infrastructure integration",
        description: "Complete the approved physical installation and connectivity coordination scope.",
      },
      {
        title: "Testing and handover",
        description: "Verify agreed connections and document the completed infrastructure scope.",
      },
    ],
    related: ["data-cabling", "pbx-systems"],
    heroImage: "/images/field-work/network-equipment-integration.jpeg",
    heroImageAlt: "Client-supplied image of network and communications equipment integration.",
    heroObjectPosition: "45% 50%",
    detailImage: "/images/field-work/fiber-enclosure-conduit-wide.jpeg",
    detailImageAlt: "Client-supplied field image of a connected fiber pathway and enclosure.",
    detailObjectPosition: "52% 54%",
    referenceImage: "/images/editorial/server-infrastructure-reference.jpeg",
    referenceImageAlt: "Physical server equipment installed in enclosed racks.",
    referenceObjectPosition: "62% 50%",
    scopeNote:
      "Supported server hardware, operating systems, virtualization, backup, cybersecurity, cloud, warranty, and managed-service responsibilities require explicit client confirmation.",
  },
  {
    slug: "telecommunication-specialist",
    group: "technical-support",
    number: "12",
    navigationTitle: "Telecommunication Specialist",
    title: "Telecommunications Project Support",
    eyebrow: "Specialized project coordination",
    description:
      "Project-specific telecommunications planning and field coordination across confirmed connectivity, pathway, equipment, and documentation requirements.",
    overview: [
      "Telecommunications projects often connect outside pathways, building cabling, communications spaces, active equipment, and multiple project stakeholders. The supported scope begins with the requirements and responsibilities confirmed for that environment.",
      "CTS Pacific can organize approved telecommunications work across existing-condition review, pathway and system coordination, installation planning, field execution, testing coordination, and handover documentation without assuming staffing or consulting services that have not been confirmed.",
    ],
    capabilities: [
      "Telecommunications requirement review",
      "Existing-infrastructure review",
      "Pathway and system coordination",
      "Installation-scope planning",
      "Field-work coordination",
      "Testing and documentation coordination",
      "Project handover support",
    ],
    applications: [
      "New telecommunications installations",
      "Infrastructure upgrades",
      "Commercial facilities",
      "Government environments",
      "Industrial sites",
      "Multi-system project coordination",
    ],
    process: [
      {
        title: "Requirements review",
        description: "Confirm the project environment, intended systems, stakeholders, records, and required deliverables.",
      },
      {
        title: "Scope coordination",
        description: "Define pathways, interfaces, responsibilities, access constraints, and the supported telecommunications work.",
      },
      {
        title: "Field execution",
        description: "Coordinate the approved installation or technical-support activities within the confirmed project scope.",
      },
      {
        title: "Verification and handover",
        description: "Coordinate agreed testing, records, open items, and handover documentation.",
      },
    ],
    related: ["fiber-optics", "data-cabling"],
    heroImage: "/images/services 21.jpeg",
    heroImageAlt: "CTS Pacific field personnel coordinating telecommunications infrastructure work.",
    heroObjectPosition: "50% 48%",
    detailImage: "/images/field-work/network-equipment-integration.jpeg",
    detailImageAlt: "Client-supplied image of network and communications equipment at a project site.",
    detailObjectPosition: "48% 50%",
    referenceImage: "/images/editorial/telecommunications-specialist-reference.jpeg",
    referenceImageAlt: "Telecommunications specialist configuring network equipment and cabling.",
    referenceObjectPosition: "55% 50%",
    scopeNote:
      "The client must confirm whether this offering includes consulting, staffing, direct installation, or another delivery model, together with the supported disciplines, credentials, contract boundaries, and technical responsibilities.",
  },
  {
    slug: "it-support",
    group: "technical-support",
    number: "13",
    navigationTitle: "IT Support",
    title: "IT Infrastructure Support",
    eyebrow: "Connected-system readiness",
    description:
      "Project-specific support for physical network connectivity, connected devices, and infrastructure readiness within a confirmed technical scope.",
    overview: [
      "IT support requirements vary by device, platform, network, facility, and system owner. Each request begins by identifying the affected environment, available records, access requirements, and the outcome that the client needs reviewed.",
      "The supported project can coordinate physical connectivity checks, device and network readiness, infrastructure changes, documentation, and verification. Operating-system administration, cloud services, cybersecurity, remote support, and managed-service commitments are not assumed.",
    ],
    capabilities: [
      "Support-request intake",
      "Physical connectivity review",
      "Device and network-readiness checks",
      "Endpoint onboarding coordination",
      "Infrastructure change support",
      "Technical documentation updates",
      "Post-work verification",
    ],
    applications: [
      "Commercial workstations and devices",
      "Communications spaces",
      "Network-connected equipment",
      "New device deployment",
      "Infrastructure changes",
      "Connectivity issue coordination",
    ],
    process: [
      {
        title: "Request intake",
        description: "Identify the devices, users, locations, symptoms, dependencies, and required outcome.",
      },
      {
        title: "Environment review",
        description: "Review accessible connectivity, physical infrastructure, available documentation, and ownership boundaries.",
      },
      {
        title: "Approved support",
        description: "Complete the agreed connectivity, device-readiness, infrastructure, or coordination activities.",
      },
      {
        title: "Verify and document",
        description: "Confirm the addressed scope, record completed work, and identify any separately owned follow-up items.",
      },
    ],
    related: ["troubleshooting", "server-infrastructure"],
    heroImage: "/images/field-work/network-equipment-integration.jpeg",
    heroImageAlt: "Client-supplied image of connected network, communications, and endpoint equipment.",
    heroObjectPosition: "50% 50%",
    detailImage: "/images/field-work/fiber-enclosure-conduit-wide.jpeg",
    detailImageAlt: "Client-supplied field image of a connected fiber pathway and enclosure.",
    detailObjectPosition: "50% 52%",
    referenceImage: "/images/editorial/it-support-reference.jpeg",
    referenceImageAlt: "IT technician working among network-rack cabling.",
    referenceObjectPosition: "50% 45%",
    scopeNote:
      "Supported devices, operating systems, applications, remote or on-site delivery, service windows, cybersecurity boundaries, response commitments, warranties, and managed-support terms require explicit client confirmation.",
  },
  {
    slug: "facility-locating",
    group: "technical-support",
    number: "14",
    navigationTitle: "Facility Locating",
    title: "Facility Locating Support",
    eyebrow: "Pre-work site coordination",
    description:
      "Project-specific locating and pre-work coordination for existing facility infrastructure and planned pathways, subject to confirmed methods and responsibilities.",
    overview: [
      "Locating requirements depend on the site, records, infrastructure owner, work area, proposed route, and the methods approved for the project. CTS Pacific can organize the initial review and field coordination around those confirmed conditions.",
      "The scope can include available-record review, visible access-point review, work-area and route coordination, locating-method confirmation, marking responsibility, and documentation. It does not replace required utility notifications, permits, owner clearances, or regulated locating unless those responsibilities are explicitly confirmed.",
    ],
    capabilities: [
      "Available-record review",
      "Work-area coordination",
      "Visible access-point review",
      "Proposed-route review",
      "Locating-method confirmation",
      "Marking-responsibility coordination",
      "Field documentation and handover",
    ],
    applications: [
      "Underground pathway planning",
      "Trenching work areas",
      "Conduit-route coordination",
      "Campus and facility infrastructure",
      "Renovation and expansion planning",
      "Pre-construction site review",
    ],
    process: [
      {
        title: "Request and records",
        description: "Confirm the site, proposed work, infrastructure owners, available records, and required notifications.",
      },
      {
        title: "Method and responsibility",
        description: "Define approved locating methods, utility types, mark-out ownership, permits, exclusions, and reporting needs.",
      },
      {
        title: "Field coordination",
        description: "Coordinate the agreed site review and locating activities within the authorized work area.",
      },
      {
        title: "Documentation and handoff",
        description: "Record the supported findings, limitations, markings, and required next steps for the project team.",
      },
    ],
    related: ["civil-underground", "micro-trenching"],
    heroImage: "/images/services 7.jpeg",
    heroImageAlt: "Client-supplied field image of an existing facility infrastructure environment.",
    heroObjectPosition: "50% 52%",
    detailImage: "/images/services 8.jpeg",
    detailImageAlt: "Client-supplied field image of exterior conduit and utility infrastructure.",
    detailObjectPosition: "50% 48%",
    referenceImage: "/images/editorial/facility-locating-reference.jpeg",
    referenceImageAlt:
      "Engineer using surveying equipment beside an exposed underground cable route.",
    referenceObjectPosition: "54% 52%",
    scopeNote:
      "The client must confirm supported locating methods and equipment, utility types, accuracy and reporting expectations, notification and permit responsibilities, mark-out ownership, exclusions, and whether regulated locating is included.",
  },
  {
    slug: "construction-equipment-rental",
    group: "equipment-rental",
    number: "15",
    navigationTitle: "Construction Equipment Rental",
    title: "Construction Equipment Rental",
    eyebrow: "Equipment aligned to the project",
    description:
      "Construction equipment rental coordinated for project requirements in Guam, with availability and rental arrangements confirmed for each request.",
    overview: [
      "CTS Pacific provides construction equipment rental for project requirements in Guam. Each request begins with the planned work, site conditions, schedule, and equipment need.",
      "Available equipment, rental duration, delivery or pickup, operator requirements, mobilization, deposits, insurance, and commercial terms are confirmed before a reservation is accepted. No specific equipment or availability is assumed online.",
    ],
    capabilities: [
      "Project-requirement intake",
      "Equipment-need coordination",
      "Site-condition review",
      "Schedule and duration review",
      "Availability confirmation",
      "Delivery and pickup coordination",
      "Rental-scope documentation",
    ],
    applications: [
      "Construction project support",
      "Civil and underground work",
      "Telecommunications pathway work",
      "Commercial project sites",
      "Industrial project environments",
      "Planned equipment requirements",
    ],
    process: [
      {
        title: "Define the requirement",
        description:
          "Share the project, work area, schedule, duration, and equipment need.",
      },
      {
        title: "Confirm the available fit",
        description:
          "Review the requested equipment category, site conditions, timing, and current availability.",
      },
      {
        title: "Agree the rental scope",
        description:
          "Confirm the equipment, duration, logistics, responsibilities, and commercial terms in writing.",
      },
      {
        title: "Coordinate handoff and return",
        description:
          "Organize the approved delivery or pickup and the documented return requirements.",
      },
    ],
    related: ["civil-underground", "micro-trenching"],
    heroImage: "/images/services 12.jpeg",
    heroImageAlt:
      "Client-supplied field image showing project vehicles and elevated-access equipment at a work site.",
    heroObjectPosition: "54% 55%",
    detailImage: "/images/services 13.jpeg",
    detailImageAlt:
      "Client-supplied field image showing work vehicles and equipment positioned within a controlled project area.",
    detailObjectPosition: "58% 54%",
    referenceImage: "/images/services 10.jpeg",
    referenceImageAlt:
      "Client-supplied field image of elevated-access equipment, safety cones, and staged project materials.",
    referenceObjectPosition: "56% 48%",
    scopeNote:
      "Specific equipment classes, models, availability, rental periods, rates, deposits, operator requirements, delivery or pickup, mobilization, insurance, damage, cancellation, and return terms require explicit confirmation for each request.",
  },
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDefinition) {
  return service.related
    .map((slug) => getServiceBySlug(slug))
    .filter((related): related is (typeof services)[number] => Boolean(related));
}
