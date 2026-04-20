import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEQ = "sanjana";

/**
 * Type "sanjana" anywhere on the page to unlock a hidden silver aurora overlay
 * with a tiny secret love note. Cinematic, premium, and fully escapable.
 */
const KonamiSecret = () => {
  const [open, setOpen] = useState(false);
  const [buf, setBuf] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // ignore when typing in inputs
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key.length !== 1) return;
      const next = (buf + e.key.toLowerCase()).slice(-SEQ.length);
      setBuf(next);
      if (next === SEQ) {
        setOpen(true);
        setBuf("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buf]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[140] flex items-center justify-center px-6"
          style={{ background: "hsla(222, 34%, 5%, 0.78)", backdropFilter: "blur(18px)" }}
          onClick={() => setOpen(false)}
        >
          {/* aurora glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.7, 0.5, 0.8], scale: [0.8, 1.1, 1, 1.05] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 30%, hsla(218, 74%, 66%, 0.35), transparent 70%), radial-gradient(ellipse 70% 50% at 50% 80%, hsla(210, 24%, 93%, 0.18), transparent 70%)",
            }}
          />

          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-md rounded-[30px] p-8 text-center md:p-10"
          >
            <p
              className="mb-4 text-[10px] uppercase tracking-[0.55em]"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
            >
              ✦ secret unlocked ✦
            </p>
            <h3 className="mb-4 font-heading text-2xl italic text-silver-shimmer md:text-3xl">
              You typed your name.
            </h3>
            <p className="text-sm leading-7" style={{ color: "hsl(var(--foreground) / 0.78)" }}>
              Of course you did. The whole sky is named after you tonight — every silver, every
              shimmer, every quiet glow. This corner of the internet was built around the
              shape of you. Welcome to the secret room.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-7 text-[10px] uppercase tracking-[0.4em] transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver))" }}
            >
              ♡ close gently
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiSecret;