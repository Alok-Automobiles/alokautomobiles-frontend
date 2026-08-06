"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE, mapsURL, mapsEmbedURL } from "@/lib/site";

export function VisitMap() {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ १० · दुकान पर आइए" : "§ 10 · Pay us a visit"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            Kaneri Road,
            <br />
            <span className="italic">Mohansarai.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "Singh Petrol Pump के सामने हमारी दुकान है। काउंटर हफ्ते में छह दिन खुला रहता है। चाय के लिए भी आइए।"
              : "Look for the Singh Petrol Pump — we're right opposite. The counter is open six days a week. Stop by for a chai."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 md:gap-6">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 0.8, 0.22, 1] }}
          className="col-span-12 md:col-span-8 relative rounded-sm overflow-hidden border border-[var(--border)] bg-[var(--ink)]"
        >
          <div className="aspect-[4/3] md:aspect-[16/10]">
            <iframe
              src={mapsEmbedURL()}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${SITE.name}`}
              className="w-full h-full grayscale-[0.3] contrast-[1.05]"
            />
          </div>
          {/* overlay card */}
          <div className="absolute left-4 top-4 md:left-6 md:top-6 bg-[var(--ink)] text-[var(--bone)] p-4 rounded-sm max-w-[260px] shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--amber)] animate-pulse-amber" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--bone)]/70">
                {isHindi ? "अभी खुला · शाम 7 बजे तक" : "Open now · until 7pm"}
              </span>
            </div>
            <div className="mt-2 font-display text-lg leading-tight">
              {SITE.name}
            </div>
            <div className="mt-1 text-xs text-[var(--bone)]/70 leading-relaxed">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}, {SITE.address.postalCode}
            </div>
            <a
              href={mapsURL()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-[var(--amber)] hover:text-[var(--bone)]"
            >
              <Navigation className="w-3 h-3" />
              {isHindi ? "रास्ता देखें" : "Get directions"}
            </a>
          </div>
        </motion.div>

        {/* Details side */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <InfoCard icon={<MapPin className="w-4 h-4" />} label={isHindi ? "पता" : "Address"}>
            {SITE.address.line1}
            <br />
            {SITE.address.line2}
            <br />
            {SITE.address.region} — {SITE.address.postalCode}
          </InfoCard>

          <InfoCard icon={<Clock className="w-4 h-4" />} label={isHindi ? "समय" : "Hours"}>
            {isHindi ? "सोमवार – शनिवार" : "Monday – Saturday"}
            <br />
            09:00 – 19:00
            <br />
            <span className="text-[var(--muted-foreground)]">
              {isHindi ? "रविवार बंद" : "Sunday closed"}
            </span>
          </InfoCard>

          <InfoCard icon={<Phone className="w-4 h-4" />} label={isHindi ? "फ़ोन" : "Phone"}>
            <a href={SITE.phoneHref} className="link-edit inline-block font-mono">
              {SITE.phone}
            </a>
          </InfoCard>

          <a
            href={mapsURL()}
            target="_blank"
            rel="noreferrer"
            className="group relative mt-auto inline-flex items-center justify-between bg-[var(--ink)] text-[var(--bone)] px-5 py-4 rounded-sm overflow-hidden hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-colors"
          >
            <span className="font-display text-xl">{isHindi ? "Maps में खोलें" : "Open in Maps"}</span>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--amber)] text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
              <Navigation className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-5 bg-[var(--paper)] border border-[var(--border)] rounded-sm">
      <div className="flex items-center gap-2 mb-2 text-[var(--amber-deep)]">
        {icon}
        <span className="eyebrow">{label}</span>
      </div>
      <div className="text-sm text-[var(--ink)]/85 leading-relaxed">{children}</div>
    </div>
  );
}
