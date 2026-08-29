# CTS Pacific Implementation Plan

## Current repository state

The initial workspace contained only the authoritative `AGENTS.md` requirements and two supplied company PDFs. There was no application, package configuration, Git metadata, database schema, or deployment configuration.

The supplied PDFs are content references, not an approved production asset library. They contain company contact details, service descriptions, a rasterized company logo, and FOA/ETA artwork. Project photography, case studies, legal policies, exact credential details, and third-party artwork permissions remain outstanding in `CLIENT_CONTENT_REQUIRED.md`.

## Product objective

The website is a narrative B2B marketing surface designed to convert serious commercial, government, industrial, engineering, residential, and telecommunications buyers into qualified project inquiries. The primary action is **Request a Quote**. The secondary action is **Contact CTS Pacific**.

The visual and content system must consistently communicate precision, reliability, technical expertise, infrastructure capability, and professionalism.

## Application architecture

Use a Next.js App Router modular monolith with React Server Components by default.

- `src/app/(marketing)` owns public page composition, metadata, and layouts.
- `src/app/admin` owns authenticated administration routes.
- `src/app/api` owns narrowly scoped route handlers and webhook entry points.
- `src/components` owns reusable presentation and interaction components.
- `src/modules` owns domain schemas, queries, commands, types, and business rules.
- `src/server` owns database, authentication, authorization, email, storage, payment, and security infrastructure.
- `src/config` owns validated environment access, feature flags, site metadata, and stable configuration.
- `drizzle` owns reviewed SQL migrations.

Client components are permitted only where browser interaction is necessary. Data fetching, metadata, authorization, and non-interactive composition should remain server-side.

## Final route map

### Public marketing

- `/`
- `/about`
- `/services`
- `/services/fiber-optics`
- `/services/data-cabling`
- `/services/cctv`
- `/services/access-control`
- `/services/micro-trenching`
- `/services/civil-underground`
- `/projects`
- `/projects/[slug]`
- `/industries`
- `/certifications`
- `/quote`
- `/contact`
- `/privacy`
- `/terms`

### Administration

- `/admin`
- `/admin/services`
- `/admin/projects`
- `/admin/leads/quotes`
- `/admin/leads/contact`
- `/admin/products` when commerce management is enabled
- `/admin/orders` when commerce management is enabled
- `/admin/knowledge` when chatbot administration is enabled

### Dormant commerce

The following routes remain inaccessible while `NEXT_PUBLIC_ECOMMERCE_ENABLED=false`:

- `/products`
- `/products/[slug]`
- `/cart`
- `/checkout`

### Initial route handlers

- `POST /api/contact`
- `POST /api/quote`

### Future route handlers

- `POST /api/paypal/create-order`
- `POST /api/paypal/capture`
- `POST /api/paypal/webhook`
- provider-agnostic chatbot endpoints under `/api/chatbot`

## Final file tree

```text
src/
  app/
    (marketing)/
      about/
      services/
        fiber-optics/
        data-cabling/
        cctv/
        access-control/
        micro-trenching/
        civil-underground/
      projects/[slug]/
      industries/
      certifications/
      quote/
      contact/
      privacy/
      terms/
      layout.tsx
      page.tsx
    admin/
    api/
      contact/
      quote/
      paypal/
      chatbot/
    globals.css
    layout.tsx
    robots.ts
    sitemap.ts
  components/
    ui/
    layout/
    marketing/
    forms/
    projects/
    commerce/
  modules/
    services/
    projects/
    leads/
    products/
    orders/
    payments/
    chatbot/
  server/
    auth/
    db/schema/
    email/
    payments/
    security/
    storage/
  config/
  lib/
  schemas/
  types/
drizzle/
  migrations/
tests/
  unit/
  integration/
  e2e/
public/
  assets/
    brand/
    certifications/
    projects/
    services/
docs/
  architecture/
.github/
  workflows/
```

## Dependency policy

### Runtime foundation

- Next.js, React, and React DOM
- Zod
- React Hook Form and the Zod resolver
- Drizzle ORM and postgres.js
- Supabase JavaScript and SSR packages
- Lucide React
- class-variance-authority, clsx, and tailwind-merge

