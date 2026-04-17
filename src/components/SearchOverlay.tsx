import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchItem {
  name: string;
  category: string;
  price: string;
  section: string;
  image?: string;
}

const allProducts: SearchItem[] = [
  // Gold
  { name: "Antique Gold Chain", category: "Gold", price: "৳1,32,000", section: "#gold" },
  { name: "Gold Coins (10gm)", category: "Gold", price: "৳68,200", section: "#gold" },
  { name: "Bridal Anklet Pair", category: "Gold", price: "৳45,000", section: "#gold" },
  { name: "Kundan Necklace Set", category: "Gold", price: "৳2,10,000", section: "#gold" },
  { name: "Meenakari Bangles", category: "Gold", price: "৳88,000", section: "#gold" },
  { name: "Cocktail Gold Ring", category: "Gold", price: "৳32,000", section: "#gold" },
  // Diamond
  { name: "Solitaire Ring", category: "Diamond", price: "৳1,85,000", section: "#diamond" },
  { name: "Tennis Bracelet", category: "Diamond", price: "৳3,20,000", section: "#diamond" },
  { name: "Princess Studs", category: "Diamond", price: "৳95,000", section: "#diamond" },
  { name: "Pear Drop Pendant", category: "Diamond", price: "৳1,45,000", section: "#diamond" },
  { name: "Eternity Band", category: "Diamond", price: "৳1,10,000", section: "#diamond" },
  { name: "Diamond Mangalsutra", category: "Diamond", price: "৳78,000", section: "#diamond" },
  // Featured
  { name: "Royal Bridal Set", category: "Bridal", price: "৳2,45,000", section: "#bridal" },
  { name: "Temple Choker", category: "Featured", price: "৳1,85,000", section: "#collections" },
  { name: "Diamond Pendant", category: "Featured", price: "৳65,000", section: "#collections" },
  { name: "Mangalsutra", category: "Featured", price: "৳78,000", section: "#collections" },
  // Categories
  { name: "Necklaces", category: "Category", price: "120+ Designs", section: "#collections" },
  { name: "Earrings", category: "Category", price: "85+ Designs", section: "#collections" },
  { name: "Bangles", category: "Category", price: "60+ Designs", section: "#collections" },
  { name: "Rings", category: "Category", price: "95+ Designs", section: "#collections" },
];

const SearchOverlay = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) onClose(); // toggle handled by parent
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = query.trim().length > 0
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (section: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(section);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Search panel */}
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-2xl shadow-primary/5 animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search jewelry, collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground font-body text-lg placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim().length === 0 ? (
            <div className="px-5 py-6 text-center">
              <p className="text-muted-foreground font-body text-sm">
                Start typing to search across all collections
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Necklace", "Ring", "Diamond", "Bridal", "Bangles", "Gold Coins"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-body tracking-wider rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-muted-foreground font-body">No results for "{query}"</p>
              <p className="text-muted-foreground/60 font-body text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <ul className="py-2">
              {filtered.map((item) => (
                <li key={`${item.name}-${item.category}`}>
                  <button
                    onClick={() => handleSelect(item.section)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/60 transition-colors text-left group"
                  >
                    <div>
                      <p className="font-display text-sm font-semibold group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                      <p className="text-muted-foreground text-xs font-body">{item.category}</p>
                    </div>
                    <span className="text-primary font-body text-sm font-semibold">{item.price}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground/60 font-body tracking-wider uppercase">
          <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
