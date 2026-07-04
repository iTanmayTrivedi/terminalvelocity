import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProject, getNextProject, PROJECTS, type Project } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: getNextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [] };
    return {
      meta: [
        { title: `${p.t} — case study · tanmay.dev` },
        { name: "description", content: p.intro },
        { property: "og:title", content: `${p.t} — case study` },
        { property: "og:description", content: p.intro },
        { property: "og:image", content: p.img },
        { name: "twitter:image", content: p.img },
      ],
    };
  },
  component: CaseStudy,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-ink text-bone">
      <p className="font-mono text-xs">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink text-bone">
      <p className="font-display text-6xl">404</p>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-bone/60">no such case</p>
      <Link to="/" className="font-mono text-xs uppercase tracking-[0.3em] text-acid">← back home</Link>
    </div>
  ),
});

function CaseStudy() {
  const { project: p, next } = Route.useLoaderData() as { project: Project; next: Project };
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const heroOp = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <main className="relative bg-ink">
      <CustomCursor />
      <ScrollProgress />
      <Nav />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[110vh] overflow-hidden">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
          <img src={p.img} alt={p.t} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
          <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />
        </motion.div>

        <motion.div style={{ opacity: heroOp }} className="relative z-10 mx-auto flex h-screen max-w-7xl flex-col justify-end px-6 pb-24 md:px-12">
          <Link to="/" className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60 transition-colors hover:text-acid" data-cursor data-cursor-label="back">
            ← back / index
          </Link>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: `var(--${p.c})` }}>
            case · {p.n} / {p.tag}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-4 font-display text-[18vw] leading-[0.85] text-bone md:text-[12vw]"
          >
            {p.t}
          </motion.h1>
          <p className="mt-6 max-w-2xl font-mono text-sm text-bone/70">{p.d}</p>
        </motion.div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-border bg-ink">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {[
            { k: "year", v: p.year },
            { k: "role", v: p.role },
            { k: "client", v: p.client },
            { k: "stack", v: p.stack.slice(0, 3).join(" · ") },
          ].map((m) => (
            <div key={m.k} className="bg-ink p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">{m.k}</p>
              <p className="mt-3 font-mono text-xs text-bone">{m.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="relative bg-ink py-32">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display text-3xl leading-snug text-bone md:text-5xl"
          >
            {p.intro}
          </motion.p>
        </div>
      </section>

      {/* Body chapters */}
      <section className="relative bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="space-y-24">
            {p.body.map((b, i) => (
              <motion.div
                key={b.h}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="grid gap-8 md:grid-cols-[160px_1fr]"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">
                    ch · 0{i + 1}
                  </p>
                  <p className="mt-2 font-display text-2xl text-bone">{b.h}</p>
                </div>
                <p className="font-serif text-xl leading-relaxed text-bone/85 md:text-2xl">{b.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative border-y border-border bg-ink py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="mb-12 font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ outcomes</p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {p.metrics.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="border-t border-border pt-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">{m.k}</p>
                <p className="mt-3 font-display text-5xl md:text-6xl" style={{ color: `var(--${p.c})` }}>{m.v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative bg-ink py-24">
        <div className="mx-auto max-w-7xl space-y-8 px-6 md:px-12">
          {p.gallery.map((g, i) => (
            <motion.figure
              key={g + i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9 }}
              className="relative overflow-hidden border border-border"
            >
              <img src={g} alt={`${p.t} · ${i + 1}`} className="h-full w-full object-cover" />
              <div className="scanlines pointer-events-none absolute inset-0 opacity-20" />
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Stack & links */}
      <section className="relative border-t border-border bg-ink py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ stack</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-bone/80">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-acid">/ links</p>
            <ul className="mt-6 space-y-3 font-mono text-sm">
              {p.links.map((l) => (
                <li key={l.l}>
                  <a href={l.href} data-cursor data-cursor-label="open" className="text-bone transition-colors hover:text-acid">
                    {l.l} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="relative overflow-hidden border-t border-border bg-ink py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/50">next case → {next.n}</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            data-cursor
            data-cursor-label="next"
            className="group mt-4 block"
          >
            <h3 className="font-display text-[14vw] leading-[0.9] text-stroke transition-colors group-hover:text-bone md:text-[10vw]">
              {next.t}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-bone/60">{next.d}</p>
          </Link>

          <div className="mt-16 flex flex-wrap gap-3">
            {PROJECTS.map((other) => (
              <Link
                key={other.slug}
                to="/work/$slug"
                params={{ slug: other.slug }}
                data-cursor
                data-cursor-label="open"
                className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] transition-colors ${other.slug === p.slug ? "border-acid text-acid" : "border-border text-bone/60 hover:text-bone"}`}
              >
                {other.n} · {other.t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
