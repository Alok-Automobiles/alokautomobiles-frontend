"use client";

import { ShieldCheck, Boxes, Truck, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { useLang } from "@/components/providers/language-provider";

type Item = {
  n: string;
  title: string;
  titleHi: string;
  body: string;
  bodyHi: string;
  icon: ReactNode;
};

const ITEMS: Item[] = [
  {
    n: "01",
    title: "Genuine & OE-grade",
    titleHi: "असली और OE-grade",
    body: "Every part we stock is traceable. No greys, no counterfeits — only parts we'd install in our own trucks.",
    bodyHi: "हमारा हर पार्ट traceable है। नकली या grey stock नहीं — वही माल जो हम अपनी गाड़ी में लगाएँ।",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    n: "02",
    title: "Breadth of parts",
    titleHi: "बड़ा पार्ट्स स्टॉक",
    body: "From braking shoes to drivetrain, filtration to engine oils — one workshop, indexed shelves, walk-in ready.",
    bodyHi: "ब्रेक शू से drivetrain, filters से engine oils तक — indexed shelves, walk-in ready.",
    icon: <Boxes className="h-5 w-5" />,
  },
  {
    n: "03",
    title: "Fast fulfilment",
    titleHi: "तेज़ डिलीवरी",
    body: "Most orders despatched the same day, with local service across Varanasi and surrounding areas.",
    bodyHi: "अधिकतर ऑर्डर उसी दिन निकलते हैं। वाराणसी और आसपास के क्षेत्रों में स्थानीय सेवा उपलब्ध है।",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    n: "04",
    title: "Mechanic-led counsel",
    titleHi: "मिस्त्री वाली सलाह",
    body: "Twenty years on the floor means we know what fits what. Tell us the model — we'll recommend the part.",
    bodyHi: "बीस साल के अनुभव से हमें पता है क्या कहाँ फिट होगा। मॉडल बताइए — हम सही पार्ट बताएँगे।",
    icon: <Wrench className="h-5 w-5" />,
  },
];

export function ServiceHighlights() {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  return (
    <div className="relative">
      {/* header row */}
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ ०४ · भरोसा" : "§ 04 · Workshop"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--foreground)]">
            {isHindi ? "फ्लीट बार-बार" : "Why fleets keep"}
            <br />
            {isHindi ? "यहीं " : "coming "}
            <span className="italic amber-mark">{isHindi ? "आते हैं।" : "back."}</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7 pt-2">
          <p className="text-base leading-relaxed text-[var(--foreground)]/80 md:text-lg">
            {isHindi
              ? "हम सिर्फ फोन नंबर वाला catalogue नहीं हैं। हम काउंटर, workshop और दो दशक के रिश्तों से बनी सेवा हैं।"
              : "We aren't a catalogue with a phone number. We're a counter, a bay, and a thousand relationships tied together by two decades of service. Here's what that buys you."}
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
                {isHindi ? item.titleHi : item.title}
              </h3>
            </div>

            <p className="mt-auto text-sm leading-relaxed text-[var(--foreground)]/75 group-hover:text-[var(--ink)]/80">
              {isHindi ? item.bodyHi : item.body}
            </p>

            {/* amber underline reveal */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-[var(--amber)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </article>
        ))}
      </div>

      {/* footer meta */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
        <span>{isHindi ? "रोज़ खुला · सुबह 9–शाम 7" : "Open daily · 9am–7pm"}</span>
        <span className="text-[var(--amber-deep)]">
          ◆ &nbsp;{isHindi ? "काउंटर खुला · workshop live" : "Counter open · Workshop live"}
        </span>
        <span>Kaneri Road, Mohansarai</span>
      </div>
    </div>
  );
}
