import { useEffect, useRef, useState } from "react";

const CHARS = "アァカサタナハマヤラ0123456789!@#$%&*<>/\\";

export function ScrambleText({
  text,
  className,
  duration = 900,
  trigger = "view",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  duration?: number;
  trigger?: "view" | "mount" | "hover";
  as?: keyof JSX.IntrinsicElements;
}) {
  const [out, setOut] = useState(trigger === "mount" ? "" : text);
  const ref = useRef<HTMLElement>(null);
  const runningRef = useRef(false);

  const run = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    const start = performance.now();
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / duration);
      const reveal = Math.floor(text.length * t);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === " ") s += text[i];
        else s += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setOut(s);
      if (t < 1) requestAnimationFrame(tick);
      else { setOut(text); runningRef.current = false; }
    };
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount") { run(); return; }
    if (trigger !== "view" || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }),
      { threshold: 0.3 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      {out}
    </Tag>
  );
}
