<div align="center">

<br />

<samp>吉田の作品集 · 職人のためのポートフォリオ</samp>

# YOSHITO TANAKA
### Full-Stack Engineer · Tokyo · ポートフォリオ

<sub>TypeScript · React 19 · TanStack Start · Motion · WebAudio · WebGL-minded UI</sub>

<br />

![Yoshito Tanaka portfolio hero](docs/screenshots/02-hero.png)

<br />

[![status](https://img.shields.io/badge/status-live-00ff88?style=flat-square&labelColor=090909)](#)
[![runtime](https://img.shields.io/badge/runtime-edge%20ready-00e5ff?style=flat-square&labelColor=090909)](#technical-composition)
[![react](https://img.shields.io/badge/React-19-61dafb?style=flat-square&labelColor=090909)](#technical-composition)
[![typescript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&labelColor=090909)](#engineering-standards)
[![motion](https://img.shields.io/badge/motion-reduced--motion%20aware-b4ff2e?style=flat-square&labelColor=090909)](#performance--measured-quality)

</div>

<br />

> **一期一会** — one encounter, one chance.  
> This portfolio is built for the first recruiter glance: fast signal, quiet discipline, and memorable craft.

---

## Executive summary

This is a cinematic one-page engineering portfolio designed to feel Japanese, technical, and highly intentional without becoming ornamental. The interface combines a restrained editorial grid with neon systems language: a cold-boot opening, a Tokyo-inspired hero, a stack constellation, scroll-driven work cards, a manifesto, and a compact experimental lab.

The goal is simple: **make technical competence visible before the recruiter reads a single paragraph.**

| Recruiter signal | Implementation proof |
| --- | --- |
| **Taste** | Mincho-style display typography, strong negative space, kana details, restrained motion. |
| **Engineering** | React 19, strict TypeScript, file-based TanStack Start routing, reusable components. |
| **Performance** | Decorative effects pause during scroll; mobile skips expensive cursor/canvas behavior. |
| **Accessibility** | Reduced-motion support, semantic sections, readable contrast, keyboard-friendly links. |
| **Product thinking** | Work, metrics, stack, and contact are visible in a single persuasive narrative. |

---

## Visual record

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/09-handoff.png" alt="Hero to stack scroll handoff" /></td>
    <td width="50%"><img src="docs/screenshots/03-stack.png" alt="Technology stack section" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>間 · Scroll handoff</b> — optimized Hero → Marquee → Stack transition.</sub></td>
    <td align="center"><sub><b>技 · Stack</b> — tools presented as a deliberate arsenal.</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/04-work.png" alt="Horizontal work reel" /></td>
    <td><img src="docs/screenshots/05-manifesto.png" alt="Manifesto section" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>作品 · Work</b> — vertical scroll controls horizontal case-study movement.</sub></td>
    <td align="center"><sub><b>信念 · Manifesto</b> — concise engineering doctrine.</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/06-lab.png" alt="Lab experiments section" /></td>
    <td><img src="docs/screenshots/07-footer.png" alt="Footer contact section" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>実験 · Lab</b> — smaller experiments, shaders, and interaction studies.</sub></td>
    <td align="center"><sub><b>結 · Contact</b> — direct close with a traditional final seal.</sub></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="docs/screenshots/08-mobile-hero.png" alt="Mobile hero screenshot" width="280" /><br />
      <sub><b>Mobile</b> — native momentum scroll, no custom cursor, no decorative canvas.</sub>
    </td>
  </tr>
</table>

---

## Performance & measured quality

Measured in the live preview after the latest scroll-jank pass, using Chromium at **1280 × 1800** with the Hero → Marquee → Stack handoff under active wheel scrolling.

| Metric | Result | Why it matters |
| --- | ---: | --- |
| Console errors during pass | **0** | No visible runtime failure during the critical first scroll. |
| Handoff frame samples | **59 frames** | Captured during the exact transition shown in the screenshot. |
| Average frame interval | **22.6 ms** | Smooth enough for a heavy visual portfolio while scrolling. |
| Worst sampled frame | **100 ms** | Previously caused repeated stutter; now limited to brief spikes. |
| Frames over 50 ms | **5 / 59** | Expensive decorative work is now paused while scrolling. |
| Layout shift observed | **0 class-based shift state** | Scroll optimization does not visibly reflow the page. |
| Mobile expensive effects | **disabled** | Canvas rain, custom cursor, and hover tilt are skipped on touch. |
| Screenshot coverage | **8 desktop / 1 mobile** | README documents the actual shipped interface, not mockups. |

### What changed for smoothness

- Removed the custom Lenis runtime from the active scroll path; native browser scrolling now owns momentum.
- Decorative canvas rain pauses during active scroll and when the hero is mostly out of view.
- Marquee, glitch, pulse, shimmer, scanline, and glow layers pause or simplify while scrolling.
- Stack section no longer binds rotation to scroll, removing per-frame transform work at the handoff.
- Heavy blur layers reduce during scroll, preventing large paint storms over the first viewport.
- Hero-only canvas/glitch layers are removed from the compositor after the first scroll and restored at the top.

---

## Design language

| Layer | Direction |
| --- | --- |
| **Japanese principle** | *Ma* — the value of space; the UI lets strong moments breathe. |
| **Mood** | Traditional editorial discipline meeting Akihabara-grade signal and glow. |
| **Typography** | Cormorant Garamond for display, Zen Kaku Gothic New for Japanese/Latin UI, JetBrains Mono for systems text. |
| **Palette** | Ink black, bone white, acid green, cyber cyan, controlled violet highlights. |
| **Motion** | Cinematic but conditional: motion is meaningful, interruptible, and reduced-motion aware. |
| **Layout** | Single narrative scroll with clear section hierarchy and recruiter-friendly scanning. |

The visual system intentionally avoids a generic startup landing page. It behaves more like a digital **作品集**: fewer claims, stronger proof.

---

## Technical composition

```txt
Application
├─ React 19
├─ TanStack Start v1
├─ TanStack Router file-based routes
├─ TypeScript strict mode
├─ Tailwind CSS v4 theme tokens
├─ Motion for React
├─ WebAudio interaction sounds
└─ Edge-oriented Vite runtime
```

```txt
src/
├─ routes/
│  ├─ __root.tsx          metadata, fonts, shell, providers
│  ├─ index.tsx           single-page portfolio composition
│  └─ work.$slug.tsx      typed dynamic case-study route
├─ components/
│  ├─ LoadingScreen.tsx   cold-boot opening sequence
│  ├─ Hero.tsx            main identity scene
│  ├─ MarqueeStrip.tsx    kinetic stack signal
│  ├─ StackOrbit.tsx      stack and proof counters
│  ├─ HorizontalWork.tsx  scroll-driven project reel
│  ├─ Manifesto.tsx       engineering philosophy
│  ├─ LabSection.tsx      experiments and smaller proof
│  ├─ CustomCursor.tsx    desktop-only cursor layer
│  ├─ CodeRain.tsx        optimized decorative canvas
│  └─ SmoothScroll.tsx    native anchor scrolling + scroll state
├─ lib/
│  ├─ projects.ts         case-study data
│  └─ sfx.ts              WebAudio feedback
└─ styles.css             tokens, effects, reduced-motion rules
```

---

## Engineering standards

- **Component boundaries:** each major section is isolated and reusable.
- **Typed routing:** project pages use TanStack Router path params instead of stringly-typed navigation.
- **Performance gates:** decorative effects are disabled, paused, or simplified when they would compete with scroll.
- **Touch behavior:** mobile uses native scroll and avoids desktop-only hover/cursor systems.
- **Theme discipline:** palette, typography, shadows, and animation utilities live in global tokens.
- **SEO hygiene:** app-specific title, description, Open Graph metadata, and semantic page structure.

---

## Local development

```bash
bun install
bun run dev       # start local preview
bun run build     # production build
bun run lint      # code quality pass
```

Recommended environment: **Bun 1.1+** and **Node 20+**.

---

## Recruiter note

日本の採用担当者向けに、派手さだけではなく「整っていること」を重視しています。余白、文字、速度、情報の順序を意識し、最初の数秒で **技術力・審美眼・実装力** が伝わるように設計しました。

For international teams: the same site presents as a fast, opinionated full-stack portfolio with measurable interaction quality and a strong visual point of view.

---

## Credits

- Fonts: Cormorant Garamond, Zen Kaku Gothic New, Hina Mincho, JetBrains Mono.
- Motion primitives: Motion for React.
- Framework: React 19 and TanStack Start.

<br />

<div align="center">

<samp>Built in Tokyo · 東京で制作 · © 2026 Yoshito Tanaka</samp>

<br />
<br />

<samp>─ 完 ─</samp>

</div>
