export type Locale = "en" | "bn";

export type Localized<T> = Record<Locale, T>;

export type ReportBlock = {
  technique: string;
  comparison: string;
  findings: string[];
  impression: string[];
};

export type UiCopy = {
  nav: {
    bangladesh: string;
    pipeline: string;
    reports: string;
    team: string;
    journey: string;
    impact: string;
    status: string;
    cta: string;
  };
  hero: {
    mastheadLeft: string;
    mastheadRight: string;
    chip: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    lede: string;
    ctaPrimary: string;
    ctaGhost: string;
    demoLabel: string;
    demoMeta: string;
    stats: { findings: string; findingsSub: string; dice: string; diceSub: string; radgraph: string; radgraphSub: string; latency: string; latencySub: string };
    cardSigned: string;
    cardSnippet: string;
  };
  whyBd: {
    section: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    whoFor: string;
    whoIntro: string;
    stats: { value: string; unit: string; label: string; sub: string; cite: string }[];
    useCases: { tag: string; title: string; body: string; fit: string }[];
  };
  journey: {
    section: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    steps: { time: string; place: string; title: string; body: string }[];
    footnote: string;
  };
  reports: {
    section: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    docTitle: string;
    docSub: string;
    signed: string;
    study: string;
    patient: string;
    exam: string;
    date: string;
    technique: string;
    comparison: string;
    findings: string;
    impression: string;
    confidence: string;
    langToggle: string;
  };
  access: {
    section: string;
    title: string;
    sub: string;
    namePh: string;
    emailPh: string;
    orgPh: string;
    msgPh: string;
    submit: string;
    submitting: string;
    note: string;
    confirmTitle: string;
    confirmSub: string;
    safetyTitle: string;
    safetyBn: string;
    safetyEn: string;
    safetyList: string[];
    footerTagline: string;
    footerBangla: string;
    footerStatus: string;
  };
  impact: {
    section: string;
    titleLine1: string;
    titleLine2: string;
    intro: string;
    xrays: string;
    delay: string;
    transferPct: string;
    transferCost: string;
    resultsTitle: string;
    delaySaved: string;
    delayUnit: string;
    costSaved: string;
    costUnit: string;
    annual: string;
    disclaimer: string;
  };
  intents: { hospital: string; investor: string; research: string };
};

