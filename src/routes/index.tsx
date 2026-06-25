import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { NewsTicker } from "@/components/NewsTicker";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { ProfileSection } from "@/components/ProfileSection";
import { Footer } from "@/components/Footer";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yoshito ─ Full-Stack Developer Portfolio" },
      { name: "description", content: "Tokyo-based full-stack developer. Quiet, considered software with the patience of a painter." },
      { property: "og:title", content: "Yoshito ─ Full-Stack Developer Portfolio" },
      { property: "og:description", content: "Tokyo-based full-stack developer. Quiet, considered software." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <CustomCursor />
      <Hero />
      <NewsTicker />
      <ShowcaseSection
        id="works"
        label="works"
        tagline={<>Commission and<br /><span className="italic">personal</span> digital works.</>}
        cta="view all works"
        ctaHref="#works"
        images={[
          { src: work1, title: "kumo.ui", meta: "design system ・ 2026" },
          { src: work2, title: "shizuka", meta: "indie saas ・ 2025" },
        ]}
      />
      <ShowcaseSection
        id="gallery"
        label="gallery"
        tagline={<>Analog sketches<br /><span className="italic">behind</span> the code.</>}
        cta="open gallery"
        ctaHref="#gallery"
        align="right"
        images={[
          { src: gallery1, title: "schema study #03", meta: "graphite ・ 2026" },
          { src: gallery2, title: "interface ghost", meta: "watercolor ・ 2025" },
        ]}
      />
      <ProfileSection />
      <Footer />
    </main>
  );
}
