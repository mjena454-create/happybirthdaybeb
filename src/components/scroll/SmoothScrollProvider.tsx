import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";

type Ctx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number; duration?: number }) => void;
};

const SmoothScrollContext = createContext<Ctx>({ lenis: null, scrollTo: () => {} });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      // weighty cinematic ease — slow start, soft landing
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    setReady(true);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: Ctx["scrollTo"] = (target, opts) => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (typeof target === "string") {
      const el = document.getElementById(target.replace(/^#/, ""));
      if (!el) return;
      lenis.scrollTo(el, { offset: opts?.offset ?? -10, duration: opts?.duration ?? 1.8 });
    } else {
      lenis.scrollTo(target as any, { offset: opts?.offset ?? 0, duration: opts?.duration ?? 1.8 });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: ready ? lenisRef.current : null, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};