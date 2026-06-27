"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE, whatsappURL } from "@/lib/site";

const QUICK: { label: string; labelHi: string; msg: string }[] = [
  {
    label: "General enquiry",
    labelHi: "सामान्य पूछताछ",
    msg: "Hi Alok Automobiles — I'd like to enquire about spare parts.",
  },
  {
    label: "Truck parts",
    labelHi: "ट्रक पार्ट्स",
    msg: "Hi Alok Automobiles — I need truck parts. Vehicle: __, Model: __, Part: __.",
  },
  {
    label: "Engine oil",
    labelHi: "इंजन ऑयल",
    msg: "Hi Alok Automobiles — I'd like to order engine oil. Brand/Grade: __, Quantity: __.",
  },
  {
    label: "Bulk / fleet",
    labelHi: "Bulk / fleet",
    msg: "Hi Alok Automobiles — I'm enquiring on behalf of a fleet. Please share wholesale pricing.",
  },
];

export function WhatsAppButton() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 0.8, 0.22, 1] }}
            className="w-[min(340px,90vw)] rounded-2xl bg-[var(--ink)] text-[var(--bone)] shadow-2xl border border-[var(--steel)] overflow-hidden"
          >
            <div className="p-4 border-b border-[var(--steel)] flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                <WhatsAppGlyph className="w-5 h-5 text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--amber)] ring-2 ring-[var(--ink)]" />
              </div>
              <div className="flex-1 leading-tight">
                <div className="font-display text-sm">Alok Automobiles</div>
                <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--bone)]/60">
                  {isHindi ? "आमतौर पर कुछ मिनटों में जवाब" : "Typically replies in minutes"}
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[var(--steel)] inline-flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-[var(--bone)]/80 mb-3 leading-relaxed">
                {isHindi
                  ? "नमस्ते — एक quick message चुनें, आगे हम संभाल लेंगे।"
                  : "Hi — pick a quick message and we'll take it from there."}
              </p>
              <div className="flex flex-col gap-2">
                {QUICK.map((q) => (
                  <a
                    key={q.label}
                    href={whatsappURL(q.msg)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md bg-[var(--steel)]/60 hover:bg-[var(--amber)] hover:text-[var(--ink)] px-3 py-2.5 text-sm transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <span>{isHindi ? q.labelHi : q.label}</span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] opacity-70">
                      {isHindi ? "भेजें ↗" : "SEND ↗"}
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--steel)] text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--bone)]/50 flex items-center justify-between">
                <span>{SITE.hours}</span>
                <span className="text-[var(--amber)]">◆</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Open WhatsApp chat"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        whileHover={reduce ? undefined : { scale: 1.05 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] flex items-center justify-center overflow-hidden"
      >
        {/* pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-amber" />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-10"
            >
              <WhatsAppGlyph className="w-7 h-7" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* tooltip */}
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--ink)] text-[var(--bone)] text-xs font-mono uppercase tracking-[0.22em] px-3 py-1.5 rounded-full opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            {isHindi ? "बात करें" : "Chat with us"}
          </span>
        )}
        <span className="sr-only">{isHindi ? "WhatsApp पर बात करें" : "Chat on WhatsApp"}</span>
      </motion.button>
    </div>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M19.11 17.52c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.13-.13.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.02-.22-.54-.45-.46-.61-.47-.16 0-.34-.02-.52-.02-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.57.66.21 1.26.18 1.74.11.53-.08 1.59-.65 1.82-1.28.22-.62.22-1.16.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 4C9.38 4 4 9.38 4 16c0 2.12.55 4.15 1.6 5.95L4 28l6.22-1.56A11.92 11.92 0 0 0 16.02 28C22.66 28 28 22.62 28 16S22.66 4 16.02 4zm0 21.86a9.85 9.85 0 0 1-5.04-1.38l-.36-.21-3.69.93.98-3.59-.23-.37a9.83 9.83 0 0 1-1.5-5.24c0-5.44 4.43-9.87 9.85-9.87 2.64 0 5.12 1.03 6.98 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.87-9.87 9.87z" />
    </svg>
  );
}
