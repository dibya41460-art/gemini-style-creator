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

import type { Product } from "@/data/products";

export type CategoryItem = Product & {
  meta: string;
  priceValue: number;
  type: "Gold" | "Diamond";
};

export interface CategoryData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  total: number;
  heroImage: string;
  items: CategoryItem[];
}

interface BaseDef {
  name: string;
  description: string;
  origin: string;
  material: string;
  craftsmanship: string;
  certification: string;
  weight: string;
  type: "Gold" | "Diamond";
  purity?: string;
  carat?: string;
  clarity?: string;
}

const NECK_DEFS: BaseDef[] = [
  { name: "Royal Ruby Necklace", type: "Gold", purity: "22K", weight: "42.5 gm",
    description: "A regal antique-finish necklace featuring a central Burmese ruby surrounded by intricate filigree work and pearl drops. A statement bridal heirloom.",
    origin: "Handcrafted in Jaipur, Rajasthan — the Pink City known for its Mughal-era jewelry traditions.",
    material: "22K BIS Hallmarked Gold, Natural Burmese Ruby, South Sea Pearls",
    craftsmanship: "Traditional Jadau setting with hand-engraved filigree. Each pearl is individually knotted on silk thread.",
    certification: "BIS 916 Hallmark, Gem Lab Certified Ruby" },
  { name: "Bridal Polki Choker", type: "Gold", purity: "22K", weight: "55.8 gm",
    description: "An opulent bridal choker with uncut polki diamonds set in 22K gold with vibrant meenakari enamel on the reverse. The crown jewel of any wedding trousseau.",
    origin: "Handcrafted in Bikaner, Rajasthan — the birthplace of Polki and Kundan jewelry since the Mughal era.",
    material: "22K Gold, Uncut Polki Diamonds, Meenakari Enamel, Lac Filling",
    craftsmanship: "Polki stones set in lac-filled gold beds. Reverse hand-painted with traditional meenakari in blue, green, and red.",
    certification: "BIS 916 Hallmark" },
  { name: "Solitaire Diamond Pendant", type: "Diamond", carat: "0.75 ct", clarity: "VS1", weight: "4.2 gm",
    description: "A timeless solitaire pendant featuring a brilliant-cut diamond in a 4-prong basket setting on an 18K white gold chain. Effortless everyday luxury.",
    origin: "Diamond sourced from Botswana — conflict-free, ethically mined. Cut and polished in Surat, Gujarat.",
    material: "18K White Gold, 0.75ct Round Brilliant Diamond (F Color, VS1 Clarity)",
    craftsmanship: "Triple-excellent cut grade for maximum brilliance. Laser-inscribed girdle for authentication.",
    certification: "GIA Certified, BIS 750 Hallmark" },
  { name: "Lakshmi Temple Haram", type: "Gold", purity: "22K", weight: "78.4 gm",
    description: "A grand long temple necklace (haram) with sculpted Goddess Lakshmi pendant, kemp stone accents, and South Sea pearl drops. Inspired by South Indian temple architecture.",
    origin: "Crafted by master karigars in Nellore, Andhra Pradesh — renowned for temple jewelry traditions.",
    material: "22K BIS Hallmarked Gold, Kemp Stones (Ruby-Red), South Sea Pearls",
    craftsmanship: "Handmade using the ancient Nakshi technique — gold beaten into sheets and sculpted into deity motifs.",
    certification: "BIS 916 Hallmark" },
  { name: "Antique Gold Choker", type: "Gold", purity: "22K", weight: "38.2 gm",
    description: "A close-fitting antique-finish choker with intricate floral motifs, ruby accents, and a matte gold patina. Perfect for sarees and lehengas.",
    origin: "Handcrafted in Thrissur, Kerala — the gold capital of India.",
    material: "22K BIS Hallmarked Gold, Natural Rubies, Antique Matte Finish",
    craftsmanship: "Hand-engraved with floral repoussé work. Antique finish achieved through controlled oxidation.",
    certification: "BIS 916 Hallmark" },
  { name: "Diamond Riviera", type: "Diamond", carat: "8.5 ct", clarity: "VS2", weight: "32.6 gm",
    description: "A breathtaking riviera necklace featuring 65 graduated round brilliant diamonds in a continuous prong setting on 18K white gold. The pinnacle of luxury.",
    origin: "Diamonds from De Beers certified mines, assembled in our Mumbai high-jewelry atelier.",
    material: "18K White Gold, 65 Round Brilliant Diamonds (8.5ct total, F-G Color, VS2 Clarity)",
    craftsmanship: "Each diamond hand-matched for size, color, and brilliance. Box-clasp with double safety catch.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Meenakari Heritage Necklace", type: "Gold", purity: "22K", weight: "48.5 gm",
    description: "A heritage-style necklace with vibrant meenakari enamel work in peacock blue, green, and red. Features hand-painted floral and bird motifs.",
    origin: "Enameled by master Meenakars in Jaipur, Rajasthan.",
    material: "22K Gold, Vitreous Enamel (Meena), Pearl Accents",
    craftsmanship: "Multiple firing cycles at precise temperatures. Each piece undergoes 5–7 rounds of enamel application and kiln firing.",
    certification: "BIS 916 Hallmark" },
  { name: "Modern Diamond Mangalsutra", type: "Diamond", carat: "0.5 ct", clarity: "VS1", weight: "12.8 gm",
    description: "A contemporary mangalsutra blending tradition with modern design. Geometric diamond pendant on a sleek black bead chain with gold caps.",
    origin: "Designed in Mumbai. Diamonds from Surat. Black beads hand-strung in Pune.",
    material: "18K Yellow & White Gold, 0.5ct Diamonds, Black Onyx Beads",
    craftsmanship: "Micro-pavé diamond cluster with prong setting. Hand-strung beads with gold cap segments.",
    certification: "IGI Certified, BIS 750 Hallmark" },
];

