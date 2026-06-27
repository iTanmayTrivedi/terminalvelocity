import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const STACK = [
  { n: "TypeScript", c: "cyber" },
  { n: "React / Next", c: "acid" },
  { n: "Rust", c: "blood" },
  { n: "Go", c: "cyber" },
  { n: "Node · Bun", c: "acid" },
  { n: "PostgreSQL", c: "violet-glow" },
  { n: "Redis", c: "blood" },
  { n: "Kafka", c: "cyber" },
  { n: "Docker / K8s", c: "acid" },
  { n: "AWS · Fly.io", c: "violet-glow" },
  { n: "WebGL · GLSL", c: "cyber" },
  { n: "tRPC · GraphQL", c: "acid" },
];

export function StackOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={ref} id="stack" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 noise-grid opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 aurora opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-12">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ 01 — stack</p>
            <h2 className="font-display text-5xl text-bone md:text-8xl">
              the <span className="italic text-stroke-acid">arsenal</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-[11px] leading-relaxed text-bone/60 md:text-xs">
            a curated toolbelt. battle-tested in production at 2am
            on a friday. <span className="text-acid">no react bloat</span>.
          </p>
        </div>

        <motion.div style={{ rotate: rot }} className="origin-center">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {STACK.map((s, i) => (
              <motion.span
                key={s.n}
                whileHover={{ scale: 1.15, y: -8, rotate: i % 2 ? 4 : -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                data-cursor data-cursor-label={s.n.toLowerCase()}
                className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors md:px-5 md:py-2.5 md:text-sm`}
                style={{
                  borderColor: `var(--${s.c})`,
                  color: `var(--${s.c})`,
                  background: "transparent",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full pulse-glow" style={{ background: `var(--${s.c})` }} />
                {s.n}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {[
            { k: "deployed", v: "243", u: "production apps" },
            { k: "uptime", v: "99.98%", u: "last 12 months" },
            { k: "coffee", v: "∞", u: "cups consumed" },
          ].map((s) => (
            <div key={s.k} className="border-t border-border pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">{s.k}</p>
              <p className="mt-3 font-display text-6xl text-acid">{s.v}</p>
              <p className="mt-1 font-mono text-xs text-bone/60">{s.u}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
