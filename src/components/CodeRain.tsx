import { useEffect, useRef } from "react";

const CHARS = "アァカサタナハマヤラワABCDEF0123456789{}<>/*=+-_$";

export function CodeRain({ opacity = 0.18 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Skip on touch / reduced motion — pure decoration
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 16 * dpr;

    const resize = () => {
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      cols = Math.floor(c.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    let visible = true;
    const FRAME = 1000 / 30; // cap at 30fps

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      if (now - last < FRAME) return;
      last = now;

      ctx.fillStyle = "rgba(10, 10, 18, 0.09)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        const y = drops[i] * fontSize;
        ctx.fillStyle = drops[i] < 2 ? "rgba(220,255,210,0.9)" : "rgba(120,255,180,0.5)";
        ctx.fillText(ch, i * fontSize, y);
        if (y > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      }
    };
    raf = requestAnimationFrame(draw);

    // Pause when offscreen
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(c);

    // Pause when tab hidden
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ opacity, contain: "strict" }} />;
}
