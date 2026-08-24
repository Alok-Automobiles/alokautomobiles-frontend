import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  PackageSearch,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { SiteHeader } from "@/components/Landing-page/site-header";
import { serializeJsonLd } from "@/lib/json-ld";
import {
  getPublicInventoryItem,
  type PublicInventoryItem,
} from "@/lib/public-inventory";
import { SITE, mapsURL, whatsappURL } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

function getProductName(item: PublicInventoryItem) {
  if (!item.brand) return item.itemName;
  if (item.itemName.toLowerCase().startsWith(item.brand.toLowerCase())) {
    return item.itemName;
  }
  return `${item.brand} ${item.itemName}`;
}

function getProductDescription(item: PublicInventoryItem) {
  const productName = getProductName(item);
  const code = item.itemNumber || item.uniqueCode;
  const codeText = code ? `, part number ${code}` : "";

  if (item.availability === "in-stock") {
    return `${productName}${codeText} is listed in Alok Automobiles' live spare-parts inventory in Varanasi. Contact the counter to confirm price and vehicle fitment.`;
  }

  return `${productName}${codeText} is currently unavailable at Alok Automobiles in Varanasi. We can source most requested parts within 7 days or less.`;
}

function getProductImage(item: PublicInventoryItem) {
  return item.partImages.find((value) => {
    try {
      return new URL(value).hostname === "res.cloudinary.com";
    } catch {
      return false;
    }
  });
}

