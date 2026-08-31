# CTS Pacific — System Features and Future Roadmap

> Durable handoff document for future developers and AI agents.
>
> Last reviewed: August 30, 2026  
> Repository: `https://github.com/vrash12/cts-pacific`  
> Latest pushed commit at the time of this review: `81ead94` (`Add secure commerce admin foundation`)

## 1. Instructions for the next AI or developer

Before changing the application:

1. Read `AGENTS.md` completely. It is the authoritative product, content, security, architecture, accessibility, and quality specification.
2. Read this file to understand what is complete, partial, dormant, or missing.
3. Read `CLIENT_CONTENT_REQUIRED.md`. Do not invent any missing business information.
4. Inspect `git status`, the active branch, and recent commits before editing. Preserve unrelated user changes.
5. Inspect `.env.example`, but never expose or commit `.env.local` or production secrets.
6. Continue the modular-monolith architecture. Do not replace the project with a new template or rewrite working sections without a concrete reason.
7. Run proportionate validation after every implementation increment. Before a production handoff, run `pnpm check` and the relevant Playwright tests.

Status terminology used in this document:

- **Implemented** — code and interface exist.
- **Implemented, configuration required** — code exists but needs external credentials or infrastructure.
- **Foundation only** — schema, types, or UI placeholders exist, but the workflow is not functional end to end.
- **Not implemented** — do not describe it to the user or client as complete.
- **Intentionally hidden** — code may exist, but it must not appear publicly yet.

## 2. Product and business facts

Company:

- Legal name: Corerin Technical Solutions, LLC
- DBA: CTS Pacific
- Confirmed company start: January 2026
- Organization President: Saren F. Formento
- Coverage wording currently approved for the website: Guam & Pacific Region
- Email: `info@corerintechnicalsolutions.com`
- Phone: `(671) 480-6979`
- Phone: `(671) 777-6436`

Organization positions still awaiting names and profiles:

- Technician
- Fiber Technician
- Construction Technician

Core service areas:

- Fiber optics
- Data cabling
- CCTV systems
- Access control
- Micro trenching
- Civil and underground works

Additional project-specific service categories supplied by the client:

- Troubleshooting
- Maintenance
- PBX systems
- Electrical infrastructure support
- Server infrastructure
- Telecommunication Specialist
- IT Support
- Facility Locating

The additional categories are implemented with conservative, project-specific wording. Their exact platform coverage, maintenance terms, licensing boundaries, and support responsibilities remain tracked in `CLIENT_CONTENT_REQUIRED.md`.

Additional equipment labels supplied by the client:

- Safety & Construction Equipment
- Heavy Equipment

These are represented only in the authenticated admin workspace as client-detail-required planning items. They are not public services, product claims, inventory records, rental offers, or equipment-ownership claims. The client must confirm the commercial model and approved categories before catalog records are created.

Initial future product categories explicitly requested by the client:

- Cameras
- Electronics
- Construction Equipment

Future payment methods explicitly requested by the client:

- PayPal
- Credit or debit card

The current architecture assumes card payments may use PayPal Advanced Card Payments and provider-hosted card fields. This must be confirmed with the client and depends on PayPal merchant eligibility. If the client chooses another card processor, add it as a separate provider only after that decision is confirmed.

## 3. Technology and architecture

The application is a Next.js App Router modular monolith.

- Next.js 16
- React 19
- TypeScript strict mode
- Tailwind CSS 4
- React Hook Form
- Zod
- PostgreSQL through Supabase
- Drizzle ORM
- Supabase Auth and Supabase Storage architecture
- Resend-compatible transactional email abstraction
- Vitest and React Testing Library
- Playwright
- pnpm
- GitHub Actions CI

Architectural boundaries:

- `src/app/(marketing)` — public marketing pages
- `src/app/admin` — administration UI and login
- `src/app/api` — HTTP route handlers
- `src/components` — reusable UI and interaction components
- `src/modules` — domain behavior and queries
- `src/server` — authentication, database, email, payments, and security
- `src/config` — typed public and server configuration
- `src/schemas` — Zod input schemas
- `drizzle/migrations` — reviewed database migrations
- `tests` — unit, integration, and end-to-end coverage

Important implementation rules:

