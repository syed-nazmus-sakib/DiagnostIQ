"use client";

import { useState } from "react";
import { CASES } from "./pipeline.data";
import styles from "./ReportExplorer.module.css";

const META: Record<string, { date: string; sex: string; age: string }> = {
  "PX-4471": { date: "2026-06-14", sex: "M", age: "34" },
  "CM-2083": { date: "2026-06-12", sex: "F", age: "71" },
  "PE-9925": { date: "2026-06-11", sex: "F", age: "58" },
};

function Highlight({ text, region }: { text: string; region: string }) {
  const filled = text.replace("[REGION]", region);
  if (!filled.includes(region)) return <>{filled}</>;
  const parts = filled.split(region);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <mark className={styles.mark}>{region}</mark>}
        </span>
      ))}
    </>
  );
}

export default function ReportExplorer() {
  const [idx, setIdx] = useState(0);
  const c = CASES[idx];
  const m = META[c.id];

  return (
    <section id="reports" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">04 — output</span>
            <h2 className={styles.title}>
              Every line,
              <br />
              traced to a model.
            </h2>
          </div>
          <p className={styles.intro}>
            Reports aren&apos;t free-text guesses. Each section is bound to the
            component that produced it — header from DICOM, findings from the
            classifier and segmenter, impression from the council. Pick a study
            to inspect the provenance.
          </p>
        </div>

        <div className={styles.grid}>
          {/* selector */}
          <div className={styles.picker}>
            {CASES.map((cc, i) => (
              <button
                key={cc.id}
                className={`${styles.pick} ${i === idx ? styles.pickOn : ""}`}
                onClick={() => setIdx(i)}
              >
                <span className={styles.pickTop}>
                  <span className={styles.pickView}>{cc.view}</span>
                  <span className={styles.pickId}>{cc.id}</span>
                </span>
                <span className={styles.pickName}>{cc.primary}</span>
                <span className={styles.pickConf}>
                  <span
                    className={styles.pickConfBar}
                    style={{ width: `${cc.findings[0].p * 100}%` }}
                  />
                </span>
                <span className={styles.pickP}>
                  p={cc.findings[0].p.toFixed(2)}
                </span>
              </button>
            ))}
          </div>

          {/* report document */}
          <article className={styles.doc} key={c.id}>
            <header className={styles.docHead}>
              <div className={styles.docTitle}>
                <span className={styles.docMark}>◳</span>
                <div>
                  <strong>Radiology report</strong>
                  <span>DiagnostIQ · autonomous draft</span>
                </div>
              </div>
              <span className={styles.signed}>
                <span className={styles.signedDot} /> signed
              </span>
            </header>

            <dl className={styles.patient}>
              <div>
                <dt>study</dt>
                <dd>{c.study}</dd>
              </div>
              <div>
                <dt>patient</dt>
                <dd>
                  {`{anon}`} · {m.sex}/{m.age}
                </dd>
              </div>
              <div>
                <dt>exam</dt>
                <dd>{c.view} chest</dd>
              </div>
              <div>
                <dt>date</dt>
                <dd>{m.date}</dd>
              </div>
            </dl>

            <Section src="DICOM 0008/0018" label="Technique">
              {c.report.technique}
            </Section>
            <Section src="PACS prior" label="Comparison">
              {c.report.comparison}
            </Section>
            <Section src="DenseNet-121 ⊕ MedSAM" label="Findings" accent>
              <ul className={styles.findings}>
                {c.report.findings.map((f, i) => (
                  <li key={i}>
                    <Highlight text={f} region={c.seg.region} />
                  </li>
                ))}
              </ul>
            </Section>
            <Section src="3-agent council" label="Impression" accent>
              <ol className={styles.impression}>
                {c.report.impression.map((f, i) => (
                  <li key={i}>{f.replace("[REGION]", c.seg.region)}</li>
                ))}
              </ol>
            </Section>

            <footer className={styles.docFoot}>
              <span>
                council confidence{" "}
                <b className={styles.up}>{c.confidence.after.toFixed(2)}</b>
              </span>
              <span>densenet-121 · medsam · radlm-7b · v2.4</span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

function Section({
  src,
  label,
  accent,
  children,
}: {
  src: string;
  label: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.sec}>
      <div className={styles.secHead}>
        <h3>{label}</h3>
        <span className={`${styles.prov} ${accent ? styles.provAccent : ""}`}>
          <span aria-hidden="true">⟐</span> {src}
        </span>
      </div>
      <div className={styles.secBody}>{children}</div>
    </section>
  );
}
