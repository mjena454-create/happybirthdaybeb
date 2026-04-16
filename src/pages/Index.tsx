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
      { threshold: 0.2 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [entered]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  const handleNavigate = (section: string) => {
    if (!entered && section !== "home") {
      setEntered(true);
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      const el = document.getElementById("memories");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "hsl(var(--midnight))" }}
      onMouseMove={handleMouseMove}
    >
      {/* Interactive gradient background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsla(220, 60%, 55%, 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 600px 400px at ${100 - mousePos.x * 100}% ${100 - mousePos.y * 100}%, hsla(210, 20%, 72%, 0.03) 0%, transparent 70%),
            hsl(var(--midnight))
          `,
          transition: "background 0.3s ease-out",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsla(222, 47%, 1%, 0.5) 100%)",
        }}
      />

      {/* Film grain */}
      <div className="film-grain" />

      <Header />
      <HeroSection onEnter={handleEnter} />

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
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
