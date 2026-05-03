"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useLang } from "@/components/providers/language-provider";

const NAV = [
  { href: "#inventory", labelKey: "nav.inventory" as const, index: "01" },
  { href: "#brands", labelKey: "nav.partners" as const, index: "02" },
  { href: "#workshop", labelKey: "nav.workshop" as const, index: "03" },
  { href: "#contact", labelKey: "nav.contact" as const, index: "04" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, set: setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-[var(--ink)] text-[var(--bone)] text-[11px] font-mono uppercase tracking-[0.28em]">
        <div className="container mx-auto px-4 md:px-8 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--amber)] animate-pulse-amber" />
              <span className="relative rounded-full h-2 w-2 bg-[var(--amber)]" />
            </span>
            <span className="hidden sm:inline">Open · Mon–Sat · 9am–7pm</span>
            <span className="sm:hidden">Open now</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[var(--bone)]/70">Est. 2005</span>
            <span className="text-[var(--bone)]/70">Varanasi, UP</span>
          </div>
          <a
            href="tel:+919838397109"
            className="flex items-center gap-2 hover:text-[var(--amber)] transition-colors link-edit"
          >
            <Phone className="h-3 w-3" />
            +91 98383 97109
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[var(--background)]/92 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Alok Automobiles home"
          >
            <div className="relative">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden ring-1 ring-[var(--ink)]/10 bg-[var(--paper)]">
                <Image
                  src="/logo.png"
                  alt="Alok Automobiles"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[var(--amber)] ring-2 ring-[var(--background)]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg md:text-xl font-medium tracking-tight">
                Alok <span className="italic opacity-80">Automobiles</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                Parts · Oils · Since 2005
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-baseline gap-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group inline-flex items-baseline gap-3 link-edit text-sm"
              >
                <span className="font-mono text-[10px] leading-none text-[var(--muted-foreground)] tracking-widest">
                  {n.index}
                </span>
                <span className="font-medium leading-none">{t(n.labelKey)}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Language toggle */}
            <div className="hidden md:flex items-center rounded-full border border-[var(--border)] overflow-hidden h-9 text-[10px] font-mono uppercase tracking-[0.22em]">
              <button
                onClick={() => setLang("en")}
                className={`px-3 h-full transition-colors ${
                  lang === "en"
                    ? "bg-[var(--ink)] text-[var(--bone)]"
                    : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                }`}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 h-full transition-colors ${
                  lang === "hi"
                    ? "bg-[var(--ink)] text-[var(--bone)]"
                    : "text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                }`}
                aria-pressed={lang === "hi"}
              >
                हिन्दी
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] hover:bg-[var(--paper)] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link
              href="#part-finder"
              className="group hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[var(--ink)] text-[var(--bone)] text-xs font-medium tracking-tight hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)] group-hover:bg-[var(--ink)] transition-colors" />
              {t("cta.quote")}
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--paper)]"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-500 ease-out ${
            open ? "max-h-[520px]" : "max-h-0"
          }`}
        >
          <div className="container mx-auto px-4 pb-6 pt-2 bg-[var(--background)]/96 backdrop-blur-xl border-t border-[var(--border)]">
            <ul className="flex flex-col divide-y divide-[var(--border)]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={n.href}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="font-mono text-xs text-[var(--muted-foreground)]">
                      {n.index}
                    </span>
                    <span className="font-display text-2xl">{t(n.labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 flex items-center rounded-full border border-[var(--border)] overflow-hidden h-10 text-[11px] font-mono uppercase tracking-[0.22em]">
                <button
                  onClick={() => setLang("en")}
                  className={`flex-1 h-full ${
                    lang === "en" ? "bg-[var(--ink)] text-[var(--bone)]" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("hi")}
                  className={`flex-1 h-full ${
                    lang === "hi" ? "bg-[var(--ink)] text-[var(--bone)]" : ""
                  }`}
                >
                  हिन्दी
                </button>
              </div>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-full border border-[var(--border)] inline-flex items-center justify-center"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 h-12 rounded-full bg-[var(--ink)] text-[var(--bone)] text-sm font-medium"
            >
              <Phone className="h-4 w-4" /> {t("cta.call")}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
