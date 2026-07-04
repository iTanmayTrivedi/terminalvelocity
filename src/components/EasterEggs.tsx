import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { sfx } from "@/lib/sfx";
import { PROJECTS } from "@/lib/projects";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function EasterEggs() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>([
    "tanmay.dev terminal v1.0 — type `help` for commands.",
  ]);
  const [rave, setRave] = useState(false);
  const navigate = useNavigate();
  const buf = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Konami
      buf.current.push(e.key);
      if (buf.current.length > KONAMI.length) buf.current.shift();
      if (KONAMI.every((k, i) => buf.current[i]?.toLowerCase() === k.toLowerCase())) {
        buf.current = [];
        setRave((r) => !r);
        sfx.play("success");
      }
      // Command palette: ~ or ` (avoid when typing in inputs)
      const target = e.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (!typing && (e.key === "~" || e.key === "`")) {
        e.preventDefault();
        setOpen((o) => !o);
        sfx.play("open");
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("rave-mode", rave);
  }, [rave]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const out = (s: string) => setLog((l) => [...l, `→ ${s}`]);
    setLog((l) => [...l, `$ ${raw}`]);
    sfx.play("type");

    if (cmd === "help") {
      out("help · clear · rave · mute · unmute · goto <home|work|lab|manifesto> · open <01-04>");
    } else if (cmd === "clear") {
      setLog([]);
    } else if (cmd === "rave") {
      setRave((r) => !r); out("rave-mode toggled. konami code does the same.");
      sfx.play("glitch");
    } else if (cmd === "mute") {
      sfx.setMuted(true); out("muted.");
    } else if (cmd === "unmute") {
      sfx.setMuted(false); sfx.play("success"); out("unmuted.");
    } else if (cmd.startsWith("goto ")) {
      const target = cmd.slice(5);
      const map: Record<string, string> = { home: "top", work: "work", lab: "lab", manifesto: "manifesto" };
      const id = map[target];
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        out(`scrolling to /${target}`);
        setOpen(false);
      } else out(`unknown target: ${target}`);
    } else if (cmd.startsWith("open ")) {
      const n = cmd.slice(5).padStart(2, "0");
      const p = PROJECTS.find((x) => x.n === n);
      if (p) { navigate({ to: "/work/$slug", params: { slug: p.slug } }); setOpen(false); out(`opening ${p.t}…`); }
      else out(`no project ${n}`);
    } else {
      out(`command not found: ${cmd}. try \`help\`.`);
    }
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[220] flex items-start justify-center bg-ink/70 px-4 pt-[14vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl border border-cyber/40 bg-ink/95 shadow-[0_0_80px_oklch(0.78_0.18_200/0.4)]"
            >
              <div className="flex items-center gap-2 border-b border-cyber/30 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-blood" />
                <span className="h-2 w-2 rounded-full bg-acid" />
                <span className="h-2 w-2 rounded-full bg-cyber" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">~/tanmay · cmd</span>
                <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.3em] text-bone/30">esc</span>
              </div>
              <div className="max-h-[40vh] overflow-y-auto px-4 py-3 font-mono text-[11px] text-bone/85">
                {log.map((l, i) => (
                  <div key={i} className={l.startsWith("$") ? "text-acid" : l.startsWith("→") ? "text-cyber" : "text-bone/60"}>{l}</div>
                ))}
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); run(input); }}
                className="flex items-center gap-2 border-t border-cyber/30 px-4 py-3 font-mono text-[12px]"
              >
                <span className="text-acid">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type a command…"
                  className="flex-1 bg-transparent text-bone outline-none placeholder:text-bone/30"
                />
                <span className="blink text-acid">▌</span>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tiny corner hint */}
      <div className="pointer-events-none fixed bottom-5 left-5 z-[170] hidden font-mono text-[9px] uppercase tracking-[0.3em] text-bone/30 md:block">
        press <span className="text-acid">~</span> · ↑↑↓↓←→←→ba
      </div>
    </>
  );
}
