"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 312, suffix: "", label: "TOTAL ACTIVE PLAYERS", context: "Across New York, Los Angeles, Chicago as of Season 03." },
  { value: 32, suffix: "", label: "AVERAGE PLAYER AGE", context: "Range: 24 to 42. Median: 31." },
  { value: 84, suffix: "%", label: "HOLD A FULL-TIME SALARIED ROLE", context: "Based on our intake form data." },
  { value: 67, suffix: "%", label: "HOUSEHOLD INCOME OVER $100K", context: "Self-reported. Not collected by us directly." },
  { value: 41, suffix: "%", label: "WORK IN FINANCE OR TECHNOLOGY", context: "Remaining: Real estate 16%, Media 12%, Healthcare 10%, Other 21%." },
  { value: 8.2, suffix: "K", label: "MONTHLY UNIQUE WEBSITE VISITORS", context: "Growing 14% month-over-month since October 2025." },
];

export default function WhoPlays() {
  const gridRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!gridRef.current) return;
    stats.forEach((stat, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      gsap.fromTo(
        { val: 0 },
        { val: stat.value },
        {
          duration: 0.9, ease: "power2.out",
          delay: i * 0.14,
          onUpdate: function () {
            const v = this.targets()[0].val;
            el.textContent = (stat.value % 1 === 0 ? Math.round(v) : v.toFixed(1)) + stat.suffix;
          },
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    });

    const cells = gridRef.current.querySelectorAll(".stat-cell");
    gsap.fromTo(cells, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.56, stagger: { each: 0.14, from: "start" },
      scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
    });
  }, []);

  return (
    <section className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      <p className="eyebrow mb-4" style={{ color: "#E4572E" }}>WHO PLAYS</p>
      <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-14">
        The audience, in numbers.
      </h2>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="stat-cell flex flex-col gap-2" style={{ opacity: 0 }}>
            <span
              ref={(el) => { numRefs.current[i] = el; }}
              className="stat-number text-[clamp(48px,6vw,80px)] leading-none"
            >
              0
            </span>
            <p className="font-inter font-medium text-[13px] tracking-[0.12em] uppercase text-[#4A4E54]">{stat.label}</p>
            <p className="font-inter text-[#4A4E54] text-[14px] leading-[1.5]">{stat.context}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
