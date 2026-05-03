import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--bone)] flex flex-col">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.08]" />
      <div className="pointer-events-none absolute inset-0 grain" />
      <AmberGlow />

      {/* corner crosshairs */}
      <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-[var(--bone)]/30" />
      <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-[var(--bone)]/30" />
      <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-[var(--bone)]/30" />
      <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-[var(--bone)]/30" />

      {/* top strip */}
      <div className="relative z-10 px-6 md:px-10 pt-6 flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-[0.28em] text-[var(--bone)]/60">
        <span>Alok Automobiles · Error</span>
        <span className="text-[var(--amber)]">◆ &nbsp;Code: 404</span>
      </div>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-6 md:px-10 py-20 grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <p className="eyebrow text-[var(--amber)] mb-4">Breakdown</p>
            <h1 className="font-display font-light leading-[0.88] tracking-[-0.03em] text-[18vw] md:text-[13vw] lg:text-[11rem]">
              Four-oh<span className="text-[var(--amber)]">-</span>four.
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--bone)]/80 leading-relaxed">
              This part isn&apos;t on our shelf. Wrong model number, stripped
              thread, the catalogue doesn&apos;t know this one. Head back to
              the counter or ring the workshop.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 h-14 pl-2 pr-6 rounded-full bg-[var(--amber)] text-[var(--ink)] font-medium"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--bone)] group-hover:-rotate-12 transition-transform">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                Back to the shop
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-full border border-[var(--bone)]/30 hover:bg-[var(--bone)] hover:text-[var(--ink)] transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-mono text-sm">{SITE.phone}</span>
              </a>
            </div>
          </div>

          {/* Broken-down truck art */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <Image
                src="/truck.png"
                alt="Broken-down truck"
                width={600}
                height={400}
                className="relative z-10 w-full h-auto object-contain opacity-80 -rotate-3"
              />
              {/* oil puddle */}
              <div
                aria-hidden
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[70%] h-10 rounded-full blur-xl"
                style={{ background: "radial-gradient(ellipse, rgba(230,161,10,0.4) 0%, transparent 70%)" }}
              />
              {/* caution tape */}
              <div className="absolute -bottom-4 left-0 right-0 h-3 diesel-stripe rotate-1" />
            </div>

            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/60 flex items-center justify-center gap-3">
              <span>Status</span>
              <span className="text-[var(--amber)]">OFF THE ROAD</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function AmberGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-60"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--amber) 70%, transparent) 0%, transparent 60%)",
      }}
    />
  );
}
