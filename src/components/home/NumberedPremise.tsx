"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  { num: "01", heading: "Structured seasons.", body: "Eight games, one playoff, twelve weeks." },
  { num: "02", heading: "Gym time that respects yours.", body: "Tip-off at 7pm or 8pm on a weeknight. Done by 9:30pm." },
  { num: "03", heading: "A roster we screen.", body: "Every player submits a short background. We build competitive, balanced teams." },
  { num: "04", heading: "Stats and tape.", body: "Every game is filmed. Every player gets their footage." },
];

function NumberedRow({ num, heading, body, index }: { num: string; heading: string; body: string; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.54,
        scrollTrigger: { trigger: rowRef.current, start: "top 75%", once: true },
        delay: index * 0.08,
      }
    );
  }, [index]);

  useEffect(() => {
    if (!numRef.current) return;
    gsap.to(numRef.current, {
      color: hovered ? "#E4572E" : "#9BA0A6",
      duration: 0.22,
      ease: "power2.out",
    });
  }, [hovered]);

  return (
    <div
      ref={rowRef}
      className="flex items-start gap-6 py-10 border-b border-[rgba(74,78,84,0.3)] cursor-default"
      style={{ opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={numRef}
        className="font-fraunces font-normal text-[96px] leading-none shrink-0 select-none"
        style={{
          color: "#9BA0A6",
          WebkitTextStroke: hovered ? "0" : "1.5px #9BA0A6",
          WebkitTextFillColor: hovered ? "#E4572E" : "transparent",
          transition: "all 0.22s ease",
          width: 100,
          display: "inline-block",
          textAlign: "right",
        }}
      >
        {num}
      </span>
      <div className="flex flex-col gap-2 pt-4">
        <h3 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(24px,2.5vw,48px)] leading-[1.1]">
          {heading}
        </h3>
        <p className="font-inter text-[#4A4E54] text-[17px] leading-[1.65]">{body}</p>
      </div>
    </div>
  );
}

export default function NumberedPremise() {
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current) return;
    const els = leftRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(els, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.56, stagger: 0.12,
      scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true },
    });
  }, []);

  return (
    <section className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      {/* Ink-to-bone transition edge */}
      <div className="grid md:grid-cols-12 gap-10">
        {/* Left */}
        <div ref={leftRef} className="md:col-span-5 flex flex-col gap-5">
          <p className="eyebrow animate-in" style={{ opacity: 0 }}>THE PREMISE</p>
          <h2
            className="font-fraunces font-semibold text-[#0B0C0E] leading-[1.1] text-[clamp(32px,4vw,64px)] animate-in"
            style={{ opacity: 0 }}
          >
            What makes 925 League different.
          </h2>
          <p
            className="font-inter text-[#4A4E54] text-[17px] leading-[1.65] max-w-[380px] animate-in"
            style={{ opacity: 0 }}
          >
            We are not a pickup run. We are a full season — screened teams, scheduled games, filmed footage, and a trophy at the end. For professionals who still take the game seriously.
          </p>
        </div>

        {/* Right — numbered rows */}
        <div className="md:col-span-7 flex flex-col">
          {rows.map((row, i) => (
            <NumberedRow key={row.num} {...row} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
