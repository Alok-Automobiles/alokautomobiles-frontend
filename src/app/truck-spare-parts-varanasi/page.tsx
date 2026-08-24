import type { Metadata } from "next";
import {
  LocalPartsLanding,
  type LocalPartsLandingConfig,
} from "@/components/seo/local-parts-landing";
import { getPublicInventoryBrands } from "@/lib/public-inventory";
import { SITE } from "@/lib/site";

const config: LocalPartsLandingConfig = {
  canonicalPath: "/truck-spare-parts-varanasi",
  eyebrow: "Truck parts · Varanasi · Since 2005",
  title: "Truck Spare Parts Shop in Varanasi",
  shortTitle: "Truck spare parts in Varanasi",
  intro:
    "Search genuine and OE-grade truck spare parts at Alok Automobiles in Mohansarai, Varanasi. We help fleet owners, workshops, and owner-drivers find the right part by vehicle, brand, and part number.",
  audience:
    "Our Kaneri Road counter supplies truck parts for daily repairs, preventive maintenance, and fleet requirements across Varanasi and nearby eastern Uttar Pradesh. Share the truck make, model, year, engine or chassis details, and the old-part photo when available.",
  vehicleExamples:
    "We handle compatibility enquiries for Tata Motors, Ashok Leyland, Eicher, BharatBenz, Mahindra, Volvo, MAN, Scania, Force, and other commercial vehicles used on Indian roads.",
  fitmentAdvice:
    "Truck variants can use different parts within the same model line, so we verify the printed part number, engine details, and physical match before supply.",
  parts: [
    { name: "Truck air filters", search: "truck air filter", description: "Air-cleaner and filtration searches by brand, model, or printed number." },
    { name: "Truck oil & fuel filters", search: "truck oil fuel filter", description: "Engine-oil and diesel filtration parts for commercial-vehicle service." },
    { name: "Brake parts", search: "truck brake", description: "Brake shoes, pads, drums, linings, and related service hardware." },
    { name: "Clutch parts", search: "truck clutch", description: "Clutch plates, pressure plates, release bearings, and kits." },
    { name: "Suspension & leaf springs", search: "leaf spring suspension", description: "Suspension parts selected for truck model and load application." },
    { name: "Bearings & drivetrain", search: "truck bearing drivetrain", description: "Wheel, hub, transmission, propeller-shaft, and drivetrain searches." },
  ],
  faqs: [
    { question: "How do I check whether a truck part is available?", answer: "Search the live inventory by part name, brand, or number, then call or WhatsApp us to reconfirm quantity, fitment, and current price before travelling." },
    { question: "Can you arrange a truck part that is out of stock?", answer: "Yes. We can source most requested truck parts within 7 days or less. Availability for rare or discontinued items is confirmed with the distributor before you order." },
    { question: "What details should I send for a correct match?", answer: "Send the truck make, full model, year, engine or chassis details, old-part number, preferred brand, quantity, and clear photos of the part and its label." },
    { question: "Which areas do you serve?", answer: "Our shop is in Mohansarai, Varanasi, and we handle enquiries from Varanasi and surrounding areas across eastern Uttar Pradesh." },
  ],
};

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Truck Spare Parts Shop in Varanasi",
  description:
    "Find truck spare parts in Varanasi at Alok Automobiles, Mohansarai. Search live stock by part, brand, or number; most unavailable items sourced within 7 days.",
  alternates: { canonical: `${SITE.url}${config.canonicalPath}` },
  openGraph: {
    type: "website",
    url: `${SITE.url}${config.canonicalPath}`,
    title: "Truck Spare Parts Shop in Varanasi · Alok Automobiles",
    description: config.intro,
  },
};

export default async function TruckSparePartsVaranasiPage() {
  const brands = await getPublicInventoryBrands().catch(() => []);
  return <LocalPartsLanding config={config} brands={brands} />;
}
