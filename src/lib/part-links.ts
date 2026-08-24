type PartLinkSource = {
  id: string;
  itemName: string;
  brand?: string;
};

export function slugifyPartName(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 88)
    .replace(/-+$/g, "");
}

export function getPartPath(part: PartLinkSource) {
  const name = [part.brand, part.itemName].filter(Boolean).join(" ");
  const slug = slugifyPartName(name) || "spare-part";

  return `/parts/${slug}-${part.id.toLowerCase()}`;
}

export function getPartIdFromSlug(slug: string) {
  const match = slug.toLowerCase().match(/(?:^|-)([a-f0-9]{24})$/);
  return match?.[1] ?? null;
}
