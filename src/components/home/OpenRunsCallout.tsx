"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function OpenRunsCallout() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftNumRef = useRef<HTMLSpanElement>(null);
  const rightNumRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      // Headline words
      const words = contentRef.current?.querySelectorAll(".word");
      if (words) {
        tl.fromTo(words, { opacity: 0, y: 20, filter: "blur(10px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.05, ease: "power3.out",
        }, 0);
      }

      // Meta
      tl.fromTo(contentRef.current?.querySelector(".meta") ?? {}, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.7);
      tl.fromTo(contentRef.current?.querySelector(".cta") ?? {}, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.32, ease: "power3.out" }, 0.9);

      // Flanking numerals
      if (leftNumRef.current) tl.fromTo(leftNumRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.3);
      if (rightNumRef.current) tl.fromTo(rightNumRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.3);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headline = "Not ready for a season? Come to an Open Run.";

  return (
    <section ref={sectionRef} className="bg-[#F1EAE0] py-24 px-8 md:px-16 relative overflow-hidden min-h-[480px] flex items-center">
      {/* Flanking numerals — desktop only */}
      <span
        ref={leftNumRef}
        className="hidden md:block absolute left-0 font-fraunces font-normal text-[180px] leading-none text-[#9BA0A6] select-none pointer-events-none"
        style={{
          opacity: 0,
          WebkitTextStroke: "1.5px #9BA0A6",
          WebkitTextFillColor: "transparent",
          top: "50%",
          transform: "translateY(-50%) translateX(-30%)",
        }}
      >
        14
      </span>
      <span
        ref={rightNumRef}
        className="hidden md:block absolute right-0 font-fraunces font-normal text-[180px] leading-none text-[#9BA0A6] select-none pointer-events-none"
        style={{
          opacity: 0,
          WebkitTextStroke: "1.5px #9BA0A6",
          WebkitTextFillColor: "transparent",
          top: "50%",
          transform: "translateY(-50%) translateX(30%)",
        }}
      >
        00
      </span>

      {/* Center content */}
      <div ref={contentRef} className="w-full flex flex-col items-center text-center gap-6 relative z-10">
        <h2 className="font-fraunces font-medium text-[#0B0C0E] text-[clamp(28px,4vw,64px)] leading-[1.15] max-w-[720px]">
          {headline.split(" ").map((word, i, arr) => (
            <Fragment key={i}>
              <span className="word inline-block" style={{ opacity: 0 }}>{word}</span>
              {i < arr.length - 1 && " "}
            </Fragment>
          ))}
        </h2>
        <p className="meta font-jetbrains font-medium text-[13px] text-[rgba(11,12,14,0.7)]" style={{ opacity: 0 }}>
          SAT 2PM · LOWER MANHATTAN · $15 · WALK UP
        </p>
        <Link
          href="/leagues/open-runs"
          className="cta pill bg-[#0B0C0E] text-[#F1EAE0] text-[12px] tracking-[0.08em]"
          style={{ opacity: 0, height: 44 }}
        >
          See Open Run schedule
        </Link>
      </div>
    </section>
  );
}
