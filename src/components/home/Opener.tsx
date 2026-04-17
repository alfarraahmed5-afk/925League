"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const words = ["Basketball,", "between", "the", "meetings."];

export default function HomeOpener() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

      if (photoRef.current) {
        tl.fromTo(photoRef.current,
          { clipPath: "inset(8% 4% 8% 4%)", scale: 1.04, opacity: 0 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
          0
        );
      }

      const wordEls = headlineRef.current?.querySelectorAll(".word");
      if (wordEls) {
        tl.fromTo(
          wordEls,
          { opacity: 0, y: 40, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.07, ease: "power3.out" },
          0.5
        );
      }

      if (hairlineRef.current) {
        tl.fromTo(hairlineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: "power2.out", transformOrigin: "left" }, 1.3);
      }

      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.45);
      }

      if (pillsRef.current) {
        tl.fromTo(pillsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 1.6);
      }

      if (metaRef.current) {
        tl.fromTo(metaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.24, ease: "power2.out" }, 1.8);
      }

      if (photoRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 20%",
          scrub: true,
          onUpdate: (self) => {
            if (photoRef.current) {
              gsap.set(photoRef.current, { opacity: Math.max(0, 1 - self.progress * 1.4) });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0B0C0E] flex flex-col overflow-hidden pt-[72px]"
    >
      {/* Hero photo */}
      <div ref={photoRef} className="flex-1 relative overflow-hidden mx-4 md:mx-8 mt-4 rounded-sm" style={{ opacity: 0, minHeight: 320 }}>
        <Image
          src="https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Basketball court at dusk"
          fill
          priority
          className="object-cover object-center"
          unoptimized
        />
        {/* Gradient overlay so text below remains legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,12,14,0.15)] via-transparent to-[rgba(11,12,14,0.6)]" />

        {/* Stat chips — floated bottom-left of photo */}
        <div className="absolute bottom-5 left-5 flex gap-2 flex-wrap">
          {["3 CITIES", "312 PLAYERS", "SEASON 03"].map((tag) => (
            <span
              key={tag}
              className="font-jetbrains text-[10px] tracking-[0.14em] text-[#F1EAE0] bg-[rgba(11,12,14,0.55)] backdrop-blur-sm px-3 py-1.5 rounded-full border border-[rgba(241,234,224,0.15)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Typographic stage */}
      <div className="px-8 md:px-16 pb-16 md:pb-24 pt-10">
        <div ref={headlineRef} className="mb-5">
          <h1 className="font-fraunces font-bold text-[#F1EAE0] leading-[1.05] text-[clamp(36px,6vw,80px)] tracking-[-0.02em]">
            {words.map((w, i, arr) => (
              <Fragment key={i}>
                <span className="word inline-block" style={{ opacity: 0 }}>{w}</span>
                {i < arr.length - 1 && " "}
              </Fragment>
            ))}
          </h1>
        </div>

        <div
          ref={hairlineRef}
          className="w-[200px] h-[1px] bg-[rgba(241,234,224,0.3)] mb-5"
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />

        <div ref={subRef} className="mb-6" style={{ opacity: 0 }}>
          <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65] max-w-[520px]">
            925 League runs organized, professional-grade basketball in New York, Los Angeles, and Chicago — for working adults who never quit the game. Real teams. Real refs. Real stats. Weeknight tip-offs that respect your schedule.
          </p>
        </div>

        <div ref={pillsRef} className="flex flex-wrap gap-3" style={{ opacity: 0 }}>
          <Link href="/leagues/mbl" className="pill">
            Join the MBL
          </Link>
          <Link href="/leagues/open-runs" className="pill" style={{ background: "transparent", border: "1px solid rgba(241,234,224,0.2)", color: "#9BA0A6" }}>
            Open Runs
          </Link>
        </div>
      </div>

      {/* Season label — bottom right */}
      <div
        ref={metaRef}
        className="absolute bottom-8 right-8 text-right flex flex-col gap-1"
        style={{ opacity: 0 }}
      >
        <span className="font-inter font-semibold text-[11px] tracking-[0.14em] uppercase text-[#E4572E]">
          SEASON 03
        </span>
        <span className="font-inter font-medium text-[11px] tracking-[0.14em] uppercase text-[#9BA0A6]">
          SPRING 2026
        </span>
        <div className="flex items-center justify-end gap-1 mt-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#9BA0A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-inter font-medium text-[11px] tracking-[0.18em] uppercase text-[#9BA0A6]">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
