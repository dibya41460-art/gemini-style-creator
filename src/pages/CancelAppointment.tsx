import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const CancelAppointment = () => {
  const [params] = useSearchParams();
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const reference = useMemo(() => params.get("ref") ?? "", [params]);
  const token = useMemo(() => params.get("token") ?? "", [params]);

  const cancel = async () => {
    if (!reference || !token) return toast.error("This cancellation link is missing booking details.");
    if (!phone.trim()) return toast.error("Enter the phone number used for booking.");
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("cancel-appointment", {
      body: { reference, token, phone: phone.trim(), reason: reason.trim() || undefined },
    });
    setBusy(false);
    if (error || data?.error) return toast.error(error?.message ?? data.error);
    setDone(true);
    toast.success(data?.message ?? "Appointment cancelled");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-36 pb-20 max-w-lg">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h1 className="font-display text-3xl text-primary">Cancel Appointment</h1>
          {done ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">Your appointment has been cancelled. Our team has been notified.</p>
              <Link to="/"><Button className="bg-primary text-primary-foreground hover:bg-gold-dark">Back to website</Button></Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Reference: <span className="text-foreground">{reference || "Missing"}</span></p>
              <Input placeholder="Phone number used for booking" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Textarea placeholder="Reason for cancellation (optional)" value={reason} onChange={(e) => setReason(e.target.value)} rows={3} />
              <Button onClick={cancel} disabled={busy} className="w-full bg-primary text-primary-foreground hover:bg-gold-dark">{busy ? "Cancelling…" : "Cancel appointment"}</Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancelAppointment;
