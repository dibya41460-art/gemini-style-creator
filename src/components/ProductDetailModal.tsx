import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Shield, Clock, Package, Phone } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex gap-3">
    <Icon className="w-4 h-4 text-primary mt-1 shrink-0" />
    <div>
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">{label}</p>
      <p className="text-sm font-body text-foreground/90 leading-relaxed">{value}</p>
    </div>
  </div>
);

const ProductDetailModal = ({ product, open, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 bg-card border-border overflow-hidden max-h-[90vh]">
        <div className="flex flex-col md:flex-row max-h-[90vh]">
          {/* Image */}
          <div className="relative w-full md:w-[45%] shrink-0">
            <div className="aspect-square md:aspect-auto md:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.tag && (
              <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-sm font-body font-semibold">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                {product.purity && <Badge variant="outline" className="border-primary text-primary text-[10px]">{product.purity}</Badge>}
                {product.carat && <Badge variant="outline" className="border-primary text-primary text-[10px]">{product.carat}</Badge>}
                {product.clarity && <Badge variant="outline" className="border-muted-foreground text-muted-foreground text-[10px]">{product.clarity}</Badge>}
              </div>
              <h2 className="font-display text-2xl font-bold">{product.name}</h2>
              <p className="text-primary font-display text-2xl font-bold mt-1">{product.price}</p>
              {product.weight && (
                <p className="text-muted-foreground text-sm font-body mt-0.5">Weight: {product.weight}</p>
              )}
              <p className="text-muted-foreground/50 text-xs font-body mt-1">SKU: {product.sku}</p>
            </div>

            <Separator className="bg-border" />

            {/* Description */}
            <div>
              <h3 className="font-display text-sm font-semibold text-primary uppercase tracking-wider mb-2">About This Piece</h3>
              <p className="text-sm font-body text-foreground/80 leading-relaxed">{product.description}</p>
            </div>

            <Separator className="bg-border" />

            {/* Origin */}
            <div>
              <h3 className="font-display text-sm font-semibold text-primary uppercase tracking-wider mb-3">Origin & Details</h3>
              <div className="space-y-4">
                <DetailRow icon={MapPin} label="Origin" value={product.origin} />
                <DetailRow icon={Package} label="Material" value={product.material} />
                <DetailRow icon={Shield} label="Craftsmanship" value={product.craftsmanship} />
                <DetailRow icon={Shield} label="Certification" value={product.certification} />
                <DetailRow icon={Clock} label="Delivery" value={product.deliveryTime} />
              </div>
            </div>

            <Separator className="bg-border" />

            {/* CTA */}
            <div className="flex gap-3 pt-1">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-gold-dark tracking-[0.1em] uppercase text-xs font-body font-semibold">
                <Phone className="w-4 h-4 mr-1" /> Enquire Now
              </Button>
              <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-[0.1em] uppercase text-xs font-body font-semibold">
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