- Prefer React Server Components. Add `"use client"` only for browser interaction.
- All administrative authorization must be enforced on the server.
- Never trust product prices, order totals, roles, inventory, or payment status from the browser.
- Store money as integer minor units, never floating-point values.
- Never store card numbers, security codes, or other raw payment credentials.
- Keep commerce disabled publicly until the complete launch checklist is satisfied.

## 4. Current public routes

Implemented public routes:

- `/`
- `/about`
- `/services`
- `/services/fiber-optics`
- `/services/data-cabling`
- `/services/cctv`
- `/services/access-control`
- `/services/micro-trenching`
- `/services/civil-underground`
- `/services/troubleshooting`
- `/services/maintenance`
- `/services/pbx-systems`
- `/services/electrical`
- `/services/server-infrastructure`
- `/services/telecommunication-specialist`
- `/services/it-support`
- `/services/facility-locating`
- `/industries`
- `/certifications`
- `/contact`
- `/quote`

Implemented dynamic/server routes:

- `POST /api/contact-submissions`
- `POST /api/quote-requests`
- `/admin`
- `/admin/login`
- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/leads`
- `/admin/leads/quotes`
- `/admin/leads/quotes/[id]`
- `/admin/leads/contacts`
- `/admin/leads/contacts/[id]`

Routes not currently implemented:

- `/projects`
- `/projects/[slug]`
- `/privacy`
- `/terms`
- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`
- `/admin/orders`
- PayPal API routes

The Projects section and route were removed from the visible site following the user's request. Do not restore them unless the user explicitly asks.

## 5. Implemented public website features

### 5.1 Global presentation

- Premium navy, blue, teal, white, and neutral design-token system
- Manrope headings and Inter body typography through `next/font`
- Responsive desktop, tablet, and mobile layouts
- Sticky site header
- Responsive navigation
- Accessible skip link and focus styles
- Reduced-motion support
- CTS Pacific logo from `public/images/logo.png`
- Professional footer with a concise project-start menu, company links, and contact details
- The earlier bottom legal/privacy strip was removed following the user's request
- Repeated decorative node-line motifs were removed because they resembled unfinished progress indicators
- Dark quote sections now use a content-bearing four-stage project-intake preview
- The About regional-focus section uses a full-height client-supplied field image with an explicit caption
- Navigation panels, directional arrows, form-step feedback, selectable quote options, and interactive cards use restrained microinteractions
- Hover-only effects are limited to fine pointers, keyboard focus receives equivalent card feedback, and reduced-motion preferences collapse animation and transition timing

### 5.2 Navigation interaction

- Curated Services dropdown with the six core infrastructure links and one clear “All services” path; the complete fourteen-service catalog is intentionally kept on `/services`
- Dropdown closes immediately when “All services” or any service option is selected
- Escape closes the dropdown and restores focus to the summary control
- Mobile navigation closes on link activation, route changes, and Escape instead of persisting after navigation
- Desktop and mobile navigation panels use a subtle 190ms entrance animation when reduced motion is not requested
- The current route is identified with `aria-current`; desktop navigation keeps the technical-blue underline visible, while mobile navigation uses a restrained teal rail and tinted row
- Section routes remain active on their detail pages, including Services across every `/services/*` route
- Products are absent from desktop and mobile navigation while commerce is disabled

### 5.3 Homepage

The homepage includes:

- Editorial split hero
- Request-a-quote and capability calls to action
- Certification and service-area credibility line
- Trust bar
- Supplied GTA and IT&E customer marks
- Accessible six-service slideshow using the current locally stored CTS Pacific imagery
- Native touch/swipe scrolling, previous/next controls, numbered service selectors, and explicit pause/play
- Seven-second autoplay that pauses on hover, keyboard focus, hidden tabs, and while the section is offscreen
- Reduced-motion handling that disables autoplay and removes nonessential transition motion
- Interactive project-needs navigator
- Technical-capability section
- Micro-trenching feature
- Why CTS Pacific pillars
- Commercial, Government, Industrial, and Residential sectors
- GCA membership certificate plus GCA, FOA, ETA Certified FOI, and ETA International supplied artwork
- Responsive GCA membership feature with the full Guam Contractors Association name contained inside its navy information panel
- Final project quote call to action
- Subtle microinteractions and restrained motion

### 5.4 Company pages

- About page with confirmed January 2026 start
- Organization President Saren F. Formento
- Clearly marked pending technician profiles
- Industries page
- Certifications page
- Contact page
- Breadcrumb structured data on relevant pages

