"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function OpenRunsOpener() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    const w1 = textRef.current?.querySelectorAll(".line1 .word");
    const w2 = textRef.current?.querySelectorAll(".line2 .word");
    if (w1) tl.fromTo(w1, { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.07, ease: "power3.out" }, 0);
    if (w2) tl.fromTo(w2, { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.07, ease: "power3.out" }, 0.12);
    if (hairlineRef.current) tl.fromTo(hairlineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: "power2.out", transformOrigin: "left" }, 0.6);
    const para = textRef.current?.querySelector(".para");
    if (para) tl.fromTo(para, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.8);

    if (imgRef.current) {
      tl.fromTo(imgRef.current, { clipPath: "inset(100% 0 0 0)", scale: 1.08 }, {
        clipPath: "inset(0% 0 0 0)", scale: 1, duration: 1.1, ease: "power3.out",
      }, 0);
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="min-h-screen bg-[#F1EAE0] flex pt-[72px] overflow-hidden">
      {/* Text content */}
      <div ref={textRef} className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16 gap-6">
        <h1 className="font-fraunces font-bold text-[#0B0C0E] leading-[1.0] text-[clamp(56px,10vw,164px)]">
          <div className="line1">
            {"OPEN RUNS".split(" ").map((w, i, arr) => (
              <Fragment key={i}>
                <span className="word inline-block" style={{ opacity: 0 }}>{w}</span>
                {i < arr.length - 1 && " "}
              </Fragment>
            ))}
          </div>
          <div className="line2">
            {"SATURDAYS".split("").map((c, i) => (
              <span key={i} className="word inline-block" style={{ opacity: 0 }}>{c}</span>
            ))}
          </div>
        </h1>

        <div ref={hairlineRef} className="w-[320px] h-[1px] bg-[rgba(11,12,14,0.3)]" style={{ transformOrigin: "left", transform: "scaleX(0)" }} />

        <p className="para font-inter text-[#4A4E54] text-[17px] leading-[1.65] max-w-[440px]" style={{ opacity: 0 }}>
          Open Runs are weekly drop-in basketball at our downtown gym. No roster, no season, no commitment. Pay at the door and run.
        </p>
      </div>

      {/* Right image — desktop only */}
      <div className="hidden md:block w-[40%] relative overflow-hidden">
        <div
          ref={imgRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <Image
            src="https://images.pexels.com/photos/11831851/pexels-photo-11831851.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Indoor gym basketball game"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-[rgba(11,12,14,0.4)]" />
          <div className="absolute bottom-8 left-6 font-jetbrains text-[#E4572E] text-[11px] tracking-[0.14em] uppercase">
            Every Saturday · 2PM
          </div>
        </div>
      </div>
    </section>
  );
}
