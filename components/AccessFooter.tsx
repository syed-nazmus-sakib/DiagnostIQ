"use client";

import { useState } from "react";
import { asset } from "@/lib/basePath";
import {
  buildMailtoUrl,
  FORM_ENDPOINT,
  INTENT_LABELS,
  type InquiryIntent,
} from "@/lib/contact";
import styles from "./AccessFooter.module.css";

const INTENTS: InquiryIntent[] = ["hospital", "investor", "research"];

export default function AccessFooter() {
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
            intent: INTENT_LABELS[intent],
            name,
            email,
            organization: org,
            message,
          }),
        });
        if (!res.ok) throw new Error("Form submission failed");
      } else {
        window.location.href = buildMailtoUrl(intent, fields);
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
            <span className="eyebrow">08 — contact</span>
            <h2 className={styles.title}>
              Partner with us in Bangladesh.
            </h2>
            <p className={styles.sub}>
              Hospitals, investors, and researchers — tell us how you&apos;d like
              to work with DiagnostIQ. We onboard design partners in small
              cohorts and deploy entirely inside your environment.
            </p>

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
                  {INTENT_LABELS[key]}
                </button>
              ))}
            </div>

            {sent ? (
              <div className={styles.confirm} role="status">
                <span className={styles.confirmCheck} aria-hidden="true">✓</span>
                <div>
                  <strong>Request received.</strong>
                  <span>We&apos;ll reach out to {email} shortly.</span>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    aria-label="Your name"
                  />
                  <input
                    type="email"
                    required
                    placeholder="name@hospital.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    aria-label="Work email"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Organization (hospital, fund, university…)"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className={styles.input}
                  aria-label="Organization"
                />
                <textarea
                  placeholder="Tell us about your interest — pilot site, investment, or research…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                  aria-label="Message"
                />
                {error && (
                  <p className={styles.formError} role="alert">
                    {error}
                  </p>
                )}
                <button type="submit" className={styles.submit} disabled={submitting}>
                  {submitting ? "Sending…" : "Send inquiry"}
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
            <p className={styles.note}>
              On-prem deployment · no training on your studies · Bangla reports on
              roadmap
            </p>
          </div>

          <aside className={styles.safety}>
            <div className={styles.safetyHead}>
              <span className={styles.safetyIcon} aria-hidden="true">⚠</span>
              <h3>Research preview — not for diagnostic use</h3>
            </div>
            <p className={styles.safetyBody} lang="bn">
              গবেষণামূলক প্রদর্শন — রোগ নির্ণয়ের জন্য নয়। প্রতিটি রিপোর্ট
              লাইসেন্সপ্রাপ্ত রেডিওলজিস্ট-এর সাইন-অফ ছাড়া ব্যবহার করা যাবে না।
            </p>
            <p className={styles.safetyBody}>
              DiagnostIQ is investigational — not FDA-cleared, CE-marked, or
              DGDA-registered. Every output requires review and sign-off by a
              licensed radiologist.
            </p>
            <ul className={styles.safetyList}>
              <li>Not a medical device (research preview)</li>
              <li>Human-in-the-loop sign-off required</li>
              <li>De-identified data only · no PHI retained</li>
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
            <p>Autonomous radiology reporting for Bangladesh.</p>
            <p className={styles.footBangla} lang="bn">
              বাংলাদেশের জন্য স্বয়ংক্রিয় রেডিওলজি রিপোর্টিং
            </p>
            <span className={styles.status}>
              <span className={styles.statusDot} /> research preview
            </span>
          </div>

          <nav className={styles.footNav} aria-label="Footer">
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Product</span>
              <a href="#why-bd">Why Bangladesh</a>
              <a href="#pipeline">Pipeline</a>
              <a href="#architecture">Architecture</a>
              <a href="#reports">Reports</a>
            </span>
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Company</span>
              <a href="#team">Team &amp; roadmap</a>
              <a href="#access">Contact</a>
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
