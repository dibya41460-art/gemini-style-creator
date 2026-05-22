import { featuredProducts, goldProducts, diamondProducts, type Product } from "@/data/products";
import { categories } from "@/data/categories";

export interface CatalogItem {
  id: string;
  name: string;
  price: string;
  image: string;
  source: string;
}

export const getAllCatalogItems = (): CatalogItem[] => {
  const out: CatalogItem[] = [];
  featuredProducts.forEach((p) => out.push({ id: p.id, name: p.name, price: p.price, image: p.image, source: "Featured" }));
  goldProducts.forEach((p) => out.push({ id: p.id, name: p.name, price: p.price, image: p.image, source: "Gold" }));
  diamondProducts.forEach((p) => out.push({ id: p.id, name: p.name, price: p.price, image: p.image, source: "Diamond" }));
  Object.values(categories).forEach((cat) => {
    cat.items.forEach((it) =>
      out.push({ id: it.id, name: it.name, price: it.price, image: it.image, source: cat.name })
    );
  });
  return out;
};