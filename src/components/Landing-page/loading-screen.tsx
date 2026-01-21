"use client";

import { useEffect, useMemo, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Simulate loading progress until the page is ready
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 12 + 5, 90));
    }, 280);

    return () => clearInterval(interval);
  }, []);

  // Finish when window load fires or after fallback
  useEffect(() => {
    const finish = () => {
      setProgress(100);
      setTimeout(() => setIsFadingOut(true), 150);
      setTimeout(() => setIsVisible(false), 500);
    };

    const onLoad = () => finish();
    window.addEventListener("load", onLoad);

    const fallback = setTimeout(finish, 3200);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  const statusText = useMemo(() => {
    if (progress < 30) return "Preparing your experience...";
    if (progress < 60) return "Checking inventory and brands...";
    if (progress < 90) return "Polishing details...";
    return "Ready to go!";
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 transition-opacity duration-300 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md px-8 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">
          Alok Automobiles
        </p>
        <h2 className="text-2xl font-bold mb-2">Loading your automotive solutions</h2>
        <p className="text-sm text-white/70 mb-6">{statusText}</p>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-white/60">{Math.round(progress)}% • Please wait</p>
      </div>
    </div>
  );
}
