import { useEffect, useState } from "react";
import { sfx } from "@/lib/sfx";

export function SoundToggle() {
  const [muted, setMuted] = useState(sfx.isMuted());
  useEffect(() => sfx.subscribe(setMuted), []);
  return (
    <button
      onClick={() => { const m = !muted; sfx.setMuted(m); if (!m) sfx.play("click"); }}
      data-cursor
      data-cursor-label={muted ? "on" : "off"}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      className="fixed bottom-5 right-5 z-[180] flex h-11 w-11 items-center justify-center border border-cyber/40 bg-ink/80 font-mono text-[10px] uppercase tracking-[0.2em] text-acid backdrop-blur transition-colors hover:border-acid hover:text-bone md:bottom-7 md:right-7"
    >
      {muted ? "▶" : "♪"}
    </button>
  );
}
