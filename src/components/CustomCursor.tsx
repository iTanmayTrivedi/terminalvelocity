import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { sfx } from "@/lib/sfx";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });
  const rx = useSpring(x, { stiffness: 110, damping: 14, mass: 0.7 });
  const ry = useSpring(y, { stiffness: 110, damping: 14, mass: 0.7 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const lastHoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null;
      if (el) {
        if (lastHoverRef.current !== el) { sfx.play("hover"); lastHoverRef.current = el; }
        setHover(true); setLabel(el.getAttribute("data-cursor-label"));
      } else {
        lastHoverRef.current = null;
        setHover(false); setLabel(null);
      }
    };
    const d = () => { setDown(true); sfx.play("click"); };
    const u = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", d);
    window.addEventListener("mouseup", u);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", d);
      window.removeEventListener("mouseup", u);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
      <motion.div style={{ x: sx, y: sy }} className="absolute -translate-x-1/2 -translate-y-1/2">
        <div className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_14px_var(--acid)]" />
      </motion.div>
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 3 : down ? 0.6 : 1, rotate: hover ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyber/70" />
          <div className="absolute -inset-1 rounded-full border border-acid/30 spin-slow" style={{ borderStyle: "dashed" }} />
          {label && (
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone">
              {label}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
