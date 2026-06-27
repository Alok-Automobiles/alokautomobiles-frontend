"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

type Note = {
  n: string;
  title: string;
  titleHi: string;
  readTime: string;
  readTimeHi: string;
  category: string;
  categoryHi: string;
  excerpt: string;
  excerptHi: string;
  date: string;
};

const NOTES: Note[] = [
  {
    n: "01",
    title: "Choosing the right engine oil for your Tata LPT 1615",
    titleHi: "Tata LPT 1615 के लिए सही engine oil कैसे चुनें",
    readTime: "4 min read",
    readTimeHi: "4 मिनट",
    category: "Lubricants",
    categoryHi: "लुब्रिकेंट",
    excerpt:
      "The owners' manual is the starting point, not the finish line. Here's what we'd actually put in a workhorse LPT running eastern UP routes.",
    excerptHi:
      "Owner manual शुरुआत है, आख़िरी बात नहीं। Eastern UP route पर चलने वाली LPT में हम क्या डालेंगे — सीधी बात।",
    date: "Apr 28, 2026",
  },
  {
    n: "02",
    title: "How to tell a counterfeit Fleetguard filter from the real one",
    titleHi: "नकली Fleetguard filter कैसे पहचानें",
    readTime: "3 min read",
    readTimeHi: "3 मिनट",
    category: "Filtration",
    categoryHi: "फिल्ट्रेशन",
    excerpt:
      "Five tells that separate genuine Fleetguard from the grey-market lookalikes we see come through the shop every month.",
    excerptHi:
      "पाँच संकेत जो genuine Fleetguard को grey-market lookalike से अलग बताते हैं।",
    date: "Apr 14, 2026",
  },
  {
    n: "03",
    title: "Why your Swift's clutch wore out at 40,000 km",
    titleHi: "Swift का clutch 40,000 km पर क्यों घिस गया",
    readTime: "5 min read",
    readTimeHi: "5 मिनट",
    category: "Drivetrain",
    categoryHi: "ड्राइवट्रेन",
    excerpt:
      "City traffic, a heavy foot, and the wrong clutch kit. Twenty years of counter conversations distilled into one quiet lesson.",
    excerptHi:
      "City traffic, heavy foot और गलत clutch kit — बीस साल के counter अनुभव की एक छोटी सीख।",
    date: "Mar 30, 2026",
  },
];

export function FieldNotes() {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ १२ · फील्ड नोट्स" : "§ 12 · Field notes"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
            {isHindi ? "काउंटर से" : "What the counter"}
            <br />
            <span className="italic">{isHindi ? "सीखी बातें।" : "tells us."}</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "बीस साल के floor experience से छोटी, ईमानदार बातें — drivers, workshop owners और गाड़ी संभालने वालों के लिए।"
              : "Short, honest notes from twenty years on the floor. Useful for drivers, workshop owners, and anyone who wants their vehicle to last a year longer."}
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
                N° {n.n} · {isHindi ? n.categoryHi : n.category}
              </span>
              <BookOpen className="h-4 w-4 text-[var(--amber-deep)] opacity-60 group-hover:opacity-100 transition" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-[var(--ink)]">
              {isHindi ? n.titleHi : n.title}
            </h3>

            <p className="mt-4 text-sm text-[var(--ink)]/75 leading-relaxed">
              {isHindi ? n.excerptHi : n.excerpt}
            </p>

            <div className="mt-auto pt-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--ink)]/55">
              <span>{isHindi ? n.readTimeHi : n.readTime}</span>
              <span>{n.date}</span>
            </div>

            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </motion.article>
        ))}
      </div>

      <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--ink)]/55">
        ◆ &nbsp;{isHindi ? "नए नोट्स हर महीने। ऑफिस में नहीं, काउंटर पर लिखे हुए।" : "New notes published monthly. Written at the counter, not in an office."}
      </p>
    </div>
  );
}
