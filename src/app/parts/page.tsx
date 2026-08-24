import type { Metadata } from "next";
import { FeaturedParts } from "@/components/Landing-page/featured-parts";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { SiteHeader } from "@/components/Landing-page/site-header";
import { getPublicInventoryPage } from "@/lib/public-inventory";
import { SITE } from "@/lib/site";

type PartsPageProps = {
  searchParams?: Promise<{
    search?: string | string[];
  }>;
};

export const revalidate = 300;

export async function generateMetadata({
  searchParams,
}: PartsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const search = getSearchValue(resolvedSearchParams?.search).trim();

  return {
    title: "Truck & Car Spare Parts Inventory in Varanasi",
    description:
      "Search Alok Automobiles' live truck and car spare-parts inventory in Varanasi by part name, brand, or part number. Most unavailable parts sourced in 7 days or less.",
    alternates: {
      canonical: `${SITE.url}/parts`,
    },
    robots: search
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

function getSearchValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function PartsPage({ searchParams }: PartsPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearch = getSearchValue(resolvedSearchParams?.search).slice(0, 80);
  const initialData = initialSearch
    ? undefined
    : await getPublicInventoryPage(1, 8).catch(() => undefined);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section
        aria-label="Parts inventory"
        className="relative bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="site-container py-12 md:py-16">
          <FeaturedParts initialSearch={initialSearch} initialData={initialData} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
