import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Alok Automobiles</h3>
          <p className="text-sm text-muted-foreground">
            Genuine spare parts for trucks and 4-wheelers. Engine oils from leading brands.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Contact</h4>
          <ul className="text-sm space-y-1">
            <li>
              Phone:{" "}
              <Link className="hover:underline" href="tel:+91-9838397109">
                +91 98383 97109
              </Link>
            </li>
            <li>
              Email:{" "}
              <Link className="hover:underline" href="mailto:alokautomobailes@gmail.com">
                alokautomobailes@gmail.com
              </Link>
            </li>
            <li>Hours: Mon–Sat, 9am–7pm</li>
            <li>
              <Link className="hover:underline" href="https://share.google/ltxswOnIy6trlksDa" target="_blank" rel="noopener noreferrer">
                If you like us, please review here
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Address</h4>
          <address className="not-italic text-sm text-muted-foreground">
            Alok Automobiles
            <br />
            Kaneri Rd, opposite Singh Petrol Pump, Mohansarai
            <br />
            Varanasi, Uttar Pradesh 221002
          </address>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-xs text-muted-foreground flex items-center justify-between">
          <span>© {new Date().getFullYear()} Alok Automobiles</span>
          <span>All trademarks belong to their owners.</span>
        </div>
      </div>
    </footer>
  )
}
