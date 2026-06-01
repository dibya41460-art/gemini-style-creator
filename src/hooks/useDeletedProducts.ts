import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useDeletedProducts = () => {
  const { data } = useQuery({
    queryKey: ["deleted_products"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("deleted_products")
        .select("product_id");
      if (error) throw error;
      return new Set<string>((data ?? []).map((row: { product_id: string }) => row.product_id));
    },
    staleTime: 30_000,
  });

  return data ?? new Set<string>();
};
