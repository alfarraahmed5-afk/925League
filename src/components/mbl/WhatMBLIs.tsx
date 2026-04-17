"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatMBLIs() {
  const paraRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paraRef.current || !eyebrowRef.current) return;
    const words = paraRef.current.querySelectorAll(".w");
    const tl = gsap.timeline({ scrollTrigger: { trigger: paraRef.current, start: "top 80%", once: true } });
    tl.fromTo(eyebrowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.24 }, 0);
    tl.fromTo(words, { opacity: 0, filter: "blur(8px)" }, {
      opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out",
    }, 0.2);
  }, []);

  const text = "The MBL is a recreational basketball league for working professionals. Games run two nights a week at a booked gym. Eight teams of ten players each. The season is twelve weeks, ending with a single-elimination playoff among the top four teams. Every game is filmed and every player receives their footage at the end of the season. The fee covers all gym time, officiating, filming, jerseys, and trophies.";

  return (
    <section className="bg-[#F1EAE0] py-24 px-8 md:px-16 flex flex-col items-center">
      <p ref={eyebrowRef} className="eyebrow mb-10" style={{ color: "#E4572E", opacity: 0 }}>IN ONE PARAGRAPH</p>
      <p
        ref={paraRef}
        className="font-fraunces font-normal text-[#0B0C0E] text-center max-w-[880px] leading-[1.6]"
        style={{ fontSize: "clamp(18px,2vw,22px)" }}
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className="w inline-block" style={{ opacity: 0 }}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
