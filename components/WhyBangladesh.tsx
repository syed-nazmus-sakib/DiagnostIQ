"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import styles from "./WhyBangladesh.module.css";

export default function WhyBangladesh() {
  const { t } = useLocale();
  const w = t.whyBd;

  return (
    <section id="why-bd" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">{w.section}</span>
            <h2 className={styles.title}>
              {w.titleLine1}
              <br />
              {w.titleLine2}
            </h2>
          </div>
          <p className={styles.intro}>{w.intro}</p>
        </div>

        <div className={styles.stats}>
          {w.stats.map((s, i) => (
            <Reveal key={s.label} className={styles.stat} delay={i * 50}>
              <span className={styles.statV}>
                {s.value}
                <em>{s.unit}</em>
              </span>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statSub}>{s.sub}</span>
              <span className={styles.statCite}>{s.cite}</span>
            </Reveal>
          ))}
        </div>

        <div className={styles.casesHead}>
          <h3 className={styles.casesTitle}>{w.whoFor}</h3>
          <p className={styles.casesIntro}>{w.whoIntro}</p>
        </div>

        <div className={styles.cases}>
          {w.useCases.map((u, i) => (
            <Reveal key={u.title} className={styles.case} delay={i * 70}>
              <span className={styles.caseTag}>{u.tag}</span>
              <h4 className={styles.caseTitle}>{u.title}</h4>
              <p className={styles.caseBody}>{u.body}</p>
              <span className={styles.caseFit}>{u.fit}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
