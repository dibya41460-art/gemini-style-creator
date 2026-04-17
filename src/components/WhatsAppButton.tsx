import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import AppointmentDialog from "@/components/AppointmentDialog";
import { SHOP_PHONE_WA } from "@/lib/shop";

const WhatsAppButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const waUrl = `https://wa.me/${SHOP_PHONE_WA}?text=${encodeURIComponent(
    "Hello Swastika Jewellers, I'd like to know more about your collection."
  )}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {menuOpen && (
          <div className="flex flex-col gap-2 animate-fade-in">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border text-foreground hover:border-primary hover:text-primary text-sm font-body font-medium px-4 py-2 rounded-full shadow-lg transition-colors"
            >
              💬 Chat on WhatsApp
            </a>
            <button
              onClick={() => { setBookOpen(true); setMenuOpen(false); }}
              className="bg-card border border-border text-foreground hover:border-primary hover:text-primary text-sm font-body font-medium px-4 py-2 rounded-full shadow-lg transition-colors text-right"
            >
              📅 Book Appointment
            </button>
          </div>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Contact us"
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        </button>
      </div>
      <AppointmentDialog open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
};

export default WhatsAppButton;
