"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const members = [
  { name: "Omar Fawzy", role: "Founder and Commissioner", note: "Shoots left. Plays point guard. Hates late tip-offs.", initials: "OF" },
  { name: "Leila Mostafa", role: "Operations and Scheduling", note: "Makes the gym happen. Keeps the ref roster.", initials: "LM" },
  { name: "Karim El-Sayed", role: "Video and Photography", note: "Behind every highlight clip. Former broadcast editor.", initials: "KE" },
  { name: "Sara Aboul Fadl", role: "Partnerships", note: "Handles the sponsors. Was once a forward on the national team.", initials: "SA" },
];

export default function TheTeam() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cols = sectionRef.current.querySelectorAll(".team-member");
    cols.forEach((col, i) => {
      const portrait = col.querySelector(".portrait");
      const textEls = col.querySelectorAll(".text-el");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: col, start: "top 80%", once: true },
        delay: i * 0.12,
      });
      if (portrait) tl.fromTo(portrait, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power3.out" }, 0);
      if (textEls.length) tl.fromTo(textEls, { opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.56, stagger: 0.08 }, 0.3);
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <p className="eyebrow mb-4">THE TEAM</p>
      <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-14">
        Four people, one operation.
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {members.map((m) => (
          <div key={m.name} className="team-member flex flex-col gap-4">
            {/* Portrait */}
            <div
              className="portrait group relative overflow-hidden"
              style={{ aspectRatio: "1/1", clipPath: "inset(100% 0 0 0)" }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-[600ms]"
                style={{
                  background: "linear-gradient(145deg, #1A1C1F, #2A2D31)",
                  filter: "grayscale(100%)",
                }}
              >
                <span className="font-fraunces font-bold text-[#E4572E] text-[clamp(28px,3vw,48px)]">{m.initials}</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-el font-fraunces font-semibold text-[#F1EAE0] text-[clamp(18px,1.5vw,24px)] leading-[1.2]" style={{ opacity: 0 }}>
                {m.name}
              </h3>
              <p className="text-el font-inter font-medium text-[#9BA0A6] text-[15px]" style={{ opacity: 0 }}>{m.role}</p>
              <p className="text-el font-inter text-[#4A4E54] text-[14px] leading-[1.5] mt-1" style={{ opacity: 0 }}>{m.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
