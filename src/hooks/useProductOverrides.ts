import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProductOverride {
  product_id: string;
  price_override: string | null;
  image_url: string | null;
  name_override: string | null;
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
  return {
    ...product,
    name: o.name_override ?? product.name,
    price: o.price_override ?? product.price,
    image: o.image_url ?? product.image,
  };
};