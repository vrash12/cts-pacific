# CTS Pacific Service Slideshow — Continuation Prompt

Continue the CTS Pacific project in `C:\Users\MAURICIO\Documents\CTS`.

Read `AGENTS.md`, `SYSTEM_FEATURES_AND_FUTURE_ROADMAP.md`,
`CLIENT_CONTENT_REQUIRED.md`, and `IMAGE_LICENSES.md` completely before editing.
Inspect `git status`, `git diff`, and recent commits. Preserve every unrelated or
user-owned change. Do not rebuild work that is already present.

## Client request

The client requested a slideshow for the services. Reuse current CTS Pacific
images wherever possible and use licensed online images only for genuine gaps.
Store every approved web image locally; never hotlink it and never show image
source or credit links in the public interface.

## Implemented state

The homepage's existing six-service capabilities section is now an accessible,
responsive slideshow. The rest of the homepage remains server-rendered, while
the interaction is isolated in one small client component.

Implemented files:

- `src/components/marketing/services-slideshow.tsx`
- `src/app/(marketing)/page.tsx`
- `src/app/globals.css`
- `tests/unit/services-slideshow.test.tsx`
- `tests/e2e/homepage.spec.ts`

Implemented behavior:

- Six current locally stored homepage service images and service links
- Semantic slides that remain present in the HTML
- Native scroll-snap and touch/swipe support
- Previous, next, and direct numbered service controls
- Seven-second autoplay with a visible pause/play control
- Autoplay pauses on hover, keyboard focus, hidden documents, and while the
  section is offscreen
- An explicit Play action can resume rotation for a keyboard user
- Reduced-motion preference disables autoplay and nonessential motion
- Slide controls use scroll-container-relative coordinates so the active slide
  aligns correctly at desktop and mobile widths
- Accessible labels, live announcements for manual changes, focus styles, and
  stable responsive image sizing
- A follow-up desktop layout defect in the homepage Industries section was fixed
  by constraining that section's headline scale; the `01` index and Commercial
  label remain clear at the reported 1852px viewport
- A follow-up credential-card defect was fixed by constraining each logo grid
  track and image height; the tall GCA member mark no longer crosses into its
  text panel
- Primary navigation now exposes the active route with `aria-current`, a
  persistent technical-blue desktop underline, and a restrained active mobile
  row; Services remains active on its detail routes
- The Certifications-page GCA feature was rebalanced so the full Guam
  Contractors Association heading stays inside its navy panel at desktop and
  mobile widths

Do not install a carousel dependency unless this native implementation becomes
insufficient.

## Supporting image work

`public/images/editorial/facility-locating-reference.jpeg` is a licensed Pexels
image by Michael Singer and is mapped only to Facility Locating as representative
imagery. Its provenance is recorded privately in `IMAGE_LICENSES.md`. Do not call
it CTS Pacific project photography. Replace it when the client supplies approved
Facility Locating photography.

## Validation already completed

At the time this handoff was written:

- ESLint passed
- Strict TypeScript passed
- 24 Vitest files and 76 tests passed
- Production build passed and generated 23 static pages
- 48 Playwright checks passed across desktop and mobile Chromium
- Desktop and 390px mobile browser inspection passed
- Slide alignment measured within one pixel in the browser
- Browser console contained no warnings or errors

If any code changes after this handoff, rerun:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Remaining client decisions, not coding defects

- Approve the slideshow's final image selection and order
- Identify which supplied photographs are genuine CTS Pacific project work
- Supply replacement field photography for the gaps listed in
  `CLIENT_CONTENT_REQUIRED.md`
- Confirm that locally stored representative Pexels imagery may remain until
  approved CTS Pacific replacements are available

Before stopping, keep `SYSTEM_FEATURES_AND_FUTURE_ROADMAP.md`,
`CLIENT_CONTENT_REQUIRED.md`, `IMAGE_LICENSES.md`, and this file synchronized.
Do not invent services, projects, equipment ownership, licenses, pricing,
technical coverage, or client results.
