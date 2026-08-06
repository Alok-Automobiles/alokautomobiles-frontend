"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, CheckCircle2, Receipt, Truck } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

const STEPS = [
  {
    n: "01",
  title: "Enquire",
    titleHi: "पूछताछ",
  body: "WhatsApp, ring the counter, or use the part-finder. Tell us the vehicle and the part — a photo helps.",
    bodyHi: "WhatsApp करें, कॉल करें या part-finder भरें। गाड़ी और पार्ट बताइए — फोटो मदद करती है।",
  icon: <MessageSquare className="h-5 w-5" />,
  time: "Under 5 min",
    timeHi: "5 मिनट से कम",
  },
  {
    n: "02",
    title: "We confirm stock",
    titleHi: "हम स्टॉक confirm करते हैं",
    body: "We check the shelf, confirm brand and price. If something's better for your vehicle, we'll tell you.",
    bodyHi: "हम shelf check करते हैं, brand और price बताते हैं। आपकी गाड़ी के लिए बेहतर विकल्प होगा तो वह भी बताएँगे।",
    icon: <CheckCircle2 className="h-5 w-5" />,
    time: "Same hour",
    timeHi: "उसी घंटे",
  },
  {
    n: "03",
    title: "Invoice",
    titleHi: "बिल",
    body: "Clean, itemised invoice. Pay on delivery, by UPI, bank transfer or cash at the counter.",
    bodyHi: "साफ itemised invoice। Delivery पर, UPI, bank transfer या cash से भुगतान करें।",
    icon: <Receipt className="h-5 w-5" />,
    time: "Your choice",
    timeHi: "आपकी सुविधा",
  },
  {
    n: "04",
    title: "Despatch",
    titleHi: "डिस्पैच",
    body: "Most orders leave the same day, with local service across Varanasi and surrounding areas.",
    bodyHi: "अधिकतर ऑर्डर उसी दिन निकलते हैं। वाराणसी और आसपास के क्षेत्रों में स्थानीय सेवा उपलब्ध है।",
    icon: <Truck className="h-5 w-5" />,
    time: "Same-day · Before 4pm",
    timeHi: "उसी दिन · 4pm से पहले",
  },
];

export function ProcessTimeline() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ ०८ · काम कैसे होता है" : "§ 08 · How we work"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
            {isHindi ? "पूछताछ से" : "From enquiry to"}
            <br />
            <span className="italic">{isHindi ? "डिस्पैच तक।" : "on-the-lorry."}</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "चार आसान कदम। दस-field वाले forms नहीं। तीन दिन का इंतज़ार नहीं। यही काउंटर का बीस साल का अनुभव है।"
              : "Four steps. No forms with ten fields. No three-day quotations. It's what twenty years on the counter teaches you."}
          </p>
        </div>
      </div>

      <div className="relative">
        {/* vertical line (mobile) */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-[var(--border)] md:hidden" />
        <motion.div
          className="absolute left-5 top-0 w-px bg-[var(--amber)] origin-top md:hidden"
          style={{ scaleY, height: "100%" }}
        />
        {/* horizontal line (desktop) */}
        <div className="hidden md:block absolute top-14 left-0 right-0 h-px bg-[var(--border)]" />
        <motion.div
          className="hidden md:block absolute top-14 left-0 h-px bg-[var(--amber)] origin-left"
          style={{ scaleX: scaleY, width: "100%" }}
        />

        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 0.8, 0.22, 1] }}
              className="relative pl-14 md:pl-0 md:pt-20"
            >
              {/* marker */}
              <span className="absolute left-0 top-0 md:left-0 md:top-0 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bone)] border-2 border-[var(--ink)] text-[var(--ink)]">
                {s.icon}
              </span>
              {/* index */}
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--amber-deep)] md:block">
                / {s.n} · {isHindi ? s.timeHi : s.time}
              </span>
              <h3 className="font-display mt-2 text-2xl tracking-tight text-[var(--ink)] md:text-3xl">
                {isHindi ? s.titleHi : s.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--ink)]/75 leading-relaxed max-w-xs">
                {isHindi ? s.bodyHi : s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
