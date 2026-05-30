import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

export interface CustomProductRow {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string | null;
  origin: string | null;
  material: string | null;
  craftsmanship: string | null;
  certification: string | null;
  delivery_time: string | null;
  purity: string | null;
  carat: string | null;
  weight: string | null;
  clarity: string | null;
  tag: string | null;
  sku: string | null;
  sort_order: number;
  created_at: string;
}

export const toProduct = (r: CustomProductRow): Product => ({
  id: r.id,
  name: r.name,
  price: r.price,
  image: r.image,
  tag: r.tag ?? null,
  weight: r.weight ?? undefined,
  purity: r.purity ?? undefined,
  carat: r.carat ?? undefined,
  clarity: r.clarity ?? undefined,
  description: r.description ?? "",
  origin: r.origin ?? "",
  material: r.material ?? "",
  craftsmanship: r.craftsmanship ?? "",
  certification: r.certification ?? "",
  sku: r.sku ?? r.id.slice(0, 8).toUpperCase(),
  deliveryTime: r.delivery_time ?? "7–10 working days",
});

export const useCustomProducts = (category?: string) => {
  const { data } = useQuery({
    queryKey: ["custom_products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CustomProductRow[];
    },
    staleTime: 30_000,
  });
  const all = data ?? [];
  if (!category) return all;
  return all.filter((p) => p.category === category);
};