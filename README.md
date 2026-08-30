# CTS Pacific

Production website for Corerin Technical Solutions, LLC dba CTS Pacific.

The project is a Next.js App Router modular monolith designed for B2B lead generation, technical authority, project case studies, and future administration. Commerce and chatbot capabilities are intentionally dormant until their dedicated milestones.

The private `/admin` route contains the initial electronics and construction-equipment commerce workspace. Public products, cart, checkout, PayPal, and card controls remain unavailable while `NEXT_PUBLIC_ECOMMERCE_ENABLED=false`.

## Local development

1. Install the Node.js version declared in `package.json` and enable pnpm.
2. Copy `.env.example` to `.env.local` and configure only the services needed for the current milestone.
3. Run `pnpm install`.
4. Run `pnpm dev`.

## Validation

```text
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Use `pnpm check` for the CI-equivalent lint, typecheck, unit/integration test, and production-build sequence.

## Project documentation

- `AGENTS.md` — authoritative product and implementation requirements
- `SYSTEM_FEATURES_AND_FUTURE_ROADMAP.md` — durable implementation status, handoff notes, and ordered future roadmap
- `NEXT_AI_REMAINING_SERVICES_PROMPT.md` — completion handoff for the expanded service catalog and private equipment-planning boundaries
- `docs/architecture/IMPLEMENTATION_PLAN.md` — architecture, dependencies, tokens, routes, and milestones
- `docs/architecture/DATABASE_ENTITIES.md` — planned PostgreSQL model and constraints
- `CLIENT_CONTENT_REQUIRED.md` — unverified or missing client content that must not be invented
