"use client";

import Reveal from "./Reveal";
import { useLocale } from "./LocaleProvider";
import styles from "./PatientJourney.module.css";

export default function PatientJourney() {
  const { t } = useLocale();
  const j = t.journey;

  return (
    <section id="journey" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">{j.section}</span>
            <h2 className={styles.title}>
              {j.titleLine1}
              <br />
              {j.titleLine2}
            </h2>
          </div>
          <p className={styles.intro}>{j.intro}</p>
        </div>

        <div className={styles.track}>
          <div className={styles.spine} aria-hidden="true">
            <span className={styles.spineFlow} />
          </div>

          {j.steps.map((step, i) => (
            <Reveal key={step.title} className={styles.step} delay={i * 80}>
              <div className={styles.marker}>
                <span className={styles.markerDot}>{i + 1}</span>
              </div>
              <div className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.time}>{step.time}</span>
                  <span className={styles.place}>{step.place}</span>
                </div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardBody}>{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className={styles.footnote}>{j.footnote}</p>
      </div>
    </section>
  );
}
