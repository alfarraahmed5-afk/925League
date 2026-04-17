"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    tier: "BASELINE",
    name: "Bench Sponsor",
    items: [
      "Logo on jerseys of one assigned team for one season.",
      "Logo on the league website sponsor strip.",
      "One social media mention per week on Instagram.",
    ],
    price: "500",
    currency: "USD",
    featured: false,
  },
  {
    tier: "PREFERRED",
    name: "Half-Court Sponsor",
    items: [
      "Logo on jerseys of three teams.",
      "Sponsor branding on the scoreboard and all filmed content.",
      "Three social mentions per week, including story takeovers.",
      "Named mention in post-game highlight videos.",
    ],
    price: "1,500",
    currency: "USD",
    featured: true,
  },
  {
    tier: "HEADLINE",
    name: "Title Sponsor",
    items: [
      "Entire league named: 'The MBL presented by [Brand]'.",
      "Logo on all team jerseys.",
      "Exclusive category rights.",
      "Sponsor-branded Open Run event once per season.",
      "First-look access to filmed footage for brand use.",
    ],
    price: "5,000",
    currency: "USD",
    featured: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cols = sectionRef.current.querySelectorAll(".package-col");
    gsap.fromTo(cols, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.56, stagger: 0.14,
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0C0E] py-24 px-8 md:px-16">
      <p className="eyebrow mb-4">PARTNERSHIP PACKAGES</p>
      <h2 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(28px,3vw,48px)] leading-[1.1] mb-14">
        Three levels of partnership.
      </h2>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className="package-col group relative flex flex-col border border-[#2A2D31] rounded-sm p-8 gap-6 cursor-default transition-all duration-[220ms] hover:bg-[#1A1C1F] hover:border-[transparent]"
            style={{ opacity: 0 }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderLeftColor = "#E4572E";
              el.style.borderLeftWidth = "2px";
              const siblings = el.parentElement?.querySelectorAll(".package-col");
              siblings?.forEach((s) => { if (s !== el) (s as HTMLElement).style.opacity = "0.5"; });
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderLeftColor = "#2A2D31";
              el.style.borderLeftWidth = "1px";
              const siblings = el.parentElement?.querySelectorAll(".package-col");
              siblings?.forEach((s) => { (s as HTMLElement).style.opacity = "1"; });
            }}
          >
            {/* Featured tag */}
            {pkg.featured && (
              <div className="absolute top-4 right-4 bg-[#E4572E] px-3 py-1 rounded-full">
                <span className="font-inter font-semibold text-[10px] tracking-[0.14em] text-[#0B0C0E]">MOST SELECTED</span>
              </div>
            )}

            <div>
              <p className="eyebrow text-[#9BA0A6] mb-2">{pkg.tier}</p>
              <h3 className="font-fraunces font-semibold text-[#F1EAE0] text-[clamp(24px,2vw,36px)] leading-[1.1]">{pkg.name}</h3>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {pkg.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-[3px]">
                    <path d="M4 8l2.5 2.5L12 5" stroke="#E4572E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-inter text-[#9BA0A6] text-[15px] leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#2A2D31]">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-jetbrains font-medium text-[#F1EAE0] text-[clamp(28px,3vw,42px)] leading-none">{pkg.price}</span>
                <span className="font-inter text-[#9BA0A6] text-[14px]">{pkg.currency} / season</span>
              </div>
              <a
                href="mailto:partners@925league.com"
                className="font-inter font-medium text-[#F1EAE0] text-[15px] relative group inline-flex items-center gap-1"
              >
                Email us to start
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
