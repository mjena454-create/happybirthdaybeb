import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import birthdayQueen from "@/assets/birthday-queen.jpg";

const Lantern = ({ index }: { index: number }) => {
  const x = 8 + ((index * 11 + 9) % 84);
  const delay = index * 0.45;
  const duration = 10 + (index % 4) * 1.6;
  const scale = 0.9 + (index % 3) * 0.14;

  return (
    <motion.div
      className="absolute bottom-[-12vh] rounded-full"
      style={{
        left: `${x}%`,
        width: `${10 * scale}px`,
        height: `${28 * scale}px`,
        background:
          "linear-gradient(180deg, hsla(210, 24%, 93%, 0.88) 0%, hsla(210, 18%, 80%, 0.28) 48%, transparent 100%)",
        boxShadow: "0 0 18px hsla(210, 24%, 93%, 0.14), 0 0 44px hsla(218, 56%, 56%, 0.08)",
      }}
      animate={{
        y: ["0vh", "-130vh"],
        x: [0, index % 2 === 0 ? 18 : -18, 0],
        opacity: [0, 0.46, 0.78, 0.4, 0],
        scale: [0.94, 1, 0.96],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
};

const TypewriterText = ({ text, start, delay = 0 }: { text: string; start: boolean; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timerId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i += 1;
        } else if (intervalId) clearInterval(intervalId);
      }, 28);
    }, delay);

    return () => {
      clearTimeout(timerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [delay, start, text]);

  return (
    <span>
      {displayed}
      {start && displayed.length < text.length && (
        <span
          className="ml-0.5 inline-block h-4 w-[2px]"
          style={{ background: "hsl(var(--silver))", animation: "typewriter-blink 0.8s infinite" }}
        />
      )}
    </span>
  );
};

