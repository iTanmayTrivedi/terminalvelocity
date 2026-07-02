import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX: sx, transformOrigin: "0 0" }}
      className="fixed inset-x-0 top-0 z-[150] h-[2px] bg-gradient-to-r from-acid via-cyber to-violet-glow"
    />
  );
}
