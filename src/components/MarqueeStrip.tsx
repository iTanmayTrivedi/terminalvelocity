const WORDS = ["TYPESCRIPT", "★", "RUST", "✦", "POSTGRES", "✺", "REACT", "◆", "GO", "✧", "WEBGL", "◉", "BUN", "✶"];

export function MarqueeStrip({ reverse = false, accent = false }: { reverse?: boolean; accent?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border-y border-border ${accent ? "bg-acid text-ink" : "bg-ink text-bone"} py-5 md:py-6`}
      style={{ contain: "content", contentVisibility: "auto", containIntrinsicSize: "1px 160px" }}
    >
      <div className="whitespace-nowrap" style={{ transform: `skewY(${reverse ? 3 : -3}deg)` }}>
        <div
          className={`marquee-track ${reverse ? "marquee-track-rev" : ""} font-display text-[clamp(4.5rem,8vw,8rem)] leading-none tracking-tight`}
          style={{ willChange: "transform" }}
        >
          {[...WORDS, ...WORDS].map((w, i) => (
            <span key={i} className={i % 4 === 1 ? "italic opacity-60" : ""}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

