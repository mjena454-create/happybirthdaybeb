import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { id: 1, src: memory1, note: "The beginning of forever", rotate: -4, speed: 0.2, width: "md:w-[58%]", align: "md:mr-auto" },
  { id: 2, src: memory2, note: "Golden hour, golden soul", rotate: 3, speed: 0.45, width: "md:w-[44%]", align: "md:ml-auto" },
  { id: 3, src: memory3, note: "Where the sun kissed the sea", rotate: -3, speed: 0.3, width: "md:w-[52%]", align: "md:ml-[12%]" },
  { id: 4, src: memory4, note: "Laughter is timeless", rotate: 4, speed: 0.55, width: "md:w-[46%]", align: "md:mr-[8%]" },
  { id: 5, src: memory5, note: "A chapter worth rereading", rotate: -2, speed: 0.28, width: "md:w-[60%]", align: "md:mr-auto" },
  { id: 6, src: memory6, note: "Stars aligned for you", rotate: 3, speed: 0.5, width: "md:w-[42%]", align: "md:ml-auto" },
];

const GalleryCard = ({ memory, index }: { memory: typeof memories[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [140 * memory.speed, -180 * memory.speed]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [memory.rotate, 0, -memory.rotate * 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -3]);
  const blur = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [6, 2, 0, 2, 6]);
  const blurFilter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.figure
      ref={ref}
      style={{ y, rotate, rotateX, transformPerspective: 1200 }}
      className={`relative w-full ${memory.width} ${memory.align} group`}
    >
      <div className="glass-card rounded-[30px] p-3 md:p-4">
        <div className="relative overflow-hidden rounded-[22px]">
          <motion.img src={memory.src} alt={memory.note} className="w-full h-auto object-cover" style={{ filter: blurFilter }} />

          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "linear-gradient(180deg, transparent 40%, hsla(222, 34%, 10%, 0.72) 100%)" }}
          />
        </div>

        <figcaption className="absolute inset-x-7 bottom-7 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="glass rounded-2xl px-4 py-3">
            <p className="text-center font-heading text-sm italic" style={{ color: "hsl(var(--silver-light))" }}>
              “{memory.note}”
            </p>
          </div>
        </figcaption>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <span
            className="text-[9px] uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            memory {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
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
            The Gallery
          </p>
          <h2 className="font-heading text-4xl font-light text-silver-gradient md:text-5xl lg:text-6xl">
            Moments Worth Keeping
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
            A scattered memory wall drifting at different speeds — intimate, tactile, and alive as she scrolls.
          </p>
        </motion.div>

        <div className="space-y-10 md:space-y-[-2vh]">
          {memories.map((memory, index) => (
            <GalleryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryCloud;
