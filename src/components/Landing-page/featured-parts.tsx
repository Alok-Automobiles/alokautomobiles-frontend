"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE, whatsappURL } from "@/lib/site";

type Availability = "in-stock" | "out-of-stock";
type InventoryStatusFilter = "all" | Availability;

type PublicInventoryItem = {
  id: string;
  path: string;
  itemName: string;
  itemNumber: string;
  uniqueCode: string;
  brand: string;
  description: string;
  availability: Availability;
  availabilityLabel: string;
  unitOfMeasure: string;
  partImages: string[];
  updatedAt: string | null;
};

export type PublicInventoryResponse = {
  items: PublicInventoryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  search?: {
    query: string;
    fuzzy: boolean;
  };
};

type LoadState = "loading" | "ready" | "error";

const PAGE_SIZE = 8;
const STATUS_FILTERS: Array<{ label: string; value: InventoryStatusFilter }> = [
  { label: "All", value: "all" },
  { label: "In stock", value: "in-stock" },
  { label: "Out of stock", value: "out-of-stock" },
];

const HI_STATUS_LABELS: Record<InventoryStatusFilter, string> = {
  all: "सभी",
  "in-stock": "उपलब्ध",
  "out-of-stock": "स्टॉक नहीं",
};

function getItemCode(item: PublicInventoryItem) {
  return item.itemNumber || item.uniqueCode || "Live stock";
}

function getDescription(item: PublicInventoryItem) {
  return (
    item.description ||
    "Available at the counter. Contact us for fitment, compatibility, and current pricing."
  );
}

function buildEnquiryMessage(item: PublicInventoryItem) {
  const code = getItemCode(item);
  const brand = item.brand ? `${item.brand} ` : "";

  return `Hi Alok Automobiles — I'd like to enquire about ${brand}${item.itemName} (${code}). Current status shows: ${item.availabilityLabel}. Please share price, fitment and availability.`;
}

function getAvailabilityClasses(availability: Availability) {
  if (availability === "in-stock") {
    return "text-[var(--amber-deep)]";
  }

  return "text-[var(--ink)]/45";
}

function getDisplayAvailability(item: PublicInventoryItem, isHindi: boolean) {
  if (!isHindi) return item.availabilityLabel;
  return item.availability === "in-stock" ? "उपलब्ध" : "स्टॉक नहीं";
}

