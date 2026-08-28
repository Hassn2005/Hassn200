# Supabase database setup

1. Open the Supabase dashboard for the Dantil project.
2. Go to **SQL Editor** and create a new query.
3. Copy the complete contents of `schema.sql` into the query.
4. Click **Run** and confirm that the four tables were created.
5. Open **Table Editor** and verify the seeded Dantil content.

For the product management features, run `products.sql` in a new SQL Editor
query, then run `storage.sql` in another query. These files create the product
table, admin policies, sample products, and the product image bucket.

After creating the Auth user, insert its UUID into `admin_profiles` as shown
in the project setup instructions. The admin dashboard is available at `/admin`.

Run `admin-settings.sql` once to allow the authenticated admin to update the
store phone numbers, address, and opening hours.

The public frontend can read active website content. Contact messages can be
inserted, but they cannot be read publicly. Admin read and update policies
should be added only after authentication and an admin role are implemented.