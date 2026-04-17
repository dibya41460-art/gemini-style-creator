import goldChain from "@/assets/gold-chain.jpg";
import goldCoins from "@/assets/gold-coins.jpg";
import goldAnklet from "@/assets/gold-anklet.jpg";
import necklaceImg from "@/assets/category-necklace.jpg";
import banglesImg from "@/assets/category-bangles.jpg";
import ringsImg from "@/assets/category-rings.jpg";
import featured1 from "@/assets/featured-1.jpg";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import featured4 from "@/assets/featured-4.jpg";
import diamondRing from "@/assets/diamond-ring.jpg";
import diamondBracelet from "@/assets/diamond-bracelet.jpg";
import diamondEarrings from "@/assets/diamond-earrings.jpg";
import diamondPendant from "@/assets/diamond-pendant.jpg";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  tag?: string | null;
  weight?: string;
  purity?: string;
  carat?: string;
  clarity?: string;
  // Detail fields
  description: string;
  origin: string;
  material: string;
  craftsmanship: string;
  certification: string;
  sku: string;
  deliveryTime: string;
}

export const featuredProducts: Product[] = [
  {
    id: "f1", name: "Royal Bridal Set", price: "৳2,45,000", weight: "45.2 gm", image: featured1, tag: "Bestseller",
    description: "An opulent bridal set featuring a grand choker necklace, chandelier earrings, and maang tikka. Intricate kundan and meenakari work with uncut polki diamonds set in 22K gold.",
    origin: "Handcrafted in Jaipur, Rajasthan — the heart of India's traditional jewelry-making heritage.",
    material: "22K BIS Hallmarked Gold, Uncut Polki Diamonds, Ruby & Emerald Stones",
    craftsmanship: "Master karigar with 30+ years of experience. Each piece takes 15–20 days to complete using traditional lost-wax casting and hand-setting techniques.",
    certification: "BIS 916 Hallmark, IGI Certified Stones", sku: "SJ-BRD-001", deliveryTime: "15–20 working days",
  },
  {
    id: "f2", name: "Temple Choker", price: "৳1,85,000", weight: "38.6 gm", image: featured2, tag: "New Arrival",
    description: "A magnificent temple-style choker necklace inspired by South Indian temple architecture. Features Lakshmi motifs and traditional kemp stone settings in pure 22K gold.",
    origin: "Crafted by master artisans in Nellore, Andhra Pradesh — renowned for temple jewelry traditions passed down through generations.",
    material: "22K BIS Hallmarked Gold, Kemp Stones (Ruby-Red), South Sea Pearls",
    craftsmanship: "Handmade using the ancient Nakshi technique — gold is beaten into thin sheets and sculpted into elaborate deity and floral motifs.",
    certification: "BIS 916 Hallmark", sku: "SJ-TMP-002", deliveryTime: "12–18 working days",
  },
  {
    id: "f3", name: "Diamond Pendant", price: "৳65,000", weight: "8.4 gm", image: featured3, tag: null,
    description: "An elegant solitaire-style pendant featuring a brilliant-cut diamond in a floral gold setting, suspended on an 18K gold chain. Perfect for everyday luxury.",
    origin: "Diamonds sourced from Surat, Gujarat — India's diamond cutting capital. Set and finished in our Mumbai atelier.",
    material: "18K White Gold, 0.5ct Brilliant-Cut Diamond (F-G Color, VS1 Clarity)",
    craftsmanship: "Precision micro-setting with CAD-designed mounting. Laser-cut prongs for maximum light performance.",
    certification: "IGI Certified Diamond, BIS 750 Hallmark", sku: "SJ-DPN-003", deliveryTime: "5–7 working days",
  },
  {
    id: "f4", name: "Mangalsutra", price: "৳78,000", weight: "12.1 gm", image: featured4, tag: "Trending",
    description: "A contemporary mangalsutra blending tradition with modern design. Features a diamond-studded pendant on a sleek black bead chain with 22K gold caps.",
    origin: "Designed in Mumbai, Maharashtra — combining Maharashtrian tradition with contemporary aesthetics.",
    material: "22K Gold, Black Onyx Beads, 0.3ct Natural Diamonds",
    craftsmanship: "Hand-strung black beads with gold wire technique. Diamond pendant crafted using rhodium-plated white gold prong setting.",
    certification: "BIS 916 Hallmark, IGI Certified Diamonds", sku: "SJ-MGS-004", deliveryTime: "5–7 working days",
  },
];

