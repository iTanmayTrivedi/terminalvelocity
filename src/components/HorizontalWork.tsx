import { motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects";
import { TiltCard } from "./TiltCard";
import { ScrambleText } from "./ScrambleText";
import { sfx } from "@/lib/sfx";

export function HorizontalWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxTravelRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [isDesktop, setIsDesktop] = useState(true);
  const x = useMotionValue(0);
  const lockedProgress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const progress = useTransform(lockedProgress, [0, 1], ["0%", "100%"]);
  const counter = useTransform(lockedProgress, (v) =>
    String(Math.min(PROJECTS.length, Math.floor(v * PROJECTS.length) + 1)).padStart(2, "0"),
  );

  useEffect(() => {
    let raf = 0;

    const syncToScroll = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;

      const travel = maxTravelRef.current;
      const scrollRange = Math.max(section.offsetHeight - window.innerHeight, 1);
      const raw = (window.scrollY - section.offsetTop) / scrollRange;
      const p = Math.min(1, Math.max(0, raw));
      const nextPhase = raw < 0 ? "before" : raw > 1 ? "after" : "active";

      viewportRef.current?.setAttribute("data-pin-phase", nextPhase);
      lockedProgress.set(p);
      x.set(-p * travel);
    };

    const requestSync = () => {
      if (!raf) raf = requestAnimationFrame(syncToScroll);
    };

    const updateTravel = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      const travel = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      maxTravelRef.current = travel;
      setSectionHeight(`${Math.max(window.innerHeight + travel + 260, window.innerHeight)}px`);
      requestSync();
    };

    updateTravel();
    const settleTimer = window.setTimeout(updateTravel, 350);
    window.addEventListener("resize", updateTravel);
    window.addEventListener("scroll", requestSync, { passive: true });

    const observer = new ResizeObserver(updateTravel);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener("resize", updateTravel);
      window.removeEventListener("scroll", requestSync);
      observer.disconnect();
    };
  }, [lockedProgress, x]);

  // Mobile: vertical stack with snap — no scroll-jacking.
  if (!isDesktop) {
    return (
      <section id="work" className="relative bg-ink px-5 pt-28 pb-20">
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
            / 02 — selected work
          </p>
          <h2 className="mt-3 font-display text-5xl text-bone">
            things <span className="italic">shipped</span>.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative h-[68vh] min-h-[420px] w-full overflow-hidden border border-border bg-card active:border-acid/60"
            >
              <Link to="/work/$slug" params={{ slug: p.slug }} className="absolute inset-0 z-30" aria-label={`Open case: ${p.t}`} />
              <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `var(--${p.c})` }}>
                    project · {p.n}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/50">{p.tag}</span>
                </div>
                <div>
                  <h3 className="font-display text-5xl leading-[0.9] text-bone">{p.t}</h3>
                  <p className="mt-3 font-mono text-[11px] text-bone/70">{p.d}</p>
                  <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `var(--${p.c})` }}>
                    <span>read case</span>
                    <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>→</motion.span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="work" className="relative bg-ink" style={{ height: sectionHeight }}>
      <div
        ref={viewportRef}
        data-pin-phase="before"
        className="work-pin-panel left-0 right-0 flex h-[100svh] touch-pan-y flex-col overflow-hidden"
      >
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

        <div className="flex h-full items-center pt-8" style={{ perspective: 1400 }}>
          <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-[8vw] pr-[8vw] will-change-transform" data-scroll-critical>
            {PROJECTS.map((p) => (
              <TiltCard
                key={p.slug}
                max={10}
                className="group relative h-[76svh] min-h-[430px] w-[72vw] max-w-[820px] flex-shrink-0 overflow-hidden border border-border bg-card"
              >
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  data-cursor
                  data-cursor-label="case"
                  onMouseEnter={() => sfx.play("hover")}
                  onClick={() => sfx.play("click")}
                  className="absolute inset-0 z-30"
                  aria-label={`Open case: ${p.t}`}
                />
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={p.img}
                    alt={p.t}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    style={{ transform: "translateZ(0)" }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-12" style={{ transform: "translateZ(40px)" }}>
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
                    <ScrambleText
                      as="h3"
                      text={p.t}
                      trigger="view"
                      duration={600}
                      className="font-display text-6xl text-bone md:text-8xl"
                    />
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
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
