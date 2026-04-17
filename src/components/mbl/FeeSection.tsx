"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEE = 250;

const included = [
  "All twelve weeks of gym time.",
  "Two paid officials per game.",
  "Full-game filming and player footage.",
  "Jersey, reversible, in team colors.",
  "Championship trophy and MVP award.",
  "Post-season highlight reel.",
];

export default function FeeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".animate-in");
      gsap.fromTo(items, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.56, stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.fromTo({ val: 0 }, { val: FEE }, {
        duration: 1.2, ease: "power2.out",
        onUpdate: function () {
          if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].val).toLocaleString();
        },
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Left — fee */}
        <div className="md:col-span-5 flex flex-col gap-4 animate-in" style={{ opacity: 0 }}>
          <p className="eyebrow">SEASON FEE</p>
          <div className="flex items-end gap-2">
            <span className="font-fraunces font-bold text-[#E4572E] text-[clamp(48px,6vw,80px)] leading-none">$</span>
            <span ref={numRef} className="stat-number" style={{ fontSize: "clamp(64px,10vw,144px)", lineHeight: 1 }}>
              0
            </span>
          </div>
          <p className="font-inter font-medium text-[14px] tracking-[0.1em] uppercase text-[#4A4E54]">
            USD PER PLAYER / SEASON
          </p>
          <p className="font-inter text-[13px] text-[#4A4E54] mt-1">
            No tryout fee. Refunds available up to draft night minus a $10 admin charge.
          </p>
        </div>

        {/* Right — included */}
        <div className="md:col-span-7 flex flex-col gap-0">
          {included.map((item, i) => (
            <div
              key={i}
              className="animate-in flex items-start gap-3 py-4 border-b border-[rgba(74,78,84,0.2)]"
              style={{ opacity: 0 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[3px]">
                <path d="M4 8l2.5 2.5L12 5" stroke="#E4572E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-inter text-[17px] text-[#0B0C0E] leading-[1.5]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
