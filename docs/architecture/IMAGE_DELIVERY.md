# Image delivery

Public marketing pages serve prepared image files directly. Visitors no longer wait for the hosting image optimizer to create each local photo size on its first request.

## Preparation and cache updates

Run `pnpm images:prepare` after adding or replacing a local image. `pnpm dev`, `pnpm test`, and `pnpm build` run it automatically. No additional package or external image service is required; the preparation script uses the Sharp runtime supplied with Next.js.

Lifecycle scripts invoke the preparation script directly with `node`. Hostinger can install with pnpm while its build-script environment lacks a `pnpm` executable on PATH; a nested `pnpm images:prepare` prevented the September 6 image deployments from building. Calling Node directly removes that dependency. Hostinger's `NEXT_PUBLIC_SITE_URL` must be `https://ctspacific.com` before rebuilding so canonical URLs, robots.txt, and sitemap.xml use the public domain.

`scripts/prepare-image-delivery.mjs` reads the existing raster images in `public/images`, excluding its own output. It writes:

- Content-hashed original copies and smaller WebP variants to `public/images/delivery/` (ignored by Git, generated before deployment).
- The source-to-delivery mapping to `src/config/image-delivery.json` (tracked so imports resolve during lint and typechecking on a fresh checkout).

The recipe includes the source bytes, encoder version, and resize settings in each filename's hash. New content gets a new URL. Only `/images/delivery/*` receives a one-year immutable cache policy; document revalidation and existing security headers remain intact. Output preparation skips files that already exist and does not rewrite an unchanged manifest.

Generated variants use 256, 384, 640, 768, 960, 1280, 1600, and 1920 pixel widths, capped below the original width. Next's image breakpoints match these variants. Preparation removes obsolete generated files from its dedicated output directory after completing the current asset set.

Original photographs remain unchanged. Smaller copies are oriented, never enlarged, and encoded at quality 88. Original-sized requests use the original file rather than another lossy encoding. The two About images that explicitly preserve their originals still serve byte-identical JPEGs, now at hashed URLs.

## Rendering

`SiteImage` uses prepared local sizes through a custom Next.js image loader, retaining responsive `srcset`, native lazy loading, preload links, alt text, and layout dimensions. Unknown sources and future remote uploads retain Next's standard image behavior. Pages remain server-rendered; image discovery does not wait for hydration.

The header logo has an accurate display-size hint, avoiding a 2024-pixel image request for a 144–168-pixel display. Hero images are preloaded in the initial HTML. The hero photo and text no longer wait for entrance animations. Gallery images remain lazy-loaded; the service directory keeps its previously requested eager thumbnail loading. Existing menus, galleries, and interaction animations continue to work.

## Validation

Final validation passed: lint, strict TypeScript, 29 unit/integration test files (95 tests), and the production build. The full Playwright suite against the production server passed 113 checks; one desktop-only navigation check was intentionally skipped on mobile. A Windows file lock from the concurrent dev server interrupted one build; pausing that server allowed the unchanged build to complete successfully.

`tests/unit/image-delivery.test.tsx` checks asset existence, size selection, original preservation, matching responsive hero preloads, and fallback behavior. `tests/e2e/image-delivery.spec.ts` checks homepage, About, and CCTV hero loading with JavaScript disabled, zero runtime optimizer requests, absence of hero reveal delays, and appropriately sized logo downloads.

For delivery changes, also verify a production build with a cold browser cache and a throttled connection. Check the hashed image's `Cache-Control` response, the document's revalidation policy, responsive layouts, and the full-image viewer. Local timing measurements are comparisons under controlled conditions, not guarantees for every visitor's network or CDN region.

To run the browser suite against a production build, run `pnpm build`, start `pnpm exec next start -p 3001`, and set `PLAYWRIGHT_BASE_URL=http://localhost:3001` when running `pnpm test:e2e`. This uses the running production server instead of starting the development server and includes cache-policy assertions.

### September 6 local production comparison

Single cold-browser samples in Chromium, with 100 ms added latency and 1.6 Mbps download throttling. Desktop viewport: 1440px at 1× pixel density; mobile: 390px at 2×. “Hero ready” measures navigation start through image decode, including photos below the first viewport on mobile.

| Page / viewport | Hero ready before | Hero ready after |
| --- | ---: | ---: |
| Home / desktop | 3.83 s | 2.77 s |
| About / desktop | 3.51 s | 3.38 s |
| CCTV / desktop | 1.24 s | 1.11 s |
| Home / mobile | 4.22 s | 3.74 s |
| About / mobile | 3.02 s | 2.37 s |
| CCTV / mobile | 1.18 s | 1.27 s |

The desktop logo response fell from 131,700 to 10,868 bytes; the 2× mobile logo is 18,642 bytes. The sampled pages made zero `/_next/image` requests after the change, with no page errors or horizontal overflow. Timings vary; the small mobile CCTV difference does not support a speedup claim for that case. Production responses confirmed immutable hashed-image caching and unchanged HTML revalidation.

Reference: [Next.js image loading and custom loaders](https://nextjs.org/docs/app/api-reference/components/image), [default public-file caching](https://nextjs.org/docs/app/api-reference/file-conventions/public-folder).
