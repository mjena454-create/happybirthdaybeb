import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps a section with a cinematic scroll-driven entry:
 * - subtle scale + rise + blur clears as it enters
 * - parallax depart as it leaves
 */
const SectionReveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.96, 1, 1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [70, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.35, 1, 1, 0.65]);
  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [8, 0, 0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity, filter, transformOrigin: "50% 40%" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;