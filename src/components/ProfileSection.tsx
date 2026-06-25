import { motion } from "motion/react";
import mascot from "@/assets/mascot.png";

export function ProfileSection() {
  const stack = [
    { name: "TypeScript", level: "daily driver" },
    { name: "React / Next", level: "5 years" },
    { name: "Node・Bun", level: "5 years" },
    { name: "PostgreSQL", level: "4 years" },
    { name: "Rust", level: "learning" },
    { name: "WebGL / GLSL", level: "playing" },
  ];

  return (
    <section id="profile" className="relative overflow-hidden px-6 py-32 md:px-14">
      <div className="mx-auto grid max-w-6xl gap-20 md:grid-cols-[1fr_1.4fr]">
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src={mascot}
            alt="Yoshito mascot"
            className="float-y mx-auto h-72 w-72 md:h-96 md:w-96"
          />
          <div className="absolute inset-0 -z-10 mx-auto h-72 w-72 rounded-full bg-white/40 blur-3xl md:h-96 md:w-96" />
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
            ─ profile
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-tight text-ink md:text-7xl">
            はじめまして、<br />
            <span className="italic">Yoshito</span> です。
          </h2>
          <div className="mt-8 max-w-lg space-y-5 text-ink/80 leading-relaxed">
            <p>
              Tokyo-based full-stack developer crafting quiet, considered software.
              I build interfaces with the same patience a painter gives to brushwork —
              every transition, every margin, weighed.
            </p>
            <p className="font-serif text-lg italic text-ink/70">
              静けさの中に、機能を。 — Function inside stillness.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
            {stack.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                data-cursor="hover"
                className="group border-t border-ink/15 pt-3"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink transition-colors group-hover:text-primary">
                  {s.name}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-ink/50">
                  {s.level}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
