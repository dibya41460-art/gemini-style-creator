import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useShopSettings } from "@/hooks/useShopSettings";
import { useProductOverrides } from "@/hooks/useProductOverrides";
import { getAllCatalogItems } from "@/lib/allProducts";
import { AI_TONES, dataUrlToFile, fileToDataUrl, type AiProductDetails } from "@/lib/aiProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { AlertCircle, Bell, Bot, Check, ChevronDown, ChevronUp, DollarSign, HelpCircle, LayoutGrid, LogOut, MessageSquare, Pencil, Phone, Plus, RefreshCw, RotateCcw, Save, Search, Send, Sparkles, Trash2, Upload, User as UserIcon, Wand2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

const CATEGORY_OPTIONS = [
  { value: "featured", label: "Featured (homepage)" },
  { value: "gold", label: "Gold Collection" },
  { value: "diamond", label: "Diamond Collection" },
  { value: "necklaces", label: "Category: Necklaces" },
  { value: "earrings", label: "Category: Earrings" },
  { value: "bangles", label: "Category: Bangles" },
  { value: "rings", label: "Category: Rings" },
];

const setDetails = (details: AiProductDetails, setters: Record<string, (v: string) => void>) => {
  if (details.description) setters.description(details.description);
  if (details.origin) setters.origin(details.origin);
  if (details.material) setters.material(details.material);
  if (details.craftsmanship) setters.craftsmanship(details.craftsmanship);
  if (details.certification) setters.certification(details.certification);
  if (details.delivery_time) setters.deliveryTime(details.delivery_time);
  if (details.purity) setters.purity(details.purity);
  if (details.carat) setters.carat(details.carat);
  if (details.weight) setters.weight(details.weight);
  if (details.clarity) setters.clarity(details.clarity);
  if (details.tag) setters.tag?.(details.tag);
};

const Admin = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session, isAdmin, loading } = useAuth();
  const settings = useShopSettings();
  const overrides = useProductOverrides();
  const [activeTab, setActiveTab] = useState("shop");

  const { data: appointments = [], refetch: refetchAppointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!session && isAdmin,
    refetchInterval: 15_000,
  });

  const { data: complaints = [], refetch: refetchComplaints } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("complaints").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!session && isAdmin,
    refetchInterval: 20_000,
  });

  const unreadCount = appointments.filter((a: any) => !a.is_read).length;
  const openComplaints = complaints.filter((c: any) => c.status === "open").length;

  useEffect(() => {
    if (!loading && !session) navigate("/auth", { replace: true });
  }, [loading, session, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!session) return null;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-3">
      <h1 className="text-2xl font-display text-primary">Not authorised</h1>
      <p className="text-muted-foreground text-sm max-w-md">Your account does not have admin access.</p>
      <Button onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>Sign out</Button>
    </div>
  );

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
            <Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}><LogOut className="w-4 h-4 mr-1" /> Sign out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap h-auto">
            <TabsTrigger value="shop">Shop Info</TabsTrigger>
            <TabsTrigger value="products">Products & Photos</TabsTrigger>
            <TabsTrigger value="goldRate"><DollarSign className="w-4 h-4 mr-1" /> Gold Rate</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="appointments" className="relative"><Bell className="w-4 h-4 mr-1" /> Appointments {unreadCount > 0 && <span className="ml-2 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5">{unreadCount}</span>}</TabsTrigger>
            <TabsTrigger value="complaints" className="relative"><HelpCircle className="w-4 h-4 mr-1" /> Complaints {openComplaints > 0 && <span className="ml-2 text-[10px] bg-primary text-primary-foreground rounded-full px-1.5">{openComplaints}</span>}</TabsTrigger>
            <TabsTrigger value="assistant"><Bot className="w-4 h-4 mr-1" /> AI Assistant</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="shop"><ShopInfoForm initial={settings} onSaved={() => qc.invalidateQueries({ queryKey: ["shop_settings"] })} /></TabsContent>
          <TabsContent value="products"><ProductsManager overrides={overrides} onChanged={() => { qc.invalidateQueries({ queryKey: ["product_overrides"] }); qc.invalidateQueries({ queryKey: ["deleted_products"] }); }} onCustomChanged={() => qc.invalidateQueries({ queryKey: ["custom_products"] })} /></TabsContent>
          <TabsContent value="goldRate"><GoldRatePanel /></TabsContent>
          <TabsContent value="theme"><ThemeForm initial={settings} onSaved={() => qc.invalidateQueries({ queryKey: ["shop_settings"] })} /></TabsContent>
          <TabsContent value="appointments"><AppointmentsList appointments={appointments as any[]} onChanged={refetchAppointments} /></TabsContent>
          <TabsContent value="complaints"><ComplaintsList complaints={complaints as any[]} onChanged={refetchComplaints} /></TabsContent>
          <TabsContent value="assistant"><AdminAssistant appointments={appointments.length} complaints={openComplaints} /></TabsContent>
          <TabsContent value="help"><HelpPanel /></TabsContent>
        </Tabs>
      </main>

      <button
        type="button"
        onClick={() => {
          setActiveTab("assistant");
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
        }}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all px-5 py-3 font-medium"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">AI Assistant</span>
      </button>
    </div>
  );
};

