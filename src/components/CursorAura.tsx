import { useEffect, useRef } from "react";

const CursorAura = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 90}px, ${ringY - 90}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[180px] w-[180px] rounded-full md:block"
        style={{
          background:
            "radial-gradient(circle, hsla(218, 56%, 56%, 0.18) 0%, hsla(210, 24%, 93%, 0.05) 38%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(8px)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden h-1.5 w-1.5 rounded-full md:block"
        style={{
          background: "hsl(var(--silver-light))",
          boxShadow: "0 0 12px hsla(210, 24%, 93%, 0.7)",
        }}
      />
    </>
  );
};

export default CursorAura;
