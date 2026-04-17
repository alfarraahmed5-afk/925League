"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const facts = [
  { eyebrow: "WHEN", statement: "Saturdays at 2pm.", clarifier: "We run until 5pm. Show up whenever." },
  { eyebrow: "WHERE", statement: "Lower Manhattan Gym.", clarifier: "40 Worth Street, New York, NY. We post the exact court number weekly on Instagram." },
  { eyebrow: "HOW MUCH", statement: "$15 at the door.", clarifier: "Cash or Venmo. Bring your own water." },
];

export default function WhatOpenRun() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cols = sectionRef.current.querySelectorAll(".fact-col");
    cols.forEach((col, i) => {
      const items = col.querySelectorAll(".fact-item");
      gsap.fromTo(items, { opacity: 0, y: 16, filter: "blur(6px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.06,
        delay: i * 0.18,
        scrollTrigger: { trigger: col, start: "top 80%", once: true },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-3 gap-12">
        {facts.map((fact) => (
          <div key={fact.eyebrow} className="fact-col flex flex-col gap-3">
            <p className="fact-item eyebrow" style={{ opacity: 0 }}>{fact.eyebrow}</p>
            <h2
              className="fact-item font-fraunces font-semibold text-[#F1EAE0] leading-[1.1] text-[clamp(24px,3vw,48px)]"
              style={{ opacity: 0 }}
            >
              {fact.statement}
            </h2>
            <p className="fact-item font-inter text-[#9BA0A6] text-[17px] leading-[1.65]" style={{ opacity: 0 }}>
              {fact.clarifier}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
