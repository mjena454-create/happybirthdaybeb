import { motion } from "framer-motion";

const STATS = [
  { value: "19", label: "Trips around the sun" },
  { value: "6,940", label: "Days of being you" },
  { value: "166,560", label: "Hours of laughter" },
  { value: "∞", label: "Reasons we adore you" },
];

const FunStats = () => {
  return (
    <section className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center text-[10px] uppercase tracking-[0.55em]"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
        >
          ✦ The Sanjana Statistics ✦
        </motion.p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card rounded-[24px] px-5 py-7 text-center"
            >
              <p className="font-heading text-3xl text-silver-shimmer md:text-4xl">{s.value}</p>
              <p
                className="mt-3 text-[9px] uppercase tracking-[0.3em]"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunStats;
