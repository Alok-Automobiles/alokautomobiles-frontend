"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CategoryCard({
  index,
  title,
  tagline,
  description,
  imageSrc,
  items,
  ctaHref,
  ctaLabel = "Enquire",
}: {
  index: string;
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  items: string[];
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <Link
      href={ctaHref}
      className="group relative flex flex-col bg-[var(--paper)] border border-[var(--border)] rounded-sm overflow-hidden transition-all duration-500 hover:border-[var(--ink)]"
    >
      {/* index strip */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-dashed border-[var(--border)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
          N° {index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--amber-deep)]">
          {tagline}
        </span>
      </div>

      {/* image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--linen)]">
        <Image
          src={imageSrc}
          alt={`${title} illustration`}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/40 via-transparent to-transparent" />

        {/* overlay title on image on hover */}
        <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
          <span className="font-display italic text-[var(--bone)] text-2xl md:text-3xl drop-shadow-md">
            {title.split(" ")[0]}
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* body */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
          {title}
        </h3>
        <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed">
          {description}
        </p>

        {/* indexed items list */}
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]/70">
          {items.map((i, n) => (
            <li key={i} className="flex items-baseline gap-2">
              <span className="text-[var(--amber-deep)]">
                {(n + 1).toString().padStart(2, "0")}
              </span>
              <span>{i}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <span className="link-edit inline-block text-xs font-medium">{ctaLabel} →</span>
          <span className="eyebrow">In stock</span>
        </div>
      </div>
    </Link>
  );
}
