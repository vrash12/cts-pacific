# Hostinger runtime dependencies

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
