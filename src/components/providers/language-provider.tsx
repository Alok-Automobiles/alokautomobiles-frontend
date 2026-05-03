"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, { en: string; hi: string }>;

/** Keys used across the site. Extend as needed — missing keys fall back
    to the English value. */
const DICT: Dict = {
  "nav.inventory": { en: "Inventory", hi: "पार्ट्स" },
  "nav.partners": { en: "Partners", hi: "ब्रांड्स" },
  "nav.workshop": { en: "Workshop", hi: "दुकान" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },
  "cta.quote": { en: "Request a quote", hi: "क़ीमत जानें" },
  "cta.call": { en: "Call the workshop", hi: "फ़ोन करें" },
  "cta.whatsapp": { en: "Chat on WhatsApp", hi: "WhatsApp पर बात करें" },
  "cta.explore": { en: "Explore inventory", hi: "पार्ट्स देखें" },
  "hero.eyebrow": {
    en: "A house of spare parts · Twenty years on",
    hi: "बीस साल से — पुर्ज़ों का भरोसेमंद घर",
  },
  "hero.l1": { en: "Keep the", hi: "हर गाड़ी के" },
  "hero.l2": { en: "wheels", hi: "पहिए" },
  "hero.l3": { en: "turning.", hi: "चलते रहें।" },
  "hero.subtitle": {
    en: "Trucks, four-wheelers, engine oils and every part in between. Genuine stock, sourced from the houses we've trusted for twenty years.",
    hi: "ट्रक, कार और इंजन ऑयल — हर ज़रूरी पुर्ज़ा एक ही काउंटर पर। असली माल, बीस साल पुराने भरोसेमंद रिश्तों से।",
  },
  "stat.years": { en: "Years in the trade", hi: "साल का अनुभव" },
  "stat.fleets": { en: "Fleets served", hi: "बेड़ों को सेवा" },
  "stat.brands": { en: "Partner brands", hi: "पार्टनर ब्रांड" },
  "section.inventory.eyebrow": { en: "§ 03 · Inventory", hi: "§ ०३ · पुर्ज़े" },
  "section.partners.eyebrow": { en: "§ 02 · Partners", hi: "§ ०२ · ब्रांड्स" },
  "section.workshop.eyebrow": { en: "§ 04 · Workshop", hi: "§ ०४ · दुकान" },
  "section.contact.eyebrow": { en: "§ 05 · Direct line", hi: "§ ०५ · सीधा संपर्क" },
  "contact.title.1": { en: "Need it", hi: "आज ही" },
  "contact.title.2": { en: "today?", hi: "चाहिए?" },
  "contact.title.3": { en: "Pick up the phone.", hi: "फ़ोन उठाइए।" },
};

const Ctx = createContext<{
  lang: Lang;
  set: (l: Lang) => void;
  toggle: () => void;
  t: (key: keyof typeof DICT) => string;
} | null>(null);

const STORAGE_KEY = "alok.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "hi") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);

  const t = (key: keyof typeof DICT) => {
    const entry = DICT[key];
    if (!entry) return String(key);
    return entry[lang] || entry.en;
  };

  return (
    <Ctx.Provider
      value={{
        lang,
        set: setLangState,
        toggle: () => setLangState((l) => (l === "en" ? "hi" : "en")),
        t,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLang must be used within LanguageProvider");
  return c;
}
