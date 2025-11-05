import Image from "next/image"

export function ContactCTA() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div className="md:col-span-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-balance">Let’s get you the right parts</h2>
        <p className="mt-2 text-muted-foreground">
          Share your vehicle model and the parts you need. We’ll confirm availability and pricing quickly.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="tel:+91-9838397109"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
          >
            Call: +91 98383 97109
          </a>
          <a
            href="mailto:alokautomobailes@gmail.com"
            className="inline-flex items-center justify-center rounded-md bg-background text-foreground border border-border px-4 py-2 text-sm font-medium"
          >
            Email: alokautomobailes@gmail.com
          </a>
        </div>
      </div>
      <div className="space-y-4">
        <div className="aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop&crop=center&auto=format&q=80"
            alt="Professional automotive workshop"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium">Business Details</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Company</dt>
              <dd>Alok Automobiles</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Category</dt>
              <dd>Truck & 4-Wheeler Parts</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>+91 98383 97109</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>alokautomobailes@gmail.com</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Brands</dt>
              <dd>Castrol, Gulf, Valvoline…</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Hours</dt>
              <dd>Mon–Sat, 9am–7pm</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Address</dt>
              <dd>Kaneri Rd, opposite Singh Petrol Pump, Mohansarai, Varanasi, Uttar Pradesh 221002</dd>
            </div>
          </dl>
          <div className="mt-4">
            <a
              href="https://share.google/ltxswOnIy6trlksDa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary/10 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/20"
            >
              If you like us, please review here
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
