"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { COPY, type Locale, type UiCopy } from "@/lib/i18n/copy";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: UiCopy;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = locale === "bn" ? "bn" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: COPY[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function LangToggle({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`langToggle ${className}`.trim()}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={locale === "en" ? "on" : ""}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={locale === "bn" ? "on" : ""}
        aria-pressed={locale === "bn"}
        onClick={() => setLocale("bn")}
      >
        {compact ? "বাং" : "বাংলা"}
      </button>
    </div>
  );
}
