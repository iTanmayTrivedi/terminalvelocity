import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const t = () => {
      const d = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Tokyo", hour12: false });
      setTime(d + " JST");
    };
    t();
    const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, []);

  const btnRef = useRef<HTMLAnchorElement>(null);
  const [m, setM] = useState({ x: 0, y: 0 });
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink pt-24 pb-10 grain md:pt-32 md:pb-12">
      <div className="absolute inset-0 noise-grid opacity-30" />
      <div className="aurora pointer-events-none absolute -bottom-60 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full md:h-[700px] md:w-[700px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ 04 — contact</p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-5 font-display text-[16vw] leading-[0.9] text-bone md:mt-6 md:text-[10vw]"
        >
          let's <span className="italic text-stroke-acid">build</span>
          <br />
          something <span className="italic">loud</span>.
        </motion.h2>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 md:mt-16 md:flex-row md:items-end md:gap-10">
          <a
            ref={btnRef}
            href="mailto:hi@yoshito.dev"
            data-cursor data-cursor-label="send"
            onMouseMove={(e) => {
              const r = btnRef.current!.getBoundingClientRect();
              setM({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
            }}
            onMouseLeave={() => setM({ x: 0, y: 0 })}
            className="group relative inline-flex max-w-full items-center gap-3 border border-acid bg-acid px-6 py-5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-all hover:bg-transparent hover:text-acid md:gap-4 md:px-10 md:py-6 md:text-sm md:tracking-[0.3em]"
            style={{ transform: `translate(${m.x}px, ${m.y}px)` }}
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-ink group-hover:bg-acid pulse-glow" />
            <span className="truncate">hi@yoshito.dev</span>
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
          </a>

          <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">
            {["github", "x.com", "are.na", "linkedin"].map((s) => (
              <a key={s} href="#" data-cursor data-cursor-label="open" className="story-link hover:text-acid">{s} →</a>
            ))}
          </div>
        </div>

        <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 md:flex-row md:items-center">
          <span>© 2026 yoshito tanaka · all systems nominal</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-acid blink" />
            tokyo · {time}
          </span>
          <span>built with care · not by ai*</span>
        </div>
      </div>
    </footer>
  );
}
