import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background:
          "linear-gradient(90deg, hsl(var(--cobalt)) 0%, hsl(var(--silver-light)) 50%, hsl(var(--cobalt-glow)) 100%)",
        boxShadow: "0 0 14px hsla(218, 74%, 66%, 0.5)",
      }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px]"
    />
  );
};

export default ScrollProgress;
