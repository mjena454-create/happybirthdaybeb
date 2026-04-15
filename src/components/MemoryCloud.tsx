import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { id: 1, src: memory1, note: "The beginning of forever", rotate: -3, x: "5%", y: 0 },
  { id: 2, src: memory2, note: "Golden hour, golden soul", rotate: 4, x: "55%", y: -40 },
  { id: 3, src: memory3, note: "Where the sun kissed the sea", rotate: -2, x: "15%", y: 20 },
  { id: 4, src: memory4, note: "Laughter is timeless", rotate: 5, x: "50%", y: -60 },
  { id: 5, src: memory5, note: "A chapter worth rereading", rotate: -4, x: "8%", y: 30 },
  { id: 6, src: memory6, note: "Stars aligned for you", rotate: 3, x: "52%", y: -20 },
];

const PolaroidCard = ({ memory, index }: { memory: typeof memories[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });

  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [80 * (index % 2 === 0 ? 1 : -1), -80 * (index % 2 === 0 ? 1 : -1)]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: parallaxY }}
      className="relative"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative group cursor-pointer"
        style={{
          rotate: memory.rotate,
          perspective: "1000px",
        }}
        whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative bg-secondary/50 p-3 pb-12 rounded-sm border border-border/50 shadow-xl shadow-background/50"
        >
          <div className="overflow-hidden">
            <motion.img
              src={memory.src}
              alt={memory.note}
              className="w-full h-auto object-cover transition-all duration-700"
              style={{
                filter: isInView ? "blur(0px) grayscale(0%)" : "blur(8px) grayscale(100%)",
                transform: isInView ? "scale(1)" : "scale(1.1)",
              }}
            />
          </div>

          {/* Silver-bordered caption on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            className="absolute inset-3 inset-b-12 flex items-end justify-center p-6 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="glass rounded-lg px-4 py-2 border border-primary/30">
              <p className="font-heading text-xs italic text-foreground/80 tracking-wide text-center">
                "{memory.note}"
              </p>
            </div>
          </motion.div>

          {/* Polaroid bottom text area */}
          <div className="absolute bottom-3 left-3 right-3 h-8 flex items-center justify-center">
            <p className="font-body text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              memory {memory.id}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const MemoryCloud = () => {
  return (
    <section id="memories" className="relative py-32 px-6 overflow-hidden">
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
        <h2 className="font-heading text-4xl md:text-5xl font-light text-silver-gradient">
          Moments Worth Keeping
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {memories.map((memory, i) => (
          <PolaroidCard key={memory.id} memory={memory} index={i} />
        ))}
      </div>
    </section>
  );
};

export default MemoryCloud;
