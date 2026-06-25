import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const news = [
  "2026.07 ─ Open-sourced kumo, a tiny react state lib",
  "2026.06 ─ Talk at TokyoJS: \"Quiet interfaces\"",
  "2026.05 ─ Shipped v2 of an indie SaaS, 10k users",
  "2026.03 ─ Joined consulting collective 雲 (kumo)",
];

export function NewsTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-ink/15 bg-mist/60 py-6">
      <motion.div style={{ rotate }} className="marquee-track font-mono text-xs uppercase tracking-[0.3em] text-ink/70">
        {Array.from({ length: 2 }).flatMap((_, i) =>
          news.map((n, j) => (
            <span key={`${i}-${j}`} className="flex items-center gap-16">
              <span>{n}</span>
              <span className="opacity-40">✦</span>
            </span>
          )),
        )}
      </motion.div>
    </section>
  );
}
