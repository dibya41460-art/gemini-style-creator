import { createClient } from "https://esm.sh/@supabase/supabase-js@2.106.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const voriGrams = 11.664;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Gold-rate service is not configured.");
    const admin = createClient(url, key);

    const { data: existing } = await admin.from("gold_rates").select("*").eq("id", "main").maybeSingle();
    const lastFetch = existing?.fetched_at ? new Date(existing.fetched_at).getTime() : 0;
    if (existing && Date.now() - lastFetch < 20 * 60 * 60 * 1000) return json({ rate: existing, cached: true });

    async function fetchXauUsd(): Promise<number> {
      // Primary: gold-api.com (free, no key)
      try {
        const r = await fetch("https://api.gold-api.com/price/XAU");
        if (r.ok) {
          const j = await r.json();
          const p = Number(j?.price);
          if (Number.isFinite(p) && p > 0) return p;
        }
      } catch (_) { /* fall through */ }
      // Fallback: Stooq CSV
      const r = await fetch("https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv");
      if (!r.ok) throw new Error("gold source unreachable");
      const csv = await r.text();
      const parts = csv.trim().split("\n")[1]?.split(",") ?? [];
      const close = Number(parts[6]);
      if (!Number.isFinite(close) || close <= 0) throw new Error("gold source returned no price");
      return close;
    }

    async function fetchUsdBdt(): Promise<number> {
      try {
        const r = await fetch("https://open.er-api.com/v6/latest/USD");
        if (r.ok) {
          const j = await r.json();
          const v = Number(j?.rates?.BDT);
          if (Number.isFinite(v) && v > 0) return v;
        }
      } catch (_) { /* fall through */ }
      const r = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      if (!r.ok) throw new Error("fx source unreachable");
      const j = await r.json();
      const v = Number(j?.rates?.BDT);
      if (!Number.isFinite(v) || v <= 0) throw new Error("fx source returned no rate");
      return v;
    }

    let xauUsd: number, usdBdt: number;
    try {
      [xauUsd, usdBdt] = await Promise.all([fetchXauUsd(), fetchUsdBdt()]);
    } catch (err) {
      console.error("gold rate fetch failed", err);
      if (existing) return json({ rate: existing, cached: true, stale: true });
      return json({ rate: null, error: "Gold rate temporarily unavailable.", fallback: true });
    }

    const perGram = (xauUsd * usdBdt) / 31.1034768;
    const payload = {
      id: "main",
      currency: "BDT",
      rate_per_gram: Number(perGram.toFixed(2)),
      rate_per_vori: Number((perGram * voriGrams).toFixed(2)),
      source: "Stooq XAU/USD + USD/BDT market rate",
      fetched_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await admin.from("gold_rates").upsert(payload, { onConflict: "id" }).select("*").single();
    if (error) throw error;
    return json({ rate: data, cached: false });
  } catch (e) {
    console.error("update-gold-rate error", e);
    return json({ rate: null, error: e instanceof Error ? e.message : "Gold rate update failed.", fallback: true });
  }
});
