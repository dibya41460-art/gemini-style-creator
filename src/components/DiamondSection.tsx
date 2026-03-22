import { useState } from "react";
import { diamondProducts, type Product } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";

const DiamondSection = () => {
  const [selected, setSelected] = useState<Product | null>(null);

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
            <button
              key={product.id}
              onClick={() => setSelected(product)}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500 text-left cursor-pointer"
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
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 text-primary text-xs font-body font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-sm">
                    View Details
                  </span>
                </div>
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
            </button>
          ))}
        </div>
      </div>

      <ProductDetailModal product={selected} open={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default DiamondSection;
