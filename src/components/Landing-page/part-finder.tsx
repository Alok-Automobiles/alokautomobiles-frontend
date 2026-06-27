"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE, whatsappURL } from "@/lib/site";

const VEHICLE_TYPES = [
  { value: "Truck", en: "Truck", hi: "ट्रक" },
  { value: "Bus", en: "Bus", hi: "बस" },
  { value: "4-Wheeler / Car", en: "4-Wheeler / Car", hi: "कार / 4-व्हीलर" },
  { value: "SUV / 4×4", en: "SUV / 4×4", hi: "SUV / 4×4" },
  { value: "Tractor", en: "Tractor", hi: "ट्रैक्टर" },
];

const MAKES: Record<string, string[]> = {
  Truck: ["TATA", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra", "Volvo", "Force"],
  Bus: ["TATA", "Ashok Leyland", "Eicher", "Volvo", "Force"],
  "4-Wheeler / Car": ["Maruti Suzuki", "Hyundai", "TATA", "Mahindra", "Toyota", "Honda", "Ford", "Renault"],
  "SUV / 4×4": ["Mahindra", "TATA", "Toyota", "Force", "Maruti Suzuki"],
  Tractor: ["Mahindra", "TAFE", "Sonalika", "John Deere", "New Holland"],
};

const CATEGORIES = [
  { value: "Engine oil / Lubricant", en: "Engine oil / Lubricant", hi: "इंजन ऑयल / लुब्रिकेंट" },
  { value: "Filter (oil / air / fuel)", en: "Filter (oil / air / fuel)", hi: "फिल्टर (ऑयल / एयर / फ्यूल)" },
  { value: "Brake shoes / pads / drums", en: "Brake shoes / pads / drums", hi: "ब्रेक शू / पैड / ड्रम" },
  { value: "Clutch kit", en: "Clutch kit", hi: "क्लच किट" },
  { value: "Suspension / leaf spring", en: "Suspension / leaf spring", hi: "सस्पेंशन / लीफ स्प्रिंग" },
  { value: "Drivetrain / bearings", en: "Drivetrain / bearings", hi: "ड्राइवट्रेन / बेयरिंग" },
  { value: "Electricals / starter", en: "Electricals / starter", hi: "इलेक्ट्रिकल / स्टार्टर" },
  { value: "Radiator / cooling", en: "Radiator / cooling", hi: "रेडिएटर / कूलिंग" },
  { value: "Gasket / seal", en: "Gasket / seal", hi: "गैस्केट / सील" },
  { value: "Other", en: "Other", hi: "अन्य" },
];

export function PartFinder() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [type, setType] = useState<string>("");
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [part, setPart] = useState<string>("");
  const [extra, setExtra] = useState<string>("");

  const makes = type ? MAKES[type] ?? [] : [];

  const complete = type && make && part;

  const message = useMemo(() => {
    const lines = [
      `Hi ${SITE.name} — I'm looking for a part.`,
      `Vehicle type: ${type || "__"}`,
      `Make: ${make || "__"}`,
      `Model / Year: ${model || "__"}`,
      `Part / Category: ${part || "__"}`,
    ];
    if (extra.trim()) lines.push(`Notes: ${extra.trim()}`);
    lines.push("", "Please share availability and price.");
    return lines.join("\n");
  }, [type, make, model, part, extra]);

  return (
    <div id="part-finder" className="relative">
      <div className="relative bg-[var(--ink)] text-[var(--bone)] rounded-sm overflow-hidden">
        {/* diesel band top */}
        <div className="diesel-stripe h-2.5" />

        <div className="relative grid grid-cols-12 gap-0">
          {/* left headline */}
          <div className="col-span-12 md:col-span-4 p-8 md:p-10 border-b md:border-b-0 md:border-r border-[var(--steel)]">
            <p className="eyebrow text-[var(--amber)] mb-3">
              {isHindi ? "§ ०१ · पार्ट खोजें" : "§ 01 · Part-finder"}
            </p>
            <h3 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight">
              {isHindi ? "गाड़ी बताइए।" : "Tell us the vehicle."}
              <br />
              <span className="italic text-[var(--bone)]/80">
                {isHindi ? "हम पार्ट ढूँढ देंगे।" : "We&apos;ll find the part."}
              </span>
            </h3>
            <p className="mt-4 text-sm text-[var(--bone)]/70 leading-relaxed">
              {isHindi
                ? "जो जानकारी हो भर दें — आगे हम WhatsApp या कॉल पर संभाल लेंगे। कोई रोबोट नहीं, कोई इंतज़ार नहीं।"
                : "Fill in what you know — we'll take it from there on WhatsApp or a call. No robots, no wait."}
            </p>
          </div>

          {/* form */}
          <form
            className="col-span-12 md:col-span-8 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!complete) return;
              window.open(whatsappURL(message), "_blank", "noopener");
            }}
          >
            <Field label={isHindi ? "01 · गाड़ी का प्रकार" : "01 · Vehicle type"} required>
              <Select value={type} onChange={(v) => { setType(v); setMake(""); }}>
                <option value="">{isHindi ? "प्रकार चुनें…" : "Select type…"}</option>
                {VEHICLE_TYPES.map((v) => (
                  <option key={v.value} value={v.value}>{isHindi ? v.hi : v.en}</option>
                ))}
              </Select>
            </Field>

            <Field label={isHindi ? "02 · कंपनी" : "02 · Make"} required>
              <Select value={make} onChange={setMake} disabled={!type}>
                <option value="">
                  {type
                    ? isHindi
                      ? "कंपनी चुनें…"
                      : "Select make…"
                    : isHindi
                      ? "पहले प्रकार चुनें"
                      : "Pick type first"}
                </option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
                <option value="Other">{isHindi ? "अन्य / लिस्ट में नहीं" : "Other / Not listed"}</option>
              </Select>
            </Field>

            <Field label={isHindi ? "03 · मॉडल / साल" : "03 · Model / Year"}>
              <Input
                value={model}
                onChange={setModel}
                placeholder={isHindi ? "जैसे LPT 1615, 2018" : "e.g. LPT 1615, 2018"}
              />
            </Field>

            <Field label={isHindi ? "04 · पार्ट कैटेगरी" : "04 · Part category"} required>
              <Select value={part} onChange={setPart}>
                <option value="">{isHindi ? "कैटेगरी चुनें…" : "Select category…"}</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{isHindi ? c.hi : c.en}</option>
                ))}
              </Select>
            </Field>

            <Field label={isHindi ? "05 · और कुछ?" : "05 · Anything else?"} className="md:col-span-2">
              <Input
                value={extra}
                onChange={setExtra}
                placeholder={isHindi ? "पार्ट नंबर, ब्रांड, नोट…" : "Part number, brand preference, quantity…"}
              />
            </Field>

            <div className="md:col-span-2 flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2">
              <motion.button
                type="submit"
                disabled={!complete}
                whileHover={complete ? { scale: 1.02 } : undefined}
                whileTap={complete ? { scale: 0.98 } : undefined}
                className="group inline-flex items-center justify-center gap-3 h-14 px-6 rounded-full bg-[var(--amber)] text-[var(--ink)] font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Search className="h-4 w-4" />
                <span>
                  {complete
                    ? isHindi
                      ? "WhatsApp पर भेजें"
                      : "Send on WhatsApp"
                    : isHindi
                      ? "ज़रूरी जानकारी भरें"
                      : "Fill required fields"}
                </span>
                <span className="w-10 h-10 -mr-4 rounded-full bg-[var(--ink)] text-[var(--bone)] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.button>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-[var(--steel)] text-sm hover:bg-[var(--bone)] hover:text-[var(--ink)] transition-colors"
              >
                {isHindi ? "या काउंटर पर कॉल करें" : "Or ring the counter"} · <span className="font-mono">{SITE.phone}</span>
              </a>
            </div>
          </form>
        </div>

        <div className="diesel-stripe h-2.5" />
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/60">
        {label} {required ? <span className="text-[var(--amber)]">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  children,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 appearance-none bg-[var(--steel)]/40 hover:bg-[var(--steel)]/60 focus:bg-[var(--steel)]/70 border border-[var(--steel)] focus:border-[var(--amber)] focus:outline-none rounded-md px-3 pr-10 text-sm text-[var(--bone)] disabled:opacity-40 transition-colors"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--amber)]">
        ↓
      </span>
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-12 bg-[var(--steel)]/40 hover:bg-[var(--steel)]/60 focus:bg-[var(--steel)]/70 border border-[var(--steel)] focus:border-[var(--amber)] focus:outline-none rounded-md px-3 text-sm text-[var(--bone)] placeholder:text-[var(--bone)]/40 transition-colors"
    />
  );
}
