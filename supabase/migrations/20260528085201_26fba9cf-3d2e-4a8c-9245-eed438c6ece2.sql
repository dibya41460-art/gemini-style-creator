DROP POLICY IF EXISTS "anyone can create appointments" ON public.appointments;

CREATE POLICY "anyone can create appointments"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 120
  AND length(btrim(phone)) BETWEEN 4 AND 30
  AND length(btrim(reference)) BETWEEN 1 AND 64
  AND length(btrim(appointment_time)) BETWEEN 1 AND 32
  AND appointment_date >= (CURRENT_DATE - INTERVAL '1 day')
  AND appointment_date <= (CURRENT_DATE + INTERVAL '2 years')
  AND (notes IS NULL OR length(notes) <= 2000)
  AND (product_name IS NULL OR length(product_name) <= 200)
  AND is_read = false
);