function buildProductEnquiry(item: PublicInventoryItem) {
  const code = item.itemNumber || item.uniqueCode;
  const codeText = code ? ` (part number: ${code})` : "";
  return `Hi ${SITE.name} — I need ${getProductName(item)}${codeText}. Please confirm the price, vehicle fitment, and ${
    item.availability === "in-stock"
      ? "current counter availability"
      : "whether it can be sourced within 7 days"
  }.`;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicInventoryItem(slug);

  if (!item) {
    return {
      title: "Spare part not found",
      robots: { index: false, follow: true },
    };
  }

  const productName = getProductName(item);
  const url = `${SITE.url}${item.path}`;
  const image = getProductImage(item);

  return {
    title: `${productName} in Varanasi`,
    description: getProductDescription(item),
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: `${productName} · ${item.availabilityLabel}`,
      description: getProductDescription(item),
      images: image ? [{ url: image, alt: productName }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${productName} · ${item.availabilityLabel}`,
      description: getProductDescription(item),
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const item = await getPublicInventoryItem(slug);

  if (!item) notFound();

  if (!item.path.endsWith(`/${slug}`)) {
    permanentRedirect(item.path);
  }

  const productName = getProductName(item);
  const image = getProductImage(item);
  const canonicalUrl = `${SITE.url}${item.path}`;
  const isInStock = item.availability === "in-stock";
  const enquiryUrl = whatsappURL(buildProductEnquiry(item));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: productName,
        url: canonicalUrl,
        description: item.description || getProductDescription(item),
        image: item.partImages.length ? item.partImages : undefined,
        sku: item.uniqueCode || item.itemNumber || undefined,
        mpn: item.itemNumber || undefined,
        brand: item.brand
          ? {
              "@type": "Brand",
              name: item.brand,
            }
          : undefined,
        category: "Automotive spare part",
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Current availability",
            value: item.availabilityLabel,
          },
          ...(!isInStock
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Typical sourcing time",
                  value: "Most requested parts within 7 days or less",
                },
              ]
            : []),
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Parts inventory",
            item: `${SITE.url}/parts`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: productName,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <SiteHeader />

      <article className="bg-[var(--paper)] text-[var(--ink)]">
        <div className="site-container py-10 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/55"
          >
            <Link href="/" className="hover:text-[var(--amber-deep)]">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/parts" className="hover:text-[var(--amber-deep)]">
              Parts
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-[var(--ink)]/80">
              {item.itemName}
            </span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--linen)]">
                {image ? (
                  <Image
                    src={image}
                    alt={`${productName} spare part`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-contain p-6"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
                    <PackageSearch className="h-16 w-16 text-[var(--amber-deep)]" />
                    <div>
                      <p className="font-display text-3xl">Part image on request</p>
                      <p className="mt-2 text-sm text-[var(--ink)]/65">
                        Send the part number or vehicle details on WhatsApp and we will verify the exact item.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[var(--ink)]/55">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--amber-deep)]" />
                Always confirm the part number and vehicle fitment before purchase. Product images may be representative.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[var(--linen)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {item.brand || "Automotive spare part"}
                </span>
                <span
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${
                    isInStock
                      ? "bg-[var(--amber)] text-[var(--ink)]"
                      : "border border-[var(--border)] text-[var(--ink)]/65"
                  }`}
                >
                  {item.availabilityLabel}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.95] tracking-[-0.03em] md:text-7xl">
                {productName}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--ink)]/75 md:text-lg">
                {item.description || getProductDescription(item)}
              </p>

              <div
                className={`mt-8 border-l-4 p-5 ${
                  isInStock
                    ? "border-[var(--amber)] bg-[var(--linen)]"
                    : "border-[var(--amber-deep)] bg-[var(--linen)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isInStock ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--amber-deep)]" />
                  ) : (
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--amber-deep)]" />
                  )}
                  <div>
                    <h2 className="font-display text-2xl">
                      {isInStock ? "Listed in live inventory" : "Need this part? We can source it."}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--ink)]/70">
                      {isInStock
                        ? "Call or WhatsApp before visiting so we can reconfirm quantity, price, and the correct fitment for your vehicle."
                        : "This item is not on the shelf right now. We can source most requested truck and car parts within 7 days or less and will confirm the expected date before you order."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#128c7e] px-6 font-medium text-white transition-colors hover:bg-[#0f7567]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Check price & fitment
                </a>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[var(--ink)] px-6 font-medium transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 border-t border-[var(--border)] pt-10 md:grid-cols-3">
            <section className="md:col-span-2">
              <p className="eyebrow text-[var(--amber-deep)]">Product details</p>
              <h2 className="mt-3 font-display text-4xl">Identify the correct part.</h2>
              <dl className="mt-7 grid grid-cols-1 border-y border-[var(--border)] sm:grid-cols-2">
                <Detail label="Part name" value={item.itemName} />
                <Detail label="Brand" value={item.brand || "Confirm with counter"} />
                <Detail label="Part number" value={item.itemNumber || "Ask the counter"} />
                <Detail label="Inventory code" value={item.uniqueCode || "Not listed"} />
                <Detail label="Unit" value={item.unitOfMeasure} />
                <Detail label="Location" value="Mohansarai, Varanasi" />
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-[var(--ink)]/65">
                For the quickest match, share the vehicle make, model, year, engine or chassis details, and a clear photo of the old part. We will cross-check the number before confirming.
              </p>
            </section>

            <aside className="rounded-sm bg-[var(--ink)] p-7 text-[var(--bone)]">
              <p className="eyebrow text-[var(--amber)]">Alok Automobiles</p>
              <h2 className="mt-3 font-display text-3xl">Truck & car spare parts in Varanasi</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--bone)]/70">
                Visit our counter opposite Singh Petrol Pump on Kaneri Road, Mohansarai. We serve Varanasi and surrounding areas daily.
              </p>
              <a
                href={mapsURL()}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--amber)] hover:text-[var(--bone)]"
              >
                <MapPin className="h-4 w-4" /> Get directions
              </a>
              <div className="mt-7 border-t border-[var(--bone)]/15 pt-6 text-sm">
                <Link href="/truck-spare-parts-varanasi" className="block hover:text-[var(--amber)]">
                  Truck spare parts in Varanasi →
                </Link>
                <Link href="/car-spare-parts-varanasi" className="mt-3 block hover:text-[var(--amber)]">
                  Car spare parts in Varanasi →
                </Link>
              </div>
            </aside>
          </div>

          <Link
            href="/parts"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--amber-deep)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all parts
          </Link>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-[var(--border)] py-4 sm:odd:border-r sm:odd:pr-5 sm:even:pl-5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink)]/50">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{value}</dd>
    </div>
  );
}
