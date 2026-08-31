INSERT INTO "product_categories" (
  "id",
  "name",
  "slug",
  "description",
  "display_order",
  "is_active"
) VALUES (
  '10000000-0000-4000-8000-000000000003',
  'Cameras',
  'cameras',
  'Client-approved camera products prepared for future catalog entry.',
  0,
  true
)
ON CONFLICT ("slug") DO NOTHING;

UPDATE "product_categories"
SET
  "description" = 'Client-approved electronic products prepared for future catalog entry.',
  "updated_at" = now()
WHERE
  "slug" = 'electronics'
  AND "description" = 'Cameras and other approved electronic products.';
