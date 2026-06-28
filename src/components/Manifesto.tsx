import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const WORDS =
  "i build software the way good architects pour concrete — slowly, with intent, knowing it will be load-bearing for a long time. no frameworks-of-the-month. no ai slop. just sharp tools, sharp types, sharp ideas.".split(
    " ",
  );

function Word({ progress, i, total, children }: { progress: MotionValue<number>; i: number; total: number; children: string }) {
  const start = i / total;
  const end = start + 1.4 / total;
  const op = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  return (
    <motion.span style={{ opacity: op, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <section ref={ref} id="manifesto" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <motion.div
        style={{ x: bgX, rotate: rot }}
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[24vw] leading-none text-bone/[0.04]"
      >
        信念 · doctrine
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-12">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-acid md:mb-12">
          / interlude — doctrine
        </p>
        <p className="font-display text-2xl leading-snug text-bone sm:text-3xl md:text-6xl">
          {WORDS.map((w, i) => (
            <Word key={i} progress={scrollYProgress} i={i} total={WORDS.length}>
              {w}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
