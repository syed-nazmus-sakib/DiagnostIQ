# DiagnostIQ

**Autonomous radiology reporting — product showcase.**

DiagnostIQ is a four-stage AI pipeline that reads a chest radiograph the way a
clinician does: it classifies the abnormality, localizes the affected region,
generates a structured report, and has a council of agents verify it before
sign-off. This repository is the marketing / research showcase site for that
system.

🔗 **Live:** https://syed-nazmus-sakib.github.io/DiagnostIQ

---

## The pipeline

| Stage | Model | What it does |
|-------|-------|--------------|
| 1 · Classification | DenseNet-121 | Multi-label finding detection over 14 pathologies |
| 2 · Region Detection | MedSAM (ViT-B) | Promptable segmentation of the affected region |
| 3 · Report Generation | RadLM-7B | Structured RadLex report grounded in the detected region |
| 4 · Verification | 3-agent council | Debate + adjudication to consensus before sign-off |

## Sections

Hero · interactive 4-stage **Pipeline** (cycles three real radiographs) ·
**Architecture** schematic · **Report explorer** with per-section provenance ·
**Benchmarks** · request-access + safety disclaimer.

## Tech

- **Next.js 16** (App Router) · **TypeScript** · static export
- Hand-written **CSS Modules** — no UI framework
- Type: Space Grotesk + JetBrains Mono · "PACS workstation" dark theme
- Real chest radiographs from Wikimedia Commons (see
  [`public/xrays/ATTRIBUTION.md`](public/xrays/ATTRIBUTION.md)); all AI overlays
  are synthetic and illustrative.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

## Deploy

Pushing to `main` triggers the GitHub Pages workflow
(`.github/workflows/nextjs.yml`), which builds a static export and publishes it.
Because the site is served from a project subpath, the workflow passes
`NEXT_PUBLIC_BASE_PATH` (the repo's base path) into the build; `next.config.ts`
applies it as `basePath` / `assetPrefix`, and `lib/basePath.ts` (`asset()`)
prefixes references to files in `/public`.

---

> ⚠️ **Research preview — not for diagnostic use.** Not a medical device; not
> FDA-cleared or CE-marked. Outputs require review and sign-off by a licensed
> radiologist.

© 2026 DiagnostIQ — All rights reserved by **Cortex AI Lab**, Robotics and
Mechatronics Engineering, University of Dhaka.
