import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HeroSectionProps {
  onEnter: () => void;
}

const NAME = "SANJANA";

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  const [entering, setEntering] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleEnter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(() => onEnter(), 820);
    setTimeout(() => setEntering(false), 1600);
  };

  const onBtnMove = (e: React.MouseEvent) => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };

  const onBtnLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <>
      <section id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 sm:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-x-0 top-0 h-[46vh]"
            style={{ background: "radial-gradient(ellipse at top, hsla(210, 24%, 93%, 0.14), transparent 68%)" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(218, 56%, 56%, 0.18) 0%, transparent 68%)",
              transform: "translate(-50%, -50%)",
              filter: "blur(28px)",
            }}
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* slow drifting orbs for depth */}
          <motion.div
            className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full"
            style={{ background: "radial-gradient(circle, hsla(210, 24%, 93%, 0.16), transparent 70%)", filter: "blur(30px)" }}
            animate={{ x: [0, 30, -10, 0], y: [0, -22, 14, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[6%] bottom-[14%] h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, hsla(218, 74%, 66%, 0.18), transparent 72%)", filter: "blur(40px)" }}
            animate={{ x: [0, -24, 12, 0], y: [0, 18, -10, 0], opacity: [0.35, 0.6, 0.45, 0.35] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.55em" }}
            transition={{ duration: 1.6, delay: 0.2 }}
            className="mb-6 text-[10px] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            A Birthday Sanctuary · Vol. 19
          </motion.p>

          <h1 className="font-heading text-[5.5rem] leading-none tracking-tight text-aurora sm:text-[7rem] md:text-[10rem] lg:text-[13rem]" style={{ textShadow: "0 0 40px hsla(218, 56%, 56%, 0.18)" }}>
            XIX
          </h1>

          <div className="mt-5 flex items-baseline justify-center gap-[2px] font-heading text-xl italic sm:text-2xl md:text-3xl">
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: "hsl(var(--silver) / 0.94)" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 h-px w-20 origin-center"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--silver) / 0.4), transparent)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-7 max-w-xl text-sm leading-7 md:text-base"
            style={{ color: "hsl(var(--foreground) / 0.72)" }}
          >
            A deep midnight world spun in soft silver light — intimate, cinematic, and built only for you.
          </motion.p>

          <motion.div
            ref={btnRef}
            onMouseMove={onBtnMove}
            onMouseLeave={onBtnLeave}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            style={{ x: sx, y: sy }}
            className="glass mt-10 rounded-[30px] px-4 py-4 md:px-6"
          >
            <motion.button
              onClick={handleEnter}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="glow-button rounded-[22px] px-8 py-4 text-[11px] uppercase tracking-[0.32em] md:px-10"
              style={{ color: "hsl(var(--silver-light))" }}
            >
              Enter the Dream
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="mt-14 flex flex-col items-center gap-2"
          >
            <span
              className="text-[9px] uppercase tracking-[0.4em]"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.6)" }}
            >
              scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-7 w-[1px]"
              style={{ background: "linear-gradient(180deg, hsl(var(--silver) / 0.5), transparent)" }}
            />
          </motion.div>
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
            style={{ background: "hsla(222, 34%, 10%, 0.9)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] rounded-full border"
              style={{ borderColor: "hsla(210, 18%, 82%, 0.2)", transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 5.6, opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] rounded-full"
              style={{
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, hsla(210, 24%, 93%, 0.22) 0%, hsla(218, 56%, 56%, 0.14) 35%, transparent 72%)",
                filter: "blur(34px)",
              }}
              initial={{ scale: 0.7, opacity: 0.5 }}
              animate={{ scale: 2.6, opacity: 0 }}
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
