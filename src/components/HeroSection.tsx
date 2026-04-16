import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [entering, setEntering] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSubtext(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setEntering(true);
    setTimeout(() => onEnter(), 2200);
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(220, 60%, 55%, 0.04) 0%, transparent 70%)",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(210, 20%, 72%, 0.03) 0%, transparent 70%)",
              bottom: "10%",
              right: "20%",
            }}
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="dust-mote"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center z-10 flex flex-col items-center"
        >
          {/* Micro label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[10px] tracking-[0.6em] uppercase mb-10"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}
          >
            A Digital Sanctuary
          </motion.p>

          {/* The main XIX */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[8rem] md:text-[12rem] lg:text-[16rem] font-light leading-none tracking-tight text-silver-shimmer"
            style={{ lineHeight: 0.85 }}
          >
            XIX
          </motion.h1>

          {/* Thin line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="w-16 h-px mt-8 mb-6"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--silver) / 0.3), transparent)" }}
          />

          {/* Name */}
          <AnimatePresence>
            {showSubtext && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <p
                  className="font-heading text-xl md:text-2xl italic font-light"
                  style={{ color: "hsl(var(--silver-dark) / 0.6)" }}
                >
                  Sanjana
                </p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  onClick={handleEnter}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glow-button rounded-2xl px-10 py-4 font-body text-[11px] tracking-[0.35em] uppercase mt-4"
                  style={{ color: "hsl(var(--silver) / 0.8)" }}
                >
                  Enter the Dream
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Cinematic transition */}
      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "hsl(var(--midnight))" }}
          >
            {/* Expanding rings */}
            {[0, 0.3, 0.6].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: "hsla(210, 20%, 72%, 0.08)" }}
                initial={{ width: 0, height: 0, opacity: 0.5 }}
                animate={{ width: "200vw", height: "200vw", opacity: 0 }}
                transition={{ duration: 2, delay, ease: "easeOut" }}
              />
            ))}

            {/* Stars rushing past */}
            {Array.from({ length: 80 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const distance = 50 + Math.random() * 50;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${1 + Math.random() * 1.5}px`,
                    height: `${1 + Math.random() * 1.5}px`,
                    background: "hsl(var(--silver-light))",
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos(angle) * distance + "vw",
                    y: Math.sin(angle) * distance + "vh",
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + Math.random() * 0.8,
                    ease: "easeIn",
                  }}
                />
              );
            })}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: 0.5 }}
              className="text-[10px] tracking-[0.5em] uppercase z-10"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}
            >
              entering the dream
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroSection;
