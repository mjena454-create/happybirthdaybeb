import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import HeroSection from "@/components/HeroSection";
import MemoryCloud from "@/components/MemoryCloud";
import FMPortal from "@/components/FMPortal";
import CelebrationRoom from "@/components/CelebrationRoom";
import CursorAura from "@/components/CursorAura";
import ScrollProgress from "@/components/ScrollProgress";
import SparkleClick from "@/components/SparkleClick";
import FortuneCookie from "@/components/FortuneCookie";
import SecretCake from "@/components/SecretCake";
import FunStats from "@/components/FunStats";
import ReasonsWall from "@/components/ReasonsWall";
import { SmoothScrollProvider, useSmoothScroll } from "@/components/scroll/SmoothScrollProvider";
import SectionReveal from "@/components/scroll/SectionReveal";
import ScrollVelocity from "@/components/scroll/ScrollVelocity";

const IndexInner = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.28 });
  const { scrollTo } = useSmoothScroll();

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
      { threshold: 0.28 }
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

  const handleNavigate = (section: string) => scrollTo(section, { offset: -10, duration: 1.8 });
  const handleEnter = () => scrollTo("memories", { offset: -10, duration: 2.0 });

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background" onMouseMove={handleMouseMove}>
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 720px 420px at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsla(218, 56%, 56%, 0.12) 0%, transparent 58%),
            radial-gradient(ellipse 880px 480px at 50% 0%, hsla(210, 24%, 93%, 0.09) 0%, transparent 56%),
            linear-gradient(180deg, hsl(var(--midnight-light)) 0%, hsl(var(--midnight)) 58%, hsl(var(--background)) 100%)
          `,
        }}
      />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsla(210, 24%, 93%, 0.03) 0%, transparent 26%, transparent 74%, hsla(222, 40%, 4%, 0.18) 100%)",
        }}
      />

      <div className="film-grain" />

      <CursorAura />
      <ScrollProgress />
      <SparkleClick />
      <FortuneCookie />
      <SecretCake />
      <Header />

      <main className="relative z-10">
        <HeroSection onEnter={handleEnter} />
        <SectionReveal><FunStats /></SectionReveal>
        <ScrollVelocity text="SANJANA · NINETEEN · MMXXV ·" />
        <SectionReveal><MemoryCloud /></SectionReveal>
        <SectionReveal><ReasonsWall /></SectionReveal>
        <ScrollVelocity text="✦ MADE WITH LOVE · FOR YOU ONLY ·" baseSpeed={0.3} />
        <SectionReveal><FMPortal /></SectionReveal>
        <SectionReveal><CelebrationRoom /></SectionReveal>
      </main>

      <BottomNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
};

const Index = () => (
  <SmoothScrollProvider>
    <IndexInner />
  </SmoothScrollProvider>
);

export default Index;
