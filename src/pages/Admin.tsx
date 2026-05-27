import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useShopSettings } from "@/hooks/useShopSettings";
import { useProductOverrides } from "@/hooks/useProductOverrides";
import { getAllCatalogItems } from "@/lib/allProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Save, Upload, RotateCcw, Search } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session, isAdmin, loading } = useAuth();
  const settings = useShopSettings();
  const overrides = useProductOverrides();

  useEffect(() => {
    if (!loading && !session) navigate("/auth", { replace: true });
  }, [loading, session, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!session) return null;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-3">
        <h1 className="text-2xl font-display text-primary">Not authorised</h1>
        <p className="text-muted-foreground text-sm max-w-md">
          Your account does not have admin access. Ask the existing admin to grant your account the admin role.
        </p>
        <Button onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>Sign out</Button>
      </div>
    );

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl text-primary">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>View Site</Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-1" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="shop">
          <TabsList className="mb-6">
            <TabsTrigger value="shop">Shop Info</TabsTrigger>
            <TabsTrigger value="products">Products & Photos</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="shop">
            <ShopInfoForm initial={settings} onSaved={() => qc.invalidateQueries({ queryKey: ["shop_settings"] })} />
          </TabsContent>

          <TabsContent value="products">
            <ProductsManager
              overrides={overrides}
              onChanged={() => qc.invalidateQueries({ queryKey: ["product_overrides"] })}
            />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeForm initial={settings} onSaved={() => qc.invalidateQueries({ queryKey: ["shop_settings"] })} />
          </TabsContent>

          <TabsContent value="help">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
              <h2 className="font-display text-lg text-primary">Quick guide</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Shop Info tab</strong> — change name, phone, WhatsApp number, address, email. Saved instantly across the whole website.</li>
                <li><strong className="text-foreground">Products tab</strong> — search for any product, change its price (e.g. <em>৳1,25,000</em>), or upload a real photo to replace the AI image. Click <em>Reset</em> to remove your override.</li>
                <li>Anyone visiting your site sees the customer view only — they cannot log in or change anything.</li>
                <li>To add another admin: have them sign up at <code>/auth</code>, then ask the developer to promote them, or use the Backend dashboard to set their role to <code>admin</code> in the <code>user_roles</code> table.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

/* ---------- Shop info form ---------- */
const ShopInfoForm = ({ initial, onSaved }: { initial: any; onSaved: () => void }) => {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);

  useEffect(() => setForm(initial), [initial]);

  const update = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    setBusy(true);
    const { error } = await supabase
      .from("shop_settings")
      .update({
        shop_name: form.shop_name,
        shop_tagline: form.shop_tagline,
        phone: form.phone,
        phone_tel: form.phone_tel,
        whatsapp: form.whatsapp,
        address: form.address,
        address_short: form.address_short,
        email: form.email,
        hours: form.hours,
        footer_about: form.footer_about,
        hero_headline: form.hero_headline,
        hero_subheading: form.hero_subheading,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "main");
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Shop info saved");
    onSaved();
  };

  const fields: { k: string; label: string; hint?: string; textarea?: boolean }[] = [
    { k: "shop_name", label: "Shop Name" },
    { k: "shop_tagline", label: "Tagline (shown under name)" },
    { k: "phone", label: "Display Phone", hint: "e.g. +880 1555-098765" },
    { k: "phone_tel", label: "Phone (tel: link format)", hint: "digits only, with country code e.g. +8801555098765" },
    { k: "whatsapp", label: "WhatsApp Number", hint: "digits only, NO + sign e.g. 8801555098765" },
    { k: "address", label: "Full Address" },
    { k: "address_short", label: "Short Address (header)" },
    { k: "email", label: "Email" },
    { k: "hours", label: "Opening Hours" },
    { k: "footer_about", label: "Footer About text", textarea: true },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      {fields.map(({ k, label, hint, textarea }) => (
        <div key={k} className="space-y-1.5">
          <Label>{label}</Label>
          {textarea ? (
            <Textarea value={form?.[k] ?? ""} onChange={(e) => update(k, e.target.value)} rows={3} />
          ) : (
            <Input value={form?.[k] ?? ""} onChange={(e) => update(k, e.target.value)} />
          )}
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      ))}
      <Button onClick={save} disabled={busy} className="bg-primary text-primary-foreground hover:bg-gold-dark">
        <Save className="w-4 h-4 mr-2" /> {busy ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
};

/* ---------- Products manager ---------- */
const ProductsManager = ({ overrides, onChanged }: { overrides: Map<string, any>; onChanged: () => void }) => {
  const all = useMemo(() => getAllCatalogItems(), []);
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    return all.filter((p) => !lower || p.name.toLowerCase().includes(lower) || p.id.toLowerCase().includes(lower)).slice(0, 60);
  }, [q, all]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder={`Search ${all.length} products by name or id…`} value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <p className="text-xs text-muted-foreground">Showing {filtered.length} of {all.length}</p>
      <div className="space-y-3">
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} override={overrides.get(p.id)} onChanged={onChanged} />
        ))}
      </div>
    </div>
  );
};

const ProductRow = ({ product, override, onChanged }: { product: any; override: any; onChanged: () => void }) => {
  const [price, setPrice] = useState(override?.price_override ?? "");
  const [busy, setBusy] = useState(false);
  const displayedImg = override?.image_url ?? product.image;

  useEffect(() => setPrice(override?.price_override ?? ""), [override?.price_override]);

  const upsert = async (patch: any) => {
    setBusy(true);
    const { error } = await supabase
      .from("product_overrides")
      .upsert({ product_id: product.id, ...patch, updated_at: new Date().toISOString() }, { onConflict: "product_id" });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved");
    onChanged();
  };

  const reset = async () => {
    setBusy(true);
    const { error } = await supabase.from("product_overrides").delete().eq("product_id", product.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    setPrice("");
    toast.success("Reset to default");
    onChanged();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Image files only");
    if (file.size > 5 * 1024 * 1024) return toast.error("Max 5MB");
    setBusy(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `products/${product.id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("shop-images").upload(path, file, { upsert: true });
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    const { data } = supabase.storage.from("shop-images").getPublicUrl(path);
    await upsert({ image_url: data.publicUrl, price_override: override?.price_override ?? null });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
      <img src={displayedImg} alt={product.name} className="w-16 h-16 object-cover rounded shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{product.name}</p>
        <p className="text-xs text-muted-foreground">{product.source} · {product.id} · default {product.price}</p>
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          <Input
            className="h-8 w-36"
            placeholder={`Override price (default ${product.price})`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button size="sm" variant="outline" disabled={busy} onClick={() => upsert({ price_override: price || null, image_url: override?.image_url ?? null })}>
            <Save className="w-3 h-3 mr-1" /> Save price
          </Button>
          <label className="inline-flex items-center text-xs cursor-pointer px-3 py-1.5 border border-border rounded hover:border-primary">
            <Upload className="w-3 h-3 mr-1" /> Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={busy} />
          </label>
          {(override?.price_override || override?.image_url) && (
            <Button size="sm" variant="ghost" onClick={reset} disabled={busy}>
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;