# Forms

This module contains the segmented project quote form and the general contact form.
Both use React Hook Form with Zod validation and accessible error, submission, and
success states. Shared controls belong in `src/components/ui`; validation schemas
belong in `src/schemas`; persistence and email delivery belong in server modules and
route handlers rather than UI components.