### Development and validation

- TypeScript in strict mode
- Tailwind CSS and its PostCSS integration
- ESLint with the Next.js Core Web Vitals and TypeScript rules
- Drizzle Kit
- Vitest and React Testing Library with jsdom
- Playwright

Provider SDKs for email, PayPal, AI, analytics, monitoring, and rate limiting are intentionally deferred until a provider is selected and that capability is implemented.

## Design system

### Palette

| Semantic role | Temporary value |
| --- | --- |
| Brand navy | `#0B2942` |
| Technical blue | `#168FD0` |
| Infrastructure teal | `#0B8D8D` |
| Surface | `#FFFFFF` |
| Muted surface | `#F7F9FB` |
| Subtle surface | `#E9EEF2` |
| Ink | `#17212B` |

These values are CSS custom properties. Official colors can replace them without rewriting components.

### Typography

- Headings: Manrope, loaded through `next/font`
- Body and interface: Inter, loaded through `next/font`
- Desktop hero: responsive `clamp()` range targeting approximately 56–68px in the finished composition
- Editorial uppercase display language is reserved for major messaging and navigation accents

### Layout and surfaces

- Maximum content width: 1280px
- Responsive gutters use `clamp()` and never collapse below 20px
- Generous section spacing
- Predominantly square or minimally rounded surfaces
- Fine technical dividers and restrained shadows
- White/light content balance with concentrated navy sections and selective blue/teal accents

### Motion and accessibility

- 160ms fast transitions and 240ms standard transitions
- No gratuitous entrance animation
- Full reduced-motion handling
- Visible focus states, semantic landmarks, keyboard-operable navigation, large touch targets, and AA contrast

## Environment contract

Environment access is centralized under `src/config/env`. Server secrets must never be imported into client code.

### Public

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ECOMMERCE_ENABLED`

### Server-only

- `DATABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_WEBHOOK_ID`
- `PAYPAL_ENVIRONMENT`
- `EMAIL_API_KEY`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `AI_API_KEY`

Feature-specific secrets are optional at foundation time and must become required through a feature-level validator before the related integration can run.

## Security boundaries

- Validate all incoming data on the server with Zod.
- Authenticate admin users with Supabase Auth and authorize every protected operation server-side.
- Apply Supabase RLS policies to user-accessible tables.
- Never expose the Supabase service-role key, PayPal secret, email key, Turnstile secret, or AI key.
- Never trust browser-supplied product prices, roles, order totals, or payment status.
- Verify PayPal webhooks, persist their provider event IDs, and reject duplicate processing.
- Restrict uploads by authenticated purpose, content type, size, extension, and storage path.
- Use rate limiting and bot protection on public lead endpoints.
- Record material administrative mutations in append-oriented audit logs.

## Implementation milestones

1. **Foundation** — framework, TypeScript, Tailwind, fonts, tokens, shared primitives, header, footer, validation pipeline.
2. **Homepage** — all eleven required sections with responsive editorial composition and approved photography or labeled placeholders.
3. **Services** — services overview and six detailed technical landing pages.
4. **Company pages** — About, Industries, Certifications, Contact, Privacy, and Terms.
5. **Projects** — project listing, empty state, content model, and premium case-study template.
6. **Quote system** — segmented intake form, validation, persistence, notifications, bot protection, and attachment-ready architecture.
7. **Authentication and admin** — Supabase Auth, server authorization, roles, RLS, and administration surfaces.
8. **SEO, accessibility, and performance** — metadata, canonical URLs, structured data, sitemap, robots, WCAG review, and Core Web Vitals work.
9. **Testing and security** — domain tests, integration tests, E2E coverage, abuse controls, CSP, and monitoring readiness.
10. **Deployment** — GitHub/Vercel/Supabase environment promotion and preview/production checks.
11. **Future commerce** — dormant products, carts, orders, and PayPal architecture behind the feature flag.
12. **Future chatbot** — structured approved knowledge base, provider abstraction, qualification flow, and safe lead handoff.

