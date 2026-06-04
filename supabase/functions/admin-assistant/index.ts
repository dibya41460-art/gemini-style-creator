import { createClient } from "https://esm.sh/@supabase/supabase-js@2.106.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const sanitizeContext = (ctx: unknown): Record<string, number | string> => {
  if (!ctx || typeof ctx !== "object") return {};
  const src = ctx as Record<string, unknown>;
  const out: Record<string, number | string> = {};
  const numKeys = ["appointmentsCount", "openComplaints", "productsCount", "unreadAppointments"];
  for (const k of numKeys) if (typeof src[k] === "number" && Number.isFinite(src[k])) out[k] = src[k] as number;
  if (typeof src.activeTab === "string") out.activeTab = String(src.activeTab).slice(0, 40).replace(/[^a-zA-Z0-9_-]/g, "");
  return out;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !anonKey || !serviceKey) throw new Error("Assistant is not configured.");

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

    const { message, context, history } = await req.json();
    if (!message || String(message).trim().length < 2) return json({ error: "Please type a question for the assistant." }, 400);
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) throw new Error("AI assistant is not configured.");

    const priorTurns = Array.isArray(history)
      ? history
          .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .slice(-12)
          .map((m: any) => ({ role: m.role, content: String(m.content).slice(0, 4000) }))
      : [];

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "You are a practical admin assistant and research partner for Swastika Jewellers in Chittagong, Bangladesh. Help the admin chat through product ideas, draft descriptions and titles, suggest pricing and promotions, research jewelry trends, draft replies to complaints, and plan content updates. You remember the conversation so far and build on previous turns. Use markdown (bullets, bold, short headings) for clarity. Be concise and action-oriented. You can advise, draft text, and suggest steps, but do not claim you directly changed the website — the admin applies changes themselves.",
          },
          { role: "system", content: `Dashboard context (trusted summary only): ${JSON.stringify(sanitizeContext(context))}` },
          ...priorTurns,
          { role: "user", content: String(message).slice(0, 4000) },
        ],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) return json({ error: "AI is busy right now. Please retry in a moment." }, 429);
      if (resp.status === 402) return json({ error: "AI credits are exhausted. Please add credits in Lovable settings." }, 402);
      throw new Error(`AI assistant failed (${resp.status}).`);
    }
    const data = await resp.json();
    return json({ answer: data.choices?.[0]?.message?.content ?? "I could not generate a response." });
  } catch (e) {
    console.error("admin-assistant error", e);
    return json({ error: e instanceof Error ? e.message : "Assistant failed." }, 500);
  }
});