export const COPY: Localized<UiCopy> = {
  en: {
    nav: {
      bangladesh: "Bangladesh",
      pipeline: "Pipeline",
      reports: "Reports",
      team: "Team",
      journey: "Journey",
      impact: "Impact",
      status: "research preview",
      cta: "Request access",
    },
    hero: {
      mastheadLeft: "Cortex AI Lab · Robotics & Mechatronics Eng.",
      mastheadRight: "Chest radiography · v2.4",
      chip: "AI radiology · research preview",
      titleLine1: "Autonomous",
      titleLine2: "radiology",
      titleAccent: "reporting.",
      lede:
        "One pipeline reads a chest radiograph the way a clinician does — classify the finding, segment the region, draft the report, and let a council of agents verify it before sign-off.",
      ctaPrimary: "See the pipeline",
      ctaGhost: "Request access",
      demoLabel: "interactive demo",
      demoMeta: "pipeline 4 / 4 · preview",
      stats: {
        findings: "Findings",
        findingsSub: "pathology classes",
        dice: "Mean Dice",
        diceSub: "region segmentation",
        radgraph: "RadGraph-F1",
        radgraphSub: "report factuality",
        latency: "Latency",
        latencySub: "sec / study",
      },
      cardSigned: "✓ signed",
      cardSnippet: "Large left pneumothorax with early mediastinal shift.",
    },
    whyBd: {
      section: "02 — why bangladesh",
      titleLine1: "Built for a country",
      titleLine2: "that needs reads now.",
      intro:
        "Bangladesh has a fraction of the radiologists it needs, concentrated in Dhaka. Patients in district and Upazila hospitals wait days or weeks for chest X-ray reports. DiagnostIQ is designed at University of Dhaka to close that gap — on-prem, human-in-the-loop, and Bangla-ready.",
      whoFor: "Who it's for",
      whoIntro:
        "Three entry points into the same pipeline — public hospitals, private chains, and screening programs.",
      stats: [
        { value: "~4", unit: "per million", label: "Radiologists nationally", sub: "vs. ~100+ recommended ratio", cite: "BJMS / Bonik Barta" },
        { value: "Days", unit: "to weeks", label: "Report delays outside Dhaka", sub: "District & Upazila hospitals", cite: "Bonik Barta, 2024" },
        { value: "170M+", unit: "people", label: "Population served", sub: "Chest X-ray is highest-volume modality", cite: "WHO SEARO" },
        { value: "On-prem", unit: "deploy", label: "No patient data egress", sub: "Runs inside hospital VPC", cite: "DiagnostIQ architecture" },
      ],
      useCases: [
        { tag: "Public sector", title: "Upazila & district hospitals", body: "Draft chest X-ray reports overnight when no radiologist is on site. A licensed specialist signs off remotely or in the morning.", fit: "DGHS · Upazila Health Complex" },
        { tag: "Private sector", title: "Hospital backlog reduction", body: "Triage urgent findings and pre-structure reports for high-volume private chains — radiologists review, edit, and sign.", fit: "Private hospitals · teleradiology" },
        { tag: "Screening", title: "TB & NCD camps", body: "Support mobile chest X-ray screening with consistent, traceable draft reports — critical for TB and heart-failure detection.", fit: "NGO health · screening programs" },
      ],
    },
    journey: {
      section: "03 — patient journey",
      titleLine1: "From Rangpur",
      titleLine2: "to signed report.",
      intro:
        "A real workflow DiagnostIQ is designed for — rural capture, local AI draft, specialist sign-off without moving the patient to Dhaka.",
      steps: [
        { time: "2:14 AM", place: "Rangpur Upazila", title: "Chest X-ray captured", body: "Portable CR at Upazila Health Complex. No radiologist on site overnight." },
        { time: "2:18 AM", place: "On-prem server", title: "DiagnostIQ drafts report", body: "Four-stage pipeline runs locally. Structured Bangla/English draft ready in minutes." },
        { time: "7:40 AM", place: "Rajshahi", title: "Radiologist signs off", body: "Licensed specialist reviews via teleradiology, edits if needed, and signs — patient stays in Rangpur." },
      ],
      footnote: "Illustrative timeline · human sign-off required · research preview",
    },
    reports: {
      section: "06 — output",
      titleLine1: "Every line,",
      titleLine2: "traced to a model.",
      intro:
        "Reports aren't free-text guesses. Each section is bound to the component that produced it. Toggle Bangla to see clinician-ready draft reports.",
      docTitle: "Radiology report",
      docSub: "DiagnostIQ · autonomous draft",
      signed: "signed",
      study: "study",
      patient: "patient",
      exam: "exam",
      date: "date",
      technique: "Technique",
      comparison: "Comparison",
      findings: "Findings",
      impression: "Impression",
      confidence: "council confidence",
      langToggle: "Report language",
    },
    access: {
      section: "09 — contact",
      title: "Partner with us in Bangladesh.",
      sub: "Hospitals, investors, and researchers — tell us how you'd like to work with DiagnostIQ. We onboard design partners in small cohorts and deploy entirely inside your environment.",
      namePh: "Your name",
      emailPh: "name@hospital.org",
      orgPh: "Organization (hospital, fund, university…)",
      msgPh: "Tell us about your interest — pilot site, investment, or research…",
      submit: "Send inquiry",
      submitting: "Sending…",
      note: "On-prem deployment · no training on your studies · Bangla reports supported",
      confirmTitle: "Request received.",
      confirmSub: "We'll reach out shortly.",
      safetyTitle: "Research preview — not for diagnostic use",
      safetyBn:
        "গবেষণামূলক প্রদর্শন — রোগ নির্ণয়ের জন্য নয়। প্রতিটি রিপোর্ট লাইসেন্সপ্রাপ্ত রেডিওলজিস্ট-এর সাইন-অফ ছাড়া ব্যবহার করা যাবে না।",
      safetyEn:
        "DiagnostIQ is investigational — not FDA-cleared or CE-marked, and not DGDA-registered. Every output requires review and sign-off by a licensed radiologist.",
      safetyList: [
        "Not a medical device (research preview)",
        "Human-in-the-loop sign-off required",
        "De-identified data only · no PHI retained",
      ],
      footerTagline: "Autonomous radiology reporting for Bangladesh.",
      footerBangla: "",
      footerStatus: "research preview",
    },
    impact: {
      section: "08 — impact estimate",
      titleLine1: "What faster reads",
      titleLine2: "could mean.",
      intro:
        "Illustrative calculator for hospital planners and grant applications. Adjust inputs to match your facility — outputs are estimates, not clinical claims.",
      xrays: "Chest X-rays per month",
      delay: "Average report delay (days)",
      transferPct: "Patients who travel for reads (%)",
      transferCost: "Average travel cost (BDT)",
      resultsTitle: "Estimated monthly impact",
      delaySaved: "Patient-days of delay reduced",
      delayUnit: "days / month",
      costSaved: "Travel costs potentially avoided",
      costUnit: "BDT / month",
      annual: "Annual travel savings (estimate)",
      disclaimer: "Illustrative model only · assumes ~4-hour draft turnaround · not a clinical or financial guarantee",
    },
    intents: {
      hospital: "Hospital or clinic pilot",
      investor: "Investor or partner",
      research: "Research collaboration",
    },
  },
  bn: {
    nav: {
      bangladesh: "বাংলাদেশ",
      pipeline: "পাইপলাইন",
      reports: "রিপোর্ট",
      team: "দল",
      journey: "যাত্রা",
      impact: "প্রভাব",
      status: "গবেষণা প্রদর্শন",
      cta: "যোগাযোগ করুন",
    },
    hero: {
      mastheadLeft: "কর্টেক্স AI ল্যাব · রোবোটিক্স ও মেকাট্রনিক্স ইঞ্জি.",
      mastheadRight: "বুক রেডিওগ্রাফি · v2.4",
      chip: "AI রেডিওলজি · গবেষণা প্রদর্শন",
      titleLine1: "স্বয়ংক্রিয়",
      titleLine2: "রেডিওলজি",
      titleAccent: "রিপোর্টিং।",
      lede:
        "একটি পাইপলাইন বুকের এক্স-রে কlinician-এর মতো পড়ে — abnormal finding শনাক্ত, region চিহ্নিত, রিপোর্ট তৈরি, এবং sign-off-এর আগে agent council যাচাই করে।",
      ctaPrimary: "পাইপলাইন দেখুন",
      ctaGhost: "যোগাযোগ করুন",
      demoLabel: "ইন্টারঅ্যাক্টিভ ডেমো",
      demoMeta: "পাইপলাইন ৪ / ৪ · প্রদর্শন",
      stats: {
        findings: "Finding",
        findingsSub: "pathology class",
        dice: "Mean Dice",
        diceSub: "region segmentation",
        radgraph: "RadGraph-F1",
        radgraphSub: "রিপোর্ট factuality",
        latency: "Latency",
        latencySub: "sec / study",
      },
      cardSigned: "✓ signed",
      cardSnippet: "বাম পাশের বড় pneumothorax, প্রাথমিক mediastinal shift সহ।",
    },
    whyBd: {
      section: "০২ — কেন বাংলাদেশ",
      titleLine1: "এমন একটি দেশের জন্য",
      titleLine2: "যেখানে read দরকার এখনই।",
      intro:
        "বাংলাদেশে প্রয়োজনীয় radiologist-এর অল্প অংশ আছে, বেশিরভাগ ঢাকায় কেন্দ্রীভূত। জেলা ও উপজেলা হাসপাতালে বুকের এক্স-রে রিপোর্ট পেতে দিন বা সপ্তাহ লাগে। ঢাকা বিশ্ববিদ্যালয়ে তৈরি DiagnostIQ এই gap কমাতে — on-prem, human-in-the-loop, বাংলা-প্রস্তুত।",
      whoFor: "কার জন্য",
      whoIntro:
        "একই পাইপলাইন, তিনটি প্রবেশপথ — সরকারি হাসপাতাল, private chain, এবং screening program।",
      stats: [
        { value: "~৪", unit: "প্রতি মিলিয়ন", label: "জাতীয় radiologist", sub: "প্রস্তাবিত ~১০০+ ratio-এর বিপরীতে", cite: "BJMS / Bonik Barta" },
        { value: "দিন", unit: "থেকে সপ্তাহ", label: "ঢাকার বাইরে রিপোর্ট বিলম্ব", sub: "জেলা ও উপজেলা হাসপাতাল", cite: "Bonik Barta, 2024" },
        { value: "১৭০M+", unit: "জনসংখ্যা", label: "সেবার আওতায়", sub: "Chest X-ray সর্বোচ্চ-volume modality", cite: "WHO SEARO" },
        { value: "On-prem", unit: "deploy", label: "রোগীর data বাইরে যায় না", sub: "Hospital VPC-র ভিতরে চলে", cite: "DiagnostIQ architecture" },
      ],
      useCases: [
        { tag: "সরকারি খাত", title: "উপজেলা ও জেলা হাসপাতাল", body: "রাতে radiologist না থাকলেও draft chest X-ray রিপোর্ট। সকালে বা remotely licensed specialist sign-off করে।", fit: "DGHS · Upazila Health Complex" },
        { tag: "Private খাত", title: "Hospital backlog কমানো", body: "Urgent finding triage ও structured draft — radiologist review, edit, sign।", fit: "Private hospital · teleradiology" },
        { tag: "Screening", title: "TB ও NCD camp", body: "Mobile chest X-ray screening-এ consistent, traceable draft রিপোর্ট — TB ও heart failure-এর জন্য গurut্বপূর্ণ।", fit: "NGO health · screening" },
      ],
    },
    journey: {
      section: "০৩ — রোগীর যাত্রা",
      titleLine1: "রংপুর থেকে",
      titleLine2: "signed রিপোর্ট পর্যন্ত।",
      intro:
        "DiagnostIQ যে workflow-এর জন্য তৈরি — rural capture, local AI draft, specialist sign-off; রোগীকে ঢাকায় নিয়ে যাওয়ার দরকার নেই।",
      steps: [
        { time: "২:১৪ AM", place: "রংপুর উপজেলা", title: "Chest X-ray capture", body: "Upazila Health Complex-এ portable CR। রাতে site-এ radiologist নেই।" },
        { time: "২:১৮ AM", place: "On-prem server", title: "DiagnostIQ draft রিপোর্ট", body: "চার-ধাপের পাইপলাইন locally চলে। কয়েক মিনিটে structured বাংলা/English draft প্রস্তুত।" },
        { time: "৭:৪০ AM", place: "রাজশাহী", title: "Radiologist sign-off", body: "Licensed specialist teleradiology-তে review করে, প্রয়োজনে edit, sign — রোগী রংপুরেই থাকে।" },
      ],
      footnote: "Illustrative timeline · human sign-off প্রয়োজন · গবেষণা প্রদর্শন",
    },
    reports: {
      section: "০৬ — output",
      titleLine1: "প্রতিটি line,",
      titleLine2: "model-এ traceable।",
      intro:
        "রিপোর্ট free-text guess নয়। প্রতিটি section যে component তৈরি করেছে তা bound। Clinician-ready বাংলা draft দেখতে toggle করুন।",
      docTitle: "রেডিওলজি রিপোর্ট",
      docSub: "DiagnostIQ · autonomous draft",
      signed: "signed",
      study: "study",
      patient: "রোগী",
      exam: "পরীক্ষা",
      date: "তারিখ",
      technique: "Technique",
      comparison: "Comparison",
      findings: "Findings",
      impression: "Impression",
      confidence: "council confidence",
      langToggle: "রিপোর্টের ভাষা",
    },
    access: {
      section: "০৯ — যোগাযোগ",
      title: "বাংলাদেশে আমাদের সাথে partner করুন।",
      sub: "Hospital, investor, researcher — DiagnostIQ-এর সাথে কীভাবে কাজ করতে চান জানান। ছোট cohort-এ design partner onboard করি; সম্পূর্ণ আপনার environment-এ deploy।",
      namePh: "আপনার নাম",
      emailPh: "name@hospital.org",
      orgPh: "প্রতিষ্ঠান (hospital, fund, university…)",
      msgPh: "আপনার interest — pilot site, investment, research…",
      submit: "Inquiry পাঠান",
      submitting: "পাঠানো হচ্ছে…",
      note: "On-prem deployment · আপনার study-তে train করি না · বাংলা রিপোর্ট supported",
      confirmTitle: "Request received.",
      confirmSub: "শীঘ্রই যোগাযোগ করব।",
      safetyTitle: "গবেষণা প্রদর্শন — রোগ নির্ণয়ের জন্য নয়",
      safetyBn:
        "গবেষণামূলক প্রদর্শন — রোগ নির্ণয়ের জন্য নয়। প্রতিটি রিপোর্ট লাইসেন্সপ্রাপ্ত রেডিওলজিস্ট-এর সাইন-অফ ছাড়া ব্যবহার করা যাবে না।",
      safetyEn:
        "DiagnostIQ investigational — FDA-cleared, CE-marked, বা DGDA-registered নয়। প্রতিটি output licensed radiologist-এর review ও sign-off চায়।",
      safetyList: [
        "Medical device নয় (গবেষণা প্রদর্শন)",
        "Human-in-the-loop sign-off প্রয়োজন",
        "De-identified data · PHI retain করি না",
      ],
      footerTagline: "বাংলাদেশের জন্য autonomous radiology reporting।",
      footerBangla: "বাংলাদেশের জন্য স্বয়ংক্রিয় রেডিওলজি রিপোর্টিং",
      footerStatus: "গবেষণা প্রদর্শন",
    },
    impact: {
      section: "০৮ — প্রভাব estimate",
      titleLine1: "দ্রুত read",
      titleLine2: "কী mean করতে পারে।",
      intro:
        "Hospital planner ও grant application-এর illustrative calculator। আপনার facility-র input দিন — output estimate, clinical claim নয়।",
      xrays: "মাসে chest X-ray সংখ্যা",
      delay: "গড় রিপোর্ট বিলম্ব (দিন)",
      transferPct: "Read-এর জন্য travel করা রোগী (%)",
      transferCost: "গড় travel cost (BDT)",
      resultsTitle: "আনুমানিক মাসিক প্রভাব",
      delaySaved: "কমানো patient-days of delay",
      delayUnit: "দিন / মাস",
      costSaved: "সম্ভাব্য avoided travel cost",
      costUnit: "BDT / মাস",
      annual: "বার্ষিক travel savings (estimate)",
      disclaimer: "Illustrative model · ~৪ ঘণ্টা draft turnaround ধরে · clinical/financial guarantee নয়",
    },
    intents: {
      hospital: "Hospital বা clinic pilot",
      investor: "Investor বা partner",
      research: "Research collaboration",
    },
  },
};
