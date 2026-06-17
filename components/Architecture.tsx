import Reveal from "./Reveal";
import styles from "./Architecture.module.css";

type Node = {
  n: string;
  name: string;
  kind: string;
  io?: "in" | "out";
  specs: [string, string][];
  metric?: { label: string; value: string };
  pass?: string;
};

const NODES: Node[] = [
  {
    n: "00",
    name: "Ingest",
    kind: "DICOM intake",
    io: "in",
    specs: [
      ["modality", "Chest CR / DX"],
      ["pipeline", "de-identify · window · resize"],
      ["tensor", "1 × 1024², float16"],
    ],
    pass: "normalized image tensor",
  },
  {
    n: "01",
    name: "DenseNet-121",
    kind: "CNN classifier",
    specs: [
      ["params", "8.0 M"],
      ["training", "CheXpert + NIH ChestX-ray14"],
      ["head", "14-way multi-label sigmoid"],
    ],
    metric: { label: "macro AUROC", value: "0.91" },
    pass: "positive class + Grad-CAM ROI",
  },
  {
    n: "02",
    name: "MedSAM",
    kind: "promptable segmenter · ViT-B",
    specs: [
      ["params", "91 M"],
      ["training", "SA-Med2D · 1.6 M masks"],
      ["prompt", "class-conditioned box"],
    ],
    metric: { label: "Dice", value: "0.89" },
    pass: "binary mask + region descriptor",
  },
  {
    n: "03",
    name: "RadLM-7B",
    kind: "instruction-tuned decoder",
    specs: [
      ["params", "7.0 B"],
      ["training", "MIMIC-CXR structured reports"],
      ["context", "image tags + region descriptor"],
    ],
    metric: { label: "RadGraph-F1", value: "0.48" },
    pass: "draft findings + impression",
  },
  {
    n: "04",
    name: "3-Agent Council",
    kind: "debate + adjudication",
    specs: [
      ["agents", "detector · verifier · radiologist-LM"],
      ["protocol", "≤ 4 rounds · self-consistency"],
      ["gate", "confidence threshold 0.90"],
    ],
    metric: { label: "Δ confidence", value: "+0.06" },
    pass: "verdict + corrections",
  },
  {
    n: "05",
    name: "Signed report",
    kind: "structured output",
    io: "out",
    specs: [
      ["format", "RadLex-structured sections"],
      ["traceability", "per-section provenance"],
      ["control", "human sign-off"],
    ],
  },
];

const STATS: [string, string, string][] = [
  ["modality", "Chest CR / DX", "frontal + lateral"],
  ["stack params", "7.1 B", "across 4 models"],
  ["latency", "3.2 s", "per study, p50"],
  ["deployment", "VPC / on-prem", "no data egress"],
];

export default function Architecture() {
  return (
    <section id="architecture" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">05 — architecture</span>
            <h2 className={styles.title}>
              The stack
              <br />
              behind the read.
            </h2>
          </div>
          <p className={styles.intro}>
            Four specialized models, wired in series. Each is small enough to
            audit on its own, and every edge carries a typed payload — so the
            report can always be traced back to the pixels that produced it.
          </p>
        </div>

        {/* vertical schematic */}
        <ol className={styles.stack}>
          {NODES.map((node, i) => (
            <li key={node.n} className={styles.row}>
              <Reveal className={styles.marker} delay={i * 60}>
                <span
                  className={`${styles.dot} ${
                    node.io ? styles.dotIo : styles.dotModel
                  }`}
                >
                  {node.io === "in" ? "↧" : node.io === "out" ? "✓" : node.n}
                </span>
              </Reveal>

              <Reveal className={styles.card} delay={i * 60}>
                <div className={styles.cardHead}>
                  <div>
                    <span className={styles.kind}>{node.kind}</span>
                    <h3 className={styles.name}>{node.name}</h3>
                  </div>
                  {node.metric && (
                    <span className={styles.metric}>
                      <em>{node.metric.value}</em>
                      <span>{node.metric.label}</span>
                    </span>
                  )}
                </div>

                <dl className={styles.specs}>
                  {node.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>

                {node.pass && (
                  <div className={styles.pass}>
                    <span className={styles.passArrow} aria-hidden="true">↓</span>
                    passes&nbsp;<b>{node.pass}</b>
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>

        {/* system stats */}
        <Reveal className={styles.stats}>
          {STATS.map(([k, v, sub]) => (
            <div key={k} className={styles.stat}>
              <span className={styles.statK}>{k}</span>
              <span className={styles.statV}>{v}</span>
              <span className={styles.statSub}>{sub}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
