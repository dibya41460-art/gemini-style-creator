import bridalHero from "@/assets/bridal-hero.jpg";
import featured1 from "@/assets/featured-1.jpg";
import { Button } from "@/components/ui/button";

const BridalSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image side */}
          <div className="relative rounded-lg overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]">
            <img
              src={bridalHero}
              alt="Bridal jewelry collection at Swastika Jewellers"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>

          {/* Content side */}
          <div className="space-y-6">
            <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase">
              For Your Special Day
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Bridal
              <span className="block text-primary">Collection</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Make your wedding day unforgettable with our handcrafted bridal jewelry sets. 
              From classic temple jewelry to contemporary kundan designs, each set is created 
              to complement the radiance of the bride.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 py-4">
              {[
                { label: "Complete Sets", value: "50+" },
                { label: "Custom Designs", value: "100%" },
                { label: "Trial Available", value: "Free" },
                { label: "EMI Options", value: "0% Interest" },
              ].map((item) => (
                <div key={item.label} className="border border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors">
                  <p className="text-primary font-display text-xl font-bold">{item.value}</p>
                  <p className="text-muted-foreground text-xs font-body mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.15em] uppercase text-sm font-body font-semibold px-8">
                View Bridal Sets
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.15em] uppercase text-sm font-body font-semibold">
                Book Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalSection;
