"use client";
import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AudioToggle from "./AudioToggle";

gsap.registerPlugin(ScrollTrigger);

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/leagues/mbl", label: "Leagues" },
  { href: "/leagues/open-runs", label: "Open Runs" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
];

const contactLinks = [
  { href: "mailto:play@925league.com", label: "play@925league.com" },
  { label: "New York · Los Angeles · Chicago" },
];

const followLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "TikTok" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll(".footer-word");
    gsap.fromTo(
      words,
      { opacity: 0, filter: "blur(14px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <footer className="bg-[#0B0C0E] border-t border-[rgba(42,45,49,0.5)]">
      {/* Top band — headline */}
      <div
        ref={headlineRef}
        className="px-8 md:px-16 pt-20 pb-10 border-b border-[rgba(241,234,224,0.1)]"
      >
        <p className="font-fraunces font-medium italic text-[#F1EAE0] leading-[1.1] text-[clamp(36px,6vw,64px)]">
          {"Come run with us.".split(" ").map((word, i, arr) => (
            <Fragment key={i}>
              <span className="footer-word inline-block" style={{ opacity: 0 }}>{word}</span>
              {i < arr.length - 1 && " "}
            </Fragment>
          ))}
        </p>
      </div>

      {/* Middle band — columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-8 md:px-16 py-14 border-b border-[rgba(241,234,224,0.08)]">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-inter font-medium text-[#F1EAE0] text-[15px] mb-3">925 | LEAGUE</p>
          <p className="font-inter text-[14px] text-[#9BA0A6] leading-[1.6] max-w-[220px]">
            A basketball platform for players who never stopped.
          </p>
        </div>

        {/* Site */}
        <div>
          <p className="eyebrow mb-5">SITE</p>
          <ul className="flex flex-col gap-3">
            {siteLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="font-inter text-[14px] text-[#9BA0A6] hover:text-[#F1EAE0] transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow mb-5">CONTACT</p>
          <ul className="flex flex-col gap-3">
            {contactLinks.map((item, i) => (
              <li key={i}>
                {item.href ? (
                  <a href={item.href} className="font-inter text-[14px] text-[#9BA0A6] hover:text-[#F1EAE0] transition-colors duration-200">
                    {item.label}
                  </a>
                ) : (
                  <span className="font-jetbrains text-[13px] text-[#9BA0A6]">{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <p className="eyebrow mb-5">FOLLOW</p>
          <ul className="flex flex-col gap-3">
            {followLinks.map(({ href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="font-inter text-[14px] text-[#9BA0A6] hover:text-[#F1EAE0] transition-colors duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom band */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-8 md:px-16 py-6">
        <p className="font-inter text-[12px] text-[#9BA0A6]">
          © 2025 925 League. All rights reserved.
        </p>
        <AudioToggle />
      </div>
    </footer>
  );
}
