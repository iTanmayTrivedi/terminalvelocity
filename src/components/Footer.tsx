import { motion } from "motion/react";

export function Footer() {
  const links = [
    { name: "github", href: "#" },
    { name: "x / twitter", href: "#" },
    { name: "linkedin", href: "#" },
    { name: "email", href: "mailto:hi@yoshito.dev" },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden px-6 pt-32 pb-10 md:px-14">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-glow text-[14vw] leading-none md:text-[11rem]"
        >
          Let's build
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-4 text-right font-serif italic text-[14vw] leading-none text-ink/80 md:text-[11rem]"
        >
          something.
        </motion.h2>

        <div className="mt-20 flex flex-col gap-12 border-t border-ink/20 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
              available q3 2026
            </p>
            <a
              href="mailto:hi@yoshito.dev"
              data-cursor="hover"
              data-cursor-label="mail"
              className="mt-3 inline-block font-serif text-3xl text-ink underline-offset-8 hover:underline md:text-4xl"
            >
              hi@yoshito.dev
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-x-10 gap-y-3 font-mono text-[11px] uppercase tracking-[0.3em]">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  data-cursor-label="open"
                  className="group relative inline-block py-1 text-ink/70 transition-colors hover:text-ink"
                >
                  {l.name}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          <span>© 2026 yoshito</span>
          <span>東京 ・ tokyo, jp</span>
        </div>
      </div>
    </footer>
  );
}
