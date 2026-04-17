"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextSaturday() {
  const sectionRef = useRef<HTMLElement>(null);
  const dateRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !dateRef.current) return;
    const chars = dateRef.current.querySelectorAll(".char");
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });

    // Flip reveal on date chars
    tl.fromTo(chars, { rotateY: -90, opacity: 0 }, {
      rotateY: 0, opacity: 1, duration: 0.32, stagger: 0.04, ease: "power3.out",
    }, 0);
    tl.fromTo(sectionRef.current.querySelectorAll(".fade-in"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, 0.5);
  }, []);

  const dateText = "Saturday, April 25.";

  return (
    <section ref={sectionRef} className="bg-[#E8E2D6] py-24 px-8 md:px-16 flex flex-col items-center text-center gap-8">
      <p className="eyebrow fade-in" style={{ opacity: 0 }}>NEXT OPEN RUN</p>

      <h2
        ref={dateRef}
        className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(36px,5vw,72px)] leading-[1.1]"
        style={{ perspective: 600 }}
      >
        {dateText.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{ opacity: 0, display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      <p className="fade-in font-inter text-[#4A4E54] text-[17px] leading-[1.65] max-w-[480px]" style={{ opacity: 0 }}>
        Doors at 1:45 PM. Check our Instagram the morning of for the exact court number.
      </p>

      <a
        href="#"
        className="fade-in font-inter font-medium text-[17px] text-[#0B0C0E] relative group"
        style={{ opacity: 0 }}
      >
        <span>See all upcoming Open Runs</span>
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E4572E] scale-x-0 group-hover:scale-x-100 transition-transform duration-[260ms] origin-left" />
      </a>
    </section>
  );
}
