"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 312, label: "PLAYERS ACTIVE", desc: "Across all cities in the 2025-26 season." },
  { value: 3, label: "CITIES", desc: "New York, Los Angeles, Chicago." },
  { value: 164, label: "GAMES PLAYED", desc: "Full seasons logged to date." },
  { value: 47, label: "GAMES LIVESTREAMED", desc: "On our YouTube since we started filming." },
];

export default function ByTheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=900",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          stats.forEach((stat, i) => {
            const threshold = i * 0.25;
            const progress = Math.min(1, Math.max(0, (self.progress - threshold) / 0.25));
            const el = numberRefs.current[i];
            if (el) {
              const current = Math.round(stat.value * progress);
              el.textContent = current.toLocaleString();
            }
          });
        },
      });

      // Fade in grid on enter
      gsap.fromTo(gridRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0C0E] min-h-screen flex items-center py-24 px-8 md:px-16 overflow-hidden"
    >
      {/* Background scoreboard texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(241,234,224,0.15) 20px, rgba(241,234,224,0.15) 21px)",
        }}
      />

      <div ref={gridRef} className="relative z-10 w-full" style={{ opacity: 0 }}>
        <div className="grid grid-cols-2 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-3 p-8 md:p-12 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-[#2A2D31]`}
            >
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                className="stat-number text-[clamp(56px,10vw,164px)] leading-none"
              >
                0
              </span>
              <p className="font-inter font-medium text-[15px] tracking-[0.14em] uppercase text-[rgba(241,234,224,0.8)]">
                {stat.label}
              </p>
              <p className="font-inter text-[#9BA0A6] text-[15px] leading-[1.5]">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
