import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const anchors = [
    "",
    "#inventory",
    "#brands",
    "#workshop",
    "#contact",
    "#part-finder",
  ];
  return anchors.map((a) => ({
    url: `${SITE.url}/${a}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: a === "" ? 1 : 0.7,
  }));
}
