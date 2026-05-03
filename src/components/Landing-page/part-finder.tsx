"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { SITE, whatsappURL } from "@/lib/site";

const VEHICLE_TYPES = ["Truck", "Bus", "4-Wheeler / Car", "SUV / 4×4", "Tractor"];

const MAKES: Record<string, string[]> = {
  Truck: ["TATA", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra", "Volvo", "Force"],
  Bus: ["TATA", "Ashok Leyland", "Eicher", "Volvo", "Force"],
  "4-Wheeler / Car": ["Maruti Suzuki", "Hyundai", "TATA", "Mahindra", "Toyota", "Honda", "Ford", "Renault"],
  "SUV / 4×4": ["Mahindra", "TATA", "Toyota", "Force", "Maruti Suzuki"],
  Tractor: ["Mahindra", "TAFE", "Sonalika", "John Deere", "New Holland"],
};

const CATEGORIES = [
  "Engine oil / Lubricant",
  "Filter (oil / air / fuel)",
  "Brake shoes / pads / drums",
  "Clutch kit",
  "Suspension / leaf spring",
  "Drivetrain / bearings",
  "Electricals / starter",
  "Radiator / cooling",
  "Gasket / seal",
  "Other",
];

export function PartFinder() {
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
            <p className="eyebrow text-[var(--amber)] mb-3">§ 01 · Part-finder</p>
            <h3 className="font-display text-3xl md:text-4xl leading-[0.95] tracking-tight">
              Tell us the vehicle.
              <br />
              <span className="italic text-[var(--bone)]/80">We&apos;ll find the part.</span>
            </h3>
            <p className="mt-4 text-sm text-[var(--bone)]/70 leading-relaxed">
              Fill in what you know — we&apos;ll take it from there on WhatsApp
              or a call. No robots, no wait.
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
            <Field label="01 · Vehicle type" required>
              <Select value={type} onChange={(v) => { setType(v); setMake(""); }}>
                <option value="">Select type…</option>
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </Select>
            </Field>

            <Field label="02 · Make" required>
              <Select value={make} onChange={setMake} disabled={!type}>
                <option value="">{type ? "Select make…" : "Pick type first"}</option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
                <option value="Other">Other / Not listed</option>
              </Select>
            </Field>

            <Field label="03 · Model / Year">
              <Input
                value={model}
                onChange={setModel}
                placeholder="e.g. LPT 1615, 2018"
              />
            </Field>

            <Field label="04 · Part category" required>
              <Select value={part} onChange={setPart}>
                <option value="">Select category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </Field>

            <Field label="05 · Anything else?" className="md:col-span-2">
              <Input
                value={extra}
                onChange={setExtra}
                placeholder="Part number, brand preference, quantity…"
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
                <span>{complete ? "Send on WhatsApp" : "Fill required fields"}</span>
                <span className="w-10 h-10 -mr-4 rounded-full bg-[var(--ink)] text-[var(--bone)] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.button>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-[var(--steel)] text-sm hover:bg-[var(--bone)] hover:text-[var(--ink)] transition-colors"
              >
                Or ring the counter · <span className="font-mono">{SITE.phone}</span>
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
