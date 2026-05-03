"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Maker = { name: string; domain: string };

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
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
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
            className="group relative aspect-[5/3] flex flex-col items-center justify-center p-5 transition-colors hover:bg-[var(--paper)]"
          >
            {/* corner index */}
            <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* logo */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 mb-3 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-85 group-hover:opacity-100">
              <Image
                src={`https://logo.clearbit.com/${m.domain}`}
                alt={`${m.name} logo`}
                fill
                sizes="56px"
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-xs md:text-sm text-center font-medium">{m.name}</span>
            {/* amber underline */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--muted-foreground)] flex items-center justify-between flex-wrap gap-2">
        <span>Don&apos;t see your make?</span>
        <span className="text-[var(--amber-deep)]">◆ &nbsp;Ring the counter — if it runs, we can source it.</span>
      </p>
    </div>
  );
}
