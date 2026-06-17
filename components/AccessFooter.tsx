"use client";

import { useState } from "react";
import { asset } from "@/lib/basePath";
import { buildMailtoUrl, FORM_ENDPOINT, type InquiryIntent } from "@/lib/contact";
import { useLocale } from "./LocaleProvider";
import styles from "./AccessFooter.module.css";

const INTENTS: InquiryIntent[] = ["hospital", "investor", "research"];

export default function AccessFooter() {
  const { t } = useLocale();
  const a = t.access;

  const [intent, setIntent] = useState<InquiryIntent>("hospital");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const intentLabel = t.intents[intent];
    const fields = { name, email, org, message };
    setSubmitting(true);

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            intent: intentLabel,
            name,
            email,
            organization: org,
            message,
          }),
        });
        if (!res.ok) throw new Error("Form submission failed");
      } else {
        window.location.href = buildMailtoUrl(intentLabel, fields);
        setSubmitting(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Could not send — try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section id="access" className={`section ${styles.access}`}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.cta}>
            <span className="eyebrow">{a.section}</span>
            <h2 className={styles.title}>{a.title}</h2>
            <p className={styles.sub}>{a.sub}</p>

            <div className={styles.intents} role="tablist" aria-label="Inquiry type">
              {INTENTS.map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={intent === key}
                  className={`${styles.intent} ${intent === key ? styles.intentOn : ""}`}
                  onClick={() => setIntent(key)}
                >
                  {t.intents[key]}
                </button>
              ))}
            </div>

            {sent ? (
              <div className={styles.confirm} role="status">
                <span className={styles.confirmCheck} aria-hidden="true">✓</span>
                <div>
                  <strong>{a.confirmTitle}</strong>
                  <span>
                    {a.confirmSub} ({email})
                  </span>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    required
                    placeholder={a.namePh}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    aria-label={a.namePh}
                  />
                  <input
                    type="email"
                    required
                    placeholder={a.emailPh}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    aria-label={a.emailPh}
                  />
                </div>
                <input
                  type="text"
                  placeholder={a.orgPh}
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className={styles.input}
                  aria-label={a.orgPh}
                />
                <textarea
                  placeholder={a.msgPh}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  aria-label={a.msgPh}
                />
                {error && (
                  <p className={styles.formError} role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className={styles.submit} disabled={submitting}>
                  {submitting ? a.submitting : a.submit}
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M2 7h9M7 3l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
            <p className={styles.note}>{a.note}</p>
          </div>

          <aside className={styles.safety}>
            <div className={styles.safetyHead}>
              <span className={styles.safetyIcon} aria-hidden="true">⚠</span>
              <h3>{a.safetyTitle}</h3>
            </div>
            {a.safetyBn ? (
              <p className={styles.safetyBody} lang="bn">
                {a.safetyBn}
              </p>
            ) : null}
            <p className={styles.safetyBody}>{a.safetyEn}</p>
            <ul className={styles.safetyList}>
              {a.safetyList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`container ${styles.footTop}`}>
          <div className={styles.footBrand}>
            <span className={styles.brand}>
              Diagnost<span className={styles.iq}>IQ</span>
            </span>
            <p>{a.footerTagline}</p>
            {a.footerBangla ? (
              <p className={styles.footBangla} lang="bn">
                {a.footerBangla}
              </p>
            ) : null}
            <span className={styles.status}>
              <span className={styles.statusDot} /> {a.footerStatus}
            </span>
          </div>

          <nav className={styles.footNav} aria-label="Footer">
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Product</span>
              <a href="#why-bd">{t.nav.bangladesh}</a>
              <a href="#journey">{t.nav.journey}</a>
              <a href="#pipeline">{t.nav.pipeline}</a>
              <a href="#reports">{t.nav.reports}</a>
              <a href="#impact">{t.nav.impact}</a>
            </span>
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Company</span>
              <a href="#team">{t.nav.team}</a>
              <a href="#access">{t.nav.cta}</a>
              <a href="#top">Overview</a>
              <a href={asset("/xrays/ATTRIBUTION.md")}>Image credits</a>
            </span>
          </nav>
        </div>

        <div className={`container ${styles.footBottom}`}>
          <span>
            © 2026 DiagnostIQ · Cortex AI Lab, Robotics and Mechatronics
            Engineering, University of Dhaka.
          </span>
          <span>
            Radiographs via Wikimedia Commons. Overlays synthetic · research
            preview.
          </span>
        </div>
      </footer>
    </>
  );
}
