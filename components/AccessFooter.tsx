"use client";

import { useState } from "react";
import { asset } from "@/lib/basePath";
import styles from "./AccessFooter.module.css";

export default function AccessFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section id="access" className={`section ${styles.access}`}>
        <div className={`container ${styles.grid}`}>
          {/* CTA */}
          <div className={styles.cta}>
            <span className="eyebrow">06 — access</span>
            <h2 className={styles.title}>
              Bring autonomous reporting to your reading room.
            </h2>
            <p className={styles.sub}>
              Request access for your research group or radiology department. We
              onboard design partners in small cohorts and deploy entirely inside
              your environment.
            </p>

            {sent ? (
              <div className={styles.confirm} role="status">
                <span className={styles.confirmCheck} aria-hidden="true">✓</span>
                <div>
                  <strong>Request received.</strong>
                  <span>We&apos;ll reach out to {email} shortly.</span>
                </div>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) setSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="name@hospital.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  aria-label="Work email"
                />
                <button type="submit" className={styles.submit}>
                  Request access
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
              Deployed in your VPC · we never train on your studies.
            </p>
          </div>

          {/* safety panel */}
          <aside className={styles.safety}>
            <div className={styles.safetyHead}>
              <span className={styles.safetyIcon} aria-hidden="true">⚠</span>
              <h3>Research preview — not for diagnostic use</h3>
            </div>
            <p className={styles.safetyBody}>
              DiagnostIQ is an investigational system shared for research and
              evaluation. It is not FDA-cleared or CE-marked, must not be used for
              primary diagnosis, and every output requires review and sign-off by
              a licensed radiologist.
            </p>
            <ul className={styles.safetyList}>
              <li>Not a medical device</li>
              <li>Human-in-the-loop sign-off required</li>
              <li>De-identified data only · no PHI retained</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footTop}`}>
          <div className={styles.footBrand}>
            <span className={styles.brand}>
              Diagnost<span className={styles.iq}>IQ</span>
            </span>
            <p>Autonomous radiology reporting.</p>
            <span className={styles.status}>
              <span className={styles.statusDot} /> system: online
            </span>
          </div>

          <nav className={styles.footNav} aria-label="Footer">
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Product</span>
              <a href="#pipeline">Pipeline</a>
              <a href="#architecture">Architecture</a>
              <a href="#reports">Reports</a>
              <a href="#benchmarks">Benchmarks</a>
            </span>
            <span className={styles.footCol}>
              <span className={styles.footColHead}>Company</span>
              <a href="#access">Request access</a>
              <a href="#top">Overview</a>
              <a href={asset("/xrays/ATTRIBUTION.md")}>Image credits</a>
            </span>
          </nav>
        </div>

        <div className={`container ${styles.footBottom}`}>
          <span>
            © 2026 DiagnostIQ · All rights reserved by Cortex AI Lab, Robotics
            and Mechatronics Engineering, University of Dhaka.
          </span>
          <span>
            Radiographs via Wikimedia Commons (CC0 / CC BY-SA 3.0). Overlays are
            synthetic · research preview.
          </span>
        </div>
      </footer>
    </>
  );
}
