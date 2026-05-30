import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Phone, X } from "lucide-react";
import { useShopSettings } from "@/hooks/useShopSettings";

interface CallUsDialogProps {
  open: boolean;
  onClose: () => void;
  autoCloseMs?: number;
}

const CallUsDialog = ({ open, onClose, autoCloseMs = 8000 }: CallUsDialogProps) => {
  const shop = useShopSettings();
  const [remaining, setRemaining] = useState(Math.ceil(autoCloseMs / 1000));

  useEffect(() => {
    if (!open) return;
    setRemaining(Math.ceil(autoCloseMs / 1000));
    const tick = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    const close = setTimeout(onClose, autoCloseMs);
    return () => {
      clearInterval(tick);
      clearTimeout(close);
    };
  }, [open, autoCloseMs, onClose]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md bg-card border-primary/40 p-0 overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Cancel"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-background/80 hover:bg-background border border-border flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="p-8 text-center space-y-5">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Phone className="w-7 h-7 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-body">Call us at</p>
            <a
              href={`tel:${shop.phone_tel}`}
              className="block font-display text-3xl md:text-4xl font-bold text-primary hover:text-gold-light transition-colors break-all"
            >
              {shop.phone}
            </a>
            <p className="text-sm text-muted-foreground font-body">
              {shop.shop_name} · {shop.address_short}
            </p>
          </div>
          <a
            href={`tel:${shop.phone_tel}`}
            className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground hover:bg-gold-dark uppercase tracking-[0.15em] text-xs font-semibold py-3 rounded-md transition-colors"
          >
            <Phone className="w-4 h-4" /> Tap to call now
          </a>
          <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
            This message closes in {remaining}s
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallUsDialog;