CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

GRANT USAGE ON SCHEMA private TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

DROP POLICY IF EXISTS "users view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "admins view roles" ON public.user_roles;
DROP POLICY IF EXISTS "users view their own roles" ON public.user_roles;

CREATE POLICY "users view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "admins manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins view appointments" ON public.appointments;
CREATE POLICY "admins view appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins update appointments" ON public.appointments;
CREATE POLICY "admins update appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins delete appointments" ON public.appointments;
CREATE POLICY "admins delete appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins insert shop settings" ON public.shop_settings;
CREATE POLICY "admins insert shop settings"
ON public.shop_settings
FOR INSERT
TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins update shop settings" ON public.shop_settings;
CREATE POLICY "admins update shop settings"
ON public.shop_settings
FOR UPDATE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage overrides" ON public.product_overrides;
CREATE POLICY "admins manage overrides"
ON public.product_overrides
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage custom products" ON public.custom_products;
CREATE POLICY "admins manage custom products"
ON public.custom_products
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage deleted products" ON public.deleted_products;
CREATE POLICY "admins manage deleted products"
ON public.deleted_products
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage complaints" ON public.complaints;
CREATE POLICY "admins manage complaints"
ON public.complaints
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage gold rates" ON public.gold_rates;
CREATE POLICY "admins manage gold rates"
ON public.gold_rates
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins manage ai generations" ON public.ai_product_generations;
CREATE POLICY "admins manage ai generations"
ON public.ai_product_generations
FOR ALL
TO authenticated
USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins upload shop images" ON storage.objects;
CREATE POLICY "admins upload shop images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'shop-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins update shop images" ON storage.objects;
CREATE POLICY "admins update shop images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'shop-images' AND private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'shop-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "admins delete shop images" ON storage.objects;
CREATE POLICY "admins delete shop images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'shop-images' AND private.has_role(auth.uid(), 'admin'::public.app_role));