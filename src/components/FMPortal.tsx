import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Wifi, Volume2, Disc3 } from "lucide-react";

const TRACKS = [
  { title: "Golden Hour", artist: "JVKE", duration: 218 },
  { title: "Stargirl Interlude", artist: "The Weeknd", duration: 112 },
  { title: "Sunsetz", artist: "Cigarettes After Sex", duration: 232 },
  { title: "Heat Waves", artist: "Glass Animals", duration: 238 },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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

const FrequencyDial = () => (
  <div className="relative flex h-8 w-full items-end justify-center gap-[3px] opacity-60">
    {Array.from({ length: 40 }).map((_, i) => {
      const isMajor = i % 5 === 0;
      const isFM = i === 19;
      return (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: "1px",
            height: isFM ? "20px" : isMajor ? "16px" : "8px",
            background: isFM ? "hsl(var(--cobalt-glow))" : "hsl(var(--silver-dark) / 0.4)",
            boxShadow: isFM ? "0 0 10px hsl(var(--cobalt))" : "none",
          }}
        />
      );
    })}
  </div>
);

const FMPortal = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const t = setTimeout(() => setIsLive(true), 800);
    return () => clearTimeout(t);
  }, []);

  // simulated playback timer
  useEffect(() => {
    const id = setInterval(() => {
      setElapsed((e) => {
        const dur = TRACKS[trackIdx].duration;
        if (e + 1 >= dur) {
          setTrackIdx((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [trackIdx]);

  const handleBroadcast = () => {
    setIsTransitioning(true);
    timerRef.current = setTimeout(() => {
      window.location.href = "https://example.com";
    }, 3000);
  };

  const track = TRACKS[trackIdx];
  const progress = (elapsed / track.duration) * 100;

  return (
    <>
      <section id="fm" className="relative px-6 py-32">
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="radio-glass overflow-hidden rounded-3xl"
          >
            {/* Top status bar */}
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: "hsla(210, 20%, 72%, 0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Wifi size={12} style={{ color: "hsl(var(--cobalt))" }} />
                <span
                  className="text-[9px] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.6)" }}
                >
                  Sanjana FM · Studio One
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isLive && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5">
                    <motion.div
                      className="h-1.5 w-1.5 rounded-full bg-red-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    <span
                      className="text-[9px] uppercase tracking-[0.2em]"
                      style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.6)" }}
                    >
                      On Air
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Main display */}
            <div className="px-6 py-8 text-center md:px-10 md:py-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: "hsla(220, 60%, 55%, 0.08)",
                  border: "1px solid hsla(220, 60%, 55%, 0.2)",
                }}
              >
                <Disc3 size={22} strokeWidth={1.2} style={{ color: "hsl(var(--cobalt-glow))" }} />
              </motion.div>

              <p
                className="mb-2 text-[9px] uppercase tracking-[0.5em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}
              >
                Broadcast Frequency
              </p>

              <div className="relative mb-1">
                <h2 className="font-heading text-5xl font-light tracking-wider text-silver-shimmer md:text-6xl">19.0</h2>
                <span
                  className="text-[10px] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.5)" }}
                >
                  MHz
                </span>
              </div>

              <div className="my-6">
                <FrequencyDial />
              </div>

              {/* Now Playing card */}
              <div
                className="mb-6 rounded-2xl border px-5 py-4"
                style={{
                  background: "hsla(222, 30%, 12%, 0.5)",
                  borderColor: "hsla(210, 18%, 82%, 0.1)",
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="text-[8px] uppercase tracking-[0.4em]"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--cobalt-glow))" }}
                  >
                    ◉ Now Playing
                  </span>
                  <span
                    className="text-[9px] tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
                  >
                    {fmt(elapsed)} / {fmt(track.duration)}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={trackIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="font-heading text-base italic" style={{ color: "hsl(var(--silver-light))" }}>
                      {track.title}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
                    >
                      {track.artist}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* progress */}
                <div className="mt-3 h-[2px] rounded-full" style={{ background: "hsl(var(--silver-dark) / 0.18)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-linear"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, hsl(var(--cobalt)), hsl(var(--silver-light)))",
                      boxShadow: "0 0 8px hsla(218, 74%, 66%, 0.5)",
                    }}
                  />
                </div>
              </div>

              {/* Equalizer */}
              <div className="mb-6 flex h-10 items-center justify-center gap-[3px]">
                {Array.from({ length: 20 }).map((_, i) => (
                  <EQBar key={i} index={i} />
                ))}
              </div>

              {/* Volume */}
              <div className="mb-8 flex items-center justify-center gap-3">
                <Volume2 size={12} style={{ color: "hsl(var(--silver-dark) / 0.5)" }} />
                <div className="h-[2px] w-32 rounded-full" style={{ background: "hsl(var(--silver-dark) / 0.18)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, hsl(var(--cobalt)), hsl(var(--silver)))" }}
                    animate={{ width: ["40%", "70%", "55%", "80%", "40%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <motion.button
                onClick={handleBroadcast}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="glow-button rounded-2xl px-8 py-4 text-[11px] uppercase tracking-[0.3em]"
                style={{ color: "hsl(var(--silver) / 0.92)" }}
              >
                <Radio size={12} className="mr-2 inline" strokeWidth={1.6} />
                Tune into the Broadcast
              </motion.button>
            </div>

            {/* Bottom indicator */}
            <div className="flex justify-center pb-5">
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1 w-1 rounded-full"
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

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: "hsl(var(--midnight))" }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, hsla(210, 20%, 72%, 0.03) 2px, hsla(210, 20%, 72%, 0.03) 4px)`,
              }}
              animate={{ opacity: [0, 0.5, 0.2, 0.8, 0.1] }}
              transition={{ duration: 0.5, repeat: 5, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              }}
              animate={{ opacity: [0, 0.18, 0.05, 0.22, 0] }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1, 0] }}
              transition={{ duration: 2.5 }}
              className="z-10 text-[10px] uppercase tracking-[0.5em]"
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
