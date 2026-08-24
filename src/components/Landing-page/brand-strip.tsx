"use client";

import Link from "next/link";
import { useLang } from "@/components/providers/language-provider";

const FALLBACK_BRANDS = [
  "Castrol",
  "Timken",
  "TATA",
  "Valvoline",
  "Shell",
  "Compo",
  "Mahindra",
  "Leyland",
  "Eicher",
  "Fleetguard",
  "Lumax",
  "Gulf",
  "BOSCH",
  "ZF",
];

export function BrandStrip({ brands }: { brands: string[] }) {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const displayedBrands = brands.length ? brands : FALLBACK_BRANDS;

  return (
    <div className="relative bg-[var(--ink)] text-[var(--bone)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" />

      <div className="site-container pt-10 pb-4">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <p className="eyebrow text-[var(--amber)]">
              {isHindi ? "§ ०२ · ब्रांड्स" : "§ 02 · Partners"}
            </p>
            <h3 className="font-display text-3xl md:text-5xl leading-[0.95] mt-3">
              {isHindi ? "लाइव इन्वेंटरी के" : "Every brand in our"}
              <br />
              <span className="italic text-[var(--bone)]/80">
                {isHindi ? "सभी ब्रांड।" : "live inventory."}
              </span>
            </h3>
          </div>
          <p className="hidden md:block max-w-sm text-sm text-[var(--bone)]/70 pb-2">
            {isHindi
              ? "यह सूची लाइव इन्वेंटरी से अपने-आप बनती है। नया ब्रांड जोड़ने पर वह भी यहाँ दिखाई देगा।"
              : "This list is generated from live inventory. Add a new brand to a product and it will appear here automatically."}
          </p>
        </div>
      </div>

      {/* Marquee row 1 */}
      <MarqueeRow brands={displayedBrands} direction="left" duration="110s" />
      <div className="h-px bg-[var(--bone)]/10" />
      {/* Marquee row 2 — reverse */}
      <MarqueeRow
        brands={[...displayedBrands].reverse()}
        direction="right"
        duration="125s"
        dim
      />

      <div className="site-container pt-6">
        <details className="group border border-[var(--bone)]/15 bg-[var(--bone)]/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/75 transition-colors hover:text-[var(--amber)] [&::-webkit-details-marker]:hidden">
            <span>
              {isHindi
                ? `सभी ${displayedBrands.length} ब्रांड A–Z देखें`
                : `Browse all ${displayedBrands.length} brands A–Z`}
            </span>
            <span className="text-[var(--amber)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="grid grid-cols-2 border-t border-[var(--bone)]/15 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {displayedBrands.map((brand) => (
              <Link
                key={brand}
                href={`/parts?search=${encodeURIComponent(brand)}`}
                className="border-b border-r border-[var(--bone)]/10 px-4 py-3 text-xs text-[var(--bone)]/70 transition-colors hover:bg-[var(--amber)] hover:text-[var(--ink)]"
              >
                {brand}
              </Link>
            ))}
          </div>
        </details>
      </div>

      {/* bottom meta */}
      <div className="site-container py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/50">
        <span>
          {isHindi
            ? `${displayedBrands.length} ब्रांड लाइव इन्वेंटरी में`
            : `${displayedBrands.length} brands in live inventory`}
        </span>
        <span className="text-[var(--amber)]">◆</span>
        <span>Varanasi · UP · IND</span>
      </div>
    </div>
  );
}

function MarqueeRow({
  brands,
  direction,
  duration,
  dim = false,
}: {
  brands: string[];
  direction: "left" | "right";
  duration: string;
  dim?: boolean;
}) {
  const reel = [...brands, ...brands];
  return (
    <div className="overflow-hidden ticker-mask py-5">
      <div
        className={`flex items-center whitespace-nowrap ${dim ? "opacity-60" : ""}`}
        style={{
          ["--marquee-duration" as string]: duration,
          animation: `marquee var(--marquee-duration) linear infinite ${
            direction === "right" ? "reverse" : ""
          }`,
        }}
      >
        {reel.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="group flex items-center gap-8 shrink-0 pr-8"
          >
            <span className="font-display text-4xl md:text-6xl leading-none">
              {b}
            </span>
            <span aria-hidden className="text-[var(--amber)] text-2xl">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
