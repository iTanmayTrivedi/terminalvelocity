import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/projects";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function normalizeWheelDelta(event: WheelEvent) {
  const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return rawDelta * 18;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return rawDelta * window.innerHeight;
  return rawDelta;
}

export function HorizontalWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchPointRef = useRef({ x: 0, y: 0 });
  const [maxTravel, setMaxTravel] = useState(1);
  const [isDesktop, setIsDesktop] = useState(true);
  const railProgress = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const xRaw = useTransform(railProgress, (value) => -value * maxTravel);
  const x = useSpring(xRaw, { stiffness: 120, damping: 26, mass: 0.4 });

  const progress = useTransform(railProgress, [0, 1], ["0%", "100%"]);
  const counter = useTransform(railProgress, (v) =>
    String(Math.min(PROJECTS.length, Math.floor(v * PROJECTS.length) + 1)).padStart(2, "0"),
  );

  useEffect(() => {
    const updateTravel = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      setMaxTravel(Math.max(track.scrollWidth - viewport.clientWidth, viewport.clientWidth));
    };

    updateTravel();
    window.addEventListener("resize", updateTravel);

    const observer = new ResizeObserver(updateTravel);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => {
      window.removeEventListener("resize", updateTravel);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const getLockState = (delta: number) => {
      const section = sectionRef.current;
      if (!section) return null;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = window.scrollY + rect.top;
      const currentY = window.scrollY;
      const nearSection = currentY >= sectionTop - 4 && currentY <= sectionTop + 4;
      const enteringFromAbove = delta > 0 && rect.top > 0 && rect.top < vh * 0.55;
      const enteringFromBelow = delta < 0 && rect.bottom > vh * 0.45 && rect.bottom < vh;

      if (!nearSection && !enteringFromAbove && !enteringFromBelow) return null;

      const current = railProgress.get();
      const atStart = current <= 0.0005;
      const atEnd = current >= 0.9995;
      // At an edge and trying to scroll past it → release.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return { release: true as const };

      return { release: false as const, sectionTop, current };
    };

    const moveRail = (delta: number) => {
      const state = getLockState(delta);
      if (!state || state.release) return false;

      if (Math.abs(window.scrollY - state.sectionTop) > 0.5) window.scrollTo(0, state.sectionTop);
      railProgress.set(clamp(state.current + delta / Math.max(maxTravel, window.innerWidth), 0, 1));
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      const delta = normalizeWheelDelta(event);
      if (Math.abs(delta) < 1) return;

      if (moveRail(delta)) event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      touchPointRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      const deltaX = touchPointRef.current.x - touch.clientX;
      const deltaY = touchPointRef.current.y - touch.clientY;
      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
      touchPointRef.current = { x: touch.clientX, y: touch.clientY };

      if (Math.abs(delta) < 1) return;
      if (moveRail(delta * 2.4)) event.preventDefault();
    };

    document.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    document.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    document.addEventListener("touchmove", handleTouchMove, { capture: true, passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel, { capture: true });
      document.removeEventListener("touchstart", handleTouchStart, { capture: true });
      document.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, [maxTravel, railProgress]);

  return (
    <section ref={sectionRef} id="work" className="relative h-screen bg-ink">
      <div ref={viewportRef} className="sticky top-0 flex h-screen touch-pan-x flex-col overflow-hidden">
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
          <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-[10vw] pr-[10vw] will-change-transform">
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
