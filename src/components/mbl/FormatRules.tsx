"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  {
    label: "Game flow",
    body: "Four ten-minute quarters. Running clock through the first three quarters. Stop-clock for the final two minutes of the fourth quarter if the score margin is within ten. Two minutes for halftime. Ninety-second timeouts, three per team per game. Media timeout at 5 minutes of the third quarter if the score margin is within ten.",
  },
  {
    label: "House rules",
    body: "Defensive three-second call waived. Jump ball goes to possession arrow from the opening tip on. Technical fouls are two shots and the ball. Flagrant one is two shots and the ball. Flagrant two is an ejection and a one-game suspension.",
  },
  {
    label: "Roster and eligibility",
    body: "Ten players per roster. Minimum five to start a game. Three registered substitutes may be pulled up from an Open Run in the event of multiple no-shows; this must be cleared with the commissioner at least four hours before tip-off. No ringers: a player cannot play in more than one MBL game per week.",
  },
];

export default function FormatRules() {
  const [open, setOpen] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll(".animate-in");
    gsap.fromTo(els, { opacity: 0, y: 12 }, {
      opacity: 1, y: 0, duration: 0.56, stagger: 0.08,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-12 gap-10">
        {/* Left */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <p className="eyebrow animate-in" style={{ opacity: 0 }}>THE FORMAT</p>
          <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(28px,3vw,48px)] leading-[1.1] animate-in" style={{ opacity: 0 }}>
            Ref-called, running-clock, recreational.
          </h2>
          <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65] animate-in" style={{ opacity: 0 }}>
            Rules follow FIBA with three house exceptions. Games are officiated by two paid refs per game. Scoring and fouls are kept on paper and on the filmed copy. Ties in the regular season do not go to overtime; they stand as ties for standings purposes.
          </p>
        </div>

        {/* Right — accordion */}
        <div className="md:col-span-7 flex flex-col gap-0 animate-in" style={{ opacity: 0 }}>
          {rows.map((row, i) => (
            <div
              key={i}
              className="border-b border-[#2A2D31] overflow-hidden"
              style={{ borderLeft: open === i ? "2px solid #E4572E" : "2px solid transparent", transition: "border-left 0.22s ease" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                style={{ background: open === i ? "#1A1C1F" : "transparent", transition: "background 0.22s ease" }}
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span className="font-fraunces font-medium text-[#F1EAE0] text-[20px]">{row.label}</span>
                <motion.svg
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                >
                  <path d="M5 7.5l5 5 5-5" stroke="#9BA0A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <p className="font-inter text-[#9BA0A6] text-[16px] leading-[1.65] px-6 pb-6">
                      {row.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
