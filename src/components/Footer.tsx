import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useShopSettings } from "@/hooks/useShopSettings";

const Footer = () => {
  const shop = useShopSettings();
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-display text-2xl font-bold text-primary">{shop.shop_name.toUpperCase()}</span>
              <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">{shop.shop_tagline}</p>
            </div>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              {shop.footer_about}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              {["Gold Jewelry", "Diamond Collection", "Bridal Sets", "Daily Wear", "Gift Ideas", "Custom Orders"].map((l) => (
                <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-display text-base font-semibold text-primary mb-4">Policies</h4>
            <ul className="space-y-2 text-sm font-body text-muted-foreground">
              {["Return Policy", "Exchange Policy", "Hallmark Guarantee", "Privacy Policy", "Terms & Conditions"].map((l) => (
                <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-primary mb-4">Visit Us</h4>
            <ul className="space-y-3 text-sm font-body text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {shop.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                {shop.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                {shop.email}
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                {shop.hours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-body">
          <p>© 2025 {shop.shop_name}. All rights reserved.</p>
          <p className="mt-1 md:mt-0">Crafted with ❤️ for lovers of fine jewelry</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
