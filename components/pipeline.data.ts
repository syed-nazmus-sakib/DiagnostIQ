/* ============================================================
   Pipeline cases — real radiographs + per-stage synthetic data.
   Overlay geometry is authored in a 0–400 (x) by 0–500 (y)
   space mapped onto a 4:5 film frame (preserveAspectRatio=none).
   ============================================================ */

export type Finding = { label: string; p: number };

export type AgentMsg = {
  from: string;
  kind: "question" | "confirm" | "flag" | "consensus";
  text: string;
};

export type PipelineCase = {
  id: string;
  img: string;
  view: "AP" | "PA" | "LAT";
  study: string;
  primary: string;
  patient: { date: string; sex: string; age: string };
  /** classification logits, highest first */
  findings: Finding[];
  /** segmentation */
  seg: {
    model: string;
    conf: number;
    areaCm2: number;
    /** polygon in 0-400 x 0-500 space */
    poly: string;
    /** crosshair anatomical points */
    points: [number, number][];
    /** human label for the region */
    region: string;
    regionBn: string;
  };
  report: { technique: string; comparison: string; findings: string[]; impression: string[] };
  reportBn: { technique: string; comparison: string; findings: string[]; impression: string[] };
  debate: AgentMsg[];
  confidence: { before: number; after: number };
};

