import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { id: 1, src: memory1, note: "The beginning of forever",   date: "MMXXIV · 03",  rotate: -4, speed: 0.22, width: "md:w-[58%]", align: "md:mr-auto" },
  { id: 2, src: memory2, note: "Golden hour, golden soul",   date: "MMXXIV · 06",  rotate: 3,  speed: 0.42, width: "md:w-[44%]", align: "md:ml-auto" },
  { id: 3, src: memory3, note: "Where the sun kissed sea",   date: "MMXXIV · 08",  rotate: -3, speed: 0.3,  width: "md:w-[52%]", align: "md:ml-[12%]" },
  { id: 4, src: memory4, note: "Laughter is timeless",       date: "MMXXIV · 09",  rotate: 4,  speed: 0.5,  width: "md:w-[46%]", align: "md:mr-[8%]" },
  { id: 5, src: memory5, note: "A chapter worth rereading",  date: "MMXXIV · 11",  rotate: -2, speed: 0.28, width: "md:w-[60%]", align: "md:mr-auto" },
  { id: 6, src: memory6, note: "Stars aligned for you",      date: "MMXXV · 02",   rotate: 3,  speed: 0.46, width: "md:w-[42%]", align: "md:ml-auto" },
];

const GalleryCard = ({ memory, index }: { memory: typeof memories[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [140 * memory.speed, -180 * memory.speed]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [memory.rotate, 0, -memory.rotate * 0.4]);
  const blur = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [6, 2, 0, 2, 6]);
  const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

  // 3D tilt on hover
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 200, damping: 18 });
  const tiltY = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.figure
      ref={ref}
      style={{ y, rotate, transformPerspective: 1400 }}
      className={`relative w-full ${memory.width} ${memory.align} group`}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        className="glass-card relative rounded-[30px] p-3 md:p-4"
      >
        {/* index chip */}
        <div className="absolute -top-3 left-6 z-10 rounded-full px-3 py-1 glass-strong" style={{ transform: "translateZ(40px)" }}>
          <span
            className="text-[9px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-light))" }}
          >
            {String(index + 1).padStart(2, "0")} / 06
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[22px]">
          <motion.img
            src={memory.src}
            alt={memory.note}
            loading="lazy"
            className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: blurFilter }}
          />

          {/* sheen sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
            style={{
              background: "linear-gradient(110deg, transparent 30%, hsla(210, 24%, 93%, 0.14) 50%, transparent 70%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "linear-gradient(180deg, transparent 40%, hsla(222, 34%, 10%, 0.78) 100%)" }}
          />

          {/* caption */}
          <figcaption className="pointer-events-none absolute inset-x-5 bottom-5 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="glass rounded-2xl px-4 py-3">
              <p className="text-center font-heading text-sm italic" style={{ color: "hsl(var(--silver-light))" }}>
                "{memory.note}"
              </p>
              <p
                className="mt-1 text-center text-[8px] uppercase tracking-[0.34em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                {memory.date}
              </p>
            </div>
          </figcaption>
        </div>
      </motion.div>
    </motion.figure>
  );
};

const MemoryCloud = () => {
  return (
    <section id="memories" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center md:mb-24"
        >
          <p
            className="mb-4 text-[10px] uppercase tracking-[0.55em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            The Gallery · 06 frames
          </p>
          <h2 className="font-heading text-4xl font-light text-silver-gradient md:text-5xl lg:text-6xl">
            Moments Worth Keeping
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
            Hover any frame — the world quiets, the photo tilts, and a whisper appears.
          </p>
        </motion.div>

        <div className="space-y-10 md:space-y-[-2vh]">
          {memories.map((memory, index) => (
            <GalleryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 text-center"
        >
          <span
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.7)" }}
          >
            ✦ to be continued ✦
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default MemoryCloud;
