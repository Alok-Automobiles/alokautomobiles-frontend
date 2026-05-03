"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
};

const SHOTS: Shot[] = [
  {
    src: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1200&auto=format&fit=crop&q=80",
    alt: "Shelves of spare parts in the workshop",
    caption: "Indexed shelves · 40+ brands",
    tag: "Inventory",
  },
  {
    src: "https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=1200&auto=format&fit=crop&q=80",
    alt: "Mechanic working under a heavy truck",
    caption: "Heavy-duty on the bay",
    tag: "Workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&auto=format&fit=crop&q=80",
    alt: "Rows of engine oil bottles",
    caption: "Lubricants · by viscosity & grade",
    tag: "Lubes",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop&q=80",
    alt: "Truck on the road at dusk",
    caption: "Our customers move the country",
    tag: "On the road",
  },
  {
    src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&auto=format&fit=crop&q=80",
    alt: "Close-up of mechanical parts",
    caption: "OE-grade bearings & drivetrain",
    tag: "Drivetrain",
  },
  {
    src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&auto=format&fit=crop&q=80",
    alt: "Toolbox and wrench on workshop table",
    caption: "Mechanic-led counsel",
    tag: "Counter",
  },
];

export function WorkshopGallery() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 07 · The shop</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            Inside the
            <br />
            <span className="italic amber-mark">workshop.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            Our counter sits on Kaneri Road, opposite Singh Petrol Pump. Come
            for a chai, leave with a part. These are a few frames from the day.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {SHOTS.map((s, i) => (
          <motion.figure
            key={s.src}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 0.8, 0.22, 1], delay: i * 0.06 }}
            className={`relative group overflow-hidden rounded-sm bg-[var(--ink)] ${
              spans[i % spans.length]
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            {/* scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/85 via-[var(--ink)]/20 to-transparent" />
            {/* tag */}
            <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-[0.22em] bg-[var(--amber)] text-[var(--ink)] px-2 py-1">
              {s.tag}
            </span>
            {/* caption */}
            <figcaption className="absolute bottom-3 left-3 right-3 text-[var(--bone)] flex items-end justify-between gap-3">
              <span className="font-display italic text-lg md:text-xl leading-tight">
                {s.caption}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bone)]/70">
                {String(i + 1).padStart(2, "0")} / {SHOTS.length}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="mt-4 text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
        ◆ &nbsp;Placeholder imagery — replace with real shop photos any time.
      </p>
    </div>
  );
}

// Create an editorial-feeling, asymmetric grid with a few wider tiles.
const spans = [
  "col-span-12 md:col-span-8 aspect-[16/10]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-6 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-4 aspect-[4/5]",
  "col-span-12 md:col-span-12 aspect-[21/8]",
];