export const goldProducts: Product[] = [
  {
    id: "g1", name: "Antique Gold Chain", price: "৳1,32,000", weight: "22.5 gm", purity: "22K", image: goldChain,
    description: "A statement antique-finish chain necklace with a grand medallion pendant featuring intricate filigree work, ruby center stone, and hanging gold droplets.",
    origin: "Handcrafted in Thrissur, Kerala — the gold capital of India, known for its centuries-old jewelry craftsmanship.",
    material: "22K BIS Hallmarked Gold, Natural Ruby, Antique Matte Finish",
    craftsmanship: "Created using the traditional Kerala 'Thali' chain-making technique. Each link is individually hand-soldered. The pendant uses filigree (tarkashi) work.",
    certification: "BIS 916 Hallmark", sku: "SJ-GCH-001", deliveryTime: "10–12 working days",
  },
  {
    id: "g2", name: "Gold Coins (10gm)", price: "৳68,200", weight: "10 gm", purity: "24K", image: goldCoins,
    description: "Premium 24K pure gold coins featuring the Lakshmi-Ganesh motif — ideal for gifting on Dhanteras, Akshaya Tritiya, and weddings. Comes in tamper-proof packaging.",
    origin: "Refined from 999.9 fine gold at MMTC-PAMP refinery, India's only LBMA-accredited gold refiner.",
    material: "24K (999.9) Pure Gold, Tamper-Proof Certicard Packaging",
    craftsmanship: "Minted using Swiss minting technology with precision embossing for detailed motifs. Each coin is individually assayed and numbered.",
    certification: "MMTC-PAMP Hallmark, LBMA Certified, Assay Certificate", sku: "SJ-GCN-002", deliveryTime: "2–3 working days",
  },
  {
    id: "g3", name: "Bridal Anklet Pair", price: "৳45,000", weight: "18.2 gm", purity: "22K", image: goldAnklet,
    description: "Traditional bridal anklets with delicate bell charms (ghungroo) and ruby-red stone accents. Produces a melodious sound with every step.",
    origin: "Handcrafted in Kolkata, West Bengal — famous for its fine gold workmanship and Bengal's rich bridal jewelry traditions.",
    material: "22K BIS Hallmarked Gold, Ruby Glass Stones, Ghungroo Bells",
    craftsmanship: "Each bell is individually cast and tuned for sound. Chain links are hand-assembled with traditional Bengali soldering techniques.",
    certification: "BIS 916 Hallmark", sku: "SJ-ANK-003", deliveryTime: "7–10 working days",
  },
  {
    id: "g4", name: "Kundan Necklace Set", price: "৳2,10,000", weight: "42.8 gm", purity: "22K", image: necklaceImg,
    description: "A royal Kundan necklace set with matching jhumka earrings and maang tikka. Features uncut gemstones set in lac-filled gold frames with meenakari enamel on the reverse.",
    origin: "Handcrafted in Bikaner, Rajasthan — the birthplace of Kundan jewelry, a tradition dating back to the Mughal era.",
    material: "22K Gold, Uncut Kundan Stones, Meenakari Enamel, Lac Filling",
    craftsmanship: "Traditional Kundan setting — stones pressed into gold foil-lined lac beds. Reverse features hand-painted meenakari in blue, green, and red.",
    certification: "BIS 916 Hallmark", sku: "SJ-KND-004", deliveryTime: "18–25 working days",
  },
  {
    id: "g5", name: "Meenakari Bangles", price: "৳88,000", weight: "28.4 gm", purity: "22K", image: banglesImg,
    description: "A set of intricately enameled Meenakari bangles with vibrant floral patterns in blue, green, and red on a 22K gold base. A celebration of Rajasthani artistry.",
    origin: "Enameled by master Meenakars in Jaipur, Rajasthan. This art form was brought to India by Raja Man Singh I from Lahore in the 16th century.",
    material: "22K BIS Hallmarked Gold, Vitreous Enamel (Meena), Pearl Accents",
    craftsmanship: "Multiple firing cycles at precise temperatures to achieve vibrant enamel colors. Each bangle undergoes 5–7 rounds of enamel application and kiln firing.",
    certification: "BIS 916 Hallmark", sku: "SJ-MBG-005", deliveryTime: "12–15 working days",
  },
  {
    id: "g6", name: "Cocktail Gold Ring", price: "৳32,000", weight: "6.8 gm", purity: "18K", image: ringsImg,
    description: "A contemporary cocktail ring with a swirling filigree design set with a brilliant solitaire. Perfect for evening wear and special occasions.",
    origin: "Designed in our Mumbai studio and cast in our Zaveri Bazaar workshop — the historic jewelry trading hub of India.",
    material: "18K BIS Hallmarked Gold, 0.25ct Cubic Zirconia, Rhodium Finish",
    craftsmanship: "CAD-designed and precision-cast using the lost-wax method. Hand-polished with rhodium plating for a white gold finish.",
    certification: "BIS 750 Hallmark", sku: "SJ-CKR-006", deliveryTime: "5–7 working days",
  },
];

