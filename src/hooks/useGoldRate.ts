import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GoldRate {
  id: string;
  currency: string;
  rate_per_gram: number;
  rate_per_vori: number | null;
  source: string;
  fetched_at: string;
  updated_at: string;
}

export const useGoldRate = () => {
  return useQuery({
    queryKey: ["gold_rates", "main"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("update-gold-rate", { body: {} });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data?.rate as GoldRate | null;
    },
    staleTime: 6 * 60 * 60 * 1000,
    retry: 1,
  });
};
