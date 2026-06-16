"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CASES, STAGES, type PipelineCase } from "./pipeline.data";
import { asset } from "@/lib/basePath";
import styles from "./Pipeline.module.css";

/* ---------- helpers ---------- */
type Line = { kind: "h" | "b" | "li" | "num"; text: string; idx?: number };

function buildLines(c: PipelineCase): Line[] {
  const reg = c.seg.region;
  const sub = (s: string) => s.replace("[REGION]", reg);
  const out: Line[] = [];
  out.push({ kind: "h", text: "TECHNIQUE" });
  out.push({ kind: "b", text: c.report.technique });
  out.push({ kind: "h", text: "COMPARISON" });
  out.push({ kind: "b", text: c.report.comparison });
  out.push({ kind: "h", text: "FINDINGS" });
  c.report.findings.forEach((f) => out.push({ kind: "li", text: sub(f) }));
  out.push({ kind: "h", text: "IMPRESSION" });
  c.report.impression.forEach((f, i) => out.push({ kind: "num", text: sub(f), idx: i + 1 }));
  return out;
}

function HiText({ text, region }: { text: string; region: string }) {
  if (!region || !text.includes(region)) return <>{text}</>;
  const parts = text.split(region);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <mark className={styles.regionMark}>{region}</mark>}
        </span>
      ))}
    </>
  );
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ============================================================ */
export default function Pipeline() {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stage, setStage] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = inView;
  const [typed, setTyped] = useState({ l: 0, ch: 0 });
  const [agentStep, setAgentStep] = useState(0);
  const [conf, setConf] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null);

  const c = CASES[caseIndex];
  const lines = useMemo(() => buildLines(c), [c]);

  /* ---- start when scrolled into view ---- */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---- auto-advance state machine ---- */
  useEffect(() => {
    if (!playing || paused) return;
    const durations = [3200, 3600, 6800, c.debate.length * 1250 + 2600];
    const t = setTimeout(() => {
      setStage((s) => {
        if (s < 3) return s + 1;
        setCaseIndex((ci) => (ci + 1) % CASES.length);
        return 0;
      });
    }, durations[stage]);
    return () => clearTimeout(t);
  }, [playing, paused, stage, caseIndex, c.debate.length]);

  /* ---- report typing (stage 2) ---- */
  useEffect(() => {
    setTyped({ l: 0, ch: 0 });
    if (stage !== 2 || !playing) return;
    if (prefersReduced()) {
      setTyped({ l: lines.length, ch: 0 });
      return;
    }
    const iv = setInterval(() => {
      setTyped((t) => {
        if (t.l >= lines.length) return t;
        const cur = lines[t.l];
        const nextCh = t.ch + 3;
        if (nextCh >= cur.text.length) {
          if (reportRef.current)
            reportRef.current.scrollTop = reportRef.current.scrollHeight;
          return { l: t.l + 1, ch: 0 };
        }
        return { l: t.l, ch: nextCh };
      });
    }, 16);
    return () => clearInterval(iv);
  }, [stage, caseIndex, playing, lines]);

  /* ---- agent debate (stage 3) ---- */
  useEffect(() => {
    setAgentStep(0);
    if (stage !== 3 || !playing) return;
    if (prefersReduced()) {
      setAgentStep(c.debate.length);
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setAgentStep(i);
      if (i >= c.debate.length) clearInterval(iv);
    }, 1250);
    return () => clearInterval(iv);
  }, [stage, caseIndex, playing, c.debate.length]);

  /* ---- confidence count-up when consensus reached ---- */
  useEffect(() => {
    const consensus = stage === 3 && agentStep >= c.debate.length;
    const target = consensus ? c.confidence.after : c.confidence.before;
    let raf = 0;
    const start = performance.now();
    const from = conf || c.confidence.before;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 700);
      setConf(from + (target - from) * k);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, agentStep, caseIndex]);

  const consensus = stage === 3 && agentStep >= c.debate.length;

  return (
    <section
      id="pipeline"
      className={`section ${styles.wrap} darkScope`}
      ref={sectionRef}
    >
      <div className="container">
        {/* header */}
        <div className={styles.head}>
          <div>
            <span className="section-index">02 — the pipeline</span>
            <h2 className={styles.title}>
              Four models.
              <br />
              One continuous read.
            </h2>
          </div>
          <p className={styles.intro}>
            A study enters from the left and flows through the council. Each stage
            hands its output to the next — classification seeds detection,
            detection grounds the report, and a panel of agents argues it to
            consensus before anything is signed.
          </p>
        </div>

        {/* stage rail / spine */}
        <div className={styles.rail} role="tablist" aria-label="Pipeline stages">
          <div className={styles.spine}>
            <div
              className={styles.spineFill}
              style={{ width: `${(stage / 3) * 100}%` }}
            />
            <div className={styles.spineFlow} />
          </div>
          {STAGES.map((s, i) => {
            const state = i < stage ? "done" : i === stage ? "active" : "idle";
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={i === stage}
                className={`${styles.node} ${styles[state]}`}
                onClick={() => setStage(i)}
              >
                <span className={styles.nodeDot} aria-hidden="true">
                  {i < stage ? "✓" : s.n}
                </span>
                <span className={styles.nodeText}>
                  <span className={styles.nodeTitle}>{s.title}</span>
                  <span className={styles.nodeModel}>{s.model}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* console: film + panel */}
        <div
          className={styles.console}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className={`${styles.runState} ${paused ? styles.runPaused : ""}`}>
            {paused ? "❚❚ paused — hover off to resume" : "▶ auto-playing · hover to pause"}
          </span>
          {/* ---------- FILM ---------- */}
          <div className={styles.viewerCol}>
            <div className={styles.viewerChrome}>
              <span>
                {c.view} · {c.id}
              </span>
              <span>STUDY {c.study} · {`{anon}`}</span>
            </div>

            <div className={styles.film}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={c.img}
                src={asset(c.img)}
                alt={`${c.view} chest radiograph — ${c.primary}`}
                className={styles.filmImg}
                decoding="async"
              />

              {/* scan sweep during classification */}
              {stage === 0 && <div className={styles.scan} key={`scan-${caseIndex}`} />}

              {/* overlay vector layer */}
              <svg
                className={styles.overlay}
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* segmentation mask appears from stage 1 onward */}
                {stage >= 1 && (
                  <g key={`mask-${caseIndex}`}>
                    <polygon className={styles.maskFill} points={c.seg.poly} />
                    <polygon className={styles.maskLine} points={c.seg.poly} />
                    {c.seg.points.map(([x, y], k) => (
                      <g key={k} className={styles.cx} style={{ animationDelay: `${0.6 + k * 0.2}s` }}>
                        <line x1={x - 9} y1={y} x2={x + 9} y2={y} />
                        <line x1={x} y1={y - 9} x2={x} y2={y + 9} />
                        <circle cx={x} cy={y} r="2.4" />
                      </g>
                    ))}
                  </g>
                )}
              </svg>

              {/* on-image classification HUD (stage 0) */}
              {stage === 0 && (
                <div className={styles.clsHud} key={`cls-${caseIndex}`}>
                  <div className={styles.hudLabel}>CLASSIFIER · top-k</div>
                  {c.findings.map((f, i) => (
                    <div
                      key={f.label}
                      className={`${styles.bar} ${i === 0 ? styles.barLead : ""}`}
                      style={{ animationDelay: `${0.15 + i * 0.13}s` }}
                    >
                      <span className={styles.barName}>{f.label}</span>
                      <span className={styles.barTrack}>
                        <span
                          className={styles.barFill}
                          style={{ width: `${f.p * 100}%`, animationDelay: `${0.15 + i * 0.13}s` }}
                        />
                      </span>
                      <span className={styles.barVal}>{f.p.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* segmentation HUD chip (stage >= 1) */}
              {stage >= 1 && (
                <div className={styles.segChip} key={`seg-${caseIndex}`}>
                  <span className={styles.segDot} />
                  <div>
                    <strong>{c.seg.region}</strong>
                    <span>
                      {c.seg.model} · iou {c.seg.conf.toFixed(2)} · {c.seg.areaCm2} cm²
                    </span>
                  </div>
                </div>
              )}

              {/* corner reticles + window/level meta */}
              <div className={styles.meta}>
                <span>WL 40 · WW 400</span>
                <span>SEG {stage >= 1 ? "ON" : "STBY"}</span>
              </div>
              {(["tl", "tr", "bl", "br"] as const).map((p) => (
                <span key={p} className={`${styles.reticle} ${styles[p]}`} />
              ))}
            </div>

            {/* case selector */}
            <div className={styles.cases}>
              {CASES.map((cc, i) => (
                <button
                  key={cc.id}
                  className={`${styles.caseBtn} ${i === caseIndex ? styles.caseActive : ""}`}
                  onClick={() => {
                    setCaseIndex(i);
                    setStage(0);
                  }}
                >
                  <span className={styles.caseView}>{cc.view}</span>
                  <span className={styles.caseName}>{cc.primary}</span>
                  {i === caseIndex && <span className={styles.caseProg} />}
                </button>
              ))}
            </div>
          </div>

          {/* ---------- PANEL ---------- */}
          <div className={styles.panelCol}>
            <div className={styles.panelHead}>
              <span>{STAGES[stage].n}</span>
              <span>{STAGES[stage].title.toUpperCase()}</span>
              <span className={styles.panelModel}>{STAGES[stage].model}</span>
            </div>

            <div className={styles.panelBody}>
              {/* STAGE 1 — classifier log */}
              {stage === 0 && (
                <div className={styles.log} key={`log-${caseIndex}`}>
                  {[
                    "$ diagnostiq run --task classify",
                    "› loading densenet-121 (chexpert-ft) ............ ok",
                    `› forward pass · 1×1024×1024 ............ 41ms`,
                    "› sigmoid over 14 pathologies ............ done",
                    `» argmax → ${c.findings[0].label} (${c.findings[0].p.toFixed(2)})`,
                    "» routing positive class to segmenter ↘",
                  ].map((l, i) => (
                    <div key={i} style={{ animationDelay: `${i * 0.32}s` }}>
                      {l}
                    </div>
                  ))}
                </div>
              )}

              {/* STAGE 2 — detection metrics */}
              {stage === 1 && (
                <div className={styles.detail} key={`det-${caseIndex}`}>
                  <div className={styles.kv}>
                    <span>model</span>
                    <span>{c.seg.model}</span>
                  </div>
                  <div className={styles.kv}>
                    <span>prompt</span>
                    <span>class · {c.primary}</span>
                  </div>
                  <div className={styles.kv}>
                    <span>region</span>
                    <span className={styles.kvAccent}>{c.seg.region}</span>
                  </div>
                  <div className={styles.kv}>
                    <span>mask iou</span>
                    <span>{c.seg.conf.toFixed(3)}</span>
                  </div>
                  <div className={styles.kv}>
                    <span>area</span>
                    <span>{c.seg.areaCm2} cm²</span>
                  </div>
                  <div className={styles.kv}>
                    <span>boundary</span>
                    <span>{c.seg.poly.split(" ").length} vertices</span>
                  </div>
                  <div className={styles.coordDump}>
                    {c.seg.poly.split(" ").map((pt, i) => (
                      <span key={i}>[{pt}]</span>
                    ))}
                  </div>
                  <p className={styles.handoff}>
                    » region descriptor passed to RadLM context ↘
                  </p>
                </div>
              )}

              {/* STAGE 3 — report */}
              {stage === 2 && (
                <div className={styles.report} ref={reportRef} key={`rep-${caseIndex}`}>
                  {lines.map((ln, i) => {
                    if (i > typed.l) return null;
                    const full = i < typed.l;
                    const shown = full ? ln.text : ln.text.slice(0, typed.ch);
                    const active = i === typed.l && typed.l < lines.length;
                    if (ln.kind === "h")
                      return (
                        <div key={i} className={styles.repHead}>
                          {shown}
                          {active && <span className={styles.caret} />}
                        </div>
                      );
                    const cls =
                      ln.kind === "li"
                        ? styles.repLi
                        : ln.kind === "num"
                        ? styles.repNum
                        : styles.repBody;
                    return (
                      <div key={i} className={cls}>
                        {ln.kind === "num" && <em>{ln.idx}.</em>}
                        {full ? <HiText text={shown} region={c.seg.region} /> : shown}
                        {active && <span className={styles.caret} />}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* STAGE 4 — agent council */}
              {stage === 3 && (
                <div className={styles.council} key={`cnc-${caseIndex}`}>
                  <div className={styles.graph}>
                    {["detector-α", "verifier-β", "radlm-γ"].map((a, i) => {
                      const speaking =
                        agentStep > 0 &&
                        agentStep <= c.debate.length &&
                        c.debate[Math.min(agentStep - 1, c.debate.length - 1)].from === a;
                      return (
                        <span
                          key={a}
                          className={`${styles.agent} ${speaking ? styles.agentLive : ""} ${
                            styles[`agent${i}`]
                          }`}
                        >
                          <span className={styles.agentName}>{a}</span>
                        </span>
                      );
                    })}
                    <span className={`${styles.agent} ${styles.adj} ${consensus ? styles.agentLive : ""}`}>
                      <span className={styles.agentName}>adjudicator</span>
                    </span>
                    <svg className={styles.graphLinks} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M20,22 C50,10 50,40 80,24" />
                      <path d="M20,24 C40,55 60,55 80,76" />
                      <path d="M82,26 C60,55 40,55 22,76" />
                      <path d="M50,82 L50,50" />
                    </svg>
                  </div>

                  <div className={styles.thread}>
                    {c.debate.slice(0, agentStep).map((m, i) => (
                      <div key={i} className={`${styles.msg} ${styles[`k_${m.kind}`]}`}>
                        <span className={styles.msgFrom}>{m.from}</span>
                        <span className={styles.msgText}>{m.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`${styles.verdict} ${consensus ? styles.verdictOn : ""}`}>
                    <span className={styles.check} aria-hidden="true">✓</span>
                    <span className={styles.verdictText}>
                      {consensus ? "CONSENSUS REACHED" : "deliberating…"}
                    </span>
                    <span className={styles.delta}>
                      report confidence&nbsp;
                      <b>{c.confidence.before.toFixed(2)}</b>
                      &nbsp;→&nbsp;
                      <b className={styles.deltaUp}>{conf.toFixed(2)}</b>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
