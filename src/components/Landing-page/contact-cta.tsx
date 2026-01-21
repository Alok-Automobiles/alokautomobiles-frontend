"use client"

import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export function ContactCTA() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background/80 p-8 text-center shadow-sm backdrop-blur md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
          Need Parts Fast?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Talk directly to Alok Automobiles
        </h2>
        <p className="text-muted-foreground mb-6">
          Share your vehicle model and the parts you need. We&apos;ll confirm availability and pricing right away.
        </p>
        <Button asChild size="lg" className="gap-2">
          <a href="tel:+91-9838397109">
            <Phone className="h-5 w-5" />
            Call +91 98383 97109
          </a>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          Prefer email? alokautomobiles@gmail.com
        </p>
      </div>
    </div>
  )
}
