"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const frames = [
  {
    num: "01", label: "APPLICATIONS OPEN",
    headline: "Fill out the form.",
    body: "Week minus-2. Applications open. Every player fills out a short background form: position, height, experience level, availability. Submissions close one week before draft night.",
  },
  {
    num: "02", label: "DRAFT NIGHT",
    headline: "Pick your team.",
    body: "Week minus-1. Captains and the commissioner meet on a Monday night. Rosters are drafted snake-style across two rounds. Team captains leave with their rosters and the first game date.",
  },
  {
    num: "03", label: "REGULAR SEASON",
    headline: "Eight games.",
    body: "Weeks 1–8. Each team plays eight regular-season games. Four ten-minute quarters on a running clock with a two-minute stop-clock in the last minute. Standings published weekly.",
  },
  {
    num: "04", label: "PLAYOFFS",
    headline: "Top four compete.",
    body: "Weeks 9–10. Top four teams qualify. Semifinals on Tuesday, final on Thursday. Losing semifinalists play a consolation game for third place.",
  },
  {
    num: "05", label: "THE TROPHY",
    headline: "Champion crowned.",
    body: "Week 11. Championship game. MVP announced. Trophy presented. Every player receives a downloadable folder with their footage from every game they played.",
  },
  {
    num: "06", label: "OFF-SEASON",
    headline: "Two weeks rest.",
    body: "Weeks 12+. Open Runs continue on Saturdays. Applications for the next season open exactly two weeks after the final.",
  },
];

export default function SeasonJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${frames.length * 80 * 10}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const frame = Math.min(frames.length - 1, Math.floor(self.progress * frames.length));
        setActiveFrame(frame);
      },
    });

    return () => trigger.kill();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="bg-[#0B0C0E] py-16 px-8">
        <div className="flex flex-col gap-16">
          {frames.map((frame) => (
            <div key={frame.num} className="flex flex-col gap-4">
              <span className="eyebrow">{frame.label}</span>
              <h3 className="font-fraunces font-semibold text-[#F1EAE0] text-[32px] leading-[1.1]">{frame.headline}</h3>
              <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65]">{frame.body}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const frame = frames[activeFrame];
  const progress = ((activeFrame + 1) / frames.length) * 100;

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-[120px] left-8 right-8 h-[2px] bg-[rgba(11,12,14,0.3)] z-10">
        <div
          className="h-full bg-[#E4572E] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="px-16 py-24 flex items-center gap-16 h-full">
        {/* Left — frame number + headline */}
        <div className="w-1/2 flex flex-col gap-6">
          <span
            className="font-fraunces font-normal text-[clamp(100px,14vw,180px)] leading-none select-none"
            style={{
              WebkitTextStroke: "1.5px #9BA0A6",
              WebkitTextFillColor: "transparent",
              color: "#9BA0A6",
              transition: "all 0.4s ease",
            }}
          >
            {frame.num}
          </span>
          <p className="eyebrow">{frame.label}</p>
          <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(32px,4vw,56px)] leading-[1.1]">
            {frame.headline}
          </h2>
          <p className="font-inter text-[#9BA0A6] text-[17px] leading-[1.65] max-w-[440px]">
            {frame.body}
          </p>
        </div>

        {/* Right — visual */}
        <div className="w-1/2 h-[500px] relative overflow-hidden rounded-sm">
          <Image
            src="https://images.pexels.com/photos/2874717/pexels-photo-2874717.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Indoor basketball game action"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-[rgba(11,12,14,0.55)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-fraunces font-bold text-[200px] leading-none opacity-10 text-[#F1EAE0]"
              style={{ transition: "all 0.4s ease" }}
            >
              {frame.num}
            </span>
          </div>
          <div className="absolute bottom-6 left-6">
            <p className="font-jetbrains text-[#E4572E] text-[11px] tracking-[0.14em] uppercase">
              Frame {frame.num} of 06
            </p>
          </div>
        </div>
      </div>

      {/* Frame dots */}
      <div className="absolute bottom-8 left-16 flex gap-2">
        {frames.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === activeFrame ? "#E4572E" : "#2A2D31" }}
          />
        ))}
      </div>
    </section>
  );
}
