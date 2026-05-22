import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SHOP_DEFAULTS, type ShopSettings } from "@/lib/shop";

export const useShopSettings = () => {
  const { data } = useQuery({
    queryKey: ["shop_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shop_settings")
        .select("*")
        .eq("id", "main")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });

  const merged: ShopSettings = { ...SHOP_DEFAULTS, ...(data ?? {}) } as ShopSettings;
  return merged;
};