import diamondRing from "@/assets/diamond-ring.jpg";
import diamondBracelet from "@/assets/diamond-bracelet.jpg";
import diamondEarrings from "@/assets/diamond-earrings.jpg";
import diamondPendant from "@/assets/diamond-pendant.jpg";
import featured3 from "@/assets/featured-3.jpg";
import featured4 from "@/assets/featured-4.jpg";

const diamondProducts = [
  { name: "Solitaire Ring", price: "₹1,85,000", carat: "1.2 ct", clarity: "VS1", image: diamondRing, tag: "Bestseller" },
  { name: "Tennis Bracelet", price: "₹3,20,000", carat: "5.0 ct", clarity: "VS2", image: diamondBracelet, tag: "Premium" },
  { name: "Princess Studs", price: "₹95,000", carat: "0.8 ct", clarity: "VVS2", image: diamondEarrings, tag: null },
  { name: "Pear Drop Pendant", price: "₹1,45,000", carat: "1.5 ct", clarity: "VS1", image: diamondPendant, tag: "New" },
  { name: "Eternity Band", price: "₹1,10,000", carat: "1.0 ct", clarity: "VS2", image: featured3, tag: null },
  { name: "Diamond Mangalsutra", price: "₹78,000", carat: "0.5 ct", clarity: "VS1", image: featured4, tag: "Trending" },
];

const DiamondSection = () => {
  return (
    <section id="diamond" className="py-20 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Brilliant Sparkle
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Diamond Collection
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Discover IGI & GIA certified diamonds set in platinum and white gold. Each piece is a masterwork of precision, fire, and brilliance.
          </p>
          <div className="w-20 h-[2px] bg-primary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {diamondProducts.map((product) => (
            <div
              key={product.name}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm font-body font-semibold">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-display text-sm md:text-base font-semibold group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
                  <span>{product.carat}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{product.clarity}</span>
                </div>
                <p className="text-primary font-display text-base md:text-lg font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiamondSection;
