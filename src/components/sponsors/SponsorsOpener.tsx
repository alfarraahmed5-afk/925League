"use client";
import { Fragment, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SponsorsOpener() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ delay: 0.5 });
    const eyebrow = ref.current.querySelector(".eyebrow");
    const words = ref.current.querySelectorAll(".word");
    const para = ref.current.querySelector(".para");
    const ctas = ref.current.querySelectorAll(".cta-el");

    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.24 }, 0);
    if (words.length) tl.fromTo(words, { opacity: 0, y: 20, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.06, ease: "power3.out" }, 0.1);
    if (para) tl.fromTo(para, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);
    if (ctas.length) tl.fromTo(ctas, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.32, stagger: 0.1 }, 0.8);

    return () => { tl.kill(); };
  }, []);

  const headline = "Partner with a league that reaches 300 working professionals weekly.";

  return (
    <section ref={ref} className="min-h-screen bg-[#0B0C0E] flex flex-col items-center justify-center pt-[72px] px-8 md:px-16 py-24 text-center">
      <p className="eyebrow mb-8" style={{ opacity: 0 }}>FOR PARTNERS</p>
      <h1 className="font-fraunces font-semibold text-[#F1EAE0] leading-[1.1] text-[clamp(32px,5vw,72px)] max-w-[880px] mb-8">
        {headline.split(" ").map((word, i, arr) => (
          <Fragment key={i}>
            <span className="word inline-block" style={{ opacity: 0 }}>{word}</span>
            {i < arr.length - 1 && " "}
          </Fragment>
        ))}
      </h1>
      <p className="para font-inter text-[#9BA0A6] text-[17px] leading-[1.65] max-w-[640px] mb-10" style={{ opacity: 0 }}>
        925 League delivers a curated, verifiable audience of mid-career professionals in New York, Los Angeles, and Chicago. Our players are decision-makers in finance, tech, real estate, and media. This page outlines what we offer and how to reach us.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="mailto:partners@925league.com"
          className="cta-el pill pill-primary"
          style={{ opacity: 0 }}
        >
          BECOME A PARTNER
        </a>
        <a
          href="/925league-partner-deck.pdf"
          download
          className="cta-el pill border border-[#9BA0A6] text-[#F1EAE0] bg-transparent"
          style={{ opacity: 0 }}
        >
          DOWNLOAD THE PARTNER DECK
        </a>
      </div>
    </section>
  );
}
