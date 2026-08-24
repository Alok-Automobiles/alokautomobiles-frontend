import { NextRequest, NextResponse } from "next/server";
import type { Document, WithId } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import { getPartPath } from "@/lib/part-links";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LIMIT = 24;
const DEFAULT_LIMIT = 8;
const MAX_SEARCH_LENGTH = 80;
const MAX_FUZZY_CANDIDATES = 1_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 60;

type Availability = "in-stock" | "out-of-stock";
type InventoryStatusFilter = "all" | Availability;

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

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type GlobalWithRateLimit = typeof globalThis & {
  _alokPublicInventoryRateLimit?: Map<string, RateLimitEntry>;
};

const globalWithRateLimit = globalThis as GlobalWithRateLimit;
const rateLimitStore =
  globalWithRateLimit._alokPublicInventoryRateLimit ??
  new Map<string, RateLimitEntry>();

globalWithRateLimit._alokPublicInventoryRateLimit = rateLimitStore;

function getInventoryOwnerUserId() {
  return process.env.INVENTORY_OWNER_USER_ID?.trim();
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function checkRateLimit(request: NextRequest) {
  const now = Date.now();
  const key = getClientIp(request);
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetAt });
    cleanupRateLimitStore(now);

    return {
      limited: false,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetAt,
    };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;

  return {
    limited: false,
    remaining: RATE_LIMIT_MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}

function cleanupRateLimitStore(now: number) {
  if (rateLimitStore.size < 500) return;

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }
}

function rateLimitHeaders(rateLimit: { remaining: number; resetAt: number }) {
  return {
    "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
    "X-RateLimit-Remaining": String(Math.max(rateLimit.remaining, 0)),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1000)),
  };
}

function asCleanText(value: unknown, fallback = "") {
  if (typeof value !== "string") return fallback;
  return value.trim() || fallback;
}

function asSafeNumber(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
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

function getTime(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.getTime();
  }

  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.getTime();
  }

  return 0;
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchTokens(search: string) {
  return normalizeSearchText(search)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .slice(0, 8);
}

function levenshteinDistance(a: string, b: string) {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  const current = Array.from({ length: b.length + 1 }, () => 0);

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;

      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + substitutionCost
      );
    }

    for (let j = 0; j <= b.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
}

function scoreTokenAgainstWords(token: string, words: string[]) {
  let bestScore = 0;

  for (const word of words) {
    if (!word) continue;
    if (word === token) bestScore = Math.max(bestScore, 3);
    else if (word.includes(token) || token.includes(word)) bestScore = Math.max(bestScore, 2);
    else {
      const distance = levenshteinDistance(token, word);
      const longest = Math.max(token.length, word.length);
      const ratio = distance / longest;
      const allowedDistance = token.length <= 4 ? 1 : 2;

      if (distance <= allowedDistance || ratio <= 0.34) {
        bestScore = Math.max(bestScore, 1.25 - ratio);
      }
    }
  }

  return bestScore;
}

function scoreInventoryItem(item: WithId<InventoryDocument>, tokens: string[]) {
  const searchableText = normalizeSearchText(
    [
      asCleanText(item.itemName),
      asCleanText(item.itemNumber),
      asCleanText(item.uniqueCode),
      asCleanText(item.brand),
      asCleanText(item.description),
    ].join(" ")
  );

  if (!searchableText || tokens.length === 0) return 0;

  const phrase = tokens.join(" ");
  if (searchableText.includes(phrase)) return 100 + phrase.length;

  const words = searchableText.split(/\s+/).filter(Boolean);
  let totalScore = 0;

  for (const token of tokens) {
    const tokenScore = scoreTokenAgainstWords(token, words);
    if (tokenScore <= 0) return 0;
    totalScore += tokenScore;
  }

  return totalScore;
}

