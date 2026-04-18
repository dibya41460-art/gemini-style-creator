import { useMemo, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductDetailModal from "@/components/ProductDetailModal";
import AppointmentDialog from "@/components/AppointmentDialog";
import { categories, type CategoryItem } from "@/data/categories";

type SortMode = "featured" | "price-asc" | "price-desc" | "name";
type TypeFilter = "all" | "Gold" | "Diamond";
type PriceFilter = "all" | "lt50" | "50to150" | "150to300" | "gt300";

const PRICE_RANGES: Record<PriceFilter, (v: number) => boolean> = {
  all: () => true,
  lt50: (v) => v < 50000,
  "50to150": (v) => v >= 50000 && v < 150000,
  "150to300": (v) => v >= 150000 && v < 300000,
  gt300: (v) => v >= 300000,
};

const CategoryPage = () => {
  const { slug } = useParams();
  const data = slug ? categories[slug] : undefined;

  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortMode>("featured");
  const [selected, setSelected] = useState<CategoryItem | null>(null);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setTypeFilter("all");
    setPriceFilter("all");
    setSort("featured");
  }, [slug]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let list = data.items.filter(
      (i) =>
        (typeFilter === "all" || i.type === typeFilter) &&
        PRICE_RANGES[priceFilter](i.priceValue)
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.priceValue - b.priceValue);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.priceValue - a.priceValue);
    else if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [data, typeFilter, priceFilter, sort]);

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

      {/* Filters */}
      <section className="sticky top-20 z-20 bg-background/95 backdrop-blur border-y border-border">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-body text-muted-foreground uppercase tracking-wider hidden md:inline">
            Filter
          </span>

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
            <SelectTrigger className="w-[130px] h-9 text-xs bg-card border-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
              <SelectItem value="Diamond">Diamond</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={(v) => setPriceFilter(v as PriceFilter)}>
            <SelectTrigger className="w-[170px] h-9 text-xs bg-card border-border">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="lt50">Under ৳50,000</SelectItem>
              <SelectItem value="50to150">৳50,000 – ৳1,50,000</SelectItem>
              <SelectItem value="150to300">৳1,50,000 – ৳3,00,000</SelectItem>
              <SelectItem value="gt300">Above ৳3,00,000</SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs font-body text-muted-foreground hidden md:inline">
              {filtered.length} of {data.items.length}
            </span>
            <Select value={sort} onValueChange={(v) => setSort(v as SortMode)}>
              <SelectTrigger className="w-[150px] h-9 text-xs bg-card border-border">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name">Name (A–Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-xl mb-2">No designs match your filters</p>
              <p className="text-muted-foreground text-sm font-body mb-4">
                Try adjusting type or price range.
              </p>
              <Button
                variant="outline"
                onClick={() => { setTypeFilter("all"); setPriceFilter("all"); }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="group text-left bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-500"
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
                    <Badge
                      variant="outline"
                      className="absolute top-2 left-2 bg-background/80 border-primary/40 text-primary text-[10px] tracking-wider"
                    >
                      {item.type}
                    </Badge>
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
                    <p className="text-primary font-display text-base md:text-lg font-bold pt-1">
                      {item.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* CTA Footer */}
          <div className="mt-16 text-center bg-card border border-border rounded-lg p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Looking for something custom?
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
              Visit our Chittagong showroom or book a virtual consultation with our master jewelers to design your perfect piece.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => setBookOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.15em] uppercase text-sm font-body font-semibold px-8"
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => { window.location.href = "#footer"; }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.15em] uppercase text-sm font-body font-semibold px-8"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ProductDetailModal
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
      <AppointmentDialog open={bookOpen} onClose={() => setBookOpen(false)} />
    </div>
  );
};

export default CategoryPage;
