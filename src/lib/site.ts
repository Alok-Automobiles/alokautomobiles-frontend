export const SITE = {
  name: "Alok Automobiles",
  tagline: "Truck & 4-Wheeler Parts · Since 2005",
  description:
    "A twenty-year-old house of spare parts in Varanasi. Engine oils, braking, drivetrain, filtration and more — for trucks and 4-wheelers. Genuine stock, ready to ship.",
  url: "https://alokautomobiles.com",
  phone: "+91 98383 97109",
  phoneHref: "tel:+919838397109",
  whatsapp: "919838397109",
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
  hours: "Mon–Sat · 09:00 – 19:00",
  founded: "2005",
  districts: [
    "Varanasi",
    "Chandauli",
    "Mirzapur",
    "Jaunpur",
    "Bhadohi",
    "Ghazipur",
    "Azamgarh",
    "Prayagraj",
    "Sonbhadra",
  ],
  social: {
    google: "https://share.google/ltxswOnIy6trlksDa",
  },
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
