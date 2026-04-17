"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teams = [
  { name: "Downtown Ballers", captain: "M. Andrews", city: "NEW YORK", record: "6-2" },
  { name: "Capital Partners", captain: "K. Harris", city: "LOS ANGELES", record: "NEW" },
  { name: "925 Originals", captain: "J. Nader", city: "NEW YORK", record: "7-1" },
  { name: "The Overtime", captain: "A. Scott", city: "NEW YORK", record: "3-5" },
  { name: "Midtown Shooters", captain: "K. Graham", city: "NEW YORK", record: "5-3" },
  { name: "Westside Tide", captain: "R. Moore", city: "LOS ANGELES", record: "NEW" },
  { name: "The Accountants", captain: "O. Franklin", city: "NEW YORK", record: "4-4" },
  { name: "Quarter to Five", captain: "T. Hayes", city: "CHICAGO", record: "NEW" },
];

export default function TeamsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".team-card");
      gsap.fromTo(cards, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: { each: 0.08, from: "start" },
        scrollTrigger: { trigger: gridRef.current, start: "top 75%", once: true },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <p className="eyebrow mb-4">SEASON 03 TEAMS</p>
      <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-12">
        Eight teams. Eight captains.
      </h2>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teams.map((team, i) => (
          <div
            key={i}
            className="team-card group bg-[#1A1C1F] rounded-sm p-6 flex flex-col gap-4 cursor-default transition-colors duration-[220ms] hover:bg-[#2A2D31]"
            style={{ opacity: 0 }}
          >
            {/* Monogram */}
            <div className="w-16 h-16 rounded-full bg-[#2A2D31] group-hover:bg-[#0B0C0E] flex items-center justify-center transition-colors duration-[220ms]">
              <span className="font-fraunces font-bold text-[#E4572E] text-[22px]">
                {team.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </span>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h3
                className="font-fraunces font-semibold text-[#F1EAE0] leading-[1.2] transition-all duration-[220ms]"
                style={{ fontSize: "clamp(16px,1.4vw,20px)", letterSpacing: "group-hover:-0.01em" }}
              >
                {team.name}
              </h3>
              <p className="eyebrow text-[10px] text-[#9BA0A6] normal-case tracking-[0.08em] mt-1">CAPTAIN</p>
              <p className="font-inter font-medium text-[#9BA0A6] text-[15px]">{team.captain}</p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#0B0C0E]">
              <span className="font-jetbrains text-[11px] text-[#9BA0A6] tracking-[0.08em]">{team.city}</span>
              <span
                className="font-jetbrains text-[11px] tracking-[0.08em]"
                style={{ color: team.record === "NEW" ? "#9BA0A6" : "#E4572E" }}
              >
                {team.record}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
