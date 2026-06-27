"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { useLang } from "@/components/providers/language-provider";

type State = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    message: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setError(data.error || (isHindi ? "कुछ गलत हो गया।" : "Something went wrong."));
        return;
      }
      setState("sent");
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener");
      }
    } catch {
      setState("error");
      setError(
        isHindi
          ? "Server तक नहीं पहुँच पाए। कृपया काउंटर पर कॉल करें।"
          : "Couldn't reach the server. Please call the counter instead."
      );
    }
  }

  return (
    <div className="relative p-6 md:p-8 bg-[var(--ink)]/10 rounded-sm">
      <div className="mb-5">
        <p className="eyebrow text-[var(--ink)]/70">
          {isHindi ? "मैसेज छोड़ें" : "Leave a message"}
        </p>
        <h3 className="font-display text-2xl md:text-3xl leading-tight mt-1">
          {isHindi ? "हम पढ़कर जवाब देंगे।" : "We'll read it and reply."}
        </h3>
      </div>

      {state === "sent" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-5 bg-[var(--ink)] text-[var(--bone)] rounded-sm"
        >
          <span className="w-9 h-9 rounded-full bg-[var(--amber)] text-[var(--ink)] flex items-center justify-center">
            <Check className="w-5 h-5" />
          </span>
          <div>
            <div className="font-display text-lg">
              {isHindi ? "मिल गया — धन्यवाद।" : "Got it — thank you."}
            </div>
            <div className="text-xs text-[var(--bone)]/70">
              {isHindi
                ? "WhatsApp में copy भी खुल रही है। हम जल्द जवाब देंगे।"
                : "A copy is opening in WhatsApp too. We'll reply shortly."}
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={submit} className="grid grid-cols-2 gap-3 md:gap-4">
          <FormInput
            label={isHindi ? "नाम" : "Name"}
            value={form.name}
            required
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <FormInput
            label={isHindi ? "फ़ोन" : "Phone"}
            value={form.phone}
            required
            type="tel"
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <FormInput
            label={isHindi ? "गाड़ी (optional)" : "Vehicle (optional)"}
            value={form.vehicle}
            className="col-span-2"
            placeholder={isHindi ? "जैसे Tata LPT 1615, 2018" : "e.g. Tata LPT 1615, 2018"}
            onChange={(v) => setForm({ ...form, vehicle: v })}
          />
          <label className="flex flex-col gap-1.5 col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink)]/70">
              {isHindi ? "मैसेज" : "Message"} <span className="text-[var(--amber-deep)]">*</span>
            </span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={isHindi ? "आप क्या ढूँढ रहे हैं?" : "What are you looking for?"}
              className="w-full bg-[var(--bone)] border border-[var(--border)] focus:border-[var(--amber-deep)] focus:outline-none rounded-sm px-3 py-2.5 text-sm placeholder:text-[var(--ink)]/40 resize-none"
            />
          </label>

          {state === "error" && (
            <p className="col-span-2 text-xs text-[var(--rust)]">{error}</p>
          )}

          <div className="col-span-2 flex items-center justify-between gap-4 mt-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--ink)]/60">
              {isHindi
                ? "भेजकर आप WhatsApp या phone पर संपर्क के लिए सहमत हैं।"
                : "By sending, you agree to be contacted by WhatsApp or phone."}
            </p>
            <button
              type="submit"
              disabled={state === "sending"}
              className="group inline-flex shrink-0 items-center gap-2 h-12 px-5 rounded-full bg-[var(--ink)] text-[var(--bone)] text-sm font-medium whitespace-nowrap disabled:opacity-50 hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-colors"
            >
              <Send className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">
                {state === "sending"
                  ? isHindi
                    ? "भेज रहे हैं…"
                    : "Sending…"
                  : isHindi
                    ? "Enquiry भेजें"
                    : "Send enquiry"}
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--ink)]/70">
        {label} {required ? <span className="text-[var(--amber-deep)]">*</span> : null}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full bg-[var(--bone)] border border-[var(--border)] focus:border-[var(--amber-deep)] focus:outline-none rounded-sm px-3 text-sm placeholder:text-[var(--ink)]/40"
      />
    </label>
  );
}
