import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GLYPHS = "アァカサタナハマヤャラワABCDEF0123456789#$%&*";
const BOOT = [
  "init://yoshito.dev",
  "load://fonts/cormorant + jetbrains",
  "load://shaders/aurora.glsl",
  "load://projects/4 cases",
  "audio://synth engine ready",
  "ready://東京 · tokyo",
];

function scramble(target: string, t: number) {
  // t in [0,1]
  const reveal = Math.floor(target.length * t);
  let out = "";
  for (let i = 0; i < target.length; i++) {
    if (i < reveal || target[i] === " ") out += target[i];
    else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return out;
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bootIdx, setBootIdx] = useState(0);
  const [name, setName] = useState("       ");
  const [glyphRow, setGlyphRow] = useState("");
  const startRef = useRef<number>(0);
  const DURATION = 2200;

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    startRef.current = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      setName(scramble("YOSHITO", eased));
      // Boot lines cadence
      const step = Math.floor(eased * BOOT.length);
      setBootIdx(Math.min(step, BOOT.length));
      // Random glyph row
      let row = "";
      for (let i = 0; i < 42; i++) row += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      setGlyphRow(row);

      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setVisible(false), 380);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = "";
  }, [visible]);

  const pct = Math.floor(progress * 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[300] bg-ink grain"
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          {/* Exit wipe over the whole thing */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            style={{ transformOrigin: "top" }}
            className="pointer-events-none absolute inset-0 z-10 bg-ink"
          />

          {/* Background grid + aurora */}
          <div className="absolute inset-0 noise-grid opacity-50" />
          <div className="aurora pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full md:h-[600px] md:w-[600px]" />
          <div className="aurora pointer-events-none absolute -right-40 bottom-0 h-[360px] w-[360px] rounded-full md:h-[520px] md:w-[520px]" />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

          {/* Corner brackets */}
          <Brackets />

          {/* Top status row */}
          <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-bone/60 md:left-12 md:right-12 md:top-7 md:text-[10px]">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-acid blink" />
              booting / 起動中
            </span>
            <span className="hidden md:inline">build · 2026.06 · edge</span>
            <span className="text-acid tabular-nums">{String(pct).padStart(3, "0")}%</span>
          </div>

          {/* Center stack */}
          <div className="relative z-20 flex h-full flex-col items-center justify-center px-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[9px] uppercase tracking-[0.5em] text-acid md:text-[10px]"
            >
              ╳ ─ portfolio.exe ─ ╳
            </motion.p>

            <h1
              data-text={name}
              className="glitch mt-6 font-display text-[18vw] leading-[0.85] tracking-tighter text-bone md:text-[10vw]"
            >
              {name}
            </h1>
            <p className="mt-1 font-display text-[18vw] leading-[0.85] tracking-tighter text-stroke-acid md:text-[10vw]">
              TANAKA
            </p>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50 md:text-xs">
              full-stack engineer · 東京
            </p>

            {/* Progress rail */}
            <div className="relative mt-10 h-px w-[80vw] max-w-[520px] bg-bone/15">
              <motion.div
                style={{ width: `${pct}%` }}
                className="h-full bg-gradient-to-r from-acid via-cyber to-violet-glow"
              />
              <div
                style={{ left: `${pct}%` }}
                className="absolute -top-1 h-2 w-px -translate-x-1/2 bg-acid shadow-[0_0_12px_var(--acid)]"
              />
            </div>

            {/* Glyph river */}
            <div className="mt-4 h-4 w-[80vw] max-w-[520px] overflow-hidden font-mono text-[10px] tracking-[0.2em] text-cyber/40">
              {glyphRow}
            </div>

            {/* Boot log */}
            <div className="mt-8 w-[88vw] max-w-[520px] space-y-0.5 font-mono text-[10px] text-bone/75 md:text-[11px]">
              {BOOT.slice(0, bootIdx).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-acid">✓</span>
                  <span className="text-cyber/80">{line}</span>
                  <span className="ml-auto text-bone/30">ok</span>
                </motion.div>
              ))}
              {bootIdx < BOOT.length && (
                <div className="flex items-center gap-3">
                  <span className="text-acid blink">▌</span>
                  <span className="text-bone/80">{BOOT[bootIdx]}</span>
                  <span className="ml-auto text-bone/30">...</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom status row */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-bone/40 md:bottom-7 md:left-12 md:right-12 md:text-[10px]">
            <span>node://workerd · v.live</span>
            <span className="hidden md:inline">ssr · edge · 12ms</span>
            <span className="text-bone/60">press · 任意キー</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Brackets() {
  const cls = "absolute h-6 w-6 border-acid/70 md:h-10 md:w-10";
  return (
    <div className="pointer-events-none absolute inset-4 z-20 md:inset-8">
      <div className={`${cls} left-0 top-0 border-l border-t`} />
      <div className={`${cls} right-0 top-0 border-r border-t`} />
      <div className={`${cls} left-0 bottom-0 border-b border-l`} />
      <div className={`${cls} right-0 bottom-0 border-b border-r`} />
    </div>
  );
}
