import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Burst {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const EMOJIS = ["✦", "✧", "♡", "★", "˚", "✿", "❀", "♥"];

const SparkleClick = () => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // skip clicks inside textareas/inputs
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea")) return;

      const id = Date.now() + Math.random();
      const newBursts: Burst[] = Array.from({ length: 6 }).map((_, i) => ({
        id: id + i,
        x: e.clientX,
        y: e.clientY,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      }));
      setBursts((prev) => [...prev, ...newBursts]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => !newBursts.find((n) => n.id === b.id)));
      }, 1100);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <AnimatePresence>
        {bursts.map((b, i) => {
          const angle = (i % 6) * 60 + Math.random() * 30;
          const dx = Math.cos((angle * Math.PI) / 180) * (40 + Math.random() * 30);
          const dy = Math.sin((angle * Math.PI) / 180) * (40 + Math.random() * 30) - 10;
          return (
            <motion.span
              key={b.id}
              initial={{ x: b.x, y: b.y, opacity: 1, scale: 0.4 }}
              animate={{ x: b.x + dx, y: b.y + dy, opacity: 0, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-sm"
              style={{
                color: "hsl(var(--silver-light))",
                textShadow: "0 0 10px hsla(218, 74%, 66%, 0.8), 0 0 20px hsla(210, 24%, 93%, 0.5)",
              }}
            >
              {b.emoji}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SparkleClick;
