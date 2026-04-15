import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [entering, setEntering] = useState(false);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => onEnter(), 1800);
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Floating star particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="dust-mote"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-center z-10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-8"
          >
            A Birthday Sanctuary
          </motion.p>

          <h1 className="font-heading text-8xl md:text-[10rem] lg:text-[12rem] font-light tracking-tight mb-2 text-silver-shimmer">
            XIX
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-heading text-xl md:text-2xl italic text-foreground/40 font-light mb-12"
          >
            Sanjana
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="w-24 h-px bg-primary/20 mx-auto mb-12"
          />

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            onClick={handleEnter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glow-button rounded-full px-10 py-4 font-body text-sm tracking-[0.3em] uppercase text-foreground/80 bg-transparent"
          >
            Enter the Dream
          </motion.button>
        </motion.div>
      </section>

      {/* Zoom-in star transition */}
      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 20 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "radial-gradient(circle, hsl(var(--cobalt) / 0.3) 0%, hsl(var(--midnight)) 70%)" }}
          >
            {/* Star field effect */}
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  background: `hsl(var(--silver-light))`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.8,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
