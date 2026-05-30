
-- Extend product_overrides with description fields
ALTER TABLE public.product_overrides
  ADD COLUMN IF NOT EXISTS description_override text,
  ADD COLUMN IF NOT EXISTS origin_override text,
  ADD COLUMN IF NOT EXISTS material_override text,
  ADD COLUMN IF NOT EXISTS craftsmanship_override text,
  ADD COLUMN IF NOT EXISTS certification_override text,
  ADD COLUMN IF NOT EXISTS delivery_time_override text,
  ADD COLUMN IF NOT EXISTS purity_override text,
  ADD COLUMN IF NOT EXISTS carat_override text,
  ADD COLUMN IF NOT EXISTS weight_override text,
  ADD COLUMN IF NOT EXISTS clarity_override text;

-- Create custom_products table for admin-added inventory
CREATE TABLE IF NOT EXISTS public.custom_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  image text NOT NULL,
  category text NOT NULL DEFAULT 'featured',
  description text,
  origin text,
  material text,
  craftsmanship text,
  certification text,
  delivery_time text,
  purity text,
  carat text,
  weight text,
  clarity text,
  tag text,
  sku text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.custom_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_products TO authenticated;
GRANT ALL ON public.custom_products TO service_role;

ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads custom products"
  ON public.custom_products FOR SELECT
  USING (true);

CREATE POLICY "admins manage custom products"
  ON public.custom_products FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
