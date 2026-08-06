"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  return (
    <footer className="relative bg-[var(--ink)] text-[var(--bone)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />

      {/* Huge wordmark marquee */}
      <div className="relative border-b border-[var(--bone)]/10 overflow-hidden ticker-mask">
        <div
          className="flex whitespace-nowrap py-10 md:py-14"
          style={{
            ["--marquee-duration" as string]: "60s",
            animation: "marquee var(--marquee-duration) linear infinite",
          }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 shrink-0 pr-12 font-display text-[16vw] md:text-[11vw] leading-none tracking-[-0.04em]"
            >
              <span>Alok</span>
              <span className="text-[var(--amber)] italic">Automobiles</span>
              <span className="text-[var(--bone)]/20">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Service area band */}
      <div className="relative border-b border-[var(--bone)]/10">
        <div className="site-container py-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="eyebrow text-[var(--bone)]/60">
            {isHindi ? "सेवा क्षेत्र" : "Service area"}
          </span>
          <p className="text-sm text-[var(--bone)]/80">
            {isHindi ? SITE.serviceAreaHi : SITE.serviceArea}
          </p>
        </div>
      </div>

      {/* Columns */}
      <div className="site-container relative py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_minmax(7rem,1.5fr)_minmax(14rem,2.5fr)_minmax(15rem,3fr)] gap-x-6 gap-y-12 lg:gap-x-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-[var(--bone)]/20 bg-[var(--paper)]">
              <Image src="/logo.png" alt={SITE.name} width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-xl">{SITE.name}</div>
              <div className="eyebrow text-[var(--bone)]/60">
                {isHindi ? `${SITE.founded} से` : `Since ${SITE.founded}`}
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-md text-sm md:text-base text-[var(--bone)]/70 leading-relaxed">
            {isHindi
              ? "वाराणसी की पुरानी spare parts दुकान। ट्रक, 4-wheeler, engine oil, braking, drivetrain, filtration और रोज़मर्रा के ज़रूरी parts — genuine stock और सीधे counter की सलाह।"
              : SITE.description}
          </p>

          <Link
            href={SITE.social.google}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 h-12 pl-5 pr-2 rounded-full border border-[var(--bone)]/20 text-sm hover:bg-[var(--amber)] hover:text-[var(--ink)] hover:border-[var(--amber)] transition-colors"
          >
            <Star className="h-4 w-4 fill-[var(--amber)] text-[var(--amber)] group-hover:fill-[var(--ink)] group-hover:text-[var(--ink)]" />
            <span>{isHindi ? "Google पर review दें" : "Leave us a review on Google"}</span>
            <span className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--amber)] text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
              →
            </span>
          </Link>
        </div>

        <div>
          <p className="eyebrow text-[var(--bone)]/50 mb-4">{isHindi ? "दुकान" : "Shop"}</p>
          <ul className="space-y-3 text-sm">
            <FLink href="/parts">{isHindi ? "पार्ट्स" : "Parts"}</FLink>
            <FLink href="/#brands">{isHindi ? "ब्रांड्स" : "Partners"}</FLink>
            <FLink href="/#workshop">{isHindi ? "दुकान" : "Workshop"}</FLink>
            <FLink href="/#contact">{isHindi ? "संपर्क" : "Contact"}</FLink>
            <FLink href="/#part-finder">{isHindi ? "Part finder" : "Part finder"}</FLink>
          </ul>
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-[var(--bone)]/50 mb-4">{isHindi ? "संपर्क" : "Reach"}</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href={SITE.phoneHref} className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-3 hover:text-[var(--amber)] transition-colors">
                <Phone className="mt-0.5 h-4 w-4" />
                <span className="whitespace-nowrap">{SITE.phone}</span>
              </Link>
            </li>
            <li>
              <Link href={`mailto:${SITE.email}`} className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-3 hover:text-[var(--amber)] transition-colors">
                <Mail className="mt-0.5 h-4 w-4" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{SITE.email}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-[var(--bone)]/50 mb-4">{isHindi ? "पता" : "Visit"}</p>
          <address className="not-italic text-sm text-[var(--bone)]/80 leading-relaxed grid grid-cols-[1rem_minmax(0,1fr)] gap-3">
            <MapPin className="h-4 w-4 mt-1 text-[var(--amber)] shrink-0" />
            <span>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.region} — {SITE.address.postalCode}
            </span>
          </address>
          <div className="mt-4 pl-7">
            <p className="eyebrow text-[var(--bone)]/50">{isHindi ? "समय" : "Hours"}</p>
            <p className="mt-2 font-mono text-xs text-[var(--bone)]/75">{SITE.hours}</p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--bone)]/10">
        <div className="site-container py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/50">
          <span>© {new Date().getFullYear()} {SITE.name} · {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}</span>
          <span className="text-[var(--amber)]">◆ &nbsp;{isHindi ? "वाराणसी में बनाया गया" : "Made in Varanasi"}</span>
          <span>{isHindi ? "Trademarks उनके owners के हैं" : "Trademarks belong to their respective owners"}</span>
        </div>
      </div>
    </footer>
  );
}

function FLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="link-edit inline-block text-[var(--bone)]/80 hover:text-[var(--bone)]"
      >
        {children}
      </Link>
    </li>
  );
}