const ShopInfoForm = ({ initial, onSaved }: { initial: any; onSaved: () => void }) => {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  useEffect(() => setForm(initial), [initial]);
  const update = (k: string, v: string) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from("shop_settings").update({ ...form, updated_at: new Date().toISOString() }).eq("id", "main");
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Shop info saved");
    onSaved();
  };
  const fields = ["shop_name", "shop_tagline", "phone", "phone_tel", "whatsapp", "address", "address_short", "email", "hours", "footer_about"];
  return <div className="bg-card border border-border rounded-xl p-6 space-y-4">{fields.map((k) => <div key={k} className="space-y-1.5"><Label className="capitalize">{k.replace(/_/g, " ")}</Label>{k === "footer_about" ? <Textarea value={form?.[k] ?? ""} onChange={(e) => update(k, e.target.value)} rows={3} /> : <Input value={form?.[k] ?? ""} onChange={(e) => update(k, e.target.value)} />}</div>)}<Button onClick={save} disabled={busy} className="bg-primary text-primary-foreground hover:bg-gold-dark"><Save className="w-4 h-4 mr-2" />{busy ? "Saving…" : "Save changes"}</Button></div>;
};

const ProductsManager = ({ overrides, onChanged, onCustomChanged }: { overrides: Map<string, any>; onChanged: () => void; onCustomChanged: () => void }) => {
  const all = useMemo(() => getAllCatalogItems(), []);
  const [q, setQ] = useState("");
  const { data: deleted = new Set<string>(), refetch } = useQuery({
    queryKey: ["deleted_products"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("deleted_products").select("product_id");
      if (error) throw error;
      return new Set<string>((data ?? []).map((r: any) => r.product_id));
    },
  });
  const filtered = useMemo(() => all.filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase())).slice(0, 60), [q, all]);
  const changed = () => { refetch(); onChanged(); };
  return <div className="space-y-6"><CustomProductsSection onChanged={onCustomChanged} /><div className="pt-2"><h3 className="font-display text-base text-primary">Existing template products</h3><p className="text-xs text-muted-foreground">Use the delete button on the right to hide template items from the website. Restore brings them back.</p></div><div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder={`Search ${all.length} products by name or id…`} value={q} onChange={(e) => setQ(e.target.value)} /></div><p className="text-xs text-muted-foreground">Showing {filtered.length} of {all.length}</p><div className="space-y-3">{filtered.map((p) => <ProductRow key={p.id} product={p} override={overrides.get(p.id)} deleted={deleted.has(p.id)} onChanged={changed} />)}</div></div>;
};

