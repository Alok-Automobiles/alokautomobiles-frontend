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

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <Hero />

      {/* Part finder — high on the page for conversion */}
      <section aria-label="Find a part" className="relative">
        <div className="site-container pt-16 md:pt-24 pb-4">
          <PartFinder />
        </div>
      </section>

      {/* Brand ticker */}
      <section id="brands" aria-label="Partner brands" className="mt-16 md:mt-24">
        <BrandStrip />
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
