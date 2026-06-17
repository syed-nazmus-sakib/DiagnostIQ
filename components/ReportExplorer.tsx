"use client";

import { useState } from "react";
import { CASES } from "./pipeline.data";
import { useLocale, LangToggle } from "./LocaleProvider";
import styles from "./ReportExplorer.module.css";

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
  const { locale, t } = useLocale();
  const [idx, setIdx] = useState(0);
  const c = CASES[idx];
  const m = c.patient;
  const bn = locale === "bn";
  const report = bn ? c.reportBn : c.report;
  const region = bn ? c.seg.regionBn : c.seg.region;

  return (
    <section id="reports" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">{t.reports.section}</span>
            <h2 className={styles.title}>
              {t.reports.titleLine1}
              <br />
              {t.reports.titleLine2}
            </h2>
          </div>
          <p className={styles.intro}>{t.reports.intro}</p>
        </div>

        <div className={styles.grid}>
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

          <article className={styles.doc} key={`${c.id}-${locale}`}>
            <header className={styles.docHead}>
              <div className={styles.docTitle}>
                <span className={styles.docMark}>◳</span>
                <div>
                  <strong>{t.reports.docTitle}</strong>
                  <span>{t.reports.docSub}</span>
                </div>
              </div>
              <div className={styles.docActions}>
                <span className={styles.langLabel}>{t.reports.langToggle}</span>
                <LangToggle className="langToggle" compact />
                <span className={styles.signed}>
                  <span className={styles.signedDot} /> {t.reports.signed}
                </span>
              </div>
            </header>

            <dl className={styles.patient}>
              <div>
                <dt>{t.reports.study}</dt>
                <dd>{c.study}</dd>
              </div>
              <div>
                <dt>{t.reports.patient}</dt>
                <dd>
                  {`{anon}`} · {m.sex}/{m.age}
                </dd>
              </div>
              <div>
                <dt>{t.reports.exam}</dt>
                <dd>
                  {c.view} chest
                </dd>
              </div>
              <div>
                <dt>{t.reports.date}</dt>
                <dd>{m.date}</dd>
              </div>
            </dl>

            <Section src="DICOM 0008/0018" label={t.reports.technique}>
              {report.technique}
            </Section>
            <Section src="PACS prior" label={t.reports.comparison}>
              {report.comparison}
            </Section>
            <Section src="DenseNet-121 ⊕ MedSAM" label={t.reports.findings} accent>
              <ul className={styles.findings} lang={bn ? "bn" : "en"}>
                {report.findings.map((f, i) => (
                  <li key={i}>
                    <Highlight text={f} region={region} />
                  </li>
                ))}
              </ul>
            </Section>
            <Section src="3-agent council" label={t.reports.impression} accent>
              <ol className={styles.impression} lang={bn ? "bn" : "en"}>
                {report.impression.map((f, i) => (
                  <li key={i}>{f.replace("[REGION]", region)}</li>
                ))}
              </ol>
            </Section>

            <footer className={styles.docFoot}>
              <span>
                {t.reports.confidence}{" "}
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
