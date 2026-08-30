# Remaining Sales & Services — Completion Handoff

> Status updated: August 30, 2026

The task that originally lived in this file has been completed in the local working tree. Do not repeat it without first checking the current catalog and Git state.

## Public service implementation

The centralized service catalog now includes these project-specific public services:

- Telecommunication Specialist → `/services/telecommunication-specialist`
- IT Support → `/services/it-support`
- Facility Locating → `/services/facility-locating`

Each route uses conservative wording and a visible project-specific scope notice. Exact technical coverage remains tracked in `CLIENT_CONTENT_REQUIRED.md`.

## Presentation and imagery decisions

- Keep the desktop Services dropdown focused on the six core infrastructure services plus one “All services” link.
- Keep mobile navigation at the section level; do not repeat every service route there.
- Keep the footer concise with “All services,” quote, and contact paths instead of repeating the full catalog.
- The complete fourteen-service catalog belongs on `/services` and in the quote selector.
- Every service has a locally stored supporting image. Keep stock-reference labels, creator credits, and outbound source links out of the public interface.
- Preserve image provenance privately in `IMAGE_LICENSES.md`, update that register when imagery changes, and never describe supporting imagery as CTS Pacific field work.
- Preserve the restrained interaction system: fine-pointer hover effects, keyboard focus parity, short navigation and quote feedback, and the global reduced-motion override.

The following were intentionally not duplicated:

- Trenching & Excavation remains covered by Micro Trenching and Civil & Underground Works.
- Conduit & Pathway remains covered by Fiber Optics and Civil & Underground Works.

## Private equipment planning

The client-supplied labels below remain private, authenticated-admin planning items:

- Safety & Construction Equipment
- Heavy Equipment

They must not be exposed as public services, products, rentals, equipment inventory, or ownership claims until the client confirms:

- sale, rental, operated-equipment, subcontracted, or sourcing model;
- approved categories and individual items;
- ownership and operator responsibilities;
- transport, mobilization, scheduling, permits, insurance, and availability;
- products, brands, images, SKUs, prices, inventory, warranty, return, and rental terms where applicable.

Source of truth: `src/modules/products/sales-planning.ts` and `CLIENT_CONTENT_REQUIRED.md`.

## Continuation rules

Before any next change:

1. Read `AGENTS.md`, `SYSTEM_FEATURES_AND_FUTURE_ROADMAP.md`, and `CLIENT_CONTENT_REQUIRED.md` completely.
2. Inspect and preserve the dirty working tree.
3. Do not enable public ecommerce or create catalog facts that the client has not supplied.
4. Keep `NEXT_PUBLIC_ECOMMERCE_ENABLED=false` until the full commerce launch checklist is approved.
5. Run `pnpm check` and `pnpm test:e2e` after material changes.
