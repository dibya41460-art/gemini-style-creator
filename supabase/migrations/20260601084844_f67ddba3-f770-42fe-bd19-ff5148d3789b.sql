CREATE TABLE public.deleted_products (
  product_id TEXT PRIMARY KEY,
  deleted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.deleted_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deleted_products TO authenticated;
GRANT ALL ON public.deleted_products TO service_role;

ALTER TABLE public.deleted_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads deleted products"
ON public.deleted_products
FOR SELECT
USING (true);

CREATE POLICY "admins manage deleted products"
ON public.deleted_products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.ai_product_generations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'featured',
  price TEXT,
  tone TEXT NOT NULL DEFAULT 'premium',
  target_region TEXT,
  source_image_url TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_product_generations TO authenticated;
GRANT ALL ON public.ai_product_generations TO service_role;

ALTER TABLE public.ai_product_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins manage ai generations"
ON public.ai_product_generations
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT,
  name TEXT,
  phone TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.complaints TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.complaints TO authenticated;
GRANT ALL ON public.complaints TO service_role;

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customers create complaints"
ON public.complaints
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(phone)) BETWEEN 4 AND 30
  AND length(btrim(reason)) BETWEEN 5 AND 2000
  AND (reference IS NULL OR length(reference) <= 64)
  AND (name IS NULL OR length(name) <= 120)
  AND status = 'open'
);

CREATE POLICY "admins manage complaints"
ON public.complaints
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gold_rates (
  id TEXT PRIMARY KEY DEFAULT 'main',
  currency TEXT NOT NULL DEFAULT 'BDT',
  rate_per_gram NUMERIC(12,2) NOT NULL,
  rate_per_vori NUMERIC(12,2),
  source TEXT NOT NULL DEFAULT 'market',
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gold_rates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gold_rates TO authenticated;
GRANT ALL ON public.gold_rates TO service_role;

ALTER TABLE public.gold_rates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads gold rates"
ON public.gold_rates
FOR SELECT
USING (true);

CREATE POLICY "admins manage gold rates"
ON public.gold_rates
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.appointments
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'booked',
ADD COLUMN IF NOT EXISTS cancel_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS appointments_cancel_token_idx ON public.appointments(cancel_token);
CREATE INDEX IF NOT EXISTS appointments_reference_phone_idx ON public.appointments(reference, phone);

DROP POLICY IF EXISTS "customers cancel own appointment" ON public.appointments;
CREATE POLICY "customers cancel own appointment"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (
  status = 'booked'
  AND cancel_token IS NOT NULL
)
WITH CHECK (
  status = 'cancelled'
  AND cancelled_at IS NOT NULL
  AND is_read = false
  AND length(coalesce(cancellation_reason, '')) <= 500
);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS touch_complaints_updated_at ON public.complaints;
CREATE TRIGGER touch_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();