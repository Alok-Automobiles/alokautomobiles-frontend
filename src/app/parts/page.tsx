import type { Metadata } from "next";
import { FeaturedParts } from "@/components/Landing-page/featured-parts";
import { SiteFooter } from "@/components/Landing-page/site-footer";
import { SiteHeader } from "@/components/Landing-page/site-header";
import { SITE } from "@/lib/site";

type PartsPageProps = {
  searchParams?: Promise<{
    search?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Parts catalogue",
  description: "Search live public parts at Alok Automobiles.",
  alternates: {
    canonical: `${SITE.url}/parts`,
  },
};

function getSearchValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function PartsPage({ searchParams }: PartsPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialSearch = getSearchValue(resolvedSearchParams?.search).slice(0, 80);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />

      <section
        aria-label="Parts inventory"
        className="relative bg-[var(--paper)] text-[var(--ink)]"
      >
        <div className="site-container py-12 md:py-16">
          <FeaturedParts initialSearch={initialSearch} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
