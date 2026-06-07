import { useEffect, useState } from "react";

const KEY = "interactionCounts";
const EVT = "interaction-counts-changed";

type Counts = { enquiry: number; appointment: number };

const read = (): Counts => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { enquiry: 0, appointment: 0 };
    const v = JSON.parse(raw);
    return { enquiry: Number(v.enquiry) || 0, appointment: Number(v.appointment) || 0 };
  } catch {
    return { enquiry: 0, appointment: 0 };
  }
};

const write = (c: Counts) => {
  localStorage.setItem(KEY, JSON.stringify(c));
  window.dispatchEvent(new Event(EVT));
};

export const incrementInteraction = (kind: "enquiry" | "appointment") => {
  const c = read();
  c[kind] += 1;
  write(c);
};

export const resetInteractions = () => write({ enquiry: 0, appointment: 0 });

export const useInteractionCounts = () => {
  const [counts, setCounts] = useState<Counts>(read);
  useEffect(() => {
    const handler = () => setCounts(read());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return counts;
};