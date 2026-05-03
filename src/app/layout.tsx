import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/Landing-page/loading-screen";
import { SiteProviders } from "@/components/providers/site-providers";
import { themeInitScript } from "@/components/providers/theme-provider";
import { WhatsAppButton } from "@/components/Landing-page/whatsapp-button";
import { SITE } from "@/lib/site";

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
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "truck spare parts",
    "4-wheeler parts",
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
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "en-IN": SITE.url,
      "hi-IN": SITE.url,
    },
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: SITE.districts.map((d) => ({ "@type": "City", name: d })),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        <SiteProviders>
          <LoadingScreen />
          {children}
          <WhatsAppButton />
        </SiteProviders>
      </body>
    </html>
  );
}
