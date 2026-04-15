import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
    >
      <span className="font-heading text-sm tracking-[0.3em] text-foreground/50 uppercase">
        Sanjana Vol. 19
      </span>
      <span className="font-body text-xs tracking-widest text-muted-foreground tabular-nums">
        {formatTime(time)}
      </span>
    </motion.header>
  );
};

export default Header;
