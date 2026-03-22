import featured1 from "@/assets/featured-1.jpg";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import featured4 from "@/assets/featured-4.jpg";

const products = [
  { name: "Royal Bridal Set", price: "₹2,45,000", weight: "45.2 gm", image: featured1, tag: "Bestseller" },
  { name: "Temple Choker", price: "₹1,85,000", weight: "38.6 gm", image: featured2, tag: "New Arrival" },
  { name: "Diamond Pendant", price: "₹65,000", weight: "8.4 gm", image: featured3, tag: null },
  { name: "Mangalsutra", price: "₹78,000", weight: "12.1 gm", image: featured4, tag: "Trending" },
];

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Handcrafted Excellence
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured Pieces
          </h2>
          <div className="w-20 h-[2px] bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.name}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
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
                <h3 className="font-display text-base md:text-lg font-semibold group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs font-body">{product.weight}</p>
                <p className="text-primary font-display text-lg font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
