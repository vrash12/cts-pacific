# Route handlers

Implemented public submission endpoints:

- `POST /api/quote-requests` validates, rate limits, persists, and sends project-request notifications.
- `POST /api/contact-submissions` validates, rate limits, persists, and sends general-inquiry notifications.

Both endpoints use idempotent submission identifiers, a honeypot field, server-side
Zod validation, safe configuration failures, and the shared email abstraction. A
distributed rate limiter and production bot protection remain required before launch.

Every externally supplied payload must continue to be validated on the server and
processed without trusting client-supplied pricing or authorization claims.