function getPositiveIntegerParam(
  request: NextRequest,
  key: string,
  fallback: number,
  max: number
) {
  const raw = request.nextUrl.searchParams.get(key);
  const parsed = Number.parseInt(raw || "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function getStatusFilter(request: NextRequest): InventoryStatusFilter {
  const status = request.nextUrl.searchParams.get("status");

  if (status === "in-stock" || status === "out-of-stock") return status;
  return "all";
}

function getAvailability(item: InventoryDocument): Availability {
  const quantity = asSafeNumber(item.quantity) ?? 0;
  return quantity > 0 ? "in-stock" : "out-of-stock";
}

function getAvailabilityLabel(availability: Availability) {
  return availability === "in-stock" ? "In stock" : "Out of stock";
}

function buildAvailabilityQuery(status: InventoryStatusFilter) {
  if (status === "in-stock") return { quantity: { $gt: 0 } };

  if (status === "out-of-stock") {
    return {
      $or: [
        { quantity: { $lte: 0 } },
        { quantity: null },
        { quantity: { $exists: false } },
      ],
    };
  }

  return {};
}

function serializePublicInventoryItem(item: WithId<InventoryDocument>) {
  const itemNumber = asCleanText(item.itemNumber);
  const uniqueCode = asCleanText(item.uniqueCode);
  const availability = getAvailability(item);
  const updatedAt = asIsoDate(item.updatedAt) || asIsoDate(item.createdAt);
  const id = item._id.toString();
  const itemName = asCleanText(item.itemName, "Unnamed item");
  const brand = asCleanText(item.brand);

  return {
    id,
    path: getPartPath({ id, itemName, brand }),
    itemName,
    itemNumber,
    uniqueCode,
    brand,
    description: asCleanText(item.description),
    availability,
    availabilityLabel: getAvailabilityLabel(availability),
    unitOfMeasure: asCleanText(item.unitOfMeasure, "pcs"),
    partImages: asImageList(item.partImages),
    updatedAt,
  };
}

export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request);
  const baseHeaders = rateLimitHeaders(rateLimit);

  if (rateLimit.limited) {
    return NextResponse.json(
      { error: "Too many inventory requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          ...baseHeaders,
          "Retry-After": String(
            Math.max(Math.ceil((rateLimit.resetAt - Date.now()) / 1000), 1)
          ),
        },
      }
    );
  }

  const ownerUserId = getInventoryOwnerUserId();

  if (!ownerUserId) {
    return NextResponse.json(
      { error: "Public inventory is not configured" },
      { status: 503, headers: baseHeaders }
    );
  }

  try {
    const search =
      request.nextUrl.searchParams.get("search")?.trim().slice(0, MAX_SEARCH_LENGTH) || "";
    const searchTokens = getSearchTokens(search);
    const status = getStatusFilter(request);
    const page = getPositiveIntegerParam(request, "page", 1, 10_000);
    const limit = getPositiveIntegerParam(request, "limit", DEFAULT_LIMIT, MAX_LIMIT);
    const skip = (page - 1) * limit;
    const availabilityQuery = buildAvailabilityQuery(status);
    const query: Document = {
      userId: ownerUserId,
      ...availabilityQuery,
    };

    const db = await getMongoDb();
    const inventoryCollection = db.collection<InventoryDocument>("inventory");

    const projection = {
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
    };

    if (searchTokens.length > 0) {
      const candidates = await inventoryCollection
        .find(query, { projection })
        .sort({ updatedAt: -1, createdAt: -1 })
        .limit(MAX_FUZZY_CANDIDATES)
        .toArray();

      const matches = candidates
        .map((item) => ({
          item,
          score: scoreInventoryItem(item, searchTokens),
        }))
        .filter(({ score }) => score > 0)
        .sort(
          (a, b) =>
            b.score - a.score ||
            getTime(b.item.updatedAt) - getTime(a.item.updatedAt) ||
            getTime(b.item.createdAt) - getTime(a.item.createdAt)
        );

      const paginatedItems = matches.slice(skip, skip + limit).map(({ item }) => item);

      return NextResponse.json(
        {
          items: paginatedItems.map(serializePublicInventoryItem),
          pagination: {
            page,
            limit,
            total: matches.length,
            totalPages: Math.max(Math.ceil(matches.length / limit), 1),
          },
          search: {
            query: search,
            fuzzy: true,
          },
        },
        {
          headers: {
            ...baseHeaders,
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          },
        }
      );
    }

    const [items, total] = await Promise.all([
      inventoryCollection
        .find(query, { projection })
        .sort({ updatedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      inventoryCollection.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        items: items.map(serializePublicInventoryItem),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.max(Math.ceil(total / limit), 1),
        },
        search: {
          query: search,
          fuzzy: false,
        },
      },
      {
        headers: {
          ...baseHeaders,
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Public inventory fetch failed:", error);

    return NextResponse.json(
      { error: "Could not load inventory right now" },
      { status: 500, headers: baseHeaders }
    );
  }
}
