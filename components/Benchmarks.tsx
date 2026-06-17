"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Benchmarks.module.css";

/* ---------- count-up ---------- */
function CountUp({
  to,
  decimals = 2,
  suffix = "",
  dur = 1100,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  dur?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (n: number) => {
          const k = Math.min(1, (n - start) / dur);
          setV(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, dur]);
  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const HEAD = [
  { v: 0.912, d: 3, label: "macro AUROC", sub: "14-class classification", up: true },
  { v: 0.89, d: 2, label: "mean Dice", sub: "region segmentation", up: true },
  { v: 0.48, d: 2, label: "RadGraph-F1", sub: "report factuality", up: true },
  { v: 3.5, d: 1, suffix: "%", label: "hallucinated findings", sub: "after council review", up: false },
];

const FINDINGS: [string, number][] = [
  ["Pneumothorax", 0.95],
  ["Pleural effusion", 0.94],
  ["Cardiomegaly", 0.93],
  ["Edema", 0.92],
  ["Emphysema", 0.91],
  ["Consolidation", 0.9],
  ["Atelectasis", 0.88],
  ["Mass", 0.86],
  ["Pleural thickening", 0.84],
  ["Fibrosis", 0.83],
  ["Infiltration", 0.81],
  ["Pneumonia", 0.8],
  ["Nodule", 0.79],
  ["Hernia", 0.96],
];

const IMPACT = [
  { label: "RadGraph-F1", baseline: 0.41, council: 0.48, max: 0.6, fmt: (n: number) => n.toFixed(2), better: "up" },
  { label: "Hallucinated findings", baseline: 12.0, council: 3.5, max: 14, fmt: (n: number) => `${n.toFixed(1)}%`, better: "down" },
] as const;

// map AUROC to a stretched 0–100 bar for visual contrast
const barW = (v: number) => Math.max(4, ((v - 0.74) / (0.985 - 0.74)) * 100);

export default function Benchmarks() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setLive(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="benchmarks" className={`section ${styles.wrap}`} ref={ref}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">07 — research metrics</span>
            <h2 className={styles.title}>
              Targets,
              <br />
              not claims.
            </h2>
          </div>
          <p className={styles.intro}>
            Illustrative research targets for the DiagnostIQ stack. Formal
            validation on a Bangladeshi cohort is planned — figures below are
            not from a regulatory study.
          </p>
        </div>

        {/* headline metrics */}
        <div className={styles.metrics}>
          {HEAD.map((m) => (
            <div key={m.label} className={styles.metric}>
              <span className={`${styles.metricV} ${m.up ? "" : styles.metricDown}`}>
                <CountUp to={m.v} decimals={m.d} suffix={m.suffix ?? ""} />
              </span>
              <span className={styles.metricLabel}>{m.label}</span>
              <span className={styles.metricSub}>
                <span className={styles.arrow}>{m.up ? "▲" : "▼"}</span>
                {m.sub}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.lower}>
          {/* coverage grid */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3>Per-finding AUROC</h3>
              <span>14 pathologies</span>
            </div>
            <div className={styles.cov}>
              {FINDINGS.map(([name, v], i) => (
                <div key={name} className={styles.cell}>
                  <span className={styles.cellName}>{name}</span>
                  <span className={styles.cellTrack}>
                    <span
                      className={styles.cellBar}
                      style={{
                        width: live ? `${barW(v)}%` : "0%",
                        transitionDelay: `${i * 45}ms`,
                      }}
                    />
                  </span>
                  <span className={styles.cellVal}>{v.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* council impact */}
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <h3>Council impact</h3>
              <span>baseline vs. verified</span>
            </div>
            <div className={styles.impact}>
              {IMPACT.map((m) => (
                <div key={m.label} className={styles.impactRow}>
                  <span className={styles.impactLabel}>{m.label}</span>
                  <div className={styles.impactBars}>
                    <div className={styles.impactBar}>
                      <span
                        className={styles.impactFillBase}
                        style={{ width: live ? `${(m.baseline / m.max) * 100}%` : "0%" }}
                      />
                      <em>{m.fmt(m.baseline)}</em>
                      <i>single-LM</i>
                    </div>
                    <div className={styles.impactBar}>
                      <span
                        className={`${styles.impactFill} ${
                          m.better === "down" ? styles.impactGood : ""
                        }`}
                        style={{
                          width: live ? `${(m.council / m.max) * 100}%` : "0%",
                          transitionDelay: "120ms",
                        }}
                      />
                      <em>{m.fmt(m.council)}</em>
                      <i>+ council</i>
                    </div>
                  </div>
                </div>
              ))}
              <p className={styles.impactNote}>
                The verification council raises factual overlap and cuts
                unsupported findings by <b>3.4×</b> — the single largest quality
                lever in the stack.
              </p>
            </div>
          </div>
        </div>

        <p className={styles.disclaimer}>
          Figures are illustrative of the system architecture and not from a
          regulatory study. DiagnostIQ is a research preview.
        </p>
      </div>
    </section>
  );
}
