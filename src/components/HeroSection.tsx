import heroImg from "@/assets/hero-jewelry.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-24">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Swastika Jewellers - Exquisite Gold Jewelry Collection"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32">
        <div className="max-w-xl space-y-6">
          <p className="text-primary tracking-[0.4em] text-sm font-body font-semibold uppercase opacity-0 animate-fade-in">
            Since 1985 · Trusted by Generations
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight opacity-0 animate-fade-in [animation-delay:200ms]">
            Timeless
            <span className="block text-primary">Elegance</span>
            in Gold
          </h1>
          <p className="text-lg md:text-xl font-body text-foreground/70 max-w-md opacity-0 animate-fade-in [animation-delay:400ms]">
            Discover handcrafted jewelry that celebrates tradition, artistry, and the beauty of pure gold.
          </p>
          <div className="flex gap-4 opacity-0 animate-fade-in [animation-delay:600ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.15em] uppercase text-sm font-body font-semibold px-8">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.15em] uppercase text-sm font-body font-semibold px-8">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Gold rate ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-maroon-deep/90 backdrop-blur-sm border-t border-border py-3">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm font-body">
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground tracking-wider">TODAY'S GOLD RATE</span>
            <span className="text-primary font-semibold">22K: ₹6,250/gm</span>
            <span className="text-primary font-semibold hidden sm:inline">24K: ₹6,820/gm</span>
          </div>
          <span className="text-muted-foreground text-xs hidden md:inline">*Rates updated daily</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
