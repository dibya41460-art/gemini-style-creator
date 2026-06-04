// Auto-generate jewelry details and optional product image using Lovable AI
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.106.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const ALLOWED_CATEGORIES = new Set(["featured", "gold", "diamond", "bridal", "general"]);
const ALLOWED_TONES = new Set(["premium", "traditional", "modern", "bridal"]);
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, max).trim() : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!url || !anonKey || !serviceKey || !LOVABLE_API_KEY) throw new Error("Service is not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);
    const token = authHeader.slice(7);
    const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user) return json({ error: "Unauthorized" }, 401);
    const admin = createClient(url, serviceKey);
    const { data: roleRow } = await admin
      .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
    if (!roleRow) return json({ error: "Admin access required." }, 403);

    const body = await req.json();
    const name = clean(body?.name, 200);
    if (!name) return json({ error: "name is required" }, 400);
    const rawCategory = clean(body?.category, 40).toLowerCase();
    const category = ALLOWED_CATEGORIES.has(rawCategory) ? rawCategory : "general";
    const price = clean(body?.price, 40);
    const rawTone = clean(body?.tone, 40).toLowerCase() || "premium";
    const tone = ALLOWED_TONES.has(rawTone) ? rawTone : "premium";
    const targetRegion = clean(body?.targetRegion, 100);
    const generateImage = body?.generateImage === true;
    const imageDataUrl = typeof body?.imageDataUrl === "string" && body.imageDataUrl.startsWith("data:image/")
      ? body.imageDataUrl.slice(0, 8_000_000)
      : undefined;

    const isDiamond = category === "diamond" || /diamond|solitaire/i.test(name);
    const isGold = category === "gold" || /gold|coin|bangle|chain|haar|kada/i.test(name);
    const styleGuide: Record<string, string> = {
      premium: "premium boutique, refined and trustworthy",
      traditional: "traditional heritage, artisan-led and culturally rich",
      modern: "modern luxury, concise and clean",
      bridal: "bridal emotional, elegant and occasion-focused",
    };

    const systemPrompt = `You are a senior jewelry copywriter for Swastika Jewellers in Chittagong, Bangladesh. Generate realistic metadata from the provided product name${imageDataUrl ? " and uploaded product photo" : ""}. If a photo is provided, infer visible design style, metal color, stones, and category from it, but do not invent impossible certifications. Tone: ${styleGuide[tone] ?? styleGuide.premium}. Target origin/region preference: ${targetRegion || "use the most credible origin for the piece"}. Keep fields concise.`;

    const userPrompt = `Generate product details for:\n- Name: ${name}\n- Category: ${category ?? "general"}\n- Price: ${price ?? "unspecified"}\n\nReturn ONLY valid JSON matching this schema:\n{\n  "description": "1–2 sentence description",\n  "origin": "credible origin country/city or sourcing story",\n  "material": "metal, stones, finish",\n  "craftsmanship": "how it was crafted",\n  "certification": "hallmarks/certifications or inspection note",\n  "delivery_time": "estimated delivery window",\n  ${isGold ? `"purity": "gold purity", "weight": "approximate weight",` : ""}\n  ${isDiamond ? `"carat": "diamond carat", "clarity": "clarity grade",` : ""}\n  "tag": "short badge or empty string"\n}`;

    const messageContent = imageDataUrl
      ? [{ type: "text", text: userPrompt }, { type: "image_url", image_url: { url: imageDataUrl } }]
      : userPrompt;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: imageDataUrl ? "google/gemini-2.5-flash" : "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: messageContent }],
        response_format: { type: "json_object" },
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      if (resp.status === 429) return json({ error: "Rate limit reached. Try again in a moment." }, 429);
      if (resp.status === 402) return json({ error: "AI credits exhausted. Please add credits in Lovable settings." }, 402);
      throw new Error(`AI gateway error: ${resp.status} ${t}`);
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "{}";
    let details: Record<string, string> = {};
    try { details = typeof content === "string" ? JSON.parse(content) : content; } catch { details = {}; }

    let generatedImage: string | null = null;
    if (generateImage) {
      const prompt = `A clean catalog product photo of ${name}, ${details.material || "fine jewelry"}, ${details.description || "luxury jewelry"}, on a simple premium dark jewelry display background, no text, realistic product photography.`;
      const imgResp = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: "openai/gpt-image-2", prompt, quality: "low", size: "1024x1024", n: 1 }),
      });
      if (!imgResp.ok) {
        if (imgResp.status === 429) return json({ error: "Image AI is busy. Retry in a moment.", details }, 429);
        if (imgResp.status === 402) return json({ error: "AI credits exhausted. Please add credits in Lovable settings.", details }, 402);
        throw new Error(`AI image failed: ${imgResp.status} ${await imgResp.text()}`);
      }
      const img = await imgResp.json();
      const b64 = img.data?.[0]?.b64_json;
      if (b64) generatedImage = `data:image/png;base64,${b64}`;
    }

    return json({ details, generatedImage });
  } catch (e) {
    console.error("generate-product-details error", e);
    return json({ error: (e as Error).message }, 500);
  }
});