export const diamondProducts: Product[] = [
  {
    id: "d1", name: "Solitaire Ring", price: "৳1,85,000", carat: "1.2 ct", clarity: "VS1", image: diamondRing, tag: "Bestseller",
    description: "A classic solitaire engagement ring featuring a round brilliant-cut diamond in a cathedral setting on a polished platinum band. The ultimate symbol of love.",
    origin: "Diamond sourced from Botswana, Africa — conflict-free and ethically mined. Cut and polished in Surat, Gujarat, India.",
    material: "950 Platinum, 1.2ct Round Brilliant Diamond (E Color, VS1 Clarity)",
    craftsmanship: "4-prong cathedral setting with laser-inscribed girdle. The diamond is triple-excellent (cut, polish, symmetry) for maximum brilliance.",
    certification: "GIA Certified, Platinum 950 Hallmark, Laser Inscription", sku: "SJ-DSR-001", deliveryTime: "7–10 working days",
  },
  {
    id: "d2", name: "Tennis Bracelet", price: "৳3,20,000", carat: "5.0 ct", clarity: "VS2", image: diamondBracelet, tag: "Premium",
    description: "A luxurious tennis bracelet featuring 42 round brilliant diamonds in a continuous four-prong setting on 18K white gold. Flexible and comfortable for all-day wear.",
    origin: "Diamonds sourced from De Beers certified mines. Assembled in our Mumbai high-jewelry atelier.",
    material: "18K White Gold, 42 Round Brilliant Diamonds (5.0ct total, F-G Color, VS2 Clarity)",
    craftsmanship: "Each diamond is individually matched for size, color, and brilliance. Box-clasp with double safety catch. Fully articulated links for fluid movement.",
    certification: "IGI Certified, BIS 750 Hallmark", sku: "SJ-DTB-002", deliveryTime: "10–14 working days",
  },
  {
    id: "d3", name: "Princess Studs", price: "৳95,000", carat: "0.8 ct", clarity: "VVS2", image: diamondEarrings, tag: null,
    description: "Elegant princess-cut diamond stud earrings in a bezel setting on 18K white gold. Clean lines and exceptional sparkle — a timeless everyday luxury.",
    origin: "Diamonds sourced from Australia. Princess-cut in Antwerp, Belgium — the world's diamond cutting capital.",
    material: "18K White Gold, 2× Princess-Cut Diamonds (0.4ct each, D-E Color, VVS2 Clarity)",
    craftsmanship: "Bezel setting for maximum protection. Butterfly push-back with silicone comfort pads. Mirror-polished finish.",
    certification: "GIA Certified, BIS 750 Hallmark", sku: "SJ-DPS-003", deliveryTime: "5–7 working days",
  },
  {
    id: "d4", name: "Pear Drop Pendant", price: "৳1,45,000", carat: "1.5 ct", clarity: "VS1", image: diamondPendant, tag: "New",
    description: "A stunning pear-shaped diamond pendant on a delicate rose gold chain. The teardrop silhouette creates a dramatic, elongating effect.",
    origin: "Diamond sourced from Namibia, Africa. Pear-cut in Surat, India. Chain and setting crafted in Jaipur.",
    material: "18K Rose Gold Chain, 1.5ct Pear-Cut Diamond (F Color, VS1 Clarity)",
    craftsmanship: "3-prong V-tip setting to protect the pear's pointed end. Chain features a sliding adjuster for versatile lengths (16–20 inches).",
    certification: "IGI Certified, BIS 750 Hallmark", sku: "SJ-DPD-004", deliveryTime: "7–10 working days",
  },
  {
    id: "d5", name: "Eternity Band", price: "৳1,10,000", carat: "1.0 ct", clarity: "VS2", image: featured3, tag: null,
    description: "A full eternity band with channel-set round brilliant diamonds encircling the entire 18K white gold ring. Symbolizes never-ending love.",
    origin: "Diamonds sourced from South Africa. Band crafted and set in our Mumbai workshop.",
    material: "18K White Gold, 20 Round Brilliant Diamonds (1.0ct total, G Color, VS2 Clarity)",
    craftsmanship: "Channel setting for a smooth, snag-free profile. Comfort-fit interior. Each diamond hand-set and aligned for continuous sparkle.",
    certification: "IGI Certified, BIS 750 Hallmark", sku: "SJ-DEB-005", deliveryTime: "7–10 working days",
  },
  {
    id: "d6", name: "Diamond Mangalsutra", price: "৳78,000", carat: "0.5 ct", clarity: "VS1", image: featured4, tag: "Trending",
    description: "A modern diamond mangalsutra that bridges tradition and contemporary design. Features a geometric diamond pendant on a sleek black bead chain.",
    origin: "Designed in Mumbai. Diamonds from Surat. Black beads hand-strung in Pune, Maharashtra.",
    material: "18K Yellow & White Gold, 0.5ct Diamonds, Black Onyx Beads",
    craftsmanship: "Prong-set diamonds in a micro-pavé cluster. Gold caps on each bead segment. Lobster clasp with 2-inch extender chain.",
    certification: "IGI Certified, BIS 750 Hallmark", sku: "SJ-DMS-006", deliveryTime: "5–7 working days",
  },
];
