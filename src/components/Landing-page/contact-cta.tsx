"use client";

import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";
import { SITE, whatsappURL } from "@/lib/site";
import { EnquiryForm } from "./enquiry-form";

export function ContactCTA() {
  const { lang, t } = useLang();
  const isHindi = lang === "hi";

  return (
    <div className="relative w-full overflow-hidden bg-[var(--amber)] text-[var(--ink)] rounded-sm">
      <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[var(--ink)]/70" />
      <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[var(--ink)]/70" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[var(--ink)]/70" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[var(--ink)]/70" />

      <div className="diesel-stripe h-3" />

      <div className="grid grid-cols-12 gap-6 md:gap-10 px-6 md:px-14 py-14 md:py-20">
        <div className="col-span-12 md:col-span-6">
          <p className="eyebrow text-[var(--ink)]/70 mb-4">{t("section.contact.eyebrow")}</p>
          <h2 className="font-display leading-[0.88] tracking-[-0.03em] text-5xl md:text-7xl lg:text-[6rem]">
            {t("contact.title.1")} <span className="italic">{t("contact.title.2")}</span>
            <br />
            {t("contact.title.3")}
          </h2>

          <p className="mt-6 max-w-xl text-base md:text-lg text-[var(--ink)]/80 leading-relaxed">
            {isHindi
              ? "Make, model और part number हो तो बताइए। हम stock और price confirm करेंगे। अगर पार्ट अभी उपलब्ध नहीं है, तो ज़्यादातर items 7 दिन या उससे कम में मंगा सकते हैं।"
              : "Tell us the make, model, and part number if you have it. We'll confirm stock and price; most unavailable parts can be sourced within 7 days or less."}
          </p>

          {/* Quick action cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={SITE.phoneHref}
              className="group relative flex flex-col bg-[var(--ink)] text-[var(--bone)] p-5 rounded-sm overflow-hidden"
            >
              <span className="eyebrow text-[var(--amber)]">
                {isHindi ? "काउंटर पर कॉल करें" : "Call the counter"}
              </span>
              <span className="mt-2 font-display text-2xl tracking-tight">
                {SITE.phone}
              </span>
              <span className="mt-2 flex items-center gap-2 text-xs text-[var(--bone)]/70">
                <Phone className="h-3.5 w-3.5" /> {isHindi ? "कॉल करने के लिए tap करें" : "Tap to dial"}
              </span>
              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-[var(--amber)] text-[var(--ink)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href={whatsappURL(
                `Hi ${SITE.name} — I'd like to enquire about spare parts.`
              )}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col bg-[#128c7e] hover:bg-[#0f7567] text-white p-5 rounded-sm overflow-hidden transition-colors"
            >
              <span
                className="font-mono uppercase"
                style={{ fontSize: "0.72rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.9)" }}
              >
                {isHindi ? "WhatsApp पर बात करें" : "Chat on WhatsApp"}
              </span>
              <span className="mt-2 font-display text-2xl tracking-tight text-white">
                {isHindi ? "अभी message करें" : "Message us now"}
              </span>
              <span className="mt-2 flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>
                {isHindi ? "Message पहले से तैयार" : "Pre-filled messages waiting"}
              </span>
              <span className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#128c7e] transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-12">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex flex-col gap-1 bg-[var(--ink)]/10 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors p-4 rounded-sm"
            >
              <span className="eyebrow text-[var(--ink)]/60">
                <Mail className="h-3.5 w-3.5 inline -translate-y-0.5 mr-1.5" /> {isHindi ? "ईमेल" : "Email"}
              </span>
              <span className="font-mono text-xs md:text-sm break-all">
                {SITE.email}
              </span>
            </a>
            <a
              href="#visit"
              className="flex flex-col gap-1 bg-[var(--ink)]/10 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors p-4 rounded-sm"
            >
              <span className="eyebrow text-[var(--ink)]/60">
                <MapPin className="h-3.5 w-3.5 inline -translate-y-0.5 mr-1.5" /> {isHindi ? "दुकान" : "Visit"}
              </span>
              <span className="text-xs md:text-sm leading-tight">
                Kaneri Rd, Mohansarai, Varanasi
              </span>
            </a>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <EnquiryForm />
        </div>
      </div>

      <div className="diesel-stripe h-3" />
    </div>
  );
}
