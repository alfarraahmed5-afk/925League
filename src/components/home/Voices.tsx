"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: "I work 50-hour weeks. Tuesdays at 7pm are the only time I'm truly not thinking about work. The league gave me that back.",
    name: "Marcus A.",
    team: "Downtown Ballers",
    meta: "NEW YORK · POINT GUARD",
  },
  {
    text: "I had not played organized ball since college. The level of play in the MBL is better than I expected. People show up.",
    name: "Kevin H.",
    team: "Capital Partners",
    meta: "LOS ANGELES · POWER FORWARD",
  },
  {
    text: "Every Thursday I text my teammates hours before tip-off. It is a small thing but it is the best group chat I am in.",
    name: "James N.",
    team: "925 Originals",
    meta: "CHICAGO · SHOOTING GUARD",
  },
];

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const quoteBlocks = sectionRef.current!.querySelectorAll(".quote-block");
      quoteBlocks.forEach((block) => {
        const mark = block.querySelector(".quote-mark");
        const words = block.querySelectorAll(".q-word");
        const attr = block.querySelector(".attribution");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: "top 80%", once: true },
        });
        if (mark) tl.fromTo(mark, { scale: 1.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0);
        if (words.length) tl.fromTo(words, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.05, ease: "power3.out" }, 0.2);
        if (attr) tl.fromTo(attr, { opacity: 0 }, { opacity: 1, duration: 0.32 }, 0.8);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#E8E2D6] py-24 px-8 md:px-16">
      <div className="flex flex-col">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="quote-block flex flex-col gap-6 py-16 border-b border-[rgba(11,12,14,0.1)] last:border-0"
          >
            <span
              className="quote-mark font-fraunces font-medium text-[#E4572E] leading-none select-none"
              style={{ fontSize: "clamp(64px,8vw,128px)", opacity: 0 }}
            >
              &ldquo;
            </span>
            <blockquote className="font-fraunces font-normal italic text-[#0B0C0E] text-[clamp(18px,2.5vw,32px)] leading-[1.4] max-w-[800px]">
              {q.text.split(" ").map((word, wi, arr) => (
                <Fragment key={wi}>
                  <span className="q-word inline-block" style={{ opacity: 0 }}>{word}</span>
                  {wi < arr.length - 1 && " "}
                </Fragment>
              ))}
            </blockquote>
            <div className="attribution flex flex-col gap-1" style={{ opacity: 0 }}>
              <div className="w-[80px] h-[1px] bg-[rgba(11,12,14,0.2)] mb-3" />
              <p className="font-inter font-semibold text-[17px] text-[#0B0C0E]">{q.name}</p>
              <p className="font-inter text-[17px] text-[#4A4E54]">{q.team}</p>
              <p className="font-jetbrains font-medium text-[12px] tracking-[0.08em] text-[#4A4E54]">{q.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
