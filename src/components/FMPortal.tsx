import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Wifi, Volume2 } from "lucide-react";

const EQBar = ({ index }: { index: number }) => {
  const heights = [12, 24, 8, 32, 16, 28, 10, 36, 20, 14, 30, 18, 26, 10, 34, 22, 8, 28, 16, 32];
  const h = heights[index % heights.length];
  return (
    <motion.div
      className="w-[2px] rounded-full"
      style={{ background: "linear-gradient(to top, hsl(var(--cobalt)), hsl(var(--silver-light)))" }}
      animate={{ height: [`${h * 0.3}px`, `${h}px`, `${h * 0.5}px`, `${h * 0.9}px`, `${h * 0.3}px`] }}
      transition={{ duration: 1.2 + index * 0.05, repeat: Infinity, ease: "easeInOut", delay: index * 0.04 }}
    />
  );
};

const FrequencyDial = () => {
  const marks = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="relative w-full h-8 flex items-end justify-center gap-[3px] opacity-40">
      {marks.map((i) => {
        const isMajor = i % 5 === 0;
        return (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: "1px",
              height: isMajor ? "16px" : "8px",
              background: i === 19
                ? "hsl(var(--cobalt-glow))"
                : "hsl(var(--silver-dark) / 0.3)",
              boxShadow: i === 19 ? "0 0 8px hsl(var(--cobalt))" : "none",
            }}
          />
        );
      })}
    </div>
  );
};

const FMPortal = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setIsLive(true), 1500);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleBroadcast = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = "https://example.com";
    }, 3000);
  };

  return (
    <>
      <section id="fm" className="relative py-32 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="radio-glass rounded-3xl overflow-hidden"
          >
            {/* Top status bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "hsla(210, 20%, 72%, 0.06)" }}>
              <div className="flex items-center gap-2">
                <Wifi size={12} style={{ color: "hsl(var(--cobalt))" }} />
                <span className="text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}>
                  Signal Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isLive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}>
                      Live
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Main display */}
            <div className="px-6 md:px-10 py-8 md:py-12 text-center">
              {/* Radio icon */}
              <motion.div
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6"
                style={{
                  background: "hsla(220, 60%, 55%, 0.08)",
                  border: "1px solid hsla(220, 60%, 55%, 0.15)",
                }}
              >
                <Radio size={20} strokeWidth={1.2} style={{ color: "hsl(var(--cobalt))" }} />
              </motion.div>

              <p className="text-[9px] tracking-[0.5em] uppercase mb-2" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}>
                Broadcast Frequency
              </p>

              {/* Big frequency display */}
              <div className="relative mb-2">
                <h2 className="font-heading text-5xl md:text-6xl font-light text-silver-shimmer tracking-wider">
                  19.0
                </h2>
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}>
                  MHz
                </span>
              </div>

              {/* Frequency dial */}
              <div className="my-6">
                <FrequencyDial />
              </div>

              {/* Equalizer */}
              <div className="flex items-center justify-center gap-[3px] h-10 mb-8">
                {Array.from({ length: 20 }).map((_, i) => (
                  <EQBar key={i} index={i} />
                ))}
              </div>

              {/* Volume indicator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Volume2 size={12} style={{ color: "hsl(var(--silver-dark) / 0.4)" }} />
                <div className="w-32 h-[2px] rounded-full" style={{ background: "hsl(var(--silver-dark) / 0.15)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(var(--cobalt)), hsl(var(--silver)))" }}
                    animate={{ width: ["40%", "70%", "55%", "80%", "40%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleBroadcast}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="glow-button rounded-2xl px-8 py-4 text-[11px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--silver) / 0.8)" }}
              >
                Listen to the Broadcast
              </motion.button>
            </div>

            {/* Bottom indicator */}
            <div className="flex justify-center pb-5">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full"
                    style={{ background: "hsl(var(--cobalt))" }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signal fade transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: "hsl(var(--midnight))" }}
          >
            {/* Scan lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(210, 20%, 72%, 0.02) 2px, hsla(210, 20%, 72%, 0.02) 4px)`,
              }}
              animate={{ opacity: [0, 0.5, 0.2, 0.8, 0.1] }}
              transition={{ duration: 0.5, repeat: 5, ease: "linear" }}
            />

            {/* Static noise */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
              animate={{ opacity: [0, 0.15, 0.05, 0.2, 0] }}
              transition={{ duration: 2.5, ease: "linear" }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1, 0] }}
              transition={{ duration: 2.5 }}
              className="text-[10px] tracking-[0.5em] uppercase z-10"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
            >
              Tuning Signal...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FMPortal;
