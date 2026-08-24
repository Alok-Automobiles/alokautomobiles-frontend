import type { Metadata } from "next";
import {
  LocalPartsLanding,
  type LocalPartsLandingConfig,
} from "@/components/seo/local-parts-landing";
import { getPublicInventoryBrands } from "@/lib/public-inventory";
import { SITE } from "@/lib/site";

const config: LocalPartsLandingConfig = {
  canonicalPath: "/car-spare-parts-varanasi",
  eyebrow: "Car parts · Varanasi · Multi-brand",
  title: "Car Spare Parts Shop in Varanasi",
  shortTitle: "Car spare parts in Varanasi",
  intro:
    "Find car and four-wheeler spare parts at Alok Automobiles in Mohansarai, Varanasi. Search live inventory, then contact the counter for an exact model, variant, and part-number match.",
  audience:
    "We help car owners, drivers, garages, and workshop teams find routine service parts and repair components without guessing the fitment. Tell us the registration model, year, fuel type, engine variant, and printed part number for the fastest answer.",
  vehicleExamples:
    "We answer parts enquiries for Maruti Suzuki, Tata, Mahindra, Hyundai, Kia, Toyota, Honda, Renault, Nissan, Skoda, Volkswagen, Force, and other four-wheelers.",
  fitmentAdvice:
    "A model name alone is not always enough: filters, clutch parts, brakes, belts, and electrical components may change by year, engine, and variant. We cross-check before confirming.",
  parts: [
    { name: "Car air filters", search: "car air filter", description: "Engine air-filter searches by vehicle, brand, and printed part number." },
    { name: "Oil & fuel filters", search: "car oil fuel filter", description: "Routine engine-service filters for petrol and diesel variants." },
    { name: "Brake pads & shoes", search: "car brake pads shoes", description: "Braking components matched to model year and variant." },
    { name: "Clutch kits", search: "car clutch kit", description: "Clutch disc, pressure plate, bearing, and complete kit enquiries." },
    { name: "Belts & tensioners", search: "car belt tensioner", description: "Drive belts, timing components, tensioners, and pulleys." },
    { name: "Bearings & suspension", search: "car bearing suspension", description: "Wheel bearings, hubs, steering, and suspension repair parts." },
  ],
  faqs: [
    { question: "Can I search for a specific car part online?", answer: "Yes. Search the live catalogue by part name, vehicle-related wording, brand, or part number. Contact us to confirm the exact variant match and current price." },
    { question: "What if the car part is currently unavailable?", answer: "We can source most requested car and four-wheeler parts within 7 days or less. We confirm the expected date and available brand options before you order." },
    { question: "What vehicle information should I provide?", answer: "Share the make, full model, year, fuel type, engine or variant, old-part number, quantity, and a clear photo of the label or old component." },
    { question: "Where is Alok Automobiles in Varanasi?", answer: "The shop is on Kaneri Road, opposite Singh Petrol Pump, Mohansarai, Varanasi. It is open daily from 9:00 am to 7:00 pm." },
  ],
};

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Car Spare Parts Shop in Varanasi",
  description:
    "Find car and four-wheeler spare parts in Varanasi at Alok Automobiles, Mohansarai. Search live stock; most unavailable parts sourced within 7 days.",
  alternates: { canonical: `${SITE.url}${config.canonicalPath}` },
  openGraph: {
    type: "website",
    url: `${SITE.url}${config.canonicalPath}`,
    title: "Car Spare Parts Shop in Varanasi · Alok Automobiles",
    description: config.intro,
  },
};

export default async function CarSparePartsVaranasiPage() {
  const brands = await getPublicInventoryBrands().catch(() => []);
  return <LocalPartsLanding config={config} brands={brands} />;
}
