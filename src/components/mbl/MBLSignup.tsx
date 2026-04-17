"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function MBLSignup() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
    const words = contentRef.current.querySelectorAll(".word");
    tl.fromTo(words, { opacity: 0, y: 20, filter: "blur(10px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out",
    }, 0.2);
    tl.fromTo(".mbl-cta", { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32 }, 0.7);
    tl.fromTo(".mbl-sub", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9);
  }, []);

  const headline = "The spring roster is 57% full. 34 spots left.";

  return (
    <section
      id="signup"
      ref={sectionRef}
      className="bg-[#E4572E] py-24 px-8 md:px-16 flex items-center justify-center min-h-[480px]"
      style={{ opacity: 0 }}
    >
      <div ref={contentRef} className="flex flex-col items-center text-center gap-8 max-w-[720px]">
        <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,4vw,56px)] leading-[1.15]">
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              className={`word inline-block ${["57%", "34"].includes(word) ? "font-jetbrains" : ""}`}
              style={{ opacity: 0 }}
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <Link
          href="#"
          className="mbl-cta pill bg-[#0B0C0E] text-[#F1EAE0] text-[13px] tracking-[0.1em]"
          style={{ opacity: 0, height: 56, paddingLeft: 48, paddingRight: 48 }}
        >
          APPLY FOR SEASON 03
        </Link>

        <p className="mbl-sub font-inter font-medium text-[15px] text-[rgba(11,12,14,0.7)]" style={{ opacity: 0 }}>
          Applications close March 1 at 23:59 EGT.
        </p>
      </div>
    </section>
  );
}
