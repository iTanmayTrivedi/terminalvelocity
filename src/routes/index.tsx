import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { StackOrbit } from "@/components/StackOrbit";
import { HorizontalWork } from "@/components/HorizontalWork";
import { LabSection } from "@/components/LabSection";
import { Manifesto } from "@/components/Manifesto";
import { Footer } from "@/components/Footer";
import { EasterEggs } from "@/components/EasterEggs";
import { SoundToggle } from "@/components/SoundToggle";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SmoothScroll } from "@/components/SmoothScroll";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tanmay Trivedi ─ Full-Stack Engineer / Tokyo" },
      { name: "description", content: "Tokyo-based full-stack engineer building loud, fast, considered software. TypeScript, Rust, Postgres, WebGL." },
      { property: "og:title", content: "Tanmay Trivedi ─ Full-Stack Engineer / Tokyo" },
      { property: "og:description", content: "Tokyo-based full-stack engineer. Loud, fast, considered software." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-ink">
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <EasterEggs />
      <SoundToggle />
      <Nav />
      <Hero />
      <MarqueeStrip />
      <StackOrbit />
      <MarqueeStrip reverse accent />
      <HorizontalWork />
      <Manifesto />
      <LabSection />
      <Footer />
    </main>
  );
}
