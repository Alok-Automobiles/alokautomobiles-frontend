"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/components/providers/language-provider";

export function LoadingScreen() {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 11 + 4, 94));
    }, 240);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const finish = () => {
      setProgress(100);
      setTimeout(() => setFading(true), 180);
      setTimeout(() => setVisible(false), 560);
    };
    window.addEventListener("load", finish);
    const fallback = setTimeout(finish, 2800);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(fallback);
    };
  }, []);

  const stage = useMemo(() => {
    if (progress < 25) return isHindi ? "तैयारी" : "CALIBRATING";
    if (progress < 55) return isHindi ? "पार्ट्स INDEX हो रहे हैं" : "INDEXING PARTS";
    if (progress < 85) return isHindi ? "दुकान लोड हो रही है" : "LOADING WORKSHOP";
    return isHindi ? "तैयार" : "READY";
  }, [isHindi, progress]);
  const tickerWords = isHindi
    ? [
        "ट्रक पार्ट्स",
        "इंजन ऑयल",
        "ड्राइवट्रेन",
        "फिल्टर",
        "ब्रेकिंग",
        "सस्पेंशन",
        "लुब्रिकेंट",
        "कार पार्ट्स",
        "असली स्टॉक",
      ]
    : [
        "TRUCK PARTS",
        "ENGINE OIL",
        "DRIVETRAIN",
        "FILTRATION",
        "BRAKING",
        "SUSPENSION",
        "LUBRICANTS",
        "FOUR-WHEELERS",
        "GENUINE STOCK",
      ];

  if (!visible) return null;

  const wheelRotation = progress * 14.4; // up to 1440deg

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[9999] overflow-hidden bg-[var(--ink)] text-[var(--bone)] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* grain + grid */}
      <div className="absolute inset-0 grid-lines opacity-[0.06]" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* corner crosshairs */}
      <CornerMarks />

      {/* meta strip */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-6 md:px-10 text-[10px] md:text-xs font-mono uppercase tracking-[0.28em] text-[var(--bone)]/60">
        <span>ALOK&nbsp;AUTOMOBILES</span>
        <span className="hidden sm:inline">VARANASI · UP · IND</span>
        <span>N° 2005/25</span>
      </div>

      {/* center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* spinning wheel emblem */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-10">
          <div
            className="absolute inset-0 rounded-full border border-[var(--bone)]/20"
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            <Spoke angle={0} />
            <Spoke angle={60} />
            <Spoke angle={120} />
            <Spoke angle={180} />
            <Spoke angle={240} />
            <Spoke angle={300} />
          </div>
          <div className="absolute inset-3 rounded-full border border-[var(--bone)]/30" />
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--amber)]" />
        </div>

        {/* headline */}
        <p className="eyebrow text-[var(--amber)] mb-3">{stage}</p>
        <h2 className="font-display text-4xl md:text-6xl font-light leading-none">
          {isHindi ? "पहिए" : "Keep the wheels"}
          <br />
          <span className="italic text-[var(--amber)]">
            {isHindi ? "चलते रहें।" : "turning."}
          </span>
        </h2>

        {/* odometer */}
        <div className="mt-10 w-[min(560px,90vw)]">
          <div className="flex items-end justify-between mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--bone)]/60">
            <span>ODOMETER</span>
            <Counter value={progress} />
          </div>
          <div className="relative h-px w-full bg-[var(--bone)]/15">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--amber)] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
            {/* tick marks */}
            {Array.from({ length: 21 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-0 w-px h-2 bg-[var(--bone)]/25"
                style={{ left: `${(i / 20) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* bottom ticker */}
      <div className="absolute bottom-6 left-0 right-0 overflow-hidden ticker-mask">
        <div
          className="flex whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--bone)]/55"
          style={{ ["--ticker-duration" as string]: "22s", animation: "ticker var(--ticker-duration) linear infinite" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0 gap-6 pr-6">
              {tickerWords.map((w) => (
                <span key={w} className="flex items-center gap-6">
                  <span>{w}</span>
                  <span aria-hidden className="text-[var(--amber)]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spoke({ angle }: { angle: number }) {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[48%] w-px bg-[var(--bone)]/30 origin-top"
      style={{ transform: `translate(-50%, 0) rotate(${angle}deg)` }}
    />
  );
}

function CornerMarks() {
  const common =
    "absolute w-6 h-6 border-[var(--bone)]/30";
  return (
    <>
      <span className={`${common} top-4 left-4 border-t border-l`} />
      <span className={`${common} top-4 right-4 border-t border-r`} />
      <span className={`${common} bottom-4 left-4 border-b border-l`} />
      <span className={`${common} bottom-4 right-4 border-b border-r`} />
    </>
  );
}

function Counter({ value }: { value: number }) {
  const v = Math.round(value).toString().padStart(3, "0");
  return <span className="text-[var(--amber)]">{v}/100</span>;
}
