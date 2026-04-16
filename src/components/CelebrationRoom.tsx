import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import birthdayQueen from "@/assets/birthday-queen.jpg";

const Lantern = ({ index }: { index: number }) => {
  const x = 3 + ((index * 17 + 7) % 94);
  const delay = index * 0.5;
  const duration = 6 + (index % 5);
  const size = 4 + (index % 4);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        bottom: "-5%",
        width: `${size}px`,
        height: `${size * 1.3}px`,
        background: `radial-gradient(ellipse, hsla(210, 30%, 85%, 0.8), hsla(220, 60%, 55%, 0.3) 60%, transparent)`,
        boxShadow: `0 0 ${size * 3}px ${size}px hsla(210, 20%, 72%, 0.1), 0 0 ${size * 6}px ${size * 2}px hsla(220, 60%, 55%, 0.05)`,
      }}
      animate={{
        y: [0, -window.innerHeight * 1.2],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 0.6, 0.8, 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [isVisible, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span ref={ref}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-4 ml-0.5" style={{ background: "hsl(var(--silver))", animation: "typewriter-blink 0.8s infinite" }} />
      )}
    </span>
  );
};

const CelebrationRoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wishMade, setWishMade] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0.15, 0.45], [120, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.4], [0.85, 1]);

  const handleMakeWish = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setWishMade(true);
      setShowSurprise(true);

      // Silver rain — falling stars
      const duration = 6000;
      const end = Date.now() + duration;
      const colors = ["#B0BEC5", "#CFD8DC", "#90A4AE", "#ECEFF1", "#607D8B", "#78909C"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 180,
          origin: { x: Math.random(), y: -0.05 },
          colors,
          shapes: ["circle"],
          scalar: 0.6,
          gravity: 0.4,
          drift: (Math.random() - 0.5) * 0.3,
          ticks: 400,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
      return;
    }
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <section
      id="celebration"
      ref={containerRef}
      className="relative min-h-[280vh] overflow-hidden"
    >
      {/* Lanterns */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 19 }).map((_, i) => (
          <Lantern key={i} index={i} />
        ))}
      </div>

      {/* Dust motes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`dust-${i}`}
            className="dust-mote"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* The Letter — Surprise reveal on scroll */}
      <div className="relative z-10 py-32 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-3xl p-8 md:p-12 max-w-lg text-center"
        >
          <p className="text-[9px] tracking-[0.6em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}
          >
            A Letter from the Heart
          </p>

          <h2 className="font-heading text-2xl md:text-3xl font-light text-silver-gradient mb-8">
            Dear Sanjana,
          </h2>

          <div className="text-sm md:text-[15px] leading-[1.8] space-y-5" style={{ color: "hsl(var(--foreground) / 0.5)" }}>
            <p>
              <TypewriterText text="Nineteen chapters of your story have been written, and each one has been more beautiful than the last." delay={300} />
            </p>
            <p>
              <TypewriterText text="You bring light into every room, warmth into every conversation, and magic into the most ordinary moments." delay={4000} />
            </p>
            <p>
              <TypewriterText text="This space was made for you — a sanctuary where every memory lives, every laugh echoes, and every dream is honored." delay={8000} />
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 12, duration: 1.5 }}
            className="font-heading text-base italic mt-8"
            style={{ color: "hsl(var(--cobalt-glow))" }}
          >
            Here's to chapter nineteen. ✦
          </motion.p>
        </motion.div>
      </div>

      {/* Kinetic Typography */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center px-6 z-10">
        <motion.div
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          className="text-center"
        >
          <p className="text-[9px] tracking-[0.6em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.3)" }}
          >
            Chapter XIX
          </p>
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1]">
            <span className="text-silver-shimmer block">Happy 19th</span>
            <span className="text-silver-gradient block mt-2">Birthday,</span>
            <span className="text-silver-shimmer block mt-2 italic">Sanjana</span>
          </h2>
        </motion.div>
      </div>

      {/* Make a Wish */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-32">
        <AnimatePresence mode="wait">
          {!wishMade ? (
            <motion.div
              key="wish-prompt"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <p className="text-[9px] tracking-[0.5em] uppercase mb-10"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.3)" }}
              >
                Close your eyes and...
              </p>

              {countdown !== null && countdown > 0 ? (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-7xl md:text-8xl text-silver-shimmer mb-8"
                >
                  {countdown}
                </motion.div>
              ) : (
                <motion.button
                  onClick={handleMakeWish}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="glow-button rounded-2xl px-12 py-5 font-heading text-lg tracking-[0.1em]"
                  style={{
                    color: "hsl(var(--silver) / 0.8)",
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                >
                  ✦ Make a Wish ✦
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="wish-reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-md"
            >
              <p className="text-[9px] tracking-[0.5em] uppercase mb-8"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}
              >
                The Birthday Queen
              </p>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong p-3 rounded-3xl mb-10 inline-block"
              >
                <img
                  src={birthdayQueen}
                  alt="The Birthday Queen — Sanjana"
                  className="rounded-2xl max-w-[320px] w-full h-auto"
                />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="font-heading text-2xl md:text-3xl italic text-silver-gradient"
              >
                May every wish come true ✦
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="text-[10px] tracking-[0.3em] uppercase mt-8"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.3)" }}
              >
                Made with ♥ for you
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CelebrationRoom;
