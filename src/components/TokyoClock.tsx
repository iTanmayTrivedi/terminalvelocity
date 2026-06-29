import { useEffect, useState } from "react";

function nowTokyo() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return fmt.format(new Date());
}

export function TokyoClock({ className = "" }: { className?: string }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    setT(nowTokyo());
    const id = window.setInterval(() => setT(nowTokyo()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const [hh, mm, ss] = t.split(":");
  return (
    <span className={`inline-flex items-center gap-1 font-mono tabular-nums ${className}`}>
      <span className="text-bone/80">{hh}</span>
      <span className="text-acid/70">:</span>
      <span className="text-bone/80">{mm}</span>
      <span className="text-acid/40">:</span>
      <span className="text-bone/40">{ss}</span>
      <span className="ml-1 text-bone/40">JST</span>
    </span>
  );
}