const CelebrationRoom = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const letterInView = useInView(letterRef, { once: true, amount: 0.45 });

  const [wishOpen, setWishOpen] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishSealed, setWishSealed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0.28, 0.58], [120, -10]);
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.34], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0.2, 0.4], [0.92, 1]);

  const launchConfetti = () => {
    const end = Date.now() + 5500;
    const colors = ["#E7ECF2", "#C8D1DB", "#AEBBC8", "#EEF2F6", "#8DA0B4"];
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 160,
        origin: { x: Math.random(), y: -0.08 },
        colors,
        shapes: ["circle"],
        scalar: 0.55,
        gravity: 0.45,
        drift: (Math.random() - 0.5) * 0.28,
        ticks: 360,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleSealWish = () => {
    if (!wishText.trim()) return;
    setWishSealed(true);
    try {
      localStorage.setItem("sanjana-wish-19", wishText);
    } catch {
      // ignore
    }
    setTimeout(() => {
      setWishOpen(false);
      setRevealed(true);
      launchConfetti();
    }, 2400);
  };

  return (
    <section id="celebration" ref={sectionRef} className="relative min-h-[260vh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 19 }).map((_, i) => (
          <Lantern key={i} index={i} />
        ))}
      </div>

      {/* Letter */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-28">
        <motion.div
          ref={letterRef}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong max-w-2xl rounded-[34px] px-7 py-8 text-center md:px-12 md:py-12"
        >
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.5em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            A Letter from the Heart
          </p>

          <h2 className="mb-8 font-heading text-3xl font-light text-silver-gradient md:text-4xl">Dear Sanjana,</h2>

          <div className="space-y-5 text-sm leading-8 md:text-[15px]" style={{ color: "hsl(var(--foreground) / 0.78)" }}>
            <p>
              <TypewriterText
                start={letterInView}
                text="Nineteen chapters of your story have been written, and each one has been more beautiful than the last."
              />
            </p>
            <p>
              <TypewriterText
                start={letterInView}
                delay={2600}
                text="You bring light into every room, warmth into every conversation, and magic into the quietest moments."
              />
            </p>
            <p>
              <TypewriterText
                start={letterInView}
                delay={5200}
                text="This space was made for you — a memory, a surprise, and a small forever you can return to whenever you want."
              />
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={letterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.8, delay: 7 }}
            className="mt-8 font-heading text-lg italic"
            style={{ color: "hsl(var(--silver))" }}
          >
            Here's to chapter nineteen. ✦
          </motion.p>
        </motion.div>
      </div>

      {/* Kinetic title */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div style={{ y: titleY, opacity: titleOpacity, scale: titleScale }} className="text-center">
          <p
            className="mb-5 text-[10px] uppercase tracking-[0.55em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            The Celebration
          </p>
          <h2 className="font-heading text-4xl font-light leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="block text-silver-shimmer">Happy 19th</span>
            <span className="mt-2 block text-silver-gradient">Birthday,</span>
            <span className="mt-2 block italic text-silver-shimmer">Sanjana</span>
          </h2>
        </motion.div>
      </div>

      {/* Wish jar + reveal */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-28">
        {!revealed ? (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="glass max-w-md rounded-[30px] px-8 py-10 text-center md:px-12"
          >
            <p
              className="mb-6 text-[10px] uppercase tracking-[0.45em]"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
            >
              One last surprise
            </p>

            {/* The wish jar visual */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-6 flex h-32 w-24 items-center justify-center rounded-[40%_40%_30%_30%/30%_30%_50%_50%] glass-strong"
              style={{ boxShadow: "inset 0 0 30px hsla(218, 74%, 66%, 0.2), 0 0 40px hsla(218, 56%, 56%, 0.15)" }}
            >
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-3 w-3 rounded-full"
                style={{
                  background: "hsl(var(--silver-light))",
                  boxShadow: "0 0 20px hsl(var(--silver-light)), 0 0 40px hsla(218, 74%, 66%, 0.6)",
                }}
              />
            </motion.div>

            <p className="mb-6 text-sm leading-7" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
              Whisper a wish into the jar. Seal it. The universe is listening.
            </p>

            <button
              onClick={() => setWishOpen(true)}
              className="glow-button rounded-[22px] px-10 py-4 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--silver-light))", animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              Make a Wish
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p
              className="mb-7 text-[10px] uppercase tracking-[0.45em]"
              style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
            >
              The Birthday Queen
            </p>

            <motion.div
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong inline-block rounded-[34px] p-3"
            >
              <img src={birthdayQueen} alt="Sanjana birthday portrait" className="w-full max-w-[320px] rounded-[26px]" />
            </motion.div>

            <h3 className="mt-8 font-heading text-2xl italic text-silver-gradient md:text-3xl">
              Your wish has been sealed in the stars ✦
            </h3>

            <motion.button
              onClick={launchConfetti}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="glow-button mt-8 rounded-[22px] px-8 py-3 text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--silver-light))" }}
            >
              ✦ rain the stars again
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Wish modal */}
      <AnimatePresence>
        {wishOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center px-6"
            style={{ background: "hsla(222, 34%, 6%, 0.78)", backdropFilter: "blur(16px)" }}
            onClick={() => !wishSealed && setWishOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong w-full max-w-md rounded-[30px] p-8 text-center"
            >
              {!wishSealed ? (
                <>
                  <p
                    className="mb-4 text-[10px] uppercase tracking-[0.45em]"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
                  >
                    Whisper your wish
                  </p>
                  <h3 className="mb-6 font-heading text-2xl italic text-silver-gradient">
                    What does chapter 19 hold?
                  </h3>
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="I wish for..."
                    autoFocus
                    rows={3}
                    maxLength={200}
                    className="w-full resize-none rounded-2xl border bg-transparent px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-[hsl(var(--silver)/0.4)]"
                    style={{
                      borderColor: "hsla(210, 18%, 82%, 0.16)",
                      color: "hsl(var(--silver-light))",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                  <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}>
                    <span>{wishText.length} / 200</span>
                    <span>kept private · just for you</span>
                  </div>
                  <button
                    onClick={handleSealWish}
                    disabled={!wishText.trim()}
                    className="glow-button mt-6 w-full rounded-[22px] px-8 py-4 text-[11px] uppercase tracking-[0.3em] disabled:opacity-40"
                    style={{ color: "hsl(var(--silver-light))" }}
                  >
                    Seal & Send
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 0.95, 1.05, 1], opacity: [0.6, 1, 0.8, 1] }}
                    transition={{ duration: 2 }}
                    className="mx-auto mb-5 h-4 w-4 rounded-full"
                    style={{
                      background: "hsl(var(--silver-light))",
                      boxShadow: "0 0 30px hsl(var(--silver-light)), 0 0 60px hsla(218, 74%, 66%, 0.7)",
                    }}
                  />
                  <p
                    className="text-[10px] uppercase tracking-[0.45em]"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
                  >
                    sealing your wish...
                  </p>
                  <p className="mt-3 font-heading italic" style={{ color: "hsl(var(--silver))" }}>
                    sent to the stars ✦
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CelebrationRoom;
