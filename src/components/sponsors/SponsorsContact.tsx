"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contacts = [
  { label: "Email", value: "partners@925league.com", href: "mailto:partners@925league.com" },
  { label: "Phone", value: "+20 10 1234 5678", href: "tel:+201012345678" },
  { label: "Book a call", value: "30-minute intro call", href: "https://cal.com/925league" },
];

export default function SponsorsContact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".animate-in");
      gsap.fromTo(els, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.56, stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16 flex flex-col items-center text-center">
      <p className="eyebrow animate-in mb-8" style={{ opacity: 0 }}>TALK TO US</p>
      <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(28px,4vw,56px)] leading-[1.15] max-w-[640px] mb-12 animate-in" style={{ opacity: 0 }}>
        Brief, email, or call. We respond within a business day.
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        {contacts.map((c) => (
          <div key={c.label} className="flex flex-col gap-2 animate-in" style={{ opacity: 0 }}>
            <p className="eyebrow text-[#9BA0A6] text-[10px]">{c.label}</p>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-inter font-medium text-[#F1EAE0] text-[17px] relative group"
            >
              {c.value}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E4572E] scale-x-0 group-hover:scale-x-100 transition-transform duration-[260ms] origin-left" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
