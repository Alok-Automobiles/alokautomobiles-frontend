"use client";

const BRANDS = [
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

export function BrandStrip() {
  return (
    <div className="relative bg-[var(--ink)] text-[var(--bone)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grain opacity-50" />

      <div className="container mx-auto px-4 md:px-8 pt-10 pb-4">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <p className="eyebrow text-[var(--amber)]">§ 02 · Partners</p>
            <h3 className="font-display text-3xl md:text-5xl leading-[0.95] mt-3">
              Stocked by the names
              <br />
              <span className="italic text-[var(--bone)]/80">you already trust.</span>
            </h3>
          </div>
          <p className="hidden md:block max-w-sm text-sm text-[var(--bone)]/70 pb-2">
            Two decades of partnerships with OE and aftermarket makers.
            Every part indexed, catalogued, guaranteed.
          </p>
        </div>
      </div>

      {/* Marquee row 1 */}
      <MarqueeRow brands={BRANDS} direction="left" duration="42s" />
      <div className="h-px bg-[var(--bone)]/10" />
      {/* Marquee row 2 — reverse */}
      <MarqueeRow
        brands={[...BRANDS].reverse()}
        direction="right"
        duration="56s"
        dim
      />

      {/* bottom meta */}
      <div className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/50">
        <span>{BRANDS.length}+ brands indexed</span>
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
