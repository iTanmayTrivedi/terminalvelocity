import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import mascot from "@/assets/mascot.png";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative grain min-h-screen w-full overflow-hidden">
      <motion.div
        style={{ scale: bgScale, y }}
        className="absolute inset-0 -z-10"
      >
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky/30 via-transparent to-background" />
      </motion.div>

      {/* top bar */}
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-8 py-6 md:px-14 md:py-8">
        <div className="flex items-center gap-3">
          <img src={mascot} alt="" className="h-10 w-10 float-y-slow" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
            yoshito.dev
          </span>
        </div>
        <nav className="hidden gap-10 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70 md:flex">
          {["works", "gallery", "profile", "contact"].map((l) => (
            <a
              key={l}
              href={`#${l}`}
              data-cursor="hover"
              data-cursor-label="go"
              className="group relative"
            >
              <span className="transition-colors group-hover:text-ink">{l}</span>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-ink transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </header>

      {/* floating mascot */}
      <motion.img
        src={mascot}
        alt=""
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute right-[12%] top-[18%] z-10 h-40 w-40 float-y md:h-56 md:w-56"
      />

      {/* center title */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex min-h-screen items-center justify-center px-6"
      >
        <div className="text-center">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.5em] text-ink/60">
            full-stack developer ・ 東京
          </p>
          <h1 className="font-serif text-glow text-[14vw] leading-[0.95] md:text-[10rem]">
            Yoshito Portfolio
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 h-px w-[60%] max-w-xl origin-left bg-white/70"
          />
          <p className="mt-8 font-serif text-xl italic text-ink/70 md:text-2xl">
            コードという絵筆で、世界を描く。
          </p>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mt-3 h-10 w-px bg-ink/50"
        />
      </motion.div>
    </section>
  );
}
