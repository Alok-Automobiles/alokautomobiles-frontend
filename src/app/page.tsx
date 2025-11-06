import { SiteHeader } from "@/components/Landing-page/site-header"
import { SiteFooter } from "@/components/Landing-page/site-footer"
import { Hero } from "@/components/Landing-page/hero"
import { BrandStrip } from "@/components/Landing-page/brand-strip"
import { CategoryCard } from "@/components/Landing-page/category-card"
import { ServiceHighlights } from "@/components/Landing-page/service-highlights"
import { ContactCTA } from "@/components/Landing-page/contact-cta"

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <section id="brands" aria-label="Engine oil brands" className="border-t border-border">
        <div className="container mx-auto px-4 py-8 md:py-10">
          <BrandStrip />
        </div>
      </section>

      <section id="categories" aria-label="Product categories" className="border-t border-border bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance mb-8">Wide Range for Trucks & 4-Wheelers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              title="Truck Spare Parts"
              description="Heavy-duty and OE-grade parts for all major truck makes. Suspension, braking, drivetrain & more."
              imageSrc="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=640&h=360&fit=crop&crop=center&auto=format&q=80"
              ctaHref="#contact"
              ctaLabel="Enquire"
            />
            <CategoryCard
              title="4-Wheeler Parts"
              description="Reliable components for passenger vehicles. Filters, brakes, belts, clutch kits & more."
              imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=360&fit=crop&crop=center&auto=format&q=80"
              ctaHref="#contact"
              ctaLabel="Enquire"
            />
            <CategoryCard
              title="Engine Oils & Lubes"
              description="Engine oils and lubricants from trusted brands: Castrol, Gulf, Valvoline and more."
              imageSrc="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=640&h=360&fit=crop&crop=center&auto=format&q=80"
              ctaHref="#contact"
              ctaLabel="Enquire"
            />
          </div>
        </div>
      </section>

      <section id="services" aria-label="Why choose us" className="border-t border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <ServiceHighlights />
        </div>
      </section>

      <section
        id="contact"
        aria-label="Contact Alok Automobiles"
        className="border-t border-border bg-accent text-accent-foreground"
      >
        <div className="container mx-auto px-4 py-12 md:py-16">
          <ContactCTA />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

//test commit