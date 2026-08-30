# Administration route

`/admin` is the private commerce setup workspace. It is not linked from the public site and fails closed until all of the following are configured:

1. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. `DATABASE_URL`
3. All reviewed Drizzle migrations, including the catalog audit-log migration
4. A Supabase Auth user with a matching active row in `admin_profiles`

Example profile setup after creating the Auth user in Supabase:

```sql
insert into public.admin_profiles (id, role, display_name)
values ('AUTH_USER_UUID', 'SUPER_ADMIN', 'Administrator');
```

Never expose the service-role key in browser code. The route proxy refreshes Supabase sessions; `requireAdmin()` remains the server-side authorization boundary.

## Product administration

The private product module includes:

- `/admin/products` — catalog list and read-only access for `ORDER_MANAGER`
- `/admin/products/new` — draft creation for catalog-management roles
- `/admin/products/[id]/edit` — product editing, archive, and restore controls

`SUPER_ADMIN`, `ADMIN`, and `CONTENT_EDITOR` can create and update draft product records. Every query and mutation repeats authorization on the server. New products always start as `DRAFT`; publishing and public commerce remain intentionally unavailable.

Apply `0002_gigantic_wraith.sql` before using product mutations so audit records can be written transactionally with each catalog change.
