import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Search, ShoppingBag } from "lucide-react";
import SearchOverlay from "@/components/SearchOverlay";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar — hides on scroll */}
      <div
        className={`bg-maroon-deep border-b border-border overflow-hidden transition-all duration-500 ${
          scrolled ? "max-h-0 border-b-0" : "max-h-12"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-1.5 px-4 text-xs tracking-widest">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> +91 98765 43210
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Main Market, India
            </span>
          </div>
          <span className="text-primary font-body text-xs tracking-[0.2em]">
            FREE SHIPPING ON ORDERS ABOVE ₹50,000
          </span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`border-b border-border transition-all duration-500 ${
          scrolled
            ? "bg-background/98 backdrop-blur-xl shadow-lg shadow-background/50"
            : "bg-background/95 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <a href="#hero" className="flex flex-col items-center group">
            <span className="font-display text-2xl md:text-3xl font-bold tracking-wider text-primary group-hover:text-gold-light transition-colors duration-300">
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
                  className={`relative text-sm tracking-[0.15em] uppercase font-body font-semibold transition-colors duration-300 ${
                    activeSection === link.href
                      ? "text-primary"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground/60 hover:text-primary transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="relative text-foreground/60 hover:text-primary transition-colors duration-300">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="lg:hidden text-foreground/60 hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden bg-background border-t border-border overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-96" : "max-h-0 border-t-0"
          }`}
        >
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`block px-6 py-3 text-sm tracking-[0.15em] uppercase font-body font-semibold transition-colors ${
                    activeSection === link.href
                      ? "text-primary bg-muted/50"
                      : "text-foreground/60 hover:text-primary hover:bg-muted"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
