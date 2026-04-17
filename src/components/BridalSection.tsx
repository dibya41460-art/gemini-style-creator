import { useState } from "react";
import bridalSet1 from "@/assets/bridal-set-1.jpg";
import bridalSet2 from "@/assets/bridal-set-2.jpg";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppointmentDialog from "@/components/AppointmentDialog";

const bridalSets = [
  {
    image: bridalSet1,
    name: "Royal Kundan Set",
    description: "Heavy 22K gold kundan necklace with matching jhumka earrings and maang tikka.",
    price: "৳ 4,85,000",
  },
  {
    image: bridalSet2,
    name: "Heritage Bridal Suite",
    description: "Complete bridal ensemble — necklace, earrings, tikka, nose ring, and bangles.",
    price: "৳ 7,20,000",
  },
];

const BridalSection = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <section id="bridal" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image side */}
          <div className="relative rounded-lg overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]">
            <img
              src={bridalSet2}
              alt="Bangladeshi bride wearing handcrafted gold bridal set at Swastika Jewellers"
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

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => setGalleryOpen(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.15em] uppercase text-sm font-body font-semibold px-8"
              >
                View Bridal Sets
              </Button>
              <Button
                onClick={() => setBookOpen(true)}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.15em] uppercase text-sm font-body font-semibold"
              >
                Book Trial
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bridal sets gallery */}
      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Bridal Sets</DialogTitle>
            <DialogDescription>Handcrafted in Chittagong — book a free trial</DialogDescription>
          </DialogHeader>
          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {bridalSets.map((set) => (
              <div key={set.name} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={set.image} alt={set.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-display text-lg font-semibold">{set.name}</h3>
                  <p className="text-primary font-display font-bold">{set.price}</p>
                  <p className="text-xs text-muted-foreground font-body">{set.description}</p>
                  <Button
                    onClick={() => { setGalleryOpen(false); setBookOpen(true); }}
                    size="sm"
                    className="w-full mt-2 bg-primary text-primary-foreground hover:bg-gold-dark uppercase text-xs tracking-[0.1em]"
                  >
                    Book Trial
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AppointmentDialog open={bookOpen} onClose={() => setBookOpen(false)} productName="Bridal Trial Session" />
    </section>
  );
};

export default BridalSection;
