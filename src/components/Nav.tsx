import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { TokyoClock } from "./TokyoClock";


const links = [
  { l: "00", k: "index", href: "#top" },
  { l: "01", k: "stack", href: "#stack" },
  { l: "02", k: "work", href: "#work" },
  { l: "03", k: "lab", href: "#lab" },
  { l: "04", k: "contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="fixed inset-x-0 top-0 z-[140] flex items-center justify-between px-5 py-4 md:px-12 md:py-5"
      >
        <a href="#top" data-cursor data-cursor-label="home" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-acid pulse-glow" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone md:text-xs">yoshito.dev</span>
        </a>
        <ul className="hidden gap-7 md:flex">
          {links.map((it) => (
            <li key={it.k}>
              <a
                href={it.href}
                data-cursor data-cursor-label="go"
                className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone/70 transition-colors hover:text-acid"
              >
                <span className="text-acid/60 group-hover:text-acid">{it.l}</span>
                <span className="story-link">{it.k}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-4 md:flex font-mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
          <TokyoClock className="text-[10px] tracking-[0.2em]" />
          <span className="h-3 w-px bg-bone/20" />
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-acid blink" />
            available · q3 2026
          </span>
        </div>


        {/* Mobile burger */}
        <button
          aria-label="menu"
          onClick={() => setOpen((o) => !o)}
          className="relative z-[150] flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-bone/20 bg-ink/60 backdrop-blur md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="block h-px w-4 bg-acid"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            className="block h-px w-4 bg-acid"
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[145] flex flex-col bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="absolute inset-0 noise-grid opacity-40" />
            <div className="relative flex h-full flex-col justify-between px-6 pb-12 pt-24">
              <ul className="flex flex-col gap-6">
                {links.map((it, i) => (
                  <motion.li
                    key={it.k}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <a
                      href={it.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="font-mono text-xs text-acid">{it.l}</span>
                      <span className="font-display text-5xl text-bone group-hover:text-acid">
                        {it.k}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-acid blink" />
                  available · q3 2026
                </span>
                <TokyoClock className="text-[10px] tracking-[0.2em]" />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
