"use client";

import XrayScan from "./XrayScan";
import { useLocale } from "./LocaleProvider";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useLocale();
  const h = t.hero;

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.masthead}`}>
        <span>{h.mastheadLeft}</span>
        <span>{h.mastheadRight}</span>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <span className={styles.chip}>
            <span className={styles.chipDotSm} aria-hidden="true" />
            {h.chip}
          </span>

          <h1 className={styles.title}>
            {h.titleLine1}
            <br />
            {h.titleLine2}
            <br />
            <span className={styles.accent}>{h.titleAccent}</span>
          </h1>

          <p className={styles.lede}>{h.lede}</p>

          <div className={styles.actions}>
            <a href="#pipeline" className={styles.primary}>
              {h.ctaPrimary}
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
            </a>
            <a href="#access" className={styles.ghost}>
              {h.ctaGhost}
            </a>
          </div>
        </div>

        <div className={styles.stage}>
          <span className={styles.ring} aria-hidden="true" />

          <div className={`${styles.viewer} darkScope`}>
            <div className={styles.viewerChrome}>
              <span>CR · CHEST PA</span>
              <span>STUDY 0xA39F</span>
            </div>

            <div className={styles.film}>
              <XrayScan>
                <g className={styles.lesion}>
                  <path
                    className={styles.contour}
                    d="M252 122 C 276 112, 300 124, 300 146 C 302 168, 286 184, 264 182 C 244 180, 234 162, 240 142 C 243 132, 246 126, 252 122 Z"
                  />
                  <path
                    className={styles.contourFill}
                    d="M252 122 C 276 112, 300 124, 300 146 C 302 168, 286 184, 264 182 C 244 180, 234 162, 240 142 C 243 132, 246 126, 252 122 Z"
                  />
                  <g className={styles.cross}>
                    <line x1="270" y1="120" x2="270" y2="184" />
                    <line x1="238" y1="152" x2="302" y2="152" />
                    <circle cx="270" cy="152" r="4" />
                  </g>
                </g>

                <g className={styles.reticles}>
                  {[
                    [16, 16, 1, 1],
                    [384, 16, -1, 1],
                    [16, 454, 1, -1],
                    [384, 454, -1, -1],
                  ].map(([x, y, sx, sy], i) => (
                    <path
                      key={i}
                      d={`M ${x} ${y + sy * 16} V ${y} H ${x + sx * 16}`}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="1.2"
                      opacity="0.5"
                    />
                  ))}
                </g>

                <rect className={styles.sweep} x="0" y="0" width="400" height="26" />
              </XrayScan>

              <div className={styles.meta}>
                <span>WL 40 · WW 400</span>
                <span>px 0.143mm</span>
                <span>SEG · ON</span>
              </div>
            </div>

            <div className={styles.viewerFooter}>
              <span className={styles.live}>
                <span className={styles.liveDot} /> {h.demoLabel}
              </span>
              <span>{h.demoMeta}</span>
            </div>
          </div>

          <aside className={`${styles.card} ${styles.clsCard}`}>
            <span className={styles.cardTag}>01 · classify</span>
            <div className={styles.bar}>
              <span>Pneumothorax</span>
              <span className={styles.track}>
                <span className={styles.fill} style={{ width: "94%" }} />
              </span>
              <b>0.94</b>
            </div>
            <div className={`${styles.bar} ${styles.barDim}`}>
              <span>Effusion</span>
              <span className={styles.track}>
                <span
                  className={`${styles.fill} ${styles.fillDim}`}
                  style={{ width: "22%" }}
                />
              </span>
              <b>0.22</b>
            </div>
          </aside>

          <aside className={`${styles.card} ${styles.repCard}`}>
            <span className={styles.signed}>{h.cardSigned}</span>
            <p className={styles.snippet}>{h.cardSnippet}</p>
            <span className={styles.cardMeta}>council 0.97 · radlm-7b</span>
          </aside>
        </div>
      </div>

      <div className={`container ${styles.statsWrap}`}>
        <dl className={styles.stats}>
          <div>
            <dt>{h.stats.findings}</dt>
            <dd>
              14<span>{h.stats.findingsSub}</span>
            </dd>
          </div>
          <div>
            <dt>{h.stats.dice}</dt>
            <dd>
              0.89<span>{h.stats.diceSub}</span>
            </dd>
          </div>
          <div>
            <dt>{h.stats.radgraph}</dt>
            <dd>
              0.48<span>{h.stats.radgraphSub}</span>
            </dd>
          </div>
          <div>
            <dt>{h.stats.latency}</dt>
            <dd>
              3.2<span>{h.stats.latencySub}</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