const ProductRow = ({ product, override, deleted, onChanged }: { product: any; override: any; deleted: boolean; onChanged: () => void }) => {
  const [price, setPrice] = useState(override?.price_override ?? "");
  const [name, setName] = useState(override?.name_override ?? "");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [desc, setDesc] = useState(override?.description_override ?? "");
  const [origin, setOrigin] = useState(override?.origin_override ?? "");
  const [material, setMaterial] = useState(override?.material_override ?? "");
  const [craftsmanship, setCraftsmanship] = useState(override?.craftsmanship_override ?? "");
  const [certification, setCertification] = useState(override?.certification_override ?? "");
  const [deliveryTime, setDeliveryTime] = useState(override?.delivery_time_override ?? "");
  const [purity, setPurity] = useState(override?.purity_override ?? "");
  const [carat, setCarat] = useState(override?.carat_override ?? "");
  const [weight, setWeight] = useState(override?.weight_override ?? "");
  const [clarity, setClarity] = useState(override?.clarity_override ?? "");
  const displayedImg = override?.image_url ?? product.image;

  useEffect(() => { setPrice(override?.price_override ?? ""); setName(override?.name_override ?? ""); setDesc(override?.description_override ?? ""); setOrigin(override?.origin_override ?? ""); setMaterial(override?.material_override ?? ""); setCraftsmanship(override?.craftsmanship_override ?? ""); setCertification(override?.certification_override ?? ""); setDeliveryTime(override?.delivery_time_override ?? ""); setPurity(override?.purity_override ?? ""); setCarat(override?.carat_override ?? ""); setWeight(override?.weight_override ?? ""); setClarity(override?.clarity_override ?? ""); }, [override]);

  const upsert = async (patch: any) => {
    setBusy(true);
    const { error } = await supabase.from("product_overrides").upsert({ product_id: product.id, ...patch, updated_at: new Date().toISOString() }, { onConflict: "product_id" });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Saved permanently");
    onChanged();
  };
  const toggleDeleted = async () => {
    setBusy(true);
    const { error } = deleted ? await (supabase as any).from("deleted_products").delete().eq("product_id", product.id) : await (supabase as any).from("deleted_products").insert({ product_id: product.id });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(deleted ? "Product restored" : "Product removed from website");
    onChanged();
  };
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return toast.error("Image files only");
    setBusy(true);
    const path = `products/${product.id}-${Date.now()}.${file.name.split(".").pop() ?? "jpg"}`;
    const { error: upErr } = await supabase.storage.from("shop-images").upload(path, file, { upsert: true });
    if (upErr) { setBusy(false); return toast.error(upErr.message); }
    const { data } = supabase.storage.from("shop-images").getPublicUrl(path);
    await upsert({ image_url: data.publicUrl, price_override: price || null, name_override: name.trim() || null });
  };
  const saveDetails = () => upsert({ name_override: name.trim() || null, price_override: price || null, image_url: override?.image_url ?? null, description_override: desc.trim() || null, origin_override: origin.trim() || null, material_override: material.trim() || null, craftsmanship_override: craftsmanship.trim() || null, certification_override: certification.trim() || null, delivery_time_override: deliveryTime.trim() || null, purity_override: purity.trim() || null, carat_override: carat.trim() || null, weight_override: weight.trim() || null, clarity_override: clarity.trim() || null });

  return <div className={`bg-card border rounded-lg p-3 flex items-start gap-3 ${deleted ? "border-destructive/40 opacity-70" : "border-border"}`}><img src={displayedImg} alt={product.name} className="w-16 h-16 object-cover rounded shrink-0" /><div className="flex-1 min-w-0"><div className="flex flex-wrap items-center gap-2"><Input className="h-8 w-56 text-sm font-medium" placeholder={`Rename (default: ${product.name})`} value={name} onChange={(e) => setName(e.target.value)} /><Button size="sm" variant="outline" disabled={busy} onClick={() => upsert({ name_override: name.trim() || null, price_override: price || null, image_url: override?.image_url ?? null })}><Save className="w-3 h-3 mr-1" /> Save name</Button>{deleted && <span className="text-[10px] text-destructive uppercase tracking-wider">Hidden from site</span>}<Button size="sm" variant={deleted ? "outline" : "ghost"} disabled={busy} onClick={toggleDeleted} className="ml-auto"><Trash2 className="w-3 h-3 mr-1" />{deleted ? "Restore" : "Delete"}</Button></div><p className="text-xs text-muted-foreground mt-1">{product.source} · {product.id} · default {product.price}</p><div className="flex flex-wrap gap-2 mt-2 items-center"><Input className="h-8 w-36" placeholder={`Override price`} value={price} onChange={(e) => setPrice(e.target.value)} /><Button size="sm" variant="outline" disabled={busy} onClick={() => upsert({ price_override: price || null, image_url: override?.image_url ?? null, name_override: name.trim() || null })}><Save className="w-3 h-3 mr-1" /> Save price</Button><label className="inline-flex items-center text-xs cursor-pointer px-3 py-1.5 border border-border rounded hover:border-primary"><Upload className="w-3 h-3 mr-1" /> Upload photo<input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={busy} /></label><Button size="sm" variant="ghost" onClick={() => setExpanded((v) => !v)}>{expanded ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}{expanded ? "Hide details" : "Edit description & details"}</Button></div>{expanded && <div className="mt-3 pt-3 border-t border-border space-y-2"><Textarea placeholder="Description override" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} /><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{[["Origin", origin, setOrigin], ["Material", material, setMaterial], ["Craftsmanship", craftsmanship, setCraftsmanship], ["Certification", certification, setCertification], ["Delivery time", deliveryTime, setDeliveryTime], ["Weight", weight, setWeight], ["Purity", purity, setPurity], ["Carat", carat, setCarat], ["Clarity", clarity, setClarity]].map(([ph, val, setter]: any) => <Input key={ph} placeholder={ph} value={val} onChange={(e) => setter(e.target.value)} className="h-8" />)}</div><Button size="sm" disabled={busy} onClick={saveDetails} className="bg-primary text-primary-foreground hover:bg-gold-dark"><Save className="w-3 h-3 mr-1" /> Save all details</Button></div>}</div></div>;
};

const CustomProductsSection = ({ onChanged }: { onChanged: () => void }) => {
  const { data: items = [], refetch } = useQuery({ queryKey: ["custom_products"], queryFn: async () => { const { data, error } = await supabase.from("custom_products").select("*").order("created_at", { ascending: false }); if (error) throw error; return data ?? []; } });
  const refresh = () => { refetch(); onChanged(); };
  return <div className="bg-card border border-primary/30 rounded-xl p-5 space-y-4"><div><h3 className="font-display text-lg text-primary flex items-center gap-2"><Plus className="w-5 h-5" /> Add a new product</h3><p className="text-xs text-muted-foreground">Upload your own photo, or let AI generate a product image. AI can read the uploaded photo and auto-fill origin, material, delivery, and more.</p></div><AddProductForm onAdded={refresh} />{items.length > 0 && <div className="pt-2 border-t border-border space-y-2"><p className="text-xs text-muted-foreground uppercase tracking-wider">Your custom products ({items.length})</p>{items.map((it: any) => <CustomProductRow key={it.id} item={it} onChanged={refresh} />)}</div>}</div>;
};

