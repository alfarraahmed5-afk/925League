"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rules = [
  "Everyone calls their own fouls. Disputes go to a re-do.",
  "Losing team sits. No one hogs the court.",
  "If you are here, you play. Pickup is not a spectator sport.",
  "No streetwear on the court. Gym shoes or nothing.",
  "First-timers always get in. Ask around and we will put you on a team.",
  "Tape your fingers if you need to. We have tape at the desk.",
  "Respect the gym. We rent it. We want it again next week.",
];

export default function HouseRules() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".rule-item");
    gsap.fromTo(items, { opacity: 0, y: 4 }, {
      opacity: 1, y: 0, duration: 0.22, stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <p className="eyebrow text-center mb-12">HOUSE RULES</p>

      <div className="max-w-[720px] mx-auto flex flex-col gap-0">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="rule-item flex items-start gap-5 py-5 border-b border-[#2A2D31]"
            style={{ opacity: 0 }}
          >
            <span
              className="font-fraunces font-normal text-[#9BA0A6] shrink-0 leading-none text-[clamp(20px,2vw,36px)]"
              style={{ WebkitTextStroke: "1px #9BA0A6", WebkitTextFillColor: "transparent" }}
            >
              <span style={{ opacity: 0.4 }}>0</span>{i + 1}.
            </span>
            <p className="font-fraunces font-medium text-[#F1EAE0] text-[clamp(18px,2vw,28px)] leading-[1.3]">
              {rule}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
