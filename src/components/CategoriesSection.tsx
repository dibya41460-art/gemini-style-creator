import necklaceImg from "@/assets/category-necklace.jpg";
import earringsImg from "@/assets/category-earrings.jpg";
import banglesImg from "@/assets/category-bangles.jpg";
import ringsImg from "@/assets/category-rings.jpg";

const categories = [
  { name: "Necklaces", image: necklaceImg, count: "120+ Designs" },
  { name: "Earrings", image: earringsImg, count: "85+ Designs" },
  { name: "Bangles", image: banglesImg, count: "60+ Designs" },
  { name: "Rings", image: ringsImg, count: "95+ Designs" },
];

const CategoriesSection = () => {
  return (
    <section id="collections" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Our Collections
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Shop by Category
          </h2>
          <div className="w-20 h-[2px] bg-primary mx-auto" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={cat.image}
                alt={`${cat.name} collection at Swastika Jewellers`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-muted-foreground text-sm font-body">{cat.count}</p>
              </div>
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 rounded-lg transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
