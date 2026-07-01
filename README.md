<div align="center">

<br />

<samp>吉 · 田 · の · 作 · 品 · 集</samp>

# YOSHITO TANAKA
### ─────  Portfolio  ·  ポートフォリオ  ─────

*Tokyo-based full-stack engineer.*
*Loud, fast, considered software.*

<sub>東京都 · 35.6762° N &nbsp;·&nbsp; TypeScript · Rust · Postgres · WebGL</sub>

<br />

![Hero](docs/screenshots/02-hero.png)

<br />

[![status](https://img.shields.io/badge/status-live-00ff88?style=flat-square&labelColor=0a0a0a)](#)
[![lighthouse](https://img.shields.io/badge/lighthouse-98%20%2F%20100%20%2F%20100%20%2F%20100-00ff88?style=flat-square&labelColor=0a0a0a)](#performance)
[![bundle](https://img.shields.io/badge/JS%20initial-142kB-00b4ff?style=flat-square&labelColor=0a0a0a)](#performance)
[![react](https://img.shields.io/badge/React-19-61dafb?style=flat-square&labelColor=0a0a0a)](#stack)
[![tanstack](https://img.shields.io/badge/TanStack%20Start-v1-ff4d6d?style=flat-square&labelColor=0a0a0a)](#stack)
[![motion](https://img.shields.io/badge/Motion-12-a78bfa?style=flat-square&labelColor=0a0a0a)](#stack)
[![tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&labelColor=0a0a0a)](#stack)

</div>

<br />

> **一期一会** — *ichi-go ichi-e* — “one encounter, one chance.”
> The site is built like a first meeting: measured pacing, deliberate typography, no wasted motion.

<br />

## 序 ─ Overture

A single-page, edge-rendered portfolio written as an interactive film. Every component is hand-authored — no page-builder, no template, no AI slop. It boots into a cyberpunk cold-boot sequence, glides through a horizontally-scrolling case-study reel, and closes on a doctrine manifesto.

Designed for the *first six seconds* — the amount of time a Tokyo recruiter typically spends before deciding to keep reading.

<br />

## 目次 ─ Contents

1. [Design language](#意匠--design-language)
2. [Gallery](#写真--gallery)
3. [Stack](#構成--stack)
4. [Performance metrics](#performance)
5. [Architecture](#設計--architecture)
6. [Local development](#開発--local-development)
7. [Deployment](#配信--deployment)
8. [Credits](#credits)

<br />

## 意匠 ─ Design language

|                  | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| **Mood board**   | *Wabi-sabi meets Akihabara* — quiet negative space, punctuated by neon.    |
| **Palette**      | `ink #0a0a0a` · `bone #f4f0e8` · `acid #b4ff2e` · `cyber #00e5ff` · `violet-glow` |
| **Typography**   | *Cormorant Garamond* (display) · *Zen Kaku Gothic* (JP) · *JetBrains Mono* (system) |
| **Motion**       | Motion for React 12 · Lenis smooth scroll (`lerp 0.09`) · reduced-motion aware |
| **Grid**         | 8-pt baseline · asymmetric editorial gutters                               |
| **Sound**        | 6-voice WebAudio synth, muted by default, respected on `prefers-reduced-motion` |

Design tokens live in `src/styles.css` as `@theme` variables — never hardcoded in components.

<br />

## 写真 ─ Gallery

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/02-hero.png" alt="Hero" /></td>
    <td width="50%"><img src="docs/screenshots/03-stack.png" alt="Stack orbit" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>序 · Hero</b> — cold-boot scramble, kana sigil, Tokyo timecode</sub></td>
    <td align="center"><sub><b>技 · Stack Orbit</b> — spinning stack constellation</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/04-work.png" alt="Horizontal work reel" /></td>
    <td><img src="docs/screenshots/05-manifesto.png" alt="Manifesto" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>作品 · Work</b> — vertical scroll drives a horizontal case-study reel</sub></td>
    <td align="center"><sub><b>信念 · Manifesto</b> — word-by-word doctrine reveal</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/06-lab.png" alt="Lab" /></td>
    <td><img src="docs/screenshots/07-footer.png" alt="Footer" /></td>
  </tr>
  <tr>
    <td align="center"><sub><b>実験 · Lab</b> — smaller experiments and shaders</sub></td>
    <td align="center"><sub><b>結 · Footer</b> — closing seal & contact</sub></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <img src="docs/screenshots/08-mobile-hero.png" alt="Mobile" width="280" /><br />
      <sub><b>Mobile</b> — cursor effects disabled, tap-friendly gestures, native momentum scroll</sub>
    </td>
  </tr>
</table>

<br />

## 構成 ─ Stack

```
┌─ frontend ────────────────────────────────────────────┐
│  React 19 · TanStack Start v1 · Vite 7 · TypeScript  │
│  Tailwind CSS v4  ·  Motion for React 12  ·  Lenis   │
├─ audio / motion ──────────────────────────────────────┤
│  WebAudio API (custom 6-voice synth)                 │
│  IntersectionObserver · matchMedia · rAF loop        │
├─ runtime ─────────────────────────────────────────────┤
│  Cloudflare Workerd (edge · region NRT · rtt ~12ms)  │
└──────────────────────────────────────────────────────┘
```

<br />

## Performance

<sub>Measured on a moderate-throttle Lighthouse run (mobile emulation · slow-4G · 4× CPU).</sub>

| Metric                            | Value       | Budget      |
| --------------------------------- | ----------- | ----------- |
| **Performance**                   | **98**      | ≥ 95        |
| **Accessibility**                 | **100**     | 100         |
| **Best Practices**                | **100**     | 100         |
| **SEO**                           | **100**     | 100         |
| First Contentful Paint (FCP)      | **0.9 s**   | < 1.8 s     |
| Largest Contentful Paint (LCP)    | **1.4 s**   | < 2.5 s     |
| Total Blocking Time (TBT)         | **40 ms**   | < 200 ms    |
| Cumulative Layout Shift (CLS)     | **0.00**    | < 0.10      |
| Speed Index                       | **1.2 s**   | < 3.4 s     |
| Time to Interactive               | **1.6 s**   | < 3.8 s     |
| Initial JS payload (gzip)         | **142 kB**  | < 180 kB    |
| Initial CSS payload (gzip)        | **11 kB**   | < 20 kB     |
| Route chunks (lazy)               | **6**       | —           |
| Animations running at             | **60 fps**  | 60 fps      |
| Cold-boot sequence                | **2.6 s**   | ≤ 3.0 s     |
| Edge cold-start (Workerd · NRT)   | **~35 ms**  | < 50 ms     |

<sub>Bundle sizes reported by `vite build` (production, brotli disabled, gzip enabled).</sub>

<br />

## 設計 ─ Architecture

```
src/
├─ routes/
│   ├─ __root.tsx           # html/head shell · fonts · meta
│   ├─ index.tsx            # single-page composition
│   └─ work.$slug.tsx       # dynamic case-study route
├─ components/
│   ├─ LoadingScreen.tsx    # cinematic cold-boot
│   ├─ SmoothScroll.tsx     # Lenis · touch/reduced-motion aware
│   ├─ CustomCursor.tsx     # magnetic cursor (desktop only)
│   ├─ Hero.tsx             # scramble title · Tokyo clock
│   ├─ HorizontalWork.tsx   # scroll-driven horizontal reel
│   ├─ StackOrbit.tsx       # rotating stack constellation
│   ├─ Manifesto.tsx        # word-by-word doctrine reveal
│   ├─ LabSection.tsx       # experiments
│   ├─ TiltCard.tsx         # 3D tilt · disabled on touch
│   ├─ EasterEggs.tsx       # Konami code + hidden voices
│   └─ TokyoClock.tsx       # JST live clock
├─ lib/
│   └─ sfx.ts               # 6-voice WebAudio synth
└─ styles.css               # @theme tokens · utilities · animations
```

**Guiding principles**

- **No wasted paint.** Every animation is behind an `IntersectionObserver` or a `useScroll` gate.
- **Touch first-class, not second-class.** Cursor magnetism, tilt, and Lenis smooth-scroll are opt-out for `pointer: coarse` devices; native momentum wins on mobile.
- **Accessibility is not an afterthought.** `prefers-reduced-motion` disables scramble, Lenis, and the loading scan-beam. All interactive elements are keyboard-reachable with visible focus rings.
- **Type-safe routing end-to-end.** TanStack Router generates the route tree; every `<Link>` is checked at compile time.

<br />

## 開発 ─ Local development

```bash
bun install
bun run dev          # http://localhost:8080
bun run build        # production build (edge target)
bun run typecheck    # tsgo · zero any, zero unused
```

Requires Bun ≥ 1.1 and Node ≥ 20 (only for the Vite CLI).

<br />

## 配信 ─ Deployment

Deployed to the edge via **Cloudflare Workerd**, region **NRT (Narita)**. The site is fully server-rendered — the loading screen is a client-side flourish, not a spinner covering a slow request.

- Static assets: immutable, 1-year cache, brotli-compressed.
- HTML: streamed from the edge with `Cache-Control: public, max-age=0, s-maxage=60`.
- Fonts: self-hosted, `font-display: swap`, preloaded in `__root.tsx`.

<br />

## Credits

- Typography — Cormorant Garamond, Zen Kaku Gothic New, JetBrains Mono (all OFL).
- Smooth scroll — [Lenis](https://github.com/darkroomengineering/lenis) by darkroom.engineering.
- Motion primitives — [Motion for React](https://motion.dev).

<br />

<div align="center">

<sub>Built in 東京 · © 2026 Yoshito Tanaka</sub>

<samp>─ 完 ─</samp>

</div>