const AddProductForm = ({ onAdded }: { onAdded: () => void }) => {
  const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [category, setCategory] = useState("featured"); const [file, setFile] = useState<File | null>(null); const [useAiImage, setUseAiImage] = useState(false);
  const [tone, setTone] = useState("premium"); const [targetRegion, setTargetRegion] = useState("");
  const [description, setDescription] = useState(""); const [origin, setOrigin] = useState(""); const [material, setMaterial] = useState(""); const [craftsmanship, setCraftsmanship] = useState(""); const [certification, setCertification] = useState(""); const [deliveryTime, setDeliveryTime] = useState(""); const [purity, setPurity] = useState(""); const [carat, setCarat] = useState(""); const [weight, setWeight] = useState(""); const [clarity, setClarity] = useState(""); const [tag, setTag] = useState("");
  const [busy, setBusy] = useState(false); const [aiBusy, setAiBusy] = useState(false); const [aiProgress, setAiProgress] = useState(0); const [aiError, setAiError] = useState(""); const [history, setHistory] = useState<any[]>([]); const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const setters = { description: setDescription, origin: setOrigin, material: setMaterial, craftsmanship: setCraftsmanship, certification: setCertification, deliveryTime: setDeliveryTime, purity: setPurity, carat: setCarat, weight: setWeight, clarity: setClarity, tag: setTag };
  const aiRunId = useRef(0);

  const clearAiOutputs = () => {
    setGeneratedImage(null); setAiError(""); setAiProgress(0); setHistory([]);
    setDescription(""); setOrigin(""); setMaterial(""); setCraftsmanship(""); setCertification(""); setDeliveryTime(""); setPurity(""); setCarat(""); setWeight(""); setClarity(""); setTag("");
  };
  const cancelAll = () => {
    aiRunId.current += 1; // invalidate any in-flight AI response
    setAiBusy(false); setBusy(false);
    setName(""); setPrice(""); setFile(null); setCategory("featured"); setTone("premium"); setTargetRegion(""); setUseAiImage(false);
    clearAiOutputs();
    toast.success("Cancelled — form cleared");
  };

  const autoFill = async () => {
    if (!name.trim()) return toast.error("Enter a product name first");
    if (!file && !useAiImage) return toast.error("Upload a photo for photo-based AI, or switch on AI image generation");
    setAiBusy(true); setAiError(""); setAiProgress(12);
    const runId = ++aiRunId.current;
    const timer = window.setInterval(() => setAiProgress((p) => Math.min(92, p + 8)), 700);
    try {
      const imageDataUrl = file ? await fileToDataUrl(file) : undefined;
      setAiProgress(35);
      const { data, error } = await supabase.functions.invoke("generate-product-details", { body: { name: name.trim(), category, price: price.trim() || undefined, imageDataUrl, tone, targetRegion: targetRegion.trim() || undefined, generateImage: useAiImage && !file } });
      if (runId !== aiRunId.current) return; // cancelled
      if (error) throw error; if (data?.error) throw new Error(data.error);
      setAiProgress(100);
      const d = data?.details ?? {}; setDetails(d, setters); if (data?.generatedImage) setGeneratedImage(data.generatedImage);
      setHistory((h) => [{ details: d, tone, targetRegion, image: data?.generatedImage, at: new Date().toLocaleString() }, ...h].slice(0, 6));
      await (supabase as any).from("ai_product_generations").insert({ product_name: name.trim(), category, price: price.trim() || null, tone, target_region: targetRegion.trim() || null, source_image_url: file ? file.name : data?.generatedImage ? "AI generated image" : null, details: d });
      toast.success("AI suggestions ready — compare, edit, then save");
    } catch (e: any) {
      if (runId !== aiRunId.current) return;
      const message = e.message?.includes("timeout") ? "AI timed out. Please retry or use a smaller image." : e.message ?? "AI auto-fill failed";
      setAiError(message); toast.error(message);
    } finally { clearInterval(timer); if (runId === aiRunId.current) { setAiBusy(false); window.setTimeout(() => setAiProgress(0), 1200); } }
  };

  const submit = async () => {
    if (!name.trim() || !price.trim()) return toast.error("Name and price are required");
    if (!file && !generatedImage) return toast.error("Upload a photo or generate one with AI");
    setBusy(true);
    try {
      const uploadFile = file ?? await dataUrlToFile(generatedImage!, `${name.replace(/\W+/g, "-") || "ai-product"}.png`);
      const path = `custom/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${uploadFile.name.split(".").pop() ?? "png"}`;
      const { error: upErr } = await supabase.storage.from("shop-images").upload(path, uploadFile, { upsert: true }); if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from("shop-images").getPublicUrl(path);
      const { error } = await supabase.from("custom_products").insert({ name: name.trim(), price: price.trim(), image: pub.publicUrl, category, description: description.trim() || null, origin: origin.trim() || null, material: material.trim() || null, craftsmanship: craftsmanship.trim() || null, certification: certification.trim() || null, delivery_time: deliveryTime.trim() || null, purity: purity.trim() || null, carat: carat.trim() || null, weight: weight.trim() || null, clarity: clarity.trim() || null, tag: tag.trim() || null });
      if (error) throw error; toast.success(`Added "${name}" permanently`);
      setName(""); setPrice(""); setFile(null); setGeneratedImage(null); setDescription(""); setOrigin(""); setMaterial(""); setCraftsmanship(""); setCertification(""); setDeliveryTime(""); setPurity(""); setCarat(""); setWeight(""); setClarity(""); setTag(""); setHistory([]); onAdded();
    } catch (e: any) { toast.error(e.message ?? "Failed to add product"); } finally { setBusy(false); }
  };

  return <div className="space-y-3"><div className="grid grid-cols-1 md:grid-cols-2 gap-2"><Input placeholder="Product name *" value={name} onChange={(e) => setName(e.target.value)} /><Input placeholder="Price * (e.g. ৳1,25,000)" value={price} onChange={(e) => setPrice(e.target.value)} /><select value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">{CATEGORY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select><label className="inline-flex items-center justify-center text-xs cursor-pointer px-3 h-10 border border-dashed border-primary/40 rounded-md hover:border-primary bg-background"><Upload className="w-4 h-4 mr-2" />{file ? file.name.slice(0, 28) : "Upload photo"}<input type="file" accept="image/*" className="hidden" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setGeneratedImage(null); }} /></label><select value={tone} onChange={(e) => setTone(e.target.value)} className="h-10 px-3 rounded-md border border-input bg-background text-sm">{AI_TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select><Input placeholder="Target origin/region (e.g. Bangladesh, Italy)" value={targetRegion} onChange={(e) => setTargetRegion(e.target.value)} /></div><label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={useAiImage} onChange={(e) => setUseAiImage(e.target.checked)} /> Generate AI product image if I do not upload one</label>{generatedImage && <div className="relative inline-block"><img src={generatedImage} alt="AI generated product" className="w-28 h-28 object-cover rounded border border-border" /><button type="button" onClick={() => setGeneratedImage(null)} aria-label="Discard generated image" title="Discard generated image" className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"><X className="w-3.5 h-3.5" /></button></div>}{aiBusy && <div className="space-y-1"><Progress value={aiProgress} /><p className="text-xs text-muted-foreground">AI is analyzing and generating suggestions…</p></div>}{aiError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>AI auto-fill failed</AlertTitle><AlertDescription>{aiError} <Button size="sm" variant="outline" className="ml-2" onClick={autoFill}>Retry</Button></AlertDescription></Alert>}<Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{[["Origin", origin, setOrigin], ["Material", material, setMaterial], ["Craftsmanship", craftsmanship, setCraftsmanship], ["Certification", certification, setCertification], ["Delivery time", deliveryTime, setDeliveryTime], ["Weight", weight, setWeight], ["Purity", purity, setPurity], ["Carat", carat, setCarat], ["Clarity", clarity, setClarity], ["Tag/badge", tag, setTag]].map(([ph, val, setter]: any) => <Input key={ph} placeholder={ph} value={val} onChange={(e) => setter(e.target.value)} />)}</div><div className="flex flex-wrap gap-2"><Button onClick={submit} disabled={busy} className="bg-primary text-primary-foreground hover:bg-gold-dark"><Plus className="w-4 h-4 mr-1" />{busy ? "Adding…" : "Add product to site"}</Button><Button type="button" variant="outline" onClick={autoFill} disabled={aiBusy || !name.trim()} className="border-primary/40 text-primary hover:bg-primary/10">{aiBusy ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}{history.length ? "Regenerate" : "Auto-fill with AI"}</Button><Button type="button" variant="outline" onClick={cancelAll} className="border-border text-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"><X className="w-4 h-4 mr-1" />Cancel</Button></div>{history.length > 0 && <div className="border border-border rounded-lg p-3 space-y-2"><p className="text-xs uppercase tracking-wider text-muted-foreground">AI version history</p>{history.map((h, i) => <button key={`${h.at}-${i}`} onClick={() => { setDetails(h.details, setters); if (h.image) setGeneratedImage(h.image); }} className="w-full text-left bg-background border border-border rounded p-2 hover:border-primary"><p className="text-xs text-primary">Version {history.length - i} · {h.at}</p><p className="text-xs text-muted-foreground line-clamp-2">{h.details.description}</p></button>)}</div>}</div>;
};

const CustomProductRow = ({ item, onChanged }: { item: any; onChanged: () => void }) => {
  const [name, setName] = useState(item.name); const [price, setPrice] = useState(item.price); const [busy, setBusy] = useState(false);
  const save = async () => { setBusy(true); const { error } = await supabase.from("custom_products").update({ name, price, updated_at: new Date().toISOString() }).eq("id", item.id); setBusy(false); if (error) return toast.error(error.message); toast.success("Saved"); onChanged(); };
  const remove = async () => { if (!confirm(`Delete "${item.name}"?`)) return; setBusy(true); const { error } = await supabase.from("custom_products").delete().eq("id", item.id); setBusy(false); if (error) return toast.error(error.message); toast.success("Deleted from website"); onChanged(); };
  return <div className="bg-background border border-border rounded-lg p-2 flex items-center gap-2"><img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded shrink-0" /><div className="flex-1 min-w-0 flex flex-wrap items-center gap-2"><Input className="h-8 w-48 text-sm" value={name} onChange={(e) => setName(e.target.value)} /><Input className="h-8 w-32 text-sm" value={price} onChange={(e) => setPrice(e.target.value)} /><span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.category}</span><Button size="sm" variant="outline" disabled={busy} onClick={save}><Save className="w-3 h-3 mr-1" /> Save</Button><Button size="sm" variant="ghost" disabled={busy} onClick={remove}><Trash2 className="w-3 h-3" /></Button></div></div>;
};

const GoldRatePanel = () => {
  const qc = useQueryClient(); const [busy, setBusy] = useState(false);
  const { data: rate } = useQuery({ queryKey: ["gold_rates", "admin"], queryFn: async () => { const { data, error } = await supabase.functions.invoke("update-gold-rate", { body: {} }); if (error) throw error; if (data?.error) throw new Error(data.error); return data.rate; } });
  const refresh = async () => { setBusy(true); const { data, error } = await supabase.functions.invoke("update-gold-rate", { body: { force: true } }); setBusy(false); if (error || data?.error) return toast.error(error?.message ?? data.error); toast.success("Gold rate updated"); qc.invalidateQueries({ queryKey: ["gold_rates"] }); };
  return <div className="bg-card border border-border rounded-xl p-6 space-y-4"><h2 className="font-display text-lg text-primary">Daily market gold rate</h2><p className="text-sm">৳{Number(rate?.rate_per_gram ?? 0).toLocaleString()} / gram · ৳{Number(rate?.rate_per_vori ?? 0).toLocaleString()} / vori</p><p className="text-xs text-muted-foreground">Source: {rate?.source ?? "Market feed"} · Updated {rate?.fetched_at ? new Date(rate.fetched_at).toLocaleString() : "soon"}</p><Button onClick={refresh} disabled={busy} variant="outline"><RefreshCw className={`w-4 h-4 mr-2 ${busy ? "animate-spin" : ""}`} />Refresh now</Button></div>;
};

const AppointmentsList = ({ appointments, onChanged }: { appointments: any[]; onChanged: () => void }) => {
  const markRead = async (id: string, is_read: boolean) => { const { error } = await supabase.from("appointments").update({ is_read }).eq("id", id); if (error) return toast.error(error.message); onChanged(); };
  if (!appointments.length) return <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm">No appointments yet.</div>;
  return <div className="space-y-3">{appointments.map((a) => { const cancelUrl = `${window.location.origin}/cancel-appointment?ref=${encodeURIComponent(a.reference)}&token=${encodeURIComponent(a.cancel_token ?? "")}`; const wa = `https://wa.me/${String(a.phone).replace(/\D/g, "")}?text=${encodeURIComponent(`Your appointment ${a.reference} is booked. To cancel, open: ${cancelUrl}`)}`; return <div key={a.id} className={`rounded-lg border p-4 flex flex-col sm:flex-row sm:items-start gap-3 ${a.status === "cancelled" ? "bg-destructive/5 border-destructive/40" : a.is_read ? "bg-card border-border" : "bg-primary/5 border-primary/40"}`}><div className="flex-1 min-w-0 space-y-1"><div className="flex flex-wrap items-center gap-2"><span className="font-medium">{a.name}</span><span className="text-xs text-muted-foreground">Ref {a.reference}</span><span className="text-[10px] uppercase tracking-wider bg-muted px-2 py-0.5 rounded">{a.status ?? "booked"}</span></div><div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1"><span className="flex items-center gap-1"><Phone className="w-3 h-3" />{a.phone}</span><span>{new Date(a.appointment_date).toLocaleDateString("en-GB")} at {a.appointment_time}</span></div>{a.product_name && <p className="text-xs text-muted-foreground">Interested in: <span className="text-foreground">{a.product_name}</span></p>}{a.cancellation_reason && <p className="text-xs text-destructive">Cancel reason: {a.cancellation_reason}</p>}</div><div className="flex flex-wrap gap-2 shrink-0"><Button size="sm" variant="outline" onClick={() => markRead(a.id, !a.is_read)}><Check className="w-3 h-3 mr-1" />{a.is_read ? "Mark unread" : "Mark read"}</Button><Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(cancelUrl).then(() => toast.success("Cancel link copied"))}>Copy cancel link</Button><a href={wa} target="_blank" rel="noreferrer"><Button size="sm" variant="outline"><MessageSquare className="w-3 h-3 mr-1" />Send message</Button></a></div></div>; })}</div>;
};

const ComplaintsList = ({ complaints, onChanged }: { complaints: any[]; onChanged: () => void }) => {
  const update = async (id: string, status: string) => { const { error } = await (supabase as any).from("complaints").update({ status }).eq("id", id); if (error) return toast.error(error.message); toast.success("Complaint updated"); onChanged(); };
  if (!complaints.length) return <div className="bg-card border border-border rounded-xl p-10 text-center text-muted-foreground text-sm">No complaints yet.</div>;
  return <div className="space-y-3">{complaints.map((c) => <div key={c.id} className="bg-card border border-border rounded-lg p-4"><div className="flex flex-wrap items-center gap-2"><span className="font-medium">{c.name || "Customer"}</span><span className="text-xs text-muted-foreground">{c.phone}</span><span className="text-[10px] uppercase bg-muted rounded px-2 py-0.5">{c.status}</span>{c.reference && <span className="text-xs text-muted-foreground">Ref {c.reference}</span>}</div><p className="text-sm text-muted-foreground mt-2">{c.reason}</p><div className="flex gap-2 mt-3"><Button size="sm" variant="outline" onClick={() => update(c.id, "in_progress")}>In progress</Button><Button size="sm" variant="outline" onClick={() => update(c.id, "resolved")}>Resolved</Button></div></div>)}</div>;
};

type ChatMsg = { role: "user" | "assistant"; content: string };
type ChatSession = { id: string; title: string; updated_at: string; created_at: string };
const SUGGESTED_PROMPTS = [
  "Suggest 3 product descriptions for a 22K gold bridal haar.",
  "Draft a polite reply to a customer complaint about late delivery.",
  "What jewelry trends should I feature this month in Bangladesh?",
  "Give me pricing ideas for a new diamond solitaire ring.",
];

const groupSessionsByDate = (sessions: ChatSession[]) => {
  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const today = startOfDay(now);
  const yesterday = today - 86_400_000;
  const sevenDaysAgo = today - 7 * 86_400_000;
  const groups: Record<string, ChatSession[]> = { Today: [], Yesterday: [], "Previous 7 Days": [], Older: [] };
  for (const s of sessions) {
    const t = new Date(s.updated_at).getTime();
    if (t >= today) groups.Today.push(s);
    else if (t >= yesterday) groups.Yesterday.push(s);
    else if (t >= sevenDaysAgo) groups["Previous 7 Days"].push(s);
    else groups.Older.push(s);
  }
  return groups;
};

const AdminAssistant = ({ appointments, complaints }: { appointments: number; complaints: number }) => {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const qc = useQueryClient();
  const [input, setInput] = useState("");
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data: sessions = [] } = useQuery<ChatSession[]>({
    queryKey: ["chat_sessions", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chat_sessions")
        .select("id,title,updated_at,created_at")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ChatSession[];
    },
  });

  const refreshSessions = () => qc.invalidateQueries({ queryKey: ["chat_sessions", userId] });
  const grouped = useMemo(() => groupSessionsByDate(sessions), [sessions]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const loadSession = async (id: string) => {
    setActiveSessionId(id);
    const { data, error } = await supabase
      .from("chat_messages")
      .select("role,content")
      .eq("session_id", id)
      .order("created_at", { ascending: true });
    if (error) { toast.error(error.message); return; }
    setMessages(((data ?? []) as any[]).map((m) => ({ role: m.role, content: m.content })));
  };

  const startNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
  };

  const deleteSession = async (id: string) => {
    if (!confirm("Delete this chat?")) return;
    const { error } = await supabase.from("chat_sessions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    if (activeSessionId === id) startNewChat();
    refreshSessions();
  };

  const autoTitle = async (sessionId: string, convo: ChatMsg[]) => {
    try {
      const { data } = await supabase.functions.invoke("admin-assistant", {
        body: { mode: "title", history: convo },
      });
      const title = (data?.title ?? "").trim();
      if (!title) return;
      await supabase.from("chat_sessions").update({ title }).eq("id", sessionId);
      refreshSessions();
    } catch { /* ignore titling failures */ }
  };

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || busy || !userId) return;
    setBusy(true);
    setInput("");

    let sessionId = activeSessionId;
    let isFirstMessage = false;
    if (!sessionId) {
      const { data, error } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: "New chat" })
        .select("id")
        .single();
      if (error || !data) { setBusy(false); toast.error(error?.message ?? "Could not start chat"); return; }
      sessionId = data.id;
      setActiveSessionId(sessionId);
      isFirstMessage = true;
      refreshSessions();
    }

    const history = messages;
    const optimistic: ChatMsg[] = [...history, { role: "user", content: msg }];
    setMessages(optimistic);

    await supabase.from("chat_messages").insert({ session_id: sessionId, user_id: userId, role: "user", content: msg });

    const { data, error } = await supabase.functions.invoke("admin-assistant", {
      body: { message: msg, history, context: { appointments, openComplaints: complaints } },
    });
    setBusy(false);

    let answer = "";
    if (error || data?.error) {
      answer = "Sorry — I couldn't reply just now. Please try again.";
      toast.error(error?.message ?? data?.error ?? "Assistant failed");
    } else {
      answer = data.answer ?? "";
    }
    setMessages((m) => [...m, { role: "assistant", content: answer }]);
    await supabase.from("chat_messages").insert({ session_id: sessionId, user_id: userId, role: "assistant", content: answer });
    await supabase.from("chat_sessions").update({ updated_at: new Date().toISOString() }).eq("id", sessionId);
    refreshSessions();

    // Auto-title after first user+assistant exchange, or refine after the 2nd exchange.
    const turnCount = optimistic.length + 1; // includes new assistant reply
    if (isFirstMessage || turnCount === 4) {
      void autoTitle(sessionId, [...optimistic, { role: "assistant", content: answer }]);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[560px]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border bg-background/40`}>
        <div className="p-3 border-b border-border flex items-center gap-2">
          <Button size="sm" onClick={startNewChat} className="flex-1 bg-primary text-primary-foreground hover:bg-gold-dark">
            <Plus className="w-4 h-4 mr-1" /> New chat
          </Button>
          <Button size="sm" variant="ghost" className="md:hidden" onClick={() => setSidebarOpen(false)} aria-label="Hide history"><X className="w-4 h-4" /></Button>
        </div>
        <div className="max-h-[480px] overflow-y-auto p-2 space-y-3">
          {sessions.length === 0 && <p className="text-xs text-muted-foreground px-2 py-3">No chats yet. Send a message to start one.</p>}
          {(["Today", "Yesterday", "Previous 7 Days", "Older"] as const).map((label) =>
            grouped[label].length > 0 ? (
              <div key={label}>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-1">{label}</p>
                <div className="space-y-0.5">
                  {grouped[label].map((s) => (
                    <div key={s.id} className={`group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm cursor-pointer ${activeSessionId === s.id ? "bg-primary/15 text-primary" : "hover:bg-muted/60 text-foreground"}`} onClick={() => loadSession(s.id)}>
                      <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="flex-1 truncate">{s.title}</span>
                      <button onClick={(e) => { e.stopPropagation(); void deleteSession(s.id); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0" aria-label="Delete chat"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </aside>

      {/* Conversation */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 gap-3 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="font-display text-lg text-primary flex items-center gap-2">
            <Button size="sm" variant="ghost" className="md:hidden" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle history"><MessageSquare className="w-4 h-4" /></Button>
            <Bot className="w-5 h-5" /> Admin AI Assistant
          </h2>
          {messages.length > 0 && (
            <Button size="sm" variant="ghost" onClick={startNewChat}><RotateCcw className="w-3 h-3 mr-1" /> New chat</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">Chat history is saved automatically. Click any past chat to reload it.</p>

        <div ref={scrollRef} className="flex-1 min-h-[300px] max-h-[460px] overflow-y-auto bg-background border border-border rounded-lg p-3 space-y-3">
          {messages.length === 0 && !busy && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Try one of these to get started:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((p) => (
                  <button key={p} onClick={() => send(p)} className="text-xs text-left border border-border hover:border-primary rounded-md px-3 py-2 bg-card text-foreground">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Bot className="w-4 h-4" /></div>}
              <div className={`rounded-lg px-3 py-2 max-w-[85%] text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"}`}>
                {m.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-headings:text-primary prose-strong:text-foreground prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  <span className="whitespace-pre-wrap">{m.content}</span>
                )}
              </div>
              {m.role === "user" && <div className="w-7 h-7 rounded-full bg-muted text-foreground flex items-center justify-center shrink-0"><UserIcon className="w-4 h-4" /></div>}
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><RefreshCw className="w-3 h-3 animate-spin" /> Assistant is thinking…</div>
          )}
        </div>

        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything — product ideas, descriptions, complaint replies, trend research…"
            rows={2}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
          />
          <Button onClick={() => send()} disabled={busy || !input.trim()} className="bg-primary text-primary-foreground hover:bg-gold-dark"><Send className="w-4 h-4 mr-1" /> Send</Button>
        </div>
      </div>
    </div>
  );
};

