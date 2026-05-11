"use client";

import { ShieldCheck, Boxes, Truck, Wrench } from "lucide-react";
import type { ReactNode } from "react";

type Item = {
  n: string;
  title: string;
  body: string;
  icon: ReactNode;
};

const ITEMS: Item[] = [
  {
    n: "01",
    title: "Genuine & OE-grade",
    body: "Every part we stock is traceable. No greys, no counterfeits — only parts we'd install in our own trucks.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    n: "02",
    title: "Breadth of inventory",
    body: "From braking shoes to drivetrain, filtration to engine oils — one workshop, indexed shelves, walk-in ready.",
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    n: "03",
    title: "Fast fulfilment",
    body: "Most orders despatched same day. Transport across UP and onward by the carriers you already trust.",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    n: "04",
    title: "Mechanic-led counsel",
    body: "Twenty years on the floor means we know what fits what. Tell us the model — we'll recommend the part.",
    icon: <Wrench className="h-5 w-5" />,
  },
];

export function ServiceHighlights() {
  return (
    <div className="relative">
      {/* header row */}
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 04 · Workshop</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--foreground)]">
            Why fleets keep
            <br />
            coming <span className="italic amber-mark">back.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 pt-2">
          <p className="text-base leading-relaxed text-[var(--foreground)]/80 md:text-lg">
            We aren&apos;t a catalogue with a phone number. We&apos;re a counter,
            a bay, and a thousand relationships tied together by two decades
            of service. Here&apos;s what that buys you.
          </p>
        </div>
      </div>

      {/* four editorial columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] border-y border-[var(--border)]">
        {ITEMS.map((item) => (
          <article
            key={item.n}
            className="group relative flex min-h-[340px] flex-col gap-6 p-6 transition-colors duration-500 hover:bg-[var(--paper)] hover:text-[var(--ink)] md:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--muted-foreground)] group-hover:text-[var(--ink)]/60">
                / {item.n}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors group-hover:border-[var(--amber)] group-hover:bg-[var(--amber)] group-hover:text-[var(--ink)]">
                {item.icon}
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl leading-tight tracking-tight text-[var(--foreground)] group-hover:text-[var(--ink)] md:text-3xl">
                {item.title}
              </h3>
            </div>

            <p className="mt-auto text-sm leading-relaxed text-[var(--foreground)]/75 group-hover:text-[var(--ink)]/80">
              {item.body}
            </p>

            {/* amber underline reveal */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        ))}
      </div>

      {/* footer meta */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
        <span>Open Mon–Sat · 9am – 7pm</span>
        <span className="text-[var(--amber-deep)]">◆ &nbsp;Counter open · Workshop live</span>
        <span>Kaneri Road, Mohansarai</span>
      </div>
    </div>
  );
}