const EAR_DEFS: BaseDef[] = [
  { name: "Antique Jhumka", type: "Gold", purity: "22K", weight: "18.5 gm",
    description: "Traditional dome-shaped jhumkas with intricate filigree work, pearl drops, and ruby accents. The quintessential Indian earring.",
    origin: "Handcrafted in Hyderabad, Telangana — famous for its Nizami jhumka traditions.",
    material: "22K BIS Hallmarked Gold, Pearls, Natural Rubies",
    craftsmanship: "Hand-built dome with hundreds of micro-soldered filigree elements. Pearls knotted on silk.",
    certification: "BIS 916 Hallmark" },
  { name: "Diamond Chandelier", type: "Diamond", carat: "2.5 ct", clarity: "VS1", weight: "14.2 gm",
    description: "Cascading chandelier earrings with 48 brilliant-cut diamonds in a tiered design. Catches light from every angle.",
    origin: "Diamonds from Surat, Gujarat. Set and finished in our Mumbai atelier.",
    material: "18K White Gold, 48 Round Brilliant Diamonds (2.5ct total, F Color, VS1 Clarity)",
    craftsmanship: "Articulated three-tier design for natural movement. Push-back posts with comfort discs.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Princess Studs", type: "Diamond", carat: "0.8 ct", clarity: "VVS2", weight: "2.4 gm",
    description: "Elegant princess-cut diamond studs in a bezel setting on 18K white gold. Clean lines and exceptional sparkle.",
    origin: "Diamonds princess-cut in Antwerp, Belgium. Set in Mumbai.",
    material: "18K White Gold, 2× Princess-Cut Diamonds (0.4ct each, D-E Color, VVS2 Clarity)",
    craftsmanship: "Bezel setting for maximum protection. Butterfly push-back with silicone comfort pads.",
    certification: "GIA Certified, BIS 750 Hallmark" },
  { name: "Kundan Chandbali", type: "Gold", purity: "22K", weight: "22.6 gm",
    description: "Crescent-moon shaped chandbali earrings with uncut Kundan stones, meenakari reverse, and pearl fringes. A Mughal-era classic.",
    origin: "Handcrafted in Bikaner, Rajasthan.",
    material: "22K Gold, Uncut Kundan Stones, Meenakari Enamel, Pearls",
    craftsmanship: "Traditional Kundan setting with hand-painted meenakari reverse and silk-knotted pearl strings.",
    certification: "BIS 916 Hallmark" },
  { name: "Diamond Hoops", type: "Diamond", carat: "1.0 ct", clarity: "VS2", weight: "5.8 gm",
    description: "Inside-outside diamond hoops with 30 brilliant-cut diamonds prong-set on both sides. Sparkles from every angle.",
    origin: "Diamonds from De Beers certified mines. Set in Mumbai.",
    material: "18K White Gold, 30 Round Brilliant Diamonds (1.0ct total, G Color, VS2 Clarity)",
    craftsmanship: "Shared-prong setting on both sides. Snap-lock closure with safety mechanism.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Temple Goddess Drops", type: "Gold", purity: "22K", weight: "16.8 gm",
    description: "Long temple-style drop earrings with sculpted goddess motifs, kemp stones, and pearl tassels. South Indian heritage.",
    origin: "Crafted by master karigars in Nellore, Andhra Pradesh.",
    material: "22K Gold, Kemp Stones, South Sea Pearls",
    craftsmanship: "Nakshi technique — gold sculpted into 3D deity figures. Hand-strung pearl tassels.",
    certification: "BIS 916 Hallmark" },
  { name: "Rose Gold Pear Drops", type: "Diamond", carat: "1.2 ct", clarity: "VS1", weight: "6.4 gm",
    description: "Romantic pear-cut diamond drops on rose gold settings. The teardrop silhouette elongates and flatters.",
    origin: "Pear-cut diamonds from Surat. Rose gold setting crafted in Jaipur.",
    material: "18K Rose Gold, 2× Pear-Cut Diamonds (0.6ct each, F Color, VS1 Clarity)",
    craftsmanship: "3-prong V-tip setting to protect the pear's pointed end. Lever-back closure.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Polki Emerald Drops", type: "Gold", purity: "22K", weight: "24.5 gm",
    description: "Statement polki earrings with Zambian emerald drops and uncut diamond accents. Royal Mughal aesthetic.",
    origin: "Handcrafted in Jaipur with Zambian emeralds.",
    material: "22K Gold, Polki Diamonds, Natural Zambian Emeralds, Pearls",
    craftsmanship: "Polki stones in lac-filled beds. Emerald drops cabochon-cut and hand-set.",
    certification: "BIS 916 Hallmark, Gem Lab Certified Emeralds" },
];

