import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductOverride {
  product_id: string;
  price_override: string | null;
  image_url: string | null;
  name_override: string | null;
  description_override: string | null;
  origin_override: string | null;
  material_override: string | null;
  craftsmanship_override: string | null;
  certification_override: string | null;
  delivery_time_override: string | null;
  purity_override: string | null;
  carat_override: string | null;
  weight_override: string | null;
  clarity_override: string | null;
}

export const useProductOverrides = () => {
  const { data } = useQuery({
    queryKey: ["product_overrides"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_overrides").select("*");
      if (error) throw error;
      const map = new Map<string, ProductOverride>();
      (data ?? []).forEach((row) => map.set(row.product_id, row as ProductOverride));
      return map;
    },
    staleTime: 60_000,
  });
  return data ?? new Map<string, ProductOverride>();
};

export const applyOverride = <T extends { id: string; name: string; price: string; image: string }>(
  product: T,
  overrides: Map<string, ProductOverride>
): T => {
  const o = overrides.get(product.id);
  if (!o) return product;
  const out: any = { ...product };
  if (o.name_override) out.name = o.name_override;
  if (o.price_override) out.price = o.price_override;
  if (o.image_url) out.image = o.image_url;
  if (o.description_override) out.description = o.description_override;
  if (o.origin_override) out.origin = o.origin_override;
  if (o.material_override) out.material = o.material_override;
  if (o.craftsmanship_override) out.craftsmanship = o.craftsmanship_override;
  if (o.certification_override) out.certification = o.certification_override;
  if (o.delivery_time_override) out.deliveryTime = o.delivery_time_override;
  if (o.purity_override) out.purity = o.purity_override;
  if (o.carat_override) out.carat = o.carat_override;
  if (o.weight_override) out.weight = o.weight_override;
  if (o.clarity_override) out.clarity = o.clarity_override;
  return out;
};