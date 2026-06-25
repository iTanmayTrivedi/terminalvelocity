import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

const PROJECTS = [
  { img: work1, n: "01", t: "kumo.ui", d: "headless design system · 47k weekly downloads", tag: "TS · React · Vite", c: "acid" },
  { img: work2, n: "02", t: "shizuka", d: "calm-tech saas for solo founders · YC W26", tag: "Next · tRPC · PG", c: "cyber" },
  { img: gallery1, n: "03", t: "haku.engine", d: "rust-powered realtime sync layer", tag: "Rust · WASM · CRDT", c: "blood" },
  { img: gallery2, n: "04", t: "neon/ghost", d: "generative type playground · webgl", tag: "GLSL · Three", c: "violet-glow" },
];

export function HorizontalWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section ref={ref} id="work" className="relative h-[400vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-6 top-10 z-10 md:left-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ 02 — selected work</p>
          <h2 className="mt-3 font-display text-5xl text-bone md:text-7xl">
            things <span className="italic">shipped</span>.
          </h2>
        </div>
        <div className="absolute bottom-10 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/40 md:right-12">
          ← drag · scroll · 横へ
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[10vw] pr-[10vw]">
          {PROJECTS.map((p) => (
            <motion.article
              key={p.n}
              whileHover={{ y: -12 }}
              data-cursor data-cursor-label="case"
              className="group relative h-[70vh] w-[70vw] max-w-[760px] flex-shrink-0 overflow-hidden border border-border bg-card"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.t}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

              <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `var(--${p.c})` }}>
                    project · {p.n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
                    {p.tag}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-6xl text-bone md:text-8xl">{p.t}</h3>
                  <p className="mt-3 max-w-md font-mono text-xs text-bone/70">{p.d}</p>
                  <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `var(--${p.c})` }}>
                    <span>read case</span>
                    <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
