# Administration route

`/admin` is the private commerce setup workspace. It is not linked from the public site and fails closed until all of the following are configured:

1. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. `DATABASE_URL`
3. The reviewed Drizzle migration
4. A Supabase Auth user with a matching active row in `admin_profiles`

Example profile setup after creating the Auth user in Supabase:

```sql
insert into public.admin_profiles (id, role, display_name)
values ('AUTH_USER_UUID', 'SUPER_ADMIN', 'Administrator');
```

Never expose the service-role key in browser code. The route proxy refreshes Supabase sessions; `requireAdmin()` remains the server-side authorization boundary.
