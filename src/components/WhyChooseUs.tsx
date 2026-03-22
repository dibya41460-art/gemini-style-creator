import { Shield, Award, Gem, Truck } from "lucide-react";

const features = [
  { icon: Shield, title: "BIS Hallmarked", desc: "Every piece certified for purity and authenticity" },
  { icon: Award, title: "40+ Years Legacy", desc: "Trusted by families across generations since 1985" },
  { icon: Gem, title: "Master Craftsmen", desc: "Handcrafted by India's finest artisans" },
  { icon: Truck, title: "Insured Delivery", desc: "Safe, secure, and insured shipping nationwide" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-maroon-deep border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Our Promise
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why Swastika Jewellers
          </h2>
          <div className="w-20 h-[2px] bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
