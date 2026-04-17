"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ComePlay() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } });
      tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
      const words = contentRef.current!.querySelectorAll(".word");
      tl.fromTo(words, { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out" }, 0.2);
      const pills = contentRef.current!.querySelectorAll(".pill-btn");
      tl.fromTo(pills, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.32, stagger: 0.06 }, 0.7);
      const sub = contentRef.current!.querySelector(".sub");
      if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const headline = "Play with us. Or build something with us.";

  return (
    <section
      ref={sectionRef}
      className="bg-[#E4572E] py-24 px-8 md:px-16 flex items-center justify-center min-h-[520px]"
      style={{ opacity: 0 }}
    >
      <div ref={contentRef} className="flex flex-col items-center text-center gap-8 max-w-[720px]">
        <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,4vw,56px)] leading-[1.15]">
          {headline.split(" ").map((word, i, arr) => (
            <Fragment key={i}>
              <span className="word inline-block" style={{ opacity: 0 }}>{word}</span>
              {i < arr.length - 1 && " "}
            </Fragment>
          ))}
        </h2>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/leagues/mbl#signup"
            className="pill-btn pill bg-[#0B0C0E] text-[#F1EAE0] text-[12px] tracking-[0.08em]"
            style={{ opacity: 0, height: 52 }}
          >
            JOIN THE MBL
          </Link>
          <Link
            href="/sponsors"
            className="pill-btn pill bg-transparent text-[#0B0C0E] border border-[#0B0C0E] text-[12px] tracking-[0.08em]"
            style={{ opacity: 0, height: 52 }}
          >
            BECOME A PARTNER
          </Link>
        </div>

        <p className="sub font-inter font-medium text-[15px] text-[rgba(11,12,14,0.7)]" style={{ opacity: 0 }}>
          Or just watch. Follow @925league on Instagram.
        </p>
      </div>
    </section>
  );
}
