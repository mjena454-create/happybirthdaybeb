import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Pause } from "lucide-react";

/**
 * Floating ambient music toggle — uses the Web Audio API to generate a soft
 * midnight pad (no audio assets required). Premium glass pill, bottom-right.
 */
const AmbientPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; osc2: OscillatorNode; gain: GainNode; lfo: OscillatorNode; lfoGain: GainNode } | null>(null);

  const start = async () => {
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctor) return;
    const ctx: AudioContext = ctxRef.current ?? new Ctor();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 110; // A2
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = 165; // E3 — perfect fifth pad

    // gentle tremolo via LFO
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.18;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain).connect(gain.gain);

    osc.connect(gain);
    osc2.connect(gain);
    osc.start();
    osc2.start();
    lfo.start();

    // smooth fade in
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 1.6);

    nodesRef.current = { osc, osc2, gain, lfo, lfoGain };
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const n = nodesRef.current;
    if (!ctx || !n) return;
    const t = ctx.currentTime;
    n.gain.gain.cancelScheduledValues(t);
    n.gain.gain.setValueAtTime(n.gain.gain.value, t);
    n.gain.gain.linearRampToValueAtTime(0, t + 0.8);
    setTimeout(() => {
      try {
        n.osc.stop();
        n.osc2.stop();
        n.lfo.stop();
      } catch {}
      nodesRef.current = null;
    }, 900);
  };

  const toggle = () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  };

  useEffect(() => () => stop(), []);

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      className="glass-strong fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full px-3 py-2.5 md:bottom-6 md:right-6 md:px-4 md:py-3"
    >
      <span className="relative flex h-2 w-2">
        <AnimatePresence>
          {playing && (
            <motion.span
              key="ring"
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ background: "hsl(var(--cobalt-glow))" }}
            />
          )}
        </AnimatePresence>
        <span
          className="relative inline-block h-full w-full rounded-full"
          style={{
            background: playing ? "hsl(var(--cobalt-glow))" : "hsl(var(--silver-dark))",
            boxShadow: playing ? "0 0 10px hsl(var(--cobalt))" : "none",
          }}
        />
      </span>
      {playing ? (
        <Pause size={12} strokeWidth={1.6} style={{ color: "hsl(var(--silver-light))" }} />
      ) : (
        <Music2 size={12} strokeWidth={1.6} style={{ color: "hsl(var(--silver-light))" }} />
      )}
      <span
        className="hidden text-[9px] uppercase tracking-[0.32em] md:inline"
        style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver))" }}
      >
        {playing ? "playing" : "ambience"}
      </span>
    </motion.button>
  );
};

export default AmbientPlayer;