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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
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
    let scrolling = false;
    let scrollTimer = 0;
    const FRAME = 1000 / 24; // decorative canvas: keep it below scroll-critical work

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || scrolling) return;
      if (now - last < FRAME) return;
      last = now;

      ctx.fillStyle = "rgba(10, 10, 18, 0.14)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        const y = drops[i] * fontSize;
        ctx.fillStyle = drops[i] < 2 ? "rgba(220,255,210,0.9)" : "rgba(120,255,180,0.5)";
        ctx.fillText(ch, i * fontSize, y);
        if (y > c.height && Math.random() > 0.982) drops[i] = 0;
        drops[i] += 0.48;
      }
    };
    raf = requestAnimationFrame(draw);

    // Pause when offscreen
    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting && e.intersectionRatio > 0.45; },
      { threshold: [0, 0.45, 1] },
    );
    io.observe(c);

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => { scrolling = false; }, 140);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Pause when tab hidden
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="code-rain absolute inset-0 h-full w-full" style={{ opacity, contain: "strict" }} />;
}
