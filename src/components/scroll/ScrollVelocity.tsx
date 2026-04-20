import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useSmoothScroll } from "./SmoothScrollProvider";

/**
 * A horizontal kinetic marquee whose speed and skew are driven by scroll velocity.
 * Adds a unique "the-page-is-alive" feel between sections.
 */
const ScrollVelocity = ({
  text = "SANJANA · NINETEEN · MMXXV ·",
  baseSpeed = 0.4,
}: {
  text?: string;
  baseSpeed?: number;
}) => {
  const { lenis } = useSmoothScroll();
  const x = useMotionValue(0);
  const velocity = useMotionValue(0);
  const skew = useSpring(useTransform(velocity, [-50, 0, 50], [-8, 0, 8]), { stiffness: 80, damping: 20 });
  const [w, setW] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setW(el.scrollWidth / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastScroll = lenis?.scroll ?? window.scrollY;

    const tick = (now: number) => {
      const dt = Math.max(16, now - last);
      last = now;
      const cur = lenis?.scroll ?? window.scrollY;
      const v = (cur - lastScroll) / dt * 16; // px / frame
      lastScroll = cur;
      velocity.set(v);

      const dir = v >= 0 ? -1 : 1; // scroll down → drift left
      const speed = baseSpeed + Math.min(6, Math.abs(v) * 0.18);
      let next = x.get() + dir * speed;
      if (w > 0) {
        if (next <= -w) next += w;
        if (next >= 0) next -= w;
      }
      x.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lenis, baseSpeed, w, velocity, x]);

  const phrase = ` ${text} `;

  return (
    <div className="relative overflow-hidden py-10 md:py-14" aria-hidden>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--background)) 0%, transparent 12%, transparent 88%, hsl(var(--background)) 100%)",
        }}
      />
      <motion.div style={{ x, skewX: skew }} className="flex w-max will-change-transform">
        <div ref={trackRef} className="flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-heading text-[18vw] italic leading-none md:text-[10vw]"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--silver-light) / 0.85), hsl(var(--silver) / 0.18))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingInline: "0.18em",
                whiteSpace: "pre",
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollVelocity;