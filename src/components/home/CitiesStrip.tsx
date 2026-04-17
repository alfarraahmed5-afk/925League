"use client";
import { useEffect, useRef, useState } from "react";

const cities = ["NEW YORK", "/", "LOS ANGELES", "/", "CHICAGO"];

export default function CitiesStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const posRef = useRef(0);
  const speedRef = useRef(20);
  const rafRef = useRef<number>(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    const onSectionEnter = () => { speedRef.current = 8; };
    const onSectionLeave = () => { speedRef.current = 20; };
    const section = sectionRef.current;
    section?.addEventListener("mouseenter", onSectionEnter);
    section?.addEventListener("mouseleave", onSectionLeave);

    // Measure single set width
    const outer = outerRef.current;
    if (!outer) return;
    const singleWidth = outer.scrollWidth / 2;

    const animate = () => {
      posRef.current -= speedRef.current / 60;
      if (Math.abs(posRef.current) >= singleWidth) posRef.current = 0;
      setX(posRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section?.removeEventListener("mouseenter", onSectionEnter);
      section?.removeEventListener("mouseleave", onSectionLeave);
    };
  }, []);

  const CitySet = () => (
    <>
      {cities.map((city, i) => (
        <span
          key={i}
          className={`font-fraunces font-bold leading-none text-[#F1EAE0] px-6 relative select-none ${city !== "/" ? "cursor-default" : "opacity-30"}`}
          style={{ fontSize: "clamp(64px,10vw,120px)", letterSpacing: "-0.01em" }}
          onMouseEnter={() => city !== "/" && setHoveredCity(city)}
          onMouseLeave={() => setHoveredCity(null)}
        >
          {city}
          {city !== "/" && hoveredCity === city && (
            <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-[#E4572E]" style={{ animation: "hairlineGrow 0.26s ease-out forwards" }} />
          )}
        </span>
      ))}
    </>
  );

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-16 overflow-hidden relative">
      <p className="eyebrow text-center mb-6">WHERE WE RUN</p>

      <div className="overflow-hidden">
        <div
          ref={outerRef}
          className="flex items-baseline whitespace-nowrap"
          style={{ transform: `translateX(${x}px)` }}
        >
          <CitySet />
          <CitySet />
        </div>
      </div>

      <div className="mt-4 px-8 md:px-16">
        <p className="font-jetbrains font-medium text-[12px] text-[#9BA0A6] tracking-[0.02em]">
          NEW YORK 4 GYMS · LOS ANGELES 2 GYMS · CHICAGO 1 GYM
        </p>
      </div>
    </section>
  );
}
