import styles from "./Nav.module.css";

const links = [
  { href: "#pipeline", label: "Pipeline" },
  { href: "#architecture", label: "Architecture" },
  { href: "#reports", label: "Reports" },
  { href: "#benchmarks", label: "Benchmarks" },
];

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} aria-label="DiagnostIQ home">
          <span className={styles.mark} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
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
                strokeWidth="1.6"
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
            system: online
          </span>
          <a href="#access" className={styles.cta}>
            Request access
          </a>
        </div>
      </div>
    </header>
  );
}
