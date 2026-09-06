# CTS client photography — September 2026

## Hosted image delivery

Marketing images now use prepared responsive files with content-hashed URLs and long-lived browser/CDN caching. This avoids runtime resizing on first visits. The header logo requests an appropriate display size, and hero content appears without an entrance delay. Original-source treatment and image categorization below remain unchanged. Run `pnpm images:prepare` after replacing assets; it also runs automatically during development startup, tests, and production builds. See `docs/architecture/IMAGE_DELIVERY.md` for the pipeline and cache-update behavior.

## September 6 additional batch

All 31 images supplied in `C:\Users\MAURICIO\Downloads\new images` are represented in the site. Their exact source filenames, descriptive output names, captions, and alt text are mapped in `src/config/september-photography.json`. Service groups and placement are configured in `src/config/service-photography.ts`.

Website copies live in `public/images/cts/september-2026/`; directory thumbnails live in `public/images/cts/thumbnails/september-2026/`. Sources remain unchanged. Full copies total approximately 3.82 MB. Thirty images are auto-oriented, resized without enlargement, converted to WebP, and stripped of source metadata. The coastal photo retains its original, metadata-free JPEG to avoid another lossy conversion.

| Registry keys | Placement |
| --- | --- |
| cctvCollage, turretCamera, ceilingCameras | CCTV: camera equipment; turret camera also replaces the representative service-directory image |
| retailCamera, cornerCamera, brickCamera, tiledCamera, storageCamera | CCTV: interior camera placement; corner camera also appears in the service hero and homepage slideshow |
| residentialCamera, cableEntry, homeMonitor | CCTV: residential installation details; exterior camera also appears in the applications section |
| retailMonitor, retailMonitorWide, monochromeView | CCTV: monitoring views |
| recorderChassis, recorderBoard, recorderDrive | CCTV and Troubleshooting: recording hardware; selected images replace the Troubleshooting hero, applications, and directory image |
| fiberCollage | Fiber Optics: splicing and termination, alongside all six existing detail images |
| fiberPanel, opticalSwitch, distributionPanel | Fiber Optics and Data Cabling: rack connections; optical switch also appears in the Telecommunication Specialist directory card |
| switchUplink, compactSwitch | Data Cabling: network connections; compact switch also appears under IT Support |
| canopyPathway, rooftopPathway, rooftopJunction | Electrical: exterior conduit routes |
| workstation | IT Support: connected workspaces |
| presentationRoom, projectorMount, projector | IT Support: presentation equipment and pathways |
| coastline | About: regional-focus image and descriptive coastal caption |

Grouped images remain organized by visible systems rather than assumed project identities. Both collages, monitoring screens, and detailed rack views use contained previews and open uncropped in the existing accessible photo viewer. Individual installation photos use subject-specific framing.

No client names, installation dates, project outcomes, equipment ownership, product availability, or new service promises are inferred. Some source monitoring displays show historical dates; these are not presented as CTS Pacific project dates. Presentation equipment is shown within project-specific IT Support, without adding an AV service or platform-support commitment. The beach image provides regional context rather than a project claim.

Regenerate this batch with:

```powershell
node scripts/prepare-september-photography.mjs "C:\Users\MAURICIO\Downloads\new images"
```

Validation: `pnpm check` passed with 28 test files / 91 tests and a successful production build. The full browser run passed 104 checks and intentionally skipped one desktop-only check on mobile; its one gallery timing failure was fixed by enabling viewer buttons only after hydration. All 18 gallery/collage checks then passed across desktop and mobile. Visual review included 1440px desktop, 820px tablet, and 390px mobile. Asset inspection confirmed 31 full images and 31 thumbnails, with no EXIF, ICC, or XMP metadata in the full website copies.

## About image quality correction

The About hero vehicle photo (1280 × 720) and regional coastal photo (1290 × 952) now retain their source aspect ratios instead of filling tall portrait frames. Both are served directly at original JPEG quality; the regional caption sits below the image, and decorative image scaling is disabled for these two placements. The beach website copy is byte-identical to the supplied `beach.jpeg` (approximately 160 KB). Its remaining softness is in the supplied source. Mobile hero typography also keeps the long heading readable without splitting “Infrastructure.”

Rebuild only the coastal copy with `node scripts/prepare-september-photography.mjs "C:\Users\MAURICIO\Downloads\new images" coastline`. The script checks preserved JPEGs for orientation and source metadata before copying them. Gallery and directory thumbnails retain their separate size-optimized treatment.

Validation after the quality correction: `pnpm check` passed (lint, strict TypeScript, 91 tests, production build). All 58 company-page and client-photography Playwright checks passed across desktop and mobile. Visual review at 1680px, 820px, and 390px confirmed direct original-image loading, native proportions, no horizontal overflow, and no page errors. SHA-256 verification confirmed the published coastal JPEG matches its supplied source.

