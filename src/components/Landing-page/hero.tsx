"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/components/providers/language-provider";
import { SITE } from "@/lib/site";

export function Hero() {
  const { t } = useLang();

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-0 grain" />
      <AmberGlow />

      {/* Top technical strip */}
      <div className="relative border-b border-[var(--border)]/80">
        <div className="container mx-auto px-4 md:px-8 h-10 flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
          <span>Dossier · 01 / Landing</span>
          <div className="hidden md:flex items-center gap-6">
            <Meta label="LAT" value="25.28°N" />
            <Meta label="LON" value="82.99°E" />
            <Meta label="Est." value={SITE.founded} />
          </div>
          <span className="text-[var(--amber-deep)]">◆ &nbsp;Varanasi · UP</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-14 md:pt-20 pb-24 md:pb-32">
        <div className="grid grid-cols-12 gap-y-10 gap-x-4 md:gap-x-5 lg:gap-x-6 items-start">
          {/* LEFT */}
          <div className="col-span-12 lg:col-span-7 relative">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-6 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[var(--foreground)]" />
              {t("hero.eyebrow")}
            </motion.p>

            <h1 className="font-display font-light leading-[0.88] tracking-[-0.03em] text-[14vw] md:text-[11vw] lg:text-[9rem] xl:text-[10.5rem]">
              <Stagger delay={0}>{t("hero.l1")}</Stagger>
              <span className="block">
                <span className="relative inline-block">
                  <Stagger delay={0.15} italic>
                    {t("hero.l2")}
                  </Stagger>
                  <motion.svg
                    aria-hidden
                    viewBox="0 0 400 24"
                    className="absolute left-0 -bottom-3 w-full text-[var(--amber)]"
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.9, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M2 14 C 100 2, 200 22, 398 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </span>
              <Stagger delay={0.3}>
                {t("hero.l3").replace(/[.।]$/, "")}
                <span className="text-[var(--amber)]">.</span>
              </Stagger>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="mt-10 max-w-xl text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="#inventory"
                className="group inline-flex items-center gap-3 h-14 pl-6 pr-2 rounded-full bg-[var(--foreground)] text-[var(--background)] font-medium tracking-tight hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-colors"
              >
                <span>{t("cta.explore")}</span>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--amber)] text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <a
                href={SITE.phoneHref}
                className="group inline-flex items-center gap-3 h-14 px-6 rounded-full border border-[var(--foreground)] text-[var(--foreground)] font-medium tracking-tight hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-mono text-sm tracking-wider">{SITE.phone}</span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl"
            >
              <Stat value="20+" label={t("stat.years")} />
              <Stat value="1,200+" label={t("stat.fleets")} />
              <Stat value="40+" label={t("stat.brands")} />
              <Stat value="9" label="Districts served" />
            </motion.div>
          </div>

          {/* RIGHT — truck panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 0.8, 0.22, 1] }}
            className="col-span-12 lg:col-span-5 relative min-w-0"
          >
            <TruckPanel />
          </motion.div>
        </div>

        {/* Ticker */}
        <div className="mt-16 md:mt-24 border-y border-[var(--foreground)]/15 py-4 overflow-hidden ticker-mask">
          <div
            className="flex whitespace-nowrap font-display text-3xl md:text-5xl italic"
            style={{
              ["--ticker-duration" as string]: "42s",
              animation: "ticker var(--ticker-duration) linear infinite",
            }}
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex shrink-0 items-center gap-10 pr-10">
                {[
                  "Truck parts",
                  "Engine oils",
                  "Braking",
                  "Drivetrain",
                  "Filtration",
                  "Lubricants",
                  "Four-wheelers",
                  "Suspension",
                ].map((w) => (
                  <span key={w} className="flex items-center gap-10">
                    <span>{w}</span>
                    <span aria-hidden className="text-[var(--amber)] not-italic">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stagger({ children, delay = 0, italic }: { children: React.ReactNode; delay?: number; italic?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.85, ease: [0.22, 0.8, 0.22, 1] }}
      className={`block ${italic ? "italic" : ""}`}
    >
      {children}
    </motion.span>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-[var(--muted-foreground)]/70">{label}</span>
      <span className="text-[var(--foreground)]">{value}</span>
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[var(--foreground)]/20 pt-3">
      <span className="font-display text-3xl md:text-4xl leading-none">{value}</span>
      <span className="eyebrow">{label}</span>
    </div>
  );
}

function AmberGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 -right-20 md:top-10 md:right-10 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-60"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--amber) 70%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}

function TruckPanel() {
  return (
    <div className="relative aspect-[4/5] md:aspect-[5/6] rounded-sm overflow-hidden bg-[var(--ink)] text-[var(--bone)]">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(239,231,210,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,231,210,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[85%] aspect-square">
          <div
            className="absolute inset-0 rounded-full border border-[var(--bone)]/15 animate-orbit"
            style={{ animationDuration: "60s" }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[var(--amber)]" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-1 w-1 rounded-full bg-[var(--bone)]" />
          </div>
          <div
            className="absolute inset-6 rounded-full border border-dashed border-[var(--bone)]/10 animate-orbit"
            style={{ animationDuration: "80s", animationDirection: "reverse" }}
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative w-[96%]">
          <Image
            src="/truck.png"
            alt="Heavy-duty truck"
            width={900}
            height={600}
            priority
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(230,161,10,0.25)]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-[70%] h-8 rounded-full blur-2xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse, color-mix(in oklab, var(--amber) 60%, transparent) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/70">
        <div>
          <div>Spec · 01</div>
          <div className="text-[var(--amber)] mt-1">Fleet-grade</div>
        </div>
        <div className="text-right">
          <div>Inventory ready</div>
          <div className="text-[var(--amber)] mt-1">Ships same day</div>
        </div>
      </div>

      <Tick position="tl" />
      <Tick position="tr" />
      <Tick position="bl" />
      <Tick position="br" />
    </div>
  );
}

function Tick({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const pos: Record<typeof position, string> = {
    tl: "top-3 left-3 border-t border-l",
    tr: "top-3 right-3 border-t border-r",
    bl: "bottom-3 left-3 border-b border-l",
    br: "bottom-3 right-3 border-b border-r",
  };
  return <span className={`absolute ${pos[position]} w-4 h-4 border-[var(--amber)]/60`} />;
}