Do not turn pending team roles into invented people or biographies.

### 5.5 Service pages

Each of the fourteen service routes uses a detailed editorial service layout with:

- Service hero
- Technical overview
- Capabilities
- Applications
- Process
- Related capabilities
- Quote call to action

Long service and technical-overview headings use responsive grid and typography safeguards so they remain inside their columns at desktop and mobile widths.

The service catalog is centralized in `src/modules/services/service-catalog.ts`.

Core routes:

- `/services/fiber-optics`
- `/services/data-cabling`
- `/services/cctv`
- `/services/access-control`
- `/services/micro-trenching`
- `/services/civil-underground`

The Access Control route includes a dedicated VCE Pacific partner module for
hotel-lock project coordination. The supplied VCE Pacific logo is stored locally,
the partner website opens as an external resource, and project-specific product,
installation, warranty, and support responsibilities remain explicitly subject to
confirmation.

Additional project-specific routes:

- `/services/troubleshooting`
- `/services/maintenance`
- `/services/pbx-systems`
- `/services/electrical`
- `/services/server-infrastructure`
- `/services/telecommunication-specialist`
- `/services/it-support`
- `/services/facility-locating`

### 5.6 Images

- Client-supplied field photography is stored locally in `public/images`
- Client-supplied customer logos are in `public/images/customer`
- Client-supplied membership and credential artwork is used in the site
- Supplemental service imagery is stored locally and does not hotlink third-party assets
- Image provenance and licensing remain in the internal `IMAGE_LICENSES.md` register and are not rendered on the public website
- Public service pages show the imagery without stock-reference labels, creator credits, or outbound source links
- Facility Locating uses a locally stored, licensed Pexels surveying image as representative imagery until approved CTS Pacific photography is supplied

Supporting imagery must never be described as CTS Pacific project work.

## 6. Quote workflow

Status: **Implemented, configuration required**.

The `/quote` page includes a professional segmented intake experience:

- Service selection
- Project location
- Project type
- Target timeline
- Project description
- Name
- Company
- Email
- Phone
- Client-side and server-side validation
- Accessible error and success states
- Submission ID for idempotent retry behavior
- Honeypot field

The API currently provides:

- Zod validation
- Basic in-memory rate limiting
- Honeypot handling
- PostgreSQL persistence through Drizzle
- Unique request/reference identifiers
- Internal quote notification email
- Customer quote confirmation email
- Resend idempotency keys
- Safe 503 response when database or email configuration is missing

Required environment configuration before quote submission works in deployment:

- `DATABASE_URL`
- `EMAIL_API_KEY`
- `EMAIL_FROM`
- `CONTACT_NOTIFICATION_EMAIL`
- `QUOTE_NOTIFICATION_EMAIL`

Known remaining quote work:

- Configure real Supabase database and apply migrations
- Configure and verify the sending domain in Resend
- Add distributed/serverless-safe rate limiting
- Configure Turnstile or another approved bot-protection service
- Add optional attachments after the client confirms file types, size, and retention policy
- Add integration and Playwright tests against isolated non-production resources

## 7. Administration status

Status: **Private product and category CRUD implemented in code; external configuration and additional operational modules remain incomplete**.

Implemented:

- `/admin/login` interface
- Supabase email/password sign-in client
- Supabase session-refresh proxy for `/admin/:path*`
- Server-side `requireAdmin()` authorization boundary
- Active admin profile verification
- One administrator account type: `ADMIN`
- Fail-closed setup screen when Supabase or the database is not configured
- Access-denied screen for authenticated users without an active admin profile
- Responsive admin shell and sign-out control
- Read-only commerce readiness dashboard
- Catalog counts by product status
- Cameras, Electronics, and Construction Equipment category summary
- PayPal and card configuration-readiness summary
- Public storefront-hidden indicator
- `noindex, nofollow` metadata for admin pages
- `/admin/products` private catalog list with status, category, SKU, price, and inventory summary
- `/admin/products/new` draft-product creation
- `/admin/products/[id]/edit` product editing
- Recoverable archive and restore-to-draft actions; no hard-delete shortcut
- Exact decimal-to-integer-minor-unit price conversion
- Accessible client-side and server-side Zod validation
- Duplicate product slug and SKU error mapping
- Optimistic edit-conflict detection with a locked product row
- Server-side catalog checks inside every query and mutation
- Full catalog-management access for the authenticated `ADMIN`
- Transactional audit records for product create, update, archive, and restore actions
- `/admin/categories` private category list
- `/admin/categories/new` category creation
- `/admin/categories/[id]/edit` category editing
- Recoverable category archive and restore actions; no hard-delete shortcut
- Active-category enforcement for new and edited products
- Existing product history remains attached when a category is archived
- Transactional audit records for category create, update, archive, and restore actions
- Responsive administration navigation and product form
- Server-authorized lead-management access for the authenticated `ADMIN`
- Lead dashboard counts for quote requests and contact inquiries
- Filterable quote-request and contact-inquiry inboxes
- Full lead detail views with direct email and phone actions
- Audited `NEW`, `REVIEWING`, `CONTACTED`, and `CLOSED` status workflows

