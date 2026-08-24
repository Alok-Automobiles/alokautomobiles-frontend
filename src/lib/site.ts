export const SITE = {
  name: "Alok Automobiles",
  tagline: "Truck & Car Spare Parts Shop in Varanasi",
  description:
    "Truck and car spare parts shop in Mohansarai, Varanasi. Search live inventory by product, brand, or part number. Most unavailable parts sourced within 7 days or less.",
  url: "https://www.alokautomobiles.com",
  phone: "+91 95552 13876",
  phoneHref: "tel:+919555213876",
  whatsapp: "919555213876",
  email: "alokautomobailes@gmail.com",
  address: {
    line1: "Kaneri Rd, opposite Singh Petrol Pump",
    line2: "Mohansarai, Varanasi",
    region: "Uttar Pradesh",
    postalCode: "221002",
    country: "IN",
    lat: 25.266,
    lng: 82.942,
  },
  hours: "Daily · 09:00 – 19:00",
  founded: "2005",
  serviceArea: "Varanasi and surrounding areas",
  serviceAreaHi: "वाराणसी और आसपास के क्षेत्र",
  social: {
    google: "https://share.google/ltxswOnIy6trlksDa",
  },
  sourcingPromise:
    "We can source most requested truck and car parts within 7 days or less.",
} as const;

export function whatsappURL(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapsURL() {
  const q = encodeURIComponent(
    `${SITE.name}, ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.region} ${SITE.address.postalCode}`
  );
  return `https://maps.google.com/?q=${q}`;
}

export function mapsEmbedURL() {
  const q = encodeURIComponent(
    `${SITE.name}, ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.region}`
  );
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
