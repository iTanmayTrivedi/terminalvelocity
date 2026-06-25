import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

const WORDS = ["TYPESCRIPT", "★", "RUST", "✦", "POSTGRES", "✺", "REACT", "◆", "GO", "✧", "WEBGL", "◉", "BUN", "✶"];

export function MarqueeStrip({ reverse = false, accent = false }: { reverse?: boolean; accent?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [reverse ? 6 : -6, 0, reverse ? -6 : 6]);
  return (
    <div ref={ref} className={`relative overflow-hidden border-y border-border ${accent ? "bg-acid text-ink" : "bg-ink text-bone"} py-6`}>
      <motion.div style={{ skewY: skew }} className="whitespace-nowrap">
        <div className={`marquee-track ${reverse ? "marquee-track-rev" : ""} font-display text-[8vw] leading-none tracking-tight`}>
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className={i % 4 === 1 ? "italic opacity-60" : ""}>{w}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