export function FeaturedParts({
  initialSearch = "",
  initialData,
}: {
  initialSearch?: string;
  initialData?: PublicInventoryResponse;
}) {
  const { lang } = useLang();
  const canUseInitialData = Boolean(initialData && !initialSearch.trim());
  const skipInitialRequest = useRef(canUseInitialData);
  const [items, setItems] = useState<PublicInventoryItem[]>(
    canUseInitialData ? initialData?.items ?? [] : []
  );
  const [statusFilter, setStatusFilter] = useState<InventoryStatusFilter>("all");
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch.trim());
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<PublicInventoryResponse["pagination"]>(
    canUseInitialData && initialData
      ? initialData.pagination
      : {
          page: 1,
          limit: PAGE_SIZE,
          total: 0,
          totalPages: 1,
        }
  );
  const [loadState, setLoadState] = useState<LoadState>(
    canUseInitialData ? "ready" : "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const isHindi = lang === "hi";

  useEffect(() => {
    setSearchInput(initialSearch);
    setSearchQuery(initialSearch.trim());
    setPage(1);
  }, [initialSearch]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput.trim());
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (
      skipInitialRequest.current &&
      page === 1 &&
      statusFilter === "all" &&
      !searchQuery
    ) {
      skipInitialRequest.current = false;
      return;
    }

    const controller = new AbortController();

    async function loadInventory() {
      try {
        setLoadState("loading");
        setErrorMessage("");

        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          status: statusFilter,
        });

        if (searchQuery) params.set("search", searchQuery);

        const response = await fetch(`/api/public-inventory?${params.toString()}`, {
          signal: controller.signal,
        });

        if (response.status === 429) {
          throw new Error(
            isHindi
              ? "बहुत ज़्यादा सर्च हो गई। कृपया एक मिनट बाद फिर कोशिश करें।"
              : "Too many searches. Please wait a minute and try again."
          );
        }

        if (!response.ok) {
          throw new Error(isHindi ? "इन्वेंटरी लोड नहीं हो पाई" : "Inventory request failed");
        }

        const data = (await response.json()) as PublicInventoryResponse;
        setItems(Array.isArray(data.items) ? data.items : []);
        setPagination(data.pagination);
        setLoadState("ready");
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("Featured inventory load failed:", error);
        setItems([]);
        setPagination({
          page: 1,
          limit: PAGE_SIZE,
          total: 0,
          totalPages: 1,
        });
        setErrorMessage(
          error instanceof Error
            ? error.message
            : isHindi
              ? "लाइव पार्ट्स लोड होने में समय लग रहा है। तुरंत मदद के लिए कॉल या WhatsApp करें।"
              : "Live parts are taking a moment. Call or WhatsApp us for instant help."
        );
        setLoadState("error");
      }
    }

    loadInventory();

    return () => controller.abort();
  }, [isHindi, page, searchQuery, statusFilter]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchInput.trim());
  }

  function handleStatusChange(nextStatus: InventoryStatusFilter) {
    setStatusFilter(nextStatus);
    setPage(1);
  }

  const isLoading = loadState === "loading";
  const hasItems = items.length > 0;
  const canGoBack = pagination.page > 1 && !isLoading;
  const canGoForward = pagination.page < pagination.totalPages && !isLoading;

  return (
    <div className="relative">
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--amber-deep)] mb-4">
            {isHindi ? "§ ११ · लाइव पार्ट्स" : "§ 11 · Live parts"}
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
            {isHindi ? "काउंटर से" : "Fresh from the"}
            <br />
            <span className="italic amber-mark">{isHindi ? "ताज़ा पार्ट्स।" : "counter."}</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 pt-2">
          <p className="text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "हमारी दुकान के पार्ट्स खोजें। सही stock और fitment के लिए कॉल या WhatsApp करें। जो पार्ट अभी उपलब्ध नहीं है, उसे हम आमतौर पर 7 दिन या उससे कम में मंगा सकते हैं।"
              : "Search live truck and car spare-parts inventory. Call or WhatsApp to confirm fitment; most unavailable parts can be sourced within 7 days or less."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink)]/45" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={isHindi ? "पार्ट नाम, नंबर या ब्रांड से खोजें..." : "Search by part name, number, brand..."}
            className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--paper)] pl-11 pr-4 text-sm text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink)]/40 focus:border-[var(--ink)]"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleStatusChange(filter.value)}
              className={`h-12 px-4 rounded-full text-xs font-mono uppercase tracking-[0.22em] border transition-colors ${
                statusFilter === filter.value
                  ? "bg-[var(--ink)] text-[var(--bone)] border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink)]/70 border-[var(--border)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {isHindi ? HI_STATUS_LABELS[filter.value] : filter.label}
            </button>
          ))}
        </div>
      </div>

      {pagination.total > 0 && (
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/55">
            {searchQuery
              ? isHindi
                ? `“${searchQuery}” के लिए fuzzy search`
                : `Fuzzy search for “${searchQuery}”`
              : isHindi
                ? "पब्लिक पार्ट्स देख रहे हैं"
                : "Browsing public parts"}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/55">
            {isHindi
              ? `पेज ${pagination.page} / ${pagination.totalPages} · ${pagination.total} आइटम`
              : `Page ${pagination.page} of ${pagination.totalPages} · ${pagination.total} items`}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div
              key={index}
              className="min-h-[250px] bg-[var(--paper)] border border-[var(--border)] rounded-sm p-5 animate-pulse"
            >
              <div className="h-3 w-24 bg-[var(--linen)]" />
              <div className="h-7 w-4/5 bg-[var(--linen)] mt-6" />
              <div className="h-3 w-full bg-[var(--linen)] mt-5" />
              <div className="h-3 w-3/4 bg-[var(--linen)] mt-2" />
              <div className="h-12 w-full bg-[var(--linen)] mt-12" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && (
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${statusFilter}-${searchQuery}-${pagination.page}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {items.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="group relative flex flex-col bg-[var(--paper)] border border-[var(--border)] rounded-sm overflow-hidden hover:border-[var(--ink)] transition-colors p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink)]/55 truncate">
                    {item.brand || "Alok Automobiles"}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.22em] shrink-0 ${getAvailabilityClasses(
                      item.availability
                    )}`}
                  >
                    {getDisplayAvailability(item, isHindi)}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl mt-2 leading-tight tracking-tight text-[var(--ink)]">
                  <Link href={item.path} className="hover:text-[var(--amber-deep)] transition-colors">
                    {item.itemName}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--ink)]/70 leading-relaxed">
                  {getDescription(item)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[getItemCode(item), getDisplayAvailability(item, isHindi)].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono uppercase tracking-[0.22em] bg-[var(--linen)] text-[var(--ink)]/80 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  <div className="pt-4 border-t border-dashed border-[var(--border)] flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--ink)]/55">
                        {isHindi ? "उपलब्धता" : "Availability"}
                      </div>
                      <div className="font-display text-base md:text-lg text-[var(--ink)] mt-0.5">
                        {getDisplayAvailability(item, isHindi)}
                      </div>
                      {item.availability === "out-of-stock" && (
                        <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--amber-deep)]">
                          {isHindi ? "अधिकतर पार्ट ≤ 7 दिन" : "Most parts ≤ 7 days"}
                        </div>
                      )}
                    </div>
                    <a
                      href={whatsappURL(buildEnquiryMessage(item))}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Enquire about ${item.itemName} on WhatsApp`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--amber)] text-[var(--ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Link
                      href={item.path}
                      className="inline-flex items-center justify-center gap-2 h-10 border border-[var(--border)] text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {isHindi ? "जानकारी" : "Details"}
                    </Link>
                    <a
                      href={whatsappURL(buildEnquiryMessage(item))}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-10 border border-[var(--border)] text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && !hasItems && (
        <div className="text-center py-12 border border-dashed border-[var(--border)] bg-[var(--paper)]">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--linen)] text-[var(--amber-deep)]">
            <RefreshCw className="h-5 w-5" />
          </div>
          <p className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--ink)]/65">
            {errorMessage ||
              (isHindi
                ? "इस सर्च से कोई पब्लिक पार्ट नहीं मिला।"
                : "No public parts matched this search.")}
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappURL(
                "Hi Alok Automobiles — I'd like to enquire about parts availability."
              )}
              target="_blank"
              rel="noreferrer"
              className="h-11 px-5 inline-flex items-center justify-center rounded-full bg-[var(--ink)] text-[var(--bone)] text-xs font-mono uppercase tracking-[0.2em]"
            >
              {isHindi ? "WhatsApp पर पूछें" : "Ask on WhatsApp"}
            </a>
            <a
              href={SITE.phoneHref}
              className="h-11 px-5 inline-flex items-center justify-center rounded-full border border-[var(--border)] text-xs font-mono uppercase tracking-[0.2em] text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
            >
              {isHindi ? "काउंटर पर कॉल करें" : "Call the counter"}
            </a>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--ink)]/65">
            {isHindi
              ? "लिस्ट में नहीं मिला? गाड़ी की जानकारी या part number भेजें। अधिकतर requested parts हम 7 दिन या उससे कम में मंगा सकते हैं।"
              : "Not listed or currently unavailable? Send the vehicle details or part number. We can source most requested parts within 7 days or less."}
          </p>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
            disabled={!canGoBack}
            className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] text-xs font-mono uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:border-[var(--ink)] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            {isHindi ? "पिछला" : "Prev"}
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/55">
            {pagination.page}/{pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setPage((current) => Math.min(current + 1, pagination.totalPages))
            }
            disabled={!canGoForward}
            className="h-11 px-4 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] text-xs font-mono uppercase tracking-[0.2em] text-[var(--ink)] transition-colors hover:border-[var(--ink)] disabled:pointer-events-none disabled:opacity-40"
          >
            {isHindi ? "अगला" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
