import { useEffect } from "react";
import { useShopSettings } from "@/hooks/useShopSettings";

/**
 * Applies admin-chosen theme colors (HSL strings like "43 72% 53%") to CSS variables.
 * Falls back to the defaults already declared in index.css when no override is set.
 */
const ThemeApplier = () => {
  const s = useShopSettings();

  useEffect(() => {
    const root = document.documentElement;
    const set = (name: string, value: string | null | undefined) => {
      if (value && value.trim()) root.style.setProperty(name, value);
      else root.style.removeProperty(name);
    };
    set("--primary", s.theme_primary);
    set("--ring", s.theme_primary);
    set("--gold", s.theme_primary);
    set("--accent", s.theme_accent);
    set("--background", s.theme_background);
  }, [s.theme_primary, s.theme_accent, s.theme_background]);

  return null;
};

export default ThemeApplier;