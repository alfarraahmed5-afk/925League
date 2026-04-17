"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MBLOpener() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      if (imgRef.current) {
        tl.fromTo(imgRef.current, { clipPath: "inset(100% 0 0 0)", scale: 1.08 }, {
          clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.1, ease: "power3.out",
        }, 0);
      }

      const textEls = textRef.current?.querySelectorAll(".animate-in");
      if (textEls) {
        tl.fromTo(textEls, { opacity: 0, y: 20, filter: "blur(8px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.18, ease: "power3.out",
        }, 0.4);
      }

      // Parallax on scroll
      if (imgRef.current && sectionRef.current) {
        gsap.to(imgRef.current, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["Eight teams.", "Twelve weeks.", "One trophy."];

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#0B0C0E] flex pt-[72px] overflow-hidden">
      {/* Left — image 60% */}
      <div className="hidden md:block w-[60%] relative overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <Image
            src="https://images.pexels.com/photos/30555514/pexels-photo-30555514.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Professional indoor basketball game"
            fill
            className="object-cover object-center"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,12,14,0.5)] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[30%]" style={{ background: "linear-gradient(to bottom, rgba(11,12,14,0.4), transparent)" }} />
          <div className="absolute bottom-8 left-8 font-jetbrains text-[#E4572E] text-[11px] tracking-[0.14em] uppercase">
            MBL Season 03 · Live
          </div>
        </div>
      </div>

      {/* Right — text 40% */}
      <div ref={textRef} className="flex-1 flex flex-col justify-center px-8 md:px-14 py-16 gap-6">
        <p className="eyebrow animate-in" style={{ opacity: 0 }}>THE MBL / SEASON 03</p>

        <div className="flex flex-col gap-1">
          {headline.map((line, i) => (
            <h1
              key={i}
              className="font-fraunces font-bold text-[#F1EAE0] leading-[1.05] text-[clamp(36px,5vw,72px)] animate-in"
              style={{ opacity: 0 }}
            >
              {line}
            </h1>
          ))}
        </div>

        <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65] max-w-[420px] animate-in" style={{ opacity: 0 }}>
          The MBL — the 9-to-5 Basketball League — is our flagship competition. Screened rosters, filmed games, weekly playoffs.
        </p>

        <div className="flex gap-6 flex-wrap animate-in" style={{ opacity: 0 }}>
          <Link href="#signup" className="font-inter font-medium text-[#F1EAE0] text-[15px] relative group">
            <span>Jump to sign-up</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E4572E] scale-x-0 group-hover:scale-x-100 transition-transform duration-[260ms] origin-left" />
          </Link>
          <Link href="#schedule" className="font-inter font-medium text-[#9BA0A6] text-[15px] relative group">
            <span>Download the season calendar</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#9BA0A6] scale-x-0 group-hover:scale-x-100 transition-transform duration-[260ms] origin-left" />
          </Link>
        </div>
      </div>
    </section>
  );
}
