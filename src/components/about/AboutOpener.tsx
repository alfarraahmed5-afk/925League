"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutOpener() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ delay: 0.5 });
    const eyebrow = ref.current.querySelector(".eyebrow");
    const words = ref.current.querySelectorAll(".word");
    const para = ref.current.querySelector(".para");
    const numeral = ref.current.querySelector(".big-numeral");

    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.24 }, 0);
    if (words.length) tl.fromTo(words, { opacity: 0, y: 24, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.1);
    if (para) tl.fromTo(para, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.8);
    if (numeral) tl.fromTo(numeral, { opacity: 0, x: 40 }, { opacity: 0.6, x: 0, duration: 0.6, ease: "power3.out" }, 1);

    return () => { tl.kill(); };
  }, []);

  const headline = "We started because we wanted somewhere to play. Everything after was figuring that out.";

  return (
    <section ref={ref} className="min-h-screen bg-[#F1EAE0] flex pt-[72px] px-8 md:px-16 py-24 overflow-hidden">
      <div className="flex-1 flex flex-col justify-center gap-7 max-w-[700px]">
        <p className="eyebrow" style={{ opacity: 0 }}>ABOUT</p>
        <h1 className="font-fraunces font-bold text-[#0B0C0E] leading-[1.1] text-[clamp(32px,5vw,72px)]">
          {headline.split(" ").map((word, i, arr) => (
            <Fragment key={i}>
              <span className="word inline-block" style={{ opacity: 0 }}>{word}</span>
              {i < arr.length - 1 && " "}
            </Fragment>
          ))}
        </h1>
        <p className="para font-inter text-[#4A4E54] text-[17px] leading-[1.65] max-w-[600px]" style={{ opacity: 0 }}>
          925 League is built by a small team in New York who cared enough about Tuesday night basketball to turn it into an organized platform. This is how we got here and what we are trying to do.
        </p>
      </div>

      {/* Decorative numeral */}
      <div className="hidden md:flex items-start justify-end flex-1 pt-8">
        <span
          className="big-numeral font-fraunces font-normal text-[#E4572E] select-none pointer-events-none"
          style={{
            fontSize: "clamp(140px,18vw,280px)",
            lineHeight: 1,
            WebkitTextStroke: "2px #E4572E",
            WebkitTextFillColor: "transparent",
            opacity: 0,
          }}
        >
          01
        </span>
      </div>
    </section>
  );
}
