# CTS client photography — September 2026

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
| opticalTransport | Optical transport rack | Telecommunications Specialist hero and index card |
| rackPathways | Racks and overhead fiber routing | Data Cabling and Server Infrastructure heroes; homepage slide |
| exhibition | Exhibition group photo | About: company moments |
| membership | GCA certificate presentation | About: company moments |
| nightTrencher | Wheel trencher at night | Construction Equipment Rental detail |
| dayTrencher | Vermeer RTX550 side view | Construction Equipment Rental hero and index card |
| retailLicense | Guam retail business license | Certifications: business documentation |
| supportLicense | Guam technical support services license | Certifications: business documentation |

## Image treatment and publication notes

- Website copies are auto-oriented, converted to WebP, resized without upscaling, and stripped of source metadata. Next.js also serves responsive optimized sizes. Detail/gallery images remain lazy-loaded. The finite service directory loads its 15 thumbnails eagerly; its eight new client-photo thumbnails are pre-sized to at most 960px wide and served directly to avoid hanging on-demand WebP conversions. Regenerate them with `node scripts/prepare-service-thumbnails.mjs` after replacing their originals.
- Fiber details have a six-photo gallery. About uses an asymmetric two-photo layout. Business licenses use uncropped, contained document previews. Gallery items link to their full website copies in a new tab.
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
