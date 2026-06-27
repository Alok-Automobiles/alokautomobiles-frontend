"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

type Quote = {
  body: string;
  bodyHi: string;
  name: string;
  role: string;
  roleHi: string;
  place: string;
};

const QUOTES: Quote[] = [
  {
    body: "Twelve of my LPT 1615s run on parts from Alok-ji's counter. Whatever I ring for, lands same day. They don't try to push what I haven't asked for.",
    bodyHi: "मेरे बारह LPT 1615 Alok-ji के counter के parts पर चलते हैं। जो मांगो, same day मिल जाता है। बेकार चीज़ push नहीं करते।",
    name: "Ramesh Yadav",
    role: "Fleet owner",
    roleHi: "फ्लीट मालिक",
    place: "Ramesh Road Transport · Chandauli",
  },
  {
    body: "Bulk Castrol CRB Turbo order, no fuss. Price was fair, invoice clean, lorry loaded before lunch. This is how the old trade should work.",
    bodyHi: "Bulk Castrol CRB Turbo order बिना झंझट हुआ। Rate fair, invoice साफ, और lunch से पहले माल load। पुराना trade ऐसे ही होना चाहिए।",
    name: "Shakeel Ahmad",
    role: "Workshop proprietor",
    roleHi: "वर्कशॉप मालिक",
    place: "Shakeel Diesel Works · Mirzapur",
  },
  {
    body: "I walked in with a photograph of a broken bearing. Alok-ji turned around, pulled it from the shelf, matched my Eicher exactly. Twenty minutes, done.",
    bodyHi: "मैं टूटे bearing की photo लेकर गया। Alok-ji ने shelf से निकालकर मेरे Eicher से match कर दिया। बीस मिनट में काम।",
    name: "Vinod Kumar",
    role: "Independent mechanic",
    roleHi: "मिस्त्री",
    place: "Ghazipur",
  },
  {
    body: "My Scorpio's clutch kit was overdue. Four other shops said two days. These people handed it to me in an hour. I tell every driver on this route.",
    bodyHi: "मेरी Scorpio का clutch kit चाहिए था। चार दुकानों ने दो दिन कहा। यहाँ एक घंटे में मिल गया। इस route पर सबको बताता हूँ।",
    name: "Arjun Singh",
    role: "Owner-driver",
    roleHi: "Owner-driver",
    place: "Jaunpur",
  },
  {
    body: "Reliable counter. Genuine brands. No duplicate stock. For our small fleet that is the whole game.",
    bodyHi: "भरोसेमंद counter। Genuine brands। Duplicate stock नहीं। हमारी छोटी fleet के लिए यही सबसे ज़रूरी है।",
    name: "Meena Devi",
    role: "Co-owner",
    roleHi: "Co-owner",
    place: "MD Logistics · Bhadohi",
  },
];

export function Testimonials() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const go = (d: number) => {
    setIndex((i) => (i + d + QUOTES.length) % QUOTES.length);
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 7000);
    }
  };

  const q = QUOTES[index];

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ ०६ · ग्राहकों की बात" : "§ 06 · Word of mouth"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            {isHindi ? "काउंटर की" : "What the"}
            <br />
            <span className="italic">{isHindi ? "असली बातें।" : "counter sees."}</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "Fleet operators, workshop owners और owner-drivers — eastern Uttar Pradesh के असली customers की बातें।"
              : "Fleet operators, workshop owners, owner-drivers. Real customers from across eastern Uttar Pradesh, in their own words."}
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]">
        {/* corner ticks */}
        <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[var(--ink)]/40" />
        <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[var(--ink)]/40" />
        <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[var(--ink)]/40" />
        <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[var(--ink)]/40" />

        <div className="p-8 md:p-14 min-h-[360px] md:min-h-[340px] flex flex-col justify-between gap-8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.22, 0.8, 0.22, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -top-8 -left-2 font-display text-[7rem] md:text-[10rem] leading-none text-[var(--amber)]/70 select-none"
              >
                &ldquo;
              </span>
              <p className="relative font-display text-2xl md:text-3xl lg:text-4xl leading-snug tracking-[-0.01em]">
                {isHindi ? q.bodyHi : q.body}
              </p>
              <div className="mt-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                <div className="flex gap-0.5 text-[var(--amber)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--amber)]" />
                  ))}
                </div>
                <div className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--ink)]/80">
                  <span className="font-medium text-[var(--ink)] not-italic">{q.name}</span>
                  <span className="text-[var(--ink)]/55"> &nbsp;·&nbsp; {isHindi ? q.roleHi : q.role}</span>
                  <span className="text-[var(--ink)]/55"> &nbsp;·&nbsp; {q.place}</span>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-4">
            {/* progress indicator */}
            <div className="flex items-center gap-2 flex-1">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-0.5 transition-all duration-500 ${
                    i === index
                      ? "bg-[var(--ink)] w-12"
                      : "bg-[var(--ink)]/20 hover:bg-[var(--ink)]/40 w-6"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous"
                onClick={() => go(-1)}
                className="w-11 h-11 rounded-full border border-[var(--ink)]/20 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                aria-label="Next"
                onClick={() => go(1)}
                className="w-11 h-11 rounded-full border border-[var(--ink)]/20 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
