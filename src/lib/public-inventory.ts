import { cache } from "react";
import { ObjectId, type Document, type WithId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { getPartIdFromSlug, getPartPath } from "@/lib/part-links";

export type PublicInventoryAvailability = "in-stock" | "out-of-stock";

export type PublicInventoryItem = {
  id: string;
  path: string;
  itemName: string;
  itemNumber: string;
  uniqueCode: string;
  brand: string;
  description: string;
  availability: PublicInventoryAvailability;
  availabilityLabel: string;
  unitOfMeasure: string;
  partImages: string[];
  updatedAt: string | null;
};

export type PublicInventoryPage = {
  items: PublicInventoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  search: {
    query: string;
    fuzzy: boolean;
  };
};

type InventoryDocument = Document & {
  itemName?: unknown;
  itemNumber?: unknown;
  uniqueCode?: unknown;
  quantity?: unknown;
  unitOfMeasure?: unknown;
  partImages?: unknown;
  brand?: unknown;
  description?: unknown;
  updatedAt?: unknown;
  createdAt?: unknown;
};

const PUBLIC_PROJECTION = {
  itemName: 1,
  itemNumber: 1,
  uniqueCode: 1,
  quantity: 1,
  unitOfMeasure: 1,
  partImages: 1,
  brand: 1,
  description: 1,
  updatedAt: 1,
  createdAt: 1,
} as const;

const BRAND_ALIASES: Record<string, string> = {
  "E OFIC": "ELOFIC",
  EOFIC: "ELOFIC",
  EXCEDY: "EXEDY",
  "G S": "GS",
  HUNDAI: "HYUNDAI",
  LEYAPARTS: "LEYPARTS",
  LEYLPARTS: "LEYPARTS",
  TALBORS: "TALBROS",
};

function getInventoryOwnerUserId() {
  return process.env.INVENTORY_OWNER_USER_ID?.trim() || null;
}

function asCleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function asSafeNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return null;
}

function asImageList(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => {
      if (typeof item !== "string") return false;
      return item.startsWith("https://") || item.startsWith("http://");
    })
    .slice(0, 4);
}

function asIsoDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }

  return null;
}

function normalizeBrandLabel(value: unknown) {
  if (typeof value !== "string") return null;

  const display = value
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[’']+$/g, "")
    .toUpperCase();

  if (!display) return null;

  const aliasKey = display
    .replace(/[^A-Z0-9+]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

  return BRAND_ALIASES[aliasKey] || display;
}

function serializePublicInventoryItem(
  item: WithId<InventoryDocument>
): PublicInventoryItem {
  const quantity = asSafeNumber(item.quantity) ?? 0;
  const availability: PublicInventoryAvailability =
    quantity > 0 ? "in-stock" : "out-of-stock";
  const itemName = asCleanText(item.itemName, "Unnamed spare part");
  const brand = asCleanText(item.brand);
  const id = item._id.toString();

  return {
    id,
    path: getPartPath({ id, itemName, brand }),
    itemName,
    itemNumber: asCleanText(item.itemNumber),
    uniqueCode: asCleanText(item.uniqueCode),
    brand,
    description: asCleanText(item.description),
    availability,
    availabilityLabel:
      availability === "in-stock" ? "In stock" : "Currently unavailable",
    unitOfMeasure: asCleanText(item.unitOfMeasure, "pcs"),
    partImages: asImageList(item.partImages),
    updatedAt: asIsoDate(item.updatedAt) || asIsoDate(item.createdAt),
  };
}

export async function getPublicInventoryPage(
  page = 1,
  limit = 8
): Promise<PublicInventoryPage> {
  const ownerUserId = getInventoryOwnerUserId();
  const safePage = Math.max(Math.floor(page), 1);
  const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 24);

  if (!ownerUserId) {
    return {
      items: [],
      pagination: {
        page: safePage,
        limit: safeLimit,
        total: 0,
        totalPages: 1,
      },
      search: { query: "", fuzzy: false },
    };
  }

  const db = await getMongoDb();
  const inventory = db.collection<InventoryDocument>("inventory");
  const query = { userId: ownerUserId };
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    inventory
      .find(query, { projection: PUBLIC_PROJECTION })
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .toArray(),
    inventory.countDocuments(query),
  ]);

  return {
    items: items.map(serializePublicInventoryItem),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.max(Math.ceil(total / safeLimit), 1),
    },
    search: { query: "", fuzzy: false },
  };
}

const getPublicInventoryItemById = cache(async (id: string) => {
  const ownerUserId = getInventoryOwnerUserId();

  if (!ownerUserId || !ObjectId.isValid(id)) return null;

  const db = await getMongoDb();
  const item = await db.collection<InventoryDocument>("inventory").findOne(
    {
      _id: new ObjectId(id),
      userId: ownerUserId,
    },
    { projection: PUBLIC_PROJECTION }
  );

  return item ? serializePublicInventoryItem(item) : null;
});

export async function getPublicInventoryItem(slug: string) {
  const id = getPartIdFromSlug(slug);
  if (!id) return null;
  return getPublicInventoryItemById(id);
}

export async function getPublicInventorySitemapItems() {
  const ownerUserId = getInventoryOwnerUserId();
  if (!ownerUserId) return [];

  const db = await getMongoDb();
  const items = await db
    .collection<InventoryDocument>("inventory")
    .find(
      { userId: ownerUserId },
      {
        projection: {
          itemName: 1,
          brand: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      }
    )
    .sort({ updatedAt: -1, createdAt: -1 })
    .toArray();

  return items.map((item) => {
    const id = item._id.toString();
    const itemName = asCleanText(item.itemName, "Unnamed spare part");
    const brand = asCleanText(item.brand);

    return {
      path: getPartPath({ id, itemName, brand }),
      updatedAt: asIsoDate(item.updatedAt) || asIsoDate(item.createdAt),
    };
  });
}

export const getPublicInventoryBrands = cache(async () => {
  const ownerUserId = getInventoryOwnerUserId();
  if (!ownerUserId) return [];

  const db = await getMongoDb();
  const rawBrands = await db
    .collection<InventoryDocument>("inventory")
    .distinct("brand", { userId: ownerUserId });
  const brands = new Set<string>();

  for (const rawBrand of rawBrands) {
    const brand = normalizeBrandLabel(rawBrand);
    if (brand) brands.add(brand);
  }

  return [...brands].sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base", numeric: true })
  );
});
