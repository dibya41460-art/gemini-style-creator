import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { useEffect } from "react";

const CategoryPage = () => {
  const { slug } = useParams();
  const data = slug ? categories[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!data) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={data.heroImage}
            alt={`${data.name} collection at Swastika Jewellers`}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="relative container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-primary hover:text-gold-dark transition-colors text-sm font-body tracking-wider uppercase mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="max-w-2xl">
            <p className="text-primary tracking-[0.4em] text-xs font-body font-semibold uppercase mb-3">
              {data.tagline}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              {data.name}
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-4">
              {data.description}
            </p>
            <div className="flex items-center gap-3 text-sm font-body">
              <span className="text-primary font-semibold">{data.total}+ Designs</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="text-muted-foreground">BIS Hallmarked · IGI Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data.items.map((item, i) => (
              <article
                key={`${item.name}-${i}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={768}
                    height={768}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 text-primary text-xs font-body font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-sm">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-display text-sm md:text-base font-semibold group-hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body">{item.meta}</p>
                  <p className="text-primary font-display text-base md:text-lg font-bold pt-1">{item.price}</p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA Footer */}
          <div className="mt-16 text-center bg-card border border-border rounded-lg p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Looking for something custom?
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
              Visit our showroom or book a virtual consultation with our master jewelers to design your perfect piece.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.15em] uppercase text-sm font-body font-semibold px-8">
                Book Appointment
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.15em] uppercase text-sm font-body font-semibold px-8">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
