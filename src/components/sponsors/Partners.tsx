"use client";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_COUNT = 10;

export default function Partners() {
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const speedRef = useRef(30);
  const rafRef = useRef<number>(0);
  const [x, setX] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const singleWidth = outer.scrollWidth / 2;

    const animate = () => {
      if (!paused) {
        posRef.current -= speedRef.current / 60;
        if (Math.abs(posRef.current) >= singleWidth) posRef.current = 0;
        setX(posRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused]);

  const PlaceholderCards = () => (
    <>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-[180px] h-[120px] bg-[#E8E2D6] rounded-sm flex items-center justify-center mx-3 cursor-pointer"
          style={{ animation: `pulse 4s ease-in-out ${i * 0.4}s infinite` }}
        >
          <p className="font-inter text-[#9BA0A6] text-[12px] text-center px-4 leading-[1.5]">
            Your logo here — partners@925league.com
          </p>
        </div>
      ))}
    </>
  );

  return (
    <section className="bg-[#F1EAE0] py-24 overflow-hidden">
      <div className="px-8 md:px-16 mb-10">
        <p className="eyebrow mb-4">CURRENT PARTNERS</p>
        <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,3vw,48px)] leading-[1.1]">
          Spots open for Season 03.
        </h2>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={outerRef}
          className="flex items-center py-4"
          style={{ transform: `translateX(${x}px)` }}
        >
          <PlaceholderCards />
          <PlaceholderCards />
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{background:#E8E2D6} 50%{background:#DDD7CB} }`}</style>
    </section>
  );
}
