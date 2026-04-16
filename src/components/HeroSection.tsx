import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [entering, setEntering] = useState(false);

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(() => onEnter(), 820);
    setTimeout(() => setEntering(false), 1600);
  };

  return (
    <>
      <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-x-0 top-0 h-[46vh]"
            style={{ background: "radial-gradient(ellipse at top, hsla(210, 24%, 93%, 0.14), transparent 68%)" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(218, 56%, 56%, 0.15) 0%, transparent 68%)",
              transform: "translate(-50%, -50%)",
              filter: "blur(24px)",
            }}
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
        >
          <p
            className="mb-6 text-[10px] uppercase tracking-[0.55em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            A Birthday Sanctuary
          </p>

          <h1 className="font-heading text-[7rem] leading-none tracking-tight text-silver-shimmer md:text-[10rem] lg:text-[13rem]">
            XIX
          </h1>

          <p className="mt-4 font-heading text-2xl font-light italic md:text-3xl" style={{ color: "hsl(var(--silver) / 0.92)" }}>
            Sanjana
          </p>

          <div
            className="mt-7 h-px w-20"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--silver) / 0.35), transparent)" }}
          />

          <p className="mt-7 max-w-xl text-sm leading-7 md:text-base" style={{ color: "hsl(var(--foreground) / 0.72)" }}>
            A deep midnight navy world in soft silver light — intimate, cinematic, and made only for her.
          </p>

          <div className="glass mt-10 rounded-[30px] px-4 py-4 md:px-6">
            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="glow-button rounded-[22px] px-8 py-4 text-[11px] uppercase tracking-[0.32em] md:px-10"
              style={{ color: "hsl(var(--silver-light))" }}
            >
              Enter the Dream
            </motion.button>
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {entering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "hsla(222, 34%, 10%, 0.88)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] rounded-full border"
              style={{ borderColor: "hsla(210, 18%, 82%, 0.18)", transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 5.6, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, hsla(210, 24%, 93%, 0.2) 0%, hsla(218, 56%, 56%, 0.12) 35%, transparent 72%)",
                filter: "blur(34px)",
              }}
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: 2.4, opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: [0, 1, 0], y: [12, 0, -8] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative z-10 text-[10px] uppercase tracking-[0.5em]"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
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
