import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const el = t?.closest('[data-cursor]') as HTMLElement | null;
      if (el) {
        setHover(true);
        setLabel(el.getAttribute("data-cursor-label"));
      } else {
        setHover(false);
        setLabel(null);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </motion.div>
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hover ? 2.6 : 1, opacity: hover ? 1 : 0.7 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 backdrop-blur-[1px]">
          {label && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-white">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
