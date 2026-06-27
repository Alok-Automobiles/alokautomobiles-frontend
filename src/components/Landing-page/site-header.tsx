"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { useLang } from "@/components/providers/language-provider";

const NAV = [
  { href: "/parts", labelKey: "nav.inventory" as const, index: "01" },
  { href: "/#brands", labelKey: "nav.partners" as const, index: "02" },
  { href: "/#workshop", labelKey: "nav.workshop" as const, index: "03" },
  { href: "/#contact", labelKey: "nav.contact" as const, index: "04" },
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
      <div className="bg-[var(--ink)] text-[var(--bone)] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em]">
        <div className="site-container min-h-10 grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--amber)] animate-pulse-amber" />
              <span className="relative rounded-full h-2 w-2 bg-[var(--amber)]" />
            </span>
            <span className="hidden sm:inline">
              {lang === "hi" ? "खुला · सोम–शनि · सुबह 9–शाम 7" : "Open · Mon–Sat · 9am–7pm"}
            </span>
            <span className="sm:hidden">{lang === "hi" ? "अभी खुला" : "Open now"}</span>
          </div>
          <div className="hidden md:flex items-center justify-self-center gap-6 whitespace-nowrap">
            <span className="text-[var(--bone)]/70">Est. 2005</span>
            <span className="text-[var(--bone)]/70">Varanasi, UP</span>
          </div>
          <a
            href="tel:+919838397109"
            className="link-edit inline-flex shrink-0 items-center justify-self-end gap-2 whitespace-nowrap hover:text-[var(--amber)] transition-colors"
          >
            <Phone className="h-3 w-3 shrink-0" aria-hidden />
            <span>+91 98383 97109</span>
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
        <div className="site-container h-[4.5rem] md:h-20 grid grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[minmax(16rem,1fr)_auto_minmax(16rem,1fr)] items-center gap-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 justify-self-start"
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
              <span className="font-display whitespace-nowrap text-lg md:text-xl font-medium tracking-tight">
                Alok <span className="italic opacity-80">Automobiles</span>
              </span>
              <span className="hidden sm:block text-[10px] font-mono uppercase tracking-[0.28em] text-[var(--muted-foreground)]">
                {lang === "hi" ? "पार्ट्स · ऑयल · 2005 से" : "Parts · Oils · Since 2005"}
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden xl:flex items-center justify-center gap-7 justify-self-center">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="link-edit group inline-flex items-center gap-2.5 text-sm"
              >
                <span className="font-mono text-[10px] text-[var(--muted-foreground)] tracking-widest tabular-nums">
                  {n.index}
                </span>
                <span className="font-medium">{t(n.labelKey)}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            {/* Language toggle */}
            <div className="hidden lg:flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]/60 overflow-hidden h-10 text-[10px] font-mono uppercase tracking-[0.22em]">
              <button
                type="button"
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
                type="button"
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
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/60 hover:bg-[var(--paper)] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Link
              href="/#part-finder"
              className="group hidden md:inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/70 px-4 text-xs font-medium tracking-tight text-[var(--foreground)] hover:border-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--ink)] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber)] group-hover:bg-[var(--ink)] transition-colors" />
              {t("cta.quote")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card)]"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`xl:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--background)]/96 backdrop-blur-xl transition-[max-height] duration-500 ease-out ${
            open ? "max-h-[520px]" : "max-h-0"
          }`}
        >
          <div className="site-container pb-6 pt-2">
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
                  type="button"
                  onClick={() => setLang("en")}
                  className={`flex-1 h-full ${
                    lang === "en" ? "bg-[var(--ink)] text-[var(--bone)]" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("hi")}
                  className={`flex-1 h-full ${
                    lang === "hi" ? "bg-[var(--ink)] text-[var(--bone)]" : ""
                  }`}
                >
                  हिन्दी
                </button>
              </div>
              <button
                type="button"
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-full border border-[var(--border)] inline-flex items-center justify-center"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

            <Link
              href="/#contact"
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
