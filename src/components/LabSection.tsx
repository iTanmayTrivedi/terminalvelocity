import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ITEMS = [
  { t: "shader sandbox", d: "raymarched signed-distance fields for fun", i: "// fragment.glsl\nfloat sdf(vec3 p) {\n  return length(p) - 1.0;\n}" },
  { t: "type-safe rpc", d: "end-to-end typed wire over websockets", i: "type Router = {\n  user: () => User;\n  post: (id: ID) => Post;\n}" },
  { t: "edge cache", d: "stale-while-revalidate at the edge in 4ms", i: "await env.KV.put(key, val, {\n  expirationTtl: 60,\n  metadata: { v: 2 },\n})" },
];

export function LabSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} id="lab" className="relative overflow-hidden bg-bone py-32 text-ink">
      <motion.div style={{ y }} className="absolute -right-32 top-20 font-display text-[18vw] leading-none text-ink/[0.04]">
        ラボ
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-blood">/ 03 — lab</p>
          <h2 className="font-display text-6xl md:text-8xl">
            late-night <span className="italic">experiments</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.article
              key={it.t}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              whileHover={{ y: -8 }}
              data-cursor data-cursor-label="open"
              className="group relative overflow-hidden border border-ink/15 bg-ink p-6 text-bone"
            >
              <div className="absolute inset-0 noise-grid opacity-30" />
              <div className="relative">
                <pre className="overflow-hidden font-mono text-[11px] leading-relaxed text-acid">{it.i}</pre>
                <div className="mt-8 border-t border-bone/15 pt-4">
                  <h3 className="font-display text-2xl text-bone">{it.t}</h3>
                  <p className="mt-1 font-mono text-[11px] text-bone/60">{it.d}</p>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                  className="absolute bottom-0 left-0 h-px w-full bg-acid origin-left"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