const BANG_DEFS: BaseDef[] = [
  { name: "Antique Ruby Bangle", type: "Gold", purity: "22K", weight: "32.5 gm",
    description: "An antique-finish bangle studded with cabochon rubies and intricate gold filigree. A statement piece for festive occasions.",
    origin: "Handcrafted in Hyderabad, Telangana.",
    material: "22K BIS Hallmarked Gold, Natural Rubies, Antique Matte Finish",
    craftsmanship: "Cabochon rubies bezel-set in gold. Hand-engraved filigree on the band.",
    certification: "BIS 916 Hallmark" },
  { name: "Meenakari Stack", type: "Gold", purity: "22K", weight: "28.4 gm",
    description: "A pair of vibrantly enameled bangles with floral meenakari patterns in blue, green, and red. Stack with plain gold for contrast.",
    origin: "Enameled by master Meenakars in Jaipur, Rajasthan.",
    material: "22K Gold, Vitreous Enamel (Meena)",
    craftsmanship: "5–7 rounds of enamel application and kiln firing for vibrant, durable colors.",
    certification: "BIS 916 Hallmark" },
  { name: "Diamond Tennis Bangle", type: "Diamond", carat: "3.5 ct", clarity: "VS2", weight: "14.5 gm",
    description: "A flexible tennis bangle with 35 round brilliant diamonds in a continuous four-prong setting on 18K white gold.",
    origin: "Diamonds from De Beers certified mines. Assembled in Mumbai.",
    material: "18K White Gold, 35 Round Brilliant Diamonds (3.5ct total, F-G Color, VS2 Clarity)",
    craftsmanship: "Each diamond hand-matched. Box-clasp with double safety catch. Articulated links.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Plain Polished Pair", type: "Gold", purity: "22K", weight: "18.2 gm",
    description: "A pair of classic plain polished 22K gold bangles. Timeless investment pieces that pair with anything.",
    origin: "Crafted in our Zaveri Bazaar workshop, Mumbai.",
    material: "22K BIS Hallmarked Gold",
    craftsmanship: "Seamless construction with mirror-polish finish. Hand-finished interior for comfort.",
    certification: "BIS 916 Hallmark" },
  { name: "Bridal Kundan Kada", type: "Gold", purity: "22K", weight: "48.6 gm",
    description: "A wide bridal kada with uncut Kundan stones, meenakari reverse, and pearl borders. The centerpiece of the bridal hand.",
    origin: "Handcrafted in Bikaner, Rajasthan.",
    material: "22K Gold, Uncut Kundan Stones, Meenakari Enamel, Pearls",
    craftsmanship: "Traditional Kundan setting in lac beds. Hand-painted meenakari reverse.",
    certification: "BIS 916 Hallmark" },
  { name: "Filigree Lace Bangle", type: "Gold", purity: "22K", weight: "22.4 gm",
    description: "A delicate bangle with intricate hand-cut filigree resembling lace. Lightweight but striking.",
    origin: "Handcrafted in Cuttack, Odisha — famous for its Tarkashi (silver and gold filigree) art.",
    material: "22K BIS Hallmarked Gold",
    craftsmanship: "Tarkashi technique — gold drawn into fine wires and woven into lace patterns by hand.",
    certification: "BIS 916 Hallmark" },
  { name: "Diamond Pavé Cuff", type: "Diamond", carat: "2.0 ct", clarity: "VS1", weight: "16.8 gm",
    description: "A bold cuff bracelet with pavé-set diamonds across the entire surface. Modern luxury at its finest.",
    origin: "Designed and set in Mumbai high-jewelry atelier.",
    material: "18K White Gold, Pavé Diamonds (2.0ct total, F Color, VS1 Clarity)",
    craftsmanship: "Micro-pavé setting with hundreds of diamonds. Hinged opening with safety latch.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Peacock Emerald Cuff", type: "Gold", purity: "22K", weight: "36.8 gm",
    description: "A peacock-motif cuff with Zambian emerald accents and meenakari plumage detailing. Inspired by Indian royal jewelry.",
    origin: "Handcrafted in Jaipur with Zambian emeralds.",
    material: "22K Gold, Natural Zambian Emeralds, Meenakari Enamel",
    craftsmanship: "Hand-sculpted peacock motif with meenakari feathers and emerald cabochon eyes.",
    certification: "BIS 916 Hallmark, Gem Lab Certified Emeralds" },
];

