import { useState } from "react";
import { Menu, X, Phone, MapPin, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Collections", href: "#collections" },
  { label: "Gold", href: "#gold" },
  { label: "Diamond", href: "#diamond" },
  { label: "Bridal", href: "#bridal" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-maroon-deep border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-1.5 px-4 text-xs tracking-widest">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 98765 43210</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin className="w-3 h-3" /> Main Market, India</span>
          </div>
          <span className="text-primary font-body text-xs tracking-[0.2em]">FREE SHIPPING ON ORDERS ABOVE ₹50,000</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <a href="#" className="flex flex-col items-center">
            <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-primary">
              SWASTIKA
            </span>
            <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase -mt-1">
              Jewellers
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300 font-body font-semibold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="text-foreground/70 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-foreground/70 hover:text-primary transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button
              className="lg:hidden text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 text-sm tracking-[0.15em] uppercase text-foreground/80 hover:text-primary hover:bg-muted transition-colors font-body font-semibold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
