import XrayScan from "./XrayScan";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.grid}`}>
        {/* ---------------- left: statement ---------------- */}
        <div className={styles.copy}>
          <span className="eyebrow">Radiology intelligence · v2.4</span>

          <h1 className={styles.title}>
            Autonomous
            <br />
            radiology
            <br />
            <span className={styles.accent}>reporting.</span>
          </h1>

          <p className={styles.lede}>
            DiagnostIQ reads a radiograph the way a clinician does — it
            identifies the abnormality, localizes the exact region, and writes a
            structured, citation-ready report. Three models, one pipeline.
          </p>

          <div className={styles.actions}>
            <a href="#pipeline" className={styles.primary}>
              See the pipeline
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
              Request access
            </a>
          </div>

          <dl className={styles.stats}>
            <div>
              <dt>Findings</dt>
              <dd>
                14<span>classes</span>
              </dd>
            </div>
            <div>
              <dt>Mean Dice</dt>
              <dd>
                0.89<span>segmentation</span>
              </dd>
            </div>
            <div>
              <dt>Latency</dt>
              <dd>
                3.2<span>sec / study</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* ---------------- right: viewer ---------------- */}
        <div className={styles.viewer}>
          <div className={styles.viewerChrome}>
            <span>CR · CHEST PA</span>
            <span>STUDY 0xA39F · {`{anon}`}</span>
          </div>

          <div className={styles.film}>
            <XrayScan>
              {/* segmentation contour around upper-right lesion */}
              <g className={styles.lesion}>
                <path
                  className={styles.contour}
                  d="M252 122
                     C 276 112, 300 124, 300 146
                     C 302 168, 286 184, 264 182
                     C 244 180, 234 162, 240 142
                     C 243 132, 246 126, 252 122 Z"
                />
                <path
                  className={styles.contourFill}
                  d="M252 122
                     C 276 112, 300 124, 300 146
                     C 302 168, 286 184, 264 182
                     C 244 180, 234 162, 240 142
                     C 243 132, 246 126, 252 122 Z"
                />
                {/* crosshair */}
                <g className={styles.cross}>
                  <line x1="270" y1="120" x2="270" y2="184" />
                  <line x1="238" y1="152" x2="302" y2="152" />
                  <circle cx="270" cy="152" r="4" />
                </g>
              </g>

              {/* corner reticles */}
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

              {/* scan sweep */}
              <rect
                className={styles.sweep}
                x="0"
                y="0"
                width="400"
                height="26"
              />
            </XrayScan>

            {/* HUD confidence chip (HTML overlay) */}
            <div className={styles.chip}>
              <span className={styles.chipDot} />
              <div>
                <strong>pneumothorax</strong>
                <span>confidence 0.94</span>
              </div>
            </div>

            {/* film metadata */}
            <div className={styles.meta}>
              <span>WL 40 · WW 400</span>
              <span>px 0.143mm</span>
              <span>SEG · ON</span>
            </div>
          </div>

          <div className={styles.viewerFooter}>
            <span className={styles.live}>
              <span className={styles.liveDot} /> inference live
            </span>
            <span>diagnostiq-core · pipeline 3/3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
