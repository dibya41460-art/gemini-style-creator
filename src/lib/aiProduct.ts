export const AI_TONES = [
  { value: "premium", label: "Premium boutique" },
  { value: "traditional", label: "Traditional heritage" },
  { value: "modern", label: "Modern luxury" },
  { value: "bridal", label: "Bridal emotional" },
] as const;

export type AiProductDetails = {
  description?: string;
  origin?: string;
  material?: string;
  craftsmanship?: string;
  certification?: string;
  delivery_time?: string;
  purity?: string;
  carat?: string;
  weight?: string;
  clarity?: string;
  tag?: string;
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the image file"));
    reader.readAsDataURL(file);
  });

export const dataUrlToFile = async (dataUrl: string, filename: string) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
};
