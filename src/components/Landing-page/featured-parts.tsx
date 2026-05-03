"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { whatsappURL } from "@/lib/site";

type Part = {
  id: string;
  name: string;
  brand: string;
  for: "Truck" | "Car" | "Both";
  grade: string;
  price: string;
  blurb: string;
  tags: string[];
};

const PARTS: Part[] = [
  {
    id: "oil-castrol-crb",
    name: "CRB Turbo 15W-40",
    brand: "Castrol",
    for: "Truck",
    grade: "API CH-4",
    price: "From ₹ 380 / L",
    blurb: "Heavy-duty diesel engine oil. Workhorse grade for Indian fleets.",
    tags: ["Engine oil", "Diesel", "Fleet"],
  },
  {
    id: "oil-valvoline-premium",
    name: "Premium Blue 20W-40",
    brand: "Valvoline",
    for: "Truck",
    grade: "API CI-4",
    price: "From ₹ 410 / L",
    blurb: "High-mileage diesel oil with strong soot control.",
    tags: ["Engine oil", "Diesel"],
  },
  {
    id: "oil-shell-helix",
    name: "Helix HX7 10W-40",
    brand: "Shell",
    for: "Car",
    grade: "API SN",
    price: "From ₹ 520 / L",
    blurb: "Semi-synthetic for modern petrol & diesel passenger cars.",
    tags: ["Engine oil", "Petrol", "Diesel"],
  },
  {
    id: "brake-tata-shoe",
    name: "Brake Shoe Set",
    brand: "TATA Genuine",
    for: "Truck",
    grade: "LPT 1613/1615",
    price: "On enquiry",
    blurb: "OE-grade brake shoes, ready to fit. Ships with hardware.",
    tags: ["Braking", "TATA"],
  },
  {
    id: "filter-fleetguard",
    name: "Fuel Filter FS 1000",
    brand: "Fleetguard",
    for: "Truck",
    grade: "Cummins range",
    price: "From ₹ 650",
    blurb: "Original Fleetguard filtration — genuine holograms, no fakes.",
    tags: ["Filter", "Fuel"],
  },
  {
    id: "clutch-luk",
    name: "Clutch Kit 3-piece",
    brand: "LuK",
    for: "Car",
    grade: "Swift / Dzire",
    price: "On enquiry",
    blurb: "Pressure plate, clutch disc, release bearing — matched set.",
    tags: ["Clutch", "Passenger"],
  },
  {
    id: "bearing-timken",
    name: "Wheel Bearing",
    brand: "Timken",
    for: "Both",
    grade: "Multi-vehicle",
    price: "On enquiry",
    blurb: "Original Timken tapered rollers, long-haul durability.",
    tags: ["Drivetrain", "Bearing"],
  },
  {
    id: "spring-leaf",
    name: "Leaf Spring Assembly",
    brand: "Jonas",
    for: "Truck",
    grade: "TATA / Eicher",
    price: "On enquiry",
    blurb: "Heavy-duty leaf spring packs, tempered for Indian roads.",
    tags: ["Suspension"],
  },
];

const FILTERS = ["All", "Truck", "Car", "Engine oil", "Braking", "Filter", "Clutch", "Suspension"] as const;

export function FeaturedParts() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = PARTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Truck") return p.for === "Truck" || p.for === "Both";
    if (filter === "Car") return p.for === "Car" || p.for === "Both";
    return p.tags.some((t) => t.toLowerCase().includes(String(filter).toLowerCase()));
  });

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 11 · Featured inventory</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            A taste of the
            <br />
            <span className="italic amber-mark">counter.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            A handful of the fastest-moving parts in the shop. The full range
            is many, many times this — ring the counter for specifics.
          </p>
        </div>
      </div>

      {/* filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`h-9 px-4 rounded-full text-xs font-mono uppercase tracking-[0.22em] border transition-colors ${
              filter === f
                ? "bg-[var(--ink)] text-[var(--bone)] border-[var(--ink)]"
                : "bg-transparent text-[var(--ink)]/70 border-[var(--border)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={filter}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filtered.map((p, i) => (
            <motion.a
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              href={whatsappURL(
                `Hi Alok Automobiles — I'd like to enquire about ${p.brand} ${p.name} (${p.grade}). Please share price & availability.`
              )}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col bg-[var(--paper)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--ink)] transition-colors p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                  {p.brand}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--amber-deep)]">
                  {p.for}
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl mt-2 leading-tight tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-[var(--ink)]/70 leading-relaxed">{p.blurb}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono uppercase tracking-[0.22em] bg-[var(--linen)] text-[var(--ink)]/80 px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-[var(--border)] flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                    {p.grade}
                  </div>
                  <div className="font-display text-base md:text-lg text-[var(--ink)] mt-0.5">
                    {p.price}
                  </div>
                </div>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--amber)] text-[var(--ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-12 font-mono text-sm uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          Nothing matches — ring the counter, we almost certainly have it.
        </div>
      )}
    </div>
  );
}