const RING_DEFS: BaseDef[] = [
  { name: "Classic Solitaire", type: "Diamond", carat: "1.2 ct", clarity: "VS1", weight: "4.5 gm",
    description: "A classic solitaire engagement ring featuring a round brilliant-cut diamond in a cathedral setting on a polished platinum band.",
    origin: "Diamond from Botswana — conflict-free. Cut in Surat, Gujarat.",
    material: "950 Platinum, 1.2ct Round Brilliant Diamond (E Color, VS1 Clarity)",
    craftsmanship: "4-prong cathedral setting with laser-inscribed girdle. Triple-excellent cut grade.",
    certification: "GIA Certified, Platinum 950 Hallmark" },
  { name: "Royal Ruby Cocktail", type: "Gold", purity: "22K", weight: "8.6 gm",
    description: "A bold cocktail ring featuring a Burmese ruby surrounded by uncut diamonds in an antique gold setting.",
    origin: "Handcrafted in Jaipur with Burmese ruby.",
    material: "22K Gold, Burmese Ruby Cabochon, Uncut Diamonds",
    craftsmanship: "Bezel-set ruby with surrounding polki diamonds in lac-filled beds.",
    certification: "BIS 916 Hallmark, Gem Lab Certified Ruby" },
  { name: "Diamond Eternity", type: "Diamond", carat: "1.5 ct", clarity: "VS2", weight: "5.2 gm",
    description: "A full eternity band with channel-set round brilliant diamonds encircling the entire 18K white gold ring. Symbolizes never-ending love.",
    origin: "Diamonds from South Africa. Crafted in Mumbai.",
    material: "18K White Gold, 24 Round Brilliant Diamonds (1.5ct total, G Color, VS2 Clarity)",
    craftsmanship: "Channel setting for snag-free profile. Comfort-fit interior.",
    certification: "IGI Certified, BIS 750 Hallmark" },
  { name: "Emerald Filigree", type: "Gold", purity: "22K", weight: "5.8 gm",
    description: "A delicate filigree ring with a Zambian emerald center stone and milgrain edging. Vintage romance.",
    origin: "Handcrafted in Cuttack, Odisha with Zambian emerald.",
    material: "22K Gold, Natural Zambian Emerald",
    craftsmanship: "Hand-cut filigree with milgrain edging. Bezel-set emerald.",
    certification: "BIS 916 Hallmark, Gem Lab Certified Emerald" },
  { name: "Rose Gold Pear Halo", type: "Diamond", carat: "1.0 ct", clarity: "VS1", weight: "4.8 gm",
    description: "A pear-cut diamond center stone surrounded by a halo of brilliant diamonds on a rose gold band. Romantic and modern.",
    origin: "Pear-cut diamond from Surat. Rose gold setting from Jaipur.",
    material: "18K Rose Gold, 1.0ct Pear-Cut Diamond (F Color, VS1 Clarity), Halo Accents",
    craftsmanship: "3-prong V-tip setting with micro-pavé halo. Hidden under-gallery diamonds.",
    certification: "GIA Certified, BIS 750 Hallmark" },
  { name: "Mens Gold Signet", type: "Gold", purity: "22K", weight: "12.4 gm",
    description: "A traditional men's signet ring with engraved family crest option and antique gold finish. Substantial and timeless.",
    origin: "Crafted in our Zaveri Bazaar workshop, Mumbai.",
    material: "22K BIS Hallmarked Gold",
    craftsmanship: "Solid construction with hand-engraving option. Antique satin finish.",
    certification: "BIS 916 Hallmark" },
  { name: "Polki Heritage Ring", type: "Gold", purity: "22K", weight: "7.6 gm",
    description: "A heritage-style ring with uncut polki diamonds set in a wide gold band with meenakari reverse.",
    origin: "Handcrafted in Bikaner, Rajasthan.",
    material: "22K Gold, Uncut Polki Diamonds, Meenakari Enamel",
    craftsmanship: "Polki stones in lac beds with hand-painted meenakari on the inner band.",
    certification: "BIS 916 Hallmark" },
  { name: "Stackable Diamond Trio", type: "Diamond", carat: "0.6 ct", clarity: "VS2", weight: "6.2 gm",
    description: "A set of three slim stackable diamond bands in yellow, white, and rose gold. Wear together or separately.",
    origin: "Designed in Mumbai. Diamonds from Surat.",
    material: "18K Yellow + White + Rose Gold, Brilliant Diamonds (0.6ct total, G Color, VS2 Clarity)",
    craftsmanship: "Channel-set diamonds in three matching slim bands. Comfort-fit.",
    certification: "IGI Certified, BIS 750 Hallmark" },
];

