import goldChain from "@/assets/gold-chain.jpg";
import goldCoins from "@/assets/gold-coins.jpg";
import goldAnklet from "@/assets/gold-anklet.jpg";
import necklaceImg from "@/assets/category-necklace.jpg";
import banglesImg from "@/assets/category-bangles.jpg";
import ringsImg from "@/assets/category-rings.jpg";

const goldProducts = [
  { name: "Antique Gold Chain", price: "₹1,32,000", weight: "22.5 gm", purity: "22K", image: goldChain },
  { name: "Gold Coins (10gm)", price: "₹68,200", weight: "10 gm", purity: "24K", image: goldCoins },
  { name: "Bridal Anklet Pair", price: "₹45,000", weight: "18.2 gm", purity: "22K", image: goldAnklet },
  { name: "Kundan Necklace Set", price: "₹2,10,000", weight: "42.8 gm", purity: "22K", image: necklaceImg },
  { name: "Meenakari Bangles", price: "₹88,000", weight: "28.4 gm", purity: "22K", image: banglesImg },
  { name: "Cocktail Gold Ring", price: "₹32,000", weight: "6.8 gm", purity: "18K", image: ringsImg },
];

const GoldSection = () => {
  return (
    <section id="gold" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Pure Gold Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Gold Jewelry
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Explore our exquisite range of BIS hallmarked gold jewelry — from traditional designs to modern masterpieces, crafted in 18K, 22K & 24K gold.
          </p>
          <div className="w-20 h-[2px] bg-primary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {goldProducts.map((product) => (
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
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] tracking-[0.1em] uppercase px-2 py-1 rounded-sm font-body font-bold">
                  {product.purity}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-display text-sm md:text-base font-semibold group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs font-body">{product.weight}</p>
                <p className="text-primary font-display text-base md:text-lg font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoldSection;
