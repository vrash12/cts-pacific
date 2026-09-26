# Hostinger runtime dependencies

## Production build bundler

The September 26 deployment failed in Turbopack while creating the PostCSS
worker for `company-history.module.css`: the Node subprocess exited before
Turbopack could connect. Hostinger kept serving the previous successful build,
which did not include the CCTV equipment graphics.

The production build command uses `next build --webpack` to avoid this
host-specific Turbopack failure. Image preparation still runs before compilation.
Keep this option until Turbopack has been validated on the hosting environment.

## Runtime helpers

The September 12, 2026 production outage returned HTTP 500 for pages and
`robots.txt`, while static images remained available. Hostinger runtime logs
reported `Cannot find module '@swc/helpers/_/_interop_require_default'` when
Next.js loaded `next/dist/build/adapter/setup-node-env.external.js`.

Declare `@swc/helpers` as a production dependency, pinned to the version required
by the installed Next.js package (currently `0.5.23` for Next.js `16.3.3`). This
makes the helper available at the application root instead of relying solely
on the transitive dependency layout in Hostinger's deployed package. Keep the
lockfile committed and review this pin when upgrading Next.js.

After deployment, verify the homepage, a service page, `robots.txt`, and a
read-only GET to an API route. POST-only API routes should return HTTP 405 to
GET requests rather than a module-loading error. Do not submit test leads to
the production forms as a health check.
