"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

type Note = {
  n: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  date: string;
};

const NOTES: Note[] = [
  {
    n: "01",
    title: "Choosing the right engine oil for your Tata LPT 1615",
    readTime: "4 min read",
    category: "Lubricants",
    excerpt:
      "The owners' manual is the starting point, not the finish line. Here's what we'd actually put in a workhorse LPT running eastern UP routes.",
    date: "Apr 28, 2026",
  },
  {
    n: "02",
    title: "How to tell a counterfeit Fleetguard filter from the real one",
    readTime: "3 min read",
    category: "Filtration",
    excerpt:
      "Five tells that separate genuine Fleetguard from the grey-market lookalikes we see come through the shop every month.",
    date: "Apr 14, 2026",
  },
  {
    n: "03",
    title: "Why your Swift's clutch wore out at 40,000 km",
    readTime: "5 min read",
    category: "Drivetrain",
    excerpt:
      "City traffic, a heavy foot, and the wrong clutch kit. Twenty years of counter conversations distilled into one quiet lesson.",
    date: "Mar 30, 2026",
  },
];

export function FieldNotes() {
  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 12 · Field notes</p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
            What the counter
            <br />
            <span className="italic">tells us.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            Short, honest notes from twenty years on the floor. Useful for
            drivers, workshop owners, and anyone who wants their vehicle to
            last a year longer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {NOTES.map((n, i) => (
          <motion.article
            key={n.n}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 0.8, 0.22, 1] }}
            className="group relative flex flex-col p-6 md:p-8 bg-[var(--paper)] border border-[var(--border)] rounded-sm min-h-[340px] hover:border-[var(--ink)] transition-colors"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink)]/55">
                N° {n.n} · {n.category}
              </span>
              <BookOpen className="h-4 w-4 text-[var(--amber-deep)] opacity-60 group-hover:opacity-100 transition" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-[var(--ink)]">
              {n.title}
            </h3>

            <p className="mt-4 text-sm text-[var(--ink)]/75 leading-relaxed">
              {n.excerpt}
            </p>

            <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--ink)]/55">
              <span>{n.readTime}</span>
              <span>{n.date}</span>
            </div>

            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        ))}
      </div>

      <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--ink)]/55">
        ◆ &nbsp;New notes published monthly. Written at the counter, not in an office.
      </p>
    </div>
  );
}
