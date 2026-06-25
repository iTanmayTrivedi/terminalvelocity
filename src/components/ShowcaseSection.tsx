import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface Props {
  id: string;
  label: string;
  tagline: ReactNode;
  cta: string;
  ctaHref: string;
  images: { src: string; title: string; meta: string }[];
  align?: "left" | "right";
}

export function ShowcaseSection({ id, label, tagline, cta, ctaHref, images, align = "left" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], align === "left" ? [0, -200] : [-200, 0]);
  const imgY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [-40, 100]);

  return (
    <section ref={ref} id={id} className="relative min-h-screen overflow-hidden px-6 py-32 md:px-14">
      {/* giant marquee word */}
      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none mb-20 whitespace-nowrap font-serif text-[18vw] leading-none text-white/40 md:text-[14rem]"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="mr-12 italic">
            {label}
          </span>
        ))}
      </motion.div>

      <div className={`mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:gap-24 ${align === "right" ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60"
          >
            ─ {label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif text-5xl leading-tight text-ink md:text-7xl"
          >
            {tagline}
          </motion.h2>
          <motion.a
            href={ctaHref}
            data-cursor="hover"
            data-cursor-label="open"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="group mt-10 inline-flex w-fit items-center gap-4 border-b border-ink/40 pb-2 font-mono text-xs uppercase tracking-[0.3em] text-ink"
          >
            <span>{cta}</span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">→</span>
          </motion.a>
        </div>

        <div className="relative grid grid-cols-2 gap-5">
          <motion.figure
            style={{ y: imgY1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            data-cursor="hover"
            data-cursor-label="view"
            className="group relative aspect-[3/4] overflow-hidden rounded-md shadow-[0_30px_60px_-20px_oklch(0.5_0.12_240/0.3)]"
          >
            <img
              src={images[0].src}
              alt={images[0].title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-serif text-2xl text-white">{images[0].title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">{images[0].meta}</p>
            </figcaption>
          </motion.figure>
          <motion.figure
            style={{ y: imgY2 }}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
            data-cursor="hover"
            data-cursor-label="view"
            className="group relative mt-16 aspect-[3/4] overflow-hidden rounded-md shadow-[0_30px_60px_-20px_oklch(0.5_0.12_240/0.3)]"
          >
            <img
              src={images[1].src}
              alt={images[1].title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-serif text-2xl text-white">{images[1].title}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">{images[1].meta}</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
