import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { id: 1, src: memory1, note: "The beginning of forever", speed: 0.3, width: "45%", left: "2%", zIndex: 2 },
  { id: 2, src: memory2, note: "Golden hour, golden soul", speed: 0.7, width: "35%", left: "55%", zIndex: 3 },
  { id: 3, src: memory3, note: "Where the sun kissed the sea", speed: 0.15, width: "40%", left: "30%", zIndex: 1 },
  { id: 4, src: memory4, note: "Laughter is timeless", speed: 0.55, width: "38%", left: "58%", zIndex: 4 },
  { id: 5, src: memory5, note: "A chapter worth rereading", speed: 0.4, width: "42%", left: "5%", zIndex: 2 },
  { id: 6, src: memory6, note: "Stars aligned for you", speed: 0.8, width: "36%", left: "50%", zIndex: 3 },
];

const ParallaxPhoto = ({ memory, index }: { memory: typeof memories[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different speed for each photo - creates the rushing effect
  const y = useTransform(scrollYProgress, [0, 1], [200 * memory.speed, -200 * memory.speed]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [
    -3 + index * 1.2,
    0,
    3 - index * 1.2,
  ]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const imgBlur = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [8, 2, 0, 2, 8]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotate,
        scale,
        width: memory.width,
        marginLeft: memory.left,
        zIndex: memory.zIndex,
      }}
      className="relative mb-[-5vh] group cursor-pointer"
    >
      <div className="glass-card rounded-2xl p-2.5 pb-10 transition-transform duration-700">
        <div className="overflow-hidden rounded-xl relative">
          <motion.img
            src={memory.src}
            alt={memory.note}
            className="w-full h-auto object-cover"
            style={{
              filter: useTransform(imgBlur, (v) => `blur(${v}px)`),
            }}
          />

          {/* Hover overlay with caption */}
          <div className="absolute inset-0 flex items-end justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-700"
            style={{ background: "linear-gradient(to top, hsla(222, 47%, 2%, 0.8), transparent 60%)" }}
          >
            <div className="glass rounded-xl px-4 py-2.5" style={{ borderColor: "hsla(210, 20%, 72%, 0.2)" }}>
              <p className="font-heading text-xs italic tracking-wide text-center" style={{ color: "hsl(var(--silver-light))" }}>
                "{memory.note}"
              </p>
            </div>
          </div>
        </div>

        {/* Polaroid label */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 h-7 flex items-center justify-center">
          <p className="text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}>
            memory · {String(memory.id).padStart(2, "0")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const MemoryCloud = () => {
  return (
    <section id="memories" className="relative py-20 overflow-hidden">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="text-center mb-24 px-6"
      >
        <p className="text-[10px] tracking-[0.6em] uppercase mb-5"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.4)" }}
        >
          The Memory Cloud
        </p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-silver-gradient">
          Moments Worth Keeping
        </h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-12 h-px mx-auto mt-6"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--silver) / 0.3), transparent)" }}
        />
      </motion.div>

      {/* Scattered gallery */}
      <div className="max-w-4xl mx-auto px-6">
        {memories.map((memory, i) => (
          <ParallaxPhoto key={memory.id} memory={memory} index={i} />
        ))}
      </div>
    </section>
  );
};

export default MemoryCloud;
