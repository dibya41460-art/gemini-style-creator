import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, CheckCircle2 } from "lucide-react";
import { SHOP_PHONE } from "@/lib/shop";

interface AppointmentDialogProps {
  open: boolean;
  onClose: () => void;
  productName?: string;
}

const generateBookingId = () =>
  "SJ-" + Math.floor(100000 + Math.random() * 900000);

const AppointmentDialog = ({ open, onClose, productName }: AppointmentDialogProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState<{ id: string; date: string } | null>(null);

  const minDate = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time) {
      toast.error("Please fill all required fields");
      return;
    }
    const id = generateBookingId();
    const formatted = new Date(date).toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    setConfirmed({ id, date: `${formatted} at ${time}` });
    toast.success("Appointment confirmed!", {
      description: `Ref ${id} — we'll call ${phone} to confirm.`,
    });
  };

  const reset = () => {
    setName(""); setPhone(""); setDate(""); setTime(""); setNotes("");
    setConfirmed(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="max-w-md bg-card border-border">
        {confirmed ? (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-center">Booking Confirmed</DialogTitle>
              <DialogDescription className="text-center">
                Your appointment reference is{" "}
                <span className="text-primary font-semibold">{confirmed.id}</span>
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/40 rounded-lg p-4 space-y-1 text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Scheduled</p>
              <p className="text-sm font-body">{confirmed.date}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mt-2">Confirmation</p>
              <p className="text-sm font-body">SMS sent to {phone}</p>
              <p className="text-xs text-muted-foreground mt-2">Our team will call you from {SHOP_PHONE}</p>
            </div>
            <Button onClick={reset} className="w-full bg-primary text-primary-foreground hover:bg-gold-dark uppercase tracking-[0.15em] text-xs font-semibold">
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Book Appointment
              </DialogTitle>
              <DialogDescription>
                {productName ? `For "${productName}"` : "Visit our Chittagong showroom"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXX-XXXXXX" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input id="date" type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input id="time" type="time" min="10:00" max="20:00" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" rows={2} />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-gold-dark uppercase tracking-[0.15em] text-xs font-semibold">
                Confirm Appointment
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