Not implemented:

- No real Supabase project is configured in the repository
- No `.env.local` is present
- No initial Auth administrator has been created
- The commerce migration has not been confirmed as applied to a real database
- No product publishing workflow or public product routes
- No permanent product deletion workflow
- No product-image upload UI or Supabase Storage integration
- No inventory adjustment workflow
- No order administration UI
- No audit-log interface

Do not call the admin feature “complete” until the CRUD workflows, external configuration, authorization tests, and operational screens are implemented.

## 8. Commerce and payments status

Status: **Database and UI foundation only; intentionally hidden publicly**.

Feature flags:

```env
NEXT_PUBLIC_ECOMMERCE_ENABLED=false
PAYPAL_CARD_PAYMENTS_ENABLED=false
```

The public site must keep these disabled until launch readiness is explicitly approved.

Implemented database entities:

- `product_categories`
- `products`
- `product_variants`
- `product_images`
- `orders`
- `order_items`
- `payments`
- `payment_events`
- `admin_profiles`

Implemented constraints include:

- UUID primary keys
- Product status: `DRAFT`, `PUBLISHED`, `ARCHIVED`
- Unique product slugs and variant SKUs
- Non-negative integer minor-unit prices
- Three-letter currency checks
- Non-negative inventory
- Order-total reconciliation
- Order-item line-total reconciliation
- Unique payment idempotency key
- Unique provider order and capture IDs
- Unique provider event ID for duplicate-webhook protection
- RLS enabled on admin and commerce tables
- Initial Cameras, Electronics, and Construction Equipment category seeds

Implemented payment architecture:

- Payment choices defined as PayPal and Credit/Debit Card
- Both currently route conceptually through the PayPal provider architecture
- Provider-agnostic server interface exists
- Environment readiness checks exist
- Payment-method UI returns nothing while ecommerce is disabled

Not implemented:

- Public product catalog
- Product detail pages
- Search, filters, or sorting
- Cart and cart persistence
- Checkout
- Customer and address model implementation
- Shipping or pickup logic
- Tax calculation
- Discount or coupon logic
- Authoritative order-creation command
- PayPal access-token integration
- `POST /api/paypal/create-order`
- `POST /api/paypal/capture`
- `POST /api/paypal/webhook`
- Webhook signature verification
- Live PayPal button
- Live hosted card fields
- Payment emails
- Refund workflow
- Order/customer administration

## 9. Database and migrations

Current migrations:

- `0000_colorful_iron_patriot.sql` — quote requests and quote-request services
- `0001_bizarre_loners.sql` — admin profiles, initial commerce categories, products, variants, images, orders, payments, payment events, constraints, and RLS setup
- `0002_gigantic_wraith.sql` — immutable catalog audit-log storage, indexes, foreign key, and RLS enablement
- `0003_dizzy_nemesis.sql` — contact-submission storage, indexes, constraints, status and inquiry enums, and RLS enablement
- `0004_add_cameras_category.sql` — idempotent private Cameras category seed requested by the client
- `0005_single_admin_role.sql` — converts legacy administrator roles to the single `ADMIN` account type without deleting profiles

Migration commands:

```powershell
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

`DATABASE_URL` is required for all Drizzle commands.

For a serverless deployment using Supabase, use the Supavisor transaction-pooler connection string for application runtime. Use an appropriate direct or session connection for migrations when required by the environment. Prepared statements are already disabled in the runtime PostgreSQL client.

Before applying a migration to a shared or production database:

1. Confirm the target database and environment.
2. Back up production data when applicable.
3. Review generated SQL.
4. Never run migrations against production merely to test them.

## 10. Environment contract

Public values:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ECOMMERCE_ENABLED=false
```

