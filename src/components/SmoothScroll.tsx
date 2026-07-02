import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let scrollTimer = 0;
    const markScrolling = () => {
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 150);
    };

    window.addEventListener("wheel", markScrolling, { passive: true });
    window.addEventListener("scroll", markScrolling, { passive: true });
    window.addEventListener("touchmove", markScrolling, { passive: true });

    // Skip Lenis on touch/reduced-motion — native momentum is better
    const skipLenis = window.matchMedia("(hover: none), (pointer: coarse)").matches
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skipLenis) {
      return () => {
        window.clearTimeout(scrollTimer);
        document.documentElement.classList.remove("is-scrolling");
        window.removeEventListener("wheel", markScrolling);
        window.removeEventListener("scroll", markScrolling);
        window.removeEventListener("touchmove", markScrolling);
      };
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      syncTouch: false,
      autoRaf: false,
    });
    // in-page anchor links → smooth scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -40, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scrollTimer);
      document.documentElement.classList.remove("is-scrolling");
      window.removeEventListener("wheel", markScrolling);
      window.removeEventListener("scroll", markScrolling);
      window.removeEventListener("touchmove", markScrolling);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}
