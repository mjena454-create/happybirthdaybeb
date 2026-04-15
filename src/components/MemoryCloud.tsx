import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { id: 1, src: memory1, note: "The beginning of forever", offset: 0 },
  { id: 2, src: memory2, note: "Golden hour, golden soul", offset: 60 },
  { id: 3, src: memory3, note: "Where the sun kissed the sea", offset: -40 },
  { id: 4, src: memory4, note: "Laughter is timeless", offset: 80 },
  { id: 5, src: memory5, note: "A chapter worth rereading", offset: -20 },
  { id: 6, src: memory6, note: "Stars aligned for you", offset: 50 },
];

const MemoryCard = ({ memory, index }: { memory: typeof memories[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group"
      style={{ marginTop: memory.offset }}
    >
      <div className="relative overflow-hidden rounded-2xl glass p-2">
        <div className="overflow-hidden rounded-xl">
          <motion.img
            src={memory.src}
            alt={memory.note}
            className="w-full h-auto object-cover transition-all duration-700"
            style={{
              filter: isInView ? "blur(0px)" : "blur(8px)",
              transform: isInView ? "scale(1)" : "scale(1.05)",
            }}
          />
        </div>

        {/* Gold memory note on hover */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-2 rounded-xl flex items-end justify-center p-6 bg-gradient-to-t from-gold-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <p className="font-heading text-sm italic text-primary-foreground tracking-wide text-center">
            "{memory.note}"
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MemoryCloud = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="memories" ref={containerRef} className="relative py-32 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="font-body text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
          The Memory Cloud
        </p>
        <h2 className="font-heading text-4xl md:text-5xl font-light text-gold-gradient">
          Moments Worth Keeping
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {memories.map((memory, i) => (
          <motion.div
            key={memory.id}
            style={{ y: i % 2 === 0 ? y1 : y2 }}
          >
            <MemoryCard memory={memory} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MemoryCloud;
