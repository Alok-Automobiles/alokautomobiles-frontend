import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { SiteHeader } from "@/components/Landing-page/site-header";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE, mapsURL, whatsappURL } from "@/lib/site";

export type LocalPartsLandingConfig = {
  canonicalPath: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  intro: string;
  audience: string;
  vehicleExamples: string;
  parts: Array<{ name: string; search: string; description: string }>;
  fitmentAdvice: string;
  faqs: Array<{ question: string; answer: string }>;
};

export function LocalPartsLanding({
  config,
  brands,
}: {
  config: LocalPartsLandingConfig;
  brands: string[];
}) {
  const url = `${SITE.url}${config.canonicalPath}`;
  const enquiryUrl = whatsappURL(
    `Hi ${SITE.name} — I am looking for ${config.shortTitle.toLowerCase()}. Vehicle details: `
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: config.title,
        description: config.intro,
        about: {
          "@type": "Thing",
          name: config.shortTitle,
        },
        provider: {
          "@id": `${SITE.url}/#store`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: config.shortTitle,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.06]" />
        <div className="site-container relative py-14 md:py-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted-foreground)]"
          >
            <Link href="/" className="hover:text-[var(--amber-deep)]">
              Home
            </Link>
            <span>/</span>
            <span aria-current="page">{config.shortTitle}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-[var(--amber-deep)]">{config.eyebrow}</p>
              <h1 className="mt-5 max-w-5xl font-display text-6xl leading-[0.9] tracking-[-0.04em] md:text-8xl">
                {config.title}
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-relaxed text-[var(--foreground)]/75 md:text-xl">
                {config.intro}
              </p>
            </div>

            <aside className="border-l-4 border-[var(--amber)] bg-[var(--paper)] p-6 text-[var(--ink)] lg:col-span-4">
              <p className="font-display text-2xl">Part unavailable today?</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/70">
                We can source most requested parts within 7 days or less. Send the vehicle and part number; we confirm the expected date before you order.
              </p>
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--amber-deep)]"
              >
                Ask on WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] text-[var(--ink)]">
        <div className="site-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-[var(--amber-deep)]">Local parts counter</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                A spare-parts shop in Mohansarai, serving Varanasi.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-lg leading-relaxed text-[var(--ink)]/75">{config.audience}</p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TrustItem icon={<ShieldCheck className="h-5 w-5" />} title="Genuine & OE-grade" text="Traceable stock from brands and distributors we trust." />
                <TrustItem icon={<CheckCircle2 className="h-5 w-5" />} title="Fitment checked" text="We cross-check the model and part number before confirming." />
                <TrustItem icon={<Clock3 className="h-5 w-5" />} title="Fast sourcing" text="Most unavailable requests arranged within 7 days or less." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)]">
        <div className="site-container py-16 md:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-[var(--amber-deep)]">Popular searches</p>
              <h2 className="mt-4 font-display text-4xl md:text-6xl">Find the part in live inventory.</h2>
            </div>
            <Link
              href="/parts"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-[var(--amber-deep)]"
            >
              Browse every part <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {config.parts.map((part) => (
              <Link
                key={part.name}
                href={`/parts?search=${encodeURIComponent(part.search)}`}
                className="group border border-[var(--border)] bg-[var(--card)] p-6 transition-colors hover:border-[var(--amber)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <Search className="h-5 w-5 text-[var(--amber-deep)]" />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <h3 className="mt-8 font-display text-3xl">{part.name}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{part.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] text-[var(--ink)]">
        <div className="site-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-[var(--amber-deep)]">Vehicles & brands</p>
              <h2 className="mt-4 font-display text-4xl md:text-6xl">Bring the number. We&apos;ll cross-reference it.</h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--ink)]/75">
                {config.vehicleExamples} {config.fitmentAdvice}
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <Link
                    key={brand}
                    href={`/parts?search=${encodeURIComponent(brand)}`}
                    className="border border-[var(--border)] bg-[var(--linen)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:border-[var(--ink)]"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-[var(--ink)]/60">
                Brand and vehicle names describe compatibility searches. Availability changes; call or WhatsApp for a confirmed match and current price.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)]">
        <div className="site-container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-[var(--amber-deep)]">Questions from the counter</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Before you visit or order.</h2>
            </div>
            <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] lg:col-span-7 lg:col-start-6">
              {config.faqs.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-display text-2xl">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--amber)] text-[var(--ink)]">
        <div className="site-container py-14 md:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="eyebrow text-[var(--ink)]/60">Kaneri Road · Mohansarai</p>
              <h2 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
                Need a part? Send the vehicle details.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ink)]/75">
                Visit the counter opposite Singh Petrol Pump or contact us first. We check live stock, fitment, current price, and sourcing time.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#128c7e] px-6 font-medium text-white hover:bg-[#0f7567]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp the counter
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 font-medium text-[var(--bone)]"
              >
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
              <a
                href={mapsURL()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 text-sm font-medium"
              >
                <MapPin className="h-4 w-4" /> Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function TrustItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-[var(--border)] pt-4">
      <div className="text-[var(--amber-deep)]">{icon}</div>
      <h3 className="mt-4 font-display text-xl">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/65">{text}</p>
    </div>
  );
}
