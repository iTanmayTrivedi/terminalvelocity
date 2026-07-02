import { useEffect } from "react";

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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // in-page anchor links → smooth scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(scrollTimer);
      document.documentElement.classList.remove("is-scrolling");
      window.removeEventListener("wheel", markScrolling);
      window.removeEventListener("scroll", markScrolling);
      window.removeEventListener("touchmove", markScrolling);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
