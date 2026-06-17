import Reveal from "./Reveal";
import styles from "./WhyBangladesh.module.css";

const STATS = [
  {
    value: "~4",
    unit: "per million",
    label: "Radiologists nationally",
    sub: "vs. ~100+ recommended ratio",
    cite: "BJMS / Bonik Barta",
  },
  {
    value: "Days",
    unit: "to weeks",
    label: "Report delays outside Dhaka",
    sub: "District & Upazila hospitals",
    cite: "Bonik Barta, 2024",
  },
  {
    value: "170M+",
    unit: "people",
    label: "Population served",
    sub: "Chest X-ray is highest-volume modality",
    cite: "WHO SEARO",
  },
  {
    value: "On-prem",
    unit: "deploy",
    label: "No patient data egress",
    sub: "Runs inside hospital VPC",
    cite: "DiagnostIQ architecture",
  },
] as const;

const USE_CASES = [
  {
    tag: "Public sector",
    title: "Upazila & district hospitals",
    body:
      "Draft chest X-ray reports overnight when no radiologist is on site. A licensed specialist signs off remotely or in the morning.",
    fit: "DGHS · Upazila Health Complex",
  },
  {
    tag: "Private sector",
    title: "Hospital backlog reduction",
    body:
      "Triage urgent findings and pre-structure reports for high-volume private chains — radiologists review, edit, and sign.",
    fit: "Private hospitals · teleradiology",
  },
  {
    tag: "Screening",
    title: "TB & NCD camps",
    body:
      "Support mobile chest X-ray screening with consistent, traceable draft reports — critical for TB and heart-failure detection.",
    fit: "NGO health · screening programs",
  },
] as const;

export default function WhyBangladesh() {
  return (
    <section id="why-bd" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">02 — why bangladesh</span>
            <h2 className={styles.title}>
              Built for a country
              <br />
              that needs reads now.
            </h2>
            <p className={styles.bangla} lang="bn">
              বাংলাদেশের জন্য স্বয়ংক্রিয় রেডিওলজি রিপোর্ট — বুকের এক্স-রে
              দ্রুত পড়ুন, বিশেষজ্ঞের সাইন-অফে।
            </p>
          </div>
          <p className={styles.intro}>
            Bangladesh has a fraction of the radiologists it needs, concentrated
            in Dhaka. Patients in district and Upazila hospitals wait days or
            weeks for chest X-ray reports. DiagnostIQ is designed at University of
            Dhaka to close that gap — on-prem, human-in-the-loop, and
            Bangla-ready.
          </p>
        </div>

        <div className={styles.stats}>
          {STATS.map((s, i) => (
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
          <h3 className={styles.casesTitle}>Who it&apos;s for</h3>
          <p className={styles.casesIntro}>
            Three entry points into the same pipeline — public hospitals,
            private chains, and screening programs.
          </p>
        </div>

        <div className={styles.cases}>
          {USE_CASES.map((u, i) => (
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
