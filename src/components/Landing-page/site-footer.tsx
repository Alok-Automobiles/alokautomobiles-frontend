import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
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

      {/* Districts served band */}
      <div className="relative border-b border-[var(--bone)]/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <span className="eyebrow text-[var(--bone)]/60">Districts we serve</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--bone)]/80">
            {SITE.districts.map((d, i) => (
              <span key={d} className="flex items-center gap-4">
                <span>{d}</span>
                {i < SITE.districts.length - 1 && (
                  <span className="text-[var(--amber)]/60">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="relative container mx-auto px-4 md:px-8 py-16 grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-[var(--bone)]/20 bg-[var(--paper)]">
              <Image src="/logo.png" alt={SITE.name} width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-xl">{SITE.name}</div>
              <div className="eyebrow text-[var(--bone)]/60">Since {SITE.founded}</div>
            </div>
          </div>

          <p className="mt-6 max-w-md text-sm md:text-base text-[var(--bone)]/70 leading-relaxed">
            {SITE.description}
          </p>

          <Link
            href={SITE.social.google}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-3 h-12 pl-5 pr-2 rounded-full border border-[var(--bone)]/20 text-sm hover:bg-[var(--amber)] hover:text-[var(--ink)] hover:border-[var(--amber)] transition-colors"
          >
            <Star className="h-4 w-4 fill-[var(--amber)] text-[var(--amber)] group-hover:fill-[var(--ink)] group-hover:text-[var(--ink)]" />
            <span>Leave us a review on Google</span>
            <span className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--amber)] text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--bone)] transition-colors">
              →
            </span>
          </Link>
        </div>

        <div className="col-span-6 md:col-span-2">
          <p className="eyebrow text-[var(--bone)]/50 mb-4">Shop</p>
          <ul className="space-y-3 text-sm">
            <FLink href="#inventory">Inventory</FLink>
            <FLink href="#brands">Partners</FLink>
            <FLink href="#workshop">Workshop</FLink>
            <FLink href="#contact">Contact</FLink>
            <FLink href="#part-finder">Part finder</FLink>
          </ul>
        </div>

        <div className="col-span-6 md:col-span-2">
          <p className="eyebrow text-[var(--bone)]/50 mb-4">Reach</p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href={SITE.phoneHref} className="flex items-center gap-2 hover:text-[var(--amber)] transition-colors">
                <Phone className="h-4 w-4" />
                {SITE.phone}
              </Link>
            </li>
            <li>
              <Link href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-[var(--amber)] transition-colors break-all">
                <Mail className="h-4 w-4 shrink-0" />
                <span className="break-all">{SITE.email}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-[var(--bone)]/50 mb-4">Visit</p>
          <address className="not-italic text-sm text-[var(--bone)]/80 leading-relaxed flex gap-3">
            <MapPin className="h-4 w-4 mt-1 text-[var(--amber)] shrink-0" />
            <span>
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.region} — {SITE.address.postalCode}
            </span>
          </address>
          <p className="mt-4 eyebrow text-[var(--bone)]/50">Hours</p>
          <p className="mt-2 font-mono text-xs text-[var(--bone)]/75">{SITE.hours}</p>
        </div>
      </div>

      <div className="relative border-t border-[var(--bone)]/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/50">
          <span>© {new Date().getFullYear()} {SITE.name} · All rights reserved</span>
          <span className="text-[var(--amber)]">◆ &nbsp;Made in Varanasi</span>
          <span>Trademarks belong to their respective owners</span>
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
