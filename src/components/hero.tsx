import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Trusted Automotive Parts Supplier</p>
          <h1 className="text-3xl md:text-5xl font-semibold text-balance">Alok Automobiles</h1>
          <p className="mt-4 text-pretty text-muted-foreground">
            Truck & 4‑wheeler spare parts, plus engine oils from Castrol, Gulf, Valvoline and more. Genuine quality.
            Wide range. Ready to ship.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="#categories">Browse Parts</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:opacity-90">
              <Link href="#contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
        <div className="aspect-[4/3] md:aspect-[5/4] rounded-lg border border-border overflow-hidden">
          <Image
            src="/truck.png"
            alt="Industrial workshop with truck maintenance and parts"
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
