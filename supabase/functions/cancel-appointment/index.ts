import { createClient } from "https://esm.sh/@supabase/supabase-js@2.106.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { reference, phone, token, reason } = await req.json();
    if (!reference || !phone || !token) return json({ error: "Booking reference, phone and cancel token are required." }, 400);

    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Cancellation service is not configured.");

    const admin = createClient(url, key);
    const { data: appointment, error: readError } = await admin
      .from("appointments")
      .select("id,status,phone,reference,cancel_token")
      .eq("reference", String(reference).trim())
      .eq("cancel_token", String(token).trim())
      .maybeSingle();

    if (readError) throw readError;
    if (!appointment) return json({ error: "No matching booking was found. Please check the reference and cancel link." }, 404);
    const cleanPhone = String(phone).replace(/\D/g, "");
    const storedPhone = String(appointment.phone).replace(/\D/g, "");
    if (!storedPhone.endsWith(cleanPhone.slice(-8))) return json({ error: "Phone number does not match this booking." }, 403);
    if (appointment.status === "cancelled") return json({ ok: true, message: "This appointment is already cancelled." });

    const { error: updateError } = await admin
      .from("appointments")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancellation_reason: reason ? String(reason).slice(0, 500) : null,
        is_read: false,
      })
      .eq("id", appointment.id);

    if (updateError) throw updateError;
    return json({ ok: true, message: "Appointment cancelled successfully." });
  } catch (e) {
    console.error("cancel-appointment error", e);
    return json({ error: e instanceof Error ? e.message : "Cancellation failed." }, 500);
  }
});
