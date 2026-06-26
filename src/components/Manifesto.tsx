import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const WORDS =
  "i build software the way good architects pour concrete — slowly, with intent, knowing it will be load-bearing for a long time. no frameworks-of-the-month. no ai slop. just sharp tools, sharp types, sharp ideas.".split(
    " ",
  );

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-40">
      <motion.div
        style={{ x: bgX, rotate: rot }}
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[24vw] leading-none text-bone/[0.04]"
      >
        信念 · doctrine
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <p className="mb-12 font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
          / interlude — doctrine
        </p>
        <p className="font-display text-3xl leading-snug text-bone md:text-6xl">
          {WORDS.map((w, i) => {
            const start = i / WORDS.length;
            const end = start + 1.4 / WORDS.length;
            const op = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            return (
              <motion.span key={i} style={{ opacity: op }} className="mr-[0.25em] inline-block">
                {w}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
