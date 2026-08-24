import type { MetadataRoute } from "next";
import { getPublicInventorySitemapItems } from "@/lib/public-inventory";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/parts`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/truck-spare-parts-varanasi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE.url}/car-spare-parts-varanasi`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const products = await getPublicInventorySitemapItems().catch(() => []);

  return [
    ...routes,
    ...products.map((product) => ({
      url: `${SITE.url}${product.path}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