## Original 25-image batch

All 25 reviewed images from `C:\Users\MAURICIO\Downloads\cts images` are represented in the website. Original Downloads files remain unchanged. Website assets live in `public/images/cts/`; descriptive filenames are retained with `.webp` extensions. The registry, alt text, and captions are in `src/config/field-photography.ts`.

## Placement guide

| Registry key | Image subject | Primary placement |
| --- | --- | --- |
| wallCabinet | Wall cabinet and ceiling cabling | Server Infrastructure and IT Support detail |
| networkRoom | Racks and patch-panel cabinet | Data Cabling detail inset and service-index card |
| openClosure | Open splice closure | Fiber Optics applications |
| spliceSleeves | Protective splice sleeves | Fiber Optics field gallery |
| fusionSplicer | Open fusion-splicer clamps | Fiber Optics field gallery |
| fiberRouting | Fiber routing detail | Fiber Optics field gallery |
| coveredClosure | Covered closure, top view | Fiber Optics gallery; Telecommunications detail |
| compactTray | Color-coded fiber tray | Fiber Optics detail inset and service-index card |
| terminationBox | Termination box and orange conduit | Fiber Optics field gallery |
| angledClosure | Covered closure, angled view | Fiber Optics hero; homepage service slide |
| cableCoils | Cable coils beside a handhole | Civil Works inset; Fiber Optics field gallery |
| conduitTrench | Blue conduit and trench | Civil Works hero; homepage service slide |
| switchCabinet | Network switch and patch panels | Data Cabling detail; Server Infrastructure inset |
| router | Broadband router, sanitized copy | IT Support hero and index card |
| doorwayConduit | Conduit above a roll-up door | Electrical hero and index card |
| junctionBoxes | Junction boxes and conduit | Electrical detail |
| handhole | Handhole beside sidewalk | Civil Works detail |
| opticalTransport | Optical transport rack | Telecommunications Specialist hero |
| rackPathways | Racks and overhead fiber routing | Data Cabling and Server Infrastructure heroes; homepage slide |
| exhibition | Exhibition group photo | About: company moments |
| membership | GCA certificate presentation | About: company moments |
| nightTrencher | Wheel trencher at night | Construction Equipment Rental detail |
| dayTrencher | Vermeer RTX550 side view | Construction Equipment Rental hero and index card |
| retailLicense | Guam retail business license | Certifications: business documentation |
| supportLicense | Guam technical support services license | Certifications: business documentation |

## Image treatment and publication notes

- Website copies are auto-oriented, converted to WebP, resized without upscaling, and stripped of source metadata. Next.js also serves responsive optimized sizes. Detail/gallery images remain lazy-loaded. The finite service directory loads its 15 thumbnails eagerly; its eight new client-photo thumbnails are pre-sized to at most 960px wide and served directly to avoid hanging on-demand WebP conversions. Regenerate them with `node scripts/prepare-service-thumbnails.mjs` after replacing their originals.
- The original six fiber-detail images remain in the expanded Fiber Optics gallery. About uses an asymmetric two-photo layout. Business licenses use uncropped, contained document previews. Gallery items open their full website copies in an accessible on-page viewer.
- The exhibition source is an IT&E social screenshot. Its IT&E watermark and attribution are retained. The display frame excludes only the app header; the full website asset retains it. Source ownership/permissions remain with their respective holders; no new rights are asserted.
- Both license images are presented as supplied Guam **business licenses**, not contractor licenses or technical certifications. No new online retail storefront is enabled. Both supplied documents show expiration January 31, 2027; request updated copies before that date.
- Equipment images illustrate the service; they do not establish equipment ownership, rental inventory, pricing, or availability. Existing request-specific rental terms remain intact. The RTX550 is not substituted for the micro-trenching photo.
- No invented client names, project outcomes, dates, or identities are added to photographic captions.

## Router privacy edit

The source router photograph contains a credential sticker and QR code. That original was **not copied into public assets**. An image-editing tool removed the sticker from a separate copy before optimization. No raw credential value is recorded here.

Generated source: `C:\Users\MAURICIO\.codex\generated_images\01a04ca3-da87-7233-9176-78258dfde05a\exec-1186513f-7240-48aa-941c-154e940b6905.png`

Edit prompt: Remove the entire white rectangular credential sticker, including all text and the QR code, replacing it with the same matte black router surface. Preserve the hardware, cables, indicator lights, background, framing, and lighting; do not add hardware or text.

Publication asset: `public/images/cts/cts-pacific-broadband-router.webp`.

To rebuild these website copies, run `node scripts/prepare-client-photography.mjs` with the original source directory, the sanitized router image, and the output directory as its three arguments. Do not substitute the credential-labeled original for the sanitized image.
