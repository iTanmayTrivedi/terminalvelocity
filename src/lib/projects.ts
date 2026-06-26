import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

export type Project = {
  slug: string;
  n: string;
  t: string;
  d: string;
  tag: string;
  c: "acid" | "cyber" | "blood" | "violet-glow";
  img: string;
  year: string;
  role: string;
  client: string;
  stack: string[];
  intro: string;
  body: { h: string; p: string }[];
  metrics: { k: string; v: string }[];
  gallery: string[];
  links: { l: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "kumo-ui",
    n: "01",
    t: "kumo.ui",
    d: "headless design system · 47k weekly downloads",
    tag: "TS · React · Vite",
    c: "acid",
    img: work1,
    year: "2025 — present",
    role: "founder · lead engineer",
    client: "open-source · MIT",
    stack: ["TypeScript", "React 19", "Radix", "Vite", "tsup", "Vitest"],
    intro:
      "an unstyled, accessibility-first component library that ships under 12kb gzipped — the headless layer the team kept rebuilding at every job got carved out and given a name.",
    body: [
      { h: "the problem", p: "design teams kept hitting the same wall: shadcn was opinionated, radix-only was bare, and chakra/mui were too heavy. nothing fit a calm, typographic, design-system-first workflow." },
      { h: "the cut", p: "47 primitives, zero runtime CSS, full RSC support, polymorphic `as` prop with strict generics, focus-trap and aria wiring tested against axe + screen-reader matrices." },
      { h: "the ship", p: "12kb gzipped core. tree-shakes to ~2kb for a single primitive. dual ESM/CJS. ships with codemods for v0→v1 migration." },
    ],
    metrics: [
      { k: "weekly downloads", v: "47k" },
      { k: "bundle (core)", v: "12kb" },
      { k: "github stars", v: "3.8k" },
      { k: "a11y score", v: "100/100" },
    ],
    gallery: [work1, gallery1, gallery2],
    links: [
      { l: "github", href: "#" },
      { l: "docs", href: "#" },
      { l: "npm", href: "#" },
    ],
  },
  {
    slug: "shizuka",
    n: "02",
    t: "shizuka",
    d: "calm-tech saas for solo founders · YC W26",
    tag: "Next · tRPC · PG",
    c: "cyber",
    img: work2,
    year: "2026",
    role: "co-founder · CTO",
    client: "shizuka inc · YC W26",
    stack: ["Next 15", "tRPC", "Postgres", "Drizzle", "Stripe", "Resend"],
    intro:
      "shizuka (静か, lit. 'quiet') is the operating system for solo founders — invoicing, contracts, taxes, and async client ops in one calm surface.",
    body: [
      { h: "thesis", p: "the solopreneur stack is loud. 14 saas tabs, 3 spreadsheets, an inbox you fear. shizuka collapses that to a single weekly review and a focus mode that hides everything else." },
      { h: "engineering", p: "edge-rendered Next 15 on Vercel, Postgres on Neon with row-level multitenancy, tRPC for end-to-end types, Stripe Connect for instant payouts. event-sourced ledger for tax-grade auditability." },
      { h: "outcome", p: "300 paid users in the first 6 weeks. accepted into YC W26. ARR crossed $180k within 90 days of public launch." },
    ],
    metrics: [
      { k: "paid users", v: "1.2k" },
      { k: "ARR", v: "$420k" },
      { k: "p95 ttfb", v: "84ms" },
      { k: "NPS", v: "71" },
    ],
    gallery: [work2, gallery2, work1],
    links: [
      { l: "shizuka.app", href: "#" },
      { l: "changelog", href: "#" },
    ],
  },
  {
    slug: "haku-engine",
    n: "03",
    t: "haku.engine",
    d: "rust-powered realtime sync layer",
    tag: "Rust · WASM · CRDT",
    c: "blood",
    img: gallery1,
    year: "2024 — 2025",
    role: "principal engineer",
    client: "internal infra · series-B fintech",
    stack: ["Rust", "Yrs (Y-CRDT)", "WASM", "tokio", "Postgres", "NATS"],
    intro:
      "haku (白, 'blank canvas') is a CRDT-backed realtime engine powering collaborative compliance workflows for a fintech handling $4B in annual settlement.",
    body: [
      { h: "why rust", p: "the previous Node sync layer collapsed at 200 concurrent docs. we needed predictable latency under regulator scrutiny — rust + tokio gave us p99 under 18ms at 5k concurrent peers." },
      { h: "architecture", p: "Yrs as the CRDT primitive, compiled to WASM for the browser, native binaries for desktop. NATS JetStream as the durable log, Postgres for snapshots. zero merge conflicts in 9 months of production." },
      { h: "impact", p: "shipped to 14k seats. reduced sync infra cost 71%. enabled the company's first multi-region compliance product." },
    ],
    metrics: [
      { k: "concurrent peers", v: "5k" },
      { k: "p99 sync", v: "18ms" },
      { k: "infra cost", v: "−71%" },
      { k: "seats", v: "14k" },
    ],
    gallery: [gallery1, work1, work2],
    links: [
      { l: "case study (pdf)", href: "#" },
      { l: "talk · rustconf 2025", href: "#" },
    ],
  },
  {
    slug: "neon-ghost",
    n: "04",
    t: "neon/ghost",
    d: "generative type playground · webgl",
    tag: "GLSL · Three",
    c: "violet-glow",
    img: gallery2,
    year: "2024",
    role: "creative tech · solo",
    client: "self-initiated · awwwards SOTD",
    stack: ["Three.js", "GLSL", "Rapier", "Tone.js"],
    intro:
      "a webgl playground where typography is dragged through fluid sim, raymarched fog, and audio-reactive distortion. zero use case. all vibe.",
    body: [
      { h: "intent", p: "after a year of fintech, the brain needed something useless and beautiful. neon/ghost is what fell out — a love letter to old-internet flash sites in modern webgl." },
      { h: "tech", p: "custom raymarched SDF shader for the fog volume, rapier for the rigid-body letter physics, tone.js wired to a microphone for audio-reactive distortion of the noise field." },
      { h: "afterlife", p: "Awwwards site of the day. featured in CSS Design Awards. used as a hiring filter — candidates who got it tended to be the right ones." },
    ],
    metrics: [
      { k: "awwwards", v: "SOTD" },
      { k: "fps (m1 air)", v: "60" },
      { k: "shader lines", v: "412" },
      { k: "use case", v: "none" },
    ],
    gallery: [gallery2, gallery1, work2],
    links: [
      { l: "open playground", href: "#" },
      { l: "shader source", href: "#" },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const getNextProject = (slug: string) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
};
