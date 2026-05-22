## What you'll get

1. **Admin-only login + dashboard** to edit shop details, prices, and upload real photos.
2. **Customers** keep seeing the site exactly as it is today — view-only, no login needed.
3. **PDF Owner's Manual** explaining everything the new buyer needs to know.

---

## Part 1 — Backend (Lovable Cloud)

Enable Lovable Cloud and create:

- **Auth**: email + password login. First registered email becomes admin (or you promote via SQL).
- **`user_roles` table** with an `admin` role (secure, no privilege escalation).
- **`shop_settings` table** (single row): shop name, phone, WhatsApp, address, email, tagline, hero text, gold rate, etc.
- **`product_overrides` table**: keyed by product id, optional fields for custom `price` and `image_url` so admin can override any catalog item without touching code.
- **Storage bucket** `shop-images` (public read, admin-only write) for uploaded real jewelry photos and logos.
- **RLS policies**: anyone can read shop_settings / product_overrides / images; only admins can write.

## Part 2 — Frontend wiring

- Replace hard-coded values in `src/lib/shop.ts` and components (Header, Footer, WhatsAppButton, AppointmentDialog, HeroSection) with values from `shop_settings` (with current values as fallback so nothing breaks before admin edits anything).
- In product cards and `ProductDetailModal`, merge each item with its override row so admin price/image wins when present.
- Customers see no UI changes.

## Part 3 — Admin dashboard at `/admin`

Protected route. After login as admin:

- **Shop Info tab** — edit name, phone, WhatsApp, address, email, tagline, gold/silver rates.
- **Products tab** — searchable list of all 360+ items. Click any item → edit price, upload a replacement photo (drag-and-drop), or reset to default.
- **Logout** button.

Non-admins or logged-out users hitting `/admin` get redirected to `/auth`.

## Part 4 — Owner's Manual PDF

A printable handover guide (~12–15 pages) covering:

- What the site is and how it's hosted (Lovable)
- How to log in as admin and change the first password
- Step-by-step: change shop name / phone / address / WhatsApp
- Step-by-step: change a product price
- Step-by-step: replace an AI image with a real photo (size/format tips)
- How to add a second admin
- How to publish updates / connect a custom domain
- Troubleshooting + support contacts section (blank for you to fill)

Delivered as `/mnt/documents/jewelry-site-owners-manual.pdf` with a download button in chat.

---

## Technical notes (for reference)

- `has_role()` security-definer function to avoid RLS recursion.
- React Query for fetching settings/overrides; cached so the homepage stays fast.
- File uploads validated (image only, max 5MB).
- Zod validation on all admin forms.

---

Approving this kicks off Cloud setup, schema, admin UI, and PDF generation in one go. Sound good?