export const CASES: PipelineCase[] = [
  {
    id: "PX-4471",
    img: "/xrays/ap-pneumothorax.jpg",
    view: "AP",
    study: "0xA39F",
    primary: "Pneumothorax",
    patient: { date: "2026-06-14", sex: "M", age: "34" },
    findings: [
      { label: "Pneumothorax", p: 0.94 },
      { label: "Pleural effusion", p: 0.22 },
      { label: "Atelectasis", p: 0.17 },
      { label: "Cardiomegaly", p: 0.08 },
    ],
    seg: {
      model: "MedSAM · vit-b",
      conf: 0.92,
      areaCm2: 168,
      region: "Left hemithorax",
      regionBn: "বাম হিমথোরাক্স",
      poly: "236,120 292,104 344,138 360,214 338,300 292,322 250,276 240,196",
      points: [
        [300, 168],
        [330, 250],
      ],
    },
    report: {
      technique: "Single AP supine portable chest radiograph.",
      comparison: "No prior study available.",
      findings: [
        "Large left-sided pneumothorax with a visible visceral pleural line over the [REGION]; peripheral lung markings are absent laterally.",
        "Mild rightward shift of the mediastinal structures.",
        "Right internal jugular central venous catheter, tip projecting over the SVC.",
      ],
      impression: [
        "Large left pneumothorax with early mediastinal shift.",
        "Findings conveyed for urgent decompression.",
      ],
    },
    reportBn: {
      technique: "একক AP সুপাইন পোর্টেবল বুক এক্স-রেডিওগ্রাফ।",
      comparison: "পূর্ববর্তী পরীক্ষার তুলনা উপলব্ধ নয়।",
      findings: [
        "[REGION]-এ দৃশ্যমান visceral pleural line সহ বাম পাশের বড় নিমোথোরাক্স; পার্শ্বীয় ফুসফুস চিহ্ন lateral দিকে অনুপস্থিত।",
        "মাঝ বরাবর গঠনগুলো সামান্য ডান দিকে সরে গেছে।",
        "ডান internal jugular central venous catheter, catheter tip SVC-এর উপর projecting।",
      ],
      impression: [
        "প্রাথমিক mediastinal shift সহ বাম পাশের বড় নিমোথোরাক্স।",
        "জরুরি decompression-এর জন্য findings প্রেরণ করা হয়েছে।",
      ],
    },
    debate: [
      { from: "verifier-β", kind: "question", text: "p=0.94 — is the pleural line genuine or a skin fold artifact?" },
      { from: "detector-α", kind: "confirm", text: "Mask tracks an avascular lucent zone; no vessels distal to the line." },
      { from: "radlm-γ", kind: "confirm", text: "Concur. Mediastinal displacement supports a tension component." },
      { from: "verifier-β", kind: "flag", text: "Escalating severity — report must state decompression explicitly." },
      { from: "adjudicator", kind: "consensus", text: "Pneumothorax confirmed; severity escalated to urgent." },
    ],
    confidence: { before: 0.91, after: 0.97 },
  },
  {
    id: "CM-2083",
    img: "/xrays/pa-cardiomegaly.jpg",
    view: "PA",
    study: "0xB7C1",
    primary: "Cardiomegaly",
    patient: { date: "2026-06-12", sex: "F", age: "71" },
    findings: [
      { label: "Cardiomegaly", p: 0.91 },
      { label: "Pulmonary edema", p: 0.63 },
      { label: "Pleural effusion", p: 0.38 },
      { label: "Pneumonia", p: 0.11 },
    ],
    seg: {
      model: "MedSAM · vit-b",
      conf: 0.89,
      areaCm2: 214,
      region: "Cardiac silhouette",
      regionBn: "হৃদয়ের silhouette",
      poly: "150,250 232,238 296,286 300,372 250,420 182,414 150,346 150,288",
      points: [
        [228, 330],
        [180, 300],
      ],
    },
    report: {
      technique: "PA upright chest radiograph.",
      comparison: "Compared to study 0xB6E0, the cardiac silhouette has enlarged.",
      findings: [
        "Enlarged cardiac silhouette involving the [REGION], cardiothoracic ratio 0.61.",
        "Interstitial pulmonary edema with Kerley B lines and vascular cephalization.",
        "Small bilateral pleural effusions with blunting of the costophrenic angles.",
      ],
      impression: [
        "Cardiomegaly with pulmonary venous congestion.",
        "Findings consistent with decompensated heart failure.",
      ],
    },
    reportBn: {
      technique: "PA upright বুক এক্স-রেডিওগ্রাফ।",
      comparison: "study 0xB6E0-এর তুলনায় cardiac silhouette বড় হয়েছে।",
      findings: [
        "[REGION] জড়িত enlarged cardiac silhouette, cardiothoracic ratio 0.61।",
        "Kerley B lines ও vascular cephalization সহ interstitial pulmonary edema।",
        "Costophrenic angles blunted সহ ছোট bilateral pleural effusion।",
      ],
      impression: [
        "Pulmonary venous congestion সহ cardiomegaly।",
        "Decompensated heart failure-এর সাথে সামঞ্জস্যপূর্ণ findings।",
      ],
    },
    debate: [
      { from: "verifier-β", kind: "question", text: "CTR 0.61 on AP can be projectional — is this a true PA?" },
      { from: "detector-α", kind: "confirm", text: "DICOM header reads PA, 180cm SID. Ratio is reliable." },
      { from: "radlm-γ", kind: "confirm", text: "Edema + Kerley lines corroborate cardiac decompensation." },
      { from: "verifier-β", kind: "flag", text: "Effusion p=0.38 below threshold — keep as 'small', not primary." },
      { from: "adjudicator", kind: "consensus", text: "Cardiomegaly with congestion confirmed; effusion noted as minor." },
    ],
    confidence: { before: 0.88, after: 0.95 },
  },
  {
    id: "PE-9925",
    img: "/xrays/lat-effusion.jpg",
    view: "LAT",
    study: "0xC44D",
    primary: "Pleural effusion",
    patient: { date: "2026-06-11", sex: "F", age: "58" },
    findings: [
      { label: "Pleural effusion", p: 0.88 },
      { label: "Atelectasis", p: 0.31 },
      { label: "Consolidation", p: 0.19 },
      { label: "Mass / nodule", p: 0.06 },
    ],
    seg: {
      model: "MedSAM · vit-b",
      conf: 0.9,
      areaCm2: 96,
      region: "Posterior costophrenic recess",
      regionBn: "পৃষ্ঠীয় costophrenic recess",
      poly: "150,372 286,356 348,392 350,452 300,468 188,466 150,430",
      points: [
        [262, 412],
        [320, 430],
      ],
    },
    report: {
      technique: "Left lateral chest radiograph.",
      comparison: "No prior study available.",
      findings: [
        "Layering pleural fluid blunting the [REGION] with a posterior meniscus.",
        "Adjacent compressive atelectasis at the lung base.",
        "No focal consolidation or pneumothorax.",
      ],
      impression: [
        "Moderate posterior pleural effusion.",
        "Correlate clinically; consider thoracentesis.",
      ],
    },
    reportBn: {
      technique: "বাম lateral বুক এক্স-রেডিওগ্রাফ।",
      comparison: "পূর্ববর্তী পরীক্ষার তুলনা উপলব্ধ নয়।",
      findings: [
        "Posterior meniscus সহ [REGION] blunted, layering pleural fluid।",
        "Lung base-এ adjacent compressive atelectasis।",
        "Focal consolidation বা pneumothorax নেই।",
      ],
      impression: [
        "মধ্যম posterior pleural effusion।",
        "Clinically correlate; thoracentesis consider করুন।",
      ],
    },
    debate: [
      { from: "verifier-β", kind: "question", text: "Posterior opacity — effusion or dependent atelectasis?" },
      { from: "detector-α", kind: "confirm", text: "Meniscus geometry + fluid layering favor effusion." },
      { from: "radlm-γ", kind: "confirm", text: "Agree. Atelectasis is secondary, not the lead finding." },
      { from: "verifier-β", kind: "flag", text: "Single view — recommend PA correlation in impression." },
      { from: "adjudicator", kind: "consensus", text: "Effusion confirmed; PA correlation appended." },
    ],
    confidence: { before: 0.86, after: 0.94 },
  },
];

export const STAGES = [
  { n: "01", key: "classify", title: "Classification", model: "DenseNet-121" },
  { n: "02", key: "detect", title: "Region Detection", model: "MedSAM" },
  { n: "03", key: "report", title: "Report Generation", model: "RadLM-7B" },
  { n: "04", key: "verify", title: "Multi-Agent Verification", model: "3-agent council" },
] as const;
