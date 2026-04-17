import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REASONS = [
  "the way you laugh at your own jokes first",
  "your "i'm fine" voicenote that means you're not",
  "how you remember everyone's tiny details",
  "the playlists only you could've made",
  "your 2am philosophy era",
  "the way you say "okayyy" when excited",
  "how the room softens when you walk in",
  "your hand-on-heart honesty",
  "the chai you'd choose over coffee",
  "your forever-curious eyes",
  "how you turn ordinary days into stories",
  "the way you hype up everyone but yourself",
  "your taste in songs nobody else has heard",
  "your hugs — calibrated to fix anything",
  "how unapologetically you you are",
  "your soft "wait what" mid-sentence",
  "the gentle drama of your overthinking",
  "the way you make 'happy birthday' feel earned",
  "every chapter still left to write ✦",
];

const ReasonsWall = () => {
  const [opened, setOpened] = useState<number[]>([]);
  const [revealed, setRevealed] = useState<number | null>(null);

  const open = (i: number) => {
    if (!opened.includes(i)) setOpened((p) => [...p, i]);
    setRevealed(i);
  };

  return (
    <section className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-3 text-[10px] uppercase tracking-[0.55em]"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
        >
          A Tiny Game
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-heading text-3xl font-light text-silver-gradient md:text-5xl"
        >
          19 reasons we love you
        </motion.h2>
        <p
          className="mx-auto mb-12 mt-4 max-w-md text-sm leading-7"
          style={{ color: "hsl(var(--foreground) / 0.7)" }}
        >
          Tap each card to unwrap one. Take your time — they're all yours.
        </p>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
          {REASONS.map((reason, i) => {
            const isOpen = opened.includes(i);
            return (
              <motion.button
                key={i}
                onClick={() => open(i)}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="glass-card relative flex aspect-square items-center justify-center rounded-2xl"
                style={{
                  background: isOpen ? "hsla(218, 56%, 56%, 0.1)" : undefined,
                }}
              >
                <span
                  className="font-heading text-lg"
                  style={{ color: isOpen ? "hsl(var(--silver-light))" : "hsl(var(--silver-dark))" }}
                >
                  {isOpen ? "✦" : String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            );
          })}
        </div>

        <p
          className="mt-6 text-[9px] uppercase tracking-[0.4em]"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.7)" }}
        >
          {opened.length} / 19 unwrapped
        </p>
      </div>

      <AnimatePresence>
        {revealed !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealed(null)}
            className="fixed inset-0 z-[110] flex items-center justify-center px-6"
            style={{ background: "hsla(222, 34%, 6%, 0.72)", backdropFilter: "blur(14px)" }}
          >
            <motion.div
              key={revealed}
              initial={{ scale: 0.7, rotateY: -90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-sm rounded-[28px] p-8 text-center"
            >
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.45em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                Reason № {String(revealed + 1).padStart(2, "0")}
              </p>
              <p
                className="font-heading text-xl italic leading-relaxed md:text-2xl"
                style={{ color: "hsl(var(--silver-light))" }}
              >
                "{REASONS[revealed]}"
              </p>
              <button
                onClick={() => setRevealed(null)}
                className="mt-6 text-[10px] uppercase tracking-[0.4em] transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver))" }}
              >
                ♡ keep
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReasonsWall;
