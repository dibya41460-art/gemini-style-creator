// Necklaces
import neck1 from "@/assets/cat/neck-1.jpg";
import neck2 from "@/assets/cat/neck-2.jpg";
import neck3 from "@/assets/cat/neck-3.jpg";
import neck4 from "@/assets/cat/neck-4.jpg";
import neck5 from "@/assets/cat/neck-5.jpg";
import neck6 from "@/assets/cat/neck-6.jpg";
import neck7 from "@/assets/cat/neck-7.jpg";
import neck8 from "@/assets/cat/neck-8.jpg";
// Earrings
import ear1 from "@/assets/cat/ear-1.jpg";
import ear2 from "@/assets/cat/ear-2.jpg";
import ear3 from "@/assets/cat/ear-3.jpg";
import ear4 from "@/assets/cat/ear-4.jpg";
import ear5 from "@/assets/cat/ear-5.jpg";
import ear6 from "@/assets/cat/ear-6.jpg";
import ear7 from "@/assets/cat/ear-7.jpg";
import ear8 from "@/assets/cat/ear-8.jpg";
// Bangles
import bang1 from "@/assets/cat/bang-1.jpg";
import bang2 from "@/assets/cat/bang-2.jpg";
import bang3 from "@/assets/cat/bang-3.jpg";
import bang4 from "@/assets/cat/bang-4.jpg";
import bang5 from "@/assets/cat/bang-5.jpg";
import bang6 from "@/assets/cat/bang-6.jpg";
import bang7 from "@/assets/cat/bang-7.jpg";
import bang8 from "@/assets/cat/bang-8.jpg";
// Rings
import ring1 from "@/assets/cat/ring-1.jpg";
import ring2 from "@/assets/cat/ring-2.jpg";
import ring3 from "@/assets/cat/ring-3.jpg";
import ring4 from "@/assets/cat/ring-4.jpg";
import ring5 from "@/assets/cat/ring-5.jpg";
import ring6 from "@/assets/cat/ring-6.jpg";
import ring7 from "@/assets/cat/ring-7.jpg";
import ring8 from "@/assets/cat/ring-8.jpg";

export interface CategoryItem {
  name: string;
  price: string;
  meta: string;
  image: string;
}

export interface CategoryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  total: number;
  heroImage: string;
  items: CategoryItem[];
}

const NECK_NAMES = [
  "Royal Ruby Necklace", "Bridal Polki Choker", "Solitaire Diamond Pendant",
  "Lakshmi Temple Haram", "Antique Gold Choker", "Diamond Riviera",
  "Meenakari Heritage Necklace", "Modern Diamond Mangalsutra",
];
const EAR_NAMES = [
  "Antique Jhumka", "Diamond Chandelier", "Princess Studs",
  "Kundan Chandbali", "Diamond Hoops", "Temple Goddess Drops",
  "Rose Gold Pear Drops", "Polki Emerald Drops",
];
const BANG_NAMES = [
  "Antique Ruby Bangle", "Meenakari Stack", "Diamond Tennis Bangle",
  "Plain Polished Pair", "Bridal Kundan Kada", "Filigree Lace Bangle",
  "Diamond Pavé Cuff", "Peacock Emerald Cuff",
];
const RING_NAMES = [
  "Classic Solitaire", "Royal Ruby Cocktail", "Diamond Eternity",
  "Emerald Filigree", "Rose Gold Pear Halo", "Mens Gold Signet",
  "Polki Heritage Ring", "Stackable Diamond Trio",
];

const buildItems = (
  base: string[],
  imgs: string[],
  prices: number[]
): CategoryItem[] => {
  const items: CategoryItem[] = [];
  // Generate variants by combining base names + images for richer catalog
  for (let i = 0; i < base.length; i++) {
    items.push({
      name: base[i],
      price: `৳${prices[i].toLocaleString("en-IN")}`,
      meta: i % 2 === 0 ? "22K Gold · BIS Hallmarked" : "18K · IGI Certified",
      image: imgs[i],
    });
  }
  // Add color/style variants reusing the unique images
  const variants = ["Classic", "Heritage", "Modern", "Royal", "Signature"];
  variants.forEach((v, vi) => {
    for (let i = 0; i < base.length; i++) {
      items.push({
        name: `${v} ${base[i]}`,
        price: `৳${(prices[i] + (vi + 1) * 4500).toLocaleString("en-IN")}`,
        meta: vi % 2 === 0 ? "22K Gold · BIS Hallmarked" : "18K · IGI Certified",
        image: imgs[i],
      });
    }
  });
  return items;
};

const NECK_PRICES = [185000, 245000, 65000, 132000, 88000, 320000, 110000, 78000];
const EAR_PRICES = [42000, 95000, 68000, 55000, 38000, 72000, 52000, 145000];
const BANG_PRICES = [88000, 65000, 220000, 58000, 175000, 72000, 95000, 110000];
const RING_PRICES = [185000, 92000, 110000, 48000, 78000, 65000, 95000, 68000];

export const categories: Record<string, CategoryData> = {
  necklaces: {
    slug: "necklaces",
    name: "Necklaces",
    tagline: "Elegance Around You",
    description:
      "From bridal kundan chokers to delicate diamond pendants — explore over 120 handcrafted necklace designs in 18K, 22K & 24K gold and certified diamonds.",
    total: 120,
    heroImage: neck1,
    items: buildItems(NECK_NAMES, [neck1, neck2, neck3, neck4, neck5, neck6, neck7, neck8], NECK_PRICES),
  },
  earrings: {
    slug: "earrings",
    name: "Earrings",
    tagline: "Frame Your Beauty",
    description:
      "Statement chandeliers, temple jhumkas, princess studs and modern hoops — 85+ exquisite designs to match every occasion.",
    total: 85,
    heroImage: ear2,
    items: buildItems(EAR_NAMES, [ear1, ear2, ear3, ear4, ear5, ear6, ear7, ear8], EAR_PRICES),
  },
  bangles: {
    slug: "bangles",
    name: "Bangles",
    tagline: "Tradition on Your Wrist",
    description:
      "Antique kadas, meenakari stacks, diamond tennis bangles and modern cuffs — 60+ designs that celebrate Indian craftsmanship.",
    total: 60,
    heroImage: bang5,
    items: buildItems(BANG_NAMES, [bang1, bang2, bang3, bang4, bang5, bang6, bang7, bang8], BANG_PRICES),
  },
  rings: {
    slug: "rings",
    name: "Rings",
    tagline: "A Promise to Keep",
    description:
      "Solitaire engagement rings, eternity bands, royal polki and stackable trios — 95+ ring designs in gold, platinum & diamonds.",
    total: 95,
    heroImage: ring1,
    items: buildItems(RING_NAMES, [ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8], RING_PRICES),
  },
};

export const categoryList = Object.values(categories);
