import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HelpCenter = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!phone.trim() || reason.trim().length < 5) return toast.error("Enter your booking phone number and complaint reason.");
    setBusy(true);
    const { error } = await (supabase as any).from("complaints").insert({
      name: name.trim() || null,
      phone: phone.trim(),
      reference: reference.trim() || null,
      reason: reason.trim(),
      status: "open",
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Complaint submitted. Our team will review it.");
    setName(""); setPhone(""); setReference(""); setReason("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-36 pb-20 max-w-xl">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h1 className="font-display text-3xl text-primary">Help Center</h1>
          <p className="text-sm text-muted-foreground">Submit a complaint using the phone number used for your booking.</p>
          <Input placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Booking phone number *" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input placeholder="Appointment reference (optional)" value={reference} onChange={(e) => setReference(e.target.value)} />
          <Textarea placeholder="Reason for complaint *" value={reason} onChange={(e) => setReason(e.target.value)} rows={5} />
          <Button onClick={submit} disabled={busy} className="w-full bg-primary text-primary-foreground hover:bg-gold-dark">{busy ? "Submitting…" : "Submit complaint"}</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
