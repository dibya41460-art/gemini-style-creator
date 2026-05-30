# Plan

## 1. Why your rename "disappeared"
Your database currently has **zero saved overrides** (the `product_overrides` table is empty). The rename feature works correctly and persists — but nothing was ever actually saved. Possible reasons:
- You typed a new name but didn't click **Save name** (each row has its own Save button).
- You renamed something on the **preview** site but viewed the **published** site, which only updates after you click **Publish** in the top-right.

The data layer is fine. After this update I'll add a clear "Saved ✓" indicator so you can see it stuck.

## 2. Homepage navigation (Logo + Home)
Right now the logo and "Home" link use `#hero`, which only scrolls — it doesn't work from `/category/...` or `/admin`. Fix: make both navigate to `/` and then scroll to the top.

## 3. "Contact Us" call popup
Replace the current Contact Us button behavior with a centered popup that:
- Shows your shop phone number in **large font**
- Has a **Cancel ✕** in the top-right corner
- **Auto-closes after 8 seconds**
- Tapping the number on mobile starts a call

## 4. Admin: Add brand-new products
New section in the Products tab: **"+ Add new product"**. Admin fills:
- Name, Price, Photo (upload)
- Category (Gold / Diamond / Bridal / Featured / etc.)
- Optional details: origin, material, craftsmanship, certification, delivery time, purity/carat, weight, clarity, description

These appear automatically in the chosen category on the public site, alongside existing products. Admin can edit or delete them later.

Requires a new table `custom_products` with full product fields, RLS (admins write, public read), and integration into `getAllCatalogItems` + each section.

## 5. Rename auto-updates description
Currently overrides only cover name/price/image. To make the description, origin, carat, certification, etc. update when you rename a piece, I'll **extend `product_overrides`** with optional fields: `description`, `origin`, `material`, `craftsmanship`, `certification`, `delivery_time`, `purity`, `carat`, `weight`, `clarity`. The product detail modal will use the override values when present.

So when you rename "Royal Bridal Set" → "Diamond Tiara", you'll also be able to override every other detail in the same row. Nothing auto-generates a description from AI by default — you fill in the new details. (If you want AI to auto-generate descriptions when you rename, tell me and I'll wire up Lovable AI to do that.)

---

### Files I'll change
- `src/components/Header.tsx` — logo + Home navigate to `/`
- `src/pages/CategoryPage.tsx` — Contact Us opens new `CallUsDialog`
- `src/components/CallUsDialog.tsx` — new popup
- `src/pages/Admin.tsx` — add "Add product" form + extended override fields per row
- `src/hooks/useProductOverrides.ts` + `src/hooks/useCustomProducts.ts` — new hook
- `src/components/FeaturedProducts.tsx`, `GoldSection.tsx`, `DiamondSection.tsx`, `BridalSection.tsx`, `CategoryPage.tsx` — include custom products
- `src/components/ProductDetailModal.tsx` — read description overrides
- New migration: extend `product_overrides`, create `custom_products` table

Approve and I'll build all of this in one pass.
