"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

type PartTile = {
  title: { en: string; hi: string };
  caption: { en: string; hi: string };
  search: string;
  src: string;
  alt: string;
};

const PART_TILES: PartTile[] = [
  {
    title: { en: "Bearings", hi: "बेयरिंग" },
    caption: { en: "Wheel, hub and drivetrain bearings", hi: "व्हील, हब और ड्राइवट्रेन बेयरिंग" },
    search: "bearing",
    src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80",
    alt: "Close-up of metal bearings and mechanical parts",
  },
  {
    title: { en: "Brake shoes", hi: "ब्रेक शू" },
    caption: { en: "Pads, shoes, drums and hardware", hi: "पैड, शू, ड्रम और हार्डवेयर" },
    search: "brake shoe",
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop&q=80",
    alt: "Automotive brake and repair workshop",
  },
  {
    title: { en: "Filters", hi: "फिल्टर" },
    caption: { en: "Oil, air, fuel and Fleetguard-style filters", hi: "ऑयल, एयर, फ्यूल और फिल्टर" },
    search: "filter",
    src: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1200&auto=format&fit=crop&q=80",
    alt: "Shelves of spare parts and filters",
  },
  {
    title: { en: "Clutch kits", hi: "क्लच किट" },
    caption: { en: "Pressure plates, discs and release bearings", hi: "प्रेशर प्लेट, डिस्क और रिलीज़ बेयरिंग" },
    search: "clutch",
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&auto=format&fit=crop&q=80",
    alt: "Workshop table with tools",
  },
  {
    title: { en: "Engine oil", hi: "इंजन ऑयल" },
    caption: { en: "Diesel oils, gear oils, grease and coolants", hi: "डीज़ल ऑयल, गियर ऑयल, ग्रीस और कूलेंट" },
    search: "engine oil",
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80",
    alt: "Rows of engine oil bottles",
  },
  {
    title: { en: "Leaf springs", hi: "लीफ स्प्रिंग" },
    caption: { en: "Suspension parts for Indian road loads", hi: "भारतीय सड़कों के लिए सस्पेंशन पार्ट्स" },
    search: "leaf spring",
    src: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=1200&auto=format&fit=crop&q=80",
    alt: "Mechanic working under a heavy vehicle",
  },
  {
    title: { en: "Gear oil", hi: "गियर ऑयल" },
    caption: { en: "Transmission and differential lubricants", hi: "ट्रांसमिशन और डिफरेंशियल लुब्रिकेंट" },
    search: "gear oil",
    src: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&auto=format&fit=crop&q=80",
    alt: "Workshop oil and fluids",
  },
  {
    title: { en: "Radiator", hi: "रेडिएटर" },
    caption: { en: "Cooling parts, hoses and caps", hi: "कूलिंग पार्ट्स, होज़ और कैप" },
    search: "radiator",
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
    alt: "Vehicle front and cooling area",
  },
  {
    title: { en: "Electricals", hi: "इलेक्ट्रिकल" },
    caption: { en: "Starters, alternators, lights and wiring", hi: "स्टार्टर, अल्टरनेटर, लाइट और वायरिंग" },
    search: "starter",
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    alt: "Electrical and workshop tools",
  },
  {
    title: { en: "Suspension", hi: "सस्पेंशन" },
    caption: { en: "Shocks, bushes and underbody parts", hi: "शॉक, बुश और अंडरबॉडी पार्ट्स" },
    search: "suspension",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop&q=80",
    alt: "Vehicle and suspension detail",
  },
  {
    title: { en: "Belts", hi: "बेल्ट" },
    caption: { en: "Fan belts, timing belts and pulleys", hi: "फैन बेल्ट, टाइमिंग बेल्ट और पुली" },
    search: "belt",
    src: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=1200&auto=format&fit=crop&q=80",
    alt: "Industrial belts and mechanical equipment",
  },
  {
    title: { en: "Gaskets", hi: "गैस्केट" },
    caption: { en: "Seals, gasket kits and engine fitments", hi: "सील, गैस्केट किट और इंजन फिटमेंट" },
    search: "gasket",
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop&q=80",
    alt: "Small mechanical parts on a work table",
  },
];

export function WorkshopGallery() {
  const reduce = useReducedMotion();
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const isHindi = lang === "hi";
  const visibleTiles = expanded ? PART_TILES : PART_TILES.slice(0, 6);

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ ०७ · दुकान" : "§ 07 · The shop"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            {isHindi ? "जो चाहिए" : "Tap a part."}
            <br />
            <span className="italic amber-mark">
              {isHindi ? "सीधा खोजें।" : "Search instantly."}
            </span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "नीचे किसी भी पार्ट की तस्वीर पर क्लिक करें। पार्ट्स पेज खुलेगा और वही शब्द पहले से सर्च होगा।"
              : "Click any part tile. The parts page opens with that word already searched, just like a modern catalogue shortcut."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {visibleTiles.map((tile, i) => (
          <motion.div
            key={tile.search}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.22, 0.8, 0.22, 1], delay: (i % 6) * 0.05 }}
            className={spans[i % spans.length]}
          >
            <Link
              href={`/parts?search=${encodeURIComponent(tile.search)}`}
              className="relative group block h-full overflow-hidden rounded-sm bg-[var(--ink)]"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/20 to-transparent" />
              <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-[0.22em] bg-[var(--amber)] text-[var(--ink)] px-2 py-1">
                {isHindi ? "खोजें" : "Search"}
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-[var(--bone)] flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display italic text-2xl md:text-3xl leading-tight">
                    {isHindi ? tile.title.hi : tile.title.en}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-[var(--bone)]/75">
                    {isHindi ? tile.caption.hi : tile.caption.en}
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
          {isHindi
            ? "◆ तस्वीर पर क्लिक करें — पार्ट्स पेज में वही सर्च खुलेगी।"
            : "◆ Click a tile — it opens the parts page with search applied."}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
        >
          {expanded
            ? isHindi
              ? "कम दिखाएँ"
              : "Show less"
            : isHindi
              ? "और पार्ट्स दिखाएँ"
              : "Show more parts"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}

const spans = [
  "col-span-12 md:col-span-8 aspect-[16/10]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-12 aspect-[21/8]",
];
