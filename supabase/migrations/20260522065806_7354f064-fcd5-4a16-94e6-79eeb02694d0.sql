-- Role enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Auto-assign role on signup: first user = admin, rest = user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INT;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Shop settings (single row)
CREATE TABLE public.shop_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  shop_name TEXT NOT NULL DEFAULT 'Swastika Jewellers',
  shop_tagline TEXT NOT NULL DEFAULT 'Jewellers',
  phone TEXT NOT NULL DEFAULT '+880 1555-098765',
  phone_tel TEXT NOT NULL DEFAULT '+8801555098765',
  whatsapp TEXT NOT NULL DEFAULT '8801555098765',
  address TEXT NOT NULL DEFAULT 'Jubilee Road, Chittagong, Bangladesh',
  address_short TEXT NOT NULL DEFAULT 'Jubilee Road, Chittagong',
  email TEXT NOT NULL DEFAULT 'info@swastikajewellers.com',
  hours TEXT NOT NULL DEFAULT 'Mon–Sat: 10AM – 8PM',
  hero_headline TEXT,
  hero_subheading TEXT,
  footer_about TEXT NOT NULL DEFAULT 'Crafting timeless gold jewelry with passion and precision since 1985. Every piece tells a story of tradition and elegance.',
  logo_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads shop settings" ON public.shop_settings
  FOR SELECT USING (true);

CREATE POLICY "admins update shop settings" ON public.shop_settings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins insert shop settings" ON public.shop_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed the single settings row
INSERT INTO public.shop_settings (id) VALUES ('main') ON CONFLICT DO NOTHING;

-- Product overrides (admin can override price/image of any catalog item)
CREATE TABLE public.product_overrides (
  product_id TEXT PRIMARY KEY,
  price_override TEXT,
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.product_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads overrides" ON public.product_overrides
  FOR SELECT USING (true);

CREATE POLICY "admins manage overrides" ON public.product_overrides
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for shop images (public read; admin write)
INSERT INTO storage.buckets (id, name, public) VALUES ('shop-images', 'shop-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read shop-images" ON storage.objects
  FOR SELECT USING (bucket_id = 'shop-images');

CREATE POLICY "admins upload shop-images" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'shop-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update shop-images" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'shop-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete shop-images" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'shop-images' AND public.has_role(auth.uid(), 'admin'));