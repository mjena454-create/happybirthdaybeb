import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import memory1 from "@/assets/memory-1.png";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

type Frame = { src: string; note: string; date: string; ratio: string };

// 👇 ADD YOUR 24 PHOTOS HERE
// 1. Drop your photos into src/assets/  (name them photo-01.jpg ... photo-24.jpg)
// 2. Import each one below.
// 3. Edit the `note` (caption) and `date` fields freely.
// Until you replace them, the 6 placeholder photos cycle so the wall still looks full.
const PH = [memory1, memory2, memory3, memory4, memory5, memory6];
const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[3/4]"];

const FRAMES: Frame[] = Array.from({ length: 24 }, (_, i) => ({
  src: PH[i % PH.length],
  note: [
    "The beginning of forever", "Golden hour, golden soul", "Where the sun kissed sea",
    "Laughter is timeless", "A chapter worth rereading", "Stars aligned for you",
    "That smile, framed", "Quiet little universe", "Midnight, but warm",
    "You, in slow motion", "Soft chaos", "Lighthouse moments",
    "Frame twelve, still you", "Salt, sun, you", "Unscripted",
    "A favorite Sunday", "Pocket-sized magic", "Held the light",
    "City lights, your eyes", "Whispered jokes", "Sky on your side",
    "All of it, again", "Another year, brighter", "And the next, and the next",
  ][i],
  date: `MMXXV · ${String((i % 12) + 1).padStart(2, "0")}`,
  ratio: ratios[i % ratios.length],
}));

// Distribute the 24 frames across 4 parallax columns (6 each)
const COLUMNS: { speed: number; frames: Frame[]; align: "start" | "center" | "end" }[] = [
  { speed: -340, frames: FRAMES.slice(0, 6),   align: "start"  },
  { speed: -120, frames: FRAMES.slice(6, 12),  align: "center" },
  { speed: -480, frames: FRAMES.slice(12, 18), align: "end"    },
  { speed: -200, frames: FRAMES.slice(18, 24), align: "center" },
];

const Polaroid = ({ frame, y }: { frame: Frame; y: MotionValue<number> }) => {
  return (
    <motion.figure
      style={{ y }}
      className="group relative w-full will-change-transform"
    >
      <div className="glass-card relative overflow-hidden rounded-[22px] p-2">
        <div className={`relative overflow-hidden rounded-[16px] ${frame.ratio}`}>
          <img
            src={frame.src}
            alt={frame.note}
            loading="lazy"
            className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] object-contain"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: "linear-gradient(180deg, transparent 50%, hsla(222, 40%, 4%, 0.78) 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
            style={{ background: "linear-gradient(110deg, transparent 30%, hsla(210, 24%, 93%, 0.18) 50%, transparent 70%)" }}
          />
          <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="glass rounded-xl px-3 py-2">
              <p className="font-heading text-[13px] italic" style={{ color: "hsl(var(--silver-light))" }}>
                "{frame.note}"
              </p>
              <p
                className="mt-0.5 text-[8px] uppercase tracking-[0.32em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                {frame.date}
              </p>
            </div>
          </figcaption>
        </div>
      </div>
    </motion.figure>
  );
};

const Column = ({
  frames,
  speed,
  scrollYProgress,
}: {
  frames: Frame[];
  speed: number;
  scrollYProgress: MotionValue<number>;
}) => {
  // each column shifts a different distance over the section's scroll range
  const y = useTransform(scrollYProgress, [0, 1], [Math.abs(speed) * 0.4, speed]);
  return (
    <div className="flex flex-col gap-5 md:gap-7">
      {frames.map((f, i) => (
        <Polaroid key={i} frame={f} y={y} />
      ))}
    </div>
  );
};

const ParallaxGallery = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });

  // Headline kinetic effects driven by the same progress
  const titleY = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.02, 0.94]);
  const titleLetter = useTransform(scrollYProgress, [0, 1], ["0.18em", "0.42em"]);

  return (
    <section id="memories" ref={wrapRef} className="relative px-3 py-20 sm:px-4 md:px-8 md:py-32">
      {/* sticky kinetic title that "follows" while you scroll the wall */}
      <div className="pointer-events-none sticky top-0 z-10 -mb-[40vh] flex h-[40vh] items-end justify-center">
        <motion.div
          style={{ y: titleY, scale: titleScale }}
          className="flex w-full flex-col items-center text-center"
        >
          <motion.p
            style={{ letterSpacing: titleLetter }}
            className="mb-3 text-[10px] uppercase"
            // @ts-ignore
            // letter-spacing is animated via style above
            // eslint-disable-next-line
            // prettier-ignore
            // (kept inline for clarity)
            // ---
            // font-mono via inline style for consistency
          >
            <span style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}>
              The Wall · 24 frames · scroll slowly
            </span>
          </motion.p>
          <h2 className="font-heading text-5xl font-light leading-[0.95] text-aurora md:text-7xl lg:text-[6rem]">
            Moments, layered.
          </h2>
          <div className="premium-divider mx-auto mt-6 w-24" />
        </motion.div>
      </div>

      {/* the wall */}
      <div className="relative mx-auto max-w-7xl pt-[36vh] md:pt-[42vh]">
        {/* soft top + bottom fade so columns feel they emerge from the dark */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40"
          style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40"
          style={{ background: "linear-gradient(0deg, hsl(var(--background)) 0%, transparent 100%)" }}
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:gap-7">
          {COLUMNS.map((col, i) => (
            <div key={i} className={i % 2 === 1 ? "md:translate-y-12" : ""}>
              <Column frames={col.frames} speed={col.speed} scrollYProgress={scrollYProgress} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <span
          className="text-[10px] uppercase tracking-[0.5em]"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.7)" }}
        >
          ✦ keep scrolling ✦
        </span>
      </div>
    </section>
  );
};

export default ParallaxGallery;