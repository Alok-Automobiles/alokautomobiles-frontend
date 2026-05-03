"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { LanguageProvider } from "./language-provider";

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
