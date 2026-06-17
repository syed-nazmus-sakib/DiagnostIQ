"use client";

import { useEffect, useState } from "react";
import { useLocale, LangToggle } from "./LocaleProvider";
import styles from "./Nav.module.css";

export default function Nav() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#why-bd", label: t.nav.bangladesh },
    { href: "#journey", label: t.nav.journey },
    { href: "#pipeline", label: t.nav.pipeline },
    { href: "#reports", label: t.nav.reports },
    { href: "#impact", label: t.nav.impact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={styles.dock}>
      <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#top" className={styles.brand} aria-label="DiagnostIQ home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                opacity="0.4"
              />
              <path
                d="M3 12 H8 L10 6 L14 18 L16 12 H21"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className={styles.wordmark}>
            Diagnost<span className={styles.iq}>IQ</span>
          </span>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <LangToggle compact />
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {t.nav.status}
          </span>
          <a href="#access" className={styles.cta}>
            {t.nav.cta}
          </a>
        </div>
      </header>
    </div>
  );
}
