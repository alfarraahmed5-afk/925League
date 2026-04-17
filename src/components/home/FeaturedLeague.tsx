"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedLeague() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !textRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      // Image clip-path reveal
      tl.fromTo(
        imgRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
        { clipPath: "inset(0% 0 0 0)", scale: 1, duration: 0.9, ease: "power3.out" }
      );

      // Text
      const textEls = textRef.current!.querySelectorAll(".animate-in");
      tl.fromTo(textEls, { opacity: 0, y: 20, filter: "blur(8px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.56, stagger: 0.1, ease: "power3.out",
      }, 0.2);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-12 gap-10 items-center">
        {/* Text — left 7 cols */}
        <div ref={textRef} className="md:col-span-7 flex flex-col gap-6">
          <p className="eyebrow animate-in" style={{ opacity: 0 }}>FEATURED LEAGUE</p>
          <h2
            className="font-fraunces font-semibold text-[#F1EAE0] leading-[1.1] text-[clamp(32px,4vw,64px)] animate-in"
            style={{ opacity: 0 }}
          >
            The MBL is our flagship.
          </h2>
          <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65] max-w-[520px] animate-in" style={{ opacity: 0 }}>
            The MBL (9-to-5 Basketball League) is for working professionals. Eight teams, twelve weeks, one championship. Rosters cap at ten. Games on Tuesdays and Thursdays.
          </p>
          <p className="font-jetbrains font-medium text-[#F1EAE0] text-[13px] tracking-tight animate-in" style={{ opacity: 0 }}>
            TUES &amp; THURS · 7PM · 8PM
          </p>
          <div className="animate-in" style={{ opacity: 0 }}>
            <Link
              href="/leagues/mbl"
              className="group inline-flex items-center gap-2 font-inter font-medium text-[#F1EAE0] text-[16px] relative"
            >
              <span className="relative">
                Explore the MBL
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E4572E] scale-x-0 group-hover:scale-x-100 transition-transform duration-[260ms] origin-left" />
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="-rotate-45 transition-transform group-hover:rotate-0 duration-[260ms]">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Image — right 5 cols */}
        <div className="md:col-span-5">
          <div
            ref={imgRef}
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: "4/5", clipPath: "inset(100% 0 0 0)" }}
            data-cursor="VIEW"
          >
            <Image
              src="https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Indoor basketball game action"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,12,14,0.7)] via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-end p-6">
              <div className="bg-[rgba(11,12,14,0.7)] backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="font-jetbrains text-[#E4572E] text-[11px] tracking-[0.14em] uppercase">MBL Season 03</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