const HelpPanel = () => <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground"><h2 className="font-display text-lg text-primary">Quick guide</h2><ul className="list-disc pl-5 space-y-2"><li>Product, theme, gold rate, appointment, and complaint changes are stored in the database, so they stay after laptop restart.</li><li>Use Products & Photos to add products, AI-generate details, hide template products, or delete custom products.</li><li>Use Appointments to copy or send the cancellation link to the customer number.</li></ul></div>;

const hslStrToHex = (hsl: string | null | undefined, fallback: string): string => { if (!hsl) return fallback; const m = hsl.trim().match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/); if (!m) return fallback; const h = +m[1] / 360, s = +m[2] / 100, l = +m[3] / 100; const k = (n: number) => (n + h * 12) % 12; const a = s * Math.min(l, 1 - l); const f = (n: number) => Math.round((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255).toString(16).padStart(2, "0"); return `#${f(0)}${f(8)}${f(4)}`; };
const hexToHslStr = (hex: string): string => { const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255; const max = Math.max(r, g, b), min = Math.min(r, g, b); const l = (max + min) / 2; let h = 0, s = 0; if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`; };
const ThemeForm = ({ initial, onSaved }: { initial: any; onSaved: () => void }) => { const defaults = { primary: "43 72% 53%", accent: "345 80% 30%", background: "0 0% 4%" }; const [primary, setPrimary] = useState(initial.theme_primary ?? defaults.primary); const [accent, setAccent] = useState(initial.theme_accent ?? defaults.accent); const [background, setBackground] = useState(initial.theme_background ?? defaults.background); const [busy, setBusy] = useState(false); useEffect(() => { setPrimary(initial.theme_primary ?? defaults.primary); setAccent(initial.theme_accent ?? defaults.accent); setBackground(initial.theme_background ?? defaults.background); }, [initial]); const save = async (reset = false) => { setBusy(true); const { error } = await supabase.from("shop_settings").update({ theme_primary: reset ? null : primary, theme_accent: reset ? null : accent, theme_background: reset ? null : background, updated_at: new Date().toISOString() }).eq("id", "main"); setBusy(false); if (error) return toast.error(error.message); toast.success(reset ? "Theme reset" : "Theme saved"); onSaved(); }; const swatch = (label: string, value: string, setValue: (v: string) => void, fallback: string) => <div className="space-y-1.5"><Label>{label}</Label><div className="flex items-center gap-3"><input type="color" value={hslStrToHex(value, hslStrToHex(fallback, "#cda53d"))} onChange={(e) => setValue(hexToHslStr(e.target.value))} className="h-10 w-16 rounded border border-border bg-transparent cursor-pointer" /><Input value={value} onChange={(e) => setValue(e.target.value)} className="flex-1 font-mono text-xs" /></div></div>; return <div className="bg-card border border-border rounded-xl p-6 space-y-5"><h2 className="font-display text-lg text-primary">Site theme</h2>{swatch("Primary", primary, setPrimary, defaults.primary)}{swatch("Accent", accent, setAccent, defaults.accent)}{swatch("Background", background, setBackground, defaults.background)}<div className="flex flex-wrap gap-2 pt-2"><Button onClick={() => save(false)} disabled={busy} className="bg-primary text-primary-foreground hover:bg-gold-dark"><Save className="w-4 h-4 mr-2" />{busy ? "Saving…" : "Save theme"}</Button><Button variant="outline" onClick={() => save(true)} disabled={busy}><RotateCcw className="w-4 h-4 mr-2" />Reset to default</Button></div></div>; };

export default Admin;
