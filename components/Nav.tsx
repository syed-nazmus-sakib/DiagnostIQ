"use client";

import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const links = [
  { href: "#why-bd", label: "Bangladesh" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#reports", label: "Reports" },
  { href: "#team", label: "Team" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            research preview
          </span>
          <a href="#access" className={styles.cta}>
            Request access
          </a>
        </div>
      </header>
    </div>
  );
}