Server-only values:

```env
DATABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=
PAYPAL_ENVIRONMENT=sandbox
PAYPAL_CARD_PAYMENTS_ENABLED=false

EMAIL_API_KEY=
EMAIL_FROM=CTS Pacific <quotes@your-verified-domain.com>
CONTACT_NOTIFICATION_EMAIL=info@corerintechnicalsolutions.com
QUOTE_NOTIFICATION_EMAIL=info@corerintechnicalsolutions.com

TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

AI_API_KEY=
```

Security rules:

- Never prefix server secrets with `NEXT_PUBLIC_`.
- Never commit `.env.local`.
- Never send the Supabase service-role key to the browser.
- Never log PayPal secrets, database credentials, or email API keys.
- Secrets must be configured separately for local, preview, and production environments.

## 11. Local development and validation

Install and run:

```powershell
cd "C:\Users\MAURICIO\Documents\CTS"
corepack enable
pnpm install
pnpm dev
```

Open:

- Public site: `http://localhost:3000`
- Admin setup/login: `http://localhost:3000/admin`

Validation commands:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Full CI command:

```powershell
pnpm check
```

GitHub Actions currently runs install, lint, typecheck, unit/integration tests, and build on pushes to `main` and pull requests.

Most recent validation after the active-navigation and GCA certificate-layout increment:

- ESLint passed
- Strict TypeScript passed
- 24 test files passed
- 76 tests passed
- Production build passed
- 23 static pages generated
- 48 Playwright checks passed across desktop Chromium and mobile Chromium
- Homepage service slideshow verified with current local imagery, precise programmatic alignment, direct selectors, previous/next controls, pause/play, and mobile presentation
- Autoplay verified with hover, keyboard-focus, hidden-document, offscreen, and reduced-motion safeguards
- Desktop and 390px mobile visual inspection passed with no browser console warnings or errors
- Industries-section headline sizing verified at the reported 1852px viewport so the heading no longer obscures the `01` index or Commercial label
- Credential artwork containment verified so tall supplied marks, including the GCA member logo, remain centered inside their media panels at desktop and mobile widths
- Certifications active-route styling and semantics verified in desktop and mobile navigation
- Guam Contractors Association heading containment verified at the reported 1774px desktop viewport and at 390px mobile width
- About-page field image verified at desktop and mobile breakpoints
- Project-intake replacement verified at desktop and mobile breakpoints
- Curated six-service desktop dropdown and concise mobile navigation verified in the local browser
- Public navigation verified without a Products link on desktop and mobile while ecommerce is disabled
- Complete fourteen-service index and quote options verified in the local browser
- New Telecommunications Project Support, IT Support, and Facility Locating pages verified with project-specific scope notices
- Responsive handling for long service headings verified on mobile
- All service records verified with locally hosted supporting imagery and no public credit or source-link interface
- VCE Pacific partner content, supplied logo, external link, and responsive presentation verified on the Access Control route
- Contact-form validation verified with hydrated client behavior at the same local origin used by the Next.js development server
- Node.js admin lead authorization, status validation, quote/contact inbox routes, and production compilation verified
- No browser console warnings or errors remained after final verification

Run the entire suite again after future changes; do not rely indefinitely on this historical result.

## 12. Current Git state at handoff creation

The admin leads, private catalog, completed service catalog, Supabase integration,
and email integration were pushed to `origin/main` in commit `22635dd`. The
homepage service slideshow increment was implemented after that baseline; its
exact local and remote commit state may advance after this document is written.
The next developer must run:

```powershell
git status
git log -3 --oneline --decorate
```

Do not assume every line described here is already present on the remote until the working tree and remote branch are compared.

## 13. Recommended next implementation plan

### Phase 1 — Configure the existing system

Goal: make the quote flow and secure admin login operational in a non-production environment.

Tasks:

1. Create or identify the Supabase project.
2. Set local/preview environment values.
3. Apply all reviewed Drizzle migrations.
4. Create a Supabase Auth user for the initial administrator.
5. Insert one matching active `admin_profiles` row with `ADMIN`.
6. Configure Resend and verify the sending domain.
7. Test quote persistence and both notification emails.
8. Verify unauthorized, inactive, and authorized admin access.

