// Default values — used as fallback before the admin edits anything in the database.
// At runtime, components should read live values via `useShopSettings()`.
export const SHOP_DEFAULTS = {
  shop_name: "Swastika Jewellers",
  shop_tagline: "Jewellers",
  phone: "+880 1555-098765",
  phone_tel: "+8801555098765",
  whatsapp: "8801555098765",
  address: "Jubilee Road, Chittagong, Bangladesh",
  address_short: "Jubilee Road, Chittagong",
  email: "info@swastikajewellers.com",
  hours: "Mon–Sat: 10AM – 8PM",
  hero_headline: null as string | null,
  hero_subheading: null as string | null,
  footer_about:
    "Crafting timeless gold jewelry with passion and precision since 1985. Every piece tells a story of tradition and elegance.",
  logo_url: null as string | null,
  theme_primary: null as string | null,
  theme_accent: null as string | null,
  theme_background: null as string | null,
};

export type ShopSettings = typeof SHOP_DEFAULTS;

// Backwards-compat re-exports so existing imports keep working.
export const SHOP_PHONE = SHOP_DEFAULTS.phone;
export const SHOP_PHONE_TEL = SHOP_DEFAULTS.phone_tel;
export const SHOP_PHONE_WA = SHOP_DEFAULTS.whatsapp;
export const SHOP_ADDRESS = SHOP_DEFAULTS.address;
export const SHOP_ADDRESS_SHORT = SHOP_DEFAULTS.address_short;
