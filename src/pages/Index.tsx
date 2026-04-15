import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HeroSection from "@/components/HeroSection";
import MemoryCloud from "@/components/MemoryCloud";
import FMPortal from "@/components/FMPortal";
import CelebrationRoom from "@/components/CelebrationRoom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

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

  const handleNavigate = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-background min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <MemoryCloud />
      <FMPortal />
      <CelebrationRoom />
      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
