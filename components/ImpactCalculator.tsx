"use client";

import { useMemo, useState } from "react";
import { useLocale } from "./LocaleProvider";
import styles from "./ImpactCalculator.module.css";

const TARGET_HOURS = 4;

function fmt(n: number) {
  return new Intl.NumberFormat("en-BD").format(Math.round(n));
}

export default function ImpactCalculator() {
  const { t } = useLocale();
  const i = t.impact;

  const [xrays, setXrays] = useState(800);
  const [delayDays, setDelayDays] = useState(5);
  const [transferPct, setTransferPct] = useState(20);
  const [transferCost, setTransferCost] = useState(2500);

  const results = useMemo(() => {
    const targetDays = TARGET_HOURS / 24;
    const delayReductionPerStudy = Math.max(0, delayDays - targetDays);
    const delaySavedDays = xrays * delayReductionPerStudy;
    const transfersAvoided = xrays * (transferPct / 100);
    const costSavedBdt = transfersAvoided * transferCost;
    return { delaySavedDays, costSavedBdt, annualBdt: costSavedBdt * 12 };
  }, [xrays, delayDays, transferPct, transferCost]);

  return (
    <section id="impact" className={`section ${styles.wrap}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="section-index">{i.section}</span>
            <h2 className={styles.title}>
              {i.titleLine1}
              <br />
              {i.titleLine2}
            </h2>
          </div>
          <p className={styles.intro}>{i.intro}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.panel}>
            <h3 className={styles.panelTitle}>{i.resultsTitle}</h3>

            <label className={styles.field}>
              <span className={styles.label}>{i.xrays}</span>
              <input
                type="range"
                min={100}
                max={5000}
                step={50}
                value={xrays}
                onChange={(e) => setXrays(Number(e.target.value))}
              />
              <span className={styles.val}>{fmt(xrays)}</span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{i.delay}</span>
              <input
                type="range"
                min={1}
                max={14}
                step={1}
                value={delayDays}
                onChange={(e) => setDelayDays(Number(e.target.value))}
              />
              <span className={styles.val}>{delayDays}</span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{i.transferPct}</span>
              <input
                type="range"
                min={5}
                max={60}
                step={5}
                value={transferPct}
                onChange={(e) => setTransferPct(Number(e.target.value))}
              />
              <span className={styles.val}>{transferPct}%</span>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{i.transferCost}</span>
              <input
                type="range"
                min={500}
                max={10000}
                step={250}
                value={transferCost}
                onChange={(e) => setTransferCost(Number(e.target.value))}
              />
              <span className={styles.val}>৳{fmt(transferCost)}</span>
            </label>
          </div>

          <div className={styles.results}>
            <div className={styles.result}>
              <span className={styles.resultK}>{i.delaySaved}</span>
              <span className={styles.resultV}>
                {fmt(results.delaySavedDays)}
                <em>{i.delayUnit}</em>
              </span>
            </div>
            <div className={styles.result}>
              <span className={styles.resultK}>{i.costSaved}</span>
              <span className={styles.resultV}>
                ৳{fmt(results.costSavedBdt)}
                <em>{i.costUnit}</em>
              </span>
            </div>
            <div className={`${styles.result} ${styles.resultAccent}`}>
              <span className={styles.resultK}>{i.annual}</span>
              <span className={styles.resultV}>
                ৳{fmt(results.annualBdt)}
              </span>
            </div>
            <p className={styles.disclaimer}>{i.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
