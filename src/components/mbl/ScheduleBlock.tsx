"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dates = [
  { date: "MAR 01", event: "Application deadline", time: "23:59" },
  { date: "MAR 07", event: "Draft night, all captains", time: "19:00" },
  { date: "MAR 14", event: "Season opens, week 1", time: "19:00 & 20:00" },
  { date: "MAR 21", event: "Week 2", time: "19:00 & 20:00" },
  { date: "MAR 28", event: "Week 3", time: "19:00 & 20:00" },
  { date: "APR 04", event: "Week 4", time: "19:00 & 20:00" },
  { date: "APR 11", event: "Week 5, mid-season break after", time: "19:00 & 20:00" },
  { date: "APR 18", event: "No games, Ramadan schedule break", time: "—" },
  { date: "APR 25", event: "Week 6, season resumes", time: "19:00 & 20:00" },
  { date: "MAY 02", event: "Week 7", time: "19:00 & 20:00" },
  { date: "MAY 09", event: "Week 8, final regular-season week", time: "19:00 & 20:00" },
  { date: "MAY 14", event: "Semifinals", time: "19:00 & 20:00" },
  { date: "MAY 16", event: "Championship and consolation", time: "19:00 & 20:00" },
];

export default function ScheduleBlock() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const rows = sectionRef.current!.querySelectorAll(".date-row");
      gsap.fromTo(rows, { opacity: 0, y: 6 }, {
        opacity: 1, y: 0, duration: 0.26, stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });
      const heading = sectionRef.current!.querySelectorAll(".heading-el");
      gsap.fromTo(heading, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.56, stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="bg-[#F1EAE0] py-24 px-8 md:px-16">
      <div className="grid md:grid-cols-12 gap-10">
        {/* Left */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <p className="eyebrow heading-el" style={{ opacity: 0 }}>SEASON 03 CALENDAR</p>
          <h2 className="font-fraunces font-semibold text-[#0B0C0E] text-[clamp(28px,3vw,48px)] leading-[1.1] heading-el" style={{ opacity: 0 }}>
            Mark these.
          </h2>
          <p className="font-inter text-[#4A4E54] text-[17px] leading-[1.65] heading-el" style={{ opacity: 0 }}>
            All dates are firm. Games start at 7pm sharp, second games at 8pm sharp. The gym is booked; there are no rain dates.
          </p>
          <a
            href="/925league-season03.ics"
            download
            className="heading-el pill bg-[#0B0C0E] text-[#F1EAE0] self-start text-[12px]"
            style={{ opacity: 0, height: 44 }}
          >
            Download .ics calendar
          </a>
        </div>

        {/* Right */}
        <div className="md:col-span-8">
          {dates.map((row, i) => (
            <div
              key={i}
              className="date-row group flex items-center gap-4 py-4 border-b border-[rgba(74,78,84,0.2)] cursor-default transition-colors duration-[180ms] hover:bg-[#E8E2D6] px-3 -mx-3 rounded-sm"
              style={{ opacity: 0 }}
            >
              <div
                className="shrink-0 w-2 h-full transition-opacity duration-[180ms] group-hover:opacity-100 opacity-0"
                style={{ borderLeft: "2px solid #E4572E" }}
              />
              <span className="font-jetbrains font-medium text-[15px] text-[#0B0C0E] w-[100px] shrink-0">
                {row.date}
              </span>
              <span className="font-inter font-medium text-[17px] text-[#0B0C0E] flex-1">
                {row.event}
              </span>
              <span className="font-jetbrains font-medium text-[12px] text-[#9BA0A6] shrink-0">
                {row.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
