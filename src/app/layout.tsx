import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteProviders } from "@/components/providers/site-providers";
import { themeInitScript } from "@/components/providers/theme-provider";
import { WhatsAppButton } from "@/components/Landing-page/whatsapp-button";
import { serializeJsonLd } from "@/lib/json-ld";
import { SITE, mapsURL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.tagline} | ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "truck spare parts",
    "truck spare parts shop in Varanasi",
    "car spare parts",
    "car spare parts shop in Varanasi",
    "4-wheeler spare parts",
    "engine oil",
    "Castrol",
    "Valvoline",
    "Shell",
    "Varanasi",
    "Uttar Pradesh",
    "spare parts shop",
    "diesel engine oil",
    "Fleetguard",
    "Timken",
    "TATA parts",
    "Eicher parts",
    "Ashok Leyland",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: SITE.url,
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.tagline} | ${SITE.name}`,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#efe7d2" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b08" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": `${SITE.url}/#store`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}/logo.png`,
    priceRange: "₹₹",
    foundingDate: SITE.founded,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Varanasi",
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.lat,
      longitude: SITE.address.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: { "@type": "AdministrativeArea", name: SITE.serviceArea },
    hasMap: mapsURL(),
    knowsAbout: [
      "Truck spare parts",
      "Car spare parts",
      "Commercial vehicle parts",
      "Engine oil",
      "Automotive filters",
      "Braking parts",
      "Drivetrain parts",
      "Suspension parts",
    ],
    sameAs: [SITE.social.google],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // ensures the right theme class is applied before hydration, so
          // dark mode doesn't flash light first.
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        <SiteProviders>
          {children}
          <WhatsAppButton />
        </SiteProviders>
      </body>
    </html>
  );
}
