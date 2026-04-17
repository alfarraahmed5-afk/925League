"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { time: "1:45 PM", label: "Arrive", body: "Gym doors open 15 minutes early. Pay at the check-in desk. Wait in the bleachers with everyone else." },
  { time: "2:00 PM", label: "Shoot-around", body: "Full court opens for shooting and warm-up. No organized teams yet. Just shooting." },
  { time: "2:15 PM", label: "Teams pick", body: "Commissioner calls out names in the order everyone signed in. First five on each team. Winners stay, losers sit. Standard." },
  { time: "2:20–5:00 PM", label: "Run", body: "Games to eleven by ones and twos. Winners stay on. Losers next in line. Foul calls are honor-system within reason." },
  { time: "5:00 PM", label: "Done", body: "Court closes. Stragglers can hang around to shoot for another twenty minutes." },
];

export default function HowItGoes() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Grow vertical line on scroll
    gsap.fromTo(lineRef.current, { scaleY: 0 }, {
      scaleY: 1,
      transformOrigin: "top",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
      },
    });

    // Animate timeline items
    const items = sectionRef.current.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      const dot = item.querySelector(".dot");
      const content = item.querySelectorAll(".content-el");
      const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: "top 80%", once: true } });
      if (dot) tl.fromTo(dot, { scale: 0, backgroundColor: "#2A2D31" }, { scale: 1, backgroundColor: "#E4572E", duration: 0.2 }, 0);
      if (content.length) tl.fromTo(content, { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.56, stagger: 0.06 }, 0.1);
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-16">
        How a Saturday actually goes.
      </h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[rgba(11,12,14,0.15)]">
          <div ref={lineRef} className="absolute inset-0 bg-[rgba(11,12,14,0.3)]" style={{ transformOrigin: "top", transform: "scaleY(0)" }} />
        </div>

        <div className="flex flex-col gap-12">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="timeline-item flex md:items-center gap-8 pl-12 md:pl-0"
              style={{ flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}
            >
              {/* Dot */}
              <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#F1EAE0] bg-[#2A2D31] dot z-10" />

              {/* Content */}
              <div className={`flex-1 flex flex-col gap-2 ${i % 2 !== 0 ? "md:text-right md:items-end" : ""}`}>
                <span className="content-el font-jetbrains font-medium text-[13px] text-[#E4572E] tracking-[0.08em]" style={{ opacity: 0 }}>
                  {item.time}
                </span>
                <h3 className="content-el font-fraunces font-semibold text-[#0B0C0E] text-[28px] leading-[1.1]" style={{ opacity: 0 }}>
                  {item.label}
                </h3>
                <p className="content-el font-inter text-[#4A4E54] text-[16px] leading-[1.65] max-w-[340px]" style={{ opacity: 0 }}>
                  {item.body}
                </p>
              </div>

              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
