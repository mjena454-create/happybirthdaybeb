import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "lucide-react";

const FrequencyBar = ({ delay }: { delay: number }) => (
  <motion.div
    className="w-1 rounded-full bg-primary"
    animate={{
      height: ["12px", "40px", "20px", "48px", "16px"],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const FMPortal = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBroadcast = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = "https://example.com"; // Replace with actual radio site URL
    }, 2500);
  };

  return (
    <>
      <section id="fm" className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />

            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Radio size={32} className="text-primary" strokeWidth={1.5} />
            </motion.div>

            <p className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-3">
              Broadcast Signal Detected
            </p>

            <h2 className="font-heading text-3xl md:text-4xl font-light text-gold-gradient mb-8">
              FM 19.0
            </h2>

            {/* Frequency wave */}
            <div className="flex items-center justify-center gap-1 mb-8 h-12">
              {Array.from({ length: 20 }).map((_, i) => (
                <FrequencyBar key={i} delay={i * 0.08} />
              ))}
            </div>

            <p className="font-heading text-sm italic text-muted-foreground mb-8">
              "Tuning to 19.0 FM..."
            </p>

            <motion.button
              onClick={handleBroadcast}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="glass rounded-full px-8 py-4 font-body text-sm tracking-[0.2em] uppercase text-foreground hover:bg-primary/10 transition-colors duration-500"
            >
              Listen to the Broadcast
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Radio static transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              animation: "radio-static 0.3s steps(5) infinite",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1] }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-heading text-2xl text-primary-foreground tracking-[0.3em]"
            >
              TUNING...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FMPortal;