const VARIANTS = ["Classic", "Heritage", "Modern", "Royal", "Signature"];
const SLUG_PREFIX: Record<string, string> = {
  necklaces: "NCK",
  earrings: "EAR",
  bangles: "BNG",
  rings: "RNG",
};

const buildItems = (
  defs: BaseDef[],
  imgs: string[],
  prices: number[],
  slug: string
): CategoryItem[] => {
  const items: CategoryItem[] = [];
  const prefix = SLUG_PREFIX[slug];

  // Base items
  defs.forEach((def, i) => {
    items.push({
      id: `${slug}-b${i}`,
      name: def.name,
      price: `৳${prices[i].toLocaleString("en-IN")}`,
      priceValue: prices[i],
      meta: def.type === "Diamond"
        ? `${def.carat} · ${def.clarity} · IGI Certified`
        : `${def.purity} Gold · BIS Hallmarked`,
      image: imgs[i],
      type: def.type,
      purity: def.purity,
      carat: def.carat,
      clarity: def.clarity,
      weight: def.weight,
      description: def.description,
      origin: def.origin,
      material: def.material,
      craftsmanship: def.craftsmanship,
      certification: def.certification,
      sku: `SJ-${prefix}-${String(i + 1).padStart(3, "0")}`,
      deliveryTime: def.type === "Diamond" ? "7–10 working days" : "10–14 working days",
    });
  });

  // Variants
  VARIANTS.forEach((v, vi) => {
    defs.forEach((def, i) => {
      const priceValue = prices[i] + (vi + 1) * 4500;
      items.push({
        id: `${slug}-v${vi}-${i}`,
        name: `${v} ${def.name}`,
        price: `৳${priceValue.toLocaleString("en-IN")}`,
        priceValue,
        meta: def.type === "Diamond"
          ? `${def.carat} · ${def.clarity} · IGI Certified`
          : `${def.purity} Gold · BIS Hallmarked`,
        image: imgs[i],
        type: def.type,
        purity: def.purity,
        carat: def.carat,
        clarity: def.clarity,
        weight: def.weight,
        description: `${v} edition: ${def.description}`,
        origin: def.origin,
        material: def.material,
        craftsmanship: def.craftsmanship,
        certification: def.certification,
        sku: `SJ-${prefix}-${v.slice(0, 2).toUpperCase()}${String(i + 1).padStart(3, "0")}`,
        deliveryTime: def.type === "Diamond" ? "7–10 working days" : "10–14 working days",
      });
    });
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
    items: buildItems(NECK_DEFS, [neck1, neck2, neck3, neck4, neck5, neck6, neck7, neck8], NECK_PRICES, "necklaces"),
  },
  earrings: {
    slug: "earrings",
    name: "Earrings",
    tagline: "Frame Your Beauty",
    description:
      "Statement chandeliers, temple jhumkas, princess studs and modern hoops — 85+ exquisite designs to match every occasion.",
    total: 85,
    heroImage: ear2,
    items: buildItems(EAR_DEFS, [ear1, ear2, ear3, ear4, ear5, ear6, ear7, ear8], EAR_PRICES, "earrings"),
  },
  bangles: {
    slug: "bangles",
    name: "Bangles",
    tagline: "Tradition on Your Wrist",
    description:
      "Antique kadas, meenakari stacks, diamond tennis bangles and modern cuffs — 60+ designs that celebrate Indian craftsmanship.",
    total: 60,
    heroImage: bang5,
    items: buildItems(BANG_DEFS, [bang1, bang2, bang3, bang4, bang5, bang6, bang7, bang8], BANG_PRICES, "bangles"),
  },
  rings: {
    slug: "rings",
    name: "Rings",
    tagline: "A Promise to Keep",
    description:
      "Solitaire engagement rings, eternity bands, royal polki and stackable trios — 95+ ring designs in gold, platinum & diamonds.",
    total: 95,
    heroImage: ring1,
    items: buildItems(RING_DEFS, [ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8], RING_PRICES, "rings"),
  },
};

export const categoryList = Object.values(categories);
