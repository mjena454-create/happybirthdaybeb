import { useRef, useState } from "react";
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
      className="absolute w-6 h-8 md:w-8 md:h-10 rounded-full lantern-glow"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(ellipse, hsl(var(--gold-light)), hsl(var(--gold)) 60%, transparent)`,
      }}
      animate={{
        y: [-10, -30, -10],
        x: [-5, 5, -5],
        opacity: [0.5, 0.9, 0.5],
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

const CelebrationRoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wishMade, setWishMade] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background transition from cloud dancer to sunset
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Kinetic typography
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);

  const handleMakeWish = () => {
    setWishMade(true);

    // Gold leaf fountain
    const duration = 4000;
    const end = Date.now() + duration;

    const goldColors = ["#C9A96E", "#E8D5A3", "#B8963E", "#F0E6C8"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: goldColors,
        shapes: ["square"],
        scalar: 1.5,
        drift: 0.5,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: goldColors,
        shapes: ["square"],
        scalar: 1.5,
        drift: -0.5,
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
      {/* Sunset gradient overlay */}
      <motion.div
        className="fixed inset-0 bg-sunset-gradient pointer-events-none z-0"
        style={{ opacity: bgOpacity }}
      />

      {/* Letter from the heart */}
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
          <h2 className="font-heading text-3xl md:text-4xl font-light text-gold-gradient mb-8">
            Dear Sanjana,
          </h2>
          <p className="font-body text-sm md:text-base leading-relaxed text-foreground/70 mb-4">
            Nineteen chapters of your story have been written, and each one has been more beautiful than the last. 
            You bring light into every room, warmth into every conversation, and magic into the most ordinary moments.
          </p>
          <p className="font-body text-sm md:text-base leading-relaxed text-foreground/70 mb-4">
            This space was made for you — a sanctuary where every memory lives, 
            every laugh echoes, and every dream is honored.
          </p>
          <p className="font-heading text-lg italic text-primary mt-8">
            Here's to chapter nineteen. ✦
          </p>
        </motion.div>
      </div>

      {/* Floating lanterns */}
      <div className="relative z-10 min-h-screen">
        {Array.from({ length: 19 }).map((_, i) => (
          <Lantern key={i} index={i} />
        ))}

        {/* Dust motes */}
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
            <span className="text-gold-gradient">Happy 19th</span>
            <br />
            <span className="text-gold-gradient">Birthday,</span>
            <br />
            <span className="text-gold-gradient italic">Sanjana</span>
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
              className="glass-strong rounded-full px-12 py-5 font-heading text-lg tracking-[0.15em] text-foreground hover:bg-primary/10 transition-colors duration-500 animate-glow-pulse"
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
            <p className="font-heading text-2xl md:text-3xl italic text-gold-gradient">
              May every wish come true ✦
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CelebrationRoom;
