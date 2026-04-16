import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" style={{ boxShadow: "0 0 8px hsl(var(--cobalt))" }} />
          <span
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark))" }}
          >
            Sanjana · XIX
          </span>
        </div>
        <span
          className="text-[10px] tracking-[0.3em] tabular-nums"
          style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--silver-dark) / 0.6)" }}
        >
          {formatTime(time)}
        </span>
      </div>
    </motion.header>
  );
};

export default Header;
