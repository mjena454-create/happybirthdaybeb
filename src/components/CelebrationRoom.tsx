import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import birthdayQueen from "@/assets/birthday-queen.jpg";

const Lantern = ({ index }: { index: number }) => {
  const x = 5 + (index * 17) % 90;
  const y = 10 + (index * 23) % 70;
  const delay = index * 0.4;
  const duration = 5 + (index % 4);

  return (
    <motion.div
      className="absolute w-5 h-7 md:w-7 md:h-9 rounded-full lantern-glow"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(ellipse, hsl(var(--silver-light)), hsl(var(--cobalt) / 0.6) 60%, transparent)`,
      }}
      animate={{
        y: [-10, -40, -10],
        x: [-5, 5, -5],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

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
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span ref={ref}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-0.5 h-5 bg-primary ml-0.5" style={{ animation: "typewriter-blink 0.8s infinite" }} />
      )}
    </span>
  );
};

const CelebrationRoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wishMade, setWishMade] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);

  const handleMakeWish = () => {
    setWishMade(true);

    // Silver rain / falling stars
    const duration = 5000;
    const end = Date.now() + duration;
    const silverColors = ["#B0BEC5", "#CFD8DC", "#90A4AE", "#ECEFF1", "#607D8B"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 160,
        origin: { x: Math.random(), y: -0.1 },
        colors: silverColors,
        shapes: ["circle"],
        scalar: 0.8,
        gravity: 0.6,
        drift: (Math.random() - 0.5) * 0.5,
        ticks: 300,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section
      id="celebration"
      ref={containerRef}
      className="relative min-h-[300vh] overflow-hidden"
    >
      {/* Letter from the heart — typewriter style */}
      <div className="relative z-10 py-32 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg text-center"
        >
          <p className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-6">
            A Letter from the Heart
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-silver-gradient mb-8">
            Dear Sanjana,
          </h2>
          <div className="font-body text-sm md:text-base leading-relaxed text-foreground/60 space-y-4">
            <p>
              <TypewriterText text="Nineteen chapters of your story have been written, and each one has been more beautiful than the last." delay={500} />
            </p>
            <p>
              <TypewriterText text="You bring light into every room, warmth into every conversation, and magic into the most ordinary moments." delay={4500} />
            </p>
            <p>
              <TypewriterText text="This space was made for you — a sanctuary where every memory lives, every laugh echoes, and every dream is honored." delay={8500} />
            </p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 12, duration: 1 }}
            className="font-heading text-lg italic text-primary mt-8"
          >
            Here's to chapter nineteen. ✦
          </motion.p>
        </motion.div>
      </div>

      {/* Floating lanterns */}
      <div className="relative z-10 min-h-screen">
        {Array.from({ length: 19 }).map((_, i) => (
          <Lantern key={i} index={i} />
        ))}

        {Array.from({ length: 20 }).map((_, i) => (
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

        {/* Kinetic Typography */}
        <div className="sticky top-0 min-h-screen flex items-center justify-center px-6">
          <motion.h2
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-center leading-tight"
          >
            <span className="text-silver-shimmer">Happy 19th</span>
            <br />
            <span className="text-silver-gradient">Birthday,</span>
            <br />
            <span className="text-silver-shimmer italic">Sanjana</span>
          </motion.h2>
        </div>
      </div>

      {/* Make a Wish Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-32">
        {!wishMade ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-8">
              Close your eyes
            </p>
            <motion.button
              onClick={handleMakeWish}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glow-button rounded-full px-12 py-5 font-heading text-lg tracking-[0.15em] text-foreground/80 bg-transparent animate-glow-pulse"
            >
              ✦ Make a Wish ✦
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-lg"
          >
            <p className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-8">
              The Birthday Queen
            </p>
            <div className="glass p-3 rounded-3xl mb-8 inline-block">
              <img
                src={birthdayQueen}
                alt="The Birthday Queen"
                className="rounded-2xl max-w-sm w-full h-auto"
              />
            </div>
            <p className="font-heading text-2xl md:text-3xl italic text-silver-gradient">
              May every wish come true ✦
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CelebrationRoom;
