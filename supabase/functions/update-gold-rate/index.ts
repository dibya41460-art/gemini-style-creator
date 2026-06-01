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

    const [goldResp, fxResp] = await Promise.all([
      fetch("https://stooq.com/q/l/?s=xauusd&f=sd2t2ohlcv&h&e=csv"),
      fetch("https://open.er-api.com/v6/latest/USD"),
    ]);
    if (!goldResp.ok) throw new Error("Could not fetch today's gold market price.");
    if (!fxResp.ok) throw new Error("Could not fetch today's currency rate.");

    const csv = await goldResp.text();
    const lines = csv.trim().split("\n");
    const parts = lines[1]?.split(",") ?? [];
    const xauUsd = Number(parts[6]);
    const fx = await fxResp.json();
    const usdBdt = Number(fx?.rates?.BDT);
    if (!Number.isFinite(xauUsd) || !Number.isFinite(usdBdt)) throw new Error("Gold market data was incomplete.");

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
    return json({ error: e instanceof Error ? e.message : "Gold rate update failed." }, 500);
  }
});
