import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Sparkles, Heart } from "lucide-react";

const FORTUNES = [
  "Today the universe is wearing your favorite color.",
  "Something soft and unexpected is heading your way.",
  "A small win this week will feel impossibly big. Embrace it.",
  "The next song you hear was written for this moment.",
  "Someone is thinking of you with a smile right now.",
  "Your laugh today fixes someone's whole week.",
  "A door you didn't notice is quietly opening for you.",
  "Tonight a star will wink — that one's yours.",
  "Magic favors the soft-hearted. So, naturally, you.",
  "A future memory is being made today. Look around.",
];

const FortuneCookie = () => {
  const [open, setOpen] = useState(false);
  const [fortune, setFortune] = useState("");

  const reveal = () => {
    setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
    setOpen(true);
  };

  return (
    <>
      <motion.button
        onClick={reveal}
        whileHover={{ scale: 1.06, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="glass fixed right-5 top-20 z-40 hidden h-12 w-12 items-center justify-center rounded-full md:flex"
        style={{
          boxShadow: "0 0 24px hsla(218, 74%, 66%, 0.18)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
        aria-label="Open fortune cookie"
      >
        <Sparkles size={16} strokeWidth={1.5} style={{ color: "hsl(var(--silver-light))" }} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center px-6"
            style={{ background: "hsla(222, 34%, 6%, 0.7)", backdropFilter: "blur(14px)" }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0, rotateX: -20 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-sm rounded-[28px] p-8 text-center"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full glass">
                <Heart size={18} strokeWidth={1.4} style={{ color: "hsl(var(--cobalt-glow))" }} />
              </div>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.45em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                Fortune for Sanjana
              </p>
              <p
                className="font-heading text-lg italic leading-relaxed md:text-xl"
                style={{ color: "hsl(var(--silver-light))" }}
              >
                "{fortune}"
              </p>
              <button
                onClick={reveal}
                className="mt-6 text-[10px] uppercase tracking-[0.4em] transition-colors hover:opacity-70"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver))" }}
              >
                ↻ another one
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FortuneCookie;
