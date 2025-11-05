"use client"

import { LayoutGrid } from "@/components/ui/layout-grid"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Building2, Package, Star, CheckCircle2, Truck, Wrench } from "lucide-react"

export function ContactCTA() {
  const cards = [
    {
      id: 1,
      className: "col-span-1 md:col-span-2",
      thumbnail: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-muted-foreground mb-6">
            Get in touch with us for quick availability confirmation and pricing. We&apos;re here to help you find the right parts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <a href="tel:+91-9838397109" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call: +91 98383 97109
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:alokautomobiles@gmail.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Business Details</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Company</p>
                <p className="font-medium">Alok Automobiles</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">Truck & 4-Wheeler Parts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">+91 98383 97109</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">alokautomobiles@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Brands</p>
                <p className="font-medium">Castrol, Gulf, Valvoline…</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Hours</p>
                <p className="font-medium">Mon–Sat, 9am–7pm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium">
                  Kaneri Rd, opposite Singh Petrol Pump, Mohansarai, Varanasi, Uttar Pradesh 221002
                </p>
              </div>
            </div>
          </div>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="w-full mt-4"
          >
            <a
              href="https://maps.google.com/?cid=ltxswOnIy6trlksDa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Leave a Review
            </a>
          </Button>
        </div>
      ),
    },
    {
      id: 3,
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Quick Response</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Fast availability confirmation and quick processing. We understand your business can&apos;t wait.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Same-day availability checks
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Instant pricing information
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Quick order processing
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Wide Inventory</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Comprehensive coverage for trucks and 4-wheelers. From suspension to braking and lubrication — all in one place.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Heavy-duty truck parts
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              4-wheeler components
            </li>
            <li className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Engine oils & lubricants
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 5,
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-6 w-6" />
            <h3 className="text-2xl font-bold">Genuine Parts</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            OE-grade quality parts you can trust for performance and durability. Quality that lasts.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Original Equipment grade
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Quality guaranteed
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Performance tested
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 6,
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center&auto=format&q=80",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Star className="h-6 w-6" />
            <h3 className="text-2xl font-bold">20+ Years Experience</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Trusted by 1000+ customers. Decades of expertise in automotive parts supply.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              20+ years in business
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              1000+ happy customers
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Trusted expertise
            </li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Let&apos;s get you the right parts</h2>
        <p className="text-muted-foreground">
          Share your vehicle model and the parts you need. We&apos;ll confirm availability and pricing quickly.
        </p>
      </div>
      <LayoutGrid cards={cards} />
    </div>
  )
}
