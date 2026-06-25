import { useEffect, useRef } from "react";

const CHARS = "アァカサタナハマヤラワABCDEF0123456789{}<>/*=+-_$";

export function CodeRain({ opacity = 0.18 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const fontSize = 14 * dpr;
    const cols = Math.floor(c.width / fontSize);
    const drops = Array(cols).fill(0).map(() => Math.random() * -50);
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 18, 0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = drops[i] < 2 ? "rgba(220,255,210,0.9)" : "rgba(120,255,180,0.55)";
        ctx.fillText(ch, i * fontSize, y);
        if (y > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" style={{ opacity }} />;
}
