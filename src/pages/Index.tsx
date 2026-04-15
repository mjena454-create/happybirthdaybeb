import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HeroSection from "@/components/HeroSection";
import MemoryCloud from "@/components/MemoryCloud";
import FMPortal from "@/components/FMPortal";
import CelebrationRoom from "@/components/CelebrationRoom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [entered, setEntered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const sections = ["home", "memories", "fm", "celebration"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  const handleNavigate = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      const el = document.getElementById("memories");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <div
      className="relative bg-background min-h-screen overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive grainy gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--cobalt) / 0.08) 0%, hsl(var(--midnight)) 60%)`,
        }}
      />

      {/* Film grain overlay */}
      <div className="film-grain" />

      <Header />
      <HeroSection onEnter={handleEnter} />

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MemoryCloud />
          <FMPortal />
          <CelebrationRoom />
        </motion.div>
      )}

      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
