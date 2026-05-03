import { SiteHeader } from "@/components/Landing-page/site-header";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { Hero } from "@/components/Landing-page/hero";
import { BrandStrip } from "@/components/Landing-page/brand-strip";
import { CategoryCard } from "@/components/Landing-page/category-card";
import { ServiceHighlights } from "@/components/Landing-page/service-highlights";
import { ContactCTA } from "@/components/Landing-page/contact-cta";
import { PartFinder } from "@/components/Landing-page/part-finder";
import { Testimonials } from "@/components/Landing-page/testimonials";
import { WorkshopGallery } from "@/components/Landing-page/workshop-gallery";
import { ProcessTimeline } from "@/components/Landing-page/process-timeline";
import { VehiclesWall } from "@/components/Landing-page/vehicles-wall";
import { VisitMap } from "@/components/Landing-page/visit-map";
import { FeaturedParts } from "@/components/Landing-page/featured-parts";
import { FieldNotes } from "@/components/Landing-page/field-notes";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <Hero />

      {/* Part finder — high on the page for conversion */}
      <section aria-label="Find a part" className="relative">
        <div className="container mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-4">
          <PartFinder />
        </div>
      </section>

      {/* Brand ticker */}
      <section id="brands" aria-label="Partner brands" className="mt-16 md:mt-24">
        <BrandStrip />
      </section>

      {/* Inventory */}
      <section id="inventory" aria-label="Inventory" className="relative">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow text-[var(--amber-deep)] mb-4">§ 03 · Inventory</p>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.92] tracking-[-0.02em]">
                Three shelves.
                <br />
                <span className="italic">One counter.</span>
                <br />
                <span className="amber-mark">Everything you need.</span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pt-4">
              <p className="text-base text-[var(--foreground)]/80 leading-relaxed">
                A working man&apos;s catalogue. Browse by category or just call
                the counter — we&apos;ll walk you through it. Every part in
                stock and ready to move.
              </p>
              <div className="mt-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                <span>↳ Truck</span>
                <span>↳ Four-wheeler</span>
                <span>↳ Lubricants</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <CategoryCard
              index="01"
              title="Truck Spare Parts"
              tagline="Heavy-duty · Fleet-grade"
              description="Heavy-duty, OE-grade parts for all major Indian and European truck marques. Built to keep the long haul moving."
              imageSrc="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=900&h=700&fit=crop&crop=center&auto=format&q=80"
              items={["Suspension", "Braking", "Drivetrain", "Cabin", "Electricals", "Filters"]}
              ctaHref="#contact"
              ctaLabel="Enquire about truck parts"
            />
            <CategoryCard
              index="02"
              title="Four-Wheeler Parts"
              tagline="Passenger · Utility"
              description="Reliable components for passenger vehicles and utility 4×4s. From family cars to working SUVs."
              imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=700&fit=crop&crop=center&auto=format&q=80"
              items={["Filters", "Belts", "Clutch kits", "Brakes", "Suspension", "Cooling"]}
              ctaHref="#contact"
              ctaLabel="Enquire about car parts"
            />
            <CategoryCard
              index="03"
              title="Engine Oils & Lubes"
              tagline="Castrol · Valvoline · Shell"
              description="Lubricants and engine oils from trusted brands. Fully indexed by viscosity, grade and application."
              imageSrc="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&h=700&fit=crop&crop=center&auto=format&q=80"
              items={["15W-40", "20W-40", "Gear oil", "Greases", "Coolants", "Additives"]}
              ctaHref="#contact"
              ctaLabel="Enquire about lubricants"
            />
          </div>
        </div>
      </section>

      {/* Featured parts */}
      <section id="featured" aria-label="Featured inventory" className="relative bg-[var(--paper)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <FeaturedParts />
        </div>
      </section>

      {/* Workshop / Why us */}
      <section id="workshop" aria-label="Why choose us" className="relative">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <ServiceHighlights />
        </div>
      </section>

      {/* Process timeline */}
      <section aria-label="How we work" className="relative bg-[var(--paper)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <ProcessTimeline />
        </div>
      </section>

      {/* Testimonials */}
      <section aria-label="Testimonials" className="relative">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <Testimonials />
        </div>
      </section>

      {/* Vehicles served */}
      <section aria-label="Vehicles we serve" className="relative bg-[var(--paper)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <VehiclesWall />
        </div>
      </section>

      {/* Workshop gallery */}
      <section aria-label="Inside the workshop" className="relative">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <WorkshopGallery />
        </div>
      </section>

      {/* Field notes */}
      <section aria-label="Field notes" className="relative bg-[var(--paper)] border-y border-[var(--border)]">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <FieldNotes />
        </div>
      </section>

      {/* Visit / map */}
      <section id="visit" aria-label="Visit the shop" className="relative">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28">
          <VisitMap />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-label="Contact">
        <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <ContactCTA />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
