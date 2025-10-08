"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Alok Automobiles home">
          <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=32&h=32&fit=crop&crop=center&auto=format&q=80"
              alt="Alok Automobiles logo"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold tracking-tight">Alok Automobiles</span>
            <span className="text-xs text-muted-foreground">Truck & 4-Wheeler Parts</span>
          </div>
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          <Link href="#categories" className="text-sm hover:underline underline-offset-4">
            Products
          </Link>
          <Link href="#brands" className="text-sm hover:underline underline-offset-4">
            Brands
          </Link>
          <Link href="#services" className="text-sm hover:underline underline-offset-4">
            Why Us
          </Link>
          <Link href="#contact" className="text-sm hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="#contact">Get Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
