import { fiberWorkGallery, type FieldPhoto } from "@/config/field-photography";
import manifest from "@/config/september-photography.json";
import type { ServiceSlug } from "@/modules/services/service-catalog";

type SuppliedPhoto = {
  filename: string;
  alt: string;
  caption: string;
  objectPosition?: string;
  preserveFrame?: boolean;
  preserveSource?: boolean;
};

function suppliedPhoto(photo: SuppliedPhoto): FieldPhoto {
  return {
    src: `/images/cts/september-2026/cts-pacific-${photo.filename}.${photo.preserveSource ? "jpeg" : "webp"}`,
    alt: photo.alt,
    caption: photo.caption,
    objectPosition: photo.objectPosition ?? "50% 50%",
    preserveFrame: photo.preserveFrame ?? false,
  };
}

export const septemberPhotography = Object.fromEntries(
  Object.entries(manifest).map(([key, value]) => [key, suppliedPhoto(value)]),
) as Record<keyof typeof manifest, FieldPhoto>;

export type PhotoGroup = {
  id: string;
  title: string;
  description: string;
  photos: readonly FieldPhoto[];
};

type ServiceGallery = {
  title: string;
  description: string;
  groups: readonly PhotoGroup[];
};

const p = septemberPhotography;
const networkConnections: PhotoGroup = {
  id: "network-connections",
  title: "Switching and patch connections",
  description: "Fiber panels, switch uplinks, and connected network equipment.",
  photos: [p.fiberPanel, p.opticalSwitch, p.distributionPanel, p.switchUplink, p.compactSwitch],
};
const recordingHardware: PhotoGroup = {
  id: "recording-hardware",
  title: "Inside the recording hardware",
  description: "A closer look at the chassis, storage, and internal connections of surveillance equipment.",
  photos: [p.recorderChassis, p.recorderBoard, p.recorderDrive],
};

// Groups describe visible systems, not named projects or additional service promises.
export const servicePhotography: Partial<Record<ServiceSlug, ServiceGallery>> = {
  "fiber-optics": {
    title: "The detail behind the connection.",
    description: "Splicing, termination, fiber management, and rack connections from the supplied photography. Select any image for a full view.",
    groups: [
      { id: "fiber-assembly", title: "Splicing and termination", description: "The supplied collage brings the stages together; individual views reveal the component details.", photos: [p.fiberCollage, ...fiberWorkGallery] },
      { ...networkConnections, photos: [p.fiberPanel, p.opticalSwitch, p.distributionPanel] },
    ],
  },
  "data-cabling": {
    title: "Connections, organized.",
    description: "A closer look at physical network connections and the equipment they support.",
    groups: [networkConnections],
  },
  cctv: {
    title: "From camera to monitoring.",
    description: "Explore camera hardware, installation settings, and monitoring views, organized by system detail. Select a photo to view the complete frame.",
    groups: [
      { id: "camera-equipment", title: "Camera equipment", description: "Camera hardware and a supplied installation collage.", photos: [p.cctvCollage, p.turretCamera, p.ceilingCameras] },
      { id: "interior-cameras", title: "Interior camera placement", description: "Camera positions across retail, storage, and other indoor settings.", photos: [p.retailCamera, p.cornerCamera, p.brickCamera, p.tiledCamera, p.storageCamera] },
      { id: "residential-cameras", title: "Residential installation details", description: "Exterior camera placement, cable entry, and an indoor monitoring display.", photos: [p.residentialCamera, p.cableEntry, p.homeMonitor] },
      { id: "monitoring-views", title: "Monitoring views", description: "Multi-camera and monochrome views from the supplied recording displays.", photos: [p.retailMonitor, p.retailMonitorWide, p.monochromeView] },
      recordingHardware,
    ],
  },
  troubleshooting: {
    title: "A closer look inside the system.",
    description: "Internal equipment photography complements project-specific hardware and connection reviews.",
    groups: [recordingHardware],
  },
  electrical: {
    title: "The pathways behind the systems.",
    description: "Conduit routing and junction-box details in the supplied exterior photography.",
    groups: [{ id: "exterior-pathways", title: "Exterior conduit routes", description: "From covered walls to rooftop pathways. Exact electrical scope remains project-specific.", photos: [p.canopyPathway, p.rooftopPathway, p.rooftopJunction] }],
  },
  "it-support": {
    title: "Where devices meet infrastructure.",
    description: "Workstations, network connections, and presentation equipment from the supplied images. Support is scoped around each system and project.",
    groups: [
      { id: "connected-workspaces", title: "Connected workspaces", description: "Workstation cabling and local network connections.", photos: [p.workstation, p.compactSwitch] },
      { id: "presentation-equipment", title: "Presentation equipment and pathways", description: "Ceiling-mounted equipment, mounting details, and the surrounding room. Platform and support coverage are confirmed per request.", photos: [p.presentationRoom, p.projectorMount, p.projector] },
    ],
  },
};
