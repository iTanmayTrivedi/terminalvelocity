import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CodeRain } from "./CodeRain";

const NAME = "YOSHITO";
const SUB = "TANAKA";

const TYPED = [
  "$ whoami",
  "→ full-stack engineer / tokyo, jp",
  "$ cat skills.json",
  '→ ["typescript","rust","go","postgres","webgl"]',
  "$ deploy --prod --confidence=high",
  "→ shipping in 12ms ✦",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [lines, setLines] = useState<string[]>([]);
  const [cur, setCur] = useState("");

  useEffect(() => {
    let i = 0, j = 0, raf: number;
    const tick = () => {
      if (i >= TYPED.length) return;
      const line = TYPED[i];
      if (j <= line.length) {
        setCur(line.slice(0, j));
        j++;
        raf = window.setTimeout(tick, 28 + Math.random() * 30);
      } else {
        setLines((p) => [...p, line]);
        setCur("");
        i++; j = 0;
        raf = window.setTimeout(tick, 320);
      }
    };
    tick();
    return () => clearTimeout(raf);
  }, []);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink grain md:h-[110vh]">
      <div className="absolute inset-0 noise-grid opacity-40" />
      <CodeRain opacity={0.22} />
      <div className="aurora pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full md:h-[600px] md:w-[600px]" />
      <div className="aurora pointer-events-none absolute -right-40 -top-20 hidden h-[360px] w-[360px] rounded-full md:block md:h-[500px] md:w-[500px]" />

      {/* Giant outlined name */}
      <motion.div
        style={{ y, scale, opacity: op }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4"
      >
        <div className="relative z-10 text-center">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.4em] text-acid md:mb-6 md:text-[10px] md:tracking-[0.5em]">
            <span className="blink">●</span>  portfolio / v.2026.06
          </p>
          <h1
            data-text={NAME}
            className="glitch font-display text-[22vw] leading-[0.85] tracking-tighter text-bone md:text-[16vw]"
          >
            {NAME}
          </h1>
          <h1 className="-mt-2 font-display text-[22vw] leading-[0.85] tracking-tighter text-stroke-acid md:-mt-4 md:text-[16vw]">
            {SUB}
          </h1>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70 md:mt-6 md:text-xs md:tracking-[0.4em]">
            full-stack engineer · tokyo · 東京
          </p>
        </div>
      </motion.div>

      {/* Floating terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute bottom-20 left-4 right-4 z-20 mx-auto w-auto max-w-[420px] rounded border border-cyber/40 bg-ink/80 p-3 font-mono text-[10px] text-bone/90 shadow-[0_0_60px_oklch(0.78_0.18_200/0.3)] backdrop-blur md:bottom-24 md:left-12 md:right-auto md:w-[340px] md:p-4 md:text-[11px]"
        data-cursor data-cursor-label="exec"
      >
        <div className="mb-3 flex items-center gap-2 border-b border-cyber/20 pb-2">
          <span className="h-2 w-2 rounded-full bg-blood" />
          <span className="h-2 w-2 rounded-full bg-acid" />
          <span className="h-2 w-2 rounded-full bg-cyber" />
          <span className="ml-2 text-[9px] uppercase tracking-[0.3em] text-bone/40">~/yoshito — zsh</span>
        </div>
        <div className="space-y-1">
          {lines.map((l, i) => (
            <div key={i} className={l.startsWith("$") ? "text-acid" : "text-cyber"}>{l}</div>
          ))}
          {cur && (
            <div className={cur.startsWith("$") ? "text-acid" : "text-cyber"}>
              {cur}<span className="blink text-bone">▌</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Side rail */}
      <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {["github", "x.com", "rss", "mail"].map((s) => (
          <a key={s} href="#" data-cursor data-cursor-label="open" className="rotate-180 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50 transition-colors hover:text-acid [writing-mode:vertical-rl]">
            {s}
          </a>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60 md:bottom-6 md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span>scroll · スクロール</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-6 w-px bg-acid" />
        </div>
      </motion.div>
    </section>
  );
}
