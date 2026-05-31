// Auto-generate jewelry product details using Lovable AI
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, category, price } = await req.json();
    if (!name) {
      return new Response(JSON.stringify({ error: "name is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const isDiamond = category === "diamond" || /diamond|solitaire/i.test(name);
    const isGold = category === "gold" || /gold|coin|bangle|chain|haar|kada/i.test(name);

    const systemPrompt = `You are a senior jewelry copywriter for Swastika Jewellers, a fine jewelry boutique in Chittagong, Bangladesh (established 1985). Generate realistic, premium product details for a piece of jewelry. Be specific, evocative, and credible — use real hallmarks/standards (BIS, IGI, GIA, MMTC-PAMP, LBMA, 916, 22K, 24K, VS1, VVS2, etc.) where appropriate. Keep each field concise (1–2 sentences max).`;

    const userPrompt = `Generate product details for:
- Name: ${name}
- Category: ${category ?? "general"}
- Price: ${price ?? "unspecified"}

Return ONLY valid JSON matching this schema (no markdown, no commentary):
{
  "description": "1–2 sentence evocative description of the piece",
  "origin": "where/how it was sourced or made",
  "material": "metal & material composition",
  "craftsmanship": "how it was crafted",
  "certification": "hallmarks / certifications",
  "delivery_time": "estimated delivery window (e.g. '5–7 working days')",
  ${isGold ? `"purity": "gold purity (e.g. '22K (916)')", "weight": "approximate weight (e.g. '8.5 gm')",` : ""}
  ${isDiamond ? `"carat": "diamond carat (e.g. '0.75 ct')", "clarity": "clarity grade (e.g. 'VS1')",` : ""}
  "tag": "optional short badge like 'Bestseller', 'New', 'Limited', or empty string"
}`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit reached. Try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable settings." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${resp.status} ${t}`);
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let details: Record<string, string> = {};
    try {
      details = typeof content === "string" ? JSON.parse(content) : content;
    } catch {
      details = {};
    }

    return new Response(JSON.stringify({ details }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-product-details error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});