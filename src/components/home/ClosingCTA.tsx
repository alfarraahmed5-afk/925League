"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);

    const words = contentRef.current.querySelectorAll(".word");
    tl.fromTo(words, { opacity: 0, y: 20, filter: "blur(10px)" }, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out",
    }, 0.2);

    tl.fromTo(contentRef.current.querySelector(".cta-pill"), { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.32, ease: "power3.out" }, 0.7);
    tl.fromTo(contentRef.current.querySelector(".sub-link"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9);
  }, []);

  const headline = "The spring season starts March 14. Sign up by March 1.";

  return (
    <section
      ref={sectionRef}
      className="bg-[#E4572E] py-24 px-8 md:px-16 flex items-center justify-center min-h-[560px]"
      style={{ opacity: 0 }}
    >
      <div ref={contentRef} className="flex flex-col items-center text-center gap-8 max-w-[760px]">
        <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,4vw,56px)] leading-[1.15]">
          {headline.split(" ").map((word, i) => {
            const isDate = word.includes("March") || word === "14." || word === "1.";
            return (
              <span key={i} className={`word inline-block ${isDate ? "font-jetbrains" : ""}`} style={{ opacity: 0 }}>
                {word}{" "}
              </span>
            );
          })}
        </h2>

        <Link
          href="/leagues/mbl#signup"
          className="cta-pill pill bg-[#0B0C0E] text-[#F1EAE0] text-[13px] tracking-[0.1em]"
          style={{ opacity: 0, height: 56, paddingLeft: 48, paddingRight: 48 }}
        >
          JOIN THE MBL — SPRING 2026
        </Link>

        <Link
          href="/leagues/open-runs"
          className="sub-link font-inter font-medium text-[15px] text-[rgba(11,12,14,0.7)] underline decoration-[rgba(11,12,14,0.3)] underline-offset-2 hover:text-[#0B0C0E] transition-colors"
          style={{ opacity: 0 }}
        >
          Not ready to commit? Come to an Open Run on Saturday.
        </Link>
      </div>
    </section>
  );
}
