"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { num: "03", heading: "Start on time.", body: "If the game is called for 7pm, the ball goes up at 7pm. No warm-up extension because someone is late." },
  { num: "04", heading: "File the footage.", body: "Every game is filmed. Not for production value. For accountability and improvement." },
  { num: "05", heading: "Honest calls, honest scores.", body: "We call the fouls we commit. We correct the score when it is wrong. We apologize when we are wrong." },
  { num: "06", heading: "The gym is rented.", body: "Our access to the floor is a privilege that costs someone else money every week. We leave the gym cleaner than we found it." },
  { num: "07", heading: "No heroes.", body: "The best player on the court is not the point. The game is the point." },
];

function PrincipleRow({ num, heading, body, index }: { num: string; heading: string; body: string; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    const items = rowRef.current.querySelectorAll(".p-item");
    gsap.fromTo(items, { opacity: 0, y: 16 }, {
      opacity: 1, y: 0, duration: 0.56, stagger: 0.08,
      scrollTrigger: { trigger: rowRef.current, start: "top 80%", once: true },
      delay: index * 0.06,
    });
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="flex items-start gap-6 py-10 border-b border-[rgba(11,12,14,0.12)] cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={numRef}
        className="p-item font-fraunces font-normal text-[clamp(64px,8vw,140px)] leading-none shrink-0 select-none transition-all duration-[220ms]"
        style={{
          opacity: 0,
          WebkitTextStroke: hovered ? "0" : "1.5px #9BA0A6",
          WebkitTextFillColor: hovered ? "#E4572E" : "transparent",
          color: hovered ? "#E4572E" : "#9BA0A6",
          width: "clamp(80px,9vw,140px)",
          display: "inline-block",
        }}
      >
        {num}
      </span>
      <div className="flex flex-col gap-2 pt-3">
        <h3 className="p-item font-fraunces font-medium text-[#0B0C0E] text-[clamp(22px,2.5vw,48px)] leading-[1.1]" style={{ opacity: 0 }}>
          {heading}
        </h3>
        <p className="p-item font-inter text-[#4A4E54] text-[17px] leading-[1.65]" style={{ opacity: 0 }}>{body}</p>
      </div>
    </div>
  );
}

export default function WhatWeBelieve() {
  return (
    <section className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      <p className="eyebrow mb-4" style={{ color: "#E4572E" }}>WHAT WE BELIEVE</p>
      <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-10">
        Five principles we actually follow.
      </h2>
      <div>
        {principles.map((p, i) => (
          <PrincipleRow key={p.num} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}