Acceptance criteria:

- Quote requests persist to the intended non-production database.
- Internal and customer confirmation emails arrive.
- Unauthenticated users cannot access the admin dashboard.
- Authenticated users without an active role cannot access admin data.
- The authorized administrator can sign in and sign out.

### Phase 2 — Product administration MVP

Status: **Implemented in code. Requires the environment configuration in Phase 1 and migrations through `0005_single_admin_role.sql` before operational use.**

Goal: allow authorized staff to manage draft products without exposing a storefront.

Implemented:

- `/admin/products`
- `/admin/products/new`
- `/admin/products/[id]/edit`
- `/admin/categories`
- `/admin/categories/new`
- `/admin/categories/[id]/edit`
- Server-side create/update/archive commands
- Server-side category create/update/archive/restore commands
- Product table with status, category, SKU, price, and inventory summary
- Zod-validated form for name, slug, description, category, variant, SKU, integer price, currency, inventory policy, and quantity
- Server-side administrator checks inside every query and mutation
- Audit records for material mutations
- Cameras, Electronics, and Construction Equipment begin as empty category records; no fake products are seeded

Authorization:

- The authenticated `ADMIN` may manage products, categories, quotes, and contact inquiries

Acceptance criteria:

- All new products default to `DRAFT`.
- Duplicate slugs and SKUs return accessible errors.
- Unauthorized users cannot read or mutate catalog data.
- Creating or editing a product does not make it public.
- Server code controls status, timestamps, and authoritative numeric values.
- Archived categories are removed from new product assignment while existing product history remains intact.

### Phase 3 — Product image storage

Goal: attach approved images safely to draft products.

Add:

- Private/admin Supabase Storage upload flow
- File type, extension, size, and dimension validation
- Deterministic storage paths
- Required meaningful alt text
- Image ordering and deletion
- Orphan-file cleanup strategy

Do not implement until the client confirms product imagery and upload limits.

### Phase 4 — Public catalog behind the feature flag

Goal: build the catalog without enabling it in production.

Add:

- `/products`
- `/products/[slug]`
- Electronics and Construction Equipment filters
- Optimized responsive product images
- Empty, loading, and error states
- SEO metadata and Product structured data only where accurate

Rules:

- Routes must call `notFound()` or remain otherwise inaccessible while ecommerce is disabled.
- Only `PUBLISHED` products may be returned publicly.
- Do not enable `NEXT_PUBLIC_ECOMMERCE_ENABLED` in production yet.

### Phase 5 — Cart, customer, address, and order domain

Goal: create server-authoritative checkout preparation.

Add database/entities and behavior for:

- Customers
- Addresses or approved checkout address snapshots
- Carts
- Cart items
- Expiration and anonymous cart-token hashing
- Server-side product and inventory lookup
- Order-number generation
- Order and order-item snapshots
- Tax and delivery calculation based only on client-approved policies

Acceptance criteria:

- Browser submissions contain product/variant ID and quantity, never authoritative price.
- The server reloads product price and availability.
- Order totals reconcile at database and domain levels.
- Invalid or unavailable variants cannot be purchased.

### Phase 6 — PayPal and card sandbox integration

Goal: complete a tested non-production payment flow.

Add:

- Server-only PayPal OAuth token retrieval
- Create-order route
- Capture route
- Verified webhook route
- Idempotency headers and stored idempotency keys
- Provider order/capture IDs
- Duplicate-event handling
- Amount and currency reconciliation
- Payment and order status transitions
- PayPal button
- PayPal-hosted card fields only after eligibility is confirmed

Security requirements:

- Never accept client-calculated totals.
- Never store raw card data.
- Verify every webhook before processing it.
- Make webhook processing retry-safe and idempotent.
- Use sandbox credentials until all tests pass and the client approves launch.

### Phase 7 — Order administration and email

Add:

- `/admin/orders`
- Order list and detail views
- Status timeline
- Payment-event visibility with redacted metadata
- Customer and internal order confirmation emails
- Payment receipt email
- Refund/cancellation workflow only after client policy is supplied

### Phase 8 — Security and testing completion

Add or strengthen:

