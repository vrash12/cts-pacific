# Administration route

`/admin` is the private commerce setup workspace. It is not linked from the public site and fails closed until all of the following are configured:

1. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (the legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` remains supported)
2. `DATABASE_URL`
3. All reviewed Drizzle migrations, including the catalog audit-log migration
4. A Supabase Auth user with a matching active row in `admin_profiles`

CTS Pacific currently uses one administrator account type. Create one Supabase Auth user for the approved administrator and assign the matching profile the `ADMIN` role.

Example profile setup after creating the Auth user in Supabase:

```sql
insert into public.admin_profiles (id, role, display_name)
values ('AUTH_USER_UUID', 'ADMIN', 'Administrator');
```

Never expose the service-role key in browser code. The route proxy refreshes Supabase sessions; `requireAdmin()` remains the server-side authorization boundary.

## Product administration

The private product module includes:

- `/admin/products` — private catalog list
- `/admin/products/new` — draft creation for the administrator
- `/admin/products/[id]/edit` — product editing, archive, and restore controls
- `/admin/categories` — private category list
- `/admin/categories/new` — category creation for the administrator
- `/admin/categories/[id]/edit` — category editing, archive, and restore controls

The single `ADMIN` user type can create and update draft product records. Every query and mutation repeats authorization on the server. New products always start as `DRAFT`; publishing and public commerce remain intentionally unavailable.

Apply `0002_gigantic_wraith.sql` before using product mutations so audit records can be written transactionally with each catalog change. Apply `0004_add_cameras_category.sql` to add the client-requested private Cameras category without creating fake product records.

## Lead administration

The private lead module includes:

- `/admin/leads` — quote and contact inbox summary
- `/admin/leads/quotes` — filterable project-request inbox
- `/admin/leads/quotes/[id]` — full project scope and audited status control
- `/admin/leads/contacts` — filterable general-inquiry inbox
- `/admin/leads/contacts/[id]` — full message and audited status control

Only the authenticated `ADMIN` may read or change lead data. Every query and
mutation repeats this authorization check on the Node.js server. Status changes are
transactional and write an administrative audit record. Apply all migrations through
`0003_dizzy_nemesis.sql` before using the contact inbox.
