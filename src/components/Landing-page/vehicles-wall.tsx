"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Maker = { name: string; domain: string };

/**
 * Prefer local `/public/brands/*` for OEMs where remote thumbs fail or look soft:
 * - Tata: Wikimedia rejects some PNG widths (400); we ship a 1280px-derived PNG.
 * - Eicher / BharatBenz: favicons are tiny; we ship Commons / Wikipedia rasters.
 * Maruti stays on Wikimedia (960px step) — that URL returns 200 and looks sharp.
 */
const HI_RES_LOGO: Partial<Record<string, string[]>> = {
  "tatamotors.com": ["/brands/tata-motors.png"],
  "marutisuzuki.com": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maruti_Suzuki_logo_%282009%29.svg/960px-Maruti_Suzuki_logo_%282009%29.svg.png",
  ],
  "bharatbenz.com": ["/brands/bharatbenz.jpg"],
  "eicher.in": ["/brands/eicher.png"],
};

function faviconGoogle(domain: string, sz: number = 256) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${sz}`;
}

function faviconDuckDuckGo(domain: string) {
  return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`;
}

function logoSources(domain: string): string[] {
  const hi = HI_RES_LOGO[domain] ?? [];
  return [...hi, faviconGoogle(domain), faviconDuckDuckGo(domain)];
}

function BrandLogo({ domain, name }: { domain: string; name: string }) {
  const sources = logoSources(domain);
  const [i, setI] = useState(0);

  if (i >= sources.length) {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-[var(--ink)]/15 bg-[var(--ink)]/[0.04] font-mono text-[11px] font-semibold uppercase tracking-tight text-[var(--ink)]/45"
        aria-hidden
      >
        {name
          .split(/\s+/)
          .map((w) => w[0])
          .join("")
          .slice(0, 3)}
      </div>
    );
  }

  const src = sources[i];
  const isRemote = src.startsWith("http");

  return (
    <Image
      key={src}
      src={src}
      alt={`${name}`}
      fill
      sizes="(max-width: 768px) 56px, 64px"
      className="object-contain"
      unoptimized={isRemote}
      onError={() => setI((n) => n + 1)}
    />
  );
}

const MAKERS: Maker[] = [
  { name: "TATA Motors", domain: "tatamotors.com" },
  { name: "Ashok Leyland", domain: "ashokleyland.com" },
  { name: "Eicher", domain: "eicher.in" },
  { name: "BharatBenz", domain: "bharatbenz.com" },
  { name: "Mahindra", domain: "mahindra.com" },
  { name: "Maruti Suzuki", domain: "marutisuzuki.com" },
  { name: "Hyundai", domain: "hyundai.com" },
  { name: "Toyota", domain: "toyota.com" },
  { name: "Honda", domain: "honda.com" },
  { name: "Volvo Trucks", domain: "volvotrucks.com" },
  { name: "Force Motors", domain: "forcemotors.com" },
  { name: "Renault", domain: "renault.com" },
];

export function VehiclesWall() {
  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 09 · Vehicles we serve</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
            If it <span className="italic">runs</span> in India,
            <br />
            we stock for it.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            Every major Indian and global manufacturer whose vehicles work the
            roads of eastern UP — we carry, cross-reference and fit the parts
            for.
          </p>
        </div>
      </div>

      <div className="border-y border-[var(--border)] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y divide-[var(--border)]">
        {MAKERS.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: (i % 6) * 0.05, duration: 0.6, ease: [0.22, 0.8, 0.22, 1] }}
            className="group relative aspect-[5/3] flex flex-col items-center justify-center p-5 transition-colors hover:bg-[var(--paper)] hover:text-[var(--ink)]"
          >
            {/* corner index */}
            <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink)]/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* logo — Google favicon + DuckDuckGo fallback (Clearbit no longer reliable) */}
            <div className="relative mb-3 h-14 w-14 opacity-90 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-16 md:w-16">
              <BrandLogo domain={m.domain} name={m.name} />
            </div>
            <span className="text-center text-xs font-medium text-[var(--ink)] md:text-sm">{m.name}</span>
            {/* amber underline */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      <p className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink)]/55">
        <span>Don&apos;t see your make?</span>
        <span className="text-[var(--amber-deep)]">◆ &nbsp;Ring the counter — if it runs, we can source it.</span>
      </p>
    </div>
  );
}
