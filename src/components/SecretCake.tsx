import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake } from "lucide-react";

const SecretCake = () => {
  const [taps, setTaps] = useState(0);
  const [open, setOpen] = useState(false);
  const [blown, setBlown] = useState(false);

  const onTap = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= 3) {
      setOpen(true);
      setTaps(0);
    }
    setTimeout(() => setTaps(0), 1500);
  };

  const blowCandle = () => {
    if (blown) return;
    setBlown(true);
    const colors = ["#E7ECF2", "#C8D1DB", "#AEBBC8", "#EEF2F6"];
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x: 0.5, y: 0.55 },
      colors,
      shapes: ["circle"],
      scalar: 0.7,
      ticks: 280,
    });
  };

  return (
    <>
      {/* invisible XIX tap zone */}
      <button
        onClick={onTap}
        aria-label="Secret"
        className="fixed left-1/2 top-[40vh] z-[45] h-44 w-44 -translate-x-1/2 cursor-default opacity-0"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(false);
              setBlown(false);
            }}
            className="fixed inset-0 z-[115] flex items-center justify-center px-6"
            style={{ background: "hsla(222, 34%, 6%, 0.78)", backdropFilter: "blur(16px)" }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-sm rounded-[30px] p-10 text-center"
            >
              <p
                className="mb-2 text-[10px] uppercase tracking-[0.45em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                ✦ Secret unlocked ✦
              </p>
              <h3 className="mb-6 font-heading text-2xl italic text-silver-gradient">A little cake for you</h3>

              {/* Cake */}
              <div className="relative mx-auto mb-2 h-40 w-44">
                {/* candle flame */}
                <AnimatePresence>
                  {!blown && (
                    <motion.div
                      key="flame"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, repeat: blown ? 0 : Infinity }}
                      className="absolute left-1/2 top-2 h-4 w-3 -translate-x-1/2 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 70%, hsl(40, 95%, 78%) 0%, hsl(28, 90%, 60%) 60%, transparent 80%)",
                        boxShadow: "0 0 24px hsla(40, 95%, 70%, 0.7), 0 0 40px hsla(28, 90%, 60%, 0.4)",
                        filter: "blur(0.4px)",
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* smoke after blown */}
                <AnimatePresence>
                  {blown && (
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0.6, y: 0 }}
                      animate={{ opacity: 0, y: -40 }}
                      transition={{ duration: 2 }}
                      className="absolute left-1/2 top-0 h-6 w-2 -translate-x-1/2 rounded-full"
                      style={{ background: "hsl(var(--silver) / 0.4)", filter: "blur(4px)" }}
                    />
                  )}
                </AnimatePresence>

                {/* candle */}
                <div
                  className="absolute left-1/2 top-7 h-8 w-1.5 -translate-x-1/2 rounded-full"
                  style={{ background: "linear-gradient(180deg, hsl(var(--silver-light)), hsl(var(--silver-dark)))" }}
                />

                {/* top tier */}
                <div
                  className="absolute left-1/2 top-14 h-8 w-24 -translate-x-1/2 rounded-2xl glass-strong"
                  style={{ borderColor: "hsla(218, 74%, 66%, 0.3)" }}
                />
                {/* middle tier */}
                <div
                  className="absolute left-1/2 top-[88px] h-9 w-32 -translate-x-1/2 rounded-2xl glass"
                />
                {/* bottom tier */}
                <div
                  className="absolute left-1/2 top-[122px] h-10 w-40 -translate-x-1/2 rounded-2xl glass-strong"
                />

                {/* drips */}
                <div className="absolute left-1/2 top-[78px] flex -translate-x-1/2 gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-1 rounded-b-full"
                      style={{ background: "hsla(218, 74%, 66%, 0.5)" }}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
                {blown ? "Wish noted by the universe ✦" : "Tap the flame to blow it out"}
              </p>

              {!blown ? (
                <button
                  onClick={blowCandle}
                  className="glow-button mt-6 rounded-[22px] px-8 py-3 text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "hsl(var(--silver-light))" }}
                >
                  blow the candle
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    setBlown(false);
                  }}
                  className="mt-6 text-[10px] uppercase tracking-[0.4em] transition-opacity hover:opacity-70"
                  style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver))" }}
                >
                  close ✦
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecretCake;
