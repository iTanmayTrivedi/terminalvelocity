import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects";

export function HorizontalWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Travel distance: total inner width minus one viewport.
  // 4 cards * 70vw + 3 * 2rem gap + 10vw left pad = ~290vw. Move ~-190vw to reveal last card.
  const xRaw = useTransform(scrollYProgress, [0, 1], ["0vw", "-198vw"]);
  const x = useSpring(xRaw, { stiffness: 120, damping: 26, mass: 0.4 });

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(PROJECTS.length, Math.floor(v * PROJECTS.length) + 1)).padStart(2, "0"),
  );

  return (
    <section ref={ref} id="work" className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Section header — sits above the sticky panel, fades with progress */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 md:left-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
            / 02 — selected work
          </p>
          <h2 className="mt-3 font-display text-5xl text-bone md:text-7xl">
            things <span className="italic">shipped</span>.
          </h2>
        </div>

        {/* Counter / hint */}
        <div className="pointer-events-none absolute bottom-10 left-6 z-20 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50 md:left-12">
          <motion.span className="text-acid">{counter}</motion.span>
          <span className="text-bone/30"> / {String(PROJECTS.length).padStart(2, "0")}</span>
        </div>
        <div className="pointer-events-none absolute bottom-10 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/40 md:right-12">
          ← scroll · 横スクロール →
        </div>

        {/* Local horizontal progress bar */}
        <div className="pointer-events-none absolute bottom-20 left-6 right-6 z-20 h-px bg-bone/10 md:left-12 md:right-12">
          <motion.div style={{ width: progress }} className="h-full bg-gradient-to-r from-acid via-cyber to-violet-glow" />
        </div>

        {/* Horizontal track */}
        <div className="flex h-full items-center">
          <motion.div style={{ x }} className="flex gap-8 pl-[10vw] pr-[10vw] will-change-transform">
            {PROJECTS.map((p) => (
              <motion.article
                key={p.slug}
                whileHover={{ y: -12 }}
                data-cursor
                data-cursor-label="case"
                className="group relative h-[70vh] w-[70vw] max-w-[760px] flex-shrink-0 overflow-hidden border border-border bg-card"
              >
                <Link to="/work/$slug" params={{ slug: p.slug }} className="absolute inset-0 z-30" aria-label={`Open case: ${p.t}`} />
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.t}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: `var(--${p.c})` }}
                    >
                      project · {p.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
                      {p.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-6xl text-bone md:text-8xl">{p.t}</h3>
                    <p className="mt-3 max-w-md font-mono text-xs text-bone/70">{p.d}</p>
                    <div
                      className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em]"
                      style={{ color: `var(--${p.c})` }}
                    >
                      <span>read case</span>
                      <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                        →
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
