import { motion } from "motion/react";

const links = [
  { l: "00", k: "index" },
  { l: "01", k: "stack" },
  { l: "02", k: "work" },
  { l: "03", k: "lab" },
  { l: "04", k: "contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="fixed inset-x-0 top-0 z-[140] flex items-center justify-between px-6 py-5 md:px-12"
    >
      <a href="#top" data-cursor data-cursor-label="home" className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-acid pulse-glow" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-bone">yoshito.dev</span>
      </a>
      <ul className="hidden gap-7 md:flex">
        {links.map((it) => (
          <li key={it.k}>
            <a
              href={`#${it.k}`}
              data-cursor data-cursor-label="go"
              className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70 transition-colors hover:text-acid"
            >
              <span className="text-acid/60 group-hover:text-acid">{it.l}</span>
              <span className="story-link">{it.k}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="hidden items-center gap-3 md:flex font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
        <span className="h-1.5 w-1.5 rounded-full bg-acid blink" />
        available · q3 2026
      </div>
    </motion.nav>
  );
}
