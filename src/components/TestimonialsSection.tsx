import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Farzana Rahman",
    location: "Chittagong",
    rating: 5,
    text: "Bought my entire bridal set from Swastika. The kundan choker is breathtaking — every guest at the wedding asked where I got it. Service was personal and unhurried.",
    occasion: "Bridal Set Purchase",
  },
  {
    name: "Tahmid Hasan",
    location: "Dhaka",
    rating: 5,
    text: "Ordered a 1.2ct solitaire ring for my engagement. GIA certified, perfectly set, and delivered to Dhaka in a week. The transparency on diamond grading was exactly what I needed.",
    occasion: "Engagement Ring",
  },
  {
    name: "Nusrat Jahan",
    location: "Chittagong",
    rating: 5,
    text: "Three generations of my family buy gold from Swastika Jewellers. The 22K bangles I bought last Eid are flawless — every piece is BIS hallmarked and the resale value is honest.",
    occasion: "Festive Gold",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Loved by Generations
          </h2>
          <div className="w-20 h-[2px] bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors duration-500 flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm font-body text-foreground/85 leading-relaxed mb-5 flex-1">
                "{t.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-display text-base font-semibold">{t.name}</p>
                <p className="text-xs font-body text-muted-foreground">
                  {t.location} · {t.occasion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
