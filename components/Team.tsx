import Reveal from "./Reveal";
import styles from "./Team.module.css";

const TEAM = [
  {
    role: "Research lab",
    name: "Cortex AI Lab",
    org: "Robotics & Mechatronics Engineering · University of Dhaka",
    focus: "Medical imaging AI · on-device inference · agent verification",
  },
  {
    role: "Product focus",
    name: "DiagnostIQ",
    org: "Chest radiography · 4-stage pipeline",
    focus: "Classification → segmentation → report → council sign-off",
  },
  {
    role: "Clinical pathway",
    name: "Human sign-off required",
    org: "Licensed radiologist review",
    focus: "Every draft report verified before release to PACS",
  },
] as const;

const REGULATORY = [
  {
    step: "01",
    title: "Research preview",
    body: "Current public demo is investigational — not for primary diagnosis.",
    status: "now",
  },
  {
    step: "02",
    title: "Local validation study",
    body: "Bangladeshi chest X-ray cohort with board-certified reference reads.",
    status: "planned",
  },
  {
    step: "03",
    title: "DGDA medical device pathway",
    body: "Registration under the Drug and Cosmetics Act 2023 for diagnostic software.",
    status: "planned",
  },
  {
    step: "04",
    title: "Hospital pilots",
    body: "On-prem deployment at design-partner sites — public and private sector.",
    status: "planned",
  },
] as const;

const TRACTION = [
  { label: "Modality", value: "Chest CR / DX" },
  { label: "Deployment", value: "On-prem · VPC" },
  { label: "Languages", value: "English · Bangla (roadmap)" },
  { label: "Stage", value: "Research preview" },
] as const;

export default function Team() {
  return (
    <section id="team" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">09 — team &amp; path</span>
            <h2 className={styles.title}>
              University-born.
              <br />
              Clinically grounded.
            </h2>
          </div>
          <p className={styles.intro}>
            DiagnostIQ is developed at Cortex AI Lab, University of Dhaka — with
            a clear regulatory and validation roadmap for Bangladesh. We welcome
            hospital design partners, clinical advisors, and research
            collaborators.
          </p>
        </div>

        <div className={styles.teamGrid}>
          {TEAM.map((t, i) => (
            <Reveal key={t.name} className={styles.card} delay={i * 60}>
              <span className={styles.cardRole}>{t.role}</span>
              <h3 className={styles.cardName}>{t.name}</h3>
              <span className={styles.cardOrg}>{t.org}</span>
              <p className={styles.cardFocus}>{t.focus}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.traction}>
          {TRACTION.map((t) => (
            <div key={t.label} className={styles.tractionItem}>
              <span className={styles.tractionK}>{t.label}</span>
              <span className={styles.tractionV}>{t.value}</span>
            </div>
          ))}
        </Reveal>

        <div className={styles.regHead}>
          <h3 className={styles.regTitle}>Validation &amp; regulatory roadmap</h3>
          <p className={styles.regIntro}>
            Transparent path from research preview to hospital deployment in
            Bangladesh.
          </p>
        </div>

        <ol className={styles.regSteps}>
          {REGULATORY.map((r, i) => (
            <Reveal key={r.step} className={styles.regRow} delay={i * 50} as="li">
              <span className={styles.regStep}>{r.step}</span>
              <div className={styles.regBody}>
                <div className={styles.regTop}>
                  <h4>{r.title}</h4>
                  <span className={`${styles.regBadge} ${styles[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <p>{r.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
