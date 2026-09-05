export type FieldPhoto = {
  src: string;
  alt: string;
  caption: string;
  objectPosition?: string;
};

// These finite directory thumbnails are pre-sized, avoiding a second WebP
// conversion at request time. Other imagery keeps the Next.js optimizer.
export function directoryImage(src: string) {
  const prepared = src.startsWith("/images/cts/");
  return {
    src: prepared ? src.replace("/images/cts/", "/images/cts/thumbnails/") : src,
    unoptimized: prepared,
  };
}

function photo(filename: string, alt: string, caption: string, objectPosition = "50% 50%"): FieldPhoto {
  return { src: `/images/cts/${filename}.webp`, alt, caption, objectPosition };
}

export const fieldPhotography = {
  wallCabinet: photo("cts-pacific-network-cabinet-wall-mounted-ceiling-cabling", "Wall-mounted network cabinet with cabling routed above the ceiling.", "Cabinet and ceiling pathways"),
  networkRoom: photo("cts-pacific-network-racks-and-patch-panel-cabling", "Floor-standing network rack and wall-mounted patch-panel cabinet in a communications room.", "Communications-room integration"),
  openClosure: photo("cts-pacific-fiber-splice-closure-open-overview", "Open fiber splice closure with organized fibers and red protective sleeve holders.", "Inside the splice closure"),
  spliceSleeves: photo("cts-pacific-fiber-splice-tray-protective-sleeves-closeup", "Close-up of red protective splice-sleeve holders inside a fiber tray.", "Splice protection, in detail"),
  fusionSplicer: photo("cts-pacific-fiber-fusion-splicer-clamps-closeup", "Fusion splicer with its fiber alignment clamps open.", "Fusion-splicing equipment"),
  fiberRouting: photo("cts-pacific-fiber-splice-closure-fiber-routing-detail", "Colored fibers routed around a splice tray and into protective sleeve holders.", "Fiber routing and organization"),
  coveredClosure: photo("cts-pacific-fiber-splice-closure-clear-cover-top-view", "Top view of a fiber splice closure with a transparent protective cover.", "Protective closure assembly"),
  compactTray: photo("cts-pacific-fiber-splice-tray-color-coded-fibers", "Compact black splice tray containing color-coded fibers and red splice protectors.", "Color-coded fiber management"),
  terminationBox: photo("cts-pacific-fiber-termination-box-wall-mounted-orange-conduit", "Wall-mounted fiber termination box connected to orange protective conduit.", "Termination and conduit interface"),
  angledClosure: photo("cts-pacific-fiber-splice-closure-clear-cover-angled-view", "Angled view of a fiber splice closure with its transparent cover fitted.", "Fiber closure assembly"),
  cableCoils: photo("cts-pacific-fiber-cable-coils-at-underground-handhole", "Coiled black fiber cable beside an outdoor underground handhole.", "Cable staging at the handhole"),
  conduitTrench: photo("cts-pacific-underground-conduit-blue-coil-and-trench", "Blue conduit coil beside a narrow excavated soil pathway.", "Underground conduit preparation"),
  switchCabinet: photo("cts-pacific-network-rack-wall-mounted-switch-and-patch-panels", "Open wall-mounted network rack with a switch, patch panels, and connected cabling.", "Switch and patch-panel integration"),
  router: photo("cts-pacific-broadband-router", "Black broadband router with connected cables and front indicator lights.", "Connected-device infrastructure"),
  doorwayConduit: photo("cts-pacific-metal-conduit-routing-above-roll-up-door", "Metal conduit routed above a warehouse roll-up door.", "Overhead conduit routing"),
  junctionBoxes: photo("cts-pacific-wall-mounted-junction-boxes-and-metal-conduit", "Wall-mounted gray junction boxes connected by metal conduit.", "Junction boxes and pathways"),
  handhole: photo("cts-pacific-underground-handhole-installation-beside-sidewalk", "Underground handhole set into an excavated area beside a concrete sidewalk.", "Handhole installation"),
  opticalTransport: photo("cts-pacific-optical-transport-equipment-fiber-patch-connections", "Rack-mounted optical transport equipment connected with yellow fiber patch cables.", "Optical transport connections"),
  rackPathways: photo("cts-pacific-network-racks-overhead-cable-trays-yellow-fiber-routing", "Network racks beneath overhead cable trays and yellow fiber-routing channels.", "Racks, trays, and fiber pathways", "50% 38%"),
  exhibition: photo("cts-pacific-exhibition-booth-group-photo-social-screenshot", "Group at an exhibition booth with CTS Pacific and VCE Pacific banners, in an IT&E social photograph.", "CTS Pacific at the exhibition booth · IT&E photo", "50% 100%"),
  membership: photo("cts-pacific-gca-membership-certificate-presentation-group-photo", "Group holding Guam Contractors Association membership certificates, including the CTS Pacific certificate.", "Guam Contractors Association membership presentation"),
  nightTrencher: photo("cts-pacific-wheel-trencher-with-person-night-photo", "Person standing beside a yellow wheel trencher photographed at night.", "Wheel-trenching equipment"),
  dayTrencher: photo("cts-pacific-vermeer-rtx550-trencher-side-view", "Side view of a yellow Vermeer RTX550 trencher outdoors.", "Vermeer RTX550 trencher"),
  retailLicense: photo("cts-pacific-guam-business-license-retail-electronics-tools-construction-equipment", "Guam retail business license issued to Corerin Technical Solutions LLC for electronics and accessories, tools, and safety/construction equipment.", "Retail business license"),
  supportLicense: photo("cts-pacific-guam-business-license-technical-support-services", "Guam service business license issued to Corerin Technical Solutions LLC for technical support services.", "Technical support services business license"),
} as const;

export function serviceImages(hero: FieldPhoto, detail: FieldPhoto, reference: FieldPhoto) {
  return {
    heroImage: hero.src,
    heroImageAlt: hero.alt,
    heroObjectPosition: hero.objectPosition ?? "50% 50%",
    detailImage: detail.src,
    detailImageAlt: detail.alt,
    detailObjectPosition: detail.objectPosition ?? "50% 50%",
    referenceImage: reference.src,
    referenceImageAlt: reference.alt,
    referenceObjectPosition: reference.objectPosition ?? "50% 50%",
  };
}

export const fiberWorkGallery = [
  fieldPhotography.fusionSplicer,
  fieldPhotography.spliceSleeves,
  fieldPhotography.fiberRouting,
  fieldPhotography.coveredClosure,
  fieldPhotography.terminationBox,
  fieldPhotography.cableCoils,
] as const;

export const companyPhotography = [fieldPhotography.exhibition, fieldPhotography.membership] as const;
export const businessLicensePhotography = [fieldPhotography.retailLicense, fieldPhotography.supportLicense] as const;
