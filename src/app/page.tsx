import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { SiteHeader } from "@/components/Landing-page/site-header";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { Hero } from "@/components/Landing-page/hero";
import { BrandStrip } from "@/components/Landing-page/brand-strip";
import { ServiceHighlights } from "@/components/Landing-page/service-highlights";
import { ContactCTA } from "@/components/Landing-page/contact-cta";
import { PartFinder } from "@/components/Landing-page/part-finder";
import { Testimonials } from "@/components/Landing-page/testimonials";
import { WorkshopGallery } from "@/components/Landing-page/workshop-gallery";
import { ProcessTimeline } from "@/components/Landing-page/process-timeline";
import { VehiclesWall } from "@/components/Landing-page/vehicles-wall";
import { VisitMap } from "@/components/Landing-page/visit-map";
import { FieldNotes } from "@/components/Landing-page/field-notes";
import { getPublicInventoryBrands } from "@/lib/public-inventory";

export const revalidate = 3600;

export default async function HomePage() {
  const brands = await getPublicInventoryBrands().catch(() => []);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <Hero />

      <section aria-labelledby="local-parts-heading" className="border-y border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]">
        <div className="site-container grid grid-cols-1 gap-8 py-12 md:grid-cols-12 md:items-center md:py-16">
          <div className="md:col-span-7">
            <p className="eyebrow text-[var(--amber-deep)]">Mohansarai · Varanasi · Open daily</p>
            <h2 id="local-parts-heading" className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Truck & car spare parts shop in Varanasi.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--ink)]/75 md:text-lg">
              Search our live inventory by product, brand, or part number. If an item is currently unavailable, we can source most requested parts within 7 days or less.
            </p>
          </div>
          <div className="grid gap-3 md:col-span-4 md:col-start-9">
            <Link href="/truck-spare-parts-varanasi" className="group flex items-center justify-between border border-[var(--border)] bg-[var(--linen)] p-4 font-medium hover:border-[var(--ink)]">
              <span>Truck spare parts</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <Link href="/car-spare-parts-varanasi" className="group flex items-center justify-between border border-[var(--border)] bg-[var(--linen)] p-4 font-medium hover:border-[var(--ink)]">
              <span>Car spare parts</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-2 px-1 text-xs text-[var(--ink)]/60">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Kaneri Road</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> 9am–7pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Part finder — high on the page for conversion */}
      <section aria-label="Find a part" className="relative">
        <div className="site-container pt-16 md:pt-24 pb-4">
          <PartFinder />
        </div>
      </section>

      {/* Brand ticker */}
      <section id="brands" aria-label="Partner brands" className="mt-16 md:mt-24">
        <BrandStrip brands={brands} />
      </section>

      {/* Workshop / Why us */}
      <section id="workshop" aria-label="Why choose us" className="relative">
        <div className="site-container py-20 md:py-28">
          <ServiceHighlights />
        </div>
      </section>

      {/* Process timeline */}
      <section
        aria-label="How we work"
        className="relative border-y border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="site-container py-20 md:py-28">
          <ProcessTimeline />
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Testimonials" className="relative">
        <div className="site-container py-20 md:py-28">
          <Testimonials />
        </div>
      </section>

      {/* Vehicles served */}
      <section
        aria-label="Vehicles we serve"
        className="relative border-y border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="site-container py-20 md:py-28">
          <VehiclesWall />
        </div>
      </section>

      {/* Workshop gallery */}
      <section aria-label="Inside the workshop" className="relative">
        <div className="site-container py-20 md:py-28">
          <WorkshopGallery />
        </div>
      </section>

      {/* Field notes */}
      <section
        aria-label="Field notes"
        className="relative border-y border-[var(--border)] bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="site-container py-20 md:py-28">
          <FieldNotes />
        </div>
      </section>

      {/* Visit / map */}
      <section id="visit" aria-label="Visit the shop" className="relative">
        <div className="site-container py-20 md:py-28">
          <VisitMap />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-label="Contact">
        <div className="site-container py-16 md:py-24">
          <ContactCTA />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