- Distributed rate limiting
- Turnstile or approved bot protection
- Admin integration tests with isolated resources
- Product command tests
- RLS policy tests
- Cart and authoritative-pricing tests
- PayPal create/capture/webhook tests
- Duplicate-webhook tests
- Playwright admin authentication tests
- Playwright cart and checkout tests before launch
- CSP, HSTS, and reviewed production security headers
- Monitoring and error reporting

### Phase 9 — Content, legal, SEO, and deployment readiness

Complete:

- Client-approved privacy policy
- Client-approved terms
- Tax, shipping, delivery, return, refund, cancellation, and warranty policies
- Product catalog and product photography
- Final credential wording and mark permissions
- Final company/team information
- Sitemap and robots handling for any newly enabled routes
- Canonical URLs and production `NEXT_PUBLIC_SITE_URL`
- Preview and production environment separation
- Deployment smoke tests and rollback plan

Only after all relevant acceptance criteria pass should commerce be enabled publicly.

## 14. Explicit non-goals and prohibited shortcuts

The next AI or developer must not:

- Invent products, prices, SKUs, inventory, warranties, shipping, tax, or return rules
- Invent projects, clients, metrics, testimonials, awards, licenses, or certifications
- Expose the dormant storefront because database tables exist
- Treat hidden navigation as admin security
- Build raw credit-card fields
- Trust browser prices or payment status
- Put PayPal, Supabase service-role, database, email, or AI secrets in client code
- Describe representative stock photography as CTS Pacific project work
- Restore the Projects section without an explicit request
- Replace the premium visual system with a generic store or contractor template
- Make the entire application client-rendered
- Skip accessible form labels, keyboard behavior, focus states, or reduced-motion support
- Run destructive database or Git operations without explicit authorization and target verification

## 15. Client inputs still required

`CLIENT_CONTENT_REQUIRED.md` is the live checklist. Major blockers include:

- Final approved logo variants and brand colors
- Company address and exact regional service wording
- Approved expanded company history and team profiles
- Exact certification names, holders, validity, and mark permissions
- Approved project case studies and photography captions
- Legal policies
- Final product catalog
- Product descriptions and images
- Prices and SKUs
- Inventory rules
- Tax and delivery rules
- Return, refund, cancellation, and warranty policies
- PayPal Business credentials
- Card-payment provider confirmation and merchant eligibility
- Merchant statement descriptor and customer-service details
- Bot-protection account

If a required fact is missing, add or preserve a clearly marked placeholder and update `CLIENT_CONTENT_REQUIRED.md`. Never guess.

## 16. Source-of-truth files

- `AGENTS.md` — authoritative system requirements
- `SYSTEM_FEATURES_AND_FUTURE_ROADMAP.md` — current implementation status and continuation plan
- `NEXT_AI_REMAINING_SERVICES_PROMPT.md` — historical prompt for the now-completed service expansion
- `NEXT_AI_SERVICE_SLIDESHOW_PROMPT.md` — copyable continuation and verification prompt for the service slideshow increment
- `CLIENT_CONTENT_REQUIRED.md` — missing or unverified client information
- `README.md` — concise setup entry point
- `docs/architecture/IMPLEMENTATION_PLAN.md` — original architecture and milestones
- `docs/architecture/DATABASE_ENTITIES.md` — database model intentions
- `.env.example` — environment contract
- `IMAGE_LICENSES.md` — private image provenance and licensing register
- `src/config/site.ts` — business contact and navigation configuration
- `src/modules/services/service-catalog.ts` — service-page content model
- `src/server/db/schema` — implemented Drizzle entities
- `drizzle/migrations` — reviewed database migrations

## 17. Handoff definition of done

A future AI should consider the initial commerce/admin milestone genuinely complete only when:

- Supabase and Resend are configured in an isolated environment
- Migrations are applied successfully
- An authorized admin can sign in
- Product CRUD works with server-side role checks
- Product images upload safely
- Products remain private while commerce is disabled
- Order/cart/payment workflows use server-authoritative totals
- PayPal and hosted card payments pass sandbox tests
- Webhooks are verified and idempotent
- Order administration and emails work
- Required client policies and catalog data are supplied
- Accessibility, security, integration, and Playwright tests pass
- `pnpm check` passes
- Production deployment configuration is reviewed
- The user explicitly approves enabling ecommerce

Until then, continue describing commerce and administration as an in-progress foundation.
