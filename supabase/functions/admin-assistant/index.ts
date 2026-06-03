const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
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
          { role: "system", content: `Dashboard context: ${JSON.stringify(context ?? {})}` },
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
