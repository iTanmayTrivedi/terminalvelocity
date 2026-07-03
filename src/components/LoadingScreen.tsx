import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const GLYPHS = "アァイィウエカキクケコサシスセソタチツテトナニヌネノハマヤラワABCDEF0123456789#$%&*<>/\\";
const KANA_NAME = "吉";
const BOOT = [
  { k: "sys", t: "boot://yoshito.dev — handshake ok" },
  { k: "gpu", t: "shaders://aurora · scanlines · grain compiled" },
  { k: "fnt", t: "fonts://cormorant + jetbrains + zen-kaku linked" },
  { k: "net", t: "edge://workerd · region NRT · rtt 12ms" },
  { k: "dat", t: "load://projects · 4 case studies indexed" },
  { k: "aud", t: "audio://synth voices armed · 6ch" },
  { k: "rdy", t: "ready://東京 — welcome, operator" },
];

function rand(s: string) { return s[Math.floor(Math.random() * s.length)]; }
function scramble(target: string, t: number) {
  const reveal = Math.floor(target.length * t);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    if (i < reveal || target[i] === " ") out += target[i];
    else out += rand(GLYPHS);
  }
  return out;
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bootIdx, setBootIdx] = useState(0);
  const [name, setName] = useState("       ");
  const [glyphRows, setGlyphRows] = useState<string[]>(["", "", ""]);
  const [hint, setHint] = useState("");
  const startRef = useRef<number>(0);
  const previousOverflowRef = useRef("");
  const DURATION = 2600;

  // pre-compute static decorative stripes
  const tickMarks = useMemo(
    () => Array.from({ length: 32 }, (_, i) => i),
    [],
  );

  useEffect(() => {
    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.classList.add("loader-lock");
    startRef.current = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      setName(scramble("YOSHITO", eased));
      setBootIdx(Math.min(Math.floor(eased * BOOT.length), BOOT.length));

      const rows: string[] = [];
      for (let r = 0; r < 3; r++) {
        let row = "";
        for (let i = 0; i < 56; i++) row += rand(GLYPHS);
        rows.push(row);
      }
      setGlyphRows(rows);

      // typing hint
      const phrase = "calibrating reality…";
      setHint(phrase.slice(0, Math.floor(eased * phrase.length)));

      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 480);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("loader-lock");
      document.documentElement.style.overflow = previousOverflowRef.current;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("loader-lock");
      document.documentElement.style.overflow = previousOverflowRef.current;
    }
  }, [visible]);

  const pct = Math.floor(progress * 100);
  const completedBoot = Math.min(bootIdx, BOOT.length);
  const activeBoot = completedBoot < BOOT.length ? BOOT[completedBoot] : null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[300] bg-ink"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Exit shutter — split panels */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.83, 0, 0.17, 1] } }}
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-ink"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.85, ease: [0.83, 0, 0.17, 1] } }}
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 bg-ink"
          />

          {/* Background layers */}
          <div className="absolute inset-0 noise-grid opacity-40" />
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="aurora pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full md:h-[640px] md:w-[640px]" />
          <div className="aurora pointer-events-none absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full md:h-[560px] md:w-[560px]" />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-25" />

          {/* Sweeping scan beam */}
          <motion.div
            initial={{ y: "-10%" }}
            animate={{ y: "110%" }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-acid/10 to-transparent mix-blend-screen"
          />

          {/* Corner brackets */}
          <Brackets />

          {/* Top status */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-bone/60 md:left-12 md:right-12 md:top-7 md:text-[10px]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-acid blink shadow-[0_0_10px_var(--acid)]" />
              <span className="hidden sm:inline">cold-boot sequence</span>
              <span className="sm:hidden">boot</span>
              <span className="text-bone/30">/</span>
              <span>起動中</span>
            </span>
            <span className="hidden md:inline text-bone/40">build · 2026.06 · edge·NRT</span>
            <span className="tabular-nums text-acid">{String(pct).padStart(3, "0")}%</span>
          </div>

          {/* Side tick rails */}
          <div className="pointer-events-none absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-[6px] md:flex">
            {tickMarks.map((i) => (
              <span
                key={i}
                className={`h-px w-3 ${i < Math.floor(progress * tickMarks.length) ? "bg-acid" : "bg-bone/15"}`}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-[6px] md:flex">
            {tickMarks.map((i) => (
              <span
                key={i}
                className={`h-px w-3 self-end ${i < Math.floor(progress * tickMarks.length) ? "bg-cyber" : "bg-bone/15"}`}
              />
            ))}
          </div>

          {/* Center stage */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.5em] text-acid md:text-[10px]"
            >
              <span className="h-px w-8 bg-acid/60" />
              <span>portfolio.exe</span>
              <span className="text-bone/30">·</span>
              <span className="text-cyber">v.2026.6</span>
              <span className="h-px w-8 bg-acid/60" />
            </motion.div>

            {/* Glyph river above */}
            <div className="mt-6 hidden h-4 w-[88vw] max-w-[640px] overflow-hidden font-mono text-[10px] tracking-[0.18em] text-cyber/35 md:block">
              {glyphRows[0]}
            </div>

            {/* Stacked title with kana sigil */}
            <div className="relative mt-4 flex flex-col items-center">
              {/* Floating sigil */}
              <motion.span
                aria-hidden
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 0.18, scale: 1, rotate: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="pointer-events-none absolute -top-10 select-none font-display text-[34vw] leading-none text-acid blur-[1px] md:-top-16 md:text-[18vw]"
              >
                {KANA_NAME}
              </motion.span>

              <h1
                data-text={name}
                className="glitch relative font-display text-[18vw] leading-[0.85] tracking-tighter text-bone md:text-[10vw]"
              >
                {name}
              </h1>
              <p className="-mt-1 font-display text-[18vw] leading-[0.85] tracking-tighter text-stroke-acid md:text-[10vw]">
                TANAKA
              </p>
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50 md:text-xs">
              full-stack engineer · 東京 · 35.6762° N
            </p>

            {/* Progress rail with kana ticks */}
            <div className="relative mt-10 w-[86vw] max-w-[560px]">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-bone/40">
                <span>fragment {completedBoot}/{BOOT.length}</span>
                <span className="text-cyber tabular-nums">{pct.toString().padStart(3, "0")} / 100</span>
              </div>
              <div className="relative mt-2 h-[3px] w-full bg-bone/10">
                <motion.div
                  style={{ width: `${pct}%` }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-acid via-cyber to-violet-glow"
                />
                <div
                  style={{ left: `${pct}%` }}
                  className="absolute -top-1.5 h-6 w-px -translate-x-1/2 bg-acid shadow-[0_0_18px_var(--acid)]"
                />
                {/* milestone ticks */}
                {[25, 50, 75].map((m) => (
                  <span
                    key={m}
                    style={{ left: `${m}%` }}
                    className="absolute -top-1 h-2 w-px -translate-x-1/2 bg-bone/30"
                  />
                ))}
              </div>
              {/* glyph crawl under bar */}
              <div className="mt-2 h-3 overflow-hidden font-mono text-[9px] tracking-[0.2em] text-cyber/30">
                {glyphRows[1]}
              </div>
            </div>

            {/* Boot log */}
            <div className="mt-7 w-[90vw] max-w-[560px] space-y-1 font-mono text-[10px] text-bone/75 md:text-[11px]">
              {BOOT.slice(0, completedBoot).map((line) => (
                <motion.div
                  key={line.t}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-7 text-acid/70">[{line.k}]</span>
                  <span className="text-acid">✓</span>
                  <span className="truncate text-cyber/80">{line.t}</span>
                  <span className="ml-auto text-bone/30">ok</span>
                </motion.div>
              ))}
              {activeBoot && (
                <div className="flex items-center gap-3">
                  <span className="w-7 text-acid/70">[{activeBoot.k}]</span>
                  <span className="text-acid blink">▌</span>
                  <span className="truncate text-bone/80">{activeBoot.t}</span>
                  <span className="ml-auto text-bone/30">...</span>
                </div>
              )}
            </div>

            {/* Typing hint */}
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/40">
              {hint}
              <span className="ml-1 inline-block h-2 w-2 -translate-y-[1px] bg-acid blink" />
            </div>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-bone/40 md:bottom-7 md:left-12 md:right-12 md:text-[10px]">
            <span className="hidden sm:inline">node://workerd · v.live</span>
            <span className="hidden flex-1 px-6 text-center text-cyber/30 md:block truncate">{glyphRows[2]}</span>
            <span className="text-bone/60">press · 任意キー</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Brackets() {
  const cls = "absolute h-6 w-6 border-acid/70 md:h-12 md:w-12";
  return (
    <div className="pointer-events-none absolute inset-4 z-20 md:inset-8">
      <div className={`${cls} left-0 top-0 border-l-2 border-t-2`} />
      <div className={`${cls} right-0 top-0 border-r-2 border-t-2`} />
      <div className={`${cls} left-0 bottom-0 border-b-2 border-l-2`} />
      <div className={`${cls} right-0 bottom-0 border-b-2 border-r-2`} />
    </div>
  );
}
