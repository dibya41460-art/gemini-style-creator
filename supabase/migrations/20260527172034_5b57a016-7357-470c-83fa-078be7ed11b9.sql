
ALTER TABLE public.shop_settings
  ADD COLUMN IF NOT EXISTS theme_primary text,
  ADD COLUMN IF NOT EXISTS theme_accent text,
  ADD COLUMN IF NOT EXISTS theme_background text;
